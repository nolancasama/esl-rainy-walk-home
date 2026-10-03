# Rainy Walk Home — Spec

Narrative ESL game for Japanese grade 5–6. Plain HTML/CSS/ES modules, no build
step and no runtime dependencies. Serve with any static server (`npm run serve`).

Story content lives in `src/story.js` and is the source of truth. The DOM-free
engine remains reusable by another story exporting the same shape.

## Files

| File | Role |
|---|---|
| `index.html`, `styles.css` | Full-viewport shell, intro and storybook layout. |
| `src/story.js` | Story data and stable visual ids. |
| `src/engine.js` | DOM-free story runner: cursor, conditions, effects, choices and jumps. |
| `src/state.js` | `createState(initial)` and `applyEffects(state, effects)`. |
| `src/vocab.js` | Target verbs (the 50 from esl-verbs) with Japanese hint glosses. |
| `src/visuals.js` | Visual renderer and stable-id art resolution. |
| `src/art-manifest.js` | Generated `SCENE_ART` and `PORTRAITS` maps. |
| `src/audio.js` | No-throw procedural ambience and sound-effect playback. |
| `src/sound-files.js` | Allow-list for optional MP3 sound slots. |
| `src/speech.js` | Forgiving tap-to-talk STT. |
| `src/gestures.js` | Gesture interface and camera motion detector. |
| `src/app.js` | DOM UI wiring the modules above. |

## Story data contract

```text
Story   = { id, title, titleJa, start: sceneId, initialState: {..},
            cast: {who: {name, icon}}, scenes: {sceneId: Scene},
            recap: [{when?, en, ja}] }
Scene   = { placeJa?, beats: [Beat] }
Beat    = { when?: (state)=>bool,          // false → skipped entirely
            visual?: Visual,               // persists until replaced
            say?: { who, en, ja?, message?, photo? },
            sfx?: string,                  // played once when first shown
            effects?: Effects,
            interaction?: Interaction,     // absent → explicit continue
            goto?: sceneId | (state)=>sceneId }
Visual  = { type: 'placeholder', id, description, stage, tone }
          // also {type:'image', src, alt} or {type:'video', src}
Effects = { set?: {key: value}, add?: {key: number} }
```

`say.message: true` renders that individual line as a phone notification. It
does not change other lines from the same speaker. `say.photo` is an optional
scene-art id whose image is shown as the notification thumbnail. Portraits are
used only in message cards, never in ordinary dialogue cards.

Every placeholder carries a stable id. `art/build-manifest.mjs` produces
`SCENE_ART[id] = 'art/scenes/<file>.webp'`; runtime lookup is by `visual.id`, not
description. `art/aliases.json` lets ids deliberately reuse another image while
remaining stable (`home-04 → home-02`, `bag-04 → bag-02`, and
`bag-05 → bag-03`). Prompt generation also uses `visual.id`.

Interactions:

- `{type:'choice', choices:[Choice], retry?, all?}` where `Choice` has a `verb`
  or phrase `label`, optional icon/object/gloss/effects, nested `beats`, `goto`
  and `success`. Nested beats obey the same contract.
- `retry: true` presents the choice again after a non-success option, disabling
  that option. `all: true` continues after every option has been selected.
- `{type:'speak', target, accepted:[..], prompt:{en, ja}}` is an STT moment.
- `{type:'gesture', gesture:'run'|'catch', prompt:{en, ja}}` is an embodied
  camera-or-tap moment.
- `{type:'recap'}` lists matching recap entries and offers replay.

A `goto` anywhere ends the current scene and jumps. Otherwise nested choice
beats reconverge into the enclosing scene.

## Interaction behavior

All interaction modes must remain playable without optional browser APIs.

**Speak.** The panel labels the target with “Say:” and provides a large mic
button. Recognition accepts an interim result as soon as a normalized accepted
phrase matches, including a single accepted word found as a transcript token.
There is no pronunciation grading. A `言ったよ ▶` fallback appears after the
first attempt or about five seconds, and immediately when STT is unsupported,
denied or disabled in settings.

**Gesture.** Camera is opt-in and `?cam=1` forces it on. A small mirrored preview
and slim motion meter sit in the top-right without covering dialogue. Frame
differencing detects sustained motion for RUN and an upper-frame burst for
CATCH. Camera OFF/failed shows one large `RUN! (タップ)` or `CATCH! (タップ)`
button. Camera ON initially shows a smaller `タップでつづける` fallback, which
becomes the main control if the camera fails.

**No TTS.** The game never synthesizes or narrates dialogue or prompts. Students
read the short English lines themselves. STT remains available for speaking
interactions.

**Hint.** `ヒント` reveals the current line's Japanese and choice glosses. The
hint resets to hidden whenever the beat advances, a choice completes, or a run
starts/replays. Toggling it only rerenders the current beat; it does not restart
art transitions or replay sounds.

## Audio

The title and scenes use Web Audio API ambience generated in `src/audio.js`:
soft wind and rain for the title, then `cloudy`, `rain`, `storm` or `warm`
ambience from the current visual tone. Tone changes crossfade in about one
second. Procedural one-shots are `bell`, `raindrops`, `gust`, `flutter`, `splat`,
`splash`, `phone`, `doorbell` and `mug`.

Optional file-backed one-shots are `meow`, `hiss`, `purr`, `bark`, `door` and
`orange`. They are requested from `audio/sfx/<name>.mp3` only if listed in
`src/sound-files.js`, so empty slots never cause 404s. See `audio/SOUNDS.md`.
Sound defaults ON and is persisted in `localStorage` inside error-safe guards.
The `AudioContext` is created/resumed from the `はじめる` gesture. Sound OFF
means no context output. Any audio failure is a silent no-op.

## UI

The intro reuses `art/scenes/school-01.webp` full-bleed, with a bottom scrim,
English and Japanese titles, one `はじめる` button, and a compact settings panel
for microphone, camera and sound. Enter/Space starts unless settings are open.
Debug `?scene` still shows the intro rather than skipping it.

Scene art fills the viewport with `object-fit: cover`. Two image layers
crossfade only when the art id changes. Missing art renders the tone colour,
stage emoji, and—unless `?art=0`—the visual brief. The place pill is top-left.
Dialogue/message and interaction cards overlay the lower portion of the art and
remain inside 1366×768 and 1024×600 without page scrolling.

Ordinary dialogue is a warm paper card with no portrait. Phone messages enter
from the top-right and may include a sender portrait and photo thumbnail.
Choices are large paper cards; Japanese glosses appear only with hint. Plain
beats use a clear `▶` control. Space/Enter continues, and keys 1–4 choose, except
while settings is open. The recap dims `home-08.webp` behind a centred paper
card and `もういちど` action. Motion is restrained and honors
`prefers-reduced-motion`.

Debug parameters: `?scene=<id>`, `?set=haruBond:2,hasSnack:true`, `?art=0`, and
`?cam=1`.
