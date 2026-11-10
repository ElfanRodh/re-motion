import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PopupSceneWrapperProps {
  children: React.ReactNode;
  durationInFrames: number;
}

export const PopupSceneWrapper: React.FC<PopupSceneWrapperProps> = ({
  children,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy Pop-in Spring at start of scene
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });

  const enterScale = interpolate(enterSpring, [0, 1], [0.9, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Snappy energetic exit pop at last 10 frames of scene
  const exitFrames = 10;
  const exitStart = Math.max(0, durationInFrames - exitFrames);
  const exitProgress = Math.max(0, frame - exitStart) / exitFrames;

  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.03], {
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(exitProgress, [0, 0.85, 1], [1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${enterScale * exitScale})`,
        opacity: Math.min(enterOpacity, exitOpacity),
      }}
    >
      {children}
    </div>
  );
};

