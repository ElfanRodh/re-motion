import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface KaraokeSegment {
  id: string;
  startSec: number;
  endSec: number;
  text: string;
  position?: "bottom" | "center" | "mid-stage";
  accentColor?: string;
  highlightWords?: string[];
}

export const KARAOKE_SEGMENTS: KaraokeSegment[] = [
  // Scene 1: Hook & Data BPS (00:00.0 - 00:08.0)
  {
    id: "s1-hook-1",
    startSec: 0.0,
    endSec: 1.2,
    text: "BUMI ANGLING DARMA...",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["ANGLING", "DARMA..."],
  },
  {
    id: "s1-hook-2",
    startSec: 1.2,
    endSec: 3.0,
    text: "...MENCETAK SEJARAH! 868.808 TON",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["SEJARAH!", "868.808"],
  },
  {
    id: "s1-bps-1",
    startSec: 3.0,
    endSec: 4.2,
    text: "RILIS DATA BPS PER 2 NOVEMBER 2026...",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["BPS", "2", "NOVEMBER", "2026..."],
  },
  {
    id: "s1-bps-2",
    startSec: 4.2,
    endSec: 7.8,
    text: "...MENCATAT CAPAIAN TERTINGGI JAWA TIMUR:",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["TERTINGGI", "JAWA", "TIMUR:"],
  },

  // Scene 2: Peta Jatim & 4 Provinsi Nasional (00:08.0 - 00:20.0)
  {
    id: "s2-bojo-lead",
    startSec: 8.0,
    endSec: 9.5,
    text: "KABUPATEN BOJONEGORO JADI PENGHASIL PADI",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["BOJONEGORO"],
  },
  {
    id: "s2-bojo-rank",
    startSec: 9.5,
    endSec: 11.9,
    text: "NOMOR SATU DI JAWA TIMUR!",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["NOMOR", "SATU", "JAWA", "TIMUR!"],
  },
  {
    id: "s2-jatim-national-1",
    startSec: 12.0,
    endSec: 14.2,
    text: "SECARA NASIONAL, JAWA TIMUR KEMBALI KOKOH",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["JAWA", "TIMUR", "KOKOH"],
  },
  {
    id: "s2-jatim-national-2",
    startSec: 14.2,
    endSec: 16.5,
    text: "SEBAGAI PRODUSEN PADI TERBESAR DI INDONESIA...",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["TERBESAR", "INDONESIA..."],
  },
  {
    id: "s2-jatim-total",
    startSec: 16.5,
    endSec: 19.8,
    text: "...DENGAN TOTAL 10,61 JUTA TON GABAH KERING GILING.",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["10,61", "JUTA", "TON"],
  },

  // Scene 3: Bojonegoro Juara 1 Jatim & Traktor Panen (00:20.0 - 00:33.0)
  {
    id: "s3-penopang",
    startSec: 20.0,
    endSec: 23.8,
    text: "DAN PENOPANG TERBESARNYA, ADA DI BOJONEGORO!",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["PENOPANG", "BOJONEGORO!"],
  },
  {
    id: "s3-luas-panen",
    startSec: 24.0,
    endSec: 26.9,
    text: "DENGAN LUAS PANEN 159 RIBU HEKTAR,",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["159", "RIBU", "HEKTAR,"],
  },
  {
    id: "s3-memimpin",
    startSec: 27.0,
    endSec: 29.0,
    text: "BOJONEGORO MEMIMPIN DI PUNCAK DENGAN TOREHAN",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["BOJONEGORO", "PUNCAK"],
  },
  {
    id: "s3-gabah-total",
    startSec: 29.0,
    endSec: 32.6,
    text: "868.808 TON GABAH KERING GILING!",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["868.808", "TON", "GABAH"],
  },

  // Scene 4: Konversi Beras Konsumsi & Pabrik Modern (00:33.0 - 00:44.0)
  {
    id: "s4-konversi",
    startSec: 33.0,
    endSec: 36.7,
    text: "KALAU DIKONVERSI JADI BERAS SIAP KONSUMSI,",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["BERAS", "KONSUMSI,"],
  },
  {
    id: "s4-suplai-1",
    startSec: 36.8,
    endSec: 39.2,
    text: "BOJONEGORO MENYUPLAI LEBIH DARI 501 RIBU TON BERAS",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["501", "RIBU", "TON", "BERAS"],
  },
  {
    id: "s4-suplai-2",
    startSec: 39.2,
    endSec: 43.2,
    text: "UNTUK KEBUTUHAN PANGAN MASYARAKAT.",
    position: "bottom",
    accentColor: "#10B981",
    highlightWords: ["PANGAN", "MASYARAKAT."],
  },

  // Scene 5: Apresiasi Petani, Medali Juara & CTA Interaktif (00:44.0 - 01:00.0)
  {
    id: "s5-bukti-nyata",
    startSec: 44.0,
    endSec: 46.9,
    text: "BUKTI NYATA KERJA KERAS PETANI & SINERGI PEMERINTAH",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["PETANI", "SINERGI"],
  },
  {
    id: "s5-matur-nuwun",
    startSec: 47.0,
    endSec: 49.7,
    text: "MATUR NUWUN PETANI BOJONEGORO!",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["MATUR", "NUWUN", "PETANI", "BOJONEGORO!"],
  },
  {
    id: "s5-bangga",
    startSec: 49.8,
    endSec: 51.5,
    text: "WONG BOJONEGORO, BANGGA NGGAK NIH?",
    position: "bottom",
    accentColor: "#38BDF8",
    highlightWords: ["BOJONEGORO,", "BANGGA"],
  },
  {
    id: "s5-komentar",
    startSec: 51.5,
    endSec: 56.5,
    text: "TULIS DI KOMENTAR!",
    position: "bottom",
    accentColor: "#F59E0B",
    highlightWords: ["TULIS", "KOMENTAR!"],
  },
];

export const KaraokeSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  // Active segment
  const activeSegment = KARAOKE_SEGMENTS.find(
    (s) => currentSec >= s.startSec && currentSec < s.endSec
  );

  if (!activeSegment) {
    return null;
  }

  const { startSec, endSec, text } = activeSegment;
  const words = text.split(" ");
  const durationSec = endSec - startSec;
  const elapsedSec = currentSec - startSec;

  // Calculate active word index based on time pacing
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor((elapsedSec / (durationSec * 0.85)) * words.length)
  );

  // Entrance spring for the subtitle pill
  const segmentEntrance = spring({
    frame: frame - startSec * fps,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  const translateY = interpolate(segmentEntrance, [0, 1], [30, 0]);
  const opacity = interpolate(segmentEntrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 85,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 50,
        pointerEvents: "none",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 12px",
          backgroundColor: "rgba(9, 23, 44, 0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "2px solid rgba(56, 189, 248, 0.35)",
          borderRadius: 18,
          padding: "14px 26px",
          boxShadow: "0 8px 0 #040B16, 0 14px 28px rgba(0, 0, 0, 0.45)",
          maxWidth: 960,
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          const isPast = idx < activeWordIndex;

          // Spring physics for the active word pop
          const wordFrame =
            frame - (startSec * fps + (idx * (durationSec * 0.85 * fps)) / words.length);
          const wordSpring = spring({
            frame: wordFrame,
            fps,
            config: { damping: 12, stiffness: 220, mass: 0.6 },
          });

          const wordScale = isActive ? interpolate(wordSpring, [0, 1], [0.95, 1.12]) : 1;
          const wordTranslateY = isActive ? interpolate(wordSpring, [0, 1], [0, -3]) : 0;

          return (
            <span
              key={idx}
              style={{
                fontSize: 31,
                fontWeight: 900,
                letterSpacing: 0.4,
                lineHeight: 1.2,
                padding: "4px 11px",
                borderRadius: 9,
                display: "inline-block",
                transform: `translateY(${wordTranslateY}px) scale(${wordScale})`,
                transformOrigin: "center bottom",
                color: isActive ? "#071324" : isPast ? "#FFFFFF" : "rgba(255, 255, 255, 0.62)",
                backgroundColor: isActive ? "#F59E0B" : "transparent",
                boxShadow: isActive ? "0 4px 16px rgba(245, 158, 11, 0.45)" : undefined,
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
