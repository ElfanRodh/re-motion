import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PopBurstProps {
  x?: number | string;
  y?: number | string;
  delay?: number;
  color?: string;
  count?: number;
  radius?: number;
  size?: number;
}

/**
 * Energetic Flat Vector Pop Burst
 * Shoots sharp geometric diamond particles outward with elastic spring physics.
 */
export const PopBurst: React.FC<PopBurstProps> = ({
  x = "50%",
  y = "50%",
  delay = 0,
  color = "#F59E0B",
  count = 8,
  radius = 90,
  size = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - delay);
  if (activeFrame <= 0) return null;

  const spr = spring({
    frame: activeFrame,
    fps,
    config: { damping: 11, stiffness: 180, mass: 0.5 },
  });

  const dist = interpolate(spr, [0, 1], [10, radius]);
  const scale = interpolate(spr, [0, 0.4, 1], [0.2, 1.25, 0]);
  const opacity = interpolate(spr, [0, 0.2, 0.7, 1], [0, 1, 0.9, 0]);

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <svg
        width={radius * 2 + 40}
        height={radius * 2 + 40}
        viewBox={`${-radius - 20} ${-radius - 20} ${radius * 2 + 40} ${radius * 2 + 40}`}
        style={{ overflow: "visible" }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i * 360) / count;
          const rad = (angle * Math.PI) / 180;
          const px = Math.cos(rad) * dist;
          const py = Math.sin(rad) * dist;

          return (
            <g
              key={i}
              transform={`translate(${px}, ${py}) rotate(${angle + 45}) scale(${scale})`}
              opacity={opacity}
            >
              {/* Flat Geometric Diamond Spark */}
              <polygon
                points={`0,${-size} ${size * 0.7},0 0,${size} ${-size * 0.7},0`}
                fill={i % 2 === 0 ? color : "#FDE047"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

interface ShockwaveRingProps {
  x?: number | string;
  y?: number | string;
  delay?: number;
  color?: string;
  maxRadius?: number;
  strokeWidth?: number;
}

export const ShockwaveRing: React.FC<ShockwaveRingProps> = ({
  x = "50%",
  y = "50%",
  delay = 0,
  color = "#F59E0B",
  maxRadius = 120,
  strokeWidth = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - delay);
  if (activeFrame <= 0) return null;

  const spr = spring({
    frame: activeFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  const r = interpolate(spr, [0, 1], [0, maxRadius]);
  const opacity = interpolate(spr, [0, 0.3, 1], [0.9, 0.8, 0]);

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 35,
      }}
    >
      <svg
        width={maxRadius * 2 + 20}
        height={maxRadius * 2 + 20}
        viewBox={`${-maxRadius - 10} ${-maxRadius - 10} ${maxRadius * 2 + 20} ${maxRadius * 2 + 20}`}
      >
        <circle r={r} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      </svg>
    </div>
  );
};

