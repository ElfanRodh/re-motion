import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AmbientBackground } from "./AmbientBackground";

export interface DynamicCameraWrapperProps {
  sceneDuration: number;
  children: React.ReactNode;
  maxScale?: number;
}

export const DynamicCameraWrapper: React.FC<DynamicCameraWrapperProps> = ({
  sceneDuration,
  children,
  maxScale = 1.035,
}) => {
  const frame = useCurrentFrame();

  // Slow, smooth cinematic push-in
  const cameraScale = interpolate(frame, [0, sceneDuration], [1, maxScale], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#071324", overflow: "hidden" }}>
      {/* Dynamic ambient particles & gradients */}
      <AmbientBackground />

      {/* Main Scene Content under cinematic camera push */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

