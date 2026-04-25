import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// BGM/Audioの自動再生エラーを安全に回避するためのオーバーライド
const originalAudioPlay = window.HTMLAudioElement.prototype.play;
window.HTMLAudioElement.prototype.play = function() {
  const promise = originalAudioPlay.apply(this, arguments);
  if (promise !== undefined) {
    return promise.catch((e) => {
      console.warn("Audio autoplay blocked, waiting for user interaction.", e);
      return Promise.resolve();
    });
  }
  return Promise.resolve();
};

// --- パンの単語データ ---
const BREAD_WORDS = [
  { name: '食パン', kana: 'しょくぱん', romaji: 'shokupan', emoji: '🍞', time: 5.0, price: 150 },
  { name: 'メロンパン', kana: 'めろんぱん', romaji: 'meronpan', emoji: '🍈🍞', time: 5.5, price: 180 },
  { name: 'クロワッサン', kana: 'くろわっさん', romaji: 'kurowassan', emoji: '🥐', time: 6.0, price: 220 },
  { name: 'フランスパン', kana: 'ふらんすぱん', romaji: 'furansupan', emoji: '🥖', time: 6.5, price: 250 },
  { name: 'あんぱん', kana: 'あんぱん', romaji: 'anpan', emoji: '🫘🍞', time: 5.0, price: 160 },
  { name: 'カレーパン', kana: 'かれーぱん', romaji: 'kare-pan', emoji: '🍛🍞', time: 5.5, price: 200 },
  { name: 'サンドイッチ', kana: 'さんどいっち', romaji: 'sandoitchi', emoji: '🥪', time: 6.5, price: 350 },
  { name: 'ベーグル', kana: 'べーぐる', romaji: 'be-guru', emoji: '🥯', time: 5.0, price: 240 },
  { name: 'ホットドッグ', kana: 'ほっとどっぐ', romaji: 'hottodoggu', emoji: '🌭', time: 6.0, price: 300 },
  { name: 'ハンバーガー', kana: 'はんばーがー', romaji: 'hanba-ga-', emoji: '🍔', time: 6.0, price: 400 },
  { name: 'チョココロネ', kana: 'ちょこころね', romaji: 'chokokorone', emoji: '🍫🥐', time: 6.5, price: 190 },
  { name: 'パンケーキ', kana: 'ぱんけーき', romaji: 'panke-ki', emoji: '🥞', time: 5.5, price: 500 },
];

const PREMIUM_BREADS = [
  { name: 'クロックムッシュ', kana: 'くろっくむっしゅ', romaji: 'kurokkumusshu', emoji: '🥪', time: 6.0, price: 450 },
  { name: 'シナモンロール', kana: 'しなもんろーる', romaji: 'shinamonro-ru', emoji: '🍥', time: 7.0, price: 280 },
  { name: 'フルーツサンド', kana: 'ふるーつさんど', romaji: 'furu-tsusando', emoji: '🍓🥪', time: 6.5, price: 420 },
];

// Lv5で出現する幻のパン
const SECRET_BREADS = [
  { name: 'レインボーパン', kana: 'れいんぼーぱん', romaji: 'reinbo-pan', emoji: '🌈🍞', time: 8.0, price: 1000 },
  { name: 'ユニコーンパン', kana: 'ゆにこーんぱん', romaji: 'yuniko-npan', emoji: '🦄🍞', time: 8.5, price: 1500 },
];

// 新しいコース設定
const COURSES = {
  practice: { id: 'practice', name: '練習', isInfinite: true, noCoin: true },
  easy: { id: 'easy', name: 'イージー', speed: 1.5, color: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600' },
  normal: { id: 'normal', name: 'ノーマル', speed: 1.0, color: 'bg-orange-500 hover:bg-orange-400 border-orange-600' },
  hard: { id: 'hard', name: 'ハード', speed: 0.7, color: 'bg-rose-500 hover:bg-rose-400 border-rose-600' },
  very_hard: { id: 'very_hard', name: 'ベリーハード', speed: 0.4, fastTimer: true, color: 'bg-purple-600 hover:bg-purple-500 border-purple-800' },
};

// ショップのアイテムデータ
const SHOP_ITEMS = [
  { id: 'premium_bread', name: '高級パンレシピ', desc: '新種のパン（クロックムッシュ等）が流れてくる！', price: 1000, emoji: '📖' },
  { id: 'golden_timer', name: '金のタイマー', desc: '制限時間が 60秒 → 75秒 にアップ！', price: 2000, emoji: '⏳' },
  { id: 'diamond_timer', name: 'ダイヤのタイマー', desc: '制限時間が 60秒 → 100秒 に大幅アップ！', price: 5000, emoji: '💎' },
  { id: 'panda_apron', name: '特製エプロン', desc: 'コンボボーナスの点数が2倍になる！', price: 3000, emoji: '🎽' },
  { id: 'secret_bread', name: '幻のパンレシピ', desc: '超高額な伝説のパンが流れてくる…！', price: 10000, emoji: '✨', isSecret: true }
];

// ショップのお皿カスタマイズデータ
const PLATE_ITEMS = [
  { id: 'plate_default', name: '標準のお皿', desc: 'いつもの白いお皿', price: 0, css: 'bg-slate-200 border-b-4 border-slate-300' },
  { id: 'plate_wood', name: '木のお皿', desc: '温かみのある木製のお皿', price: 500, css: 'bg-amber-700 border-b-4 border-amber-900' },
  { id: 'plate_red', name: '赤のお皿', desc: '情熱的な赤いお皿', price: 1000, css: 'bg-red-500 border-b-4 border-red-700' },
  { id: 'plate_blue', name: '青のお皿', desc: 'クールな青いお皿', price: 1000, css: 'bg-blue-500 border-b-4 border-blue-700' },
  { id: 'plate_green', name: '緑のお皿', desc: '自然を感じる緑のお皿', price: 1000, css: 'bg-emerald-500 border-b-4 border-emerald-700' },
  { id: 'plate_yellowgreen', name: '黄緑のお皿', desc: '爽やかな黄緑のお皿', price: 1000, css: 'bg-lime-400 border-b-4 border-lime-600' },
  { id: 'plate_orange', name: 'オレンジのお皿', desc: '元気なオレンジのお皿', price: 1000, css: 'bg-orange-500 border-b-4 border-orange-700' },
  { id: 'plate_pink', name: 'ピンクのお皿', desc: 'かわいいピンク色のお皿', price: 1500, css: 'bg-pink-300 border-b-4 border-pink-400' },
  { id: 'plate_purple', name: '紫のお皿', desc: '高貴な紫色のお皿', price: 1500, css: 'bg-purple-500 border-b-4 border-purple-700' },
  { id: 'plate_indigo', name: '藍色のお皿', desc: '深い藍色のお皿', price: 1500, css: 'bg-indigo-600 border-b-4 border-indigo-800' },
  { id: 'plate_black', name: '黒のお皿', desc: 'シックな黒いお皿', price: 2000, css: 'bg-slate-800 border-b-4 border-slate-900' },
  { id: 'plate_gold', name: '純金のお皿', desc: '成金気分でタイピング', price: 5000, css: 'bg-yellow-300 border-b-4 border-yellow-500 shadow-[0_0_15px_rgba(253,224,71,0.6)]' },
  { id: 'plate_rainbow', name: 'レインボー皿', desc: '七色に輝く伝説のお皿', price: 10000, css: 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 border-b-4 border-white animate-rainbow bg-[length:200%_auto]' },
];

// 【変更】設備アイテムは消費アイテムとして何度でも買えるように
const FACILITY_ITEMS = [
  { id: 'conveyor_switch', name: 'レーン停止スイッチ', desc: '15秒間レーンの動きを止めて中央固定にする！（消費アイテム）', price: 500, emoji: '🔌' },
  { id: 'golden_syrup', name: '黄金のシロップ', desc: '15秒間、獲得スコアとコインが2倍になる！（消費アイテム）', price: 800, emoji: '🍯' },
];

const EMOTION_ITEMS = [
  { id: 'emotion_angry', name: '怒りの店員', desc: '店員が怒ってレーンが加速！代わりに獲得スコア(コイン)が2倍に！', price: 3000, emoji: '💢' },
  { id: 'emotion_sad', name: '悲しげな店員', desc: '店員が悲しんでレーンが減速…代わりに獲得スコア(コイン)が半分に。', price: 2000, emoji: '😢' },
];

const STAFF_ITEMS = [
  { id: 'staff_panda', name: 'パンダ', desc: 'いつもの店員', price: 0, emoji: '🐼', suffix: 'パン' },
  { id: 'staff_dog', name: '犬', desc: '忠実なパン屋の相棒', price: 1000, emoji: '🐶', suffix: 'ワン' },
  { id: 'staff_cat', name: '猫', desc: '気まぐれだけど人気者', price: 1500, emoji: '🐱', suffix: 'ニャ' },
  { id: 'staff_fox', name: 'キツネ', desc: '賢くレジ打ちをこなす', price: 2000, emoji: '🦊', suffix: 'コン' },
  { id: 'staff_monkey', name: '猿', desc: '素早い動きでパンを並べる', price: 2000, emoji: '🐵', suffix: 'ウキ' },
  { id: 'staff_bear', name: 'クマ', desc: '力持ちのパン職人', price: 3000, emoji: '🐻', suffix: 'クマ' },
  { id: 'staff_tiger', name: 'トラ', desc: '迫力満点の看板店員', price: 4000, emoji: '🐯', suffix: 'ガオ' },
  { id: 'staff_lion', name: 'ライオン', desc: '百獣の王がパンを売る', price: 5000, emoji: '🦁', suffix: 'ガオ' },
];

// 安全な効果音再生
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'type') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'miss') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'clear') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'buy') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'levelup') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'whistle') {
      // 笛の音（ピ・ピー！）
      osc.type = 'sine';
      
      // 1音目「ピ」
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      
      // 2音目「ピー！」
      osc.frequency.setValueAtTime(2000, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0, ctx.currentTime + 0.15);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.17);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {
    // ignore
  }
};

export default function App() {
  const [gameState, setGameState] = useState('entrance'); // 'entrance', 'title', 'playing', 'result', 'shop', 'sell'
  const [shopTab, setShopTab] = useState('items'); 
  const [sellTab, setSellTab] = useState('items'); 
  const [course, setCourse] = useState(COURSES.normal);
  const [currentBread, setCurrentBread] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [clearedPlates, setClearedPlates] = useState([]);
  const [practiceSpeedMulti, setPracticeSpeedMulti] = useState(1.0);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [clearedBreads, setClearedBreads] = useState(0);

  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [plateInventory, setPlateInventory] = useState(['plate_default']);
  const [activePlateId, setActivePlateId] = useState('plate_default');
  const [facilityInventory, setFacilityInventory] = useState([]); // 消費アイテム（重複あり）
  const [emotionInventory, setEmotionInventory] = useState([]);
  const [activeEmotion, setActiveEmotion] = useState('normal');
  const [staffInventory, setStaffInventory] = useState(['staff_panda']);
  const [activeStaffId, setActiveStaffId] = useState('staff_panda');

  // アイテム効果のステート
  const [isConveyorOn, setIsConveyorOn] = useState(true);
  const [scoreBoost, setScoreBoost] = useState(false);

  // ショップ信頼ゲージ・レベル
  const [shopLevel, setShopLevel] = useState(1);
  const [shopTrust, setShopTrust] = useState(0);
  const [hasFreeCoupon, setHasFreeCoupon] = useState(false);

  // 売却済みステート
  const [soldInventory, setSoldInventory] = useState([]);
  const [soldPlateInventory, setSoldPlateInventory] = useState([]);
  const [soldEmotionInventory, setSoldEmotionInventory] = useState([]);
  const [soldStaffInventory, setSoldStaffInventory] = useState([]);
  const [sellMode, setSellMode] = useState('sell'); // 'sell' | 'return'

  const timerRef = useRef(null);
  const shopMessageTimerRef = useRef(null);
  const conveyorTimeoutRef = useRef(null);
  const scoreBoostTimeoutRef = useRef(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveLoadText, setSaveLoadText] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [shopMessage, setShopMessage] = useState(null);

  const activePlate = PLATE_ITEMS.find(p => p.id === activePlateId) || PLATE_ITEMS[0];
  const activeStaff = STAFF_ITEMS.find(s => s.id === activeStaffId) || STAFF_ITEMS[0];

  // --- 終了時のセーブ確認用ステート ---
  const [lastSavedData, setLastSavedData] = useState("");
  const [justLoaded, setJustLoaded] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const getCurrentDataString = useCallback(() => {
    return JSON.stringify({
      coins, inventory, plateInventory, activePlateId, facilityInventory, emotionInventory, activeEmotion, staffInventory, activeStaffId,
      soldInventory, soldPlateInventory, soldEmotionInventory, soldStaffInventory,
      shopLevel, shopTrust, hasFreeCoupon
    });
  }, [coins, inventory, plateInventory, activePlateId, facilityInventory, emotionInventory, activeEmotion, staffInventory, activeStaffId, soldInventory, soldPlateInventory, soldEmotionInventory, soldStaffInventory, shopLevel, shopTrust, hasFreeCoupon]);

  useEffect(() => {
    // 初回マウント時に初期状態を保存済みとして記録
    setLastSavedData(getCurrentDataString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (justLoaded) {
      setLastSavedData(getCurrentDataString());
      setJustLoaded(false);
    }
  }, [justLoaded, getCurrentDataString]);

  // --- 信頼ゲージ・価格計算のロジック ---
  const getMaxTrust = (level) => {
    return 2 + level; // Lv1: 3, Lv2: 4, Lv3: 5...
  };

  const getDiscountedPrice = (basePrice, level) => {
    if (basePrice === 0) return 0;
    if (level === 1) return basePrice;
    if (level === 2) return Math.floor(basePrice / 1.5);
    if (level === 3) return Math.floor(basePrice / 2);
    if (level === 4) return Math.floor(basePrice / 2); // 割引はLv3と同じ、無料クーポン付与
    if (level >= 5) {
      const factor = 2 * Math.pow(1.5, level - 4);
      return Math.floor(basePrice / factor);
    }
  };

  const handleTrustGain = () => {
    setShopTrust(prev => {
      const max = getMaxTrust(shopLevel);
      const next = prev + 1;
      if (next >= max) {
        setShopLevel(l => {
          const nextLevel = l + 1;
          if (nextLevel === 4) setHasFreeCoupon(true);
          return nextLevel;
        });
        playSound('levelup');
        showTempMessage('レベルアップしたピョン！！もっと安くなるピョン！');
        return 0;
      }
      return next;
    });
  };

  const handlePurchaseAttempt = (item, price, executePurchase) => {
    let finalPrice = getDiscountedPrice(price, shopLevel);
    let usedCoupon = false;

    if (hasFreeCoupon && price > 0) {
      finalPrice = 0;
      usedCoupon = true;
    }

    if (coins >= finalPrice) {
      if (usedCoupon) setHasFreeCoupon(false);
      setCoins(prev => prev - finalPrice);
      executePurchase();
      playSound('buy');
      showTempMessage('ありがとうございましたピョン！');
      if (price > 0) handleTrustGain();
    }
  };

  const handleSave = () => {
    const dataString = getCurrentDataString();
    try {
      const code = btoa(dataString);
      setSaveLoadText(code);
      setSaveMessage("セーブコードを発行しました！");
      setLastSavedData(dataString); // セーブした状態を記録
    } catch (e) {
      setSaveMessage("セーブコードの生成に失敗しました。");
    }
  };

  const handleLoad = () => {
    if (!saveLoadText) return setSaveMessage("コードを入力してください。");
    try {
      const data = JSON.parse(atob(saveLoadText));
      if (typeof data.coins === 'number') setCoins(data.coins);
      if (Array.isArray(data.inventory)) setInventory(data.inventory);
      if (Array.isArray(data.plateInventory)) setPlateInventory(data.plateInventory);
      if (typeof data.activePlateId === 'string') setActivePlateId(data.activePlateId);
      if (Array.isArray(data.facilityInventory)) setFacilityInventory(data.facilityInventory);
      if (Array.isArray(data.emotionInventory)) setEmotionInventory(data.emotionInventory);
      if (typeof data.activeEmotion === 'string') setActiveEmotion(data.activeEmotion);
      if (Array.isArray(data.staffInventory)) setStaffInventory(data.staffInventory);
      if (typeof data.activeStaffId === 'string') setActiveStaffId(data.activeStaffId);
      
      if (Array.isArray(data.soldInventory)) setSoldInventory(data.soldInventory);
      if (Array.isArray(data.soldPlateInventory)) setSoldPlateInventory(data.soldPlateInventory);
      if (Array.isArray(data.soldEmotionInventory)) setSoldEmotionInventory(data.soldEmotionInventory);
      if (Array.isArray(data.soldStaffInventory)) setSoldStaffInventory(data.soldStaffInventory);

      if (typeof data.shopLevel === 'number') setShopLevel(data.shopLevel);
      if (typeof data.shopTrust === 'number') setShopTrust(data.shopTrust);
      if (typeof data.hasFreeCoupon === 'boolean') setHasFreeCoupon(data.hasFreeCoupon);

      setSaveMessage("データをロードしました！");
      setJustLoaded(true); // ロード後にセーブ済み状態を更新
    } catch (e) {
      setSaveMessage("無効なセーブコードです。");
    }
  };

  const copyToClipboard = () => {
    if (!saveLoadText) return;
    const textarea = document.createElement('textarea');
    textarea.value = saveLoadText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setSaveMessage("コピーしました！保存しておいてね。");
    } catch (err) {
      setSaveMessage("コピーに失敗しました。手動で選択してコピーしてください。");
    }
    document.body.removeChild(textarea);
  };

  useEffect(() => {
    const unlockAudio = () => {
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        if (audio.paused) originalAudioPlay.call(audio).catch(() => {});
      });
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const spawnWord = useCallback(() => {
    let words = [...BREAD_WORDS];
    if (inventory.includes('premium_bread')) words = [...words, ...PREMIUM_BREADS];
    if (inventory.includes('secret_bread')) words = [...words, ...SECRET_BREADS];

    const nextWord = words[Math.floor(Math.random() * words.length)];
    setCurrentBread({ 
      word: nextWord, 
      typedCount: 0,
      spawnTime: Date.now(),
      id: Math.random().toString(36).substring(2, 9)
    });
    setAnimKey(prev => prev + 1);
  }, [inventory]);

  const startGame = (selectedCourse) => {
    const baseGameTime = inventory.includes('diamond_timer') ? 100 : inventory.includes('golden_timer') ? 75 : 60;
    setCourse(selectedCourse);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalTyped(0);
    setMissCount(0);
    setClearedBreads(0);
    setClearedPlates([]);
    
    // アイテム効果のリセット
    setIsConveyorOn(true);
    setScoreBoost(false);
    if (conveyorTimeoutRef.current) clearTimeout(conveyorTimeoutRef.current);
    if (scoreBoostTimeoutRef.current) clearTimeout(scoreBoostTimeoutRef.current);

    setGameState('playing');
    spawnWord();
    
    if (timerRef.current) clearInterval(timerRef.current);

    if (selectedCourse.isInfinite) {
      setTimeLeft(Infinity);
    } else {
      setTimeLeft(baseGameTime);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === Infinity) return prev;
          const decrement = selectedCourse.fastTimer ? 2 : 1;
          const nextTime = prev - decrement;
          return nextTime < 0 ? 0 : nextTime;
        });
      }, 1000);
    }
  };

  const handleManualFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('whistle');
    setGameState('result');
    if (!course.noCoin) setCoins((prev) => prev + score);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft !== Infinity && timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('whistle');
      setGameState('result');
      if (!course.noCoin) setCoins(prev => prev + score);
    }
  }, [timeLeft, gameState, score, course.noCoin]);

  const handleMissWord = useCallback(() => {
    if (gameState !== 'playing') return;
    playSound('miss');
    setCombo(0);
    setMissCount(prev => prev + 1);
    spawnWord();
  }, [gameState, spawnWord]);

  // --- アイテム使用ロジック ---
  const useItem = useCallback((itemId) => {
    if (!facilityInventory.includes(itemId)) return; // 持っていない場合は不発

    setFacilityInventory(prev => {
      const idx = prev.indexOf(itemId);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1); // 1個消費
      return next;
    });

    playSound('clear'); // アイテム使用音

    if (itemId === 'conveyor_switch') {
      setIsConveyorOn(false);
      if (conveyorTimeoutRef.current) clearTimeout(conveyorTimeoutRef.current);
      conveyorTimeoutRef.current = setTimeout(() => setIsConveyorOn(true), 15000);
    } else if (itemId === 'golden_syrup') {
      setScoreBoost(true);
      if (scoreBoostTimeoutRef.current) clearTimeout(scoreBoostTimeoutRef.current);
      scoreBoostTimeoutRef.current = setTimeout(() => setScoreBoost(false), 15000);
    }
  }, [facilityInventory]);

  // タイピング処理
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing' || !currentBread) return;
      if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Enter', 'Backspace', 'Escape'].includes(e.key)) return;

      // --- アイテムのショートカットキー対応 ---
      if (e.key === '1' && FACILITY_ITEMS[0] && facilityInventory.includes(FACILITY_ITEMS[0].id)) {
        useItem(FACILITY_ITEMS[0].id);
        return;
      }
      if (e.key === '2' && FACILITY_ITEMS[1] && facilityInventory.includes(FACILITY_ITEMS[1].id)) {
        useItem(FACILITY_ITEMS[1].id);
        return;
      }

      const expectedChar = currentBread.word.romaji[currentBread.typedCount];

      if (e.key.toLowerCase() === expectedChar.toLowerCase()) {
        playSound('type');
        const newTypedCount = currentBread.typedCount + 1;
        setTotalTyped((prev) => prev + 1);
        
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo(prev => Math.max(prev, newCombo));

        const bonusMultiplier = inventory.includes('panda_apron') ? 2 : 1;
        const comboBonus = Math.floor(newCombo / 10) * 5 * bonusMultiplier;
        const emotionMultiplier = activeEmotion === 'emotion_angry' ? 2 : (activeEmotion === 'emotion_sad' ? 0.5 : 1);
        const itemBoostMultiplier = scoreBoost ? 2 : 1; // 黄金のシロップ効果
        
        setScore((prev) => prev + Math.floor((10 + comboBonus) * emotionMultiplier * itemBoostMultiplier));

        if (newTypedCount === currentBread.word.romaji.length) {
          playSound('clear');
          
          setScore((prev) => prev + Math.floor(currentBread.word.price * emotionMultiplier * itemBoostMultiplier));
          setClearedBreads((prev) => prev + 1);

          if (isConveyorOn) {
            const elapsed = (Date.now() - currentBread.spawnTime) / 1000;
            const currentSpeedMultiplier = course.id === 'practice' ? (1 / practiceSpeedMulti) : course.speed;
            const emotionSpeedMultiplier = activeEmotion === 'emotion_angry' ? 0.6 : (activeEmotion === 'emotion_sad' ? 1.5 : 1.0);
            const animTime = currentBread.word.time * currentSpeedMultiplier * emotionSpeedMultiplier;
            
            setClearedPlates(prev => [...prev, {
              id: currentBread.id,
              css: activePlate.css,
              animTime: animTime,
              elapsed: elapsed,
              word: { ...currentBread.word, displayPrice: Math.floor(currentBread.word.price * emotionMultiplier * itemBoostMultiplier) }
            }]);
          }

          spawnWord();
        } else {
          setCurrentBread((prev) => ({ ...prev, typedCount: newTypedCount }));
        }
      } else {
        playSound('miss');
        setCombo(0);
        setMissCount((prev) => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentBread, combo, spawnWord, inventory, activeEmotion, activePlate.css, isConveyorOn, course.id, course.speed, practiceSpeedMulti, facilityInventory, scoreBoost, useItem]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (shopMessageTimerRef.current) clearTimeout(shopMessageTimerRef.current);
      if (conveyorTimeoutRef.current) clearTimeout(conveyorTimeoutRef.current);
      if (scoreBoostTimeoutRef.current) clearTimeout(scoreBoostTimeoutRef.current);
    };
  }, []);

  const showTempMessage = useCallback((msg) => {
    setShopMessage(msg);
    if (shopMessageTimerRef.current) clearTimeout(shopMessageTimerRef.current);
    shopMessageTimerRef.current = setTimeout(() => setShopMessage(null), 5000);
  }, []);

  // --- ショップの購入・装備処理 ---
  const handleBuyItem = (item) => handlePurchaseAttempt(item, item.price, () => setInventory(prev => [...prev, item.id]));
  const handleBuyPlate = (plate) => handlePurchaseAttempt(plate, plate.price, () => { setPlateInventory(prev => [...prev, plate.id]); setActivePlateId(plate.id); });
  const handleEquipPlate = (plateId) => { setActivePlateId(plateId); playSound('type'); };
  const handleBuyFacility = (item) => handlePurchaseAttempt(item, item.price, () => setFacilityInventory(prev => [...prev, item.id]));
  const handleBuyEmotion = (item) => handlePurchaseAttempt(item, item.price, () => { setEmotionInventory(prev => [...prev, item.id]); setActiveEmotion(item.id); });
  const handleBuyStaff = (staff) => handlePurchaseAttempt(staff, staff.price, () => { setStaffInventory(prev => [...prev, staff.id]); setActiveStaffId(staff.id); });
  const handleEquipStaff = (staffId) => { setActiveStaffId(staffId); playSound('type'); };

  // --- 売り場の売却処理 ---
  const executeSell = (price, removeAction) => {
    setCoins(prev => prev + Math.floor(price / 2));
    removeAction();
    playSound('buy');
    showTempMessage('ありがとうございますコケ！');
  };
  const handleSellItem = (item) => executeSell(item.price, () => { setInventory(prev => prev.filter(id => id !== item.id)); setSoldInventory(prev => [...prev, item.id]); });
  const handleSellPlate = (plate) => executeSell(plate.price, () => { setPlateInventory(prev => prev.filter(id => id !== plate.id)); setSoldPlateInventory(prev => [...prev, plate.id]); if (activePlateId === plate.id) setActivePlateId('plate_default'); });
  const handleSellFacility = (item) => executeSell(item.price, () => { 
    setFacilityInventory(prev => {
      const idx = prev.indexOf(item.id);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    }); 
  });
  const handleSellEmotion = (item) => executeSell(item.price, () => { setEmotionInventory(prev => prev.filter(id => id !== item.id)); setSoldEmotionInventory(prev => [...prev, item.id]); if (activeEmotion === item.id) setActiveEmotion('normal'); });
  const handleSellStaff = (staff) => executeSell(staff.price, () => { setStaffInventory(prev => prev.filter(id => id !== staff.id)); setSoldStaffInventory(prev => [...prev, staff.id]); if (activeStaffId === staff.id) setActiveStaffId('staff_panda'); });

  // --- 売り場の返却（買い戻し）処理 ---
  const executeReturn = (price, returnAction) => {
    const returnPrice = Math.floor(price * 1.5);
    if (coins >= returnPrice) {
      setCoins(prev => prev - returnPrice);
      returnAction();
      playSound('buy');
      showTempMessage('毎度ありコケ！');
    }
  };
  const handleReturnItem = (item) => executeReturn(item.price, () => { setSoldInventory(prev => prev.filter(id => id !== item.id)); setInventory(prev => [...prev, item.id]); });
  const handleReturnPlate = (plate) => executeReturn(plate.price, () => { setSoldPlateInventory(prev => prev.filter(id => id !== plate.id)); setPlateInventory(prev => [...prev, plate.id]); });
  const handleReturnEmotion = (item) => executeReturn(item.price, () => { setSoldEmotionInventory(prev => prev.filter(id => id !== item.id)); setEmotionInventory(prev => [...prev, item.id]); });
  const handleReturnStaff = (staff) => executeReturn(staff.price, () => { setSoldStaffInventory(prev => prev.filter(id => id !== staff.id)); setStaffInventory(prev => [...prev, staff.id]); });

  const accuracy = totalTyped + missCount === 0 ? 0 : Math.floor((totalTyped / (totalTyped + missCount)) * 100);

  // --- 終了ボタンの処理 ---
  const handleExitClick = () => {
    playSound('type');
    if (getCurrentDataString() !== lastSavedData) {
      setIsExitModalOpen(true);
    } else {
      setGameState('closed');
    }
  };

  const getStaffMessage = () => {
    if (gameState === 'shop') return shopMessage || (shopLevel >= 5 ? `幻の商品も入ったピョン！` : `いらっしゃいませピョン！何を買うピョン？`);
    if (gameState === 'sell') {
      if (sellMode === 'return') return shopMessage || `返却には1.5倍のお金がかかるコケ！`;
      return shopMessage || `何を売ってくれるコケ！`;
    }

    const s = activeStaff.suffix;
    if (gameState === 'entrance') return `お店はここだ${s}！`;
    if (gameState === 'title') return `パン屋へようこそ${s}！`;
    if (gameState === 'playing') {
      if (course.id === 'practice') return `マイペースに練習する${s}！`;
      if (course.id === 'very_hard') return `時間がゴリゴリ減る${s}！💦`;
      if (activeEmotion === 'emotion_angry') return `早く取る${s}！！💢`;
      if (activeEmotion === 'emotion_sad') return `…`;
      if (combo > 20) return `すごいペースだ${s}！`;
      if (combo > 10) return `その調子だ${s}！`;
      if (timeLeft !== Infinity && timeLeft <= 10) return `いそげいそげ${s}！`;
      return `流れるパンを打つ${s}！`;
    }
    if (gameState === 'result') {
      if (course.noCoin) return `いい練習になった${s}ね！`;
      if (score > 3000) return `君はマスター${s}！`;
      if (score > 1000) return `なかなかやる${s}ね！`;
      return `また挑戦して${s}！`;
    }
    return '';
  };

  const currentSpeedMultiplier = course.id === 'practice' ? (1 / practiceSpeedMulti) : course.speed;
  const currentEmotionSpeedMultiplier = activeEmotion === 'emotion_angry' ? 0.6 : (activeEmotion === 'emotion_sad' ? 1.5 : 1.0);
  const animTime = currentBread ? currentBread.word.time * currentSpeedMultiplier * currentEmotionSpeedMultiplier : 5;
  const currentEmotionMultiplier = activeEmotion === 'emotion_angry' ? 2 : (activeEmotion === 'emotion_sad' ? 0.5 : 1);

  // ショップ用のボタンと価格表示コンポーネント
  const ShopItemRow = ({ item, isOwned, isSold, onBuy, onEquip, isEquipped, actionText="購入する" }) => {
    const finalPrice = getDiscountedPrice(item.price, shopLevel);
    const isFree = hasFreeCoupon && item.price > 0;
    const canBuy = coins >= (isFree ? 0 : finalPrice) && !isOwned && !isSold;

    return (
      <div className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isEquipped ? 'bg-orange-100 border-orange-400' : isOwned || isSold ? 'bg-slate-50 border-slate-200' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
        <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto">
          {item.css ? (
            <div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${isSold ? 'opacity-50' : ''} ${item.css}`}></div>
          ) : (
            <div className={`text-5xl ${!isOwned && !isSold ? 'opacity-80' : isSold ? 'opacity-50' : ''}`}>{item.emoji}</div>
          )}
          <div>
            <h3 className={`text-xl font-bold ${isOwned || isSold ? 'text-slate-500' : 'text-amber-900'}`}>
              {item.name} {isEquipped && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2 align-middle">使用中</span>}
            </h3>
            {item.desc && <p className={`text-sm ${isSold ? 'text-slate-400' : 'text-amber-700'}`}>{item.desc}</p>}
          </div>
        </div>
        <div className="text-center md:text-right shrink-0">
          {!isOwned && !isSold && item.price > 0 && (
            <div className="mb-2">
              {shopLevel > 1 && <span className="text-xs text-slate-400 line-through mr-1">{item.price}C</span>}
              <span className={`text-lg font-bold ${isFree ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>
                {isFree ? '0 C (無料!)' : `${finalPrice} C`}
              </span>
            </div>
          )}
          {isOwned ? (
            onEquip ? (
              <button disabled={isEquipped} onClick={() => onEquip(item.id)} className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${isEquipped ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white active:translate-y-1 border-b-4 border-blue-600 active:border-b-0'}`}>
                {isEquipped ? '使用中' : '使用する'}
              </button>
            ) : (
              <button disabled className="px-6 py-2 rounded-full font-bold text-white shadow-md bg-slate-400 cursor-not-allowed">購入済み</button>
            )
          ) : (
            <button disabled={!canBuy} onClick={() => onBuy(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${isSold ? 'bg-rose-300 cursor-not-allowed' : canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' : 'bg-rose-300 cursor-not-allowed'}`}>
              {isSold ? '売り切れ' : actionText}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-orange-50 text-amber-900 flex flex-col items-center justify-center p-4 font-sans selection:bg-orange-200">
      
      <style>{`
        @keyframes flow {
          0% { left: 100%; transform: translate(0, -50%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: -10%; transform: translate(-100%, -50%); opacity: 0; }
        }
        @keyframes conveyor {
          0% { background-position: 0 0; }
          100% { background-position: -40px 0; }
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow {
          animation: rainbow 3s ease infinite;
        }
      `}</style>

      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-orange-100 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-4 bg-orange-400 opacity-20" />
        
        <div className="absolute top-6 right-6 bg-orange-50 px-4 py-2 rounded-full border-2 border-orange-200 font-black text-orange-600 shadow-sm z-20 flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span>{coins} C</span>
        </div>

        <div className="absolute top-6 left-6 flex items-start gap-3 z-20">
          <div className="text-5xl md:text-6xl drop-shadow-md animate-bounce relative" style={{ animationDuration: '2s' }}>
            {gameState === 'shop' ? '🐰' : gameState === 'sell' ? '🐔' : activeStaff.emoji}
            {gameState !== 'shop' && gameState !== 'sell' && activeEmotion === 'emotion_angry' && <span className="absolute -top-2 -left-2 text-3xl drop-shadow-sm animate-pulse">💢</span>}
            {gameState !== 'shop' && gameState !== 'sell' && activeEmotion === 'emotion_sad' && <span className="absolute -top-2 -left-2 text-3xl drop-shadow-sm animate-pulse">😢</span>}
          </div>
          {gameState !== 'closed' && (
            <div className="mt-2 bg-white px-4 py-2 rounded-2xl shadow-md border-2 border-slate-200 text-sm md:text-base font-bold text-slate-700 relative whitespace-nowrap">
              {getStaffMessage()}
              <div className="absolute top-1/2 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent -translate-y-1/2 drop-shadow-sm"></div>
            </div>
          )}
        </div>

        {/* === 入店画面 === */}
        {gameState === 'entrance' && (
          <div className="text-center pt-32 pb-20 flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-6xl md:text-8xl font-black text-orange-500 mb-12 tracking-wider drop-shadow-sm">🍞 パン打 🥐</h1>
            <button
              onClick={() => { setGameState('title'); playSound('type'); }}
              className="px-10 py-5 bg-orange-500 hover:bg-orange-400 text-white font-black text-2xl md:text-3xl rounded-full shadow-xl border-b-8 border-orange-600 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3 animate-bounce hover:animate-none"
            >
              <span className="text-4xl">🚪</span> パン打に入店する
            </button>
          </div>
        )}
        
        {/* === タイトル画面 === */}
        {gameState === 'title' && (
          <div className="text-center pt-28 pb-12">
            <h1 className="text-5xl md:text-7xl font-black text-orange-500 mb-4 tracking-wider drop-shadow-sm">🍞 パン打 🥐</h1>
            <p className="text-xl text-amber-700 font-bold mb-8">〜 流れるベーカリー・タイピング 〜</p>
            
            <p className="text-lg font-bold text-amber-800 mb-4">難易度を選んでスタート！</p>
            
            <div className="flex flex-col items-center gap-8 mb-8">
              <div className="flex flex-wrap justify-center gap-4">
                {['easy', 'normal', 'hard', 'very_hard'].map(key => {
                  const c = COURSES[key];
                  return (
                    <button key={c.id} onClick={() => startGame(c)} className={`px-6 md:px-8 py-4 rounded-xl text-white font-black text-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-lg ${c.color}`}>
                      {c.name}
                    </button>
                  );
                })}
              </div>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 w-full max-w-lg shadow-inner">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-teal-800">{COURSES.practice.name}モード</h3>
                    <p className="text-sm font-bold text-teal-600">時間無制限・コイン獲得なし</p>
                  </div>
                  <button onClick={() => startGame(COURSES.practice)} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-black text-lg border-b-4 border-teal-700 active:border-b-0 active:translate-y-1 rounded-xl shadow-md transition-all shrink-0">
                    練習開始
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-bold text-teal-700 whitespace-nowrap">レーン速度</span>
                  <span className="text-xs font-bold text-teal-600">遅い</span>
                  <input type="range" min="0.5" max="3.0" step="0.1" value={practiceSpeedMulti} onChange={(e) => setPracticeSpeedMulti(parseFloat(e.target.value))} className="w-full accent-teal-500" />
                  <span className="text-xs font-bold text-teal-600">速い</span>
                  <span className="font-mono font-bold text-teal-800 whitespace-nowrap w-12 text-right">x{practiceSpeedMulti.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setGameState('shop')} className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">🛒</span> ショップ
              </button>
              <button onClick={() => setGameState('sell')} className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-lime-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">♻️</span> 売り場
              </button>
              <button onClick={() => { setSaveLoadText(""); setSaveMessage(""); setIsSaveModalOpen(true); }} className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-teal-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">💾</span> セーブ / ロード
              </button>
              <button onClick={handleExitClick} className="px-8 py-3 bg-slate-500 hover:bg-slate-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-slate-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">🚪</span> 終了
              </button>
            </div>
          </div>
        )}

        {/* === 売り場画面 === */}
        {gameState === 'sell' && (
          <div className="pt-28 pb-12 px-2 md:px-10">
            <h2 className="text-4xl font-black text-amber-800 mb-6 text-center">♻️ 売り場</h2>
            
            <div className="flex justify-center gap-4 mb-6">
              <button onClick={() => setSellMode('sell')} className={`px-6 py-3 rounded-xl font-bold transition-all border-b-4 active:border-b-0 active:translate-y-1 ${sellMode === 'sell' ? 'bg-lime-500 text-white border-lime-600' : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'}`}>売却コーナー</button>
              <button onClick={() => setSellMode('return')} className={`px-6 py-3 rounded-xl font-bold transition-all border-b-4 active:border-b-0 active:translate-y-1 ${sellMode === 'return' ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'}`}>返却コーナー</button>
            </div>

            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              <button onClick={() => setSellTab('items')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${sellTab === 'items' ? 'bg-lime-500 text-white shadow-inner' : 'bg-lime-100 text-amber-800 hover:bg-lime-200'}`}>便利アイテム</button>
              <button onClick={() => setSellTab('plates')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${sellTab === 'plates' ? 'bg-lime-500 text-white shadow-inner' : 'bg-lime-100 text-amber-800 hover:bg-lime-200'}`}>お皿</button>
              <button onClick={() => setSellTab('facilities')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${sellTab === 'facilities' ? 'bg-lime-500 text-white shadow-inner' : 'bg-lime-100 text-amber-800 hover:bg-lime-200'}`}>設備（消費）</button>
              <button onClick={() => setSellTab('emotions')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${sellTab === 'emotions' ? 'bg-lime-500 text-white shadow-inner' : 'bg-lime-100 text-amber-800 hover:bg-lime-200'}`}>感情</button>
              <button onClick={() => setSellTab('staffs')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${sellTab === 'staffs' ? 'bg-lime-500 text-white shadow-inner' : 'bg-lime-100 text-amber-800 hover:bg-lime-200'}`}>店員</button>
            </div>
            
            {sellTab === 'items' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {sellMode === 'sell' ? (
                  SHOP_ITEMS.filter(item => inventory.includes(item.id) && item.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : 
                  SHOP_ITEMS.filter(item => inventory.includes(item.id) && item.price > 0).map(item => (
                    <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name}</h3><p className="text-sm text-amber-700">{item.desc}</p></div></div>
                      <div className="shrink-0"><button onClick={() => handleSellItem(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(item.price / 2)} C)</button></div>
                    </div>
                  ))
                ) : (
                  SHOP_ITEMS.filter(item => soldInventory.includes(item.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : 
                  SHOP_ITEMS.filter(item => soldInventory.includes(item.id)).map(item => {
                    const returnPrice = Math.floor(item.price * 1.5);
                    const canBuyback = coins >= returnPrice;
                    return (
                      <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300">
                        <div className="flex items-center gap-4"><div className="text-5xl opacity-80">{item.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{item.name}</h3></div></div>
                        <div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnItem(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {sellTab === 'plates' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {sellMode === 'sell' ? (
                  PLATE_ITEMS.filter(plate => plateInventory.includes(plate.id) && plate.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : 
                  PLATE_ITEMS.filter(plate => plateInventory.includes(plate.id) && plate.price > 0).map(plate => (
                    <div key={plate.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4"><div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${plate.css}`}></div><div><h3 className="text-xl font-bold text-amber-900">{plate.name}</h3></div></div>
                      <div className="shrink-0"><button onClick={() => handleSellPlate(plate)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(plate.price / 2)} C)</button></div>
                    </div>
                  ))
                ) : (
                  PLATE_ITEMS.filter(plate => soldPlateInventory.includes(plate.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : 
                  PLATE_ITEMS.filter(plate => soldPlateInventory.includes(plate.id)).map(plate => {
                    const returnPrice = Math.floor(plate.price * 1.5);
                    const canBuyback = coins >= returnPrice;
                    return (
                      <div key={plate.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300">
                        <div className="flex items-center gap-4"><div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md opacity-80 ${plate.css}`}></div><div><h3 className="text-xl font-bold text-indigo-900">{plate.name}</h3></div></div>
                        <div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnPlate(plate)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {sellTab === 'facilities' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {sellMode === 'sell' ? (
                  FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : 
                  FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).map(item => {
                    const ownedCount = facilityInventory.filter(id => id === item.id).length;
                    // 配列の中身をユニークにして表示させるための工夫
                    return (
                    <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{item.emoji}</div>
                        <div>
                          <h3 className="text-xl font-bold text-amber-900">{item.name} <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full ml-2">所持: {ownedCount}個</span></h3>
                        </div>
                      </div>
                      <div className="shrink-0"><button onClick={() => handleSellFacility(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">1個売却 (+{Math.floor(item.price / 2)} C)</button></div>
                    </div>
                  )})
                  // 重複排除して表示
                  .filter((v, i, a) => a.findIndex(t => (t.key === v.key)) === i)
                ) : (
                  <p className="text-center text-indigo-700 font-bold">消費アイテムは返却対象外コケ！<br/><span className="text-sm font-normal">（ショップでいつでも買えるコケ！）</span></p>
                )}
              </div>
            )}

            {sellTab === 'emotions' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {sellMode === 'sell' ? (
                  EMOTION_ITEMS.filter(item => emotionInventory.includes(item.id) && item.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : 
                  EMOTION_ITEMS.filter(item => emotionInventory.includes(item.id) && item.price > 0).map(item => (
                    <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name}</h3></div></div>
                      <div className="shrink-0"><button onClick={() => handleSellEmotion(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(item.price / 2)} C)</button></div>
                    </div>
                  ))
                ) : (
                  EMOTION_ITEMS.filter(item => soldEmotionInventory.includes(item.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : 
                  EMOTION_ITEMS.filter(item => soldEmotionInventory.includes(item.id)).map(item => {
                    const returnPrice = Math.floor(item.price * 1.5);
                    const canBuyback = coins >= returnPrice;
                    return (
                      <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300">
                        <div className="flex items-center gap-4"><div className="text-5xl opacity-80">{item.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{item.name}</h3></div></div>
                        <div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnEmotion(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {sellTab === 'staffs' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {sellMode === 'sell' ? (
                  STAFF_ITEMS.filter(staff => staffInventory.includes(staff.id) && staff.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : 
                  STAFF_ITEMS.filter(staff => staffInventory.includes(staff.id) && staff.price > 0).map(staff => (
                    <div key={staff.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4"><div className="text-5xl">{staff.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{staff.name}</h3></div></div>
                      <div className="shrink-0"><button onClick={() => handleSellStaff(staff)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(staff.price / 2)} C)</button></div>
                    </div>
                  ))
                ) : (
                  STAFF_ITEMS.filter(staff => soldStaffInventory.includes(staff.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : 
                  STAFF_ITEMS.filter(staff => soldStaffInventory.includes(staff.id)).map(staff => {
                    const returnPrice = Math.floor(staff.price * 1.5);
                    const canBuyback = coins >= returnPrice;
                    return (
                      <div key={staff.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300">
                        <div className="flex items-center gap-4"><div className="text-5xl opacity-80">{staff.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{staff.name}</h3></div></div>
                        <div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnStaff(staff)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            <div className="text-center">
              <button onClick={() => setGameState('title')} className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-lime-600 active:border-b-0 active:translate-y-1 transition-all">
                タイトルへ戻る
              </button>
            </div>
          </div>
        )}

        {/* === ショップ画面 === */}
        {gameState === 'shop' && (
          <div className="pt-28 pb-12 px-2 md:px-10">
            <h2 className="text-4xl font-black text-amber-800 mb-4 text-center">🛒 パン屋ショップ</h2>
            
            {/* ショップレベル＆信頼ゲージ */}
            <div className="bg-orange-100 rounded-xl p-4 mb-6 border-2 border-orange-200 max-w-2xl mx-auto shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-orange-800 flex items-center gap-2">
                  <span className="text-xl">🐰</span> ショップ信頼レベル: {shopLevel}
                </h3>
                {hasFreeCoupon && <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-sm">1回無料クーポン所持！</span>}
              </div>
              <div className="w-full bg-orange-200 rounded-full h-4 overflow-hidden relative shadow-inner">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-4 transition-all duration-500" style={{ width: `${(shopTrust / getMaxTrust(shopLevel)) * 100}%` }}></div>
              </div>
              <p className="text-right text-xs font-bold text-orange-600 mt-1">{shopTrust} / {getMaxTrust(shopLevel)}</p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              <button onClick={() => setShopTab('items')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'items' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>便利アイテム</button>
              <button onClick={() => setShopTab('plates')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'plates' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>お皿</button>
              <button onClick={() => setShopTab('facilities')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'facilities' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>設備（消費）</button>
              <button onClick={() => setShopTab('emotions')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'emotions' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>感情</button>
              <button onClick={() => setShopTab('staffs')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'staffs' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>店員</button>
            </div>
            
            {shopTab === 'items' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {SHOP_ITEMS.filter(i => !i.isSecret || shopLevel >= 5).map(item => (
                  <ShopItemRow 
                    key={item.id} item={item} 
                    isOwned={inventory.includes(item.id)} isSold={soldInventory.includes(item.id)} 
                    onBuy={handleBuyItem} 
                  />
                ))}
              </div>
            )}

            {shopTab === 'plates' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {PLATE_ITEMS.map(plate => (
                  <ShopItemRow 
                    key={plate.id} item={plate} 
                    isOwned={plateInventory.includes(plate.id)} isSold={soldPlateInventory.includes(plate.id)} 
                    onBuy={handleBuyPlate} onEquip={handleEquipPlate} isEquipped={activePlateId === plate.id} 
                  />
                ))}
              </div>
            )}

            {shopTab === 'facilities' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {FACILITY_ITEMS.map(item => {
                  const ownedCount = facilityInventory.filter(id => id === item.id).length;
                  const finalPrice = getDiscountedPrice(item.price, shopLevel);
                  const isFree = hasFreeCoupon && item.price > 0;
                  const canBuy = coins >= (isFree ? 0 : finalPrice);
                  
                  return (
                    <div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300">
                      <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto">
                        <div className="text-5xl">{item.emoji}</div>
                        <div>
                          <h3 className="text-xl font-bold text-amber-900">
                            {item.name} <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full ml-2 align-middle">所持: {ownedCount}個</span>
                          </h3>
                          <p className="text-sm text-amber-700">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right shrink-0">
                        <div className="mb-2">
                          {shopLevel > 1 && <span className="text-xs text-slate-400 line-through mr-1">{item.price}C</span>}
                          <span className={`text-lg font-bold ${isFree ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>
                            {isFree ? '0 C (無料!)' : `${finalPrice} C`}
                          </span>
                        </div>
                        <button disabled={!canBuy} onClick={() => handleBuyFacility(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' : 'bg-rose-300 cursor-not-allowed'}`}>
                          購入する
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {shopTab === 'emotions' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {EMOTION_ITEMS.map(item => (
                  <ShopItemRow 
                    key={item.id} item={item} 
                    isOwned={emotionInventory.includes(item.id)} isSold={soldEmotionInventory.includes(item.id)} 
                    onBuy={handleBuyEmotion} onEquip={() => { setActiveEmotion(activeEmotion === item.id ? 'normal' : item.id); playSound('type'); }} isEquipped={activeEmotion === item.id} 
                  />
                ))}
              </div>
            )}

            {shopTab === 'staffs' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {STAFF_ITEMS.map(staff => (
                  <ShopItemRow 
                    key={staff.id} item={staff} 
                    isOwned={staffInventory.includes(staff.id)} isSold={soldStaffInventory.includes(staff.id)} 
                    onBuy={handleBuyStaff} onEquip={handleEquipStaff} isEquipped={activeStaffId === staff.id} actionText="雇用する"
                  />
                ))}
              </div>
            )}

            <div className="text-center">
              <button onClick={() => setGameState('title')} className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">
                タイトルへ戻る
              </button>
            </div>
          </div>
        )}

        {/* === プレイ画面 === */}
        {gameState === 'playing' && (
          <div className="flex flex-col h-[500px] pt-16 relative">
            
            {/* --- アイテム効果発動中の表示 --- */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-20 pointer-events-none">
              {!isConveyorOn && <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-blue-400">🔌 レーン停止中！</span>}
              {scoreBoost && <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-yellow-400">🍯 スコア＆コイン 2倍！</span>}
            </div>

            {/* --- 右下アイテムバー --- */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-30">
              {FACILITY_ITEMS.map((item, idx) => {
                const count = facilityInventory.filter(id => id === item.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={item.id}
                    onClick={() => useItem(item.id)}
                    className="relative bg-white/90 p-3 rounded-xl shadow-lg border-2 border-orange-200 hover:bg-orange-50 active:translate-y-1 transition-all group"
                    title={`${item.name} (キーボード: ${idx + 1})`}
                  >
                    <span className="text-3xl drop-shadow-sm group-active:scale-90 transition-transform block">{item.emoji}</span>
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {count}
                    </span>
                    <span className="absolute bottom-0 right-1 text-[10px] font-black text-slate-400">{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-start mb-4 border-b-2 border-orange-100 pb-4 relative">
              <div className="flex items-center gap-6 md:gap-10">
                <div>
                  <p className="text-xs md:text-sm text-amber-600 font-bold">SCORE</p>
                  <p className="text-3xl md:text-5xl font-black text-orange-500 tabular-nums leading-none">{score}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-amber-600 font-bold">COMBO</p>
                  <p className={`text-2xl md:text-4xl font-black tabular-nums leading-none transition-colors duration-200 ${combo > 10 ? 'text-rose-500' : 'text-amber-700'}`}>
                    {combo}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-xs md:text-sm text-amber-600 font-bold">TIME</p>
                  <p className={`text-4xl md:text-6xl font-black tabular-nums leading-none ${timeLeft <= 10 && timeLeft !== Infinity ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>
                    {timeLeft === Infinity ? '∞' : timeLeft}<span className="text-2xl text-amber-700">{timeLeft === Infinity ? '' : 's'}</span>
                  </p>
                </div>
                <button 
                  onClick={handleManualFinish} 
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg shadow-sm transition-colors text-sm border-b-2 border-slate-400 active:border-b-0 active:translate-y-1"
                >
                  {course.isInfinite ? '練習を終了する' : 'リタイア'}
                </button>
              </div>
            </div>

            <div className="flex-grow relative bg-orange-50/50 rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner">
              <div 
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-slate-700 border-y-8 border-slate-600 shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.05) 38px, rgba(255,255,255,0.05) 40px)',
                  animation: isConveyorOn ? 'conveyor 1s linear infinite' : 'none'
                }}
              />

              {clearedPlates.map(plate => (
                <div 
                  key={plate.id}
                  className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-0`}
                  style={{
                    left: '100%',
                    animation: `flow ${plate.animTime}s linear forwards`,
                    animationDelay: `-${plate.elapsed}s`
                  }}
                  onAnimationEnd={() => {
                    setClearedPlates(prev => prev.filter(p => p.id !== plate.id));
                  }}
                >
                  <div className="relative mb-3">
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl ${plate.css}`}></div>
                    <div className="text-6xl md:text-7xl opacity-0 translate-y-2">🍞</div>
                  </div>
                  
                  <div className="bg-slate-100/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-md border-2 border-slate-300 text-center whitespace-nowrap min-w-[200px] opacity-70">
                    <div className="text-lg md:text-xl font-bold text-slate-600 mb-1 flex justify-center items-center gap-2">
                      <span>{plate.word.name}</span>
                      <span className="text-sm bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full border border-slate-300">¥{plate.word.displayPrice}</span>
                    </div>
                    <div className="text-2xl md:text-4xl font-mono font-black tracking-widest text-slate-400">
                      {plate.word.romaji}
                    </div>
                  </div>
                </div>
              ))}

              {currentBread && (
                <div 
                  key={animKey}
                  className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-10 ${!isConveyorOn ? 'left-1/2 -translate-x-1/2' : ''}`}
                  style={isConveyorOn ? {
                    left: '100%',
                    animation: `flow ${animTime}s linear forwards`
                  } : {}}
                  onAnimationEnd={isConveyorOn ? handleMissWord : undefined}
                >
                  <div className="relative mb-3">
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl ${activePlate.css}`}></div>
                    <div className="text-6xl md:text-7xl drop-shadow-lg relative z-10 transition-transform hover:scale-110 translate-y-2">
                      {currentBread.word.emoji}
                    </div>
                  </div>
                  
                  {/* タイピングバー（絶対に消えないように再設定！） */}
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border-2 border-orange-200 text-center whitespace-nowrap min-w-[200px]">
                    <div className="text-lg md:text-xl font-bold text-amber-900 mb-1 flex justify-center items-center gap-2">
                      <span>{currentBread.word.name}</span>
                      <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">¥{Math.floor(currentBread.word.price * currentEmotionMultiplier * (scoreBoost ? 2 : 1))}</span>
                    </div>
                    <div className="text-2xl md:text-4xl font-mono font-black tracking-widest">
                      <span className="text-slate-300">
                        {currentBread.word.romaji.substring(0, currentBread.typedCount)}
                      </span>
                      <span className="text-orange-500 border-b-4 border-orange-500 pb-1">
                        {currentBread.word.romaji.substring(currentBread.typedCount, currentBread.typedCount + 1)}
                      </span>
                      <span className="text-amber-800">
                        {currentBread.word.romaji.substring(currentBread.typedCount + 1)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === リザルト画面 === */}
        {gameState === 'result' && (
          <div className="text-center pt-24 pb-12">
            <h2 className="text-4xl font-black text-amber-800 mb-2">
              {course.noCoin ? '練習終了！🥖' : 'タイムアップ！🥖'}
            </h2>
            <p className="text-xl font-bold text-orange-600 mb-4">コース: {course.name}</p>
            
            {!course.noCoin ? (
              <div className="inline-block bg-yellow-100 border-2 border-yellow-400 px-6 py-2 rounded-full mb-8 animate-bounce shadow-md">
                <p className="text-lg font-black text-yellow-700">+{score} コイン獲得！</p>
              </div>
            ) : (
              <div className="inline-block bg-teal-100 border-2 border-teal-400 px-6 py-2 rounded-full mb-8 shadow-md">
                <p className="text-lg font-black text-teal-700">練習お疲れ様{activeStaff.suffix}！</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100 col-span-2 md:col-span-1">
                <p className="text-sm text-amber-600 font-bold">最終スコア</p>
                <p className="text-4xl font-black text-orange-500">{score}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                <p className="text-sm text-amber-600 font-bold">獲得パン数</p>
                <p className="text-3xl font-black text-amber-700">{clearedBreads} 個</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                <p className="text-sm text-amber-600 font-bold">最大コンボ</p>
                <p className="text-3xl font-black text-amber-700">{maxCombo}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                <p className="text-sm text-amber-600 font-bold">正解タイプ</p>
                <p className="text-2xl font-black text-amber-700">{totalTyped} 回</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                <p className="text-sm text-amber-600 font-bold">正解率</p>
                <p className="text-2xl font-black text-amber-700">{accuracy} %</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setGameState('title')} className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">
                タイトルへ
              </button>
              <button onClick={() => setGameState('shop')} className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">🛒</span> ショップへ
              </button>
            </div>
          </div>
        )}

        {/* === セーブ/ロードモーダル === */}
        {isSaveModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-teal-100">
              <h2 className="text-2xl font-black text-teal-800 mb-2 flex items-center gap-2">
                <span>💾</span> データ引き継ぎ
              </h2>
              <p className="text-sm text-slate-600 mb-4 font-bold">
                セーブコードを発行して、次回プレイ時にロードできます。
              </p>
              
              <textarea
                value={saveLoadText}
                onChange={(e) => setSaveLoadText(e.target.value)}
                className="w-full h-32 p-3 border-2 border-teal-200 rounded-xl mb-2 font-mono text-xs focus:outline-none focus:border-teal-500 bg-slate-50"
                placeholder="ここにセーブコードが表示されます。ロードする場合はコードを貼り付けてください。"
              />
              
              <div className="min-h-[24px] mb-4">
                {saveMessage && <p className="text-teal-600 font-bold text-center text-sm">{saveMessage}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={handleSave} className="bg-teal-500 hover:bg-teal-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-teal-600 active:border-b-0">
                  セーブ発行
                </button>
                <button onClick={copyToClipboard} className="bg-amber-500 hover:bg-amber-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-amber-600 active:border-b-0">
                  コピー
                </button>
              </div>
              
              <div className="mb-6">
                <button onClick={handleLoad} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-blue-600 active:border-b-0">
                  コードからロード
                </button>
              </div>

              <button onClick={() => setIsSaveModalOpen(false)} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all">
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* === ゲーム終了確認モーダル === */}
        {isExitModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-4 border-rose-200 text-center">
              <h2 className="text-3xl font-black text-rose-500 mb-4 flex items-center justify-center gap-2">
                <span>⚠️</span> 警告
              </h2>
              <p className="text-lg text-amber-900 font-bold mb-8">
                セーブされていません！<br/>本当にゲームを終了しますか？
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setIsExitModalOpen(false);
                    setSaveLoadText(""); setSaveMessage(""); setIsSaveModalOpen(true);
                  }}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-white font-black py-4 rounded-xl shadow-md active:translate-y-1 transition-all text-lg border-b-4 border-teal-600 active:border-b-0"
                >
                  セーブ・ロードメニューを開く
                </button>
                <button 
                  onClick={() => {
                    setIsExitModalOpen(false);
                    setGameState('closed');
                  }}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all"
                >
                  ゲームを終了する
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === ゲーム終了後（Closed）画面 === */}
        {gameState === 'closed' && (
          <div className="text-center pt-32 pb-20 flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-4xl md:text-5xl font-black text-slate-500 mb-6 drop-shadow-sm">ゲームを終了しました</h1>
            <p className="text-lg text-slate-600 font-bold mb-12">お疲れ様でした。ブラウザのタブを閉じてください。</p>
            <button
              onClick={() => { setGameState('title'); playSound('type'); }}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-full shadow-md transition-all active:translate-y-1 border-b-4 border-orange-600 active:border-b-0"
            >
              やっぱりもう一度遊ぶ
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-amber-700/60 font-medium text-sm">
        PCのキーボード専用ゲームです
      </div>
    </div>
  );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
