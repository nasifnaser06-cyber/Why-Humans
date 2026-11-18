/**
 * Helpers for SVG line drawing ("write-on") effects.
 *
 * Usage: give a path `pathLength={1}` and set
 * `strokeDasharray={1}` + `strokeDashoffset={drawOffset(t)}`
 * where t is 0→1 progress. Using pathLength=1 avoids measuring paths.
 */
export const drawOffset = (t: number): number =>
  1 - Math.min(1, Math.max(0, t));

/** Points on a circle — handy for orbiting/radial layouts. */
export const polar = (
  cx: number,
  cy: number,
  r: number,
  angleRad: number,
): { x: number; y: number } => ({
  x: cx + r * Math.cos(angleRad),
  y: cy + r * Math.sin(angleRad),
});

/** Deterministic pseudo-random in [0,1) from a seed. Use instead of Math.random(). */
export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
