import { useVideoConfig } from "remotion";
import { layout } from "./tokens";

export type Orientation = "landscape" | "portrait";

export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface FrameLayout {
  width: number;
  height: number;
  fps: number;
  orientation: Orientation;
  isPortrait: boolean;
  /**
   * Scale factor relative to a 1080 px short side. Multiply token sizes by it
   * so text and strokes keep the same physical size in 16:9 and 9:16
   * (it is 1 for both 1920×1080 and 1080×1920).
   */
  unit: number;
  /** Safe-area insets in pixels for this format. */
  safe: Insets;
  /** The safe rectangle in pixels. */
  safeBox: { x: number; y: number; width: number; height: number };
  center: { x: number; y: number };
}

/** Pure version: compute the layout for any frame size. */
export const getFrameLayout = (
  width: number,
  height: number,
  fps: number,
): FrameLayout => {
  const orientation: Orientation = height > width ? "portrait" : "landscape";
  const f = layout.safeArea[orientation];
  const safe: Insets = {
    top: Math.round(f.top * height),
    right: Math.round(f.right * width),
    bottom: Math.round(f.bottom * height),
    left: Math.round(f.left * width),
  };
  return {
    width,
    height,
    fps,
    orientation,
    isPortrait: orientation === "portrait",
    unit: Math.min(width, height) / 1080,
    safe,
    safeBox: {
      x: safe.left,
      y: safe.top,
      width: width - safe.left - safe.right,
      height: height - safe.top - safe.bottom,
    },
    center: { x: width / 2, y: height / 2 },
  };
};

/** Layout for the current composition. */
export const useFrameLayout = (): FrameLayout => {
  const { width, height, fps } = useVideoConfig();
  return getFrameLayout(width, height, fps);
};
