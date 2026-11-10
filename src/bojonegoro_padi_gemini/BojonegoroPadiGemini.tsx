import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  C,
  FPS,
  SCENES,
  TOTAL_SEC,
  sceneIndexAt,
} from "./theme";
import {
  EditorialWipes,
  PopUpCaptions,
  TimeContext,
} from "./common";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2MapJatim } from "./scenes/Scene2MapJatim";
import { Scene3Klasemen } from "./scenes/Scene3Klasemen";
import { Scene4Beras } from "./scenes/Scene4Beras";
import { Scene5Outro } from "./scenes/Scene5Outro";

const SCENE_COMPONENTS = [
  Scene1Hook,
  Scene2MapJatim,
  Scene3Klasemen,
  Scene4Beras,
  Scene5Outro,
];

export const BojonegoroPadiGemini: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const idx = sceneIndexAt(t);
  const SceneComponent = SCENE_COMPONENTS[idx];
  const s = SCENES[idx];

  // Gerak dorong kamera per-scene halus dan sinematik
  const local = (t - s.start) / (s.end - s.start);
  const zoom = 1 + local * 0.022;

  // Background music volume dengan ducking & fade out
  const bgmVol = interpolate(
    t,
    [0, 1.5, TOTAL_SEC - 3, TOTAL_SEC],
    [0, 0.16, 0.16, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <TimeContext.Provider value={t}>
      <AbsoluteFill
        style={{
          background: C.cream,
          overflow: "hidden",
          fontFamily:
            '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Konten Scene dengan Zoom Kamera Halus */}
        <AbsoluteFill
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "50% 60%",
          }}
        >
          <SceneComponent />
        </AbsoluteFill>

        {/* Dynamic Karaoke Captions di Safe Zone Bawah */}
        <PopUpCaptions />

        {/* Transisi Layar Halus Antar Scene */}
        <EditorialWipes />

        {/* Audio Tracks: Voice Over & Backsound */}
        <Sequence from={0}>
          <Audio src={staticFile("vo_audio.mp3")} volume={1.0} />
          <Audio src={staticFile("bgm-bojonegoro.mp3")} volume={bgmVol} />
        </Sequence>
      </AbsoluteFill>
    </TimeContext.Provider>
  );
};
