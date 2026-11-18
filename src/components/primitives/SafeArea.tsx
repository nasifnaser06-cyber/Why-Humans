import React from "react";
import { AbsoluteFill } from "remotion";
import { useFrameLayout } from "../../design/layout";

/**
 * Constrains children to the safe area of the current format
 * (16:9 title-safe, or the 9:16 Shorts safe zone).
 */
export const SafeArea: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const { safe } = useFrameLayout();
  return (
    <AbsoluteFill
      style={{
        paddingTop: safe.top,
        paddingRight: safe.right,
        paddingBottom: safe.bottom,
        paddingLeft: safe.left,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
