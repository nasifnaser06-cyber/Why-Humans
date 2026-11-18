import { Easing } from "remotion";

/**
 * Named easing curves. Use these instead of ad-hoc bezier values so motion
 * feels consistent across episodes.
 */
export const ease = {
  /** General-purpose: quick start, soft landing. Default for entrances. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** For exits: gentle start, quick finish. */
  in: Easing.bezier(0.7, 0, 0.84, 0),
  /** Symmetric moves between two resting positions. */
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Very subtle drift for ambient/background motion. */
  drift: Easing.bezier(0.37, 0, 0.63, 1),
  linear: Easing.linear,
} as const;

export type EaseName = keyof typeof ease;
