import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FlatVectorBackground } from "../components/FlatVectorBackground";
import { EditorialMillingPlant } from "../components/FlatVectorIllustrations";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { PopBurst, ShockwaveRing } from "../components/PopBurst";

export const FVScene4Beras: React.FC = () => {
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

  const plantCardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.7 },
  });

  const progressCardSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.7 },
  });

  // Elastic Spring Bar Progress
  const gkgSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.6 },
  });
  const riceSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.6 },
  });

  const gkgBarProgress = interpolate(gkgSpring, [0, 1], [0, 100]);
  const conversionProgress = interpolate(riceSpring, [0, 1], [0, 57.74]);

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

      <PopBurst delay={2} color="#0284C7" count={8} radius={120} />
      <ShockwaveRing delay={2} color="#38BDF8" maxRadius={170} />
      <PopBurst x="78%" y="36%" delay={18} color="#FDE047" count={6} radius={90} />

      {/* 1. HEADER & MAIN STAT CARD WITH POPUP SLAM */}
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
          🍚 KONVERSI BERAS SIAP KONSUMSI
        </div>

        <h1
          style={{
            fontSize: 62,
            fontWeight: 900,
            margin: "0 0 16px",
            textAlign: "center",
            color: "#FFFFFF",
            transform: `translateY(${interpolate(headerSpring, [0, 1], [50, 0])}px) scale(${headerSpring})`,
          }}
        >
          SUPLAI PANGAN <span style={{ color: "#F59E0B" }}>MASYARAKAT</span>
        </h1>

        <div
          style={{
            width: "100%",
            backgroundColor: "#152E52",
            borderRadius: 22,
            padding: "24px 28px",
            textAlign: "center",
            boxShadow: "0 10px 0 #0A172A",
            transform: `scale(${headerSpring})`,
          }}
        >
          <div style={{ fontSize: 18, color: "#94A3B8", fontWeight: 800, marginBottom: 4 }}>
            PRODUKSI BERAS SIAP KONSUMSI BOJONEGORO 2026
          </div>
          <div style={{ fontSize: 82, fontWeight: 900, color: "#F59E0B", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={501670} durationFrames={50} unit="Ton Beras" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>BAHAN GABAH (GKG)</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={868808} delayFrames={8} durationFrames={45} unit="Ton" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>RENDEMEN BERAS</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FDE047", marginTop: 4 }}>
                <AnimatedCounter targetValue={57.74} decimals={2} delayFrames={14} durationFrames={45} unit="%" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>KONTRIBUSI BERAS</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#38BDF8", marginTop: 4 }}>
                <AnimatedCounter targetValue={8.2} decimals={2} delayFrames={20} durationFrames={45} unit="%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODERN MILLING FACILITY DIAGRAM WITH POPUP SPRING */}
      <div
        style={{
          width: "100%",
          height: 290,
          backgroundColor: "#152E52",
          borderRadius: 22,
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
          transform: `scale(${plantCardSpring}) translateY(${interpolate(plantCardSpring, [0, 1], [60, 0])}px)`,
        }}
      >
        <div style={{ padding: "16px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 19, fontWeight: 900, color: "#F59E0B" }}>
            ⚙️ FASILITAS PENGGILINGAN & PENGEMASAN BERAS MODERN
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#FDE047" }}>
            Standar Mutu BPS
          </span>
        </div>

        <div style={{ marginTop: 8 }}>
          <EditorialMillingPlant width={976} height={240} />
        </div>
      </div>

      {/* 3. DUAL RATIO PROGRESS & COMPARISON CARD WITH ELASTIC SPRINGS */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#152E52",
          borderRadius: 22,
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
          transform: `scale(${progressCardSpring})`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 900, color: "#FFFFFF", marginBottom: 6 }}>
              <span>Total Gabah Kering Giling (100%)</span>
              <span>868.808 Ton</span>
            </div>
            <div style={{ width: "100%", height: 20, backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden", boxShadow: "0 3px 0 #07101C" }}>
              <div style={{ width: `${gkgBarProgress}%`, height: "100%", backgroundColor: "#0284C7" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 900, color: "#F59E0B", marginBottom: 6 }}>
              <span>Beras Siap Konsumsi (57,74%)</span>
              <span style={{ color: "#FDE047" }}>501.670 Ton</span>
            </div>
            <div style={{ width: "100%", height: 24, backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden", boxShadow: "0 3px 0 #07101C" }}>
              <div style={{ width: `${conversionProgress}%`, height: "100%", backgroundColor: "#F59E0B" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <div style={{ backgroundColor: "#0C1B33", padding: "16px 20px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 0 #07101C" }}>
            <div>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>TOTAL BERAS JATIM</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                <AnimatedCounter targetValue={6.12} decimals={2} delayFrames={10} durationFrames={45} unit="Jt Ton" />
              </div>
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, color: "#F59E0B", backgroundColor: "#152E52", padding: "6px 14px", borderRadius: 8 }}>
              #1 RI
            </span>
          </div>

          <div style={{ backgroundColor: "#0C1B33", padding: "16px 20px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 0 #07101C" }}>
            <div>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>TOTAL BERAS NASIONAL</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#38BDF8", marginTop: 2 }}>
                <AnimatedCounter targetValue={33.11} decimals={2} delayFrames={18} durationFrames={45} unit="Jt Ton" />
              </div>
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, color: "#94A3B8", backgroundColor: "#152E52", padding: "6px 14px", borderRadius: 8 }}>
              BPS 2026
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
