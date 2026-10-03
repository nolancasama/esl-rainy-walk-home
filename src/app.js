import { createRunner } from './engine.js';
import { createGestureDetector } from './gestures.js';
import { TapToTalk } from './speech.js';
import { STORY } from './story.js';
import { speak } from './tts.js';
import { PORTRAIT_ART } from './art-manifest.js';
import { renderVisual, resolveVisual } from './visuals.js';
import { VOCAB_BY_ID } from './vocab.js';

const root = document.querySelector('#app');
const params = new URLSearchParams(location.search);
let micOn = true;
let camOn = params.get('cam') === '1';
let runner;
let hint = false;
let saidBeat;
let gestureDetector;

function parseSet() {
  const pairs = (params.get('set') || '').split(',').filter(Boolean);

  return Object.fromEntries(pairs.map((pair) => {
    const [key, raw] = pair.split(':');
    if (raw === 'true' || raw === 'false') return [key, raw === 'true'];
    return [key, Number.isNaN(Number(raw)) ? raw : Number(raw)];
  }));
}

function startScreen() {
  root.innerHTML = `
    <section class="screen start">
      <h1>${STORY.title}</h1>
      <p>${STORY.titleJa}</p>
      <div class="toggles">
        <button id="mic">マイク ${micOn ? 'ON' : 'OFF'}</button>
        <button id="cam">カメラ ${camOn ? 'ON' : 'OFF'}</button>
      </div>
      <button class="primary" id="start">スタート</button>
    </section>
  `;
  document.querySelector('#mic').onclick = () => { micOn = !micOn; startScreen(); };
  document.querySelector('#cam').onclick = () => { camOn = !camOn; startScreen(); };
  document.querySelector('#start').onclick = begin;
}

function begin() {
  runner = createRunner(STORY, { initialState: parseSet(), scene: params.get('scene') || undefined });
  window.storyRunner = runner;
  render();
}

function advance() {
  gestureDetector?.stop();
  runner.next();
  render();
}

function choose(index) {
  gestureDetector?.stop();
  runner.choose(index);
  render();
}

function complete() {
  gestureDetector?.stop();
  runner.complete();
  render();
}

function render() {
  const view = runner.view;

  if (view.recap) {
    renderRecap(view);
    return;
  }

  const cast = STORY.cast[view.say?.who] || {};
  const visual = view.visual || { type: 'placeholder', stage: '', description: '', tone: 'cloudy' };
  const hasArt = resolveVisual(visual).type === 'image';
  const portraitSrc = PORTRAIT_ART[view.say?.who];
  const portrait = portraitSrc ? `<img class="portrait" src="${portraitSrc}" alt="">` : (cast.icon || '');
  root.innerHTML = `
    <section class="screen">
      <p class="place">${STORY.scenes[view.sceneId].placeJa || ''}</p>
      <section class="visual tone-${visual.tone || 'cloudy'} ${hasArt ? 'has-art' : ''}">
        ${renderVisual(visual, { showDescription: params.get('art') !== '0' })}
      </section>
      <section class="speaker">
        ${portrait}
        <div class="line ${cast.message ? 'message' : ''}">
          <b>${cast.name || ''}</b> ${view.say?.en || ''}
          ${hint && view.say?.ja ? `<small><br>${view.say.ja}</small>` : ''}
        </div>
        <div class="tools">
          <button id="sound" aria-label="speak">🔊</button>
          <button id="hint">ヒント</button>
        </div>
      </section>
      <section class="interact" id="interact"></section>
    </section>
  `;
  document.querySelector('#sound').onclick = () => speak(view.say?.en || view.interaction?.prompt?.en);
  document.querySelector('#hint').onclick = () => { hint = !hint; render(); };

  if (!saidBeat && view.say?.en) {
    saidBeat = `${view.say.en}${view.sceneId}`;
    speak(view.say.en);
  }

  renderInteraction(document.querySelector('#interact'), view);
}

function renderRecap(view) {
  root.innerHTML = `
    <section class="screen">
      <div class="visual tone-warm"><div class="stage">🌦️</div></div>
      <article class="recap">
        <h1>Rainy Walk Home</h1>
        <ul>${view.recap.map((item) => `<li>${item.en}${hint ? ` — ${item.ja}` : ''}</li>`).join('')}</ul>
        <button class="primary" id="replay">もういちど</button>
      </article>
    </section>
  `;
  document.querySelector('#replay').onclick = startScreen;
}

// Phrase choices (`label`) carry their own Japanese; verb choices use vocab.js.
function choiceGloss(choice) {
  return choice.labelJa || choice.objectJa || VOCAB_BY_ID[choice.verb]?.ja || '';
}

function renderInteraction(area, view) {
  if (!view.interaction) {
    area.innerHTML = '<button class="primary" id="next">つづける ▶</button>';
    document.querySelector('#next').onclick = advance;
    return;
  }

  if (view.interaction.type === 'choice') {
    area.innerHTML = view.choices.map((choice, index) => `
      <button class="choice" data-choice="${index}" ${choice.disabled ? 'disabled' : ''}>
        ${choice.label || choice.verb.toUpperCase()} ${choice.icon || choice.object || ''}
        ${hint ? `<small><br>${choiceGloss(choice)}</small>` : ''}
      </button>
    `).join('');
    area.querySelectorAll('[data-choice]').forEach((button) => {
      button.onclick = () => choose(Number(button.dataset.choice));
    });
    return;
  }

  if (view.interaction.type === 'recap') {
    area.innerHTML = '<button class="primary" id="end">おわり ▶</button>';
    document.querySelector('#end').onclick = advance;
    return;
  }

  if (view.interaction.type === 'speak') {
    speakPanel(area, view);
  } else {
    gesturePanel(area, view);
  }
}

function speakPanel(area, view) {
  area.innerHTML = `
    <p class="prompt">${view.interaction.prompt.en}</p>
    <button class="primary" id="talk">🎤 Talk</button>
    <button class="fallback" id="done">言ったよ ▶</button>
    <p class="status" id="status"></p>
  `;
  const setStatus = (text) => { document.querySelector('#status').textContent = text; };
  const talk = new TapToTalk({
    onCorrect: (heard) => { setStatus(heard); complete(); },
    onHeard: setStatus,
    onStatus: setStatus,
    onUnavailable: () => setStatus('言ったよ ▶ をおしてね'),
  });
  document.querySelector('#talk').onclick = () => {
    if (micOn) talk.start(view.interaction.accepted);
    else setStatus('言ったよ ▶ をおしてね');
  };
  document.querySelector('#done').onclick = complete;

  if (!micOn) setStatus('言ったよ ▶ をおしてね');
  speak(view.interaction.prompt.en);
}

function gesturePanel(area, view) {
  const word = view.interaction.gesture.toUpperCase();
  const tapLabel = camOn ? 'タップでつづける' : `${word}! (タップ)`;
  // One tap button, always present (see DESIGN_DECISIONS: progression is always explicit).
  // Camera off: it is the action itself. Camera on: it is a quiet fallback next to the preview.
  area.innerHTML = `
    <p class="prompt">${view.interaction.prompt.en}</p>
    <button class="${camOn ? 'fallback' : 'primary'}" id="tap">${tapLabel}</button>
    <div id="cam-preview"></div>
    <p class="status" id="status"></p>
  `;
  document.querySelector('#tap').onclick = complete;

  if (camOn) {
    const setStatus = (text) => { document.querySelector('#status').textContent = text; };
    gestureDetector = createGestureDetector({
      gesture: view.interaction.gesture,
      onDetect: complete,
      preview: document.querySelector('#cam-preview'),
      onLevel: (level) => setStatus(`motion ${Math.round(level)}`),
    });
    gestureDetector.start().catch(() => {
      // Camera denied or missing: fall back to the camera-off button.
      const tap = document.querySelector('#tap');
      tap.className = 'primary';
      tap.textContent = `${word}! (タップ)`;
      setStatus('');
    });
  }

  speak(view.interaction.prompt.en);
}

document.addEventListener('keydown', (event) => {
  if (!runner) return;
  if ([' ', 'Enter'].includes(event.key)) { event.preventDefault(); advance(); }
  if (/^[1-4]$/.test(event.key)) choose(Number(event.key) - 1);
});

startScreen();
