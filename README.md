# WHY HUMANS: Animated Psychology Studio

Production repository for **WHY HUMANS**, an English-language YouTube channel of
research-based animated psychology explainers:

- **RETESTED**: famous psychological research, examined against later evidence.
- **THE UNSPOKEN PATTERNS**: the psychology behind everyday human behaviour.

Videos are built as code with [Remotion](https://www.remotion.dev) (React +
TypeScript) using SVG-based 2D animation, and rendered to MP4 with FFmpeg.

> Contributors (human or AI) must read [`CLAUDE.md`](./CLAUDE.md) first. It
> defines the three-stage workflow, scientific safeguards and originality rules.

## Requirements

| Tool | Version | Notes |
| ---- | ------- | ----- |
| Node.js | 20 or newer (tested on 22) | |
| npm | 10+ | |
| FFmpeg | 6+ | Optional for Remotion (it ships its own), required for `scripts/media/*` |
| Python | 3.10–3.12 | Optional, for Kokoro TTS |
| espeak-ng | any | Optional, required by Kokoro |

## Install

```bash
npm install
```

On first render, Remotion downloads a headless Chrome build automatically.

## Preview in Remotion Studio

```bash
npm run dev
```

Opens the Studio at http://localhost:3000. Compositions are grouped in the sidebar
(`System/Placeholder` is a pipeline test; episodes appear as they're added).

## Render

```bash
# The pipeline-test placeholder
npm run render:placeholder          # -> renders/placeholder.mp4
npm run still:placeholder           # -> renders/placeholder.png (frame 60)

# Any composition
npx remotion render <CompositionId> renders/<episode-id>/<file>.mp4

# Part of a composition (frames are inclusive)
npx remotion render <CompositionId> renders/test.mp4 --frames=0-89

# List all compositions
npm run compositions
```

Output defaults (see `remotion.config.ts`): H.264, CRF 18, yuv420p, BT.709,
1920×1080 at 30 fps.

QA a finished render (format, duration, loudness):

```bash
scripts/media/check-render.sh renders/<file>.mp4
```

## Narration (Kokoro TTS)

Narration is generated **verbatim** from the approved script.

```bash
python3 -m venv .venv
.venv/bin/pip install -r scripts/tts/requirements.txt   # also: apt install espeak-ng / brew install espeak-ng

.venv/bin/python scripts/tts/kokoro_narrate.py \
  episodes/<episode-id>/script/narration.txt public/narration/<episode-id> \
  --voice af_heart --lang a

scripts/media/normalize-audio.sh public/narration/<episode-id>/block_001.wav \
  public/narration/<episode-id>/block_001.norm.wav
```

## Project structure

```
.
├── CLAUDE.md                 Studio rules: workflow, science, originality, tech standards
├── ASSET_LICENSES.md         Licence register for every non-code asset
├── remotion.config.ts        Render defaults
├── src/
│   ├── index.ts              Remotion entry point
│   ├── Root.tsx              Composition registry
│   ├── config/video.ts       1920×1080 @ 30 fps; seconds() helper
│   ├── design/tokens.ts      Colours, type, spacing, layout, motion timings (provisional)
│   ├── animation/            Easings, spring presets, interpolation & SVG helpers
│   ├── components/           Reusable primitives (FadeIn, PopIn, DrawPath, SafeArea, Backdrop)
│   ├── series/               Series metadata (RETESTED, THE UNSPOKEN PATTERNS)
│   ├── compositions/         System compositions (Placeholder)
│   └── episodes/             Episode compositions, one folder per episode
├── episodes/
│   └── _template/            Copy per episode: research/, script/, storyboard/, assets/, audio/, episode.json
├── public/                   Static assets for staticFile(): narration/, sound/{music,sfx}/, images/
├── scripts/
│   ├── media/                FFmpeg helpers: probe, normalise loudness, QA a render
│   └── tts/                  Kokoro narration generator
└── renders/                  Render output (ignored by git)
```

## Production workflow

1. **Stage 1: Research and script** (Claude Chat). Output: approved script,
   sources and claim ledger, imported into `episodes/<id>/`.
2. **Stage 2: Visual identity, storyboard and a 15–20 s prototype.**
3. **Stage 3: Full animation, render and QA.**

Each stage needs explicit approval before the next starts. See `CLAUDE.md`.

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Remotion Studio |
| `npm run lint` | ESLint + TypeScript check |
| `npm run typecheck` | TypeScript only |
| `npm run format` | Prettier |
| `npm run compositions` | List compositions |
| `npm run render:placeholder` | Render the pipeline test |
| `npm run upgrade` | Upgrade all Remotion packages in lockstep |

## Licence

Code and original artwork © WHY HUMANS. All rights reserved. Third-party assets
are listed in `ASSET_LICENSES.md` under their own licences.
