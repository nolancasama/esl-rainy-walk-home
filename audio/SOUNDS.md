# Sound design

All sound is optional and must never block story progression. The sound setting
defaults to ON, is stored in `localStorage`, and can be changed from the title
screen. An `AudioContext` is created or resumed only after the player presses
`はじめる` (or another explicit sound-unlock control). Sound OFF produces no
audio output.

## Ambience

`src/audio.js` generates looping ambience with the Web Audio API and crossfades
between tones in about one second:

- `title` — soft wind and rain
- `cloudy` — light wind
- `rain` — steady filtered rain
- `storm` — heavier rain and wind
- `warm` — quiet, muffled low-passed rain

Call `setTitleAmbience()` on the intro and `setAmbience(visual.tone)` as the
current visual changes. Calls made before audio is unlocked simply remember the
requested tone.

## Procedural one-shots

These names require no files and are passed to `playSfx(name)`:

| Name | Sound |
|---|---|
| `bell` | Four-note school chime |
| `raindrops` | A few soft drops |
| `gust` | Wind swell |
| `flutter` | Fluttering paper |
| `splat` | Wet paper impact |
| `splash` | Books falling into a puddle |
| `phone` | Two short phone buzzes |
| `doorbell` | Ding-dong |
| `mug` | Soft mug thunk |

## Optional file slots

The following one-shots use `audio/sfx/<name>.mp3` only when their name is
present in the `SOUND_FILES` array exported by `src/sound-files.js`:

- `meow`
- `hiss`
- `purr`
- `bark`
- `door`
- `orange`

The allow-list is intentionally empty until files are supplied. This prevents
404 requests. To add a sound, save (for example) `audio/sfx/meow.mp3`, then add
`'meow'` to `SOUND_FILES`. Do not add a name before its MP3 exists.
