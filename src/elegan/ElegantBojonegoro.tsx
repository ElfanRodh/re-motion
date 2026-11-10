import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FPS, SCENES, TOTAL_SEC, TimeCtx, sceneIndexAt } from "./theme";
import { Captions, Ground, TopBar, Wipes } from "./common";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";

const SCENE_COMPONENTS = [Scene1, Scene2, Scene3, Scene4, Scene5];

export const ElegantBojonegoro: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const idx = sceneIndexAt(t);
  const Scene = SCENE_COMPONENTS[idx];
  const s = SCENES[idx];

  // gerak kamera halus per-scene (dorong perlahan)
  const local = (t - s.start) / (s.end - s.start);
  const zoom = 1 + local * 0.025;

  const bgmVol = interpolate(t, [0, 1.5, TOTAL_SEC - 3, TOTAL_SEC], [0, 0.16, 0.16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <TimeCtx.Provider value={t}>
      <AbsoluteFill style={{ background: C.cream, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 62%" }}>
          <Scene />
        </AbsoluteFill>
        <Ground />
        <TopBar />
        <Captions />
        <Wipes />
        <Sequence from={0}>
          <Audio src={staticFile("vo_audio.mp3")} />
          <Audio src={staticFile("bgm-bojonegoro.mp3")} volume={bgmVol} />
        </Sequence>
      </AbsoluteFill>
    </TimeCtx.Provider>
  );
};

