# Current State

## Status (2026-10-03)
MVP playable start to finish. Story: 12 scenes in `src/story.js` (school →
umbrella → papers → Mrs. Sato → listen → come/softly → tag → wrong house →
reunion → bag → home + recap). Engine, UI, TTS, STT, camera-motion gestures and
tests per `SPEC.md`. Finished art: all 79 scenes and 8 portraits in `art/`; any scene without art falls back to its emoji placeholder. Weak matches worth regenerating: home-04, bag-04, bag-05, bag-01 (Momo shown), papers-08 (stray kid). Add art: save `art/scenes/<id>.webp` and run `node art/build-manifest.mjs`.
Three ending tones (warm / repair / quiet, `ending()` in `src/story.js`) vary the
bag scene and walk home; home ends with a "How was your day?" phrase choice.
Debug an ending: `?scene=bag&set=haruBond:3,helpCount:3` (warm),
`?scene=bag&set=skipCount:1,repaired:true` (repair), `?scene=bag` (quiet).

## How to run
- `npm run serve` → http://localhost:8020 (any static server works; ES modules
  need a correct JS MIME type).
- `npm test` — 13 unit tests (engine semantics, story integrity, exhaustive DFS
  over every choice path reaching all three endings, ending selection, Haru/Sato
  variants, speech matching, gesture math).
- `npm run test:browser` — Playwright (from `C:/Users/nolan/ui-verify`) plays
  two full paths at 1366×768 via tap fallbacks, checks console errors and page
  scroll, writes `shots/`. Fails (exit 1) if Playwright cannot load.
- Debug params: `?scene=<id>`, `?set=haruBond:2,hasSnack:true`, `?art=0`, `?cam=1`.
- `window.storyRunner` exposes read-only `state` / `view` for harnesses.

## Verified
- Unit + browser playthrough pass; no scroll at 1366×768 and 1024×600.
- Camera path with Chromium fake webcam: preview, motion meter, no errors,
  no false trigger, tap fallback present.

## Known issues / not yet verified
- STT and gesture thresholds (`runDetected` 12 / `catchDetected` 22) are
  untested with real children, real webcams and real Chromebook mics.
- TTS voice quality depends on the ChromeOS image.
- Browser playthrough covers the warm (first-choice) and quiet (last-choice)
  endings; repair is covered by unit tests and a manual screenshot only.
- All work since the first commit is uncommitted.

## Next Steps
- Read through the three endings in the browser (debug links above) for tone.
- Classroom trial: speech moments ("Come!", "Hello!", "Thanks!") and RUN/CATCH with camera.
- Replace placeholders with art via the `visuals.js` registry (`image`/`video`).
