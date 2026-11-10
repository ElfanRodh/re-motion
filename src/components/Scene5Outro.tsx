import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { PaddyFieldRow, PaddyIcon, PaddyStalk } from "./common/PaddyIllustration";
import { TrophyFlatIcon } from "./common/FlatIcons";
import { JatimGeoMap } from "./common/JatimGeoMap";
import { OceanFlatBackground } from "./common/OceanFlatBackground";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sway = Math.sin(frame * 0.08) * 5;
  const badgePulse = 1 + Math.sin(frame * 0.14) * 0.03;

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
            padding: "10px 28px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PaddyIcon size={24} color="#004670" />
          <span>LUMBUNG PANGAN JAWA TIMUR</span>
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            margin: "0 0 12px",
            textAlign: "center",
            lineHeight: 1.06,
            color: "#FFFFFF",
          }}
        >
          MATUR NUWUN <span style={{ color: "#FFD100" }}>PETANI BOJONEGORO!</span>
        </h1>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#CAF0F8",
            textAlign: "center",
          }}
        >
          Kerja Keras Petani & Sinergi Pemerintah Menjaga Kedaulatan Pangan
        </div>
      </div>

      {/* 2. CENTERPIECE: HARVEST CREST & LIVE JATIM MAP */}
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
        {/* Top Crest Banner */}
        <div
          style={{
            backgroundColor: "#004670",
            borderRadius: 16,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PaddyStalk width={64} height={115} swayDeg={sway} flip />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#FFD100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
                transform: `scale(${badgePulse})`,
              }}
            >
              <TrophyFlatIcon size={36} color="#004670" />
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#FFD100" }}>
              PERINGKAT #1 SE-JAWA TIMUR
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>
              Kabupaten Bojonegoro · Bumi Angling Darma
            </div>
          </div>

          <PaddyStalk width={64} height={115} swayDeg={-sway} />
        </div>

        {/* Live Twinkling Map */}
        <div style={{ flex: 1, minHeight: 0, paddingTop: 12 }}>
          <JatimGeoMap highlightTop3 showBojonegoroCallout />
        </div>
      </div>

      {/* 3. 2x2 SUMMARY SCORECARD GRID */}
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
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>PRODUKSI GABAH (GKG)</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
            <AnimatedCounter targetValue={868808} durationFrames={60} unit="Ton" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>
            Tertinggi dari 38 Kab/Kota Jatim
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>PRODUKSI BERAS</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
            <AnimatedCounter targetValue={501670} delayFrames={8} durationFrames={60} unit="Ton" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#48CAE4", marginTop: 2 }}>
            Beras Bersih Siap Konsumsi
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>LUAS PANEN PADI</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#48CAE4", marginTop: 4 }}>
            <AnimatedCounter targetValue={159190} delayFrames={16} durationFrames={60} unit="Ha" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>
            Lahan Pertanian Produktif
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#005A8D",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>PRODUKSI JAWA TIMUR</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
            <AnimatedCounter targetValue={10.61} decimals={2} delayFrames={24} durationFrames={60} unit="Jt Ton" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>
            Provinsi Peringkat #1 Nasional
          </div>
        </div>
      </div>

      {/* 4. BOTTOM: Animated Swaying Paddy Field Row */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#005A8D",
          borderRadius: 18,
          padding: "6px 16px 0",
          zIndex: 10,
        }}
      >
        <PaddyFieldRow frame={frame} count={15} />
      </div>
    </AbsoluteFill>
  );
};
