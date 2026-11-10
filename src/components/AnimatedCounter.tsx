import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Props {
  targetValue: number;
  durationFrames?: number;
  delayFrames?: number;
  decimals?: number;
  unit?: string;
}

export const AnimatedCounter: React.FC<Props> = ({
  targetValue,
  durationFrames = 45,
  delayFrames = 0,
  decimals = 0,
  unit = "",
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - delayFrames);

  const rawValue = interpolate(activeFrame, [0, durationFrames], [0, targetValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const formatted =
    decimals > 0
      ? rawValue.toFixed(decimals).replace(".", ",")
      : Math.round(rawValue).toLocaleString("id-ID");

  return (
    <span>
      {formatted}
      {unit ? ` ${unit}` : ""}
    </span>
  );
};

