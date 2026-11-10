import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export type CharacterPose = "hero" | "presenter";

interface BojonegoroCharacterProps {
  pose?: CharacterPose;
  size?: "md" | "lg" | "xl" | "hero";
  isSpeaking?: boolean;
  entranceDelay?: number;
  flipHorizontal?: boolean;
  accentColor?: string;
  badgeText?: string;
  badgeIcon?: string;
  showNameplate?: boolean;
  nameplateTitle?: string;
  nameplateSubtitle?: string;
}

/**
 * Exact speech intervals (in seconds) detected from voice-over.mpeg via ffmpeg silencedetect
 */
export const VOICEOVER_SPEECH_INTERVALS: Array<[number, number]> = [
  [0.05, 2.28],
  [2.79, 6.83],
  [7.31, 11.63],
  [12.30, 20.78],
  [21.22, 23.96],
  [24.36, 27.23],
  [27.54, 33.80],
  [34.28, 41.93],
  [42.37, 47.12],
  [47.58, 49.24],
  [49.70, 51.72],
  [52.09, 53.15],
];

export const isVoiceoverSpeakingAtSecond = (sec: number): boolean => {
  return VOICEOVER_SPEECH_INTERVALS.some(([start, end]) => sec >= start && sec <= end);
};

export const BojonegoroCharacter: React.FC<BojonegoroCharacterProps> = ({
  pose = "hero",
  size = "xl",
  isSpeaking = true,
  entranceDelay = 0,
  flipHorizontal = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - entranceDelay);
  const talkPulse = isSpeaking ? Math.abs(Math.sin((frame / 4) * Math.PI)) * 0.012 : 0;

  const dimensions = {
    md: { width: 360, height: 440 },
    lg: { width: 440, height: 530 },
    xl: { width: 540, height: 640 },
    hero: { width: 620, height: 720 },
  }[size];

  const imgSrc =
    pose === "presenter"
      ? staticFile("karakter-pria-presenter.png")
      : staticFile("karakter-pria-hero.png");

  return (
    <div
      style={{
        position: "relative",
        width: dimensions.width,
        height: dimensions.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(activeFrame, [0, 0.35 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(activeFrame, [0, 0.45 * fps], [0.88, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(activeFrame, [0, 0.45 * fps], ["0px 40px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {/* Clean Flat Solid Circle Backdrop (No Borders, No Dashed Rings, No Blur) */}
      <div
        style={{
          position: "absolute",
          width: dimensions.width * 0.68,
          height: dimensions.width * 0.68,
          borderRadius: "50%",
          backgroundColor: "#005A8D",
        }}
      />

      {/* Character Cutout */}
      <Img
        src={imgSrc}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          scale: `${flipHorizontal ? -(1 - talkPulse * 0.5) : 1 - talkPulse * 0.5} ${1 + talkPulse}`,
          transformOrigin: "bottom center",
          zIndex: 10,
        }}
      />
    </div>
  );
};
