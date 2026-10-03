# Rainy Walk Home — あめの かえりみち

A short narrative English game for Japanese grade 5–6 students on school
Chromebooks. Walking home in the rain, the player helps a friend, a younger
student and a neighbor, finds a lost cat and returns her home. Choices use
target verbs (HELP, CATCH, LISTEN, FEED, READ...), with speaking moments
("Come!", "Hello!", "Thanks!") and optional camera gestures (RUN, CATCH).
Every path gets home; earlier choices change the tone of the ending.

**Play:** https://nolancasama.github.io/esl-rainy-walk-home/

Plain HTML/CSS/ES modules. No build step, no dependencies.

## Run

```
npm run serve        # http://localhost:8020 (any static server works)
npm test             # unit tests, including every choice path
npm run test:browser # Playwright playthrough (needs Playwright installed)
```

Microphone and camera are optional; every speaking and gesture moment has a
tap button.

## Project files

- `SPEC.md` — story data format and interaction rules
- `DESIGN_DECISIONS.md` — what was decided and why
- `src/story.js` — the story (pure data)
- `art/` — scene art and portraits; `art/ART_PROMPTS.md` holds the prompt
  for every image, and `node art/build-manifest.mjs` wires new images in
