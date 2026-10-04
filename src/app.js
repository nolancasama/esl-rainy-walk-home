import { createRunner } from './engine.js';
import { createGestureDetector } from './gestures.js';
import { TapToTalk } from './speech.js';
import { STORY } from './story.js';
import {
  isSoundEnabled, playSfx, setAmbience, setSoundEnabled, setTitleAmbience, unlockAudio,
} from './audio.js';
import { PORTRAIT_ART, SCENE_ART } from './art-manifest.js';
import { renderVisual, resolveVisual } from './visuals.js';
import { VOCAB_BY_ID } from './vocab.js';

const root = document.querySelector('#app');
const params = new URLSearchParams(location.search);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cameraForced = params.get('cam') === '1';
// Mic and camera default ON; ?cam=0 starts with the camera off.
let micOn = true;
let camOn = params.get('cam') !== '0';
const PERMISSION_WAIT_MS = 8000;
let soundOn = isSoundEnabled();
let settingsOpen = false;
let starting = false;
let runner;
let hint = false;
let gestureDetector;
let activeTalk;
let fallbackTimer;
let activeLayer = 0;
let visualKey = '';
let firstBeat = false;

function parseSet() {
  return Object.fromEntries((params.get('set') || '').split(',').filter(Boolean).map((pair) => {
    const [key, raw] = pair.split(':');
    if (raw === 'true' || raw === 'false') return [key, raw === 'true'];
    return [key, Number.isNaN(Number(raw)) ? raw : Number(raw)];
  }));
}

function cleanupInteraction() {
  gestureDetector?.stop();
  gestureDetector = undefined;
  activeTalk?.cancel();
  activeTalk = undefined;
  clearTimeout(fallbackTimer);
  document.querySelector('#camera-float')?.setAttribute('hidden', '');
}

function settingsMarkup() {
  return `
    <button class="settings-button" id="settings-button" aria-label="設定 settings" aria-expanded="${settingsOpen}">⚙</button>
    <aside class="settings-panel" id="settings-panel" ${settingsOpen ? '' : 'hidden'} aria-label="設定">
      <button class="setting-toggle" id="mic">マイク <span>${micOn ? 'ON' : 'OFF'}</span></button>
      <button class="setting-toggle" id="cam" ${cameraForced ? 'disabled' : ''}>カメラ <span>${camOn ? 'ON' : 'OFF'}</span></button>
      <button class="setting-toggle" id="sound-toggle">サウンド <span>${soundOn ? 'ON' : 'OFF'}</span></button>
    </aside>`;
}

function showIntro() {
  cleanupInteraction();
  runner = undefined;
  window.storyRunner = undefined;
  hint = false;
  starting = false;
  settingsOpen = false;
  visualKey = '';
  document.documentElement.className = 'tone-rain intro-mode';
  setTitleAmbience();
  root.innerHTML = `
    <section class="intro-screen">
      <img class="intro-art" src="art/scenes/school-01.webp" alt="">
      <div class="intro-shade"></div>
      <div class="intro-title">
        <h1>${STORY.title}</h1><p>${STORY.titleJa}</p>
        <button class="primary start-button" id="start">はじめる</button>
      </div>
      ${settingsMarkup()}
    </section>`;
  bindIntro();
}

function bindIntro() {
  document.querySelector('#settings-button').onclick = () => {
    settingsOpen = !settingsOpen;
    refreshSettings();
  };
  document.querySelector('#start').onclick = begin;
  bindSettings();
}

function refreshSettings() {
  const parsed = new DOMParser().parseFromString(settingsMarkup(), 'text/html');
  document.querySelector('#settings-panel').replaceWith(parsed.querySelector('#settings-panel'));
  document.querySelector('#settings-button').setAttribute('aria-expanded', String(settingsOpen));
  bindSettings();
}

function bindSettings() {
  document.querySelector('#mic').onclick = () => { micOn = !micOn; refreshSettings(); };
  document.querySelector('#cam').onclick = () => {
    if (!cameraForced) camOn = !camOn;
    refreshSettings();
  };
  document.querySelector('#sound-toggle').onclick = () => {
    soundOn = !soundOn;
    setSoundEnabled(soundOn);
    refreshSettings();
  };
}

const recognitionAvailable = () => Boolean(globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition);

// Ask for mic/camera once, on はじめる, so no permission prompt interrupts the
// story later. Denial or a missing device quietly switches that input off (tap
// fallbacks remain). An unanswered prompt never blocks: after a short wait the
// story starts anyway, and a later answer still applies.
async function requestPermissions() {
  const wantMic = micOn && recognitionAvailable();
  const wantCam = camOn;
  if (!wantMic && !wantCam) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    if (!cameraForced) camOn = false;
    return;
  }
  const ask = (constraints) => navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => { stream.getTracks().forEach((track) => track.stop()); return true; });
  const attempt = async () => {
    try {
      await ask({ audio: wantMic, video: wantCam });
      return;
    } catch (error) {
      if (['NotAllowedError', 'SecurityError'].includes(error?.name)) {
        if (wantMic) micOn = false;
        if (wantCam) camOn = false;
        return;
      }
    }
    // A missing device fails the joint request; try each input on its own.
    if (wantMic) micOn = await ask({ audio: true }).catch(() => false);
    if (wantCam) camOn = await ask({ video: true }).catch(() => false);
  };
  await Promise.race([
    attempt().catch(() => {}),
    new Promise((resolve) => { setTimeout(resolve, PERMISSION_WAIT_MS); }),
  ]);
}

async function begin() {
  if (starting || settingsOpen) return;
  starting = true;
  await unlockAudio();
  const startButton = document.querySelector('#start');
  if (startButton) startButton.disabled = true;
  await requestPermissions();
  document.querySelector('.intro-screen')?.classList.add('leaving');
  await new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : 400));
  runner = createRunner(STORY, { initialState: parseSet(), scene: params.get('scene') || undefined });
  window.storyRunner = runner;
  hint = false;
  createGameShell();
  renderBeat(true);
}

function createGameShell() {
  document.documentElement.className = 'tone-rain game-mode';
  root.innerHTML = `
    <section class="game-screen">
      <div class="art-stack"><div class="visual-layer" data-layer="0"></div><div class="visual-layer" data-layer="1"></div></div>
      <div class="bottom-scrim"></div>
      <p class="place" id="place"></p>
      <div class="camera-float" id="camera-float" hidden><div id="cam-preview"></div><div class="motion-track"><i id="motion-level"></i></div></div>
      <main class="story-overlay" id="story-overlay"></main>
    </section>`;
  activeLayer = 0;
  visualKey = '';
  firstBeat = true;
}

function advance() {
  cleanupInteraction(); hint = false;
  if (runner.next()) renderBeat(true);
}
function choose(index) {
  cleanupInteraction(); hint = false;
  if (runner.choose(index)) renderBeat(true);
}
function complete() {
  cleanupInteraction(); hint = false;
  if (runner.complete()) renderBeat(true);
}

function updateVisual(visual) {
  const resolved = resolveVisual(visual);
  const nextKey = resolved?.type === 'image' ? `image:${resolved.src}` : `${visual?.type}:${visual?.id || visual?.description || ''}`;
  if (nextKey === visualKey) return;
  visualKey = nextKey;
  const nextLayer = activeLayer ? 0 : 1;
  const layer = document.querySelector(`[data-layer="${nextLayer}"]`);
  const previous = document.querySelector(`[data-layer="${activeLayer}"]`);
  layer.className = `visual-layer tone-${visual?.tone || 'cloudy'}`;
  layer.innerHTML = renderVisual(visual, { showDescription: params.get('art') !== '0' });
  requestAnimationFrame(() => {
    previous.classList.remove('is-active');
    layer.classList.add('is-active');
  });
  activeLayer = nextLayer;
}

function renderBeat(playBeatSound = false) {
  const view = runner.view;
  if (view.recap) return renderRecap(view);
  const visual = view.visual || { type: 'placeholder', id: '', stage: '', description: '', tone: 'cloudy' };
  const tone = visual.tone || 'cloudy';
  document.documentElement.className = `tone-${tone} game-mode`;
  const scene = STORY.scenes[view.sceneId];
  const place = document.querySelector('#place');
  place.textContent = scene.placeJa || '';
  if (scene.placeEn) {
    const english = document.createElement('small');
    english.textContent = scene.placeEn;
    place.append(english);
  }
  updateVisual(visual);
  setAmbience(visual.weather || 'cloudy');
  if (playBeatSound && view.sfx) playSfx(view.sfx);
  renderStoryOverlay(view, playBeatSound);
}

const hintButton = () => '<button class="hint-button" id="hint" aria-pressed="false">ヒント</button>';

function renderStoryOverlay(view, animate) {
  const say = view.say || {};
  const cast = STORY.cast[say.who] || {};
  const isMessage = Boolean(say.message);
  const portraitSrc = PORTRAIT_ART[say.who];
  const photoSrc = say.photo ? SCENE_ART[say.photo] : '';
  const card = isMessage ? `
    <article class="message-card ${animate ? 'card-enter' : ''}">
      <div class="message-sender">${portraitSrc ? `<img class="portrait" src="${portraitSrc}" alt="">` : ''}<b>${cast.name || ''}</b></div>
      <p>${say.en || ''}</p><p class="hint-copy" hidden>${say.ja || ''}</p>
      ${photoSrc ? `<img class="message-photo" src="${photoSrc}" alt="">` : ''}${hintButton()}
    </article>` : `
    <article class="dialogue-card ${animate ? 'card-enter' : ''}">
      ${cast.name ? `<b class="speaker-name">${cast.name}</b>` : ''}
      <p class="english-line">${say.en || ''}</p>
      <p class="hint-copy" hidden>${say.ja || view.hint.prompt || ''}</p>${hintButton()}
    </article>`;
  const overlay = document.querySelector('#story-overlay');
  overlay.className = `story-overlay ${isMessage ? 'message-overlay' : ''} ${firstBeat ? 'first-beat' : ''}`;
  overlay.innerHTML = `${card}<section class="interact" id="interact"></section>`;
  document.querySelector('#hint').onclick = toggleHint;
  renderInteraction(document.querySelector('#interact'), view);
  firstBeat = false;
}

function toggleHint() {
  hint = !hint;
  document.querySelector('#hint').setAttribute('aria-pressed', String(hint));
  document.querySelectorAll('.hint-copy, .choice-gloss').forEach((element) => { element.hidden = !hint; });
}

function renderRecap(view) {
  cleanupInteraction();
  document.documentElement.className = 'tone-warm recap-mode';
  setAmbience('indoor-rain');
  root.innerHTML = `
    <section class="recap-screen"><img src="art/scenes/home-08.webp" alt=""><div class="recap-dim"></div>
      <article class="recap-card card-enter"><h1>Rainy Walk Home</h1>
        <ul>${view.recap.map((item) => `<li>${item.en}</li>`).join('')}</ul>
        <button class="primary" id="replay">もういちど</button>
      </article></section>`;
  document.querySelector('#replay').onclick = showIntro;
}

function choiceGloss(choice) {
  return choice.labelJa || choice.objectJa || VOCAB_BY_ID[choice.verb]?.ja || '';
}

function renderInteraction(area, view) {
  if (!view.interaction) {
    area.innerHTML = '<button class="continue-button" id="next" aria-label="つづける">▶</button>';
    document.querySelector('#next').onclick = advance;
    return;
  }
  if (view.interaction.type === 'choice') {
    area.classList.add('choices');
    area.innerHTML = view.choices.map((choice, index) => `
      <button class="choice" data-choice="${index}" ${choice.disabled ? 'disabled' : ''}>
        <span class="choice-main"><b>${choice.label || choice.verb.toUpperCase()}</b> <i>${choice.icon || choice.object || ''}</i></span>
        <small class="choice-gloss" hidden>${choiceGloss(choice)}</small>
      </button>`).join('');
    area.querySelectorAll('[data-choice]').forEach((button) => { button.onclick = () => choose(Number(button.dataset.choice)); });
    return;
  }
  if (view.interaction.type === 'recap') {
    area.innerHTML = '<button class="primary" id="end">おわり ▶</button>';
    document.querySelector('#end').onclick = advance;
    return;
  }
  if (view.interaction.type === 'speak') speakPanel(area, view);
  else gesturePanel(area, view);
}

function revealFallback() {
  const fallback = document.querySelector('#done');
  if (fallback) fallback.hidden = false;
}

// Simple microphone glyph; inherits the button's text colour.
const MIC_ICON = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"
  fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>`;

function speakPanel(area, view) {
  const recognitionAvailable = Boolean(globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition);
  const showFallback = !micOn || !recognitionAvailable;
  area.classList.add('speak-panel');
  area.innerHTML = `
    <p class="say-label">Say:</p><p class="speak-target">${view.interaction.target}</p>
    <button class="mic-button" id="talk" aria-label="マイク">${MIC_ICON}</button>
    <button class="fallback" id="done" ${showFallback ? '' : 'hidden'}>言ったよ ▶</button>
    <p class="status" id="status"></p>`;
  const setStatus = (text) => { const status = document.querySelector('#status'); if (status) status.textContent = text; };
  activeTalk = new TapToTalk({
    onCorrect: (heard) => { setStatus(heard); complete(); }, onHeard: setStatus, onStatus: setStatus,
    onUnavailable: () => { setStatus('言ったよ ▶ をおしてね'); revealFallback(); },
  });
  document.querySelector('#talk').onclick = () => {
    revealFallback();
    if (micOn) activeTalk.start(view.interaction.accepted);
    else setStatus('言ったよ ▶ をおしてね');
  };
  document.querySelector('#done').onclick = complete;
  if (showFallback) setStatus('言ったよ ▶ をおしてね');
  else fallbackTimer = setTimeout(revealFallback, 5000);
}

function gesturePanel(area, view) {
  const word = view.interaction.gesture.toUpperCase();
  area.classList.add('gesture-panel');
  area.innerHTML = `
    <p class="gesture-instruction">${view.interaction.prompt.en}</p>
    <button class="${camOn ? 'fallback' : 'primary gesture-action'}" id="tap">${camOn ? 'タップでつづける' : `${word}! (タップ)`}</button>
    <p class="status" id="status"></p>`;
  document.querySelector('#tap').onclick = complete;
  if (!camOn) return;
  const cameraFloat = document.querySelector('#camera-float');
  cameraFloat.hidden = false;
  const meter = document.querySelector('#motion-level');
  gestureDetector = createGestureDetector({
    gesture: view.interaction.gesture, onDetect: complete,
    preview: document.querySelector('#cam-preview'),
    onLevel: (level) => { meter.style.width = `${Math.min(100, level * 3)}%`; },
  });
  gestureDetector.start().catch(() => {
    const tap = document.querySelector('#tap');
    if (!tap) return;
    cameraFloat.hidden = true;
    tap.className = 'primary gesture-action';
    tap.textContent = `${word}! (タップ)`;
  });
}

document.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  if (!runner) {
    if (!settingsOpen && [' ', 'Enter'].includes(event.key)) { event.preventDefault(); begin(); }
    return;
  }
  if (settingsOpen) return;
  const view = runner.view;
  if (/^[1-4]$/.test(event.key) && view.interaction?.type === 'choice') return choose(Number(event.key) - 1);
  if (![' ', 'Enter'].includes(event.key)) return;
  event.preventDefault();
  if (!view.interaction) advance();
  else if (['speak', 'gesture'].includes(view.interaction.type)) complete();
  else if (view.interaction.type === 'recap') advance();
});

showIntro();
