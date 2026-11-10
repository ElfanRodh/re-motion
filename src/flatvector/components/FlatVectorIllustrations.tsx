import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Editorial Flat Vector Graphic Assets
 * Strictly adheres to Flat Vector art direction:
 * - 2-3 flat value planes per object (highlight plane, base mass, shadow mass)
 * - Almost no outlines, zero faux 3D gradients, clean silhouette masses
 */

interface EditorialSunProps {
  size?: number;
  rotationSpeed?: number;
}

export const EditorialSun: React.FC<EditorialSunProps> = ({ size = 260, rotationSpeed = 0.3 }) => {
  const frame = useCurrentFrame();
  const rot = frame * rotationSpeed;

  return (
    <svg width={size} height={size} viewBox="-130 -130 260 260" style={{ overflow: "visible" }}>
      {/* Outer Rotating Ray Petals */}
      <g transform={`rotate(${rot})`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <path
              key={i}
              d="M -14,-75 L 0,-125 L 14,-75 Z"
              fill="#F59E0B"
              opacity={0.7}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>

      {/* Mid Disc: Golden Ochre Base */}
      <circle r="72" fill="#F59E0B" />

      {/* Shadow Mass (Flat Split Crescent) */}
      <path d="M 0,-72 A 72 72 0 0 1 0,72 A 72 72 0 0 0 0,-72 Z" fill="#D97706" />

      {/* Inner Light Plane (Sunlit Crest) */}
      <circle cx="-12" cy="-12" r="44" fill="#FDE047" />
    </svg>
  );
};

interface EditorialTerracesProps {
  width?: number;
  height?: number;
  progress?: number;
}

export const EditorialRiceTerraces: React.FC<EditorialTerracesProps> = ({
  width = 980,
  height = 240,
  progress = 1,
}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 4;

  return (
    <svg width={width} height={height} viewBox="0 0 980 240" style={{ overflow: "hidden" }}>
      {/* Background Distant Rolling Hill (Dark Indigo) */}
      <path d="M 0,160 Q 240,80 500,120 T 980,100 L 980,240 L 0,240 Z" fill="#064E3B" />

      {/* Midground Emerald Terrace (Base Green Mass) */}
      <path d="M 0,175 Q 300,110 620,150 T 980,135 L 980,240 L 0,240 Z" fill="#047857" />

      {/* Foreground Golden Terraced Fields (3-Tone Flat Value Planes) */}
      <path d="M 0,200 Q 220,150 480,180 T 980,160 L 980,240 L 0,240 Z" fill="#B45309" />
      <path d="M 0,210 Q 260,170 540,195 T 980,178 L 980,240 L 0,240 Z" fill="#D97706" />
      <path d="M 0,222 Q 320,190 640,210 T 980,196 L 980,240 L 0,240 Z" fill="#F59E0B" />

      {/* Stylized Rice Stalk Silhouettes across the terrace ledge */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 30 + i * 52;
        const y = 190 + Math.sin(i * 0.8) * 16;
        const s = sway * (i % 2 === 0 ? 1 : -0.8);
        return (
          <g key={i} transform={`translate(${x}, ${y}) rotate(${s})`}>
            {/* Culm (Stem) */}
            <path d="M 0,0 Q 4,-24 10,-48" stroke="#FDE047" strokeWidth="2.5" fill="none" />
            {/* Drooping Grains (Flat Diamond Masses) */}
            <path d="M 8,-42 L 14,-46 L 16,-40 L 10,-36 Z" fill="#FDE047" />
            <path d="M 12,-34 L 18,-38 L 20,-32 L 14,-28 Z" fill="#F59E0B" />
            <path d="M 6,-26 L 12,-30 L 14,-24 L 8,-20 Z" fill="#FDE047" />
            {/* Flag Leaf */}
            <path d="M 2,-16 Q -12,-22 -16,-34 Q -10,-24 2,-12 Z" fill="#10B981" />
          </g>
        );
      })}
    </svg>
  );
};

interface EditorialHarvesterProps {
  width?: number;
  height?: number;
}

export const EditorialHarvester: React.FC<EditorialHarvesterProps> = ({
  width = 380,
  height = 200,
}) => {
  const frame = useCurrentFrame();
  const wheelRot = (frame * 6) % 360;
  const reelRot = (frame * 8) % 360;

  return (
    <svg width={width} height={height} viewBox="0 0 380 200" style={{ overflow: "visible" }}>
      {/* Ground Shadow Mass */}
      <ellipse cx="190" cy="184" rx="170" ry="12" fill="#061222" opacity={0.6} />

      {/* Main Combine Body (Flat Teal / Emerald with Shadow Cutout) */}
      {/* Base Mass */}
      <polygon points="90,140 280,140 295,95 240,60 140,60 90,110" fill="#047857" />
      {/* Shadow Mass (Lower body) */}
      <polygon points="90,140 280,140 285,120 100,120" fill="#064E3B" />
      {/* Light Plane (Top hood) */}
      <polygon points="140,60 240,60 230,75 145,75" fill="#10B981" />

      {/* Operator Cabin (Crisp geometric glass planes) */}
      <polygon points="195,60 250,60 245,100 185,100" fill="#0284C7" />
      <polygon points="215,60 250,60 245,100 210,100" fill="#38BDF8" opacity={0.7} />

      {/* Grain Tank & Unloading Auger */}
      <polygon points="120,50 175,50 165,70 125,70" fill="#D97706" />
      <line x1="145" y1="50" x2="90" y2="25" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
      <line x1="90" y1="25" x2="70" y2="35" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />

      {/* Cutter Bar & Header Reel (Front Left) */}
      <polygon points="40,165 95,140 100,160 45,175" fill="#475569" />
      <g transform="translate(42, 155)">
        <circle r="22" fill="#334155" />
        <g transform={`rotate(${reelRot})`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-20"
              x2="0"
              y2="20"
              stroke="#F59E0B"
              strokeWidth="3.5"
              transform={`rotate(${(i * 360) / 5})`}
            />
          ))}
        </g>
        <circle r="7" fill="#F8FAFC" />
      </g>

      {/* Rear Small Wheel (Right) */}
      <g transform="translate(250, 155)">
        <circle r="26" fill="#1E293B" />
        <circle r="16" fill="#475569" />
        <g transform={`rotate(${wheelRot})`}>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#F8FAFC" strokeWidth="3" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#F8FAFC" strokeWidth="3" />
        </g>
      </g>

      {/* Front Large Drive Wheel (Left-Center) */}
      <g transform="translate(145, 145)">
        <circle r="40" fill="#0F172A" />
        {/* Shadow Tread Rim */}
        <circle r="34" fill="#1E293B" />
        <circle r="22" fill="#F59E0B" />
        <circle r="12" fill="#D97706" />
        <g transform={`rotate(${wheelRot})`}>
          <circle cx="0" cy="-16" r="3" fill="#FFFFFF" />
          <circle cx="16" cy="0" r="3" fill="#FFFFFF" />
          <circle cx="0" cy="16" r="3" fill="#FFFFFF" />
          <circle cx="-16" cy="0" r="3" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  );
};

interface EditorialMillingPlantProps {
  width?: number;
  height?: number;
}

export const EditorialMillingPlant: React.FC<EditorialMillingPlantProps> = ({
  width = 960,
  height = 280,
}) => {
  const frame = useCurrentFrame();
  const conveyorOffset = (frame * 4) % 36;

  return (
    <svg width={width} height={height} viewBox="0 0 960 280" style={{ overflow: "hidden" }}>
      {/* Concrete Facility Floor (2-Tone Flat Plane) */}
      <rect x="0" y="240" width="960" height="40" fill="#0A182D" />
      <rect x="0" y="235" width="960" height="5" fill="#1E3A8A" />

      {/* 1. Grain Silo (Left Mass - 3 Flat Value Planes: Cylindrical Simulation without Gradients) */}
      <g transform="translate(60, 20)">
        {/* Left Shaded Plane */}
        <rect x="0" y="40" width="55" height="175" fill="#1E293B" />
        {/* Center Base Plane */}
        <rect x="55" y="40" width="70" height="175" fill="#334155" />
        {/* Right Highlight Plane */}
        <rect x="125" y="40" width="55" height="175" fill="#475569" />
        {/* Silo Dome Roof */}
        <path d="M 0,40 Q 90,-20 180,40 Z" fill="#64748B" />
        {/* Silo Hopper Cone (Bottom) */}
        <polygon points="0,215 180,215 110,240 70,240" fill="#0F172A" />
        {/* Silo Label Badge */}
        <rect x="35" y="80" width="110" height="28" rx="6" fill="#F59E0B" />
        <text x="90" y="99" fill="#0F172A" fontSize="13" fontWeight="900" textAnchor="middle">
          SILO GABAH
        </text>
      </g>

      {/* 2. Precision Processing Unit / Hulling Unit (Center) */}
      <g transform="translate(320, 60)">
        {/* Main Processing Housing */}
        <rect x="0" y="30" width="300" height="145" rx="10" fill="#152E52" />
        <rect x="0" y="145" width="300" height="30" rx="4" fill="#0C1B33" />
        <rect x="20" y="15" width="260" height="15" fill="#0284C7" />

        {/* Observation Glass / Window with Animated Milled Grains */}
        <rect x="30" y="50" width="240" height="75" rx="8" fill="#0B1C33" />

        {/* Separator / Milling Blade Vectors */}
        <g transform="translate(150, 87)">
          <circle r="26" fill="#1E3A8A" />
          <circle r="18" fill="#0284C7" />
          <path
            d="M -16,-6 L 16,-6 L 8,6 L -8,6 Z"
            fill="#FDE047"
            transform={`rotate(${(frame * 9) % 360})`}
          />
        </g>

        {/* Status Indicators */}
        <rect x="40" y="152" width="70" height="16" rx="4" fill="#059669" />
        <text x="75" y="164" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">
          PENGGILINGAN
        </text>

        <rect x="120" y="152" width="80" height="16" rx="4" fill="#F59E0B" />
        <text x="160" y="164" fill="#000000" fontSize="10" fontWeight="900" textAnchor="middle">
          57,74% RENDEMEN
        </text>
      </g>

      {/* 3. Output Packaging & Sacks (Right Mass) */}
      <g transform="translate(680, 100)">
        {/* Conveyor Belt */}
        <rect x="0" y="130" width="240" height="18" rx="6" fill="#1E293B" />
        {/* Belt Teeth Motion */}
        <g transform={`translate(${conveyorOffset}, 0)`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={i * 32} y="132" width="14" height="14" rx="2" fill="#475569" />
          ))}
        </g>

        {/* Clean Flat Rice Bags on Conveyor */}
        <g transform="translate(30, 45)">
          <path d="M 0,15 C 0,5 5,0 20,0 C 35,0 40,5 40,15 L 42,75 L -2,75 Z" fill="#F8FAFC" />
          <polygon points="-2,75 42,75 38,85 2,85" fill="#E2E8F0" />
          <rect x="6" y="24" width="28" height="14" rx="3" fill="#F59E0B" />
          <text x="20" y="34" fill="#0C1B33" fontSize="8" fontWeight="900" textAnchor="middle">
            BERAS
          </text>
        </g>

        <g transform="translate(95, 45)">
          <path d="M 0,15 C 0,5 5,0 20,0 C 35,0 40,5 40,15 L 42,75 L -2,75 Z" fill="#F8FAFC" />
          <polygon points="-2,75 42,75 38,85 2,85" fill="#E2E8F0" />
          <rect x="6" y="24" width="28" height="14" rx="3" fill="#F59E0B" />
          <text x="20" y="34" fill="#0C1B33" fontSize="8" fontWeight="900" textAnchor="middle">
            501K T
          </text>
        </g>

        <g transform="translate(160, 45)">
          <path d="M 0,15 C 0,5 5,0 20,0 C 35,0 40,5 40,15 L 42,75 L -2,75 Z" fill="#F8FAFC" />
          <polygon points="-2,75 42,75 38,85 2,85" fill="#E2E8F0" />
          <rect x="6" y="24" width="28" height="14" rx="3" fill="#0284C7" />
          <text x="20" y="34" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle">
            KONSUMSI
          </text>
        </g>
      </g>
    </svg>
  );
};

interface EditorialCrestProps {
  size?: number;
  badgeTitle?: string;
  badgeSubtitle?: string;
}

export const EditorialCrest: React.FC<EditorialCrestProps> = ({
  size = 180,
  badgeTitle = "#1 JAWA TIMUR",
  badgeSubtitle = "BOJONEGORO",
}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.1) * 3;

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{ overflow: "visible" }}>
      {/* Outer Wreath Laurel Leaves Left */}
      <g transform={`rotate(${sway})`}>
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = -140 + i * 16;
          return (
            <g key={`l-${i}`} transform={`rotate(${angle}) translate(0, -78)`}>
              <path d="M 0,-14 C 10,-8 10,8 0,14 C -10,8 -10,-8 0,-14 Z" fill="#F59E0B" />
              <path d="M 0,-14 C 0,-8 5,0 0,14 Z" fill="#FDE047" />
            </g>
          );
        })}
      </g>

      {/* Outer Wreath Laurel Leaves Right */}
      <g transform={`rotate(${-sway})`}>
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = 140 - i * 16;
          return (
            <g key={`r-${i}`} transform={`rotate(${angle}) translate(0, -78)`}>
              <path d="M 0,-14 C 10,-8 10,8 0,14 C -10,8 -10,-8 0,-14 Z" fill="#F59E0B" />
              <path d="M 0,-14 C -5,0 0,8 0,14 Z" fill="#D97706" />
            </g>
          );
        })}
      </g>

      {/* Central Solid Shield (2-Tone Planes) */}
      <polygon points="0,-48 42,-22 42,22 0,48 -42,22 -42,-22" fill="#0F284E" />
      <polygon points="0,-48 42,-22 42,22 0,48 0,-48" fill="#152E52" />

      {/* Golden Star / Emblem */}
      <polygon
        points="0,-24 7,-8 24,-8 11,3 16,19 0,9 -16,19 -11,3 -24,-8 -7,-8"
        fill="#FDE047"
      />
    </svg>
  );
};

