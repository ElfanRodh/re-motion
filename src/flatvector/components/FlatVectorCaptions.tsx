import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SubtitleSegment {
  id: string;
  startSec: number;
  endSec: number;
  text: string;
  position: "bottom" | "top" | "center" | "mid-stage";
  variant?: "gold" | "cyan";
  highlightWords: string[];
}

export const SUBTITLE_SEGMENTS: SubtitleSegment[] = [
  // Scene 1: Hook & Data BPS (0.0s - 8.0s)
  {
    id: "s1-hook",
    startSec: 0.0,
    endSec: 2.5,
    text: "BUMI ANGLING DARMA MENCETAK SEJARAH!",
    position: "center",
    variant: "gold",
    highlightWords: ["ANGLING", "DARMA", "SEJARAH!"],
  },
  {
    id: "s1-bps-1",
    startSec: 2.5,
    endSec: 4.8,
    text: "RILIS DATA RESMI BPS",
    position: "bottom",
    variant: "cyan",
    highlightWords: ["BPS"],
  },
  {
    id: "s1-bps-2",
    startSec: 4.8,
    endSec: 7.1,
    text: "PER 2 NOVEMBER 2026 MENCATAT:",
    position: "bottom",
    variant: "gold",
    highlightWords: ["2", "NOVEMBER", "2026"],
  },

  // Scene 2: Jatim Juara 1 & Peta Wilayah (7.1s - 20.0s)
  {
    id: "s2-bojo-lead",
    startSec: 7.1,
    endSec: 9.5,
    text: "KABUPATEN BOJONEGORO",
    position: "mid-stage", // Floating over the Java Sea above the map!
    variant: "gold",
    highlightWords: ["BOJONEGORO"],
  },
  {
    id: "s2-bojo-rank",
    startSec: 9.5,
    endSec: 12.0,
    text: "PENGHASIL PADI NOMOR SATU JAWA TIMUR!",
    position: "bottom",
    variant: "gold",
    highlightWords: ["NOMOR", "SATU", "JAWA", "TIMUR!"],
  },
  {
    id: "s2-jatim-national-1",
    startSec: 12.0,
    endSec: 14.2,
    text: "JAWA TIMUR KEMBALI KOKOH",
    position: "bottom",
    variant: "cyan",
    highlightWords: ["JAWA", "TIMUR"],
  },
  {
    id: "s2-jatim-national-2",
    startSec: 14.2,
    endSec: 16.5,
    text: "PRODUSEN PADI TERBESAR DI INDONESIA",
    position: "bottom",
    variant: "gold",
    highlightWords: ["TERBESAR", "INDONESIA"],
  },
  {
    id: "s2-jatim-total",
    startSec: 16.5,
    endSec: 21.0,
    text: "TOTAL 10,61 JUTA TON GABAH KERING GILING",
    position: "bottom",
    variant: "gold",
    highlightWords: ["10,61", "JUTA", "TON"],
  },

  // Scene 3: Bojonegoro Juara 1 Jatim & Panen (21.0s - 33.0s)
  {
    id: "s3-penopang",
    startSec: 21.0,
    endSec: 24.2,
    text: "DAN PENOPANG TERBESARNYA ADA DI BOJONEGORO!",
    position: "mid-stage", // Floating over the sky above the combine harvester!
    variant: "gold",
    highlightWords: ["PENOPANG", "BOJONEGORO!"],
  },
  {
    id: "s3-luas-panen",
    startSec: 24.2,
    endSec: 27.4,
    text: "DENGAN LUAS PANEN 159 RIBU HEKTAR",
    position: "bottom",
    variant: "cyan",
    highlightWords: ["159", "RIBU", "HEKTAR"],
  },
  {
    id: "s3-memimpin",
    startSec: 27.4,
    endSec: 30.5,
    text: "BOJONEGORO MEMIMPIN DI PUNCAK",
    position: "bottom",
    variant: "gold",
    highlightWords: ["BOJONEGORO", "PUNCAK"],
  },
  {
    id: "s3-gabah-total",
    startSec: 30.5,
    endSec: 34.0,
    text: "TOREHAN 868.808 TON GABAH KERING GILING!",
    position: "bottom",
    variant: "gold",
    highlightWords: ["868.808", "TON"],
  },

  // Scene 4: Konversi Beras Konsumsi (34.0s - 44.0s)
  {
    id: "s4-konversi",
    startSec: 34.0,
    endSec: 37.8,
    text: "DIKONVERSI JADI BERAS SIAP KONSUMSI",
    position: "mid-stage", // Floating above the milling machinery!
    variant: "cyan",
    highlightWords: ["BERAS", "KONSUMSI"],
  },
  {
    id: "s4-suplai-1",
    startSec: 37.8,
    endSec: 40.2,
    text: "BOJONEGORO MENYUPLAI LEBIH DARI",
    position: "bottom",
    variant: "gold",
    highlightWords: ["BOJONEGORO"],
  },
  {
    id: "s4-suplai-2",
    startSec: 40.2,
    endSec: 42.4,
    text: "501 RIBU TON BERAS KEBUTUHAN PANGAN",
    position: "bottom",
    variant: "gold",
    highlightWords: ["501", "RIBU", "TON"],
  },

  // Scene 5: Outro, Apresiasi & Interaktif CTA (44.0s - 60.0s)
  {
    id: "s5-bukti-nyata",
    startSec: 42.4,
    endSec: 45.0,
    text: "BUKTI NYATA KERJA KERAS PETANI",
    position: "bottom",
    variant: "cyan",
    highlightWords: ["PETANI"],
  },
  {
    id: "s5-sinergi",
    startSec: 45.0,
    endSec: 47.4,
    text: "SINERGI PEMERINTAH MENJAGA KEDAULATAN PANGAN",
    position: "bottom",
    variant: "gold",
    highlightWords: ["KEDAULATAN", "PANGAN"],
  },
  {
    id: "s5-matur-nuwun",
    startSec: 47.4,
    endSec: 49.5,
    text: "MATUR NUWUN PETANI BOJONEGORO!",
    position: "center", // Massive center tribute across the screen!
    variant: "gold",
    highlightWords: ["MATUR", "NUWUN", "PETANI", "BOJONEGORO!"],
  },
  {
    id: "s5-bangga",
    startSec: 49.5,
    endSec: 51.5,
    text: "WONG BOJONEGORO, BANGGA NGGAK NIH?",
    position: "bottom",
    variant: "cyan",
    highlightWords: ["BANGGA"],
  },
  {
    id: "s5-komentar",
    startSec: 51.5,
    endSec: 54.0,
    text: "TULIS DI KOLOM KOMENTAR!",
    position: "bottom",
    variant: "gold",
    highlightWords: ["KOMENTAR!"],
  },
];

export const FlatVectorCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentSec = frame / fps;
  const isVertical = height > width;

  // Find active subtitle segment
  const activeSegment = SUBTITLE_SEGMENTS.find(
    (s) => currentSec >= s.startSec && currentSec < s.endSec
  );

  if (!activeSegment) {
    return null;
  }

  const { startSec, endSec, text, position, variant = "gold", highlightWords } = activeSegment;
  const words = text.split(" ");
  const durationSec = endSec - startSec;

  // Words appear sequentially across the first 80% of segment duration
  // leaving the completed phrase clearly visible for comfortable reading
  const pacingBudgetSec = durationSec * 0.8;
  const timePerWord = words.length > 1 ? pacingBudgetSec / words.length : 0;

  // Dynamic positioning across screen zones
  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case "center":
        return {
          top: "48%",
          transform: "translateY(-50%)",
        };
      case "mid-stage":
        return {
          top: isVertical ? 540 : 260,
        };
      case "top":
        return {
          top: isVertical ? 80 : 36,
        };
      case "bottom":
      default:
        return {
          bottom: isVertical ? 72 : 36,
        };
    }
  };

  const isCenter = position === "center";
  const fontSize = isCenter
    ? isVertical
      ? 56
      : 36
    : isVertical
      ? words.length <= 4
        ? 52
        : 46
      : 28;

  return (
    <div
      style={{
        position: "absolute",
        left: isVertical ? 40 : 30,
        right: isVertical ? 40 : 30,
        ...getPositionStyle(),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* 
        NO WRAPPER BOX, NO OUTER STROKE!
        Completely flat typography floating cleanly over the video.
      */}
      <div
        style={{
          width: "100%",
          maxWidth: 1020,
          backgroundColor: "transparent",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: isVertical ? "10px 14px" : "6px 10px",
        }}
      >
        {words.map((word, i) => {
          const wordAppearTime = startSec + i * timePerWord;
          const isSpoken = currentSec >= wordAppearTime;

          if (!isSpoken) {
            // Word hasn't arrived yet -> pops into view only when audio cue hits
            return null;
          }

          // Snappy spring pop bounce for each word
          const wordElapsedFrames = Math.max(0, (currentSec - wordAppearTime) * fps);
          const popSpring = spring({
            frame: wordElapsedFrames,
            fps,
            config: {
              damping: 9,
              stiffness: 270,
              mass: 0.45,
            },
          });

          // Determine active (latest popped) word
          const nextWordAppearTime = startSec + (i + 1) * timePerWord;
          const isCurrentWord =
            i === words.length - 1
              ? currentSec >= wordAppearTime
              : currentSec >= wordAppearTime && currentSec < nextWordAppearTime;

          const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
          const isKeyword = highlightWords.some(
            (hw) => hw.replace(/[^\w]/g, "").toLowerCase() === cleanWord
          );

          // Pop-in scale and elastic displacement
          const scale = interpolate(popSpring, [0, 1], [0.35, 1]);
          const translateY = interpolate(popSpring, [0, 1], [22, 0]);

          // Highlighted words get a flat wrapping badge; regular words remain bare pure text!
          if (isKeyword) {
            const badgeBg = variant === "cyan" ? "#38BDF8" : "#F59E0B";
            const badgeShadow = variant === "cyan" ? "#0284C7" : "#D97706";

            return (
              <span
                key={`${activeSegment.id}-${word}-${i}`}
                style={{
                  display: "inline-block",
                  transform: `scale(${isCurrentWord ? scale * 1.08 : scale}) translateY(${translateY}px)`,
                  fontSize,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  padding: isVertical ? "6px 18px" : "4px 12px",
                  borderRadius: 10,
                  backgroundColor: badgeBg,
                  color: "#0C1B33",
                  boxShadow: `0 5px 0 ${badgeShadow}`,
                  margin: "2px 0",
                }}
              >
                {word}
              </span>
            );
          }

          // Regular words: bare, clean, ultra-flat text without stroke or wrapper box
          return (
            <span
              key={`${activeSegment.id}-${word}-${i}`}
              style={{
                display: "inline-block",
                transform: `scale(${isCurrentWord ? scale * 1.06 : scale}) translateY(${translateY}px)`,
                fontSize,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                padding: "2px 4px",
                color: isCurrentWord
                  ? variant === "cyan"
                    ? "#38BDF8"
                    : "#FDE047"
                  : "#FFFFFF",
                textShadow: "0 3px 0 rgba(5, 12, 22, 0.9), 0 6px 0 rgba(5, 12, 22, 0.6)",
                margin: "2px 0",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
