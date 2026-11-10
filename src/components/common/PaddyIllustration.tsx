import React from "react";

interface PaddyStalkProps {
  width?: number;
  height?: number;
  swayDeg?: number;
  grainColor?: string;
  stemColor?: string;
  leafColor?: string;
  flip?: boolean;
}

/**
 * Anatomically accurate flat vector illustration of a mature rice panicle (Malai Padi / Oryza sativa):
 * - Arching culm & rachis (main stem)
 * - Two slender lancet-shaped flag leaves (daun bendera)
 * - Alternating pairs of pointed boat-shaped rice spikelets/grains (bulir gabah) along the drooping panicle
 */
export const PaddyStalk: React.FC<PaddyStalkProps> = ({
  width = 90,
  height = 180,
  swayDeg = 0,
  grainColor = "#F5B700",
  stemColor = "#D99B00",
  leafColor = "#2E8B57",
  flip = false,
}) => {
  // Pointed rice grain (bulir gabah) local path: 16px long, 6.5px wide pointed hull
  const grainPath = "M 0,-9 C 3.8,-4.5 3.8,4.5 0,9 C -3.8,4.5 -3.8,-4.5 0,-9 Z";

  // Positions along the arching panicle curve from base of head to drooping tip
  const grains = [
    { x: 42, y: 88, rot: -28, scale: 0.9 },
    { x: 52, y: 92, rot: 35, scale: 0.9 },
    { x: 45, y: 74, rot: -22, scale: 0.98 },
    { x: 56, y: 78, rot: 42, scale: 0.98 },
    { x: 49, y: 60, rot: -15, scale: 1.05 },
    { x: 61, y: 65, rot: 48, scale: 1.05 },
    { x: 55, y: 47, rot: -5, scale: 1.05 },
    { x: 67, y: 54, rot: 56, scale: 1.05 },
    { x: 63, y: 36, rot: 12, scale: 1.0 },
    { x: 74, y: 45, rot: 66, scale: 1.0 },
    { x: 72, y: 28, rot: 32, scale: 0.95 },
    { x: 81, y: 38, rot: 76, scale: 0.95 },
    { x: 82, y: 26, rot: 58, scale: 0.9 }, // Terminal tip grain
  ];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 190"
      fill="none"
      style={{
        transform: `scaleX(${flip ? -1 : 1}) rotate(${swayDeg}deg)`,
        transformOrigin: "40px 185px",
        overflow: "visible",
      }}
    >
      {/* Left Flag Leaf (Daun Padi Kiri) */}
      <path
        d="M 40 175 Q 22 140 8 108 Q 26 128 41 158 Z"
        fill={leafColor}
      />

      {/* Right Flag Leaf (Daun Padi Kanan) */}
      <path
        d="M 41 168 Q 62 135 80 112 Q 58 130 42 152 Z"
        fill={leafColor}
      />

      {/* Main Culm & Arching Panicle Axis (Batang & Tangkai Malai) */}
      <path
        d="M 40 188 L 41 110 Q 43 60 78 28"
        stroke={stemColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Individual Pointed Rice Grains (Bulir-Bulir Gabah Padi) */}
      {grains.map((g, i) => (
        <g
          key={i}
          transform={`translate(${g.x}, ${g.y}) rotate(${g.rot}) scale(${g.scale})`}
        >
          {/* Short pedicel twig */}
          <line x1="0" y1="8" x2="0" y2="12" stroke={stemColor} strokeWidth="1.6" />
          {/* Rice husk body */}
          <path d={grainPath} fill={grainColor} stroke={stemColor} strokeWidth="1.2" />
          {/* Subtle lemma inner rib */}
          <line x1="0" y1="-6" x2="0" y2="6" stroke={stemColor} strokeWidth="0.8" opacity="0.55" />
          {/* Tiny awn tip */}
          <line x1="0" y1="-9" x2="0" y2="-11.5" stroke={grainColor} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
};

/**
 * Compact Flat Paddy Icon for Badges & Headers (Pair of crossed golden rice panicles)
 */
export const PaddyIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = "#F5B700",
}) => {
  const grain = "M 0,-6 C 2.6,-3 2.6,3 0,6 C -2.6,3 -2.6,-3 0,-6 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Stem */}
      <path d="M 24 44 L 24 12" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Left & Right Flag Leaves */}
      <path d="M 24 40 Q 12 32 8 22 Q 18 28 24 35 Z" fill={color} />
      <path d="M 24 40 Q 36 32 40 22 Q 30 28 24 35 Z" fill={color} />
      {/* 3 Pairs of Rice Grains + Top Tip Grain */}
      <g transform="translate(17, 25) rotate(-32)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(31, 25) rotate(32)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(17, 16) rotate(-28)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(31, 16) rotate(28)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(24, 8)">
        <path d={grain} fill={color} />
      </g>
    </svg>
  );
};

/**
 * Horizontal row of swaying realistic paddy stalks for scene foregrounds
 */
export const PaddyFieldRow: React.FC<{ frame: number; count?: number }> = ({
  frame,
  count = 14,
}) => {
  const items = Array.from({ length: count }).map((_, i) => ({
    id: i,
    delay: i * 0.4,
    flip: i % 3 === 1,
    scale: 0.88 + (i % 3) * 0.08,
  }));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        height: 150,
        padding: "0 12px",
        overflow: "hidden",
      }}
    >
      {items.map((item) => {
        const sway = Math.sin((frame * 0.06 + item.delay) * Math.PI) * 5;
        return (
          <div
            key={item.id}
            style={{
              transform: `scale(${item.scale})`,
              transformOrigin: "bottom center",
            }}
          >
            <PaddyStalk
              width={74}
              height={145}
              swayDeg={sway}
              flip={item.flip}
              grainColor="#F5B700"
              stemColor="#C88A00"
              leafColor="#1E6F5C"
            />
          </div>
        );
      })}
    </div>
  );
};

