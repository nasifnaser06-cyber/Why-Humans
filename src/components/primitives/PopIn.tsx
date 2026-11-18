import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs, type SpringName } from "../../animation";

export interface PopInProps {
  children: React.ReactNode;
  delay?: number;
  preset?: SpringName;
  style?: React.CSSProperties;
}

/** Scale an element in with a named spring preset. */
export const PopIn: React.FC<PopInProps> = ({
  children,
  delay = 0,
  preset = "lively",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: springs[preset] });
  return (
    <div
      style={{
        transform: `scale(${s})`,
        opacity: Math.min(1, s * 2),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
