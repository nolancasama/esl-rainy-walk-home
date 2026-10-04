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

## 2026-10-03 — Storybook presentation and stable media contracts

- **TTS was removed; STT remains.** Students read the deliberately short English
  dialogue themselves, while explicit speaking activities retain forgiving
  recognition and a tap fallback. Automatic narration and replay-speaker chrome
  distracted from the picture-book pacing.
- **The UI is a full-bleed overlay picture book.** Scene art now covers the
  viewport, with restrained crossfades, a readable bottom scrim, and paper
  dialogue/interaction cards over the lower part of the art. The intro reuses
  `school-01` rather than introducing separate title artwork.
- **Scene art is keyed by stable ids, not descriptions.** Each placeholder owns
  an id that survives copy edits. The generated manifest maps ids to files, and
  `art/aliases.json` records deliberate reuse (`home-04 → home-02`,
  `bag-04 → bag-02`, `bag-05 → bag-03`) without making runtime matching fuzzy.
- **Phone presentation is per line and rendered in HTML.** `say.message` selects
  the notification card and `say.photo` optionally embeds scene art. This avoids
  treating a character's in-person lines as messages. Portraits are reserved
  for these message cards; ordinary dialogue relies on the full-scene artwork.
- **Audio is procedural by default.** Web Audio supplies tone-based ambience and
  lightweight one-shots without asset downloads. A small explicit allow-list
  gates optional MP3 slots, so missing files are silent rather than generating
  requests or blocking progression.

## 2026-10-03 — Art continuity rules

- **The rain stops for the reunion and comes back on the walk home, and the
  story says so both times.** A narrator line at `reunion-03` ("The rain
  stops!") and one at `bag-01` ("Drip, drip... Rain again!") explain the golden
  reunion art; the `warm` tone also stops the rain ambience at that moment.
  Home windows show golden dusk with drizzle. Rejected: regenerating the reunion
  in rain, which cost four images for no story gain; and unexplained golden light.
- **The flipped umbrella is not broken.** `umbrella-04` shows the player
  pushing it back into shape, and a narrator line says "You fix the umbrella."
  Every later scene with an intact blue umbrella stays valid. There is one blue
  umbrella, always the player's. Haru only holds it when the player's arms are
  full of Momo, and those prompts say so. Rejected: a permanently broken
  umbrella, which would have needed every later walking scene redrawn.
- **The wrong house is a too-quick choice, not a misleading clue.** Both blue
  houses look the same; only Kimura's has a cat door. Haru's line changed from
  "Look! Cat stickers!" to "Look! A blue house!". Rejected: cat stickers, which
  made the first house look like Momo's real home.
- **Kimura's message photo is a dedicated asset (`photo-momo`).** It shows the
  player, Haru and Momo; Mr. Kimura took it, so he is not in it. Briefs for
  message-only art live in `STORY.photos` and go through the same prompt and
  manifest pipeline. Rejected: reusing `reunion-03` (Kimura hugging Momo).
- **The player has a home outfit.** After the towel: cream long-sleeve
  sweatshirt, navy lounge pants, socks; no jacket, randoseru or umbrella.
  `build-prompts.mjs` picks outfit variants per id through `OVERRIDES`.
- **The cat is found in one place: the roofed bicycle shelter by the red
  vending machine.** `listen-01` shows no animal yet; `come-01` to `come-03`
  keep Momo at the bicycles, never at a house door. Rejected: drawing Kimura's
  photo as an inset in `home-07`, because the HTML message card already shows
  `photo-momo` in that corner and a baked-in copy would duplicate it.
- **Prompts forbid extra animals, extra children and split panels by default.**
  In a lost-cat story a stray background cat reads as plot. Phone screens face
  away or stay blank; the HTML message card carries the content.

## 2026-10-04 — Weather is not tone; recurring places are film sets

- **`visual.weather` is separate from `visual.tone`.** Tone is the emotional
  palette (UI colours); weather (`cloudy`, `rain`, `storm`, `clearing`,
  `light-rain`, `indoor-rain`) drives the ambience and the prompt lighting.
  Previously `tone: 'warm'` silenced the rain, so the cozy home scenes lost the
  rain the windows show. Rejected: more tone values (`warm-rain`), which keeps
  the two ideas coupled.
- **Mic and camera default ON and are requested once on はじめる.** A denial or
  missing device switches that input off; an unanswered prompt stops waiting
  after 8 s and the story starts anyway. Tap fallbacks are unchanged. Rejected:
  asking the first time a speak/gesture beat appears, which interrupts the story.
- **The opening school is 松原小学校 / Matsubara Elementary School**, shown in the
  place label (`placeJa` plus optional `placeEn`), never as signage in the art.
- **Recurring locations use a master reference.** `cat-search-area` (a new empty
  plate) and `blue-houses` (`wrongHouse-04`) are defined in
  `art/build-prompts.mjs`; every scene there gets the reference name and the
  layout in words. Rejected: per-shot environments, which moved the vending
  machine, shelter and doors between consecutive images.
- **Mrs. Sato keeps her purple umbrella.** The children carry her two bags.
  Rejected: Haru holding her umbrella, which needed a handoff the story lacked.
- **Kimura's photo keeps the id `photo-momo`.** It already shows exactly the
  player, Haru, Momo and the blue umbrella, without Mr. Kimura. Renaming it to
  `kimura-photo-01` would only churn ids.
