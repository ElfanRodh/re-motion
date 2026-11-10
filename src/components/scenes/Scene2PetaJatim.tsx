import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { BojonegoroCharacter, isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface Scene2PetaJatimProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const Scene2PetaJatim: React.FC<Scene2PetaJatimProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 2 starts at 12.0s (360 frames)
  const globalSec = 12.0 + frame / fps;
  const isSpeaking = isVoiceoverSpeakingAtSecond(globalSec);

  const mapSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Counter from 0 to 10,61 Juta Ton (peaks when VO says "10,61 juta ton" around frame 135)
  const counterProgress = interpolate(frame, [10, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterVal = (counterProgress * 10.61).toFixed(2).replace(".", ",");

  // Radar pulse on Bojonegoro
  const radarPulse = (frame * 2.8) % 100;
  const radarAlpha = interpolate(radarPulse, [0, 100], [1, 0]);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between px-10 pt-28 pb-48 select-none">
      {/* 1. HEADER */}
      <div className="flex flex-col items-center z-20">
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border-2 border-emerald-400/60 bg-emerald-950/85 backdrop-blur-xl mb-4 shadow-2xl">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-black tracking-widest uppercase text-emerald-300" style={{ fontSize: 20 }}>
            PERINGKAT 1 DARI 38 PROVINSI SE-INDONESIA
          </span>
        </div>

        <KineticText
          text={scene.title}
          animation="pop-in"
          highlightWords={["Jawa", "Timur", "Juara", "1", "Nasional"]}
          accentColor="#4ade80"
          className="font-black text-white text-center tracking-tight drop-shadow-2xl"
          style={{ fontSize: 62, lineHeight: 1.12, maxWidth: 920 }}
        />
      </div>

      {/* 2. GIANT METRIC CARD + JAVA ISLAND RADAR MAP */}
      <div className="relative flex-1 flex flex-col items-center justify-start pt-4 z-20 gap-5">
        {/* Giant 10,61 Juta Ton Card + National Comparison */}
        <div
          className="w-full rounded-3xl p-7 border-2 border-emerald-400/60 bg-slate-900/90 backdrop-blur-2xl shadow-2xl flex flex-col items-center relative overflow-hidden"
          style={{
            maxWidth: 920,
            boxShadow: "0 20px 50px -10px rgba(34, 197, 94, 0.45)",
          }}
        >
          <span className="font-extrabold text-emerald-200 uppercase tracking-widest" style={{ fontSize: 20 }}>
            TOTAL PRODUKSI GABAH KERING GILING (GKG) JAWA TIMUR
          </span>

          <div className="flex items-baseline gap-4 my-2">
            <span
              className="font-mono font-black text-amber-300 tracking-tight"
              style={{
                fontSize: 96,
                lineHeight: 1,
                textShadow: "0 0 35px rgba(250, 204, 21, 0.55)",
              }}
            >
              {counterVal}
            </span>
            <span className="font-black text-white uppercase" style={{ fontSize: 44 }}>
              Juta Ton GKG
            </span>
          </div>

          {/* 3-Pillar BPS Data Row */}
          <div className="w-full grid grid-cols-3 gap-4 mt-3 pt-4 border-t border-emerald-500/30">
            <div className="flex flex-col items-center bg-slate-950/75 rounded-2xl p-3 border border-emerald-500/30">
              <span className="text-slate-400 font-bold uppercase" style={{ fontSize: 15 }}>
                Luas Panen Jatim
              </span>
              <span className="font-black text-white font-mono mt-0.5" style={{ fontSize: 24 }}>
                1,85 Juta Ha
              </span>
              <span className="font-bold text-emerald-400" style={{ fontSize: 15 }}>
                ▲ +0,71% YoY
              </span>
            </div>

            <div className="flex flex-col items-center bg-slate-950/75 rounded-2xl p-3 border border-amber-400/40">
              <span className="text-slate-400 font-bold uppercase" style={{ fontSize: 15 }}>
                Produksi Beras Jatim
              </span>
              <span className="font-black text-amber-300 font-mono mt-0.5" style={{ fontSize: 24 }}>
                6,12 Juta Ton
              </span>
              <span className="font-bold text-emerald-400" style={{ fontSize: 15 }}>
                ▲ +1,62% YoY
              </span>
            </div>

            <div className="flex flex-col items-center bg-slate-950/75 rounded-2xl p-3 border border-sky-400/40">
              <span className="text-slate-400 font-bold uppercase" style={{ fontSize: 15 }}>
                Total Nasional (RI)
              </span>
              <span className="font-black text-sky-300 font-mono mt-0.5" style={{ fontSize: 24 }}>
                57,45 Juta Ton
              </span>
              <span className="font-bold text-sky-400" style={{ fontSize: 15 }}>
                Jatim Sumbang 18,5%
              </span>
            </div>
          </div>
        </div>

        {/* Lower Stage: Stylized Map on Left + Male Character Presenter on Right */}
        <div className="w-full flex items-center justify-between gap-4 mt-2" style={{ maxWidth: 940 }}>
          {/* Stylized Map & Rising Bar Chart */}
          <div
            className="flex-1 rounded-3xl border-2 border-emerald-500/50 bg-slate-950/85 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            style={{
              height: 470,
              transform: `scale(${interpolate(mapSpring, [0, 1], [0.85, 1])})`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-white uppercase tracking-wider" style={{ fontSize: 22 }}>
                🗺️ Peta Lumbung Pangan Nasional
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold" style={{ fontSize: 16 }}>
                Pusat: Jawa Timur
              </span>
            </div>

            {/* SVG Map of Java with East Java Highlight & Bojonegoro Radar */}
            <svg className="w-full my-2" style={{ height: 220 }} viewBox="0 0 360 150" fill="none">
              {/* Background grid lines */}
              <line x1="0" y1="40" x2="360" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="360" y2="80" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="360" y2="120" stroke="#1e293b" strokeDasharray="4 4" />

              {/* West & Central Java */}
              <path
                d="M 18 75 Q 60 58 105 76 Q 150 92 190 72 L 190 105 Q 130 116 55 102 Z"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="2.5"
              />
              {/* East Java Glowing Polygon */}
              <path
                d="M 190 72 Q 235 48 280 66 Q 325 82 340 72 L 332 115 Q 268 128 190 105 Z"
                fill="url(#jatimGlowGrad)"
                stroke="#4ade80"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 16px rgba(34, 197, 94, 0.85))"
              />
              <defs>
                <linearGradient id="jatimGlowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              {/* Bojonegoro Radar Pin */}
              <circle
                cx="235"
                cy="74"
                r={radarPulse * 0.45}
                stroke="#facc15"
                strokeWidth="3"
                opacity={radarAlpha}
                fill="none"
              />
              <circle cx="235" cy="74" r="7" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
              <rect x="175" y="32" width="120" height="24" rx="8" fill="#052e16" stroke="#facc15" strokeWidth="1.5" />
              <text x="235" y="48" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="900">
                ★ BOJONEGORO #1
              </text>
              <text x="275" y="106" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">
                JAWA TIMUR
              </text>
            </svg>

            {/* Bottom Mini Province Comparison Bars */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-black text-amber-300 w-32" style={{ fontSize: 18 }}>
                  1. Jawa Timur
                </span>
                <div className="flex-1 h-7 bg-slate-900 rounded-xl overflow-hidden border border-emerald-500/40">
                  <div
                    className="h-full rounded-xl flex items-center justify-end pr-3 font-mono font-black text-slate-950"
                    style={{
                      width: `${interpolate(counterProgress, [0, 1], [15, 100])}%`,
                      background: "linear-gradient(90deg, #22c55e, #facc15)",
                      fontSize: 16,
                    }}
                  >
                    10,61 Jt Ton
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-80">
                <span className="font-bold text-slate-300 w-32" style={{ fontSize: 17 }}>
                  2. Jawa Tengah
                </span>
                <div className="flex-1 h-6 bg-slate-900 rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-emerald-700 rounded-xl flex items-center justify-end pr-3 font-mono font-bold text-white"
                    style={{
                      width: `${interpolate(counterProgress, [0, 1], [10, 84])}%`,
                      fontSize: 14,
                    }}
                  >
                    8,89 Jt Ton
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Male Character Presenter on Right */}
          <div className="shrink-0 flex items-center justify-center" style={{ width: 410 }}>
            <BojonegoroCharacter
              pose="presenter"
              size="lg"
              isSpeaking={isSpeaking}
              accentColor="#22c55e"
              badgeText="Lumbung RI"
              badgeIcon="🏆"
            />
          </div>
        </div>

        {/* Bottom Highlight Fact Pill */}
        <div
          className="w-full rounded-3xl px-8 py-4 border-2 border-emerald-400/50 bg-slate-950/90 backdrop-blur-xl shadow-2xl flex items-center justify-between"
          style={{ maxWidth: 920 }}
        >
          <div className="flex items-center gap-4">
            <span style={{ fontSize: 36 }}>🌾</span>
            <div className="flex flex-col">
              <span className="font-black text-amber-300 uppercase tracking-wide" style={{ fontSize: 21 }}>
                PRODUSEN UTAMA PANGAN ASEAN & NASIONAL
              </span>
              <span className="font-semibold text-slate-200" style={{ fontSize: 18 }}>
                Jawa Timur menyumbang 18,5% dari total 57,45 juta ton GKG seluruh Indonesia
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase shrink-0" style={{ fontSize: 18 }}>
            NO. 1 RI
          </span>
        </div>
      </div>
    </div>
  );
};
