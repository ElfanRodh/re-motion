import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DynamicStatCardProps {
  index: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "navy" | "gold" | "cyan" | "emerald";
  shimmerInterval?: number;
  accentBar?: boolean;
}

export const DynamicStatCard: React.FC<DynamicStatCardProps> = ({
  index,
  children,
  style,
  variant = "navy",
  shimmerInterval = 120,
  accentBar = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameDelay = index * (fps >= 60 ? 7 : 4);

  // Staggered spring entrance
  const entrance = spring({
    frame: frame - frameDelay,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.85 },
  });

  // Continuous gentle breathing float
  const floatY = Math.sin((frame + index * 15) / 25) * 3;

  // Crisp diagonal light band sweep every shimmerInterval frames
  const shimmerFrame = (frame + index * 22) % shimmerInterval;
  const shimmerPos = interpolate(shimmerFrame, [0, fps * 0.75], [-120, 240], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]) + (entrance >= 0.92 ? floatY : 0);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const theme = {
    navy: {
      bg: "rgba(17, 38, 70, 0.90)",
      border: "rgba(56, 189, 248, 0.28)",
      lip: "#06101F",
      topAccent: "#38BDF8",
    },
    cyan: {
      bg: "rgba(15, 42, 78, 0.92)",
      border: "rgba(56, 189, 248, 0.55)",
      lip: "#07162C",
      topAccent: "#38BDF8",
    },
    gold: {
      bg: "rgba(20, 39, 68, 0.94)",
      border: "rgba(245, 158, 11, 0.65)",
      lip: "#081326",
      topAccent: "#F59E0B",
    },
    emerald: {
      bg: "rgba(14, 43, 64, 0.92)",
      border: "rgba(16, 185, 129, 0.55)",
      lip: "#061524",
      topAccent: "#10B981",
    },
  }[variant];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        backgroundColor: theme.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `2px solid ${theme.border}`,
        borderRadius: 20,
        boxShadow: `0 8px 0 ${theme.lip}, 0 16px 32px rgba(0, 0, 0, 0.35)`,
        ...style,
      }}
    >
      {/* Top Crisp Editorial Accent Strip */}
      {accentBar && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: theme.topAccent,
            opacity: 0.9,
          }}
        />
      )}

      {/* Clean Geometric Shimmer Sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${shimmerPos}%`,
          width: "28%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.09) 45%, rgba(255, 255, 255, 0.14) 50%, rgba(255, 255, 255, 0.09) 55%, transparent 100%)",
          transform: "skewX(-22deg)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      {children}
    </div>
  );
};
