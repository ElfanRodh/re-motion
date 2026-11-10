import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { BojonegoroCharacter, isVoiceoverSpeakingAtSecond } from "../character/BojonegoroCharacter";

interface Scene5ApresiasiPetaniProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const Scene5ApresiasiPetani: React.FC<Scene5ApresiasiPetaniProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 5 starts at 42.2s (1266 frames)
  const globalSec = 42.2 + frame / fps;
  const isSpeaking = isVoiceoverSpeakingAtSecond(globalSec);

  // Switch pose from presenter (42.2s - 47.4s) to hero celebration at "Matur nuwun petani Bojonegoro!" (47.4s+)
  const pose = globalSec < 47.3 ? "presenter" : "hero";

  // CTA pop-in at 49.5s (frame 219 of Scene 5) when VO says "Wong Bojonegoro, bangga nggak nih? Tulis di komentar!"
  const ctaSpring = spring({
    frame: Math.max(0, frame - 210),
    fps,
    config: { damping: 9, stiffness: 130 },
  });

  const heartBeat = 1 + Math.sin((frame / 7) * Math.PI) * 0.16;
  const commentBounce = 1 + Math.sin(((frame + 4) / 7) * Math.PI) * 0.14;

  // Confetti rain
  const confetti = Array.from({ length: 34 }).map((_, i) => {
    const x = (i * 19 + 5) % 96;
    const y = ((frame * 2.6 + i * 29) % 115) - 10;
    const rot = (frame * 4.5 + i * 45) % 360;
    const colors = ["#facc15", "#22c55e", "#38bdf8", "#f43f5e", "#a855f7"];
    const color = colors[i % colors.length];
    return { x, y, rot, color };
  });

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between px-10 pt-28 pb-48 select-none">
      {/* Confetti Rain */}
      {confetti.map((c, idx) => (
        <div
          key={idx}
          className="absolute rounded-sm pointer-events-none"
          style={{
            width: 12,
            height: 18,
            left: `${c.x}%`,
            top: `${c.y}%`,
            backgroundColor: c.color,
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.85,
            boxShadow: `0 0 8px ${c.color}`,
          }}
        />
      ))}

      {/* 1. TOP HEADLINE */}
      <div className="flex flex-col items-center z-20">
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border-2 border-yellow-400/70 bg-amber-950/85 backdrop-blur-xl mb-4 shadow-2xl">
          <span style={{ fontSize: 24 }}>🌾</span>
          <span className="font-black tracking-widest uppercase text-yellow-300" style={{ fontSize: 19 }}>
            SINERGI PEMERINTAH DAERAH & PETANI HEBAT BOJONEGORO
          </span>
        </div>

        <KineticText
          text={scene.title}
          animation="pop-in"
          highlightWords={["Matur", "Nuwun", "Petani", "Bojonegoro!"]}
          accentColor="#facc15"
          className="font-black text-white text-center tracking-tight drop-shadow-2xl"
          style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 920 }}
        />
      </div>

      {/* 2. CENTER: Large Hero Male Character + Institutional Badges */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-20 my-1">
        <BojonegoroCharacter
          pose={pose}
          size="xl"
          isSpeaking={isSpeaking}
          accentColor="#facc15"
          badgeText="Matur Nuwun!"
          badgeIcon="🙏"
          showNameplate
          nameplateTitle="Pemerintah Kabupaten Bojonegoro"
          nameplateSubtitle="Dinas Kominfo · Dinas Ketahanan Pangan & Pertanian"
        />
      </div>

      {/* 3. BOTTOM CALL TO ACTION & SOCIAL MEDIA ENGAGEMENT BAR */}
      <div className="relative w-full z-30 flex flex-col items-center gap-3">
        {/* Interactive Call-to-Action Banner */}
        <div
          className="w-full rounded-3xl px-8 py-4 border-4 border-white shadow-2xl flex items-center justify-center gap-4"
          style={{
            maxWidth: 900,
            background: "linear-gradient(90deg, #f59e0b 0%, #fde047 50%, #22c55e 100%)",
            transform: `scale(${frame >= 210 ? interpolate(ctaSpring, [0, 1], [0.85, 1.03]) : 1})`,
            boxShadow: "0 20px 50px rgba(234, 179, 8, 0.65)",
          }}
        >
          <span style={{ fontSize: 34 }}>👇</span>
          <span className="font-black text-slate-950 uppercase tracking-tight text-center" style={{ fontSize: 27 }}>
            WONG BOJONEGORO BANGGA? ABSEN DI KOMENTAR!
          </span>
          <span style={{ fontSize: 34 }}>🌾</span>
        </div>

        {/* Social Media Engagement Bar */}
        <div
          className="flex items-center justify-center gap-8 px-8 py-3 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/40 backdrop-blur-xl shadow-2xl"
        >
          <div
            className="flex items-center gap-2.5 font-black text-rose-400"
            style={{ fontSize: 22, transform: `scale(${heartBeat})` }}
          >
            <span style={{ fontSize: 28 }}>❤️</span>
            <span>Bangga Bojonegoro</span>
          </div>
          <div className="w-0.5 h-6 bg-slate-700" />
          <div
            className="flex items-center gap-2.5 font-black text-sky-400"
            style={{ fontSize: 22, transform: `scale(${commentBounce})` }}
          >
            <span style={{ fontSize: 28 }}>💬</span>
            <span>Tulis Komentar</span>
          </div>
          <div className="w-0.5 h-6 bg-slate-700" />
          <div className="flex items-center gap-2.5 font-black text-emerald-400" style={{ fontSize: 22 }}>
            <span style={{ fontSize: 28 }}>🔁</span>
            <span>Bagikan Reels</span>
          </div>
        </div>
      </div>
    </div>
  );
};
