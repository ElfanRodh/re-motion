import React from "react";
import { Composition } from "remotion";
import { BojonegoroPadiGemini } from "./bojonegoro_padi_gemini/BojonegoroPadiGemini";
import { TOTAL_FRAMES as TOTAL_FRAMES_GEMINI } from "./bojonegoro_padi_gemini/theme";
import { VideoBojonegoro } from "./VideoBojonegoro";
import { FlatVectorBojonegoro } from "./flatvector/FlatVectorBojonegoro";
import { BojonegoroJuaraPadi } from "./dynamic_bojonegoro/BojonegoroJuaraPadi";
import { ElegantBojonegoro } from "./elegan/ElegantBojonegoro";
import { ElegantNoCharBojonegoro } from "./elegan_nochar/ElegantNoCharBojonegoro";
import { TOTAL_FRAMES } from "./elegan/theme";
import { MainVideo } from "./compositions/MainVideo";
import { VideoConfigSchema, calculateTotalFrames } from "./types/schema";
import { sampleLandscapeVideo, sampleShortsVideo, bojonegoroReelsVideo } from "./compositions/sampleData";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Komposisi Baru: BojonegoroPadiGemini (Flat Vector Editorial + Karakter Elegan & Profesional, Tanpa Indikator Atas) */}
      <Composition
        id="BojonegoroPadiGemini"
        component={BojonegoroPadiGemini}
        durationInFrames={TOTAL_FRAMES_GEMINI}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition id="ElegantBojonegoro" component={ElegantBojonegoro} durationInFrames={TOTAL_FRAMES} fps={30} width={1080} height={1920} />

      {/* Versi Baru: Flat Vector Editorial Murni Tanpa Karakter & Subtitle Dinamis */}
      <Composition
        id="BojonegoroTanpaKarakter"
        component={ElegantNoCharBojonegoro}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BojonegoroEditorialNoChar"
        component={ElegantNoCharBojonegoro}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Komposisi Baru Dinamis & Sinematik Sesuai Panduan Master Prompt (60 detik @ 60 fps = 3600 frames) */}
      <Composition
        id="BojonegoroJuaraPadi"
        component={BojonegoroJuaraPadi}
        durationInFrames={60 * 60} // 60 detik @ 60 fps = 3600 frames
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{
          provinsi: "Jawa Timur",
          kabupaten: "Bojonegoro",
          totalGabahNasional: "57,45 Juta Ton",
          produksiBojonegoro: 868808,
          berasBojonegoro: 501670,
        }}
      />

      {/* Alias MainComposition sesuai baris 269 perintah_remotion_video_bojonegoro.md */}
      <Composition
        id="MainComposition"
        component={BojonegoroJuaraPadi}
        durationInFrames={60 * 60}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{
          provinsi: "Jawa Timur",
          kabupaten: "Bojonegoro",
          totalGabahNasional: "57,45 Juta Ton",
          produksiBojonegoro: 868808,
          berasBojonegoro: 501670,
        }}
      />

      {/* Komposisi Utama Sesuai Guide: ReelsPadiBojonegoro (60 detik @ 30 fps = 1800 frames) */}
      <Composition
        id="ReelsPadiBojonegoro"
        component={VideoBojonegoro}
        durationInFrames={30 * 60} // 60 detik @ 30 fps = 1800 frames
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          provinsi: "Jawa Timur",
          kabupaten: "Bojonegoro",
          totalGabahNasional: "57,45 Juta Ton",
          produksiBojonegoro: 868808, // ton GKG
          berasBojonegoro: 501670,    // ton beras
        }}
      />

      {/* Alias Komposisi BojonegoroReels */}
      <Composition
        id="BojonegoroReels"
        component={VideoBojonegoro}
        durationInFrames={30 * 60}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          provinsi: "Jawa Timur",
          kabupaten: "Bojonegoro",
          totalGabahNasional: "57,45 Juta Ton",
          produksiBojonegoro: 868808,
          berasBojonegoro: 501670,
        }}
      />

      {/* Komposisi Baru: Flat Vector Animation Studio (60 detik @ 30 fps = 1800 frames) */}
      <Composition
        id="FlatVectorBojonegoro"
        component={FlatVectorBojonegoro}
        durationInFrames={30 * 60}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          provinsi: "Jawa Timur",
          kabupaten: "Bojonegoro",
          totalGabahNasional: "57,45 Juta Ton",
          produksiBojonegoro: 868808,
          berasBojonegoro: 501670,
        }}
      />

      {/* 9:16 Shorts/Reels Composition (JSON-Driven Generator) */}
      <Composition
        id="MainVideoShorts"
        component={MainVideo}
        durationInFrames={calculateTotalFrames(sampleShortsVideo.scenes)}
        fps={30}
        width={1080}
        height={1920}
        schema={VideoConfigSchema}
        defaultProps={sampleShortsVideo}
        calculateMetadata={({ props }) => ({
          durationInFrames: calculateTotalFrames(props.scenes),
          fps: props.fps || 30,
          width: props.width || 1080,
          height: props.height || 1920,
        })}
      />

      {/* 16:9 Landscape Composition (1920x1080 @ 30 FPS) */}
      <Composition
        id="MainVideoLandscape"
        component={MainVideo}
        durationInFrames={calculateTotalFrames(sampleLandscapeVideo.scenes)}
        fps={30}
        width={1920}
        height={1080}
        schema={VideoConfigSchema}
        defaultProps={sampleLandscapeVideo}
        calculateMetadata={({ props }) => ({
          durationInFrames: calculateTotalFrames(props.scenes),
          fps: props.fps || 30,
          width: props.width || 1920,
          height: props.height || 1080,
        })}
      />
    </>
  );
};
