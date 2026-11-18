import React from "react";
import { useCurrentFrame } from "remotion";
import { drawOffset, progress, type EaseName } from "../../animation";
import { layout, motion } from "../../design/tokens";

export interface DrawPathProps {
  d: string;
  stroke: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  easing?: EaseName;
  fill?: string;
}

/**
 * An SVG path that "draws itself" over time. Render inside an <svg>.
 */
export const DrawPath: React.FC<DrawPathProps> = ({
  d,
  stroke,
  strokeWidth = layout.stroke.regular,
  delay = 0,
  duration = motion.duration.slow,
  easing = "inOut",
  fill = "none",
}) => {
  const frame = useCurrentFrame();
  const t = progress(frame, delay, duration, easing);
  return (
    <path
      d={d}
      pathLength={1}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      strokeDasharray={1}
      strokeDashoffset={drawOffset(t)}
    />
  );
};
