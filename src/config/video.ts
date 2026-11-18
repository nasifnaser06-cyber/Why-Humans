/**
 * Global video format. Every episode composition uses these values unless an
 * approved Stage 2/3 decision says otherwise.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** Convert seconds to a whole number of frames at the project frame rate. */
export const seconds = (s: number, fps: number = VIDEO.fps): number =>
  Math.round(s * fps);
