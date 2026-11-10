import React from "react";
import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";

import { Scene1HookPadi } from "./scenes/Scene1HookPadi";
import { Scene2PetaJatim } from "./scenes/Scene2PetaJatim";
import { Scene3TraktorKlasemen } from "./scenes/Scene3TraktorKlasemen";
import { Scene4PabrikBeras } from "./scenes/Scene4PabrikBeras";
import { Scene5ApresiasiOutro } from "./scenes/Scene5ApresiasiOutro";
import { KaraokeSubtitles } from "./components/KaraokeSubtitles";

export interface BojonegoroJuaraPadiProps {
  provinsi?: string;
  kabupaten?: string;
  totalGabahNasional?: string;
  produksiBojonegoro?: number;
  berasBojonegoro?: number;
}

export const BojonegoroJuaraPadi: React.FC<BojonegoroJuaraPadiProps> = () => {
  const { fps } = useVideoConfig();
  const sec = (s: number) => Math.round(s * fps);

  // Durasi transisi antar-scene sesuai Master Prompt (18 frames)
  const transFrames = 18;

  // Durasi kompensasi TransitionSeries agar setiap scene mulai persis di detik 0s, 8s, 20s, 33s, 44s
  const d1 = sec(8) + transFrames;   // Scene 1: 00:00 - 00:08
  const d2 = sec(12) + transFrames;  // Scene 2: 00:08 - 00:20
  const d3 = sec(13) + transFrames;  // Scene 3: 00:20 - 00:33
  const d4 = sec(11) + transFrames;  // Scene 4: 00:33 - 00:44
  const d5 = sec(16);                // Scene 5: 00:44 - 01:00

  const springConfig = { damping: 16, stiffness: 120 };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#071324",
        color: "#FFFFFF",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Track Audio Voice Over */}
      <Audio src={staticFile("vo_audio.mp3")} volume={1.0} />

      {/* 2. Track Musik Latar Instrumental */}
      <Audio src={staticFile("bgm-bojonegoro.mp3")} volume={0.16} loop />

      {/* 3. TransitionSeries Antar 5 Scene (00:08, 00:20, 00:33, 00:44) */}
      <TransitionSeries>
        {/* Scene 1 (00:00 - 00:08): Hook & Data BPS */}
        <TransitionSeries.Sequence durationInFrames={d1}>
          <Scene1HookPadi durationInFrames={d1} />
        </TransitionSeries.Sequence>

        {/* Transisi 1 -> 2 (00:08): Slide from-bottom (18 frames) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: springConfig, durationInFrames: transFrames })}
        />

        {/* Scene 2 (00:08 - 00:20): Peta Jatim & 4 Besar Provinsi Nasional */}
        <TransitionSeries.Sequence durationInFrames={d2}>
          <Scene2PetaJatim durationInFrames={d2} />
        </TransitionSeries.Sequence>

        {/* Transisi 2 -> 3 (00:20): Smooth Fade (18 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: springConfig, durationInFrames: transFrames })}
        />

        {/* Scene 3 (00:20 - 00:33): Bojonegoro Juara 1 Jatim, Traktor Panen & Klasemen */}
        <TransitionSeries.Sequence durationInFrames={d3}>
          <Scene3TraktorKlasemen durationInFrames={d3} />
        </TransitionSeries.Sequence>

        {/* Transisi 3 -> 4 (00:33): Slide from-bottom (18 frames) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: springConfig, durationInFrames: transFrames })}
        />

        {/* Scene 4 (00:33 - 00:44): Konversi Beras Konsumsi & Pabrik Modern */}
        <TransitionSeries.Sequence durationInFrames={d4}>
          <Scene4PabrikBeras durationInFrames={d4} />
        </TransitionSeries.Sequence>

        {/* Transisi 4 -> 5 (00:44): Smooth Fade (18 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: springConfig, durationInFrames: transFrames })}
        />

        {/* Scene 5 (00:44 - 01:00): Apresiasi Petani, Medali Juara & CTA Interaktif */}
        <TransitionSeries.Sequence durationInFrames={d5}>
          <Scene5ApresiasiOutro durationInFrames={d5} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* 4. Subtitle Karaoke Dinamis Sinkron Voiceover */}
      <KaraokeSubtitles />
    </AbsoluteFill>
  );
};
