import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../../design/tokens";

/** Default full-frame background: a soft radial gradient on the base ink colour. */
export const Backdrop: React.FC<{ glow?: string }> = ({
  glow = colors.bg.raised,
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${glow} 0%, ${colors.bg.base} 55%, ${colors.bg.deep} 100%)`,
    }}
  />
);
