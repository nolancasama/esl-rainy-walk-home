# Current State

## Status (2026-10-03)

Rainy Walk Home is playable start to finish as a full-bleed interactive
storybook. It has an illustrated intro, overlaid dialogue and interaction cards,
per-line HTML phone notifications, stable scene-art ids, hint reset, restrained
art/card transitions, procedural ambience and sound effects, STT, and optional
camera-motion gestures. TTS has been removed.

The story still contains 12 scenes (school → umbrella → papers → Mrs. Sato →
listen → come/softly → tag → wrong house → reunion → bag → home + recap). The
warm, repair and quiet endings and all existing choices/interactions remain
unchanged. `window.storyRunner` exposes read-only `state` and `view` for the
browser harness.

All 79 placeholder ids resolve through `SCENE_ART` to existing scene files.
Aliases in `art/aliases.json` intentionally reuse art for `home-04`, `bag-04`
and `bag-05`. Missing art still falls back to the stage emoji and visual brief.

## How to run

- `npm run serve` → `http://localhost:8020`
- `npm test` → unit tests, including story paths and stable art-id integrity
- `npm run test:browser` → Playwright playthroughs at 1366×768 and 1024×600;
  writes acceptance screenshots to `shots/`
- Debug parameters: `?scene=<id>`, `?set=haruBond:2,hasSnack:true`, `?art=0`,
  `?cam=1`

## Art fixes

`art/ART_FIXES.md` is the regeneration queue:

- `bag-01` — Momo appears after she has gone home (highest priority)
- `home-04` — player is shown outdoors
- `bag-04` — Haru is already kneeling instead of pausing
- `bag-05` — an extra girl replaces the player
- `papers-08` — stray child in a yellow raincoat
- `umbrella-01` and `home-07` — compositions should not depend on readable
  phone screens

Do not change visual ids when regenerating. Replace the matching
`art/scenes/<id>.webp` and rebuild the manifest if aliases or available files
change.

## Optional sound files

The file slots `meow`, `hiss`, `purr`, `bark`, `door` and `orange` are currently
empty; their calls are silent and make no network request. To add one:

1. Save an MP3 as `audio/sfx/<name>.mp3`.
2. Add that exact name to the `SOUND_FILES` array in `src/sound-files.js`.
3. Confirm the browser playthrough has no failed request or console error.

All other listed ambience and effects are generated procedurally. The complete
sound-name reference is in `audio/SOUNDS.md`.

## Known issues / not yet verified in classrooms

- STT and motion thresholds have not been evaluated with real children, real
  webcams and managed Chromebook microphone policies.
- The seven images in `art/ART_FIXES.md` still need regeneration.
- Optional MP3 sound slots remain unfilled.
