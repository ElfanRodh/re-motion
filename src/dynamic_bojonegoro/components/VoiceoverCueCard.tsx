import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface VoiceoverCueOptions {
  /** Detik (di dalam scene) saat elemen mulai muncul */
  appearAtSecond: number;
  /** Opsional: Detik saat elemen mendapat efek sorotan/zoom ketika disebut narator */
  highlightAtSecond?: number;
  /** Indeks elemen untuk variasi gerakan mengambang (idle motion) */
  index?: number;
  /** Skala tambahan saat spotlight menyala (default 0.065) */
  highlightPeakScale?: number;
}

export const useVoiceoverCue = ({
  appearAtSecond,
  highlightAtSecond,
  index = 0,
  highlightPeakScale = 0.065,
}: VoiceoverCueOptions) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearFrame = Math.round(appearAtSecond * fps);

  // 1. Animasi Masuk Tepat pada Detik Voiceover
  const entrance = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 13, stiffness: 145, mass: 0.82 },
  });

  // 2. Animasi Sorotan (Spotlight Pulse) Saat Disebut Narator
  let highlightScale = 0;
  let highlightGlow = 0;
  if (typeof highlightAtSecond === "number") {
    const hlFrame = Math.round(highlightAtSecond * fps);
    const hlProgress = spring({
      frame: frame - hlFrame,
      fps,
      config: { damping: 10, stiffness: 185, mass: 0.7 },
    });
    highlightScale = interpolate(hlProgress, [0, 0.5, 1], [0, highlightPeakScale, 0]);
    highlightGlow = interpolate(
      frame - hlFrame,
      [0, Math.round(0.22 * fps), Math.round(0.85 * fps)],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }

  // 3. Gerakan Mengambang Halus Setelah Elemen Muncul (Mencegah Layar Beku)
  const isVisible = frame >= appearFrame;
  const speed = 60 / fps;
  const idleFloatY = isVisible
    ? Math.sin(((frame - appearFrame) * speed + index * 18) / 24) * 2.5
    : 0;

  const translateY = interpolate(entrance, [0, 1], [36, 0]) + (entrance >= 0.85 ? idleFloatY : 0);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]) + highlightScale;
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return {
    entrance,
    translateY,
    scale,
    opacity,
    highlightScale,
    highlightGlow,
    isVisible,
    appearFrame,
  };
};

export interface VoiceoverCueProps extends VoiceoverCueOptions {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "navy" | "gold" | "cyan" | "emerald";
  accentBar?: boolean;
  shimmerIntervalSec?: number;
}

export const VoiceoverCueCard: React.FC<VoiceoverCueProps> = ({
  appearAtSecond,
  highlightAtSecond,
  index = 0,
  highlightPeakScale = 0.065,
  children,
  style,
  variant = "navy",
  accentBar = true,
  shimmerIntervalSec = 2.4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { translateY, scale, opacity, highlightGlow, isVisible, appearFrame } = useVoiceoverCue({
    appearAtSecond,
    highlightAtSecond,
    index,
    highlightPeakScale,
  });

  const theme = {
    navy: {
      bg: "rgba(17, 38, 70, 0.90)",
      borderRGB: "56, 189, 248",
      baseBorderAlpha: 0.28,
      lip: "#06101F",
      topAccent: "#38BDF8",
    },
    cyan: {
      bg: "rgba(15, 42, 78, 0.92)",
      borderRGB: "56, 189, 248",
      baseBorderAlpha: 0.52,
      lip: "#07162C",
      topAccent: "#38BDF8",
    },
    gold: {
      bg: "rgba(20, 39, 68, 0.94)",
      borderRGB: "245, 158, 11",
      baseBorderAlpha: 0.62,
      lip: "#081326",
      topAccent: "#F59E0B",
    },
    emerald: {
      bg: "rgba(14, 43, 64, 0.92)",
      borderRGB: "16, 185, 129",
      baseBorderAlpha: 0.52,
      lip: "#061524",
      topAccent: "#10B981",
    },
  }[variant];

  // Diagonal shimmer sweep once visible
  const shimmerPeriod = Math.max(1, Math.round(shimmerIntervalSec * fps));
  const localFrame = Math.max(0, frame - appearFrame + index * 18);
  const shimmerPos = interpolate(
    localFrame % shimmerPeriod,
    [0, Math.round(fps * 0.75)],
    [-120, 240],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // When highlighted by narrator, border turns bright amber/gold with glowing aura
  const borderColor =
    highlightGlow > 0.05
      ? `rgba(245, 158, 11, ${Math.min(1, 0.45 + highlightGlow * 0.55)})`
      : `rgba(${theme.borderRGB}, ${theme.baseBorderAlpha})`;

  const boxShadow =
    highlightGlow > 0.05
      ? `0 8px 0 ${theme.lip}, 0 0 ${Math.round(30 * highlightGlow)}px rgba(245, 158, 11, ${(
          0.65 * highlightGlow
        ).toFixed(2)}), 0 16px 32px rgba(0, 0, 0, 0.38)`
      : `0 8px 0 ${theme.lip}, 0 14px 28px rgba(0, 0, 0, 0.35)`;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        backgroundColor: theme.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 20,
        border: `2px solid ${borderColor}`,
        boxShadow,
        pointerEvents: isVisible ? "auto" : "none",
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
            backgroundColor: highlightGlow > 0.15 ? "#FDE047" : theme.topAccent,
            opacity: 0.92,
            zIndex: 6,
          }}
        />
      )}

      {/* Clean Geometric Shimmer Sweep */}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${shimmerPos}%`,
            width: "28%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.09) 45%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.09) 55%, transparent 100%)",
            transform: "skewX(-22deg)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {children}
    </div>
  );
};

