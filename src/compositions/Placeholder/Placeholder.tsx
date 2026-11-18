import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, DrawPath, FadeIn, PopIn, SafeArea } from "../../components";
import { colors, layout, space, typography } from "../../design/tokens";
import { fadeInOut } from "../../animation";
import { SERIES } from "../../series";
import { useFrameLayout } from "../../design/layout";

/**
 * Technical placeholder used only to verify the toolchain renders.
 * It contains no episode content and is not part of the visual identity.
 */
export const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const { safe, unit } = useFrameLayout();
  const opacity = fadeInOut(frame, 0, durationInFrames, 12, 15);

  const cx = width / 2;
  const cy = height / 2 - 200;
  const r = 120;
  const ring = `M ${cx} ${cy - r} a ${r} ${r} 0 1 1 -0.01 0`;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Backdrop />
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute" }}
      >
        <DrawPath
          d={ring}
          stroke={colors.accent.amber}
          strokeWidth={layout.stroke.bold}
          delay={6}
          duration={30}
        />
        <DrawPath
          d={`M ${cx - 56} ${cy} L ${cx + 56} ${cy}`}
          stroke={colors.text.primary}
          strokeWidth={layout.stroke.regular}
          delay={30}
          duration={15}
        />
        <DrawPath
          d={`M ${cx} ${cy - 56} L ${cx} ${cy + 56}`}
          stroke={colors.text.primary}
          strokeWidth={layout.stroke.regular}
          delay={36}
          duration={15}
        />
      </svg>

      <SafeArea
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          // 220 px in 16:9; never inside the 9:16 Shorts UI zone.
          paddingBottom: Math.max(safe.bottom, 220 * unit),
          fontFamily: typography.family.display,
          color: colors.text.primary,
          textAlign: "center",
        }}
      >
        <FadeIn delay={40}>
          <div
            style={{
              fontSize: typography.size.title,
              fontWeight: typography.weight.black,
              letterSpacing: typography.letterSpacing.wide,
            }}
          >
            WHY HUMANS
          </div>
        </FadeIn>
        <FadeIn delay={52}>
          <div
            style={{
              marginTop: space.sm,
              fontSize: typography.size.caption,
              color: colors.text.muted,
              letterSpacing: typography.letterSpacing.wide,
              textTransform: "uppercase",
            }}
          >
            Pipeline test · placeholder · not episode content
          </div>
        </FadeIn>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: space.md,
            marginTop: space.lg,
          }}
        >
          {Object.values(SERIES).map((s, i) => (
            <PopIn key={s.id} delay={64 + i * 6} preset="snappy">
              <div
                style={{
                  border: `${layout.stroke.thin}px solid ${s.accent}`,
                  color: s.accent,
                  borderRadius: layout.radius.pill,
                  padding: `${space.xs}px ${space.md}px`,
                  fontSize: typography.size.caption,
                  fontWeight: typography.weight.bold,
                  letterSpacing: typography.letterSpacing.wide,
                }}
              >
                {s.title}
              </div>
            </PopIn>
          ))}
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};
