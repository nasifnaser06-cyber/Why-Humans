# CLAUDE.md — WHY HUMANS

Read this file before any work in this repository.

## 1. Project identity

**WHY HUMANS** is an English-language YouTube channel of research-based
animated psychology explainers. This repository is its **production studio**:
Remotion (React + TypeScript) compositions that render SVG-based 2D animation
to video. It is not a website, app or game.

Series:

- **RETESTED**: examines famous psychological research against later evidence
  (replications, meta-analyses, critiques).
- **THE UNSPOKEN PATTERNS**: explains the psychology behind everyday human
  behaviour.

Ambition: sophisticated scientific storytelling and 2D animation quality
comparable to leading educational animation studios, with a visual identity
that is **entirely our own**.

## 2. Three-stage production workflow (mandatory)

| Stage | What | Where | Gate to start |
| ----- | ---- | ----- | ------------- |
| **1** | Scientific research and scriptwriting | Claude Chat (outside this repo) | — |
| **2** | Visual identity, detailed storyboard, 15–20 s animation prototype | This repo | Approved Stage 1 script in `episodes/<id>/script/` and recorded in `episode.json` |
| **3** | Full episode animation, rendering, QA | This repo | Stage 2 approval recorded in `episode.json` |

Rules:

- **Never skip a gate.** Before Stage 2 work, confirm `approvals.stage1Script.approved`
  is `true`. Before Stage 3 work, confirm `approvals.stage2Prototype.approved` is `true`.
  If not, stop and ask.
- **Do not write or rewrite narration in this repo.** The approved script is
  read-only. If wording seems wrong, too long for the timing, or scientifically
  doubtful, flag it to the user. Don't edit it.
- Only the user records approvals. Never set an `approved` flag yourself.
- Work on one stage at a time. When a stage's deliverable is ready, report and
  **stop for review**.

## 3. Scientific safeguards

Scientific accuracy takes priority over dramatic storytelling.

- Every factual claim on screen (numbers, chart values, labels, depictions of a
  study's procedure or participants) must trace to a row in
  `episodes/<id>/research/claims.md`. If a visual needs a fact that isn't
  there, ask. Don't invent it.
- Visuals must not overstate the evidence. Don't depict correlation as
  causation, a single study as settled, a small or non-replicated effect as large or
  universal, or a contested finding as consensus.
- Charts: label axes and units, start bars at zero unless clearly marked,
  show uncertainty (confidence intervals, error bars, sample size) when the
  script discusses it, and never fabricate or "illustrative" data that could
  be mistaken for real results. Clearly label schematic diagrams as schematic.
- Depict research participants, clinical conditions and groups respectfully,
  without stereotypes.
- For RETESTED, represent the original study fairly before presenting later
  evidence, and distinguish "failed to replicate", "smaller effect than
  reported" and "disproven".
- If anything in the approved script appears inaccurate or outdated, raise it
  with the user. Don't silently "fix" it.

## 4. Originality and licensing

- All animation assets must be **original** or **appropriately licensed**,
  and recorded in `ASSET_LICENSES.md` before they appear in a render.
- **Do not copy Kurzgesagt** (or any other studio): no reproduction or close
  imitation of their distinctive characters (e.g. their bird designs), illustrations,
  scenes, compositions, colour-and-shape signatures, logos, music or sound design.
  "Comparable quality" means comparable craft, not a similar look.
- Do not trace or recreate frames from other videos. Do not use AI-generated
  imagery that imitates a specific studio's or artist's style.
- Fonts, music and SFX need a licence entry. Don't load remote fonts or assets
  at render time unless their licence is recorded.

## 5. Technical standards

- **Stack:** Remotion 4 (pinned exact versions, all `remotion`/`@remotion/*`
  packages on the same version), React 19, TypeScript (strict), SVG for
  illustration, FFmpeg for media processing, Kokoro TTS for narration.
- **Format:** 1920×1080, 30 fps, H.264, yuv420p, BT.709 (see
  `src/config/video.ts` and `remotion.config.ts`).
- **Determinism:** renders must be frame-deterministic. Drive all motion from
  `useCurrentFrame()`. No `Math.random()` (use `seededRandom`), no
  `Date.now()`, no CSS transitions/animations, no timers.
- **Design tokens:** never hard-code colours, font sizes, spacing or timings
  in components. Use `src/design/tokens.ts`. Identity changes go in the tokens.
- **Animation utilities:** use `src/animation/` (named easings, spring presets,
  `progress`, `fadeInOut`, `drawOffset`) and primitives in
  `src/components/` before writing ad-hoc motion. Generalise and add reusable
  pieces there rather than duplicating them inside an episode.
- **Structure:**
  - `src/episodes/<episode-id>/`: episode compositions (scenes as `<Sequence>`s).
  - `src/components/`: reusable, episode-agnostic components.
  - `episodes/<episode-id>/`: research, approved script, storyboard, cue sheet.
  - `public/`: static assets loaded with `staticFile()` (narration, sound, images).
  - `renders/`: output, ignored by git.
- **Audio:** narration via `scripts/tts/kokoro_narrate.py` (verbatim text),
  normalised with `scripts/media/normalize-audio.sh` (-14 LUFS, -1 dBTP).
  Check final renders with `scripts/media/check-render.sh`.
- **Quality checks before reporting work done:** `npm run lint` passes, the
  affected compositions render, and key frames have been inspected as stills.
- **Accessibility:** on-screen text readable at 1080p on a phone (body ≥ 40 px),
  meaning never carried by colour alone, keep text within title-safe area.

## 6. Repository etiquette

- Preserve approved files and the user's existing changes. Never overwrite or
  delete them without asking.
- Don't commit large binaries (renders, raw audio).
- **Do not push, publish, upload or deploy without the user's explicit
  authorisation.**
- Keep dependency upgrades deliberate: use `npm run upgrade` (keeps Remotion
  packages in lockstep), then re-verify a render.
