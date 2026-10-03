# Art fixes

Regeneration queue from the 2026-10-03 continuity audit. Use the prompt for each id
in `art/ART_PROMPTS.md` (generated from `src/story.js`; the descriptions there already
carry the corrections). Save over `art/scenes/<id>.webp`, keep the id, then run
`node art/build-manifest.mjs`, and remove any alias in `art/aliases.json` that the
new file makes unnecessary.

Continuity rules the prompts now enforce:

- **Weather:** it rains from `school-02` until the reunion. The rain stops at
  `reunion-03` (narrator: "The rain stops!"), with golden evening light. Light
  rain starts again at `bag-01` ("Drip, drip... Rain again!"). Home windows show
  golden dusk with a light drizzle. Golden light anywhere else is a mistake.
- **Umbrella:** the player's blue umbrella flips inside out in `umbrella-03` but
  is not broken; the player pushes it back in `umbrella-04`. Haru never has
  an umbrella of his own.
- **Wrong house:** two matching blue houses. Nothing on the first house says
  "cat"; the mistake is choosing too fast. Only the second house has a cat door.
- **Carrying Momo:** while the player carries Momo, Haru holds the blue umbrella.
- **Home outfit:** after the towel, the player wears a cream long-sleeve
  sweatshirt, navy lounge pants and socks. No jacket, randoseru or umbrella indoors.
- **No extra animals or children:** Momo is the only cat, and the golden dog only
  appears at the wrong house. Mom's home has no pets.
- **No readable text:** tags, nameplates and phone screens are blank; the game
  shows the words in HTML.

## High priority (seen on every path or wrong story logic)

1. `photo-momo` — **new dedicated asset** for the message photo: player, Haru,
   Momo, without Mr. Kimura (he took it). Until it exists, it is aliased to `reunion-06`.
2. `home-07` — Momo asleep in the player's home; the phone shows Kimura in the photo.
3. `home-02` — a different, younger child in a blue raincoat; a calico cat.
4. `wrongHouse-01` — cat stickers and paw prints on the wrong house; Haru stands
   in its doorway as if he lives there.
5. `wrongHouse-02` — Momo loose on the step instead of in the player's arms; gate
   bars and a dark box clutter the doorway; the dog's anatomy needs to be clean.
6. `home-04` — shows the player outdoors. Aliased to `home-06` for now.
7. `bag-01` — Momo is still in the player's arms after she has gone home; must
   now also show the light rain starting again.
8. `papers-02` — the randoseru is on the player's chest (mirrored body), the
   hand doesn't reach the sheet, and Ken still holds the papers he just dropped.

## Medium priority (one ending, or a visible contradiction)

9. `home-08` — randoseru, jacket and umbrella indoors.
10. `home-03`, `home-05`, `home-06` — randoseru, jacket and umbrella indoors;
    `home-05` has a calico cat.
11. `wrongHouse-04` — the Tanaka house is beige, not blue.
12. `wrongHouse-06` — Haru and Momo are missing; the player bows alone.
13. `umbrella-04` — Haru holds a broken black umbrella that doesn't exist; the
    player's flipped umbrella should be in the player's hands, being pushed back.
14. `bag-03` — Haru is drawn three times in one frame. Also used for `bag-05`.
15. `bag-11` — a real shiba barks behind a gate; Haru should only be pretending.
16. `bag-04` — Haru is already kneeling instead of pausing (aliased to `bag-02`).
17. `bag-05` — an extra girl replaces the player (aliased to `bag-03`).
18. `papers-08` — a stray child in a yellow raincoat.
19. `umbrella-01` — depends on a readable phone screen.

## Low priority / optional

20. `tag-04` — cherry blossoms in the June hydrangea season; a stray calico cat.
21. `reunion-05` — a small stray calico cat on a wall.
22. Background calico cats in `bag-06` read as a clue during the
    cat search. Regenerate only if those images are redone anyway.

## Checked and fine as is

`home-01`, `reunion-01` to `reunion-04`, `reunion-06`, `umbrella-02`, `umbrella-03`,
`bag-15`, `wrongHouse-03`, `wrongHouse-05`, `tag-02`
(blank tag), `tag-03`, `tag-05`, `bag-02`, `bag-06`, `bag-10`, `bag-12`, `bag-13`,
`bag-17`, `bag-20`, `sato-04`, `softly-02`, `come-07`. Momo walking beside the
children in some of these, instead of being carried, is acceptable.
