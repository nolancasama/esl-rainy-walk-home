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

All 79 placeholder ids, plus the message-photo asset `photo-momo`
(`STORY.photos`), resolve through `SCENE_ART`. The only remaining alias is
`bag-04 → bag-02`. Missing art still falls back to the stage emoji and visual brief.

## How to run

- `npm run serve` → `http://localhost:8020`
- `npm test` → unit tests, including story paths and stable art-id integrity
- `npm run test:browser` → Playwright playthroughs at 1366×768 and 1024×600;
  writes acceptance screenshots to `shots/`
- Debug parameters: `?scene=<id>`, `?set=haruBond:2,hasSnack:true`, `?art=0`,
  `?cam=1`

## Art fixes

`art/ART_FIXES.md` is the regeneration queue from the 2026-10-03 continuity
audit. The second art batch (home scenes in the dry home outfit, the dedicated
`photo-momo`, the umbrella fix, and more) is wired in. Four images remain:
`wrongHouse-01`, `wrongHouse-02`, `bag-01` and `bag-04`, plus a few optional
redos. The rain stops at the reunion and returns at `bag-01` (both narrated).
The corrected prompts are in `art/ART_PROMPTS.md`; the continuity rules are in
`DESIGN_DECISIONS.md`. The home-outfit reference sheet is
`art/reference/player-home-outfit.webp`.

Art briefs live in `src/story.js` descriptions. After editing them, run
`node art/build-prompts.mjs`. Do not change visual ids when regenerating:
replace `art/scenes/<id>.webp`, drop any alias the new file makes unnecessary,
and run `node art/build-manifest.mjs`.

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
- Four images in `art/ART_FIXES.md` still need regeneration. Until then, the
  wrong house still shows cat stickers, and `bag-01` still shows Momo after
  she has gone home.
- Optional MP3 sound slots remain unfilled.
