# Design Decisions

This file records meaningful product, UX, visual, architectural, or behavioral decisions for this project.

For each significant decision, record:

- Date
- What was decided or changed
- Why
- Previous approach, if relevant
- Rejected alternatives, if useful

Only record decisions that may be useful to understand later.

Do NOT record:
- trivial UI adjustments
- routine bug fixes
- formatting changes
- mechanical refactors with no design consequence
- every individual code modification

Git is the source of truth for detailed code-change history.

A useful rule:

> If a future developer or AI could reasonably ask, "Why is it designed this way?", record the answer here.

## 2026-10-03 — Initial design (from the user's brief, with these adjustments)

- **Engine/story split.** Story is pure data in `src/story.js` (beats with `when`
  predicates, `effects`, inline choice consequence beats, `goto`). A DOM-free
  `engine.js` runs it so every branch combination is testable in Node and another
  story can reuse the engine. Rejected: DOM callback chains.
- **Shallow branching via conditional beats.** Choices play inline consequences,
  then reconverge. Callbacks are `when` beats keyed on flags/`haruBond`
  (warm = `haruBond >= 2`), not separate paths. Bond is never shown.
- **Mrs. Sato's payoff is double:** her fish snack makes FEED work on the cat, and
  she names Mr. Kimura at the tag scene (skipping the THINK/RUN search). Without
  her, FEED finds empty pockets and the story routes through a "say it softly"
  recovery. Rejected: a separate Sato plotline.
- **Cat recovery scene (`softly`).** TOUCH / GO / FEED-without-food all lead to a
  quiet second "Come..." attempt, so the cat is always found without loops.
- **Wrong house happens on every path** (cat stickers make the mistake
  believable); recovery is READ nameplates or LOOK where Momo looks. The second
  "Hello!" at the right house is the redemption.
- **Younger student (Ken)** added to scene 3 so the papers scene has a person to
  thank the player and a later callback (returns the lost notebook, "You're so
  cool!"). Gives a "younger child admires them" moment.
- **Gesture = camera motion energy, not pose.** Frame differencing detects RUN
  (sustained motion) and CATCH (upper-frame burst) offline with no dependency;
  esl-gestures' MediaPipe stack is too heavy for a no-build MVP. The detector
  interface allows a pose detector later. Camera is opt-in; tap always works.
- **Vocabulary source** is esl-verbs `src/vocab.js`: 50 verbs (the brief said 49
  but listed 50, including `write`). Story uses: go, help, run, catch, listen,
  look, feed, touch, read, think, get, wash, wear, drink (+ "come" as speech).
- **Placeholders show their art brief** (`[VISUAL: ...]`) plus an emoji stage;
  `?art=0` hides the brief text. Visuals go through a type-keyed renderer
  registry (`placeholder`, `image`, `video`).

## 2026-10-03 — Progression is always explicit

- Speech and camera interfaces always expose an immediate tap completion path.
  This keeps the story playable on managed Chromebooks without browser speech or
  media permissions; recognition and motion detection are optional input modes.

## 2026-10-03 — Three ending tones (warm / repair / quiet)

- `ending(state)` in `src/story.js` picks a tone from the three helping dilemmas
  (umbrella, papers, Mrs. Sato): **warm** = haruBond >= 2 and helped at least
  twice; **repair** = an earlier skip, and the most recent dilemma was a help
  (a later skip undoes it); **quiet** = otherwise. Never shown to the player.
- The tone only changes the bag scene and walk home (how Haru helps, whether he
  walks the player home) plus one quiet beat at home. Every ending returns
  Momo, gets home, and gets the same warm-drink sequence and Kimura's photo.
- Repair ending gets a spoken "Thanks!" (STT + tap fallback) so the repair is
  something the player does, and a callback to their own embarrassing moment
  (umbrella flip or paper on the face), then a good memory (Momo).
- Cat-scene choices (FEED/TOUCH/GO) do not count: they are about technique, not
  about choosing to help people.
- "How was your day?" is a phrase choice (`label`), not STT: three different
  answers would need branching speech matching, and it only changes Mom's
  reply. Rejected: branching STT for this one moment.
- Gesture screens show one tap button (camera off: `RUN! (タップ)`; camera on:
  small `タップでつづける` fallback, which becomes the main button if the
  camera fails). Previously both buttons always showed.

## 2026-10-03 — Finished art wired by manifest, not by editing the story

- `art/build-manifest.mjs` writes `src/art-manifest.js`, mapping each placeholder
  description to `art/scenes/<id>.webp` (ids as in `art/ART_PROMPTS.md`) and cast
  ids to `art/portraits/<who>.webp`. `visuals.js` swaps a placeholder for its
  image when one exists; otherwise the emoji placeholder still shows.
- Keyed by description so `src/story.js` stays untouched, and an edited
  description safely falls back to the placeholder instead of a wrong picture.
- Images are shown whole (object-fit: contain) in a taller frame, with a blurred
  copy filling the sides. Rejected: cropping to fill, which cut off memory
  bubbles and faces.
- Source PNGs (~2.7 MB each) are converted to 1600px WebP (~200 KB) for Chromebooks.
