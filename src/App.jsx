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

// --- 定数・データ ---
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
const SECRET_BREADS = [
  { name: 'レインボーパン', kana: 'れいんぼーぱん', romaji: 'reinbo-pan', emoji: '🌈🍞', time: 8.0, price: 1000 },
  { name: 'ユニコーンパン', kana: 'ゆにこーんぱん', romaji: 'yuniko-npan', emoji: '🦄🍞', time: 8.5, price: 1500 },
];
const WATER_WORDS = [
  { name: 'お水', kana: 'おみず', romaji: 'omizu', emoji: '💧' },
  { name: '氷水', kana: 'こおりみず', romaji: 'koorimizu', emoji: '🧊💧' },
  { name: '天然水', kana: 'てんねんすい', romaji: 'tennensui', emoji: '🏞️💧' },
];
const DEER_SENBEI = { name: '鹿せんべい', kana: 'しかせんべい', romaji: 'shikasenbei', emoji: '🍘', time: 5.0, price: 50 };

const COURSES = {
  practice: { id: 'practice', name: '練習', isInfinite: true, noCoin: true },
  easy: { id: 'easy', name: 'イージー', speed: 1.5, color: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600' },
  normal: { id: 'normal', name: 'ノーマル', speed: 1.0, color: 'bg-orange-500 hover:bg-orange-400 border-orange-600' },
  hard: { id: 'hard', name: 'ハード', speed: 0.7, color: 'bg-rose-500 hover:bg-rose-400 border-rose-600' },
  very_hard: { id: 'very_hard', name: 'ベリーハード', speed: 0.4, fastTimer: true, color: 'bg-purple-600 hover:bg-purple-500 border-purple-800' },
};

const SHOP_ITEMS = [
  { id: 'premium_bread', name: '高級パンレシピ', desc: '新種のパン（クロックムッシュ等）が流れてくる！', price: 1000, emoji: '📖' },
  { id: 'golden_timer', name: '金のタイマー', desc: '制限時間が 60秒 → 75秒 にアップ！', price: 2000, emoji: '⏳' },
  { id: 'diamond_timer', name: 'ダイヤのタイマー', desc: '制限時間が 60秒 → 100秒 に大幅アップ！', price: 5000, emoji: '💎' },
  { id: 'panda_apron', name: '特製エプロン', desc: 'コンボボーナスの点数が2倍になる！', price: 3000, emoji: '🎽' },
  { id: 'secret_bread', name: '幻のパンレシピ', desc: '超高額な伝説のパンが流れてくる…！', price: 10000, emoji: '✨', isSecret: true }
];

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

const TAKEN_NICKNAMES = ['パンダ', 'テスト', 'ゲスト', 'admin', '名無し'];

// --- オーディオエンジン ---
let bgmAudioCtx = null;
let isBgmPlaying = false;
let bgmTimerId = null;
let current16thNote = 0;
let nextNotetime = 0.0;
let currentBgmType = 'normal';

let windSrc = null;
let windGainNode = null;
let windLfo = null;
let soundCtx = null;

const startWind = () => {
  if (!bgmAudioCtx) return;
  if (windSrc) return;
  const bufferSize = bgmAudioCtx.sampleRate * 2;
  const buffer = bgmAudioCtx.createBuffer(1, bufferSize, bgmAudioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  windSrc = bgmAudioCtx.createBufferSource();
  windSrc.buffer = buffer;
  windSrc.loop = true;
  
  const filter = bgmAudioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  
  windLfo = bgmAudioCtx.createOscillator();
  windLfo.type = 'sine';
  windLfo.frequency.value = 0.15;
  const lfoGain = bgmAudioCtx.createGain();
  lfoGain.gain.value = 250;
  windLfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  windLfo.start();

  windGainNode = bgmAudioCtx.createGain();
  windGainNode.gain.value = 0.05;
  windSrc.connect(filter);
  filter.connect(windGainNode);
  windGainNode.connect(bgmAudioCtx.destination);
  windSrc.start();
};

const stopWind = () => {
  if (windSrc) { try { windSrc.stop(); } catch(e){} windSrc.disconnect(); windSrc = null; }
  if (windLfo) { try { windLfo.stop(); } catch(e){} windLfo.disconnect(); windLfo = null; }
  if (windGainNode) { windGainNode.disconnect(); windGainNode = null; }
};

const bgmMelody = [
  523.25, 0, 523.25, 0, 659.25, 0, 783.99, 0, 1046.50, 0, 783.99, 0, 659.25, 0, 523.25, 0,
  698.46, 0, 698.46, 0, 880.00, 0, 1046.50, 0, 1396.91, 0, 1046.50, 0, 880.00, 0, 698.46, 0,
  783.99, 0, 783.99, 0, 987.77, 0, 1174.66, 0, 1567.98, 0, 1174.66, 0, 987.77, 0, 783.99, 0,
  523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  440.00, 0, 440.00, 0, 523.25, 0, 659.25, 0, 880.00, 0, 659.25, 0, 523.25, 0, 440.00, 0,
  329.63, 0, 329.63, 0, 392.00, 0, 493.88, 0, 659.25, 0, 493.88, 0, 392.00, 0, 329.63, 0,
  349.23, 0, 349.23, 0, 440.00, 0, 523.25, 0, 698.46, 0, 523.25, 0, 440.00, 0, 349.23, 0,
  392.00, 0, 493.88, 0, 587.33, 0, 783.99, 0, 783.99, 0, 587.33, 0, 493.88, 0, 392.00, 0,
  523.25, 0, 659.25, 0, 783.99, 0, 1046.50, 0, 1567.98, 0, 1046.50, 0, 783.99, 0, 659.25, 0,
  698.46, 0, 880.00, 0, 1046.50, 0, 1396.91, 0, 1046.50, 0, 880.00, 0, 698.46, 0, 523.25, 0,
  783.99, 0, 987.77, 0, 1174.66, 0, 1567.98, 0, 1174.66, 0, 987.77, 0, 783.99, 0, 659.25, 0,
  1046.50, 0, 783.99, 0, 659.25, 0, 523.25, 0, 523.25, 659.25, 783.99, 1046.50, 0, 0, 0, 0
];
const bgmBass = [
  130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0,
  174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0,
  196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0,
  130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0,
  220.00, 0, 220.00, 0, 220.00, 0, 220.00, 0, 220.00, 0, 220.00, 0, 220.00, 0, 220.00, 0,
  164.81, 0, 164.81, 0, 164.81, 0, 164.81, 0, 164.81, 0, 164.81, 0, 164.81, 0, 164.81, 0,
  174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0,
  196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0,
  130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0,
  174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0, 174.61, 0,
  196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0, 196.00, 0,
  130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0
];
const creepyMelody = [
  261.63, 0, 0, 0, 277.18, 0, 0, 0, 261.63, 0, 0, 0, 277.18, 0, 0, 0,
  311.13, 0, 0, 0, 293.66, 0, 0, 0, 311.13, 0, 0, 0, 293.66, 0, 0, 0,
  261.63, 0, 0, 0, 277.18, 0, 0, 0, 261.63, 0, 0, 0, 277.18, 0, 0, 0,
  246.94, 0, 0, 0, 233.08, 0, 0, 0, 246.94, 0, 0, 0, 233.08, 0, 0, 0,
];
const creepyBass = [
  65.41, 0, 0, 0, 0, 0, 0, 0, 69.30, 0, 0, 0, 0, 0, 0, 0,
  65.41, 0, 0, 0, 0, 0, 0, 0, 69.30, 0, 0, 0, 0, 0, 0, 0,
  65.41, 0, 0, 0, 0, 0, 0, 0, 69.30, 0, 0, 0, 0, 0, 0, 0,
  61.74, 0, 0, 0, 0, 0, 0, 0, 58.27, 0, 0, 0, 0, 0, 0, 0,
];
const shopMelody = [
  523.25, 0, 0, 0, 659.25, 0, 0, 0, 783.99, 0, 0, 0, 659.25, 0, 0, 0,
  698.46, 0, 0, 0, 880.00, 0, 0, 0, 1046.50,0, 0, 0, 880.00, 0, 0, 0,
  783.99, 0, 0, 0, 987.77, 0, 0, 0, 1174.66,0, 0, 0, 987.77, 0, 0, 0,
  1046.50,0, 783.99, 0, 659.25, 0, 523.25, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
const shopBass = [
  130.81, 0, 0, 0, 196.00, 0, 0, 0, 196.00, 0, 0, 0, 0, 0, 0, 0,
  174.61, 0, 0, 0, 261.63, 0, 0, 0, 261.63, 0, 0, 0, 0, 0, 0, 0,
  196.00, 0, 0, 0, 293.66, 0, 0, 0, 293.66, 0, 0, 0, 0, 0, 0, 0,
  130.81, 0, 0, 0, 196.00, 0, 0, 0, 261.63, 0, 0, 0, 0, 0, 0, 0
];

const scheduleBgmNote = (beatNumber, time) => {
  if (!bgmAudioCtx) return;
  let melodyArray = bgmMelody; let bassArray = bgmBass; let isMuffled = false;
  if (currentBgmType === 'creepy') { melodyArray = creepyMelody; bassArray = creepyBass; } 
  else if (currentBgmType === 'shop' || currentBgmType === 'entrance') { melodyArray = shopMelody; bassArray = shopBass; if (currentBgmType === 'entrance') isMuffled = true; }

  const mFreq = melodyArray[beatNumber % melodyArray.length];
  if (mFreq > 0) {
    const osc = bgmAudioCtx.createOscillator();
    const gain = bgmAudioCtx.createGain();
    let targetDest = bgmAudioCtx.destination;
    if (isMuffled) {
      const filter = bgmAudioCtx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 600; 
      gain.connect(filter); filter.connect(targetDest);
    } else { gain.connect(targetDest); }
    
    if (currentBgmType === 'creepy') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(mFreq, time); osc.frequency.linearRampToValueAtTime(mFreq - 5, time + 0.3);
      osc.connect(gain); gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(0.015, time + 0.1); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
      osc.start(time); osc.stop(time + 0.4);
    } else if (currentBgmType === 'shop' || currentBgmType === 'entrance') {
      osc.type = 'sine'; osc.frequency.value = mFreq; osc.connect(gain); gain.gain.setValueAtTime(0, time);
      const peakVol = isMuffled ? 0.008 : 0.015; gain.gain.linearRampToValueAtTime(peakVol, time + 0.05); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
      osc.start(time); osc.stop(time + 0.3);
    } else {
      osc.type = 'triangle'; osc.frequency.value = mFreq; osc.connect(gain); gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.008, time + 0.01); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);
      osc.start(time); osc.stop(time + 0.1);
    }
  }

  const bFreq = bassArray[beatNumber % bassArray.length];
  if (bFreq > 0) {
    const osc = bgmAudioCtx.createOscillator();
    const gain = bgmAudioCtx.createGain();
    let targetDest = bgmAudioCtx.destination;
    if (isMuffled) {
      const filter = bgmAudioCtx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 300; 
      gain.connect(filter); filter.connect(targetDest);
    } else { gain.connect(targetDest); }

    osc.type = 'sine'; osc.frequency.value = bFreq; osc.connect(gain);
    if (currentBgmType === 'creepy') {
      gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(0.03, time + 0.1); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);
      osc.start(time); osc.stop(time + 0.6);
    } else if (currentBgmType === 'shop' || currentBgmType === 'entrance') {
      gain.gain.setValueAtTime(0, time); const peakVol = isMuffled ? 0.01 : 0.02; gain.gain.linearRampToValueAtTime(peakVol, time + 0.05); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
      osc.start(time); osc.stop(time + 0.4);
    } else {
      gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(0.015, time + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
      osc.start(time); osc.stop(time + 0.15);
    }
  }
};

const bgmScheduler = () => {
  if (!isBgmPlaying) return;
  const currentTempo = currentBgmType === 'creepy' ? 90 : (currentBgmType === 'shop' || currentBgmType === 'entrance' ? 120 : 150);
  while (nextNotetime < bgmAudioCtx.currentTime + 0.1) {
    scheduleBgmNote(current16thNote, nextNotetime);
    nextNotetime += (60.0 / currentTempo) / 4; 
    current16thNote++;
  }
  bgmTimerId = requestAnimationFrame(bgmScheduler);
};

const playBGM = (type = 'normal') => {
  if (!bgmAudioCtx) bgmAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (bgmAudioCtx.state === 'suspended') bgmAudioCtx.resume();
  if (isBgmPlaying && currentBgmType === type) return;
  stopBGM();
  if (type === 'entrance') startWind();
  isBgmPlaying = true; currentBgmType = type; current16thNote = 0; nextNotetime = bgmAudioCtx.currentTime + 0.05;
  bgmScheduler();
};

const stopBGM = () => {
  isBgmPlaying = false;
  if (bgmTimerId) cancelAnimationFrame(bgmTimerId);
  stopWind();
};

const playSound = (type) => {
  try {
    if (!soundCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      soundCtx = new AudioContext();
    }
    if (soundCtx.state === 'suspended') soundCtx.resume();
    
    const ctx = soundCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);

    if (type === 'doorbell') {
      const playBellTone = (baseFreq, startTime, duration, maxVol) => {
        const ratios = [1, 2.4, 3.1, 4.5];
        const vols = [1, 0.6, 0.4, 0.2];
        ratios.forEach((ratio, index) => {
          const bellOsc = ctx.createOscillator(); const bellGain = ctx.createGain();
          bellOsc.type = index === 0 ? 'sine' : 'triangle';
          bellOsc.frequency.setValueAtTime(baseFreq * ratio, startTime);
          bellGain.gain.setValueAtTime(0, startTime);
          bellGain.gain.linearRampToValueAtTime(maxVol * vols[index], startTime + 0.01);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
          bellOsc.connect(bellGain); bellGain.connect(ctx.destination);
          bellOsc.start(startTime); bellOsc.stop(startTime + duration);
        });
      };
      playBellTone(1200, ctx.currentTime, 0.8, 0.05);
      playBellTone(1500, ctx.currentTime + 0.06, 1.0, 0.04);
      playBellTone(1900, ctx.currentTime + 0.12, 1.5, 0.03);
    } else if (type === 'type') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime); 
      gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05); 
      osc.start(); osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'miss') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, ctx.currentTime); 
      gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1); 
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'clear') {
      osc.type = 'triangle'; osc.frequency.setValueAtTime(600, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2); 
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'buy') {
      osc.type = 'square'; osc.frequency.setValueAtTime(400, ctx.currentTime); osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3); 
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'levelup') {
      osc.type = 'square'; osc.frequency.setValueAtTime(400, ctx.currentTime); osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5); 
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'whistle') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(1800, ctx.currentTime); gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(2000, ctx.currentTime + 0.15); gain.gain.setValueAtTime(0, ctx.currentTime + 0.15);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.17); gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); osc.start(); osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {}
};

// --- メインコンポーネント ---
export default function App() {
  const [gameState, setGameState] = useState('entrance'); 
  const [shopTab, setShopTab] = useState('items'); 
  const [sellTab, setSellTab] = useState('items'); 
  const [inventoryTab, setInventoryTab] = useState('items'); 
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
  const [overallTotalTyped, setOverallTotalTyped] = useState(0);
  const [overallMissCount, setOverallMissCount] = useState(0);
  const [clearedBreads, setClearedBreads] = useState(0);

  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [plateInventory, setPlateInventory] = useState(['plate_default']);
  const [activePlateId, setActivePlateId] = useState('plate_default');
  const [facilityInventory, setFacilityInventory] = useState([]); 
  const [emotionInventory, setEmotionInventory] = useState([]);
  const [activeEmotion, setActiveEmotion] = useState('normal');
  const [staffInventory, setStaffInventory] = useState(['staff_panda']);
  const [activeStaffId, setActiveStaffId] = useState('staff_panda');
  const [activeItems, setActiveItems] = useState([]);

  const [isConveyorOn, setIsConveyorOn] = useState(true);
  const [scoreBoost, setScoreBoost] = useState(false);
  const [shopLevel, setShopLevel] = useState(1);
  const [shopTrust, setShopTrust] = useState(0);
  const [hasFreeCoupon, setHasFreeCoupon] = useState(false);

  const [soldInventory, setSoldInventory] = useState([]);
  const [soldPlateInventory, setSoldPlateInventory] = useState([]);
  const [soldEmotionInventory, setSoldEmotionInventory] = useState([]);
  const [soldStaffInventory, setSoldStaffInventory] = useState([]);
  const [sellMode, setSellMode] = useState('sell');
  const [isRetired, setIsRetired] = useState(false);

  const [playCount, setPlayCount] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const deerSenbeiSpawnedRef = useRef(false);
  const fireBreadSpawnCountRef = useRef(0);
  const [isOnFire, setIsOnFire] = useState(false);
  const [currentWater, setCurrentWater] = useState(null);
  const [tradePhase, setTradePhase] = useState('offer');
  const [tradeRewards, setTradeRewards] = useState([]);
  const [lostTradeItem, setLostTradeItem] = useState(null);
  const [gainedTradeReward, setGainedTradeReward] = useState(null);

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
  const displayStaff = currentEvent === 'deer_staff' ? { id: 'staff_deer', name: '鹿', emoji: '🦌', suffix: 'シカ' } : activeStaff;

  const [lastSavedData, setLastSavedData] = useState("");
  const [justLoaded, setJustLoaded] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileConfirmed, setIsMobileConfirmed] = useState(false);
  const [isBgmEnabled, setIsBgmEnabled] = useState(true);

  // ニックネーム・オンライン関連
  const [nickname, setNickname] = useState(null);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [user, setUser] = useState(null);
  const [rankingData, setRankingData] = useState([]);

  // Firebase Init Auth
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch(e) { console.error(e); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Firestore: Load Nickname (Auto-save restoration)
  useEffect(() => {
    if (!user || !db || !appId) return;
    const loadNickname = async () => {
      try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'ranking', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().nickname) {
          setNickname(docSnap.data().nickname);
        }
      } catch (e) { console.error("Nickname load error:", e); }
    };
    loadNickname();
  }, [user]);

  // Firestore: Fetch Ranking Data (Real-time sync)
  useEffect(() => {
    if (!user || !db || !appId) return;
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'ranking');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.coins - a.coins);
      setRankingData(data);
    }, (e) => console.error("Ranking fetch error:", e));
    return () => unsubscribe();
  }, [user]);

  const overallAccuracy = overallTotalTyped + overallMissCount === 0 ? 0 : Math.floor((overallTotalTyped / (overallTotalTyped + overallMissCount)) * 100);

  // Firestore: Update own ranking data
  useEffect(() => {
    if (!user || !db || !appId || !nickname) return;
    const updateRanking = async () => {
      try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'ranking', user.uid);
        await setDoc(docRef, { nickname, coins, accuracy: overallAccuracy, updatedAt: Date.now() }, { merge: true });
      } catch (e) { console.error("Score update error", e); }
    };
    updateRanking();
  }, [coins, nickname, user, overallAccuracy]);

  const getCurrentDataString = useCallback(() => {
    return JSON.stringify({
      coins, playCount, inventory, plateInventory, activePlateId, facilityInventory, emotionInventory, activeEmotion, staffInventory, activeStaffId, activeItems,
      soldInventory, soldPlateInventory, soldEmotionInventory, soldStaffInventory,
      shopLevel, shopTrust, hasFreeCoupon, nickname, overallTotalTyped, overallMissCount
    });
  }, [coins, playCount, inventory, plateInventory, activePlateId, facilityInventory, emotionInventory, activeEmotion, staffInventory, activeStaffId, activeItems, soldInventory, soldPlateInventory, soldEmotionInventory, soldStaffInventory, shopLevel, shopTrust, hasFreeCoupon, nickname, overallTotalTyped, overallMissCount]);

  useEffect(() => {
    setLastSavedData(getCurrentDataString());
    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|ipad|playbook|silk/i.test(ua.toLowerCase()) || /iphone|ipod/i.test(ua.toLowerCase()) || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsMobile(true);
      }
    };
    checkMobile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (justLoaded) {
      setLastSavedData(getCurrentDataString());
      setJustLoaded(false);
    }
  }, [justLoaded, getCurrentDataString]);

  useEffect(() => {
    if (isBgmEnabled && gameState !== 'closed') {
      if (gameState === 'entrance') playBGM('entrance');
      else if (gameState === 'playing' && currentEvent === 'trade') stopBGM();
      else if (gameState === 'trade') playBGM('creepy');
      else if (gameState === 'shop' || gameState === 'sell' || gameState === 'inventory' || gameState === 'ranking') playBGM('shop');
      else playBGM('normal');
    } else { stopBGM(); }
  }, [isBgmEnabled, gameState, currentEvent]);

  useEffect(() => { return () => stopBGM(); }, []);

  const getMaxTrust = (level) => 2 + level;
  const getDiscountedPrice = (basePrice, level) => {
    if (basePrice === 0) return 0;
    if (level === 1) return basePrice;
    if (level === 2) return Math.floor(basePrice / 1.5);
    if (level === 3) return Math.floor(basePrice / 2);
    if (level === 4) return Math.floor(basePrice / 2); 
    if (level >= 5) return Math.floor(basePrice / (2 * Math.pow(1.5, level - 4)));
  };

  const handleTrustGain = () => {
    setShopTrust(prev => {
      const max = getMaxTrust(shopLevel);
      const next = prev + 1;
      if (next >= max) {
        setShopLevel(l => { const nextL = l + 1; if (nextL === 4) setHasFreeCoupon(true); return nextL; });
        playSound('levelup'); showTempMessage('レベルアップしたピョン！！もっと安くなるピョン！');
        return 0;
      }
      return next;
    });
  };

  const handlePurchaseAttempt = (item, price, executePurchase) => {
    let finalPrice = getDiscountedPrice(price, shopLevel);
    let usedCoupon = false;
    if (hasFreeCoupon && price > 0) { finalPrice = 0; usedCoupon = true; }
    if (coins >= finalPrice) {
      if (usedCoupon) setHasFreeCoupon(false);
      setCoins(prev => prev - finalPrice);
      executePurchase();
      playSound('buy'); showTempMessage('ありがとうございましたピョン！');
      if (price > 0) handleTrustGain();
    }
  };

  const handleSave = () => {
    const dataString = getCurrentDataString();
    try {
      const code = btoa(encodeURIComponent(dataString));
      setSaveLoadText(code); setSaveMessage("セーブコードを発行しました！"); setLastSavedData(dataString); 
    } catch (e) { setSaveMessage("セーブコードの生成に失敗しました。"); }
  };

  const handleLoad = () => {
    if (!saveLoadText) return setSaveMessage("コードを入力してください。");
    try {
      let decodedString = atob(saveLoadText);
      try { decodedString = decodeURIComponent(decodedString); } catch (e) {}
      const data = JSON.parse(decodedString);
      
      if (typeof data.coins === 'number') setCoins(data.coins);
      if (typeof data.playCount === 'number') setPlayCount(data.playCount);
      if (Array.isArray(data.inventory)) setInventory(data.inventory);
      if (Array.isArray(data.plateInventory)) setPlateInventory(data.plateInventory);
      if (typeof data.activePlateId === 'string') setActivePlateId(data.activePlateId);
      if (Array.isArray(data.facilityInventory)) setFacilityInventory(data.facilityInventory);
      if (Array.isArray(data.emotionInventory)) setEmotionInventory(data.emotionInventory);
      if (typeof data.activeEmotion === 'string') setActiveEmotion(data.activeEmotion);
      if (Array.isArray(data.staffInventory)) setStaffInventory(data.staffInventory);
      if (typeof data.activeStaffId === 'string') setActiveStaffId(data.activeStaffId);
      if (Array.isArray(data.activeItems)) setActiveItems(data.activeItems);
      if (Array.isArray(data.soldInventory)) setSoldInventory(data.soldInventory);
      if (Array.isArray(data.soldPlateInventory)) setSoldPlateInventory(data.soldPlateInventory);
      if (Array.isArray(data.soldEmotionInventory)) setSoldEmotionInventory(data.soldEmotionInventory);
      if (Array.isArray(data.soldStaffInventory)) setSoldStaffInventory(data.soldStaffInventory);
      if (typeof data.shopLevel === 'number') setShopLevel(data.shopLevel);
      if (typeof data.shopTrust === 'number') setShopTrust(data.shopTrust);
      if (typeof data.hasFreeCoupon === 'boolean') setHasFreeCoupon(data.hasFreeCoupon);
      if (typeof data.nickname === 'string') setNickname(data.nickname);
      if (typeof data.overallTotalTyped === 'number') setOverallTotalTyped(data.overallTotalTyped);
      if (typeof data.overallMissCount === 'number') setOverallMissCount(data.overallMissCount);

      setSaveMessage("データをロードしました！"); setJustLoaded(true); 
    } catch (e) { setSaveMessage("無効なセーブコードです。"); }
  };

  const copyToClipboard = () => {
    if (!saveLoadText) return;
    const textarea = document.createElement('textarea');
    textarea.value = saveLoadText; document.body.appendChild(textarea); textarea.select();
    try { document.execCommand('copy'); setSaveMessage("コピーしました！保存しておいてね。"); } 
    catch (err) { setSaveMessage("コピーに失敗しました。手動でコピーしてください。"); }
    document.body.removeChild(textarea);
  };

  const getEventBannerName = (event) => {
    switch(event) {
      case 'double_coin': return '🌟 お金2倍イベント 🌟';
      case 'half_coin': return '💸 お金半分イベント 💸';
      case 'deer_staff': return '🦌 鹿店員イベント 🦌';
      case 'rare_bread': return '✨ レアパン発生イベント ✨';
      case 'fire_event': return '🔥 炎上イベント発生！ 🔥';
      case 'trade': return '👾 謎の取引の予感… 👾';
      default: return '';
    }
  };

  useEffect(() => {
    const unlockAudio = () => {
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => { if (audio.paused) originalAudioPlay.call(audio).catch(()=>{}); });
      if (bgmAudioCtx && bgmAudioCtx.state === 'suspended') bgmAudioCtx.resume();
      if (soundCtx && soundCtx.state === 'suspended') soundCtx.resume();
      window.removeEventListener('click', unlockAudio); window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio); window.addEventListener('keydown', unlockAudio);
    return () => { window.removeEventListener('click', unlockAudio); window.removeEventListener('keydown', unlockAudio); };
  }, []);

  const spawnWord = useCallback((isStopped = false) => {
    let words = [...BREAD_WORDS];
    if (activeItems.includes('premium_bread') || currentEvent === 'rare_bread') words = [...words, ...PREMIUM_BREADS];
    if (activeItems.includes('secret_bread') || currentEvent === 'rare_bread') words = [...words, ...SECRET_BREADS];

    let nextWord = words[Math.floor(Math.random() * words.length)];
    if (currentEvent === 'deer_staff' && !deerSenbeiSpawnedRef.current) {
      if (Math.random() < 0.25) { nextWord = DEER_SENBEI; deerSenbeiSpawnedRef.current = true; }
    }
    if (currentEvent === 'fire_event') {
      const isForceFire = fireBreadSpawnCountRef.current < 3;
      if ((isForceFire && Math.random() < 0.6) || (!isForceFire && Math.random() < 0.2)) {
        nextWord = { ...nextWord, isFire: true }; fireBreadSpawnCountRef.current++;
      }
    }
    setCurrentBread({ 
      word: nextWord, typedCount: 0, spawnTime: Date.now(), 
      id: Math.random().toString(36).substring(2, 9), spawnedWhileStopped: isStopped
    });
    setAnimKey(prev => prev + 1);
  }, [activeItems, currentEvent]);

  const startGame = (selectedCourse) => {
    const baseGameTime = activeItems.includes('diamond_timer') ? 100 : activeItems.includes('golden_timer') ? 75 : 60;
    const newPlayCount = playCount + 1; setPlayCount(newPlayCount);
    let event = null;
    if (newPlayCount > 0 && newPlayCount % 5 === 0) {
      const events = ['double_coin', 'half_coin', 'deer_staff', 'rare_bread', 'trade', 'fire_event'];
      event = events[Math.floor(Math.random() * events.length)];
    }
    setCurrentEvent(event); deerSenbeiSpawnedRef.current = false; fireBreadSpawnCountRef.current = 0;
    setCourse(selectedCourse); setScore(0); setCombo(0); setMaxCombo(0); setTotalTyped(0); setMissCount(0);
    setClearedBreads(0); setClearedPlates([]); setIsRetired(false); setIsOnFire(false); setCurrentWater(null);
    setIsConveyorOn(true); setScoreBoost(false);
    if (conveyorTimeoutRef.current) clearTimeout(conveyorTimeoutRef.current);
    if (scoreBoostTimeoutRef.current) clearTimeout(scoreBoostTimeoutRef.current);

    setGameState('playing'); spawnWord(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (selectedCourse.isInfinite) { setTimeLeft(Infinity); } 
    else {
      setTimeLeft(baseGameTime);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === Infinity) return prev;
          const dec = selectedCourse.fastTimer ? 2 : 1; const next = prev - dec; return next < 0 ? 0 : next;
        });
      }, 1000);
    }
  };

  const accuracy = totalTyped + missCount === 0 ? 0 : Math.floor((totalTyped / (totalTyped + missCount)) * 100);

  const handleManualFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('whistle'); setIsRetired(true); setGameState('result');
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft !== Infinity && timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('whistle'); setIsRetired(false);
      if (currentEvent === 'trade') { setTradePhase('offer'); setGameState('trade'); } 
      else { setGameState('result'); if (!course.noCoin) setCoins(prev => prev + score); }
    }
  }, [timeLeft, gameState, score, course.noCoin, currentEvent]);

  const handleMissWord = useCallback(() => {
    if (gameState !== 'playing') return;
    playSound('miss'); setCombo(0); setMissCount(prev => prev + 1); setOverallMissCount(prev => prev + 1);
    spawnWord(!isConveyorOn);
  }, [gameState, spawnWord, isConveyorOn]);

  const useItem = useCallback((itemId) => {
    if (!facilityInventory.includes(itemId)) return; 
    setFacilityInventory(prev => {
      const idx = prev.indexOf(itemId); if (idx === -1) return prev;
      const next = [...prev]; next.splice(idx, 1); return next;
    });
    playSound('clear'); 
    if (itemId === 'conveyor_switch') {
      setIsConveyorOn(false); if (conveyorTimeoutRef.current) clearTimeout(conveyorTimeoutRef.current);
      conveyorTimeoutRef.current = setTimeout(() => setIsConveyorOn(true), 15000);
    } else if (itemId === 'golden_syrup') {
      setScoreBoost(true); if (scoreBoostTimeoutRef.current) clearTimeout(scoreBoostTimeoutRef.current);
      scoreBoostTimeoutRef.current = setTimeout(() => setScoreBoost(false), 15000);
    }
  }, [facilityInventory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Enter', 'Backspace', 'Escape', ' '].includes(e.key)) return;

      if (isOnFire && currentWater) {
        const expectedChar = currentWater.word.romaji[currentWater.typedCount];
        if (e.key.toLowerCase() === expectedChar.toLowerCase()) {
          playSound('type'); const newTypedCount = currentWater.typedCount + 1;
          setTotalTyped(prev => prev + 1); setOverallTotalTyped(prev => prev + 1);
          if (newTypedCount === currentWater.word.romaji.length) {
            playSound('clear'); setIsOnFire(false); setCurrentWater(null);
          } else { setCurrentWater(prev => ({ ...prev, typedCount: newTypedCount })); }
        } else {
          playSound('miss'); setCombo(0); setMissCount(prev => prev + 1); setOverallMissCount(prev => prev + 1);
        }
        return; 
      }

      if (!currentBread) return;
      if (e.key === '1' && FACILITY_ITEMS[0] && facilityInventory.includes(FACILITY_ITEMS[0].id)) { useItem(FACILITY_ITEMS[0].id); return; }
      if (e.key === '2' && FACILITY_ITEMS[1] && facilityInventory.includes(FACILITY_ITEMS[1].id)) { useItem(FACILITY_ITEMS[1].id); return; }

      const expectedChar = currentBread.word.romaji[currentBread.typedCount];
      if (e.key.toLowerCase() === expectedChar.toLowerCase()) {
        playSound('type'); const newTypedCount = currentBread.typedCount + 1;
        setTotalTyped((prev) => prev + 1); setOverallTotalTyped((prev) => prev + 1);
        const newCombo = combo + 1; setCombo(newCombo); setMaxCombo(prev => Math.max(prev, newCombo));

        const bonusMultiplier = activeItems.includes('panda_apron') ? 2 : 1;
        const comboBonus = Math.floor(newCombo / 10) * 5 * bonusMultiplier;
        const emotionMultiplier = activeEmotion === 'emotion_angry' ? 2 : (activeEmotion === 'emotion_sad' ? 0.5 : 1);
        const itemBoostMultiplier = scoreBoost ? 2 : 1; 
        const eventCoinMult = currentEvent === 'double_coin' ? 2 : (currentEvent === 'half_coin' ? 0.5 : 1);
        
        setScore((prev) => prev + Math.floor((10 + comboBonus) * emotionMultiplier * itemBoostMultiplier * eventCoinMult));

        if (newTypedCount === currentBread.word.romaji.length) {
          playSound('clear');
          setScore((prev) => prev + Math.floor(currentBread.word.price * emotionMultiplier * itemBoostMultiplier * eventCoinMult));
          setClearedBreads((prev) => prev + 1);

          if (currentBread.word.isFire) {
            setIsOnFire(true); const waterWord = WATER_WORDS[Math.floor(Math.random() * WATER_WORDS.length)];
            setCurrentWater({ word: waterWord, typedCount: 0 });
          }

          if (isConveyorOn) {
            const elapsed = (Date.now() - currentBread.spawnTime) / 1000;
            const currentSpeedMultiplier = course.id === 'practice' ? (1 / practiceSpeedMulti) : course.speed;
            const emotionSpeedMultiplier = activeEmotion === 'emotion_angry' ? 0.6 : (activeEmotion === 'emotion_sad' ? 1.5 : 1.0);
            const animTime = currentBread.word.time * currentSpeedMultiplier * emotionSpeedMultiplier;
            setClearedPlates(prev => [...prev, {
              id: currentBread.id, css: activePlate.css, animTime: animTime, elapsed: elapsed,
              word: { ...currentBread.word, displayPrice: Math.floor(currentBread.word.price * emotionMultiplier * itemBoostMultiplier * eventCoinMult) }
            }]);
          }
          spawnWord(!isConveyorOn);
        } else { setCurrentBread((prev) => ({ ...prev, typedCount: newTypedCount })); }
      } else {
        playSound('miss'); setCombo(0); setMissCount((prev) => prev + 1); setOverallMissCount((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentBread, combo, spawnWord, activeItems, activeEmotion, activePlate.css, isConveyorOn, course.id, course.speed, practiceSpeedMulti, facilityInventory, scoreBoost, useItem, currentEvent, isOnFire, currentWater]);

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

  const handleBuyItem = (item) => handlePurchaseAttempt(item, item.price, () => setInventory(prev => [...prev, item.id]));
  const handleBuyPlate = (plate) => handlePurchaseAttempt(plate, plate.price, () => { setPlateInventory(prev => [...prev, plate.id]); setActivePlateId(plate.id); });
  const handleEquipPlate = (plateId) => { setActivePlateId(plateId); playSound('type'); };
  const handleBuyFacility = (item) => handlePurchaseAttempt(item, item.price, () => setFacilityInventory(prev => [...prev, item.id]));
  const handleBuyEmotion = (item) => handlePurchaseAttempt(item, item.price, () => { setEmotionInventory(prev => [...prev, item.id]); setActiveEmotion(item.id); });
  const handleBuyStaff = (staff) => handlePurchaseAttempt(staff, staff.price, () => { setStaffInventory(prev => [...prev, staff.id]); setActiveStaffId(staff.id); });
  const handleEquipStaff = (staffId) => { setActiveStaffId(staffId); playSound('type'); };
  const handleToggleItem = (itemId) => { setActiveItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]); playSound('type'); };

  const executeSell = (price, removeAction) => { setCoins(prev => prev + Math.floor(price / 2)); removeAction(); playSound('buy'); showTempMessage('ありがとうございますコケ！'); };
  const handleSellItem = (item) => executeSell(item.price, () => { setInventory(prev => prev.filter(id => id !== item.id)); setActiveItems(prev => prev.filter(id => id !== item.id)); setSoldInventory(prev => [...prev, item.id]); });
  const handleSellPlate = (plate) => executeSell(plate.price, () => { setPlateInventory(prev => prev.filter(id => id !== plate.id)); setSoldPlateInventory(prev => [...prev, plate.id]); if (activePlateId === plate.id) setActivePlateId('plate_default'); });
  const handleSellFacility = (item) => executeSell(item.price, () => { setFacilityInventory(prev => { const idx = prev.indexOf(item.id); if (idx === -1) return prev; const next = [...prev]; next.splice(idx, 1); return next; }); });
  const handleSellEmotion = (item) => executeSell(item.price, () => { setEmotionInventory(prev => prev.filter(id => id !== item.id)); setSoldEmotionInventory(prev => [...prev, item.id]); if (activeEmotion === item.id) setActiveEmotion('normal'); });
  const handleSellStaff = (staff) => executeSell(staff.price, () => { setStaffInventory(prev => prev.filter(id => id !== staff.id)); setSoldStaffInventory(prev => [...prev, staff.id]); if (activeStaffId === staff.id) setActiveStaffId('staff_panda'); });

  const executeReturn = (price, returnAction) => {
    const returnPrice = Math.floor(price * 1.5);
    if (coins >= returnPrice) { setCoins(prev => prev - returnPrice); returnAction(); playSound('buy'); showTempMessage('毎度ありコケ！'); }
  };
  const handleReturnItem = (item) => executeReturn(item.price, () => { setSoldInventory(prev => prev.filter(id => id !== item.id)); setInventory(prev => [...prev, item.id]); });
  const handleReturnPlate = (plate) => executeReturn(plate.price, () => { setSoldPlateInventory(prev => prev.filter(id => id !== plate.id)); setPlateInventory(prev => [...prev, plate.id]); });
  const handleReturnEmotion = (item) => executeReturn(item.price, () => { setSoldEmotionInventory(prev => prev.filter(id => id !== item.id)); setEmotionInventory(prev => [...prev, item.id]); });
  const handleReturnStaff = (staff) => executeReturn(staff.price, () => { setSoldStaffInventory(prev => prev.filter(id => id !== staff.id)); setStaffInventory(prev => [...prev, staff.id]); });

  const getMostRareItem = () => {
    let rarest = null; let maxPrice = 0; let category = '';
    const check = (list, itemDefs, cat) => {
      list.forEach(id => { const def = itemDefs.find(i => i.id === id); if (def && def.price > maxPrice) { maxPrice = def.price; rarest = def; category = cat; } });
    };
    check(inventory, SHOP_ITEMS, 'item'); check(plateInventory, PLATE_ITEMS, 'plate'); check(facilityInventory, FACILITY_ITEMS, 'facility'); check(emotionInventory, EMOTION_ITEMS, 'emotion'); check(staffInventory, STAFF_ITEMS, 'staff');
    return { item: rarest, category };
  };

  const handleTradeRefuse = () => { setGameState('result'); if (!course.noCoin) setCoins(prev => prev + score); };
  const handleTradeAccept = () => {
    const rareData = getMostRareItem();
    if (!rareData.item) { setTradePhase('no_item'); return; }
    const { item, category } = rareData;
    if (category === 'item') { setInventory(prev => prev.filter(id => id !== item.id)); setActiveItems(prev => prev.filter(id => id !== item.id)); } 
    else if (category === 'plate') { setPlateInventory(prev => prev.filter(id => id !== item.id)); if (activePlateId === item.id) setActivePlateId('plate_default'); } 
    else if (category === 'facility') { setFacilityInventory(prev => { const next = [...prev]; const idx = next.indexOf(item.id); if (idx > -1) next.splice(idx, 1); return next; }); } 
    else if (category === 'emotion') { setEmotionInventory(prev => prev.filter(id => id !== item.id)); if (activeEmotion === item.id) setActiveEmotion('normal'); } 
    else if (category === 'staff') { setStaffInventory(prev => prev.filter(id => id !== item.id)); if (activeStaffId === item.id) setActiveStaffId('staff_panda'); }
    
    setLostTradeItem(item);
    let potentialRewards = [
      { text: 'コイン 5,000 C', action: () => setCoins(prev => prev + 5000) }, { text: 'コイン 10,000 C', action: () => setCoins(prev => prev + 10000) },
      { text: 'コイン 30,000 C', action: () => setCoins(prev => prev + 30000) }, { text: 'コイン 50,000 C', action: () => setCoins(prev => prev + 50000) },
      { text: 'コイン 10 C', action: () => setCoins(prev => prev + 10) }, 
    ];
    const addUnowned = (allItems, ownedList, addAction) => {
      allItems.forEach(item => { if (item.price > 0 && !ownedList.includes(item.id)) potentialRewards.push({ text: `[レア] ${item.name}`, action: () => addAction(prev => [...prev, item.id]) }); });
    };
    addUnowned(SHOP_ITEMS, inventory, setInventory); addUnowned(PLATE_ITEMS, plateInventory, setPlateInventory); addUnowned(EMOTION_ITEMS, emotionInventory, setEmotionInventory); addUnowned(STAFF_ITEMS, staffInventory, setStaffInventory);
    
    setTradeRewards(potentialRewards.sort(() => 0.5 - Math.random()).slice(0, 3)); setTradePhase('choices');
  };

  const handleTradeRewardSelect = (reward) => { reward.action(); setGainedTradeReward(reward.text); setTradePhase('done'); };
  const handleTradeFinish = () => { setGameState('result'); if (!course.noCoin) setCoins(prev => prev + score); };

  const handleExitClick = () => {
    playSound('type');
    if (getCurrentDataString() !== lastSavedData) setIsExitModalOpen(true);
    else { window.close(); setGameState('closed'); }
  };

  const handleEnterClick = () => {
    playSound('type');
    if (!nickname) setIsNicknameModalOpen(true);
    else { playSound('doorbell'); setGameState('title'); }
  };

  const handleRegisterNickname = () => {
    const trimmed = nicknameInput.trim();
    if (!trimmed) { setNicknameError("ニックネームを入力してね！"); playSound('miss'); return; }
    const isTakenOnline = rankingData.some(d => d.nickname === trimmed && (!user || d.id !== user.uid));
    if (TAKEN_NICKNAMES.includes(trimmed) || isTakenOnline) { setNicknameError("その名前はもう誰かが使っているみたい…！"); playSound('miss'); return; }
    playSound('doorbell'); setNickname(trimmed); setIsNicknameModalOpen(false); setGameState('title');
  };

  const getStaffMessage = () => {
    if (gameState === 'shop') return shopMessage || (shopLevel >= 5 ? `幻の商品も入ったピョン！` : `いらっしゃいませピョン！何を買うピョン？`);
    if (gameState === 'sell') return shopMessage || (sellMode === 'return' ? `返却には1.5倍のお金がかかるコケ！` : `何を売ってくれるコケ！`);
    if (gameState === 'inventory') return `装備を整える${displayStaff.suffix}！`;

    const s = displayStaff.suffix; const nameStr = nickname ? `${nickname}` : '君';
    if (gameState === 'ranking') {
      if (!user || rankingData.length === 0) return `もう少し頑張ろう${s}！`;
      const myIndex = rankingData.findIndex(d => d.id === user.uid);
      if (myIndex === -1) return `ランキングに挑戦する${s}！`;
      const myRank = myIndex + 1;
      if (myRank === 1) return `すごい！${nameStr}は世界一だ${s}！`;
      if (myRank === 2) return `あと少しで${nameStr}は世界一だ${s}！`;
      if (myRank === 3) return `あと少しで${nameStr}は世界二位だ${s}！`;
      return `もう少し頑張ろう${s}！`;
    }
    if (gameState === 'entrance') return `お店はここだ${s}！`;
    if (gameState === 'title') return currentEvent === 'deer_staff' ? `期間限定でバイト中だ${s}！` : `${nickname ? nickname + '、' : ''}パン屋へようこそ${s}！`;
    if (gameState === 'playing') {
      if (currentEvent === 'deer_staff') return `早く打つ${s}！`;
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
      if (isRetired) return `次は最後まで頑張る${s}！`;
      if (score > 3000) return `${nameStr}はマスター${s}！`;
      if (score > 1000) return `${nameStr}はなかなかやる${s}ね！`;
      return `また挑戦して${s}！`;
    }
    return '';
  };

  const currentSpeedMultiplier = course.id === 'practice' ? (1 / practiceSpeedMulti) : course.speed;
  const currentEmotionSpeedMultiplier = activeEmotion === 'emotion_angry' ? 0.6 : (activeEmotion === 'emotion_sad' ? 1.5 : 1.0);
  const animTime = currentBread ? currentBread.word.time * currentSpeedMultiplier * currentEmotionSpeedMultiplier : 5;
  const currentEmotionMultiplier = activeEmotion === 'emotion_angry' ? 2 : (activeEmotion === 'emotion_sad' ? 0.5 : 1);
  const eventCoinMult = currentEvent === 'double_coin' ? 2 : (currentEvent === 'half_coin' ? 0.5 : 1);
  const hideStaff = gameState === 'trade' || (gameState === 'playing' && currentEvent === 'trade');

  const ShopItemRow = ({ item, isOwned, isSold, onBuy, actionText="購入する" }) => {
    const finalPrice = getDiscountedPrice(item.price, shopLevel);
    const isFree = hasFreeCoupon && item.price > 0;
    const canBuy = coins >= (isFree ? 0 : finalPrice) && !isOwned && !isSold;
    return (
      <div className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isOwned || isSold ? 'bg-slate-50 border-slate-200' : 'bg-orange-50 border-orange-100 hover:border-orange-300'}`}>
        <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto">
          {item.css ? <div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${isSold ? 'opacity-50' : ''} ${item.css}`}></div> : <div className={`text-5xl ${!isOwned && !isSold ? 'opacity-80' : isSold ? 'opacity-50' : ''}`}>{item.emoji}</div>}
          <div><h3 className={`text-xl font-bold ${isOwned || isSold ? 'text-slate-500' : 'text-amber-900'}`}>{item.name}</h3>{item.desc && <p className={`text-sm ${isSold ? 'text-slate-400' : 'text-amber-700'}`}>{item.desc}</p>}</div>
        </div>
        <div className="text-center md:text-right shrink-0">
          {!isOwned && !isSold && item.price > 0 && (
            <div className="mb-2">
              {shopLevel > 1 && <span className="text-xs text-slate-400 line-through mr-1">{item.price}C</span>}
              <span className={`text-lg font-bold ${isFree ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>{isFree ? '0 C (無料!)' : `${finalPrice} C`}</span>
            </div>
          )}
          {isOwned ? <button disabled className="px-6 py-2 rounded-full font-bold text-white shadow-md bg-slate-400 cursor-not-allowed">購入済み</button> : <button disabled={!canBuy} onClick={() => onBuy(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${isSold ? 'bg-rose-300 cursor-not-allowed' : canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' : 'bg-rose-300 cursor-not-allowed'}`}>{isSold ? '売り切れ' : actionText}</button>}
        </div>
      </div>
    );
  };

  const InventoryItemRow = ({ item, isEquipped, onEquip, isToggleable = false, count = null }) => (
    <div className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isEquipped ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
      <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto">
        {item.css ? <div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${item.css}`}></div> : <div className={`text-5xl`}>{item.emoji}</div>}
        <div><h3 className={`text-xl font-bold text-amber-900`}>{item.name} {isEquipped && <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full ml-2 align-middle">使用中</span>}</h3>{item.desc && <p className={`text-sm text-amber-700`}>{item.desc}</p>}</div>
      </div>
      <div className="text-center md:text-right shrink-0">
        {count !== null ? <span className="font-bold text-amber-800 bg-amber-200 px-4 py-2 rounded-full border-2 border-amber-300 shadow-sm">所持: {count} 個</span> : <button disabled={!isToggleable && isEquipped} onClick={() => onEquip(item.id)} className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${isEquipped ? (isToggleable ? 'bg-rose-500 hover:bg-rose-400 text-white active:translate-y-1 border-b-4 border-rose-600 active:border-b-0' : 'bg-slate-400 text-white cursor-not-allowed') : 'bg-blue-500 hover:bg-blue-400 text-white active:translate-y-1 border-b-4 border-blue-600 active:border-b-0'}`}>{isEquipped ? (isToggleable ? '外す' : '使用中') : '装備する'}</button>}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans selection:bg-orange-200 transition-colors duration-700 ${gameState === 'trade' ? 'bg-slate-950 text-slate-200' : 'bg-orange-50 text-amber-900'}`}>
      <style>{`
        @keyframes flow { 0% { left: 100%; transform: translate(0, -50%); opacity: 0; } 5% { opacity: 1; } 95% { opacity: 1; } 100% { left: -10%; transform: translate(-100%, -50%); opacity: 0; } }
        @keyframes conveyor { 0% { background-position: 0 0; } 100% { background-position: -40px 0; } }
        @keyframes rainbow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-rainbow { animation: rainbow 3s ease infinite; }
        @keyframes eventBanner { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; } 10% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; } 20% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 80% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; visibility: hidden; } }
        .animate-event-banner { animation: eventBanner 3s forwards; }
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>

      <div className={`w-full max-w-4xl p-6 md:p-8 rounded-3xl relative overflow-hidden transition-colors duration-700 ${gameState === 'trade' ? 'bg-slate-900 border-4 border-purple-900 shadow-[0_0_50px_rgba(88,28,135,0.4)]' : 'bg-white border-4 border-orange-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}>
        <div className={`absolute top-0 left-0 w-full h-4 opacity-20 transition-colors duration-700 ${gameState === 'trade' ? 'bg-purple-600' : 'bg-orange-400'}`} />
        
        <div className="absolute top-6 right-6 flex flex-col md:flex-row items-end md:items-center gap-3 z-20">
          {nickname && gameState !== 'playing' && gameState !== 'entrance' && gameState !== 'closed' && gameState !== 'trade' && gameState !== 'ranking' && (
            <div className={`px-4 py-1.5 rounded-full border-2 font-black shadow-sm flex items-center gap-2 bg-slate-800 border-slate-700 text-slate-100`}>
              <span className="text-sm">👤 {nickname}</span>
            </div>
          )}
          {gameState !== 'closed' && (
            <button onClick={() => setIsBgmEnabled(!isBgmEnabled)} className={`px-3 py-1.5 rounded-full border-2 font-black shadow-sm transition-colors text-xs md:text-sm ${gameState === 'trade' ? 'bg-slate-800 border-purple-800 text-purple-400' : isBgmEnabled ? 'bg-orange-100 border-orange-300 text-orange-600' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
              {isBgmEnabled ? '🔊 BGM ON' : '🔇 BGM OFF'}
            </button>
          )}
          {gameState !== 'entrance' && gameState !== 'closed' && (
            <div className={`px-4 py-2 rounded-full border-2 font-black shadow-sm flex items-center gap-2 transition-colors duration-700 ${gameState === 'trade' ? 'bg-slate-800 border-purple-800 text-purple-400' : 'bg-orange-50 border-orange-200 text-orange-600'}`}>
              <span className="text-xl">💰</span><span>{coins} C</span>
            </div>
          )}
        </div>

        {!hideStaff && (
          <div className="absolute top-6 left-6 flex items-start gap-3 z-20">
            <div className="text-5xl md:text-6xl drop-shadow-md animate-bounce relative" style={{ animationDuration: '2s' }}>
              {gameState === 'shop' ? '🐰' : gameState === 'sell' ? '🐔' : displayStaff.emoji}
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
        )}

        {/* === 入店画面 === */}
        {gameState === 'entrance' && (
          <div className="text-center pt-32 pb-20 flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-6xl md:text-8xl font-black text-orange-500 mb-12 tracking-wider drop-shadow-sm">🍞 パン打 🥐</h1>
            {isMobile && (
              <div className="bg-blue-50 border-4 border-blue-300 p-4 rounded-xl mb-8 max-w-md shadow-md animate-pulse">
                <p className="text-blue-700 font-black text-xl mb-2 flex items-center justify-center gap-2"><span>ℹ️</span> ご案内</p>
                <p className="text-blue-600 font-bold text-sm md:text-base leading-relaxed mb-4">ごめん！このゲームはパソコン専用なんだ。<br />これを理解した上でプレイしてね。</p>
                <label className="flex items-center justify-center gap-3 cursor-pointer bg-blue-100 p-2 rounded-lg border-2 border-blue-200 hover:bg-blue-200 transition-colors">
                  <span className="font-bold text-blue-800 text-lg">理解した</span>
                  <input type="checkbox" checked={isMobileConfirmed} onChange={(e) => setIsMobileConfirmed(e.target.checked)} className="w-6 h-6 accent-blue-600 cursor-pointer" />
                </label>
              </div>
            )}
            <button disabled={isMobile && !isMobileConfirmed} onClick={handleEnterClick} className={`px-10 py-5 font-black text-2xl md:text-3xl rounded-full shadow-xl transition-all flex items-center gap-3 ${(!isMobile || isMobileConfirmed) ? 'bg-orange-500 hover:bg-orange-400 text-white border-b-8 border-orange-600 active:border-b-0 active:translate-y-2 animate-bounce hover:animate-none' : 'bg-slate-400 text-slate-100 border-b-8 border-slate-500 cursor-not-allowed'}`}>
              <span className="text-4xl">🚪</span> パン打に入店する
            </button>
            <p className="text-xs text-orange-400 mt-4 font-bold">※画面のどこかをクリックすると音が鳴り始めます</p>
            
            {/* ✨ランキングボタンを確実に追加✨ */}
            <button onClick={() => { setGameState('ranking'); playSound('type'); }} className="mt-6 px-8 py-4 font-black text-xl md:text-2xl rounded-full shadow-lg transition-all flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-b-8 border-yellow-500 active:border-b-0 active:translate-y-2">
              <span className="text-3xl">🏆</span> ランキングを見る
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
                  return <button key={c.id} onClick={() => startGame(c)} className={`px-6 md:px-8 py-4 rounded-xl text-white font-black text-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-lg ${c.color}`}>{c.name}</button>;
                })}
              </div>
              <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 w-full max-w-lg shadow-inner">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <div className="text-left"><h3 className="text-2xl font-black text-teal-800">{COURSES.practice.name}モード</h3><p className="text-sm font-bold text-teal-600">時間無制限・コイン獲得なし</p></div>
                  <button onClick={() => startGame(COURSES.practice)} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-black text-lg border-b-4 border-teal-700 active:border-b-0 active:translate-y-1 rounded-xl shadow-md transition-all shrink-0">練習開始</button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-bold text-teal-700 whitespace-nowrap">レーン速度</span><span className="text-xs font-bold text-teal-600">遅い</span>
                  <input type="range" min="0.5" max="3.0" step="0.1" value={practiceSpeedMulti} onChange={(e) => setPracticeSpeedMulti(parseFloat(e.target.value))} className="w-full accent-teal-500" />
                  <span className="text-xs font-bold text-teal-600">速い</span><span className="font-mono font-bold text-teal-800 whitespace-nowrap w-12 text-right">x{practiceSpeedMulti.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {/* ✨タイトル画面のランキングボタンを確実に追加✨ */}
              <button onClick={() => { setGameState('ranking'); playSound('type'); }} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black text-lg rounded-full shadow-lg border-b-4 border-yellow-500 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2">
                <span className="text-2xl">🏆</span> ランキング
              </button>
              <button onClick={() => setGameState('shop')} className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">🛒</span> ショップ</button>
              <button onClick={() => setGameState('sell')} className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-lime-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">♻️</span> 売り場</button>
              <button onClick={() => setGameState('inventory')} className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">🎒</span> インベントリ</button>
              <button onClick={() => { setSaveLoadText(""); setSaveMessage(""); setIsSaveModalOpen(true); }} className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-teal-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">💾</span> セーブ / ロード</button>
              <button onClick={handleExitClick} className="px-8 py-3 bg-slate-500 hover:bg-slate-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-slate-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">🚪</span> 終了</button>
            </div>
          </div>
        )}

        {/* === ランキング画面 === */}
        {gameState === 'ranking' && (
          <div className="pt-28 pb-12 px-2 md:px-10 flex flex-col items-center">
            <h2 className="text-4xl font-black text-yellow-600 mb-2 text-center flex items-center gap-3"><span>🏆</span> オンラインランキング</h2>
            <p className="text-amber-700 font-bold mb-8">世界中のパン職人たちのスコアだ！</p>
            <div className="w-full max-w-2xl bg-orange-50 border-4 border-orange-200 rounded-3xl p-4 md:p-6 shadow-inner max-h-[50vh] overflow-y-auto mb-8 relative">
              {rankingData.length === 0 ? (
                <div className="text-center py-10"><span className="text-5xl animate-bounce block mb-4">📡</span><p className="text-amber-600 font-bold text-lg">ランキングデータがないよ！</p><p className="text-sm text-amber-500 mt-2">（一番乗りのチャンス！）</p></div>
              ) : (
                <div className="flex flex-col gap-3">
                  {rankingData.map((data, index) => (
                    <div key={data.id} className={`flex items-center justify-between p-4 rounded-xl border-2 ${user && data.id === user.uid ? 'bg-yellow-100 border-yellow-400 shadow-md transform scale-[1.02]' : 'bg-white border-orange-100'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${index === 0 ? 'bg-yellow-400 text-white shadow-md' : index === 1 ? 'bg-slate-300 text-slate-700 shadow-md' : index === 2 ? 'bg-amber-600 text-white shadow-md' : 'bg-orange-100 text-orange-800'}`}>{index + 1}</div>
                        <span className="text-xl font-bold text-amber-900 flex items-center gap-2">{data.nickname}{user && data.id === user.uid && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full shadow-sm animate-pulse">あなた</span>}</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-end gap-1 justify-end"><span className="text-2xl font-black text-orange-500">{data.coins}</span><span className="text-sm font-bold text-orange-400 mb-1">C</span></div>
                        <div className="text-xs font-bold text-amber-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block mt-1">成功率: {data.accuracy ?? 0}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if (nickname) setGameState('title'); else setGameState('entrance'); playSound('type'); }} className="px-8 py-3 bg-slate-500 hover:bg-slate-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-slate-600 active:border-b-0 active:translate-y-1 transition-all">戻る</button>
          </div>
        )}

        {/* === インベントリ画面 === */}
        {gameState === 'inventory' && (
          <div className="pt-28 pb-12 px-2 md:px-10">
            <h2 className="text-4xl font-black text-amber-800 mb-6 text-center">🎒 インベントリ</h2>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              <button onClick={() => setInventoryTab('items')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${inventoryTab === 'items' ? 'bg-amber-500 text-white shadow-inner' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>便利アイテム</button>
              <button onClick={() => setInventoryTab('plates')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${inventoryTab === 'plates' ? 'bg-amber-500 text-white shadow-inner' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>お皿</button>
              <button onClick={() => setInventoryTab('facilities')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${inventoryTab === 'facilities' ? 'bg-amber-500 text-white shadow-inner' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>設備（消費）</button>
              <button onClick={() => setInventoryTab('emotions')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${inventoryTab === 'emotions' ? 'bg-amber-500 text-white shadow-inner' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>感情</button>
              <button onClick={() => setInventoryTab('staffs')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${inventoryTab === 'staffs' ? 'bg-amber-500 text-white shadow-inner' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>店員</button>
            </div>
            {inventoryTab === 'items' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{SHOP_ITEMS.filter(item => inventory.includes(item.id)).length === 0 ? <p className="text-center text-amber-700 font-bold">持っている便利アイテムはないよ！</p> : SHOP_ITEMS.filter(item => inventory.includes(item.id)).map(item => <InventoryItemRow key={item.id} item={item} isEquipped={activeItems.includes(item.id)} onEquip={handleToggleItem} isToggleable={true} />)}</div>}
            {inventoryTab === 'plates' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{PLATE_ITEMS.filter(plate => plateInventory.includes(plate.id)).map(plate => <InventoryItemRow key={plate.id} item={plate} isEquipped={activePlateId === plate.id} onEquip={handleEquipPlate} />)}</div>}
            {inventoryTab === 'facilities' && <div className="grid gap-4 max-w-2xl mx-auto mb-10"><p className="text-center text-amber-600 font-bold mb-4 text-sm bg-amber-100 py-2 rounded-xl">※ 設備はゲームプレイ中に 1, 2 キーを押して使う消費アイテムです。</p>{FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).length === 0 ? <p className="text-center text-amber-700 font-bold">持っている設備はないよ！</p> : FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).map(item => { const count = facilityInventory.filter(id => id === item.id).length; return <InventoryItemRow key={item.id} item={item} count={count} />; }).filter((v, i, a) => a.findIndex(t => (t.key === v.key)) === i)}</div>}
            {inventoryTab === 'emotions' && <div className="grid gap-4 max-w-2xl mx-auto mb-10"><InventoryItemRow item={{ id: 'normal', name: '感情なし', desc: '標準の状態に戻す', emoji: '🙂' }} isEquipped={activeEmotion === 'normal'} onEquip={() => { setActiveEmotion('normal'); playSound('type'); }} isToggleable={false} />{EMOTION_ITEMS.filter(item => emotionInventory.includes(item.id)).map(item => <InventoryItemRow key={item.id} item={item} isEquipped={activeEmotion === item.id} onEquip={() => { setActiveEmotion(item.id); playSound('type'); }} isToggleable={false} />)}</div>}
            {inventoryTab === 'staffs' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{STAFF_ITEMS.filter(staff => staffInventory.includes(staff.id)).map(staff => <InventoryItemRow key={staff.id} item={staff} isEquipped={activeStaffId === staff.id} onEquip={handleEquipStaff} />)}</div>}
            <div className="text-center"><button onClick={() => setGameState('title')} className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all">タイトルへ戻る</button></div>
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
            {sellTab === 'items' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{sellMode === 'sell' ? (SHOP_ITEMS.filter(item => inventory.includes(item.id) && item.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : SHOP_ITEMS.filter(item => inventory.includes(item.id) && item.price > 0).map(item => (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name}</h3><p className="text-sm text-amber-700">{item.desc}</p></div></div><div className="shrink-0"><button onClick={() => handleSellItem(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(item.price / 2)} C)</button></div></div>))) : (SHOP_ITEMS.filter(item => soldInventory.includes(item.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : SHOP_ITEMS.filter(item => soldInventory.includes(item.id)).map(item => { const returnPrice = Math.floor(item.price * 1.5); const canBuyback = coins >= returnPrice; return (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300"><div className="flex items-center gap-4"><div className="text-5xl opacity-80">{item.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{item.name}</h3></div></div><div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnItem(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div></div>); }))}</div>}
            {sellTab === 'plates' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{sellMode === 'sell' ? (PLATE_ITEMS.filter(plate => plateInventory.includes(plate.id) && plate.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : PLATE_ITEMS.filter(plate => plateInventory.includes(plate.id) && plate.price > 0).map(plate => (<div key={plate.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4"><div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md ${plate.css}`}></div><div><h3 className="text-xl font-bold text-amber-900">{plate.name}</h3></div></div><div className="shrink-0"><button onClick={() => handleSellPlate(plate)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(plate.price / 2)} C)</button></div></div>))) : (PLATE_ITEMS.filter(plate => soldPlateInventory.includes(plate.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : PLATE_ITEMS.filter(plate => soldPlateInventory.includes(plate.id)).map(plate => { const returnPrice = Math.floor(plate.price * 1.5); const canBuyback = coins >= returnPrice; return (<div key={plate.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300"><div className="flex items-center gap-4"><div className={`w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md opacity-80 ${plate.css}`}></div><div><h3 className="text-xl font-bold text-indigo-900">{plate.name}</h3></div></div><div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnPlate(plate)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div></div>); }))}</div>}
            {sellTab === 'facilities' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{sellMode === 'sell' ? (FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : FACILITY_ITEMS.filter(item => facilityInventory.includes(item.id)).map(item => { const ownedCount = facilityInventory.filter(id => id === item.id).length; return (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name} <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full ml-2">所持: {ownedCount}個</span></h3></div></div><div className="shrink-0"><button onClick={() => handleSellFacility(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">1個売却 (+{Math.floor(item.price / 2)} C)</button></div></div>)}).filter((v, i, a) => a.findIndex(t => (t.key === v.key)) === i)) : (<p className="text-center text-indigo-700 font-bold">消費アイテムは返却対象外コケ！<br/><span className="text-sm font-normal">（ショップでいつでも買えるコケ！）</span></p>)}</div>}
            {sellTab === 'emotions' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{sellMode === 'sell' ? (EMOTION_ITEMS.filter(item => emotionInventory.includes(item.id) && item.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : EMOTION_ITEMS.filter(item => emotionInventory.includes(item.id) && item.price > 0).map(item => (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name}</h3></div></div><div className="shrink-0"><button onClick={() => handleSellEmotion(item)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(item.price / 2)} C)</button></div></div>))) : (EMOTION_ITEMS.filter(item => soldEmotionInventory.includes(item.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : EMOTION_ITEMS.filter(item => soldEmotionInventory.includes(item.id)).map(item => { const returnPrice = Math.floor(item.price * 1.5); const canBuyback = coins >= returnPrice; return (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300"><div className="flex items-center gap-4"><div className="text-5xl opacity-80">{item.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{item.name}</h3></div></div><div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnEmotion(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div></div>); }))}</div>}
            {sellTab === 'staffs' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{sellMode === 'sell' ? (STAFF_ITEMS.filter(staff => staffInventory.includes(staff.id) && staff.price > 0).length === 0 ? <p className="text-center text-amber-700 font-bold">売れるものがないコケ！</p> : STAFF_ITEMS.filter(staff => staffInventory.includes(staff.id) && staff.price > 0).map(staff => (<div key={staff.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4"><div className="text-5xl">{staff.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{staff.name}</h3></div></div><div className="shrink-0"><button onClick={() => handleSellStaff(staff)} className="px-6 py-2 rounded-full font-bold text-white shadow-md transition-all bg-rose-500 hover:bg-rose-400 active:translate-y-1 border-b-4 border-rose-600 active:border-b-0">売却 (+{Math.floor(staff.price / 2)} C)</button></div></div>))) : (STAFF_ITEMS.filter(staff => soldStaffInventory.includes(staff.id)).length === 0 ? <p className="text-center text-indigo-700 font-bold">返却できるものがないコケ！</p> : STAFF_ITEMS.filter(staff => soldStaffInventory.includes(staff.id)).map(staff => { const returnPrice = Math.floor(staff.price * 1.5); const canBuyback = coins >= returnPrice; return (<div key={staff.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-indigo-50 border-indigo-100 hover:border-indigo-300"><div className="flex items-center gap-4"><div className="text-5xl opacity-80">{staff.emoji}</div><div><h3 className="text-xl font-bold text-indigo-900">{staff.name}</h3></div></div><div className="text-right shrink-0"><p className="text-sm font-bold text-indigo-500 mb-1">返却費用: {returnPrice} C</p><button disabled={!canBuyback} onClick={() => handleReturnStaff(staff)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuyback ? 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-1 border-b-4 border-indigo-600 active:border-b-0' : 'bg-slate-400 cursor-not-allowed'}`}>買い戻す</button></div></div>); }))}</div>}
            <div className="text-center"><button onClick={() => setGameState('title')} className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-lime-600 active:border-b-0 active:translate-y-1 transition-all">タイトルへ戻る</button></div>
          </div>
        )}

        {/* === ショップ画面 === */}
        {gameState === 'shop' && (
          <div className="pt-28 pb-12 px-2 md:px-10">
            <h2 className="text-4xl font-black text-amber-800 mb-4 text-center">🛒 パン屋ショップ</h2>
            <div className="bg-orange-100 rounded-xl p-4 mb-6 border-2 border-orange-200 max-w-2xl mx-auto shadow-sm">
              <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-orange-800 flex items-center gap-2"><span className="text-xl">🐰</span> ショップ信頼レベル: {shopLevel}</h3>{hasFreeCoupon && <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-sm">1回無料クーポン所持！</span>}</div>
              <div className="w-full bg-orange-200 rounded-full h-4 overflow-hidden relative shadow-inner"><div className="bg-gradient-to-r from-orange-400 to-orange-500 h-4 transition-all duration-500" style={{ width: `${(shopTrust / getMaxTrust(shopLevel)) * 100}%` }}></div></div>
              <p className="text-right text-xs font-bold text-orange-600 mt-1">{shopTrust} / {getMaxTrust(shopLevel)}</p>
            </div>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              <button onClick={() => setShopTab('items')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'items' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>便利アイテム</button>
              <button onClick={() => setShopTab('plates')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'plates' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>お皿</button>
              <button onClick={() => setShopTab('facilities')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'facilities' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>設備（消費）</button>
              <button onClick={() => setShopTab('emotions')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'emotions' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>感情</button>
              <button onClick={() => setShopTab('staffs')} className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all ${shopTab === 'staffs' ? 'bg-orange-500 text-white shadow-inner' : 'bg-orange-100 text-amber-800 hover:bg-orange-200'}`}>店員</button>
            </div>
            {shopTab === 'items' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{SHOP_ITEMS.filter(i => !i.isSecret || shopLevel >= 5).map(item => <ShopItemRow key={item.id} item={item} isOwned={inventory.includes(item.id)} isSold={soldInventory.includes(item.id)} onBuy={handleBuyItem} />)}</div>}
            {shopTab === 'plates' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{PLATE_ITEMS.map(plate => <ShopItemRow key={plate.id} item={plate} isOwned={plateInventory.includes(plate.id)} isSold={soldPlateInventory.includes(plate.id)} onBuy={handleBuyPlate} />)}</div>}
            {shopTab === 'facilities' && <div className="grid gap-4 max-w-2xl mx-auto mb-10"><p className="text-center text-orange-600 font-bold mb-4 text-sm bg-orange-100 py-2 rounded-xl">※ 設備はゲームプレイ中に 1, 2 キーを押して使う消費アイテムです。<br className="md:hidden" />（装備解除は必要ありません）</p>{FACILITY_ITEMS.map(item => { const ownedCount = facilityInventory.filter(id => id === item.id).length; const finalPrice = getDiscountedPrice(item.price, shopLevel); const isFree = hasFreeCoupon && item.price > 0; const canBuy = coins >= (isFree ? 0 : finalPrice); return (<div key={item.id} className="p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors bg-orange-50 border-orange-100 hover:border-orange-300"><div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto"><div className="text-5xl">{item.emoji}</div><div><h3 className="text-xl font-bold text-amber-900">{item.name} <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full ml-2 align-middle">所持: {ownedCount}個</span></h3><p className="text-sm text-amber-700">{item.desc}</p></div></div><div className="text-center md:text-right shrink-0"><div className="mb-2">{shopLevel > 1 && <span className="text-xs text-slate-400 line-through mr-1">{item.price}C</span>}<span className={`text-lg font-bold ${isFree ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>{isFree ? '0 C (無料!)' : `${finalPrice} C`}</span></div><button disabled={!canBuy} onClick={() => handleBuyFacility(item)} className={`px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${canBuy ? 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0' : 'bg-rose-300 cursor-not-allowed'}`}>購入する</button></div></div>); })}</div>}
            {shopTab === 'emotions' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{EMOTION_ITEMS.map(item => <ShopItemRow key={item.id} item={item} isOwned={emotionInventory.includes(item.id)} isSold={soldEmotionInventory.includes(item.id)} onBuy={handleBuyEmotion} />)}</div>}
            {shopTab === 'staffs' && <div className="grid gap-4 max-w-2xl mx-auto mb-10">{STAFF_ITEMS.map(staff => <ShopItemRow key={staff.id} item={staff} isOwned={staffInventory.includes(staff.id)} isSold={soldStaffInventory.includes(staff.id)} onBuy={handleBuyStaff} actionText="雇用する" />)}</div>}
            <div className="text-center"><button onClick={() => setGameState('title')} className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">タイトルへ戻る</button></div>
          </div>
        )}

        {/* === プレイ画面 === */}
        {gameState === 'playing' && (
          <div className="flex flex-col h-[500px] pt-16 relative">
            {currentEvent && <div className="absolute top-1/2 left-1/2 z-50 pointer-events-none animate-event-banner flex flex-col items-center"><div className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,100,0,1)] whitespace-nowrap" style={{ WebkitTextStroke: '2px #c2410c' }}>{getEventBannerName(currentEvent)}</div></div>}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-20 pointer-events-none whitespace-nowrap">
              {!isConveyorOn && <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-blue-400">🔌 レーン停止中！</span>}
              {scoreBoost && <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-yellow-400">🍯 スコア＆コイン 2倍！</span>}
              {currentEvent === 'double_coin' && <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-yellow-400">🌟 お金2倍イベント発生中！</span>}
              {currentEvent === 'half_coin' && <span className="bg-purple-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-purple-400">💸 お金半分イベント発生中…</span>}
              {currentEvent === 'deer_staff' && <span className="bg-amber-600 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-amber-400">🦌 鹿店員イベント発生中！</span>}
              {currentEvent === 'rare_bread' && <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-rose-400">✨ レアパン大量発生中！</span>}
              {currentEvent === 'trade' && <span className="bg-slate-800 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-slate-600">👾 謎の気配がする…</span>}
              {currentEvent === 'fire_event' && <span className="bg-rose-600 text-white px-4 py-1.5 rounded-full font-bold shadow-md animate-pulse border-2 border-rose-400">🔥 激辛パン注意！</span>}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2 z-30">
              {FACILITY_ITEMS.map((item, idx) => {
                const count = facilityInventory.filter(id => id === item.id).length; if (count === 0) return null;
                return (
                  <button key={item.id} onClick={() => useItem(item.id)} className="relative bg-white/90 p-3 rounded-xl shadow-lg border-2 border-orange-200 hover:bg-orange-50 active:translate-y-1 transition-all group" title={`${item.name} (キーボード: ${idx + 1})`}>
                    <span className="text-3xl drop-shadow-sm group-active:scale-90 transition-transform block">{item.emoji}</span><span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{count}</span><span className="absolute bottom-0 right-1 text-[10px] font-black text-slate-400">{idx + 1}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-start mb-4 border-b-2 border-orange-100 pb-4 relative">
              <div className="flex items-center gap-6 md:gap-10"><div><p className="text-xs md:text-sm text-amber-600 font-bold">スコア(コイン)</p><p className="text-3xl md:text-5xl font-black text-orange-500 tabular-nums leading-none">{score}</p></div><div><p className="text-xs md:text-sm text-amber-600 font-bold">コンボ</p><p className={`text-2xl md:text-4xl font-black tabular-nums leading-none transition-colors duration-200 ${combo > 10 ? 'text-rose-500' : 'text-amber-700'}`}>{combo}</p></div></div>
              <div className="flex flex-col items-end gap-2"><div className="text-right"><p className="text-xs md:text-sm text-amber-600 font-bold">残り時間</p><p className={`text-4xl md:text-6xl font-black tabular-nums leading-none ${timeLeft <= 10 && timeLeft !== Infinity ? 'text-rose-500 animate-pulse' : 'text-orange-500'}`}>{timeLeft === Infinity ? '∞' : timeLeft}<span className="text-2xl text-amber-700">{timeLeft === Infinity ? '' : '秒'}</span></p></div><button onClick={handleManualFinish} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg shadow-sm transition-colors text-sm border-b-2 border-slate-400 active:border-b-0 active:translate-y-1">{course.isInfinite ? '練習を終了する' : 'リタイア'}</button></div>
            </div>
            <div className="flex-grow relative bg-orange-50/50 rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner">
              <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 border-y-8 shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)] transition-colors duration-500 ${isConveyorOn ? 'bg-slate-700 border-slate-600' : 'bg-blue-900 border-blue-700'}`} style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.05) 38px, rgba(255,255,255,0.05) 40px)', animation: 'conveyor 1s linear infinite', animationPlayState: isConveyorOn ? 'running' : 'paused' }} />
              {clearedPlates.map(plate => (
                <div key={plate.id} className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-0`} style={{ left: '100%', animation: `flow ${plate.animTime}s linear forwards`, animationDelay: `-${plate.elapsed}s`, animationPlayState: isConveyorOn ? 'running' : 'paused' }} onAnimationEnd={() => setClearedPlates(prev => prev.filter(p => p.id !== plate.id))}>
                  <div className="relative mb-3"><div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl ${plate.css}`}></div><div className="text-6xl md:text-7xl opacity-0 translate-y-2">🍞</div></div>
                  <div className="bg-slate-100/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-md border-2 border-slate-300 text-center whitespace-nowrap min-w-[200px] opacity-70"><div className="text-lg md:text-xl font-bold text-slate-600 mb-1 flex justify-center items-center gap-2"><span>{plate.word.name}</span><span className="text-sm bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full border border-slate-300">¥{plate.word.displayPrice}</span></div><div className="text-2xl md:text-4xl font-mono font-black tracking-widest text-slate-400">{plate.word.romaji}</div></div>
                </div>
              ))}
              {currentBread && (
                <div key={animKey} className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-10`} style={{ left: '100%', animation: `flow ${animTime}s linear forwards`, animationDelay: currentBread.spawnedWhileStopped ? `-${animTime * 0.15}s` : '0s', animationPlayState: isConveyorOn ? 'running' : 'paused' }} onAnimationEnd={handleMissWord}>
                  <div className="relative mb-3"><div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl ${activePlate.css}`}></div><div className="text-6xl md:text-7xl drop-shadow-lg relative z-10 transition-transform hover:scale-110 translate-y-2">{currentBread.word.emoji}</div></div>
                  <div className={`bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border-2 ${currentBread.word.isFire ? 'border-rose-500 bg-rose-50' : 'border-orange-200'} text-center whitespace-nowrap min-w-[200px] transition-all`}>
                    <div className={`text-lg md:text-xl font-bold ${currentBread.word.isFire ? 'text-rose-600' : 'text-amber-900'} mb-1 flex justify-center items-center gap-2`}>{currentBread.word.isFire && <span className="animate-pulse">🔥</span>}<span>{currentBread.word.name}</span><span className={`text-sm ${currentBread.word.isFire ? 'bg-rose-200 text-rose-800 border-rose-300' : 'bg-orange-100 text-orange-600 border-orange-200'} px-2 py-0.5 rounded-full border`}>¥{Math.floor(currentBread.word.price * currentEmotionMultiplier * (scoreBoost ? 2 : 1) * eventCoinMult)}</span></div>
                    <div className={`text-2xl md:text-4xl font-mono font-black tracking-widest ${isOnFire ? 'opacity-30 blur-[1px]' : ''}`}>
                      <span className="text-slate-300">{currentBread.word.romaji.substring(0, currentBread.typedCount)}</span><span className={`${currentBread.word.isFire ? 'text-rose-500 border-rose-500' : 'text-orange-500 border-orange-500'} border-b-4 pb-1`}>{currentBread.word.romaji.substring(currentBread.typedCount, currentBread.typedCount + 1)}</span><span className={currentBread.word.isFire ? 'text-rose-800' : 'text-amber-800'}>{currentBread.word.romaji.substring(currentBread.typedCount + 1)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isOnFire && currentWater && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-blue-50/95 backdrop-blur-sm border-4 border-blue-400 px-8 py-4 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-pulse flex flex-col items-center">
                <h3 className="text-2xl font-black text-rose-600 mb-2 drop-shadow-sm flex items-center gap-2"><span>🔥</span>辛い！水を飲んで鎮火しろ！<span>🔥</span></h3>
                <div className="flex items-center gap-6"><div className="text-7xl drop-shadow-md animate-bounce">{currentWater.word.emoji}</div><div className="bg-white px-8 py-4 rounded-2xl shadow-inner border-2 border-blue-200"><div className="text-4xl font-mono font-black tracking-widest text-center"><span className="text-blue-200">{currentWater.word.romaji.substring(0, currentWater.typedCount)}</span><span className="text-blue-500 border-b-4 border-blue-500 pb-1">{currentWater.word.romaji.substring(currentWater.typedCount, currentWater.typedCount + 1)}</span><span className="text-blue-800">{currentWater.word.romaji.substring(currentWater.typedCount + 1)}</span></div></div></div>
              </div>
            )}
          </div>
        )}

        {/* === 取引イベント画面 === */}
        {gameState === 'trade' && (
          <div className="text-center pt-24 pb-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-8xl md:text-9xl mb-8 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' }}>👾</div>
            {tradePhase === 'offer' && (
              <div className="animate-fade-in"><h2 className="text-2xl md:text-4xl font-black text-purple-100 mb-8 bg-slate-800 px-8 py-6 rounded-3xl border-4 border-purple-900 shadow-[0_0_30px_rgba(88,28,135,0.6)]">「クックック… 取引しないか？」</h2><div className="flex flex-col md:flex-row justify-center gap-4"><button onClick={handleTradeRefuse} className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all">渡さない</button><button onClick={handleTradeAccept} className="px-8 py-4 bg-purple-700 hover:bg-purple-600 text-purple-100 font-black text-xl rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition-all">一番レアなものを渡す</button></div></div>
            )}
            {tradePhase === 'no_item' && (
              <div className="animate-fade-in"><h2 className="text-2xl md:text-3xl font-black text-purple-100 mb-8 bg-slate-800 px-8 py-6 rounded-3xl border-4 border-purple-900 shadow-[0_0_30px_rgba(88,28,135,0.6)]">「なんだ、取引できるような物を<br className="md:hidden" />何も持っていないじゃないか…」</h2><button onClick={handleTradeFinish} className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all">次へ</button></div>
            )}
            {tradePhase === 'choices' && (
              <div className="animate-fade-in w-full max-w-2xl"><h2 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 animate-pulse">「『{lostTradeItem.name}』を受け取ったぞ…」</h2><h2 className="text-2xl md:text-3xl font-black text-purple-100 mb-8 bg-slate-800 px-8 py-6 rounded-3xl border-4 border-purple-900 shadow-[0_0_30px_rgba(88,28,135,0.6)]">「さあ、どれか一つ選ぶがいい。」</h2><div className="flex flex-col gap-4">{tradeRewards.map((reward, i) => (<button key={i} onClick={() => handleTradeRewardSelect(reward)} className="w-full px-4 py-6 bg-purple-800 hover:bg-purple-700 text-purple-100 font-black text-xl md:text-2xl rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)] border-b-8 border-purple-950 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center text-center">{reward.text}</button>))}</div></div>
            )}
            {tradePhase === 'done' && (
              <div className="animate-fade-in"><h2 className="text-2xl md:text-4xl font-black text-purple-100 mb-8 bg-slate-800 px-8 py-6 rounded-3xl border-4 border-purple-900 shadow-[0_0_30px_rgba(88,28,135,0.6)] leading-relaxed">「クックック…<br/><span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">『{gainedTradeReward}』</span> をやろう。<br/>さらばだ。」</h2><button onClick={handleTradeFinish} className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all">リザルトへ</button></div>
            )}
          </div>
        )}

        {/* === リザルト画面 === */}
        {gameState === 'result' && (
          <div className="text-center pt-24 pb-12">
            <h2 className="text-4xl font-black text-amber-800 mb-2">{course.noCoin ? '練習終了！🥖' : isRetired ? 'リタイア！🥖' : 'タイムアップ！🥖'}</h2>
            <p className="text-xl font-bold text-orange-600 mb-4">コース: {course.name}</p>
            {!course.noCoin ? (
              isRetired ? <div className="inline-block bg-slate-100 border-2 border-slate-400 px-6 py-2 rounded-full mb-8 shadow-md"><p className="text-lg font-black text-slate-700">リタイアのためコイン獲得なし</p></div> : <div className="inline-block bg-yellow-100 border-2 border-yellow-400 px-6 py-2 rounded-full mb-8 animate-bounce shadow-md"><p className="text-lg font-black text-yellow-700">+{score} コイン獲得！</p></div>
            ) : (<div className="inline-block bg-teal-100 border-2 border-teal-400 px-6 py-2 rounded-full mb-8 shadow-md"><p className="text-lg font-black text-teal-700">練習お疲れ様{displayStaff.suffix}！</p></div>)}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100 col-span-2 md:col-span-1"><p className="text-sm text-amber-600 font-bold">最終スコア</p><p className="text-4xl font-black text-orange-500">{score}</p></div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100"><p className="text-sm text-amber-600 font-bold">獲得パン数</p><p className="text-3xl font-black text-amber-700">{clearedBreads} 個</p></div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100"><p className="text-sm text-amber-600 font-bold">最大コンボ</p><p className="text-3xl font-black text-amber-700">{maxCombo}</p></div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100"><p className="text-sm text-amber-600 font-bold">正解タイプ</p><p className="text-2xl font-black text-amber-700">{totalTyped} 回</p></div>
              <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100"><p className="text-sm text-amber-600 font-bold">正解率</p><p className="text-2xl font-black text-amber-700">{accuracy} %</p></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setGameState('title')} className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">タイトルへ</button>
              <button onClick={() => setGameState('shop')} className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"><span className="text-2xl">🛒</span> ショップへ</button>
            </div>
          </div>
        )}

        {/* === セーブ/ロードモーダル === */}
        {isSaveModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-teal-100">
              <h2 className="text-2xl font-black text-teal-800 mb-2 flex items-center gap-2"><span>💾</span> データ引き継ぎ</h2>
              <p className="text-sm text-slate-600 mb-4 font-bold">セーブコードを発行して、次回プレイ時にロードできます。</p>
              <textarea value={saveLoadText} onChange={(e) => setSaveLoadText(e.target.value)} className="w-full h-32 p-3 border-2 border-teal-200 rounded-xl mb-2 font-mono text-xs focus:outline-none focus:border-teal-500 bg-slate-50" placeholder="ここにセーブコードが表示されます。ロードする場合はコードを貼り付けてください。" />
              <div className="min-h-[24px] mb-4">{saveMessage && <p className="text-teal-600 font-bold text-center text-sm">{saveMessage}</p>}</div>
              <div className="grid grid-cols-2 gap-3 mb-4"><button onClick={handleSave} className="bg-teal-500 hover:bg-teal-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-teal-600 active:border-b-0">セーブ発行</button><button onClick={copyToClipboard} className="bg-amber-500 hover:bg-amber-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-amber-600 active:border-b-0">コピー</button></div>
              <div className="mb-6"><button onClick={handleLoad} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl shadow-md active:translate-y-1 transition-all border-b-4 border-blue-600 active:border-b-0">コードからロード</button></div>
              <button onClick={() => setIsSaveModalOpen(false)} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all">閉じる</button>
            </div>
          </div>
        )}

        {/* === ニックネーム登録モーダル === */}
        {isNicknameModalOpen && (
          <div className="absolute inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-4 border-orange-200 text-center animate-fade-in">
              <h2 className="text-3xl font-black text-orange-600 mb-4 flex items-center justify-center gap-2"><span>📝</span> プレイヤー登録</h2>
              <p className="text-sm text-slate-600 font-bold mb-6">オンラインランキングなどのために<br/>ニックネームを決めてね！</p>
              <input type="text" value={nicknameInput} onChange={(e) => { setNicknameInput(e.target.value); setNicknameError(""); }} maxLength={10} placeholder="ここに書いてね" className="w-full px-4 py-3 border-4 border-orange-100 rounded-xl mb-2 font-bold text-lg focus:outline-none focus:border-orange-400 placeholder-slate-300 text-center" />
              <div className="min-h-[24px] mb-6">{nicknameError && <p className="text-rose-500 font-bold text-xs">{nicknameError}</p>}</div>
              <button onClick={handleRegisterNickname} className="w-full bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl shadow-md active:translate-y-1 transition-all text-xl border-b-4 border-orange-600 active:border-b-0">決定！</button>
            </div>
          </div>
        )}

        {/* === ゲーム終了確認モーダル === */}
        {isExitModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-4 border-rose-200 text-center">
              <h2 className="text-3xl font-black text-rose-500 mb-4 flex items-center justify-center gap-2"><span>⚠️</span> 警告</h2>
              <p className="text-lg text-amber-900 font-bold mb-8">セーブされていません！<br/>本当にゲームを終了しますか？</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => { setIsExitModalOpen(false); setSaveLoadText(""); setSaveMessage(""); setIsSaveModalOpen(true); }} className="w-full bg-teal-500 hover:bg-teal-400 text-white font-black py-4 rounded-xl shadow-md active:translate-y-1 transition-all text-lg border-b-4 border-teal-600 active:border-b-0">セーブ・ロードメニューを開く</button>
                <button onClick={() => { setIsExitModalOpen(false); window.close(); setGameState('closed'); }} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all">ゲームを終了する</button>
              </div>
            </div>
          </div>
        )}

        {/* === ゲーム終了後（Closed）画面 === */}
        {gameState === 'closed' && (
          <div className="text-center pt-32 pb-20 flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-4xl md:text-5xl font-black text-slate-500 mb-6 drop-shadow-sm">ゲームを終了しました</h1>
            <p className="text-lg text-slate-600 font-bold mb-12">お疲れ様でした。ブラウザのタブを閉じてください。</p>
            <button onClick={() => { setGameState('title'); playSound('type'); }} className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-full shadow-md transition-all active:translate-y-1 border-b-4 border-orange-600 active:border-b-0">やっぱりもう一度遊ぶ</button>
          </div>
        )}
      </div>

      <div className="mt-8 text-amber-700/60 font-medium text-sm">PCのキーボード専用ゲームです</div>
    </div>
  );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
