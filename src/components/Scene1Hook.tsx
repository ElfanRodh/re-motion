import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { PaddyFieldRow, PaddyIcon } from "./common/PaddyIllustration";
import { MapPinFlatIcon, ShieldCheckFlatIcon, TrophyFlatIcon } from "./common/FlatIcons";
import { JatimGeoMap } from "./common/JatimGeoMap";
import { OceanFlatBackground } from "./common/OceanFlatBackground";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle animations on every frame
  const badgePulse = 1 + Math.sin(frame * 0.14) * 0.025;
  const paddySway = Math.sin(frame * 0.12) * 8;
  const barFill1 = interpolate(frame, [10, 75], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const barFill2 = interpolate(frame, [18, 85], [0, 88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "76px 52px 175px",
        backgroundColor: "#0077B6",
        overflow: "hidden",
      }}
    >
      <OceanFlatBackground />

      {/* 1. HEADER */}
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
            scale: `${interpolate(frame, [0, 0.35 * fps], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }) * badgePulse}`,
            backgroundColor: "#FFD100",
            color: "#004670",
            fontWeight: 900,
            fontSize: 24,
            padding: "10px 30px",
            borderRadius: 10,
            marginBottom: 16,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TrophyFlatIcon size={24} color="#004670" />
          <span>PRODUSEN PADI #1 JAWA TIMUR</span>
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.06,
            margin: "0 0 12px",
            textAlign: "center",
            color: "#FFFFFF",
            translate: interpolate(frame, [0, 0.45 * fps], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          BOJONEGORO <span style={{ color: "#FFD100" }}>JUARA 1 PADI</span> JAWA TIMUR
        </h1>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#CAF0F8",
            textAlign: "center",
          }}
        >
          Data Badan Pusat Statistik · 2 November 2026
        </div>
      </div>

      {/* 2. HERO STAT & ANIMATED MAP CARD */}
      <div
        style={{
          width: "100%",
          height: 560,
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#004670",
            borderRadius: 14,
            padding: "18px 24px",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>
              PRODUKSI GABAH KERING GILING (GKG) BOJONEGORO
            </div>
            <div style={{ fontSize: 60, fontWeight: 900, color: "#FFD100", lineHeight: 1.08 }}>
              <AnimatedCounter targetValue={868808} durationFrames={65} unit="Ton" />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFD100",
              color: "#004670",
              borderRadius: 12,
              padding: "14px 20px",
              textAlign: "center",
              transform: `scale(${badgePulse})`,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 900 }}>PERINGKAT</div>
            <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>#1</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>JATIM</div>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, paddingTop: 12 }}>
          <JatimGeoMap highlightTop3 showBojonegoroCallout />
        </div>
      </div>

      {/* 3. 2x2 GRID OF ANIMATED METRIC CARDS */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          zIndex: 10,
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>LUAS PANEN 2026</span>
            <div style={{ transform: `rotate(${paddySway}deg)` }}>
              <PaddyIcon size={28} color="#FFD100" />
            </div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", margin: "6px 0" }}>
            <AnimatedCounter targetValue={159190} delayFrames={8} durationFrames={65} unit="Ha" />
          </div>
          <div style={{ width: "100%", height: 10, backgroundColor: "#004670", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ width: `${barFill1}%`, height: "100%", backgroundColor: "#FFD100" }} />
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>BERAS KONSUMSI</span>
            <ShieldCheckFlatIcon size={26} color="#48CAE4" />
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#FFD100", margin: "6px 0" }}>
            <AnimatedCounter targetValue={501670} delayFrames={14} durationFrames={65} unit="Ton" />
          </div>
          <div style={{ width: "100%", height: 10, backgroundColor: "#004670", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ width: `${barFill2}%`, height: "100%", backgroundColor: "#48CAE4" }} />
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>KONTRIBUSI JATIM</span>
            <TrophyFlatIcon size={24} color="#FFD100" />
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#48CAE4", margin: "6px 0" }}>
            <AnimatedCounter targetValue={8.19} decimals={2} delayFrames={20} durationFrames={65} unit="%" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#CAF0F8" }}>
            Penopang Utama dari 38 Kab/Kota
          </div>
        </div>

        {/* Card 4 */}
        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>TOTAL JAWA TIMUR</span>
            <MapPinFlatIcon size={24} color="#FFD100" />
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", margin: "6px 0" }}>
            <AnimatedCounter targetValue={10.61} decimals={2} delayFrames={24} durationFrames={65} unit="Jt Ton" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFD100" }}>
            Provinsi Peringkat #1 Nasional
          </div>
        </div>
      </div>

      {/* 4. BOTTOM: Swaying Realistic Paddy Field Row */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#005A8D",
          borderRadius: 18,
          padding: "8px 16px 0",
          zIndex: 10,
        }}
      >
        <PaddyFieldRow frame={frame} count={15} />
      </div>
    </AbsoluteFill>
  );
};
