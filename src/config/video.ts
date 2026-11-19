/**
 * Approved video formats. Full episodes use LANDSCAPE (the default);
 * YouTube Shorts use PORTRAIT. Every composition should pick one of these
 * rather than declaring its own dimensions.
 */
export const FORMATS = {
  /** Full episodes: 1920×1080, 16:9. */
  landscape: { width: 1920, height: 1080, fps: 30 },
  /** YouTube Shorts: 1080×1920, 9:16. */
  portrait: { width: 1080, height: 1920, fps: 30 },
} as const;

export type FormatId = keyof typeof FORMATS;

/** Default format (full episodes). Kept as `VIDEO` for existing imports. */
export const VIDEO = FORMATS.landscape;

/** Convert seconds to a whole number of frames at the project frame rate. */
export const seconds = (s: number, fps: number = VIDEO.fps): number =>
  Math.round(s * fps);
