import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * BESPOKE EDITORIAL FLAT-VECTOR ASSETS & ICONS
 * Follows strict Flat Vector art direction:
 * - 2-3 solid value planes per object (base mass, shadow plane, highlight plane)
 * - Crisp geometric construction, zero system emojis, zero blurry neon slop
 */

export const VectorPaddyBadgeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = "#071324",
}) => {
  const grain = "M 0,-5.5 C 2.4,-2.8 2.4,2.8 0,5.5 C -2.4,2.8 -2.4,-2.8 0,-5.5 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M 18 33 L 18 8" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 18 30 Q 9 24 6 16 Q 13 21 18 26 Z" fill={color} />
      <path d="M 18 30 Q 27 24 30 16 Q 23 21 18 26 Z" fill={color} />
      <g transform="translate(12.5, 19) rotate(-30)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(23.5, 19) rotate(30)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(12.5, 12) rotate(-26)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(23.5, 12) rotate(26)">
        <path d={grain} fill={color} />
      </g>
      <g transform="translate(18, 6)">
        <path d={grain} fill={color} />
      </g>
    </svg>
  );
};

export const VectorTrophyIcon: React.FC<{ size?: number; color?: string; shadeColor?: string }> = ({
  size = 26,
  color = "#071324",
  shadeColor = "#1E293B",
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Handles */}
    <path
      d="M 7 6 H 3.5 V 10 C 3.5 12.5 5.2 14.2 7.5 14.2 M 21 6 H 24.5 V 10 C 24.5 12.5 22.8 14.2 20.5 14.2"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cup Body Base */}
    <path d="M 6.5 4 H 21.5 V 11.5 C 21.5 15.6 18.1 19 14 19 C 9.9 19 6.5 15.6 6.5 11.5 V 4 Z" fill={color} />
    {/* Cup Shadow Plane */}
    <path d="M 14 4 H 21.5 V 11.5 C 21.5 15.6 18.1 19 14 19 V 4 Z" fill={shadeColor} opacity={0.25} />
    {/* Stem & Pedestal */}
    <rect x="12" y="18.5" width="4" height="5" fill={color} />
    <rect x="8" y="23" width="12" height="3" rx="1.2" fill={color} />
  </svg>
);

export const VectorCrownIcon: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 44 34" fill="none">
    {/* Base Crown Mass */}
    <polygon points="4,28 8,10 17,19 22,5 27,19 36,10 40,28" fill="#F59E0B" />
    {/* Right Side Shadow Plane */}
    <polygon points="22,5 27,19 36,10 40,28 22,28" fill="#D97706" />
    {/* Left Highlight Facet */}
    <polygon points="22,5 17,19 22,28" fill="#FDE047" />
    {/* Crown Tips */}
    <circle cx="8" cy="8" r="3" fill="#FDE047" />
    <circle cx="22" cy="4" r="3.5" fill="#FDE047" />
    <circle cx="36" cy="8" r="3" fill="#F59E0B" />
    {/* Bottom Rim Bar */}
    <rect x="4" y="28" width="36" height="5" rx="2" fill="#B45309" />
    <rect x="4" y="28" width="18" height="5" rx="2" fill="#D97706" />
  </svg>
);

export const VectorTractorBadgeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = "#071324",
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M 6 18 L 6 11 L 12 11 L 14 6 L 22 6 L 23 18 Z" fill={color} />
    <polygon points="15,8 20.5,8 21,12 14.5,12" fill="#F59E0B" />
    <circle cx="9" cy="19.5" r="4" fill={color} />
    <circle cx="9" cy="19.5" r="1.6" fill="#F59E0B" />
    <circle cx="19.5" cy="18.5" r="5" fill={color} />
    <circle cx="19.5" cy="18.5" r="2" fill="#F59E0B" />
  </svg>
);

export const VectorRiceMillIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = "#071324",
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Silo */}
    <path d="M 3 10 Q 8 4 13 10 V 24 H 3 Z" fill={color} />
    {/* Factory Roof */}
    <polygon points="14,24 14,12 19,8 19,12 25,8 25,24" fill={color} />
    <rect x="5" y="13" width="6" height="3" rx="1" fill="#10B981" />
    <rect x="16.5" y="16" width="6" height="4" rx="1" fill="#10B981" />
  </svg>
);

export const VectorShieldRibbonIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = "#071324",
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path
      d="M 14 3 L 5 6.8 V 13.5 C 5 19.2 8.8 24.3 14 26 C 19.2 24.3 23 19.2 23 13.5 V 6.8 L 14 3 Z"
      fill={color}
    />
    <polygon
      points="14,8 15.8,11.8 20,12.3 16.9,15.1 17.7,19.2 14,17.1 10.3,19.2 11.1,15.1 8,12.3 12.2,11.8"
      fill="#F59E0B"
    />
  </svg>
);

export const VectorCommentBubbleIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Back Bubble Shadow Mass */}
    <path
      d="M 10 10 H 40 C 42.2 10 44 11.8 44 14 V 32 C 44 34.2 42.2 36 40 36 H 20 L 11 43 V 36 H 10 C 7.8 36 6 34.2 6 32 V 14 C 6 11.8 7.8 10 10 10 Z"
      fill="#071324"
      transform="translate(2, 3)"
    />
    {/* Main Bubble Plane */}
    <path
      d="M 10 8 H 38 C 40.2 8 42 9.8 42 12 V 30 C 42 32.2 40.2 34 38 34 H 18 L 9 41 V 34 H 10 C 7.8 34 6 32.2 6 30 V 12 C 6 9.8 7.8 8 10 8 Z"
      fill="#FFFFFF"
    />
    {/* Highlight Top Strip */}
    <path d="M 10 8 H 38 C 40.2 8 42 9.8 42 12 V 15 H 6 V 12 C 6 9.8 7.8 8 10 8 Z" fill="#E2E8F0" />
    {/* Conversation Lines */}
    <rect x="13" y="17" width="22" height="3.5" rx="1.75" fill="#071324" />
    <rect x="13" y="23.5" width="15" height="3.5" rx="1.75" fill="#F59E0B" />
  </svg>
);

export const VectorShareArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = "#F59E0B",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M 14 5 L 21 12 L 14 19 V 14.5 C 8 14.5 4.5 16.5 2 20 C 3.2 13.5 6.8 9.5 14 9.5 V 5 Z"
      fill={color}
    />
  </svg>
);

/**
 * Detailed Flat-Vector Rice Panicle (Malai Padi) with Arching Stem, Lancet Leaves, and 13 Pointed Spikelets
 */
export const DetailedPaddyStalk: React.FC<{
  width?: number;
  height?: number;
  swayDeg?: number;
  scaleY?: number;
  cutProgress?: number; // 0 = standing, 1 = harvested/cut
  flip?: boolean;
}> = ({
  width = 76,
  height = 150,
  swayDeg = 0,
  scaleY = 1,
  cutProgress = 0,
  flip = false,
}) => {
  const grainPath = "M 0,-8 C 3.4,-4 3.4,4 0,8 C -3.4,4 -3.4,-4 0,-8 Z";
  const grains = [
    { x: 42, y: 88, rot: -28, s: 0.88, tone: "#F59E0B" },
    { x: 52, y: 92, rot: 35, s: 0.88, tone: "#D97706" },
    { x: 45, y: 74, rot: -22, s: 0.96, tone: "#FDE047" },
    { x: 56, y: 78, rot: 42, s: 0.96, tone: "#F59E0B" },
    { x: 49, y: 60, rot: -15, s: 1.02, tone: "#FDE047" },
    { x: 61, y: 65, rot: 48, s: 1.02, tone: "#F59E0B" },
    { x: 55, y: 47, rot: -5, s: 1.02, tone: "#FDE047" },
    { x: 67, y: 54, rot: 56, s: 1.02, tone: "#D97706" },
    { x: 63, y: 36, rot: 12, s: 0.98, tone: "#FDE047" },
    { x: 74, y: 45, rot: 66, s: 0.98, tone: "#F59E0B" },
    { x: 72, y: 28, rot: 32, s: 0.92, tone: "#FDE047" },
    { x: 81, y: 38, rot: 76, s: 0.92, tone: "#D97706" },
    { x: 82, y: 26, rot: 58, s: 0.88, tone: "#FDE047" },
  ];

  // When harvested by combine, top panicle tilts & drops while base stubble remains
  const cutTilt = cutProgress * 65;
  const cutDropY = cutProgress * 45;
  const topOpacity = 1 - cutProgress * 0.85;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 190"
      fill="none"
      style={{
        transform: `scaleX(${flip ? -1 : 1}) scaleY(${scaleY}) rotate(${swayDeg}deg)`,
        transformOrigin: "40px 185px",
        overflow: "visible",
      }}
    >
      {/* Short Remaining Stubble Base when cut */}
      <line x1="40" y1="188" x2="40" y2="152" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />

      {/* Upper Stalk & Panicle Head */}
      <g
        transform={`translate(0, ${cutDropY}) rotate(${cutTilt}, 40, 152)`}
        opacity={topOpacity}
      >
        {/* Left & Right Flag Leaves (2-Tone Emerald) */}
        <path d="M 40 175 Q 22 140 8 108 Q 26 128 41 158 Z" fill="#059669" />
        <path d="M 41 168 Q 62 135 80 112 Q 58 130 42 152 Z" fill="#10B981" />

        {/* Main Arching Rachis Stem */}
        <path
          d="M 40 160 L 41 110 Q 43 60 78 28"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 13 Pointed Rice Spikelets */}
        {grains.map((g, i) => (
          <g key={i} transform={`translate(${g.x}, ${g.y}) rotate(${g.rot}) scale(${g.s})`}>
            <line x1="0" y1="7" x2="0" y2="11" stroke="#D97706" strokeWidth="1.5" />
            <path d={grainPath} fill={g.tone} />
          </g>
        ))}
      </g>
    </svg>
  );
};

