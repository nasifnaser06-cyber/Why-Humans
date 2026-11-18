import { interpolate } from "remotion";
import { ease, type EaseName } from "./easing";

/**
 * Progress 0→1 between two frames, clamped, with a named easing.
 * The building block for most hand-authored motion.
 */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: EaseName = "out",
): number =>
  interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease[easing],
  });

/** Map 0→1 progress onto any numeric range. */
export const mix = (from: number, to: number, t: number): number =>
  from + (to - from) * t;

/** Frame at which the i-th item of a staggered group should start. */
export const staggerStart = (
  index: number,
  start: number,
  step: number,
): number => start + index * step;

/**
 * Fade in and out within a window: 0 → 1 (fadeIn frames) … 1 → 0 (fadeOut frames).
 */
export const fadeInOut = (
  frame: number,
  start: number,
  end: number,
  fadeIn: number,
  fadeOut: number = fadeIn,
): number => {
  const inT = progress(frame, start, fadeIn, "out");
  const outT = 1 - progress(frame, end - fadeOut, fadeOut, "in");
  return Math.min(inT, outT);
};
