import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FlatVectorBackground } from "../components/FlatVectorBackground";
import { EditorialRiceTerraces, EditorialSun } from "../components/FlatVectorIllustrations";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { PopBurst, ShockwaveRing } from "../components/PopBurst";

export const FVScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy Spring Pop-up animations
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 240, mass: 0.5 },
  });

  const titleSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 9, stiffness: 210, mass: 0.6 },
  });

  const heroCardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.7 },
  });

  const sunSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.5 },
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

  // Continuous energetic breathing pulse
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

      {/* Pop Bursts at Key Animation Impacts */}
      <PopBurst delay={3} color="#F59E0B" count={8} radius={110} />
      <ShockwaveRing delay={3} color="#FDE047" maxRadius={160} />
      <PopBurst x="84%" y="36%" delay={16} color="#FDE047" count={6} radius={80} />

      {/* 1. EDITORIAL HEADER WITH EXPLOSIVE POPUP */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Bouncy Category Pill */}
        <div
          style={{
            transform: `scale(${badgeSpring * livelyPulse})`,
            backgroundColor: "#F59E0B",
            color: "#0C1B33",
            fontWeight: 900,
            fontSize: 24,
            padding: "10px 32px",
            borderRadius: 10,
            marginBottom: 16,
            letterSpacing: 1.5,
            boxShadow: "0 6px 0 #D97706",
          }}
        >
          🏆 PRODUSEN PADI #1 JAWA TIMUR
        </div>

        {/* Slamming Headline with Elastic Bounce */}
        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.04,
            margin: "0 0 12px",
            textAlign: "center",
            color: "#FFFFFF",
            letterSpacing: -0.5,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [60, 0])}px) scale(${titleSpring})`,
          }}
        >
          BOJONEGORO <span style={{ color: "#F59E0B" }}>JUARA 1 PADI</span> JAWA TIMUR
        </h1>

        <div
          style={{
            fontSize: 23,
            fontWeight: 800,
            color: "#94A3B8",
            textAlign: "center",
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          }}
        >
          Data Badan Pusat Statistik · Rilis 2 November 2026
        </div>
      </div>

      {/* 2. CENTER STAGE: HERO SUN & RICE TERRACES WITH POPUP SLAM */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 440,
          backgroundColor: "#152E52",
          borderRadius: 24,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 10,
          boxShadow: "0 12px 0 #0A172A",
          transform: `scale(${heroCardSpring}) translateY(${interpolate(heroCardSpring, [0, 1], [80, 0])}px)`,
        }}
      >
        {/* Rising Editorial Sun with Pop Spring */}
        <div
          style={{
            position: "absolute",
            top: interpolate(sunSpring, [0, 1], [160, 40]),
            left: "50%",
            transform: `translateX(-50%) scale(${sunSpring * (1 + Math.sin(frame * 0.12) * 0.04)})`,
            zIndex: 1,
          }}
        >
          <EditorialSun size={260} rotationSpeed={0.35} />
        </div>

        {/* Center Headline Badge with Punchy Pop */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            margin: "24px 28px 0",
            backgroundColor: "#0A172A",
            borderRadius: 16,
            padding: "18px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${interpolate(heroCardSpring, [0, 1], [0.92, 1])})`,
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#94A3B8" }}>
              TOTAL PRODUKSI GABAH KERING GILING
            </div>
            <div style={{ fontSize: 62, fontWeight: 900, color: "#F59E0B", lineHeight: 1.05 }}>
              <AnimatedCounter targetValue={868808} durationFrames={50} unit="Ton" />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#F59E0B",
              color: "#0C1B33",
              borderRadius: 12,
              padding: "14px 22px",
              textAlign: "center",
              boxShadow: "0 5px 0 #D97706",
              transform: `scale(${livelyPulse})`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 900 }}>PERINGKAT</div>
            <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}>#1</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>JATIM</div>
          </div>
        </div>

        {/* Terraced Rice Fields at Base */}
        <div style={{ position: "relative", zIndex: 5, width: "100%", height: 230 }}>
          <EditorialRiceTerraces width={976} height={230} />
        </div>
      </div>

      {/* 3. 2x2 STAGGERED POP-UP METRIC CARDS */}
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
          <div style={{ fontSize: 17, fontWeight: 800, color: "#94A3B8" }}>LUAS PANEN 2026</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF", margin: "4px 0" }}>
            <AnimatedCounter targetValue={159190} delayFrames={14} durationFrames={45} unit="Ha" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#F59E0B" }}>
            Lahan Pertanian Terbesar
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
          <div style={{ fontSize: 17, fontWeight: 800, color: "#94A3B8" }}>BERAS KONSUMSI</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#FDE047", margin: "4px 0" }}>
            <AnimatedCounter targetValue={501670} delayFrames={18} durationFrames={45} unit="Ton" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#38BDF8" }}>
            Suplai Pangan Rakyat
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
          <div style={{ fontSize: 17, fontWeight: 800, color: "#94A3B8" }}>PORSI JAWA TIMUR</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#38BDF8", margin: "4px 0" }}>
            <AnimatedCounter targetValue={8.19} decimals={2} delayFrames={22} durationFrames={45} unit="%" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8" }}>
            Kontribusi dari 38 Daerah
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
          <div style={{ fontSize: 17, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI JATIM (RI)</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF", margin: "4px 0" }}>
            <AnimatedCounter targetValue={10.61} decimals={2} delayFrames={26} durationFrames={45} unit="Jt T" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981" }}>
            Jawa Timur Juara 1 Nasional
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
