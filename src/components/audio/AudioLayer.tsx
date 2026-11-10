import React from "react";
import { Audio, interpolate, useCurrentFrame, staticFile } from "remotion";
import { AudioConfig } from "../../types/schema";

interface AudioLayerProps {
  audio?: AudioConfig;
  totalDurationInFrames: number;
}

const resolveAudioSrc = (src?: string) => {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  const clean = src.startsWith("/") ? src.slice(1) : src;
  try {
    return staticFile(clean);
  } catch {
    return src;
  }
};

export const AudioLayer: React.FC<AudioLayerProps> = ({ audio, totalDurationInFrames }) => {
  const frame = useCurrentFrame();

  if (!audio) return null;

  const { bgmUrl, bgmVolume = 0.35, voiceoverUrl, voiceoverVolume = 1.0, fadeInFrames = 15, fadeOutFrames = 30 } = audio;

  // Calculate BGM volume with Fade-In and Fade-Out
  const fadeOutStart = Math.max(0, totalDurationInFrames - fadeOutFrames);

  const calculatedBgmVolume = interpolate(frame, [0, fadeInFrames, fadeOutStart, totalDurationInFrames], [0, bgmVolume, bgmVolume, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const resolvedBgm = resolveAudioSrc(bgmUrl);
  const resolvedVoiceover = resolveAudioSrc(voiceoverUrl);

  return (
    <>
      {/* Background Music Layer */}
      {resolvedBgm && <Audio src={resolvedBgm} volume={calculatedBgmVolume} loop />}

      {/* Voiceover Layer */}
      {resolvedVoiceover && <Audio src={resolvedVoiceover} volume={voiceoverVolume} />}
    </>
  );
};

