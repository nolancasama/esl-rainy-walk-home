# Rainy Walk Home — あめの かえりみち

A short interactive English picture book for Japanese grade 5–6 students on
school Chromebooks. Walking home in the rain, the player helps neighbors and
friends, finds a lost cat and returns her home. Choices practice target verbs;
short speaking moments use optional speech recognition, and RUN/CATCH can use
optional camera motion. Every path gets home, while earlier choices change the
ending tone.

**Play:** https://nolancasama.github.io/esl-rainy-walk-home/

Plain HTML/CSS/ES modules. No build step or runtime dependencies. The full-bleed
storybook includes local scene art, HTML phone notifications, procedural Web
Audio ambience/effects and tap fallbacks for every microphone/camera activity.

## Run

```text
npm run serve        # http://localhost:8020 (any static server works)
npm test             # unit tests, including every choice path and art ids
npm run test:browser # Playwright acceptance playthrough and screenshots
```

Microphone and camera are optional. Sound can be disabled from the intro
settings. The game remains playable offline; the Google font falls back to the
system font when unavailable.

## Project files

- `SPEC.md` — story data, UI and interaction contracts
- `CURRENT_STATE.md` — implementation status, art fixes and sound-file slots
- `DESIGN_DECISIONS.md` — meaningful product and architecture decisions
- `src/story.js` — authored story data with stable visual ids and beat sounds
- `src/audio.js`, `audio/SOUNDS.md` — procedural audio and optional MP3 slots
- `art/` — scene art, portraits, prompts, aliases and manifest tooling
