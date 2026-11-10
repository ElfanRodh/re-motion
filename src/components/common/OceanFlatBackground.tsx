import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Subtle Flat Animated Ocean-Blue Background
 * Provides gentle geometric motion, drifting micro-patterns, and subtle twinkling accents
 * on every frame so the background never feels static or empty.
 */
export const OceanFlatBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous slow diagonal drift for the subtle dot pattern
  const driftX = (frame * 0.4) % 64;
  const driftY = (frame * 0.3) % 64;

  // Subtle breathing scale for flat corner geometric rings
  const ringPulse1 = 1 + Math.sin(frame * 0.04) * 0.035;
  const ringPulse2 = 1 + Math.cos(frame * 0.035) * 0.04;

  // Deterministic flat twinkling micro-accents (kelip-kelip halus)
  const sparkles = [
    { x: 92, y: 180, period: 36, phase: 0, size: 14 },
    { x: 980, y: 240, period: 42, phase: 10, size: 16 },
    { x: 140, y: 680, period: 30, phase: 5, size: 12 },
    { x: 940, y: 740, period: 38, phase: 18, size: 15 },
    { x: 80, y: 1220, period: 44, phase: 22, size: 14 },
    { x: 990, y: 1280, period: 34, phase: 12, size: 16 },
    { x: 160, y: 1640, period: 40, phase: 7, size: 13 },
    { x: 910, y: 1600, period: 32, phase: 25, size: 15 },
    { x: 540, y: 420, period: 46, phase: 14, size: 12 },
    { x: 520, y: 1060, period: 38, phase: 3, size: 14 },
  ];

  // Subtle rising flat rice-grain silhouettes in the background
  const floatingGrains = [
    { x: 65, baseY: 1800, speed: 1.4, rot: -25 },
    { x: 220, baseY: 1400, speed: 1.1, rot: 20 },
    { x: 860, baseY: 1650, speed: 1.3, rot: -18 },
    { x: 1015, baseY: 1150, speed: 1.5, rot: 28 },
    { x: 120, baseY: 850, speed: 1.2, rot: -15 },
    { x: 955, baseY: 520, speed: 1.35, rot: 22 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0077B6",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* 1. Flat Geometric Topographic Rings (Top-Right & Bottom-Left) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(1020, 120) scale(${ringPulse1})`}>
          <circle r="220" fill="#006DA8" />
          <circle r="340" fill="none" stroke="#0084C7" strokeWidth="3" />
          <circle r="460" fill="none" stroke="#0084C7" strokeWidth="2" strokeDasharray="14 14" />
        </g>

        <g transform={`translate(60, 1780) scale(${ringPulse2})`}>
          <circle r="260" fill="#006DA8" />
          <circle r="390" fill="none" stroke="#0084C7" strokeWidth="3" />
          <circle r="520" fill="none" stroke="#0084C7" strokeWidth="2" strokeDasharray="16 16" />
        </g>

        <g transform={`translate(540, 960) scale(${ringPulse1})`}>
          <circle r="620" fill="none" stroke="#0082C4" strokeWidth="2" />
          <circle r="780" fill="none" stroke="#0082C4" strokeWidth="1.5" strokeDasharray="10 18" />
        </g>
      </svg>

      {/* 2. Drifting Subtle Flat Dot Matrix */}
      <div
        style={{
          position: "absolute",
          inset: -128,
          backgroundImage: "radial-gradient(#0091DC 2.5px, transparent 2.5px)",
          backgroundSize: "64px 64px",
          transform: `translate(${driftX}px, ${driftY}px)`,
          opacity: 0.55,
        }}
      />

      {/* 3. Subtle Rising Flat Paddy Grain Shapes & Twinkling Sparkles */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        {floatingGrains.map((g, i) => {
          const y = ((g.baseY - frame * g.speed) % 1960 + 1960) % 1960 - 20;
          const swayX = g.x + Math.sin(frame * 0.04 + i) * 12;
          return (
            <g
              key={`grain-${i}`}
              transform={`translate(${swayX}, ${y}) rotate(${g.rot + Math.sin(frame * 0.03 + i) * 8})`}
              opacity={0.18}
            >
              <path d="M -14,0 C -7,-6 7,-6 14,0 C 7,6 -7,6 -14,0 Z" fill="#90E0EF" />
            </g>
          );
        })}

        {sparkles.map((s, idx) => {
          const t = (frame + s.phase) % s.period;
          const progress = t / s.period;
          const scale = 0.4 + Math.sin(progress * Math.PI) * 0.75;
          const opacity = 0.12 + Math.sin(progress * Math.PI) * 0.45;
          const half = s.size / 2;

          return (
            <g
              key={`sparkle-${idx}`}
              transform={`translate(${s.x}, ${s.y}) scale(${scale})`}
              opacity={opacity}
            >
              <path
                d={`M 0,${-half} L ${half * 0.3},${-half * 0.3} L ${half},0 L ${half * 0.3},${half * 0.3} L 0,${half} L ${-half * 0.3},${half * 0.3} L ${-half},0 L ${-half * 0.3},${-half * 0.3} Z`}
                fill={idx % 2 === 0 ? "#FFD100" : "#90E0EF"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

