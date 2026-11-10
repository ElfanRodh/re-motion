import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Editorial Flat Vector Layered Background
 * Strictly flat-value planes (no blur, no radial gradients masquerading as lighting).
 * Uses subtle geometric parallax masses, clean angular contour bands, and subtle drifting grain.
 */
export const FlatVectorBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle slow parallax drift for background geometric bands
  const wave1 = Math.sin(frame * 0.03) * 12;
  const wave2 = Math.cos(frame * 0.025) * 16;
  const gridDrift = (frame * 0.25) % 80;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0C1B33", // Deep Editorial Indigo
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* 1. Large Crisp Geometric Sky Planes (2-3 Flat Value Bands) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Sky Base Layer Top */}
        <polygon points="0,0 1080,0 1080,480 0,620" fill="#0F284E" />

        {/* Diagonal Light Plane Accent */}
        <polygon
          points={`0,${180 + wave1} 1080,${80 - wave1} 1080,${340 - wave1} 0,${440 + wave1}`}
          fill="#13386B"
          opacity={0.45}
        />

        {/* Lower Mid-tone Polygon Mass */}
        <polygon
          points={`0,${1420 + wave2} 1080,${1280 - wave2} 1080,1920 0,1920`}
          fill="#0A182D"
        />

        {/* Bottom Silhouette Plane */}
        <polygon
          points={`0,${1720 - wave1} 1080,${1640 + wave1} 1080,1920 0,1920`}
          fill="#06101E"
        />

        {/* Floating Flat Geometric Rings in Upper Right and Lower Left */}
        <g transform="translate(940, 180)">
          <circle r="260" fill="none" stroke="#1E3A8A" strokeWidth="2" opacity={0.6} />
          <circle r="360" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="12 12" opacity={0.4} />
          <circle r="460" fill="none" stroke="#1E3A8A" strokeWidth="1" opacity={0.25} />
        </g>

        <g transform="translate(100, 1820)">
          <circle r="240" fill="none" stroke="#1E3A8A" strokeWidth="2" opacity={0.5} />
          <circle r="360" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="14 14" opacity={0.3} />
        </g>
      </svg>

      {/* 2. Editorial Precision Grid (Subtle Flat Coordinates) */}
      <div
        style={{
          position: "absolute",
          inset: -80,
          backgroundImage:
            "linear-gradient(to right, rgba(30, 58, 138, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 58, 138, 0.22) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${gridDrift}px)`,
          opacity: 0.7,
        }}
      />

      {/* 3. Restrained Editorial Grain Overlay (SVG noise filter) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <filter id="editorial-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorial-grain)" />
      </svg>
    </div>
  );
};

