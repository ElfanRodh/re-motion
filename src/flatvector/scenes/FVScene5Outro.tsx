import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FlatVectorBackground } from "../components/FlatVectorBackground";
import { EditorialCrest, EditorialRiceTerraces } from "../components/FlatVectorIllustrations";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { PopBurst, ShockwaveRing } from "../components/PopBurst";

export const FVScene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy Spring Pop-up animations
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 240, mass: 0.5 },
  });

  const headerSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 9, stiffness: 210, mass: 0.6 },
  });

  const crestCardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.6 },
  });

  const crestScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 7, stiffness: 220, mass: 0.5 },
  });

  const card1Spring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });
  const card2Spring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });
  const card3Spring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });
  const card4Spring = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });

  const ctaSpring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.6 },
  });

  // Energetic recurring heartbeat bounce for CTA
  const ctaBounce = 1 + Math.abs(Math.sin((frame / 12) * Math.PI)) * 0.05;
  const livelyPulse = 1 + Math.sin(frame * 0.18) * 0.035;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 48px 260px",
        backgroundColor: "#0C1B33",
        overflow: "hidden",
      }}
    >
      <FlatVectorBackground />

      {/* Celebratory Pop Bursts */}
      <PopBurst delay={3} color="#F59E0B" count={10} radius={140} />
      <ShockwaveRing delay={3} color="#FDE047" maxRadius={190} />
      <PopBurst x="50%" y="36%" delay={14} color="#FDE047" count={10} radius={130} />
      <ShockwaveRing x="50%" y="36%" delay={14} color="#F59E0B" maxRadius={160} />
      <PopBurst x="50%" y="90%" delay={30} color="#F59E0B" count={8} radius={100} />

      {/* 1. HEADER WITH SPRING POP */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `scale(${badgeSpring * livelyPulse})`,
            backgroundColor: "#F59E0B",
            color: "#0C1B33",
            fontWeight: 900,
            fontSize: 24,
            padding: "9px 32px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1.2,
            boxShadow: "0 6px 0 #D97706",
          }}
        >
          🌾 LUMBUNG PANGAN JAWA TIMUR
        </div>

        <h1
          style={{
            fontSize: 66,
            fontWeight: 900,
            margin: "0 0 12px",
            textAlign: "center",
            lineHeight: 1.05,
            color: "#FFFFFF",
            transform: `translateY(${interpolate(headerSpring, [0, 1], [50, 0])}px) scale(${headerSpring})`,
          }}
        >
          MATUR NUWUN <span style={{ color: "#F59E0B" }}>PETANI BOJONEGORO!</span>
        </h1>

        <div style={{ fontSize: 23, fontWeight: 800, color: "#94A3B8", textAlign: "center" }}>
          Kerja Keras Petani & Sinergi Pemerintah Menjaga Kedaulatan Pangan
        </div>
      </div>

      {/* 2. CENTERPIECE: MONUMENTAL EDITORIAL CREST & RICE TERRACES WITH EXPLOSIVE POP */}
      <div
        style={{
          width: "100%",
          height: 480,
          backgroundColor: "#152E52",
          borderRadius: 24,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          boxShadow: "0 12px 0 #0A172A",
          transform: `scale(${crestCardSpring}) translateY(${interpolate(crestCardSpring, [0, 1], [70, 0])}px)`,
        }}
      >
        {/* Central Crest Emblem with Bouncy Overshoot */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: 32,
            transform: `scale(${crestScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EditorialCrest size={210} />
          <div
            style={{
              backgroundColor: "#F59E0B",
              color: "#0C1B33",
              fontWeight: 900,
              fontSize: 23,
              padding: "7px 28px",
              borderRadius: 8,
              marginTop: 10,
              boxShadow: "0 5px 0 #D97706",
              transform: `scale(${livelyPulse})`,
            }}
          >
            🥇 PERINGKAT #1 JAWA TIMUR
          </div>
          <div style={{ fontSize: 17, fontWeight: 900, color: "#FFFFFF", marginTop: 6 }}>
            Kabupaten Bojonegoro · Bumi Angling Darma
          </div>
        </div>

        {/* Foreground Terraces */}
        <div style={{ position: "relative", zIndex: 5, width: "100%", height: 180 }}>
          <EditorialRiceTerraces width={976} height={180} />
        </div>
      </div>

      {/* 3. 2x2 SUMMARY SCORECARD GRID WITH STAGGERED POPUPS */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "#152E52",
            borderRadius: 20,
            padding: "22px 26px",
            boxShadow: "0 8px 0 #0A172A",
            transform: `scale(${card1Spring}) translateY(${interpolate(card1Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI GABAH (GKG)</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#F59E0B", margin: "4px 0" }}>
            <AnimatedCounter targetValue={868808} durationFrames={45} unit="Ton" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>
            Peringkat #1 di Jawa Timur
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#152E52",
            borderRadius: 20,
            padding: "22px 26px",
            boxShadow: "0 8px 0 #0A172A",
            transform: `scale(${card2Spring}) translateY(${interpolate(card2Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI BERAS</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF", margin: "4px 0" }}>
            <AnimatedCounter targetValue={501670} delayFrames={8} durationFrames={45} unit="Ton" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#38BDF8" }}>
            Beras Siap Konsumsi
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#152E52",
            borderRadius: 20,
            padding: "22px 26px",
            boxShadow: "0 8px 0 #0A172A",
            transform: `scale(${card3Spring}) translateY(${interpolate(card3Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8" }}>LUAS PANEN</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#38BDF8", margin: "4px 0" }}>
            <AnimatedCounter targetValue={159190} delayFrames={14} durationFrames={45} unit="Ha" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>
            Sawah Pertanian Produktif
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#152E52",
            borderRadius: 20,
            padding: "22px 26px",
            boxShadow: "0 8px 0 #0A172A",
            transform: `scale(${card4Spring}) translateY(${interpolate(card4Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI JAWA TIMUR</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#FDE047", margin: "4px 0" }}>
            <AnimatedCounter targetValue={10.61} decimals={2} delayFrames={20} durationFrames={45} unit="Jt T" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#10B981" }}>
            Provinsi Juara 1 Nasional
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
