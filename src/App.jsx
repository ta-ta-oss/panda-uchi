import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  { name: '食パン', kana: 'しょくぱん', romaji: 'shokupan', emoji: '🍞', time: 5.0 },
  { name: 'メロンパン', kana: 'めろんぱん', romaji: 'meronpan', emoji: '🍈🍞', time: 5.5 },
  { name: 'クロワッサン', kana: 'くろわっさん', romaji: 'kurowassan', emoji: '🥐', time: 6.0 },
  { name: 'フランスパン', kana: 'ふらんすぱん', romaji: 'furansupan', emoji: '🥖', time: 6.5 },
  { name: 'あんぱん', kana: 'あんぱん', romaji: 'anpan', emoji: '🫘🍞', time: 5.0 },
  { name: 'カレーパン', kana: 'かれーぱん', romaji: 'kare-pan', emoji: '🍛🍞', time: 5.5 },
  { name: 'サンドイッチ', kana: 'さんどいっち', romaji: 'sandoitchi', emoji: '🥪', time: 6.5 },
  { name: 'ベーグル', kana: 'べーぐる', romaji: 'be-guru', emoji: '🥯', time: 5.0 },
  { name: 'ホットドッグ', kana: 'ほっとどっぐ', romaji: 'hottodoggu', emoji: '🌭', time: 6.0 },
  { name: 'ハンバーガー', kana: 'はんばーがー', romaji: 'hanba-ga-', emoji: '🍔', time: 6.0 },
  { name: 'チョココロネ', kana: 'ちょこころね', romaji: 'chokokorone', emoji: '🍫🥐', time: 6.5 },
  { name: 'パンケーキ', kana: 'ぱんけーき', romaji: 'panke-ki', emoji: '🥞', time: 5.5 },
];

// 追加されるプレミアムパン（ショップで購入後出現）
const PREMIUM_BREADS = [
  { name: 'クロックムッシュ', kana: 'くろっくむっしゅ', romaji: 'kurokkumusshu', emoji: '🥪', time: 6.0 },
  { name: 'シナモンロール', kana: 'しなもんろーる', romaji: 'shinamonro-ru', emoji: '🍥', time: 7.0 },
  { name: 'フルーツサンド', kana: 'ふるーつさんど', romaji: 'furu-tsusando', emoji: '🍓🥪', time: 6.5 },
];

const COURSES = {
  easy: { id: 'easy', name: 'お手軽', speed: 1.5, color: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600' },
  normal: { id: 'normal', name: 'ふつう', speed: 1.0, color: 'bg-orange-500 hover:bg-orange-400 border-orange-600' },
  hard: { id: 'hard', name: '激ムズ', speed: 0.7, color: 'bg-rose-500 hover:bg-rose-400 border-rose-600' },
};

// ショップのアイテムデータ（便利アイテム）
const SHOP_ITEMS = [
  { id: 'premium_bread', name: '高級パンレシピ', desc: '新種のパン（クロックムッシュ等）が流れてくる！', price: 1000, emoji: '📖' },
  { id: 'golden_timer', name: '金のタイマー', desc: '制限時間が 60秒 → 75秒 にアップ！', price: 2000, emoji: '⏳' },
  { id: 'panda_apron', name: '特製エプロン', desc: 'コンボボーナスの点数が2倍になる！', price: 3000, emoji: '🎽' }
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

// ショップの設備データ
const FACILITY_ITEMS = [
  { id: 'conveyor_switch', name: 'レーンの電源スイッチ', desc: 'レーンの動きを止めて中央固定にする。見逃しミスがなくなる！', price: 2000, emoji: '🔌' },
];

// ショップのパンダの感情データ
const EMOTION_ITEMS = [
  { id: 'emotion_angry', name: '怒りのパンダ', desc: 'パンダが怒ってレーンが加速！代わりに獲得スコア(コイン)が2倍に！', price: 3000, emoji: '💢' },
];

// 安全な効果音再生（Web Audio API）
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
      // 購入音
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // Audio context initialization failed
  }
};

export default function App() {
  const [gameState, setGameState] = useState('title'); // 'title', 'playing', 'result', 'shop'
  const [shopTab, setShopTab] = useState('items'); // 'items', 'plates', 'facilities', 'emotions'
  const [course, setCourse] = useState(COURSES.normal);
  const [currentBread, setCurrentBread] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  
  // ゲームステート
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [clearedBreads, setClearedBreads] = useState(0);

  // ショップ・インベントリステート
  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [plateInventory, setPlateInventory] = useState(['plate_default']);
  const [activePlateId, setActivePlateId] = useState('plate_default');
  const [facilityInventory, setFacilityInventory] = useState([]);
  const [isConveyorOn, setIsConveyorOn] = useState(true);
  const [emotionInventory, setEmotionInventory] = useState([]);
  const [activeEmotion, setActiveEmotion] = useState('normal');

  const timerRef = useRef(null);

  // 初期オーディオロック解除
  useEffect(() => {
    const unlockAudio = () => {
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        if (audio.paused) {
          originalAudioPlay.call(audio).catch(() => {});
        }
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

  // ランダムなパンをレーンに流す
  const spawnWord = useCallback(() => {
    let words = [...BREAD_WORDS];
    // アイテム効果: 高級パンレシピ
    if (inventory.includes('premium_bread')) {
      words = [...words, ...PREMIUM_BREADS];
    }
    const nextWord = words[Math.floor(Math.random() * words.length)];
    setCurrentBread({ word: nextWord, typedCount: 0 });
    setAnimKey(prev => prev + 1);
  }, [inventory]);

  // ゲーム開始
  const startGame = (selectedCourse) => {
    // アイテム効果: 金のタイマー
    const baseGameTime = inventory.includes('golden_timer') ? 75 : 60;
    
    setCourse(selectedCourse);
    setScore(0);
    setTimeLeft(baseGameTime);
    setCombo(0);
    setMaxCombo(0);
    setTotalTyped(0);
    setMissCount(0);
    setClearedBreads(0);
    setGameState('playing');
    spawnWord();
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  // タイムアップ時の処理
  useEffect(() => {
    if (gameState === 'playing' && timeLeft <= 0) {
      clearInterval(timerRef.current);
      setGameState('result');
      // 獲得スコアをそのままコインに加算
      setCoins(prev => prev + score);
    }
  }, [timeLeft, gameState, score]);

  // パンが左端まで流れ切った（見逃しミス）
  const handleMissWord = useCallback(() => {
    if (gameState !== 'playing') return;
    playSound('miss');
    setCombo(0);
    setMissCount(prev => prev + 1);
    spawnWord();
  }, [gameState, spawnWord]);

  // タイピング処理
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing' || !currentBread) return;
      if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Enter', 'Backspace'].includes(e.key)) return;

      const expectedChar = currentBread.word.romaji[currentBread.typedCount];

      if (e.key.toLowerCase() === expectedChar.toLowerCase()) {
        playSound('type');
        const newTypedCount = currentBread.typedCount + 1;
        setTotalTyped((prev) => prev + 1);
        
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo(prev => Math.max(prev, newCombo));

        // アイテム効果: 特製エプロンでコンボボーナス2倍
        const bonusMultiplier = inventory.includes('panda_apron') ? 2 : 1;
        const comboBonus = Math.floor(newCombo / 10) * 5 * bonusMultiplier;
        
        // アイテム効果: 怒りのパンダで獲得スコア(コイン)2倍
        const emotionMultiplier = activeEmotion === 'emotion_angry' ? 2 : 1;
        
        setScore((prev) => prev + (10 + comboBonus) * emotionMultiplier);

        if (newTypedCount === currentBread.word.romaji.length) {
          playSound('clear');
          setScore((prev) => prev + (currentBread.word.romaji.length * 10 * emotionMultiplier)); // クリアボーナスも倍増
          setClearedBreads((prev) => prev + 1);
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
  }, [gameState, currentBread, combo, spawnWord, inventory, activeEmotion]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ショップでの購入処理（便利アイテム）
  const handleBuyItem = (item) => {
    if (coins >= item.price && !inventory.includes(item.id)) {
      setCoins(prev => prev - item.price);
      setInventory(prev => [...prev, item.id]);
      playSound('buy');
    }
  };

  // ショップでの購入処理（お皿）
  const handleBuyPlate = (plate) => {
    if (coins >= plate.price && !plateInventory.includes(plate.id)) {
      setCoins(prev => prev - plate.price);
      setPlateInventory(prev => [...prev, plate.id]);
      setActivePlateId(plate.id); // 購入したら自動で装備
      playSound('buy');
    }
  };

  // ショップでの購入処理（設備）
  const handleBuyFacility = (item) => {
    if (coins >= item.price && !facilityInventory.includes(item.id)) {
      setCoins(prev => prev - item.price);
      setFacilityInventory(prev => [...prev, item.id]);
      playSound('buy');
    }
  };

  // ショップでの購入処理（感情）
  const handleBuyEmotion = (item) => {
    if (coins >= item.price && !emotionInventory.includes(item.id)) {
      setCoins(prev => prev - item.price);
      setEmotionInventory(prev => [...prev, item.id]);
      setActiveEmotion(item.id); // 購入したら自動でON
      playSound('buy');
    }
  };

  // お皿の装備処理
  const handleEquipPlate = (plateId) => {
    setActivePlateId(plateId);
    playSound('type');
  };

  const accuracy = totalTyped + missCount === 0 ? 0 : Math.floor((totalTyped / (totalTyped + missCount)) * 100);

  // パンダのセリフ
  const getPandaMessage = () => {
    if (gameState === 'title') return 'パン屋へようこそ！';
    if (gameState === 'shop') return '稼いだコインで買い物パン！';
    if (gameState === 'playing') {
      if (activeEmotion === 'emotion_angry') return '早く取るパン！！💢';
      if (combo > 20) return 'すごいペースだパン！';
      if (combo > 10) return 'その調子だパン！';
      if (timeLeft <= 10) return 'いそげいそげパン！';
      return '流れるパンを打つパン！';
    }
    if (gameState === 'result') {
      if (score > 3000) return '君はマスターパン！';
      if (score > 1000) return 'なかなかやるパンね！';
      return 'また挑戦してパン！';
    }
  };

  const baseGameTime = inventory.includes('golden_timer') ? 75 : 60;
  
  // 現在装備中のお皿データを取得
  const activePlate = PLATE_ITEMS.find(p => p.id === activePlateId) || PLATE_ITEMS[0];

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
        
        {/* 背景の装飾 */}
        <div className="absolute top-0 left-0 w-full h-4 bg-orange-400 opacity-20" />
        
        {/* 右上のコイン表示 */}
        <div className="absolute top-6 right-6 bg-orange-50 px-4 py-2 rounded-full border-2 border-orange-200 font-black text-orange-600 shadow-sm z-20 flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span>{coins} C</span>
        </div>

        {/* 店員のパンダ */}
        <div className="absolute top-6 left-6 flex items-start gap-3 z-20">
          <div className="text-5xl md:text-6xl drop-shadow-md animate-bounce relative" style={{ animationDuration: '2s' }}>
            🐼
            {activeEmotion === 'emotion_angry' && (
              <span className="absolute -top-2 -left-2 text-3xl drop-shadow-sm animate-pulse">💢</span>
            )}
          </div>
          <div className="mt-2 bg-white px-4 py-2 rounded-2xl shadow-md border-2 border-slate-200 text-sm md:text-base font-bold text-slate-700 relative whitespace-nowrap">
            {getPandaMessage()}
            <div className="absolute top-1/2 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent -translate-y-1/2 drop-shadow-sm"></div>
          </div>
        </div>
        
        {/* === タイトル画面 === */}
        {gameState === 'title' && (
          <div className="text-center pt-28 pb-12">
            <h1 className="text-5xl md:text-7xl font-black text-orange-500 mb-4 tracking-wider drop-shadow-sm">🍞 パン打 🥐</h1>
            <p className="text-xl text-amber-700 font-bold mb-10">〜 流れるベーカリー・タイピング 〜</p>
            
            <div className="bg-orange-100/50 p-6 rounded-2xl inline-block text-left mb-10 border border-orange-200">
              <ul className="list-disc list-inside text-amber-900 space-y-2 font-medium">
                <li>右から左へ流れるパンの名前をタイピングしよう！</li>
                <li>左端に消える前に打ち切らないとミスになります。</li>
                <li>制限時間は <strong>{baseGameTime}秒</strong> です。</li>
                <li className="text-orange-600 text-sm mt-4">※IME（日本語入力）をオフにし、半角英数でプレイしてください。</li>
              </ul>
            </div>

            <p className="text-lg font-bold text-amber-800 mb-4">難易度を選んでスタート！</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.values(COURSES).map(c => (
                <button
                  key={c.id}
                  onClick={() => startGame(c)}
                  className={`px-8 py-4 rounded-xl text-white font-black text-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-lg ${c.color}`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setGameState('shop')}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
              >
                <span className="text-2xl">🛒</span> ショップへ行く
              </button>
            </div>
          </div>
        )}

        {/* === ショップ画面 === */}
        {gameState === 'shop' && (
          <div className="pt-28 pb-12 px-4 md:px-10">
            <h2 className="text-4xl font-black text-amber-800 mb-6 text-center">🛒 パンダショップ</h2>
            
            {/* ショップのタブ切り替え */}
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              <button 
                onClick={() => setShopTab('items')}
                className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'items' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}
              >
                便利アイテム
              </button>
              <button 
                onClick={() => setShopTab('plates')}
                className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'plates' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}
              >
                お皿カスタマイズ
              </button>
              <button 
                onClick={() => setShopTab('facilities')}
                className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'facilities' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}
              >
                設備
              </button>
              <button 
                onClick={() => setShopTab('emotions')}
                className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'emotions' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}
              >
                パンダの感情
              </button>
            </div>
            
            {/* アイテムコーナー */}
            {shopTab === 'items' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {SHOP_ITEMS.map(item => {
                  const isBought = inventory.includes(item.id);
                  const canBuy = coins >= item.price && !isBought;
                  return (
                    <div key={item.id} className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isBought ? 'bg-slate-50 border-slate-200' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-4 text-center md:text-left">
                        <div className={`text-5xl ${isBought ? 'opacity-50' : ''}`}>{item.emoji}</div>
                        <div>
                          <h3 className={`text-xl font-bold ${isBought ? 'text-slate-500' : 'text-amber-900'}`}>{item.name}</h3>
                          <p className={`text-sm ${isBought ? 'text-slate-400' : 'text-amber-700'}`}>{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right shrink-0">
                        {!isBought && <p className="text-lg font-bold text-orange-500 mb-2">{item.price} C</p>}
                        <button
                          disabled={!canBuy}
                          onClick={() => handleBuyItem(item)}
                          className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${
                            isBought ? 'bg-slate-400 cursor-not-allowed' :
                            canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' :
                            'bg-rose-300 cursor-not-allowed'
                          }`}
                        >
                          {isBought ? '購入済み' : '購入する'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* お皿コーナー */}
            {shopTab === 'plates' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {PLATE_ITEMS.map(plate => {
                  const isOwned = plateInventory.includes(plate.id);
                  const canBuy = coins >= plate.price && !isOwned;
                  const isEquipped = activePlateId === plate.id;

                  return (
                    <div key={plate.id} className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isEquipped ? 'bg-orange-100 border-orange-400' : isOwned ? 'bg-slate-50 border-slate-200' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto">
                        <div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${plate.css}`}></div>
                        <div>
                          <h3 className={`text-xl font-bold ${isOwned ? 'text-amber-900' : 'text-amber-900'}`}>
                            {plate.name} {isEquipped && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2 align-middle">装備中</span>}
                          </h3>
                          <p className={`text-sm ${isOwned ? 'text-amber-700' : 'text-amber-700'}`}>{plate.desc}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right shrink-0">
                        {!isOwned && <p className="text-lg font-bold text-orange-500 mb-2">{plate.price} C</p>}
                        {isOwned ? (
                          <button
                            disabled={isEquipped}
                            onClick={() => handleEquipPlate(plate.id)}
                            className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${
                              isEquipped ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white active:translate-y-1 border-b-4 border-blue-600 active:border-b-0'
                            }`}
                          >
                            {isEquipped ? '装備中' : '装備する'}
                          </button>
                        ) : (
                          <button
                            disabled={!canBuy}
                            onClick={() => handleBuyPlate(plate)}
                            className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${
                              canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' :
                              'bg-rose-300 cursor-not-allowed'
                            }`}
                          >
                            購入する
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 設備コーナー */}
            {shopTab === 'facilities' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {FACILITY_ITEMS.map(item => {
                  const isBought = facilityInventory.includes(item.id);
                  const canBuy = coins >= item.price && !isBought;
                  return (
                    <div key={item.id} className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isBought ? 'bg-orange-100 border-orange-400' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-4 text-center md:text-left">
                        <div className={`text-5xl`}>{item.emoji}</div>
                        <div>
                          <h3 className={`text-xl font-bold text-amber-900`}>{item.name}</h3>
                          <p className={`text-sm text-amber-700`}>{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right shrink-0">
                        {!isBought && <p className="text-lg font-bold text-orange-500 mb-2">{item.price} C</p>}
                        {isBought ? (
                          <button
                            onClick={() => {
                              setIsConveyorOn(!isConveyorOn);
                              playSound('type');
                            }}
                            className={`px-6 py-2 rounded-full font-bold shadow-md transition-all text-white border-b-4 active:border-b-0 active:translate-y-1 ${
                              isConveyorOn ? 'bg-blue-500 hover:bg-blue-400 border-blue-600' : 'bg-slate-500 hover:bg-slate-400 border-slate-600'
                            }`}
                          >
                            {isConveyorOn ? '稼働中 (OFFにする)' : '停止中 (ONにする)'}
                          </button>
                        ) : (
                          <button
                            disabled={!canBuy}
                            onClick={() => handleBuyFacility(item)}
                            className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${
                              canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' :
                              'bg-rose-300 cursor-not-allowed'
                            }`}
                          >
                            購入する
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 感情コーナー */}
            {shopTab === 'emotions' && (
              <div className="grid gap-4 max-w-2xl mx-auto mb-10">
                {EMOTION_ITEMS.map(item => {
                  const isBought = emotionInventory.includes(item.id);
                  const canBuy = coins >= item.price && !isBought;
                  const isActive = activeEmotion === item.id;

                  return (
                    <div key={item.id} className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isActive ? 'bg-orange-100 border-orange-400' : isBought ? 'bg-slate-50 border-slate-200' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-4 text-center md:text-left">
                        <div className={`text-5xl ${!isBought ? 'opacity-80' : ''}`}>{item.emoji}</div>
                        <div>
                          <h3 className={`text-xl font-bold ${isBought ? 'text-amber-900' : 'text-amber-900'}`}>
                            {item.name} {isActive && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2 align-middle">ON</span>}
                          </h3>
                          <p className={`text-sm text-amber-700`}>{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right shrink-0">
                        {!isBought && <p className="text-lg font-bold text-orange-500 mb-2">{item.price} C</p>}
                        {isBought ? (
                          <button
                            onClick={() => {
                              setActiveEmotion(isActive ? 'normal' : item.id);
                              playSound('type');
                            }}
                            className={`px-6 py-2 rounded-full font-bold shadow-md transition-all text-white border-b-4 active:border-b-0 active:translate-y-1 ${
                              isActive ? 'bg-slate-500 hover:bg-slate-400 border-slate-600' : 'bg-blue-500 hover:bg-blue-400 border-blue-600'
                            }`}
                          >
                            {isActive ? 'OFFにする' : 'ONにする'}
                          </button>
                        ) : (
                          <button
                            disabled={!canBuy}
                            onClick={() => handleBuyEmotion(item)}
                            className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${
                              canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' :
                              'bg-rose-300 cursor-not-allowed'
                            }`}
                          >
                            購入する
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setGameState('title')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all"
              >
                タイトルへ戻る
              </button>
            </div>
          </div>
        )}

        {/* === プレイ画面 === */}
        {gameState === 'playing' && (
          <div className="flex flex-col h-[500px] pt-16">
            <div className="flex justify-between items-end mb-4 border-b-2 border-orange-100 pb-4">
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
              <div className="text-right">
                <p className="text-xs md:text-sm text-amber-600 font-bold">TIME</p>
                <p className={`text-4xl md:text-6xl font-black tabular-nums leading-none ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>
                  {timeLeft}<span className="text-2xl text-amber-700">s</span>
                </p>
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

              {currentBread && (
                <div 
                  key={animKey}
                  className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-10 ${!isConveyorOn ? 'left-1/2 -translate-x-1/2' : ''}`}
                  style={isConveyorOn ? {
                    left: '100%',
                    animation: `flow ${currentBread.word.time * course.speed * (activeEmotion === 'emotion_angry' ? 0.6 : 1.0)}s linear forwards`
                  } : {}}
                  onAnimationEnd={isConveyorOn ? handleMissWord : undefined}
                >
                  <div className="relative mb-3">
                    {/* 購入・装備したお皿がここに反映される */}
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl ${activePlate.css}`}></div>
                    <div className="text-7xl md:text-8xl drop-shadow-lg relative z-10 transition-transform hover:scale-110">
                      {currentBread.word.emoji}
                    </div>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border-2 border-orange-200 text-center whitespace-nowrap min-w-[200px]">
                    <div className="text-lg md:text-xl font-bold text-amber-900 mb-1">{currentBread.word.name}</div>
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
            <h2 className="text-4xl font-black text-amber-800 mb-2">タイムアップ！🥖</h2>
            <p className="text-xl font-bold text-orange-600 mb-4">コース: {course.name}</p>
            
            {/* 獲得コインの表示 */}
            <div className="inline-block bg-yellow-100 border-2 border-yellow-400 px-6 py-2 rounded-full mb-8 animate-bounce shadow-md">
              <p className="text-lg font-black text-yellow-700">+{score} コイン獲得！</p>
            </div>
            
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
              <button
                onClick={() => setGameState('title')}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all"
              >
                タイトルへ
              </button>
              <button
                onClick={() => setGameState('shop')}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
              >
                <span className="text-2xl">🛒</span> ショップへ
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-amber-700/60 font-medium text-sm">
        PCのキーボード専用ゲームです
      </div>
    </div>
  );
}
