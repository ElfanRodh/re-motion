import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from "remotion";
import { FVScene1Hook } from "./scenes/FVScene1Hook";
import { FVScene2Jatim } from "./scenes/FVScene2Jatim";
import { FVScene3Bojonegoro } from "./scenes/FVScene3Bojonegoro";
import { FVScene4Beras } from "./scenes/FVScene4Beras";
import { FVScene5Outro } from "./scenes/FVScene5Outro";
import { FlatVectorCaptions } from "./components/FlatVectorCaptions";
import { PopupSceneWrapper } from "./components/PopupSceneWrapper";

export const FlatVectorBojonegoro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0C1B33", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
      {/* Voice Over Audio */}
      <Audio src={staticFile("vo_audio.mp3")} volume={1.0} />

      {/* Background Music Audio */}
      <Audio src={staticFile("bgm-bojonegoro.mp3")} volume={0.16} loop />

      {/* 00:00 - 00:08 (0 - 240 frame): Hook & Establishing Shot */}
      <Sequence from={0} durationInFrames={8 * fps}>
        <PopupSceneWrapper durationInFrames={8 * fps}>
          <FVScene1Hook />
        </PopupSceneWrapper>
      </Sequence>

      {/* 00:08 - 00:20 (240 - 600 frame): Data Jatim Juara 1 & Peta Wilayah */}
      <Sequence from={8 * fps} durationInFrames={12 * fps}>
        <PopupSceneWrapper durationInFrames={12 * fps}>
          <FVScene2Jatim />
        </PopupSceneWrapper>
      </Sequence>

      {/* 00:20 - 00:33 (600 - 990 frame): Bojonegoro Peringkat 1 Jatim */}
      <Sequence from={20 * fps} durationInFrames={13 * fps}>
        <PopupSceneWrapper durationInFrames={13 * fps}>
          <FVScene3Bojonegoro />
        </PopupSceneWrapper>
      </Sequence>

      {/* 00:33 - 00:44 (990 - 1320 frame): Konversi Beras Konsumsi */}
      <Sequence from={33 * fps} durationInFrames={11 * fps}>
        <PopupSceneWrapper durationInFrames={11 * fps}>
          <FVScene4Beras />
        </PopupSceneWrapper>
      </Sequence>

      {/* 00:44 - 01:00 (1320 - 1800 frame): Apresiasi & Call to Action */}
      <Sequence from={44 * fps} durationInFrames={16 * fps}>
        <PopupSceneWrapper durationInFrames={16 * fps}>
          <FVScene5Outro />
        </PopupSceneWrapper>
      </Sequence>

      {/* Editorial Flat Vector Captions */}
      <FlatVectorCaptions />
    </AbsoluteFill>
  );
};
