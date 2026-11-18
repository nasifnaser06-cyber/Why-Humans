---
name: why-humans-motion
description: WHY HUMANS motion-production standards for Remotion episodes and Shorts — scientific animation rules, animation design, deterministic Remotion code for 16:9 and 9:16, educational storytelling, production QA, and which synced skills to use or ignore. Load before any Stage 2 or Stage 3 work (storyboards, prototypes, scenes, transitions, charts, sound, renders) in this repository.
---

# WHY HUMANS — Motion Production Standards

Project skill, version-controlled with the repo. It defines how motion is
designed, built and checked. It does **not** authorise any stage of work:
check the gates in `CLAUDE.md` first.

## 0. Instruction priority

When guidance conflicts, the higher item wins:

1. Explicitly approved episode decisions and the scientific evidence
   (`episodes/<id>/episode.json`, `research/claims.md`).
2. `CLAUDE.md`.
3. This skill.
4. Compatible sections of synced skills (listed in §7).
5. General creative recommendations.

Report any conflict you cannot resolve. Never silently drop a scientific or
approval requirement to satisfy a creative one.

## 1. Approved creative decisions (current)

**Visual foundation: paper and ink.** A starting point, not a permanent limit.
Stage 2 may explore richer illustration, controlled colour, layered
environments, metaphors, camera movement and polished transitions. Any
significant redesign needs the user's approval.

| Role                   | Hex       |
| ---------------------- | --------- |
| Paper (background)     | `#F4F1EA` |
| Ink (lines, text)      | `#1B1B1F` |
| Orange (single accent) | `#FFAA00` |
| Neutral grey           | `#AAA69D` |
| Card background        | `#FFFDF8` |

Use these through `src/design/tokens.ts`, never as literals in components.

**Characters.** Sam and Quinn are approved only for the RETESTED Episode 02
(Stanford Prison Experiment) production approach. They are not channel
mascots. Do not use them in THE UNSPOKEN PATTERNS or Episode 01 without a
specific approved reason. Other human figures must be original designs.

**Formats.**

| Use           | Size      | Aspect | FPS |
| ------------- | --------- | ------ | --- |
| Full episode  | 1920×1080 | 16:9   | 30  |
| YouTube Short | 1080×1920 | 9:16   | 30  |

**Identity goal.** An original WHY HUMANS look. Comparable craft to the best
educational studios, never a similar look to any of them.

## 2. Scientific animation principles

- **Motion explains.** Every movement should show a mechanism, a comparison,
  a change, a sequence or a relationship. If it explains nothing, cut it.
- **Metaphor ≠ finding.** Visual metaphors (a figure climbing stairs, a
  crowd as dots) must be visibly distinct from depictions of actual data or
  procedure. Mark schematic diagrams as schematic; give real data an axis, a
  unit and a source line.
- **Never fabricate.** No invented results, effect sizes, sample sizes,
  percentages, curves, p-values or chart values. "Illustrative" data that a
  viewer could mistake for a result is not allowed. Every number on screen
  maps to a row in `claims.md`.
- **No numeric motion that lies.** Never flash, scramble or "decode" digits
  for scientific values; every intermediate frame could be read as a claim.
  A count-up is allowed only from 0 (or the stated baseline) to the sourced
  value, with the final value held long enough to read.
- **Correlation stays correlation.** For correlational findings avoid
  arrows, pushes, chains, dominoes or one object transforming _into_
  another. Prefer co-occurrence: two things appearing together, a scatter, a
  shared highlight.
- **Show the strength of evidence.** Small, contested or non-replicated
  effects look small and uncertain, not dramatic. Show confidence intervals,
  error bars or sample size when the script mentions them. Bars start at zero
  unless a break is clearly marked.
- **RETESTED.** Present the original study fairly before later evidence.
  Visually distinguish "did not replicate", "smaller effect" and "disproven".
- **People.** Depict participants, conditions and groups respectfully and
  without stereotypes. Avoid psychology clichés (glowing brains, lightbulb
  heads, puzzle-piece heads) unless the script needs them.

## 3. Animation design

- **Hierarchy.** One focal point per moment. Supporting elements are dimmer,
  smaller or still. The viewer should know where to look within ~0.5 s.
- **Readable composition.** Generous paper space, few elements, text inside
  the safe area (§4.4). Ink lines at token stroke widths.
- **Layered 2D environments.** Build depth with 2–4 planes (background,
  midground, subject, optional foreground). Parallax by moving planes at
  different rates; keep foreground layers from covering the subject or text.
- **Camera.** Move the camera with intent: push in to focus, pull out to
  reveal context, pan to follow an idea's direction, hold to let a point
  land. Use one move at a time, ease in and out (`ease.inOut`), and never
  pan while text is being read. Implement as a transform on a scene
  container, not by moving every element.
- **Easing.** Only the named curves in `src/animation/easing.ts` and spring
  presets in `src/animation/springs.ts`. Entrances `ease.out`, exits
  `ease.in` and shorter than entrances (~60%), moves between rests
  `ease.inOut`, ambient `ease.drift`. Add a new named curve to the module
  rather than an inline bezier.
- **Meaningful transformations.** When an idea becomes another idea, let
  one object change into the next (a shape becomes a chart axis, a crowd
  becomes a bar) instead of cutting, so the link is visible. Never do this
  for correlational links (§2).
- **Anticipation and follow-through.** Small counter-move before large
  actions (3–6 frames); slight settle after (`springs.lively` for figures
  and icons, `springs.smooth` for text and charts — text never bounces).
- **Narration timing.** Time visuals to the actual narration audio, not to
  estimates. A visual lands on or just before the word it illustrates
  (0–4 frames early). Hold a text element at least ~0.5 s + 0.3 s per word.
- **Intentional stillness.** Hold still while a key claim is spoken or a
  chart is read. Stillness after motion is how emphasis works.
- **Clear transitions.** Each transition marks a change of idea and has a
  reason: continue (match or transform), contrast (hard cut), move on
  (directional wipe or push), return (reverse of the earlier move). Default
  to the simplest one that shows the relationship.

## 4. Remotion standards

### 4.1 Determinism

- All motion derives from `useCurrentFrame()` via `interpolate()` (always
  clamped), `spring()`, or the helpers in `src/animation/`
  (`progress`, `mix`, `fadeInOut`, `staggerStart`, `drawOffset`).
- No CSS `transition` / `animation` / keyframes, no `setTimeout`,
  `setInterval`, `requestAnimationFrame`, `Date.now()` or `Math.random()`.
  Use `seededRandom(seed)` for variation.
- A frame rendered in isolation must look identical to the same frame in a
  full render.

### 4.2 Resolution awareness

- Never hard-code `1920`, `1080`, or fixed pixel positions for layout. Read
  `width`, `height` and `fps` from `useVideoConfig()`.
- Scale sizes from the short side: `const u = Math.min(width, height) / 1080`
  and multiply token sizes by `u`, so a 40 px body size stays 40 px in both
  formats.
- Position with fractions of `width`/`height` or flex layout, not absolute
  numbers. Branch on `width < height` only where a layout genuinely differs.
- Durations use `fps` (`seconds(n, fps)`), never assume 30.

### 4.3 Structure

- One component per scene; place scenes with `<Sequence from durationInFrames>`.
  Components use frames relative to their Sequence.
- Reusable, episode-agnostic pieces go in `src/components/`; episode scenes in
  `src/episodes/<episode-id>/`. Generalise before duplicating.
- SVG for illustration: `viewBox` sized from the composition, `pathLength={1}`
  for write-on strokes.
- Register each format as its own `<Composition>` (e.g. `…-16x9`, `…-9x16`)
  sharing scene components.
- Do not add packages (`@remotion/transitions`, `@remotion/effects`, fonts,
  Lottie, three.js, etc.) without the user's approval. Install approved
  `@remotion/*` packages with `npx remotion add` so versions stay in lockstep.

### 4.4 Safe areas

- **16:9:** keep text inside title-safe (`layout.titleSafe`, ~5% each side);
  keep the bottom-right clear in the last 20 s for end-screen elements.
- **9:16 Shorts:** YouTube UI covers the bottom (caption, channel, audio) and
  the right edge (action buttons). Keep key text and faces in the central
  area, clear of roughly the bottom 25% and the right 15%; verify against a
  current Shorts overlay before final render.

### 4.5 Tokens

Colours, type sizes, spacing, strokes, radii and timings come from
`src/design/tokens.ts`. Identity changes are made there, once.

## 5. Educational storytelling

- **One idea per scene.** State in the storyboard what the viewer should
  understand at the end of each scene.
- **Complement the narration.** Show what words cannot (structure,
  proportion, process); don't illustrate every noun or duplicate the
  sentence as on-screen text.
- **Not a slideshow.** Avoid title-plus-bullets layouts and isolated
  fade-in/fade-out cards. Prefer one diagram or environment that grows and
  changes as the explanation develops.
- **Not everything moves.** Animate the lead element; supporting elements
  enter and then rest. Ambient motion is subtle, sparse and optional.
- **Progressive reveal.** Introduce complex diagrams part by part in the
  order the narration explains them; dim what is done, highlight what is new.
- **Continuity.** Keep recurring objects, colours and positions consistent so
  viewers can track an idea across scenes; reuse a shape when the idea recurs.
- **Accuracy holds for drawings too.** Procedures, apparatus, group sizes and
  sequences of events in illustrations must match the source.

## 6. Production QA

Before reporting any animation work as done:

1. `npm run lint` passes; affected compositions render in each target format.
2. **Frames:** render stills at key moments (scene starts, peaks of motion,
   holds) and inspect them. For each transition, inspect the first, middle
   and last frame.
3. **Typography and safe areas:** text ≥ token minimums, legible on a phone,
   inside the format's safe area, no clipping or overlap.
4. **Timing:** visual beats line up with narration words; holds are long
   enough to read.
5. **Audio:** narration verbatim from the approved script; music ducked under
   voice; every sound effect has a visible cause; final mix −14 LUFS
   integrated, ≤ −1 dBTP (`scripts/media/check-render.sh`).
6. **Captions:** match the narration exactly and stay in sync.
7. **Science:** every number, label and chart checked against `claims.md`;
   metaphors distinguishable from data; no causal visuals for correlations.
8. **Licences:** every font, sound, music track and image is in
   `ASSET_LICENSES.md`. Sound effects: CC0 or CC BY only (never
   NonCommercial or ShareAlike), or original.

## 7. Using synced skills

Synced skills are reference material, used at priority level 4. Translate their
values into frames and tokens; never copy their code or large passages into
this repo.

### Recommended

| Skill                                                                                                              | Use these parts                                                                                                                 | Stage |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `remotion-video`                                                                                                   | Core markup rules, assets, structure, render commands, licence check                                                            | 2, 3  |
| `rion-motion-video`                                                                                                | Timing by reads, motion layers, emotion-to-motion mapping, storyboard template with reads, contact-sheet review, motion recipes | 2, 3  |
| `rion-storyboard-creation`                                                                                         | Shot types, camera angles and moves, 180° rule, continuity anchors, annotation format, pacing                                   | 2     |
| `rion-motion-core`                                                                                                 | Choreography (casting lead/support, overlap vs. sequence), motion personality, duration/distance tables                         | 2     |
| `rion-character-design`                                                                                            | Parts 1–2: silhouette, shape language, expression, character bible                                                              | 2     |
| `rion-design-craft`                                                                                                | Data figures, colour/contrast, psychology clichés to avoid                                                                      | 2, 3  |
| `rion-motion-review`                                                                                               | Part 14 video checklist and troubleshooting table only                                                                          | 3     |
| `rion-explainer-studio`                                                                                            | Generic methods only: easing/duration habits, hard cuts, typewriter, citation line, colour flip to show change                  | 2, 3  |
| `hyperframes` reference docs (`motion`, `types/explainer`, `types/data`, `sound`, `story`, `storyboard`, `review`) | Principles only                                                                                                                 | 2, 3  |
| `media-use`                                                                                                        | SFX licence policy and mixing concepts (ducking, voice EQ, limiter last)                                                        | 3     |
| `data-visualization`                                                                                               | Accuracy and accessibility sections as a chart checklist                                                                        | 2, 3  |

### Ignore these instructions (conflict with project standards)

- **Any style imitation.** `rion-explainer-studio`'s Kurzgesagt-derived scene
  devices and code (`GridToHead`, unlock/stat cards, sidebar abilities), its
  measured "Kurzgesagt" timings, and its combined drifting specks + single
  light pool + blurred edge shapes look. Also `style-sampling`,
  `reverse-any-video` and `zach-d-films`.
- **Random-digit decode/scramble effects** on any scientific value.
- **"Illustrative" curves or data** (`graph`, parts of `rion-motion-video`).
- **"No text: show it"** and the brush-only/no-geometry style rules in
  `rion-motion-video` — our charts need labels; our tokens set the style.
- **CSS transitions, keyframes, timers, unseeded randomness, hover and
  scroll motion** (`rion-motion-core` Parts 1.1, 1.7, 10; `rion-motion-review`
  Parts 10–12; `rion-motion-web`; `rion-motion-apps`; UI `motion`,
  `transitions`, `reduced-motion` skills).
- **Hard-coded 1080×1920 layouts and literal colours** in any kit code.
- **A single global clock** for all components; we use Sequence-relative timing.
- **Frameworks and services outside the stack:** HyperFrames CLI and its
  telemetry, three.js scenes, HeyGen music/voice, paid AI image or video
  generation (`rion-image-gen`, `belt`, fal), LoRA training, character-design
  Parts 3–4 — unless the user approves a specific use.
- **Script drafting** in any skill ("hook", "but-twist" templates):
  narration comes only from the approved Stage 1 script.
- **Audio peak of −1.5 dBTP** in other skills: ours is −1 dBTP.
- **Example palettes, mascots or characters** from other projects.
- **`brand-guidelines`, `theme-factory`:** not our brand.

If a synced skill is updated and now conflicts with this file, follow this
file and report the change.
