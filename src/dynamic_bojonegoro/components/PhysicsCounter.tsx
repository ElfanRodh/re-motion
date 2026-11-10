import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PhysicsCounterProps {
  target: number;
  durationInFrames?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  goldShimmerOnFinish?: boolean;
}

export const PhysicsCounter: React.FC<PhysicsCounterProps> = ({
  target,
  durationInFrames = 65,
  delay = 8,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
  goldShimmerOnFinish = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame - delay, [0, durationInFrames], [0, 1], {
    easing: Easing.out(Easing.exp),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crisp finish pop (1.06 -> 1.0) right as counter reaches target
  const finishPop = spring({
    frame: frame - (delay + durationInFrames - 6),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.7 },
  });

  const popScale = interpolate(finishPop, [0, 0.5, 1], [1, 1.06, 1]);
  const isJustFinished =
    frame >= delay + durationInFrames - 6 && frame <= delay + durationInFrames + 22;

  const currentVal = target * progress;
  const formattedVal = currentVal.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${popScale})`,
        fontVariantNumeric: "tabular-nums",
        color: isJustFinished && goldShimmerOnFinish ? "#FDE047" : undefined,
        ...style,
      }}
    >
      {prefix}
      {formattedVal}
      {suffix}
    </span>
  );
};
