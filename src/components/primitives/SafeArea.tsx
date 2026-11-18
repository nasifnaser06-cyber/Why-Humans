import React from "react";
import { AbsoluteFill } from "remotion";
import { layout } from "../../design/tokens";

/** Constrains children to the title-safe area of the frame. */
export const SafeArea: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      padding: `${layout.titleSafe.y}px ${layout.titleSafe.x}px`,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);
