import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FlatVectorBackground } from "../components/FlatVectorBackground";
import { FlatVectorJatimMap } from "../components/FlatVectorJatimMap";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { PopBurst, ShockwaveRing } from "../components/PopBurst";

export const FVScene2Jatim: React.FC = () => {
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

  const mapCardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.7 },
  });

  // Elastic Pneumatic Piston Springs for Bars (Bouncing into position!)
  const bar1Spring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.6 },
  });
  const bar2Spring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.6 },
  });
  const bar3Spring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.6 },
  });
  const bar4Spring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.6 },
  });

  const bar1Height = interpolate(bar1Spring, [0, 1], [0, 165]);
  const bar2Height = interpolate(bar2Spring, [0, 1], [0, 135]);
  const bar3Height = interpolate(bar3Spring, [0, 1], [0, 128]);
  const bar4Height = interpolate(bar4Spring, [0, 1], [0, 88]);

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

      <PopBurst delay={2} color="#F59E0B" count={8} radius={120} />
      <ShockwaveRing delay={2} color="#FDE047" maxRadius={170} />
      <PopBurst x="19%" y="82%" delay={18} color="#F59E0B" count={6} radius={90} />

      {/* 1. HEADER & TOTAL STAT CARD */}
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
            fontSize: 23,
            padding: "9px 30px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1.2,
            boxShadow: "0 6px 0 #D97706",
          }}
        >
          🥇 PERINGKAT 1 DARI 38 PROVINSI DI INDONESIA
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            margin: "0 0 16px",
            textAlign: "center",
            lineHeight: 1.06,
            color: "#FFFFFF",
            transform: `translateY(${interpolate(headerSpring, [0, 1], [50, 0])}px) scale(${headerSpring})`,
          }}
        >
          JAWA TIMUR <span style={{ color: "#F59E0B" }}>JUARA 1 NASIONAL</span>
        </h1>

        {/* Flat Vector Highlight Banner with Spring */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#152E52",
            borderRadius: 22,
            padding: "20px 24px",
            textAlign: "center",
            boxShadow: "0 10px 0 #0A172A",
            transform: `scale(${headerSpring})`,
          }}
        >
          <div style={{ fontSize: 17, color: "#94A3B8", fontWeight: 800, marginBottom: 4 }}>
            TOTAL PRODUKSI GABAH KERING GILING (GKG) JAWA TIMUR 2026
          </div>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#F59E0B", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={10.61} decimals={2} durationFrames={50} unit="Juta Ton" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginTop: 14,
            }}
          >
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "12px 8px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>LUAS PANEN JATIM</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={1.85} decimals={2} delayFrames={8} durationFrames={45} unit="Jt Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "12px 8px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>BERAS JATIM</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FDE047", marginTop: 4 }}>
                <AnimatedCounter targetValue={6.12} decimals={2} delayFrames={14} durationFrames={45} unit="Jt Ton" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "12px 8px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>TOTAL NASIONAL</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#38BDF8", marginTop: 4 }}>
                <AnimatedCounter targetValue={57.45} decimals={2} delayFrames={20} durationFrames={45} unit="Jt Ton" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EDITORIAL GEOJSON MAP OF JAWA TIMUR WITH POPUP SPRING */}
      <div
        style={{
          width: "100%",
          height: 440,
          backgroundColor: "#152E52",
          borderRadius: 22,
          padding: "18px 24px 18px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
          transform: `scale(${mapCardSpring}) translateY(${interpolate(mapCardSpring, [0, 1], [60, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 21, fontWeight: 900, color: "#FFFFFF" }}>
            PETA LUMBUNG PANGAN PROVINSI JAWA TIMUR
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>
            38 Kabupaten/Kota
          </span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <FlatVectorJatimMap highlightTop3 showCallout />
        </div>
      </div>

      {/* 3. NATIONAL PROVINCIAL BAR CHART WITH ELASTIC PISTONS */}
      <div
        style={{
          width: "100%",
          height: 300,
          backgroundColor: "#152E52",
          borderRadius: 22,
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
            4 BESAR PROVINSI PENGHASIL PADI DI INDONESIA (GKG)
          </span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "#F59E0B" }}>
            Jatim Sumbang 18,5% RI
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 240, paddingTop: 12 }}>
          {/* Bar 1: Jatim */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 25, fontWeight: 900, color: "#F59E0B", marginBottom: 8 }}>
              <AnimatedCounter targetValue={10.61} decimals={2} durationFrames={45} unit="Jt" />
            </span>
            <div style={{ width: "100%", height: `${bar1Height}px`, display: "flex", borderRadius: "8px 8px 0 0", overflow: "hidden", boxShadow: "0 -4px 0 #FDE047" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#F59E0B" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#D97706" }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 900, marginTop: 10, color: "#FFFFFF" }}>
              1. Jawa Timur
            </span>
          </div>

          {/* Bar 2: Jateng */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={8.89} decimals={2} delayFrames={8} durationFrames={45} unit="Jt" />
            </span>
            <div style={{ width: "100%", height: `${bar2Height}px`, display: "flex", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#0284C7" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#0369A1" }} />
            </div>
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#94A3B8" }}>
              2. Jateng
            </span>
          </div>

          {/* Bar 3: Jabar */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={8.62} decimals={2} delayFrames={14} durationFrames={45} unit="Jt" />
            </span>
            <div style={{ width: "100%", height: `${bar3Height}px`, display: "flex", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#38BDF8" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#0284C7" }} />
            </div>
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#94A3B8" }}>
              3. Jabar
            </span>
          </div>

          {/* Bar 4: Sulsel */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={5.42} decimals={2} delayFrames={20} durationFrames={45} unit="Jt" />
            </span>
            <div style={{ width: "100%", height: `${bar4Height}px`, display: "flex", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#64748B" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#475569" }} />
            </div>
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#94A3B8" }}>
              4. Sulsel
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
