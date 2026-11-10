import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { BojonegoroCharacter, isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface Scene1HeroPadiProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const Scene1HeroPadi: React.FC<Scene1HeroPadiProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = frame / fps; // Scene 1 starts at 0.0s
  const isSpeaking = isVoiceoverSpeakingAtSecond(currentSec);

  // Switch character pose: Presenter during "Rilis data resmi BPS..." (2.6s - 7.1s), Hero celebration at start & when announcing "Nomor Satu di Jawa Timur!" (7.1s+)
  const pose = currentSec >= 2.6 && currentSec < 7.0 ? "presenter" : "hero";

  // Badge entrance
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Pop-in Champion Banner at 7.1s (frame 213) when VO says "Kabupaten Bojonegoro resmi jadi penghasil padi nomor satu di Jawa Timur!"
  const champBannerSpring = spring({
    frame: Math.max(0, frame - 205),
    fps,
    config: { damping: 10, stiffness: 130 },
  });
  const showChampBanner = frame >= 205;

  // Rotating golden sunburst rays
  const sunburstRot = (frame * 0.6) % 360;

  // Swaying golden paddy stalks at the bottom
  const stalkCount = 18;
  const stalks = Array.from({ length: stalkCount }).map((_, i) => ({
    x: (i / (stalkCount - 1)) * 100,
    height: 150 + ((i * 23) % 60),
    delay: i * 0.35,
  }));

  // Floating golden pollen/sparkle particles
  const particles = Array.from({ length: 22 }).map((_, i) => {
    const pX = (i * 19 + 7) % 96;
    const pY = 95 - ((frame * 1.2 + i * 41) % 90);
    const size = 6 + (i % 7);
    const alpha = interpolate(Math.sin((frame * 0.08 + i) * Math.PI), [-1, 1], [0.25, 0.85]);
    return { pX, pY, size, alpha };
  });

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between px-10 pt-28 pb-48 select-none">
      {/* 1. TOP HEADLINE & BPS CITATION */}
      <div className="flex flex-col items-center z-20">
        <div
          className="flex items-center gap-3 px-6 py-2.5 rounded-full border-2 border-amber-400/70 bg-amber-950/85 backdrop-blur-xl shadow-2xl mb-5"
          style={{
            transform: `scale(${interpolate(badgeSpring, [0, 1], [0.5, 1])})`,
            boxShadow: "0 0 35px rgba(234, 179, 8, 0.45)",
          }}
        >
          <span style={{ fontSize: 28 }}>🌾</span>
          <span className="font-black tracking-widest uppercase text-amber-300" style={{ fontSize: 20 }}>
            BRS BPS RI & JATIM · 2 NOV 2026
          </span>
          <span
            className="font-black px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 uppercase"
            style={{ fontSize: 18 }}
          >
            #1 JATIM
          </span>
        </div>

        <KineticText
          text={scene.title}
          animation="pop-in"
          highlightWords={["Bojonegoro", "Juara", "1", "2026!"]}
          accentColor="#facc15"
          className="font-black text-white text-center tracking-tight drop-shadow-2xl"
          style={{
            fontSize: 64,
            lineHeight: 1.12,
            maxWidth: 920,
            textShadow: "0 10px 30px rgba(0,0,0,0.85)",
          }}
        />

        <div
          className="mt-4 px-7 py-3 rounded-2xl border border-emerald-500/40 bg-slate-950/75 backdrop-blur-lg text-center shadow-xl"
          style={{ maxWidth: 860 }}
        >
          <span className="font-bold text-emerald-200" style={{ fontSize: 25, lineHeight: 1.35 }}>
            Bumi Angling Darma Mencetak Sejarah · Lumbung Pangan Utama Jawa Timur
          </span>
        </div>
      </div>

      {/* 2. CENTER HERO STAGE: Rotating Sunburst + New 3D Male Character + Data Badges */}
      <div className="relative flex-1 flex items-center justify-center z-20 my-2">
        {/* Sunburst Rays */}
        <div
          className="absolute rounded-full pointer-events-none opacity-30"
          style={{
            width: 780,
            height: 780,
            background:
              "conic-gradient(from 0deg, #eab308 0deg, transparent 20deg, #22c55e 40deg, transparent 60deg, #eab308 80deg, transparent 100deg, #22c55e 120deg, transparent 140deg, #eab308 160deg, transparent 180deg, #22c55e 200deg, transparent 220deg, #eab308 240deg, transparent 260deg, #22c55e 280deg, transparent 300deg, #eab308 320deg, transparent 340deg, #eab308 360deg)",
            transform: `rotate(${sunburstRot}deg)`,
            filter: "blur(6px)",
          }}
        />

        {/* Floating Stat Card Left: Peringkat 1 */}
        <div
          className="absolute left-0 top-16 z-30 rounded-3xl p-5 border-2 border-amber-400/70 bg-slate-950/90 backdrop-blur-xl shadow-2xl flex flex-col items-center"
          style={{
            width: 250,
            transform: `translateY(${Math.sin((frame / 16) * Math.PI) * 8}px)`,
            boxShadow: "0 15px 35px rgba(0,0,0,0.7), 0 0 25px rgba(234,179,8,0.35)",
          }}
        >
          <span style={{ fontSize: 42 }}>🏆</span>
          <span className="font-black text-amber-400 uppercase tracking-wider mt-1" style={{ fontSize: 18 }}>
            PERINGKAT 1
          </span>
          <span className="font-extrabold text-white text-center mt-0.5" style={{ fontSize: 22 }}>
            Dari 38 Kab/Kota
          </span>
          <span className="font-semibold text-emerald-300 text-center" style={{ fontSize: 16 }}>
            Provinsi Jawa Timur
          </span>
        </div>

        {/* Floating Stat Card Right: Produksi GKG */}
        <div
          className="absolute right-0 top-24 z-30 rounded-3xl p-5 border-2 border-emerald-400/70 bg-slate-950/90 backdrop-blur-xl shadow-2xl flex flex-col items-center"
          style={{
            width: 260,
            transform: `translateY(${Math.cos((frame / 16) * Math.PI) * 8}px)`,
            boxShadow: "0 15px 35px rgba(0,0,0,0.7), 0 0 25px rgba(34,197,94,0.35)",
          }}
        >
          <span style={{ fontSize: 40 }}>🌾</span>
          <span className="font-black text-emerald-400 font-mono mt-1" style={{ fontSize: 30 }}>
            868.808
          </span>
          <span className="font-extrabold text-white uppercase" style={{ fontSize: 20 }}>
            Ton Gabah (GKG)
          </span>
          <span className="font-semibold text-amber-300 text-center mt-0.5" style={{ fontSize: 15 }}>
            Kontribusi 8,19% Jatim
          </span>
        </div>

        {/* 3D Solo Male Character (Bojonegoro) */}
        <div className="relative z-20 mt-6">
          <BojonegoroCharacter
            pose={pose}
            size="hero"
            isSpeaking={isSpeaking}
            accentColor="#facc15"
            showNameplate
            nameplateTitle="Mas Angling · Bojonegoro"
            nameplateSubtitle="Produsen Padi No. 1 Jawa Timur 2026"
          />
        </div>

        {/* Pop-in Golden Ribbon when VO announces "Penghasil Padi Nomor Satu di Jawa Timur!" */}
        {showChampBanner && (
          <div
            className="absolute bottom-20 z-30 px-8 py-4 rounded-3xl border-2 border-white shadow-2xl flex items-center gap-3"
            style={{
              background: "linear-gradient(90deg, #f59e0b 0%, #fde047 50%, #10b981 100%)",
              transform: `scale(${interpolate(champBannerSpring, [0, 1], [0.5, 1])})`,
              boxShadow: "0 20px 50px rgba(234, 179, 8, 0.75)",
            }}
          >
            <span style={{ fontSize: 34 }}>👑</span>
            <span className="font-black text-slate-950 uppercase tracking-tight" style={{ fontSize: 28 }}>
              RESMI JUARA 1 PADI JAWA TIMUR 2026!
            </span>
          </div>
        )}
      </div>

      {/* 3. BOTTOM RICE PADDY HORIZON SILHOUETTE */}
      <div className="absolute left-8 right-8 bottom-44 h-28 overflow-hidden rounded-3xl bg-gradient-to-t from-emerald-950/90 to-transparent border-b-2 border-emerald-500/40 z-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
          {stalks.map((stalk, idx) => {
            const sway = Math.sin((frame * 0.08 + stalk.delay) * Math.PI) * 14;
            const xPos = stalk.x * 6;
            return (
              <g key={idx}>
                <path
                  d={`M ${xPos} 120 Q ${xPos + sway * 0.5} 65 ${xPos + sway} ${120 - stalk.height * 0.55}`}
                  stroke="#eab308"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <circle cx={xPos + sway} cy={120 - stalk.height * 0.55} r="5.5" fill="#fef08a" />
                <circle cx={xPos + sway - 4} cy={120 - stalk.height * 0.55 + 6} r="4.5" fill="#eab308" />
                <circle cx={xPos + sway + 4} cy={120 - stalk.height * 0.55 + 6} r="4.5" fill="#facc15" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Sparkle Particles */}
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.pX}%`,
            top: `${p.pY}%`,
            width: p.size,
            height: p.size,
            backgroundColor: idx % 2 === 0 ? "#fef08a" : "#4ade80",
            opacity: p.alpha,
            boxShadow: "0 0 12px #fef08a",
          }}
        />
      ))}
    </div>
  );
};
