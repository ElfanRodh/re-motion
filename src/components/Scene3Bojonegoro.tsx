import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { PaddyFieldRow, PaddyIcon } from "./common/PaddyIllustration";
import { MapPinFlatIcon, TrophyFlatIcon } from "./common/FlatIcons";
import { JatimGeoMap } from "./common/JatimGeoMap";
import { OceanFlatBackground } from "./common/OceanFlatBackground";

export const Scene3Bojonegoro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgePulse = 1 + Math.sin(frame * 0.14) * 0.025;
  const barBreath = Math.sin(frame * 0.12) * 1.2;

  const barWidthBojonegoro =
    interpolate(frame, [0.3 * fps, 1.7 * fps], [0, 96], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }) +
    (frame > 1.7 * fps ? barBreath : 0);

  const barWidthLamongan = interpolate(frame, [0.45 * fps, 1.85 * fps], [0, 91], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const barWidthNgawi = interpolate(frame, [0.6 * fps, 2.0 * fps], [0, 81], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const barWidthJember = interpolate(frame, [0.75 * fps, 2.15 * fps], [0, 68], {
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

      {/* 1. HEADER & STAT CARD */}
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
            fontSize: 25,
            padding: "10px 32px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1.2,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TrophyFlatIcon size={24} color="#004670" />
          <span>JUARA 1 JAWA TIMUR</span>
        </div>

        <h1
          style={{
            fontSize: 60,
            fontWeight: 900,
            margin: "0 0 18px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          KABUPATEN BOJONEGORO
        </h1>

        <div
          style={{
            width: "100%",
            backgroundColor: "#005A8D",
            borderRadius: 20,
            padding: "24px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 20, color: "#CAF0F8", fontWeight: 800, marginBottom: 4 }}>
            TOTAL PRODUKSI GABAH KERING GILING (GKG) 2026
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#FFD100", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={868808} durationFrames={65} unit="Ton" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>LUAS PANEN</div>
              <div style={{ fontSize: 25, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={159190} delayFrames={8} durationFrames={60} unit="Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>PRODUKTIVITAS</div>
              <div style={{ fontSize: 25, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
                <AnimatedCounter targetValue={5.46} decimals={2} delayFrames={14} durationFrames={60} unit="Ton/Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>PORSI JATIM</div>
              <div style={{ fontSize: 25, fontWeight: 900, color: "#48CAE4", marginTop: 4 }}>
                <AnimatedCounter targetValue={8.19} decimals={2} delayFrames={20} durationFrames={60} unit="%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH LEADERBOARD CHART (4 BESAR PRODUSEN PADI JATIM) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          backgroundColor: "#005A8D",
          padding: "26px 32px",
          borderRadius: 20,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TrophyFlatIcon size={24} color="#FFD100" />
            <span style={{ fontSize: 22, fontWeight: 900, color: "#FFD100" }}>
              KLASEMEN PRODUSEN PADI JAWA TIMUR (GKG)
            </span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>
            Unggul +16.616 Ton dari Peringkat #2
          </span>
        </div>

        {/* Row 1: Bojonegoro */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              fontWeight: 900,
              marginBottom: 8,
              color: "#FFFFFF",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <PaddyIcon size={24} color="#FFD100" />
              1. Kabupaten Bojonegoro
            </span>
            <span style={{ color: "#FFD100" }}>
              <AnimatedCounter targetValue={868808} durationFrames={60} unit="Ton" />
            </span>
          </div>
          <div
            style={{
              height: 26,
              width: "100%",
              backgroundColor: "#004670",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${barWidthBojonegoro}%`,
                backgroundColor: "#FFD100",
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        {/* Row 2: Lamongan */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 23,
              fontWeight: 800,
              color: "#CAF0F8",
              marginBottom: 8,
            }}
          >
            <span>2. Kabupaten Lamongan</span>
            <span style={{ color: "#FFFFFF" }}>
              <AnimatedCounter targetValue={852192} delayFrames={10} durationFrames={60} unit="Ton" />
            </span>
          </div>
          <div
            style={{
              height: 20,
              width: "100%",
              backgroundColor: "#004670",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${barWidthLamongan}%`,
                backgroundColor: "#48CAE4",
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        {/* Row 3: Ngawi */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 23,
              fontWeight: 800,
              color: "#CAF0F8",
              marginBottom: 8,
            }}
          >
            <span>3. Kabupaten Ngawi</span>
            <span style={{ color: "#FFFFFF" }}>
              <AnimatedCounter targetValue={768307} delayFrames={18} durationFrames={60} unit="Ton" />
            </span>
          </div>
          <div
            style={{
              height: 20,
              width: "100%",
              backgroundColor: "#004670",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${barWidthNgawi}%`,
                backgroundColor: "#90E0EF",
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        {/* Row 4: Jember */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              fontWeight: 700,
              color: "#CAF0F8",
              marginBottom: 8,
            }}
          >
            <span>4. Kabupaten Jember</span>
            <span style={{ color: "#CAF0F8" }}>
              <AnimatedCounter targetValue={642150} delayFrames={24} durationFrames={60} unit="Ton" />
            </span>
          </div>
          <div
            style={{
              height: 18,
              width: "100%",
              backgroundColor: "#004670",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${barWidthJember}%`,
                backgroundColor: "#0088CC",
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. PETA KORIDOR LUMBUNG PADI & TANAMAN PADI BERGERAK */}
      <div
        style={{
          width: "100%",
          height: 365,
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MapPinFlatIcon size={22} color="#FFD100" />
            <span style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF" }}>
              KORIDOR LUMBUNG PADI BARAT–UTARA JAWA TIMUR
            </span>
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#FFD100" }}>
            Bojonegoro · Lamongan · Ngawi
          </span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <JatimGeoMap highlightTop3 showBojonegoroCallout compact />
        </div>
      </div>

      {/* 4. BOTTOM: Animated Swaying Paddy Row */}
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
