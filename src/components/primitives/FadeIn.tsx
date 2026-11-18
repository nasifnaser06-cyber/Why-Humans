import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, mix } from "../../animation";
import type { EaseName } from "../../animation";
import { motion } from "../../design/tokens";

export interface FadeInProps {
  children: React.ReactNode;
  /** Frame (relative to the parent Sequence) at which to start. */
  delay?: number;
  duration?: number;
  /** Vertical travel in px while fading in (0 for a pure fade). */
  rise?: number;
  easing?: EaseName;
  style?: React.CSSProperties;
}

/** Fade (and optionally rise) an element into view. */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = motion.duration.normal,
  rise = 24,
  easing = "out",
  style,
}) => {
  const frame = useCurrentFrame();
  const t = progress(frame, delay, duration, easing);
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${mix(rise, 0, t)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
