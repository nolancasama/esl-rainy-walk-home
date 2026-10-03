# Rainy Walk Home — Spec

Narrative ESL game for Japanese grade 5–6. Plain HTML/CSS/ES modules, no build
step, no runtime dependencies. Serve with any static server (`npm run serve`).

Story content lives in `src/story.js` (authored; treat as the source of truth
for content). Everything else is a reusable engine: another story exporting
the same shape must run without engine changes.

## Files

| File | Role |
|---|---|
| `index.html`, `styles.css` | Shell + layout. |
| `src/story.js` | Story data (this contract). |
| `src/engine.js` | **DOM-free** story runner: state, beat cursor, `when`, effects, choices, goto. Testable in Node. |
| `src/state.js` | `createState(initial)`, `applyEffects(state, effects)`. |
| `src/vocab.js` | Target verbs (the 50 from esl-verbs) with Japanese gloss for ヒント. |
| `src/visuals.js` | Visual renderer registry keyed by `visual.type`. |
| `src/tts.js` | English TTS (adapted from esl-verbs `tts.js`). |
| `src/speech.js` | Forgiving tap-to-talk STT (adapted from esl-verbs `speech.js`). |
| `src/gestures.js` | Gesture interface + camera motion detector. |
| `src/app.js` | DOM UI wiring the above. |

## Story data contract

```
Story   = { id, title, titleJa, start: sceneId, initialState: {..}, cast: {who: {name, icon, message?}},
            scenes: {sceneId: Scene}, recap: [{when?, en, ja}] }
Scene   = { placeJa?, beats: [Beat] }
Beat    = { when?: (state)=>bool,          // false → beat skipped entirely
            visual?: Visual,               // replaces the current visual (persists until replaced)
            say?: { who, en, ja? },        // one short line; auto-spoken in English
            effects?: Effects,             // applied when the beat is shown
            interaction?: Interaction,     // absent → "next" (tap to continue)
            goto?: sceneId | (state)=>sceneId }   // after the beat (and its interaction) completes
Visual  = { type: 'placeholder', description, stage, tone }   // also: {type:'image', src, alt}, {type:'video', src}
Effects = { set?: {key: value}, add?: {key: number} }
```

Interactions:

- `{type:'choice', choices:[Choice], retry?, all?}`
  `Choice = {verb, icon?, object?, objectJa?, effects?, beats:[Beat], goto?, success?}`.
  Choosing applies `effects`, plays the choice's `beats` inline (they obey
  `when` and may have their own interactions, e.g. a gesture), then:
  `choice.goto` if present (string or function), else continue with the next
  beat of the enclosing scene (reconverge).
  - `retry: true` — after a choice without `success: true`, the same choice is
    re-presented with that option removed/disabled. A `success` choice continues.
  - `all: true` — the player picks every option, in any order; continue after
    the last one.
  - Button label: `verb` in caps + `icon`/`object`. ヒント shows the Japanese gloss
    (`vocab.js`, or `objectJa`).
- `{type:'speak', target, accepted:[..], prompt:{en, ja}}` — STT moment.
- `{type:'gesture', gesture:'run'|'catch', prompt:{en, ja}}` — embodied moment.
- `{type:'recap'}` — ending: list `story.recap` items whose `when` is true; replay button.

Nested `beats` inside choices may themselves contain interactions and `goto`.
A `goto` anywhere ends the current scene and jumps.

## Interaction behavior (must never block)

**Speak.** Big mic button, tap-to-talk. Accept on interim results the moment any
alternative matches; do not wait for the final result. Match = normalized
transcript (lowercase, punctuation stripped) equals an `accepted` phrase, or any
word token of the transcript equals a single-word accepted entry. No
pronunciation grading. Show what was heard; on no-match say "Try again" (もう
いちど). A mic-free button `言ったよ ▶` is always visible after the first attempt
or ~5 s, and immediately when SpeechRecognition is unsupported, permission is
denied, or the player chose mic OFF at start. Success shows a short positive
reaction (e.g. "Come!" echoed) and continues.

**Gesture.** Camera is opt-in (start-screen toggle, default OFF; `?cam=1` forces
on). Camera ON: small mirrored preview + a simple motion meter, detection via
frame differencing on a downscaled (~160×120) grayscale frame:
- `run`: sustained motion — energy above threshold for ≥ ~1.2 s cumulative within 3 s.
- `catch`: a sharp burst of motion concentrated in the upper half of the frame.
Detector math is pure functions (fed arrays of frame energies) so it is unit
tested. Camera OFF / denied / unavailable: one big button `RUN! (タップ)` /
`CATCH! (タップ)`. Camera ON still shows `タップでつづける` after ~4 s. Both
paths count as success. The interface (`createGestureDetector({gesture, onDetect,
onLevel})` returning `{start, stop}`) allows a pose-based detector later.

**TTS.** Each `say.en` auto-speaks once when shown (en-US, rate ~0.9). 🔊 replays.
Missing speechSynthesis never blocks anything. The `prompt.en` of speak/gesture
interactions is spoken too.

**Hint.** One ヒント button reveals `say.ja` and the Japanese glosses on the
choice buttons for the current beat; it resets each beat. Japanese is never
shown automatically.

## UI

One screen: scene visual (large) → speaker line (icon + name + English, 🔊,
ヒント) → interaction area (large buttons). Phone-style message bubble for
`cast[who].message`. `placeJa` shown small as a location label. Start screen:
title, スタート (unlocks audio), マイク ON/OFF, カメラ ON/OFF. Chromebook
(1366×768, 1024×600) and touch friendly; no page scroll at 1366×768; buttons
≥ 56 px tall. Keyboard: Space/Enter = next, 1–4 = choices. Simple CSS
transition between visuals (fade); tone sets the scene background colour
(cloudy / rain / storm / warm). No artwork beyond this.

Placeholder render: the `stage` emoji large, and the description visibly as
`[VISUAL: ...]` text in a dashed box (togglable via `?art=0` to hide the
description for classroom use, default shown).

Debug: `?scene=<id>` starts at a scene with initial state; `?set=haruBond:2,hasSnack:true`
overrides state.
