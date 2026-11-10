import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface SubtitleSegment {
  startSec: number;
  endSec: number;
  text: string;
  highlightWords: string[];
}

const SUBTITLE_SEGMENTS: SubtitleSegment[] = [
  {
    startSec: 0.0,
    endSec: 2.6,
    text: "Bumi Angling Darma mencetak sejarah!",
    highlightWords: ["Angling", "Darma", "sejarah!"],
  },
  {
    startSec: 2.6,
    endSec: 7.1,
    text: "Rilis data BPS per 2 November 2026 mencatat:",
    highlightWords: ["BPS", "2", "November", "2026"],
  },
  {
    startSec: 7.1,
    endSec: 12.0,
    text: "Kabupaten Bojonegoro jadi penghasil padi nomor satu di Jawa Timur!",
    highlightWords: ["Bojonegoro", "nomor", "satu", "Jawa", "Timur!"],
  },
  {
    startSec: 12.0,
    endSec: 16.5,
    text: "Secara nasional, Jawa Timur kembali kokoh sebagai produsen padi terbesar di Indonesia",
    highlightWords: ["nasional,", "Jawa", "Timur", "terbesar", "Indonesia"],
  },
  {
    startSec: 16.5,
    endSec: 21.0,
    text: "dengan total 10,61 juta ton Gabah Kering Giling.",
    highlightWords: ["10,61", "juta", "ton", "Gabah"],
  },
  {
    startSec: 21.0,
    endSec: 24.2,
    text: "Dan penopang terbesarnya, ada di Bojonegoro!",
    highlightWords: ["penopang", "terbesarnya,", "Bojonegoro!"],
  },
  {
    startSec: 24.2,
    endSec: 27.4,
    text: "Dengan luas panen 159 ribu hektar,",
    highlightWords: ["luas", "panen", "159", "ribu", "hektar,"],
  },
  {
    startSec: 27.4,
    endSec: 34.0,
    text: "Bojonegoro memimpin di puncak dengan torehan 868.808 ton gabah!",
    highlightWords: ["Bojonegoro", "puncak", "868.808", "ton", "gabah!"],
  },
  {
    startSec: 34.0,
    endSec: 38.0,
    text: "Kalau dikonversi jadi beras siap konsumsi,",
    highlightWords: ["beras", "siap", "konsumsi,"],
  },
  {
    startSec: 38.0,
    endSec: 42.2,
    text: "Bojonegoro menyuplai lebih dari 501 ribu ton beras untuk kebutuhan pangan masyarakat.",
    highlightWords: ["501", "ribu", "ton", "beras", "masyarakat."],
  },
  {
    startSec: 42.2,
    endSec: 47.4,
    text: "Bukti nyata kerja keras petani dan sinergi pemerintah menjaga kedaulatan pangan.",
    highlightWords: ["petani", "sinergi", "pemerintah", "kedaulatan", "pangan."],
  },
  {
    startSec: 47.4,
    endSec: 49.5,
    text: "Matur nuwun petani Bojonegoro!",
    highlightWords: ["Matur", "nuwun", "petani", "Bojonegoro!"],
  },
  {
    startSec: 49.5,
    endSec: 53.5,
    text: "Wong Bojonegoro, bangga nggak nih? Tulis di komentar!",
    highlightWords: ["Wong", "Bojonegoro,", "bangga", "komentar!"],
  },
];

interface ReelsOverlayProps {
  sceneDurations?: number[];
}

export const ReelsOverlay: React.FC<ReelsOverlayProps> = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentSec = frame / fps;
  const isSpeaking = isVoiceoverSpeakingAtSecond(currentSec);
  const isVertical = height > width;

  const activeSegment = SUBTITLE_SEGMENTS.find(
    (s) => currentSec >= s.startSec && currentSec < s.endSec
  );

  if (!activeSegment) {
    return null;
  }

  const segmentFrame = Math.max(0, Math.round((currentSec - activeSegment.startSec) * fps));
  const segmentDurationFrames = Math.max(
    1,
    Math.round((activeSegment.endSec - activeSegment.startSec) * fps)
  );

  const words = activeSegment.text.split(" ");
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor(
      interpolate(segmentFrame, [0, segmentDurationFrames * 0.88], [0, words.length], {
        extrapolateRight: "clamp",
      })
    )
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 40 }}>
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: isVertical ? 56 : 28,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: isVertical ? 984 : 1100,
            backgroundColor: "#005A8D",
            borderRadius: 16,
            padding: "18px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px 10px",
          }}
        >
          {words.map((word, i) => {
            const isCurrentWord = i === activeWordIndex && isSpeaking;
            const isPastWord = i < activeWordIndex;
            const isKeyword = activeSegment.highlightWords.some(
              (hw) =>
                hw.toLowerCase().replace(/[^\w]/g, "") === word.toLowerCase().replace(/[^\w]/g, "")
            );

            return (
              <span
                key={`${word}-${i}`}
                style={{
                  fontSize: isVertical ? 28 : 22,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  padding: "2px 8px",
                  borderRadius: 6,
                  backgroundColor: isCurrentWord ? "#FFD100" : "transparent",
                  color: isCurrentWord
                    ? "#004670"
                    : isKeyword
                      ? "#FFD100"
                      : isPastWord
                        ? "#FFFFFF"
                        : "#CAF0F8",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
