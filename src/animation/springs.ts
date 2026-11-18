import type { SpringConfig } from "remotion";

/** Named spring presets for `spring()` from remotion. */
export const springs = {
  /** Calm, no overshoot. Default for UI-like elements and text. */
  smooth: { damping: 200, mass: 1, stiffness: 100 },
  /** Slight overshoot; good for characters and icons popping in. */
  lively: { damping: 14, mass: 0.8, stiffness: 120 },
  /** Fast and crisp; for small accents. */
  snappy: { damping: 20, mass: 0.5, stiffness: 200 },
  /** Heavy and slow; for large objects or camera-like moves. */
  heavy: { damping: 30, mass: 2, stiffness: 80 },
} satisfies Record<string, Partial<SpringConfig>>;

export type SpringName = keyof typeof springs;
