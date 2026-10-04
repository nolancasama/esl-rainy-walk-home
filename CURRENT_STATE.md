# Current State

## Status (2026-10-04)

Rainy Walk Home is playable start to finish as a full-bleed interactive
storybook. It has an illustrated intro, overlaid dialogue and interaction cards,
per-line HTML phone notifications, stable scene-art ids, hint reset, restrained
art/card transitions, procedural ambience and sound effects, STT, and
camera-motion gestures. TTS has been removed. Mic and camera default ON and are
requested once when はじめる is pressed; a denial falls back to tap. Ambience
follows each visual's `weather`, which is separate from its emotional `tone`.
The opening place label reads 松原小学校 · Matsubara Elementary School.
An optional seven-item vocabulary warm-up now appears after permissions and
before the story, followed by one-time contextual tips and an in-story controls
help overlay. Onboarding state remains separate from story state.

The story still contains 12 scenes (school → umbrella → papers → Mrs. Sato →
listen → come/softly → tag → wrong house → reunion → bag → home + recap). The
warm, repair and quiet endings and all existing choices/interactions remain
unchanged. `window.storyRunner` exposes read-only `state` and `view` for the
browser harness.

All 79 placeholder ids, plus the message-photo asset `photo-momo`
(`STORY.photos`), resolve through `SCENE_ART`. One alias: `sato-03 → sato-05`
(the old `sato-03` showed a Momo-like stray cat). Missing art still falls back to
the stage emoji and visual brief.

## How to run

- `npm run serve` → `http://localhost:8020`
- `npm test` → unit tests, including story paths and stable art-id integrity
- `npm run test:browser` → Playwright playthroughs at 1366×768 and 1024×600;
  writes acceptance screenshots to `shots/`
- Debug parameters: `?scene=<id>`, `?set=haruBond:2,hasSnack:true`, `?art=0`,
  `?warmup=0` (skip the vocabulary warm-up), `?cam=1` (force camera on),
  `?cam=0` (start with camera off). Setting `?scene=<id>` also skips the warm-up.

## Art fixes

`art/ART_FIXES.md` is the regeneration queue (re-audited image by image on
2026-10-04). Twelve items remain: the new empty plate `loc-cat-search`, then
`listen-01`, `come-01` to `come-04`, `wrongHouse-01`, `wrongHouse-02`,
`reunion-01`, `sato-04`, `bag-01` and `school-01`, plus a few optional redos.
Recurring places use master references (`cat-search-area`, `blue-houses`)
defined in `art/build-prompts.mjs`. The rain stops at the reunion and returns
at `bag-01` (both narrated). The corrected prompts are in `art/ART_PROMPTS.md`;
the continuity rules are in `DESIGN_DECISIONS.md`. The home-outfit reference sheet is
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
- Twelve images in `art/ART_FIXES.md` still need regeneration. Until then, the
  wrong house still shows cat stickers, `bag-01` still shows Momo after she has
  gone home, and `sato-04` shows Haru holding Mrs. Sato's umbrella.
- The up-front permission request is verified only in headless Chromium (denied
  → tap fallback), not on a managed Chromebook with real devices.
- Optional MP3 sound slots remain unfilled.
