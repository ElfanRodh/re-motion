import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from "remotion";
import { Scene1Hook } from "./components/Scene1Hook";
import { Scene2Jatim } from "./components/Scene2Jatim";
import { Scene3Bojonegoro } from "./components/Scene3Bojonegoro";
import { Scene4Beras } from "./components/Scene4Beras";
import { Scene5Outro } from "./components/Scene5Outro";
import { ReelsOverlay } from "./components/common/ReelsOverlay";

export interface VideoBojonegoroProps {
  provinsi?: string;
  kabupaten?: string;
  totalGabahNasional?: string;
  produksiBojonegoro?: number;
  berasBojonegoro?: number;
}

export const VideoBojonegoro: React.FC<VideoBojonegoroProps> = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0077B6", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
      {/* Track Audio Voice Over */}
      <Audio src={staticFile("vo_audio.mp3")} volume={1.0} />

      {/* Track Musik Latar Instrumental */}
      <Audio src={staticFile("bgm-bojonegoro.mp3")} volume={0.15} loop />

      {/* 00:00 - 00:08: Hook & Pembuka */}
      <Sequence from={0} durationInFrames={8 * fps}>
        <Scene1Hook />
      </Sequence>

      {/* 00:08 - 00:20: Data Jatim Juara 1 & Peta Jawa Timur */}
      <Sequence from={8 * fps} durationInFrames={12 * fps}>
        <Scene2Jatim />
      </Sequence>

      {/* 00:20 - 00:33: Bojonegoro Peringkat 1 Jatim */}
      <Sequence from={20 * fps} durationInFrames={13 * fps}>
        <Scene3Bojonegoro />
      </Sequence>

      {/* 00:33 - 00:44: Konversi Beras Konsumsi */}
      <Sequence from={33 * fps} durationInFrames={11 * fps}>
        <Scene4Beras />
      </Sequence>

      {/* 00:44 - 01:00: Apresiasi & Call to Action */}
      <Sequence from={44 * fps} durationInFrames={16 * fps}>
        <Scene5Outro />
      </Sequence>

      {/* Clean Flat Subtitles */}
      <ReelsOverlay />
    </AbsoluteFill>
  );
};
