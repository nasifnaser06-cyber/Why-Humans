/**
 * WHY HUMANS — design tokens (PROVISIONAL).
 *
 * These are neutral starting values so components have something consistent to
 * reference. The channel's real visual identity is defined in Stage 2 and,
 * once approved, replaces these values here — components should never
 * hard-code colours, sizes or timings.
 *
 * All values are original to this project.
 */

export const colors = {
  // Backgrounds: deep, slightly warm ink so bright illustrations read clearly.
  bg: {
    deep: "#14121F",
    base: "#1D1A2E",
    raised: "#28243D",
  },
  // Text
  text: {
    primary: "#F4F1EA",
    secondary: "#B9B4C7",
    muted: "#7E7893",
  },
  // Accents (provisional). Keep a small palette; meaning must not rely on colour alone.
  accent: {
    coral: "#FF7A59",
    amber: "#FFC24B",
    teal: "#3CC9B0",
    sky: "#5AA9FF",
    violet: "#A58BFF",
  },
  // Semantic colours for evidence visualisation.
  evidence: {
    supports: "#3CC9B0",
    contradicts: "#FF6B6B",
    mixed: "#FFC24B",
    unknown: "#7E7893",
  },
} as const;

/** Series-specific accent so viewers can tell the series apart at a glance. */
export const seriesAccent = {
  retested: colors.accent.coral,
  unspokenPatterns: colors.accent.teal,
} as const;

export const typography = {
  // System stack until the Stage 2 typeface is chosen and its licence recorded
  // in ASSET_LICENSES.md. Do not load remote fonts at render time without a licence entry.
  family: {
    display: '"Inter", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif',
    body: '"Inter", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace',
  },
  // Sizes in px for a 1920×1080 frame.
  size: {
    caption: 28,
    body: 40,
    subtitle: 56,
    title: 96,
    hero: 144,
  },
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    tight: 1.05,
    normal: 1.3,
    relaxed: 1.5,
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.12em",
  },
} as const;

/** 8-px spacing scale. */
export const space = {
  xs: 8,
  sm: 16,
  md: 32,
  lg: 64,
  xl: 96,
  xxl: 160,
} as const;

/**
 * Layout guides for a 1920×1080 frame.
 * Action-safe ≈ 93% and title-safe ≈ 90% (common broadcast convention);
 * YouTube overlays (progress bar, end screens) also cover the edges.
 */
export const layout = {
  actionSafe: { x: 67, y: 38 },
  titleSafe: { x: 96, y: 54 },
  radius: { sm: 8, md: 16, lg: 32, pill: 999 },
  stroke: { hairline: 2, thin: 4, regular: 6, bold: 10 },
} as const;

/** Motion timing in frames at 30 fps. */
export const motion = {
  duration: {
    instant: 4,
    fast: 8,
    normal: 15,
    slow: 24,
    gentle: 36,
  },
  stagger: {
    tight: 3,
    normal: 5,
    loose: 9,
  },
} as const;

export const tokens = {
  colors,
  seriesAccent,
  typography,
  space,
  layout,
  motion,
};
export type Tokens = typeof tokens;
