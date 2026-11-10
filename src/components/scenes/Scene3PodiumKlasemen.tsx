import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { BojonegoroCharacter, isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface Scene3PodiumKlasemenProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const Scene3PodiumKlasemen: React.FC<Scene3PodiumKlasemenProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 3 starts at 21.0s (630 frames)
  const globalSec = 21.0 + frame / fps;
  const isSpeaking = isVoiceoverSpeakingAtSecond(globalSec);

  // Switch pose: Presenter during "Dengan luas panen 159 ribu hektar" (24.2s - 27.4s), Hero celebration when reaching 868.808 ton!
  const pose = globalSec >= 24.0 && globalSec < 27.5 ? "presenter" : "hero";

  // Staggered podium springs
  const bar3Spring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const bar2Spring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const bar1Spring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 10, stiffness: 95 },
  });

  // Luas Panen highlight pulse at 24.3s (frame 100 of Scene 3)
  const luasPanenSpring = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { damping: 9, stiffness: 140 },
  });
  const isLuasPanenHighlighted = frame >= 95 && frame <= 195;

  const bojonegoroNum = Math.round(interpolate(bar1Spring, [0, 1], [0, 868808])).toLocaleString("id-ID");
  const lamonganNum = Math.round(interpolate(bar2Spring, [0, 1], [0, 852192])).toLocaleString("id-ID");
  const ngawiNum = Math.round(interpolate(bar3Spring, [0, 1], [0, 768307])).toLocaleString("id-ID");

  const crownScale = 1 + Math.sin((frame / 10) * Math.PI) * 0.12;

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between px-10 pt-28 pb-48 select-none">
      {/* 1. HEADER */}
      <div className="flex flex-col items-center z-20">
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border-2 border-yellow-400/70 bg-amber-950/85 backdrop-blur-xl mb-4 shadow-2xl">
          <span style={{ fontSize: 24 }}>👑</span>
          <span className="font-black tracking-widest uppercase text-yellow-300" style={{ fontSize: 20 }}>
            TOP 3 KLASEMEN PRODUKSI PADI JAWA TIMUR 2026
          </span>
        </div>

        <KineticText
          text={scene.title}
          animation="pop-in"
          highlightWords={["Klasemen", "Padi", "Jawa", "Timur"]}
          accentColor="#facc15"
          className="font-black text-white text-center tracking-tight drop-shadow-2xl"
          style={{ fontSize: 58, lineHeight: 1.12, maxWidth: 920 }}
        />

        {/* Key Metrics Badges (Luas Panen 159,19 Ribu Ha & Share 8,19% Jatim) */}
        <div className="flex items-center gap-4 mt-4">
          <div
            className="px-6 py-2.5 rounded-2xl border-2 flex items-center gap-2.5 shadow-xl transition-all"
            style={{
              backgroundColor: isLuasPanenHighlighted ? "#facc15" : "rgba(6, 78, 59, 0.85)",
              borderColor: isLuasPanenHighlighted ? "#ffffff" : "#34d399",
              color: isLuasPanenHighlighted ? "#052e16" : "#a7f3d0",
              transform: `scale(${isLuasPanenHighlighted ? 1 + interpolate(luasPanenSpring, [0, 1], [0, 0.08]) : 1})`,
              boxShadow: isLuasPanenHighlighted ? "0 0 35px rgba(250,204,21,0.8)" : undefined,
            }}
          >
            <span style={{ fontSize: 24 }}>🌱</span>
            <span className="font-black font-mono" style={{ fontSize: 22 }}>
              Luas Panen: 159,19 Ribu Ha
            </span>
          </div>

          <div
            className="px-6 py-2.5 rounded-2xl border-2 border-amber-400/60 bg-amber-950/85 text-amber-300 flex items-center gap-2 shadow-xl"
          >
            <span style={{ fontSize: 22 }}>📊</span>
            <span className="font-black font-mono" style={{ fontSize: 22 }}>
              Kontribusi: 8,19% Jatim
            </span>
          </div>
        </div>
      </div>

      {/* 2. CENTER: Character & Giant 3D Championship Podium */}
      <div className="relative flex-1 flex flex-col items-center justify-end z-20 pb-2">
        {/* Character Celebrating Above Podium */}
        <div className="relative z-30 -mb-6">
          <BojonegoroCharacter
            pose={pose}
            size="md"
            isSpeaking={isSpeaking}
            accentColor="#facc15"
            badgeText="868.808 Ton"
            badgeIcon="🥇"
          />
        </div>

        {/* 3-Column Championship Podium */}
        <div className="w-full grid grid-cols-3 gap-5 items-end" style={{ maxWidth: 940 }}>
          {/* 2nd Place: Lamongan */}
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-sky-200 mb-1" style={{ fontSize: 24 }}>
              Kab. Lamongan
            </span>
            <span className="font-mono font-black text-sky-400 mb-2" style={{ fontSize: 30 }}>
              {lamonganNum}
            </span>
            <div
              className="w-full rounded-t-3xl bg-gradient-to-t from-slate-950 via-blue-900 to-sky-600 border-2 border-sky-400/70 flex flex-col items-center justify-start pt-5 shadow-2xl"
              style={{
                height: interpolate(bar2Spring, [0, 1], [0, 250]),
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.35)",
              }}
            >
              <span className="px-4 py-1 rounded-xl bg-sky-950/80 border border-sky-300/50 font-black text-white" style={{ fontSize: 28 }}>
                #2
              </span>
              <span className="font-extrabold text-sky-100 uppercase mt-2" style={{ fontSize: 18 }}>
                852.192 Ton GKG
              </span>
            </div>
          </div>

          {/* 1st Place: Bojonegoro (Tallest Golden-Emerald Pillar) */}
          <div className="flex flex-col items-center">
            <div
              className="mb-1"
              style={{ transform: `scale(${crownScale})` }}
            >
              <span style={{ fontSize: 44 }}>👑</span>
            </div>
            <span className="font-black text-yellow-300 tracking-wide mb-1" style={{ fontSize: 28 }}>
              KAB. BOJONEGORO
            </span>
            <span
              className="font-mono font-black text-emerald-300 mb-2"
              style={{
                fontSize: 38,
                textShadow: "0 0 25px rgba(52, 211, 153, 0.8)",
              }}
            >
              {bojonegoroNum}
            </span>
            <div
              className="w-full rounded-t-3xl bg-gradient-to-t from-emerald-950 via-emerald-600 to-amber-400 border-4 border-yellow-200 flex flex-col items-center justify-start pt-6 shadow-2xl relative overflow-hidden"
              style={{
                height: interpolate(bar1Spring, [0, 1], [0, 340]),
                boxShadow: "0 0 50px rgba(250, 204, 21, 0.65), 0 0 25px rgba(34, 197, 94, 0.7)",
              }}
            >
              <div className="px-5 py-1.5 rounded-2xl bg-slate-950 text-yellow-300 font-black shadow-xl border border-yellow-300" style={{ fontSize: 30 }}>
                #1 JUARA
              </div>
              <span className="font-black text-slate-950 uppercase mt-3 bg-white/90 px-4 py-1 rounded-xl" style={{ fontSize: 20 }}>
                868.808 TON GKG
              </span>
              <span className="font-extrabold text-white mt-2" style={{ fontSize: 17 }}>
                Puncak Klasemen Jatim
              </span>
            </div>
          </div>

          {/* 3rd Place: Ngawi */}
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-amber-200 mb-1" style={{ fontSize: 24 }}>
              Kab. Ngawi
            </span>
            <span className="font-mono font-black text-amber-400 mb-2" style={{ fontSize: 30 }}>
              {ngawiNum}
            </span>
            <div
              className="w-full rounded-t-3xl bg-gradient-to-t from-slate-950 via-amber-900 to-amber-600 border-2 border-amber-400/70 flex flex-col items-center justify-start pt-5 shadow-2xl"
              style={{
                height: interpolate(bar3Spring, [0, 1], [0, 200]),
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.35)",
              }}
            >
              <span className="px-4 py-1 rounded-xl bg-amber-950/80 border border-amber-300/50 font-black text-white" style={{ fontSize: 28 }}>
                #3
              </span>
              <span className="font-extrabold text-amber-100 uppercase mt-2" style={{ fontSize: 18 }}>
                768.307 Ton GKG
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
