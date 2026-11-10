import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { BojonegoroCharacter, isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface Scene4PabrikBerasProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const Scene4PabrikBeras: React.FC<Scene4PabrikBerasProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 4 starts at 34.0s (1020 frames)
  const globalSec = 34.0 + frame / fps;
  const isSpeaking = isVoiceoverSpeakingAtSecond(globalSec);

  const riceCounterSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 13, stiffness: 85 },
  });
  const riceCount = Math.round(interpolate(riceCounterSpring, [0, 1], [0, 501670])).toLocaleString("id-ID");

  const gearRot1 = (frame * 2.5) % 360;
  const gearRot2 = -(frame * 2.5) % 360;

  // Flowing white rice grains
  const riceGrains = Array.from({ length: 24 }).map((_, i) => {
    const x = 15 + ((frame * 3.2 + i * 14) % 70);
    const y = 35 + Math.sin((frame * 0.2 + i) * Math.PI) * 14;
    const rot = (frame * 4 + i * 35) % 360;
    return { x, y, rot };
  });

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between px-10 pt-28 pb-48 select-none">
      {/* 1. HEADER */}
      <div className="flex flex-col items-center z-20">
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border-2 border-cyan-400/60 bg-cyan-950/85 backdrop-blur-xl mb-4 shadow-2xl">
          <span style={{ fontSize: 26 }}>🍚</span>
          <span className="font-black tracking-widest uppercase text-cyan-300" style={{ fontSize: 20 }}>
            KONVERSI BERAS SIAP KONSUMSI · BPS 2026
          </span>
        </div>

        <KineticText
          text={scene.title}
          animation="pop-in"
          highlightWords={["501.670", "Ton", "Beras", "Konsumsi"]}
          accentColor="#38bdf8"
          className="font-black text-white text-center tracking-tight drop-shadow-2xl"
          style={{ fontSize: 60, lineHeight: 1.12, maxWidth: 920 }}
        />
      </div>

      {/* 2. CENTER: Giant Rice Counter + Conversion Pipeline + Character Presenter */}
      <div className="relative flex-1 flex flex-col items-center justify-start pt-4 z-20 gap-5">
        {/* Giant 501.670 Ton Beras Card */}
        <div
          className="w-full rounded-3xl p-7 border-2 border-cyan-400/60 bg-slate-900/90 backdrop-blur-2xl shadow-2xl flex flex-col items-center relative overflow-hidden"
          style={{
            maxWidth: 920,
            boxShadow: "0 20px 50px -10px rgba(6, 182, 212, 0.45)",
          }}
        >
          <span className="font-extrabold text-cyan-200 uppercase tracking-widest" style={{ fontSize: 20 }}>
            SUPLAI BERAS BERSIH KABUPATEN BOJONEGORO
          </span>

          <div className="flex items-baseline gap-4 my-2">
            <span
              className="font-mono font-black text-cyan-300 tracking-tight"
              style={{
                fontSize: 92,
                lineHeight: 1,
                textShadow: "0 0 35px rgba(56, 189, 248, 0.6)",
              }}
            >
              {riceCount}
            </span>
            <span className="font-black text-white uppercase" style={{ fontSize: 44 }}>
              Ton Beras
            </span>
          </div>

          <span className="font-bold text-emerald-300" style={{ fontSize: 22 }}>
            ✓ Siap Memenuhi Kebutuhan Pangan Jutaan Keluarga Indonesia
          </span>
        </div>

        {/* Lower Stage: Rice Milling & Sack Graphic on Left + Male Presenter on Right */}
        <div className="w-full flex items-center justify-between gap-5 mt-1" style={{ maxWidth: 940 }}>
          {/* Milling & Rice Sack Card */}
          <div
            className="flex-1 rounded-3xl border-2 border-cyan-500/40 bg-slate-950/85 p-6 shadow-2xl flex flex-col justify-between"
            style={{ height: 480 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-white uppercase" style={{ fontSize: 22 }}>
                ⚙️ Konversi GKG ➔ Beras Premium
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold" style={{ fontSize: 16 }}>
                Rendemen Tinggi
              </span>
            </div>

            {/* Pipeline Visual */}
            <div className="flex items-center justify-between my-2 px-2">
              {/* Rotating Milling Gears */}
              <div className="relative w-32 h-32 flex items-center justify-center bg-slate-900 rounded-3xl border border-cyan-500/40 shadow-inner">
                <svg
                  className="w-20 h-20 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: `rotate(${gearRot1}deg)` }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <svg
                  className="w-12 h-12 text-amber-400 absolute bottom-2 right-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: `rotate(${gearRot2}deg)` }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>

              {/* Flowing White Rice Stream */}
              <div className="relative flex-1 h-28 mx-2 overflow-hidden">
                {riceGrains.map((g, idx) => (
                  <div
                    key={idx}
                    className="absolute bg-white rounded-full"
                    style={{
                      width: 12,
                      height: 7,
                      left: `${g.x}%`,
                      top: `${g.y}%`,
                      transform: `rotate(${g.rot}deg)`,
                      boxShadow: "0 0 10px rgba(255,255,255,0.95)",
                    }}
                  />
                ))}
              </div>

              {/* Illustrated Rice Sack (Karung Beras Bojonegoro) */}
              <div
                className="w-36 h-44 rounded-3xl bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-between p-3 text-slate-950"
              >
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-black uppercase" style={{ fontSize: 13 }}>
                   LUMBUNG RI
                </span>
                <div className="text-center">
                  <span style={{ fontSize: 34 }}>🌾</span>
                  <span className="font-black block leading-tight mt-1" style={{ fontSize: 17 }}>
                    BERAS SUPER BOJONEGORO
                  </span>
                </div>
                <span className="font-mono font-black text-emerald-900 bg-emerald-300/70 px-2 py-0.5 rounded-lg" style={{ fontSize: 14 }}>
                  501.670 TON
                </span>
              </div>
            </div>

            {/* Bottom Comparison Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800">
                <span className="text-slate-400 font-bold block" style={{ fontSize: 15 }}>
                  Produksi Beras Jawa Timur
                </span>
                <span className="font-mono font-black text-emerald-400" style={{ fontSize: 22 }}>
                  6,12 Juta Ton (+1,62%)
                </span>
              </div>
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800">
                <span className="text-slate-400 font-bold block" style={{ fontSize: 15 }}>
                  Produksi Beras Nasional
                </span>
                <span className="font-mono font-black text-cyan-400" style={{ fontSize: 22 }}>
                  33,11 Juta Ton Beras
                </span>
              </div>
            </div>
          </div>

          {/* 3D Male Character Presenter on Right */}
          <div className="shrink-0 flex items-center justify-center" style={{ width: 400 }}>
            <BojonegoroCharacter
              pose="presenter"
              size="lg"
              isSpeaking={isSpeaking}
              accentColor="#38bdf8"
              badgeText="501.670 Ton"
              badgeIcon="🍚"
            />
          </div>
        </div>

        {/* Bottom Highlight Fact Pill */}
        <div
          className="w-full rounded-3xl px-8 py-4 border-2 border-cyan-400/50 bg-slate-950/90 backdrop-blur-xl shadow-2xl flex items-center justify-between"
          style={{ maxWidth: 920 }}
        >
          <div className="flex items-center gap-4">
            <span style={{ fontSize: 36 }}>🛡️</span>
            <div className="flex flex-col">
              <span className="font-black text-cyan-300 uppercase tracking-wide" style={{ fontSize: 21 }}>
                PENOPANG UTAMA KEDAULATAN PANGAN MASYARAKAT
              </span>
              <span className="font-semibold text-slate-200" style={{ fontSize: 18 }}>
                Dari 868.808 ton GKG digiling menjadi 501.670 ton beras berkualitas super
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-cyan-400 text-slate-950 font-black uppercase shrink-0" style={{ fontSize: 18 }}>
            SIAP SAJI
          </span>
        </div>
      </div>
    </div>
  );
};
