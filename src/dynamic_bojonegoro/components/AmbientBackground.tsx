import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

export const AmbientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const speed = 60 / fps;
  const t = frame * speed;

  // Parallax shifts for architectural background planes
  const shiftX1 = Math.sin(t / 60) * 28;
  const shiftY1 = Math.cos(t / 60) * 20;
  const shiftX2 = Math.cos(t / 55) * 24;
  const shiftY2 = Math.sin(t / 55) * 18;

  // Ambient glow positions
  const glowX1 = 26 + Math.sin(t / 60) * 14;
  const glowY1 = 22 + Math.cos(t / 60) * 12;
  const glowX2 = 74 + Math.cos(t / 60) * 14;
  const glowY2 = 72 + Math.sin(t / 60) * 12;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#071324",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Layered Architectural Flat Vector Planes with Subtle Parallax */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(${shiftX1}, ${shiftY1})`}>
          <polygon points="-120,0 740,0 380,1920 -120,1920" fill="#0A192F" />
        </g>
        <g transform={`translate(${shiftX2}, ${shiftY2})`}>
          <polygon points="560,0 1200,0 1200,1920 220,1920" fill="#0B1D36" opacity={0.75} />
        </g>
        {/* Crisp Editorial Corner Framing Accents */}
        <path d="M 36,110 L 36,36 L 110,36" stroke="#1E3A5F" strokeWidth="3" fill="none" />
        <path d="M 1044,110 L 1044,36 L 970,36" stroke="#1E3A5F" strokeWidth="3" fill="none" />
      </svg>

      {/* Soft Ambient Radial Glows (Gold & Cyan) */}
      <div
        style={{
          position: "absolute",
          left: `${glowX1}%`,
          top: `${glowY1}%`,
          width: 760,
          height: 760,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${glowX2}%`,
          top: `${glowY2}%`,
          width: 820,
          height: 820,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.11) 0%, transparent 68%)",
        }}
      />

      {/* Precision Dot-Matrix Architectural Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(56, 189, 248, 0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
          opacity: 0.45,
        }}
      />

      {/* 20 Pointed Vector Rice Grain & 4-Point Diamond Particles Floating Upward */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        {new Array(20).fill(0).map((_, i) => {
          const xBase = random(`grain-x-${i}`) * 1040 + 20;
          const pSpeed = (0.45 + random(`grain-sp-${i}`) * 0.55) * speed;
          const yOffset = random(`grain-y-${i}`) * 1920;
          const yPos = 1960 - ((frame * pSpeed + yOffset) % 2020);
          const swayX = Math.sin(t / 24 + i * 1.7) * 14;
          const rot = i * 28 + t * 0.4;
          const scale = 0.75 + random(`grain-sc-${i}`) * 0.65;
          const alpha = 0.18 + (Math.sin(t / 20 + i) + 1) * 0.18;
          const isGrain = i % 3 !== 0;

          return (
            <g
              key={i}
              transform={`translate(${xBase + swayX}, ${yPos}) rotate(${rot}) scale(${scale})`}
              opacity={alpha}
            >
              {isGrain ? (
                /* Pointed Rice Husk Vector Silhouette */
                <g>
                  <path
                    d="M 0,-9 C 4,-4.5 4,4.5 0,9 C -4,4.5 -4,-4.5 0,-9 Z"
                    fill="#F59E0B"
                  />
                  <path
                    d="M 0,-9 C 2,-4.5 2,4.5 0,9 Z"
                    fill="#FDE047"
                  />
                </g>
              ) : (
                /* 4-Point Geometric Sparkle Vector */
                <polygon
                  points="0,-8 2.2,-2.2 8,0 2.2,2.2 0,8 -2.2,2.2 -8,0 -2.2,-2.2"
                  fill="#38BDF8"
                />
              )}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
