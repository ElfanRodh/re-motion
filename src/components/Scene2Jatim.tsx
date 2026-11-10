import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { JatimGeoMap } from "./common/JatimGeoMap";
import { ChartBarFlatIcon, MapPinFlatIcon } from "./common/FlatIcons";
import { OceanFlatBackground } from "./common/OceanFlatBackground";

export const Scene2Jatim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breath = Math.sin(frame * 0.1) * 4;
  const badgePulse = 1 + Math.sin(frame * 0.14) * 0.025;

  const bar1Height =
    interpolate(frame, [0.3 * fps, 1.7 * fps], [0, 175], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }) +
    (frame > 1.7 * fps ? breath : 0);

  const bar2Height = interpolate(frame, [0.45 * fps, 1.85 * fps], [0, 142], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bar3Height = interpolate(frame, [0.6 * fps, 2.0 * fps], [0, 134], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bar4Height = interpolate(frame, [0.75 * fps, 2.15 * fps], [0, 92], {
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

      {/* 1. HEADER & MAIN STAT CARD */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
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
            fontSize: 23,
            padding: "10px 28px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1,
          }}
        >
          PERINGKAT 1 DARI 38 PROVINSI DI INDONESIA
        </div>

        <h1
          style={{
            fontSize: 60,
            fontWeight: 900,
            margin: "0 0 18px",
            textAlign: "center",
            lineHeight: 1.08,
            color: "#FFFFFF",
          }}
        >
          JAWA TIMUR <span style={{ color: "#FFD100" }}>JUARA 1 NASIONAL</span>
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
            TOTAL PRODUKSI GABAH KERING GILING (GKG) JAWA TIMUR 2026
          </div>
          <div style={{ fontSize: 78, fontWeight: 900, color: "#FFD100", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={10.61} decimals={2} durationFrames={65} unit="Juta Ton" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "14px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>LUAS PANEN JATIM</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={1.85} decimals={2} delayFrames={10} durationFrames={55} unit="Juta Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "14px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>BERAS JATIM</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
                <AnimatedCounter targetValue={6.12} decimals={2} delayFrames={16} durationFrames={55} unit="Juta Ton" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "14px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>PRODUKSI NASIONAL</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#48CAE4", marginTop: 4 }}>
                <AnimatedCounter targetValue={57.45} decimals={2} delayFrames={22} durationFrames={55} unit="Juta Ton" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PETA PROVINSI JAWA TIMUR (Full-Width Animated GeoJSON Map) */}
      <div
        style={{
          width: "100%",
          height: 510,
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "22px 28px 24px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MapPinFlatIcon size={24} color="#FFD100" />
            <span style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
              PETA PRODUKSI PADI JAWA TIMUR
            </span>
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>
            38 Kabupaten/Kota
          </span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <JatimGeoMap highlightTop3 showBojonegoroCallout />
        </div>
      </div>

      {/* 3. BOTTOM: Full-Width Animated Bar Chart of Top 4 Provinces */}
      <div
        style={{
          width: "100%",
          height: 365,
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ChartBarFlatIcon size={24} color="#FFD100" />
            <span style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
              PERBANDINGAN PROVINSI PRODUSEN PADI TERBESAR (GKG)
            </span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#FFD100" }}>
            Jatim Menyumbang 18,5% Nasional
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 245, paddingTop: 12 }}>
          {/* Bar 1 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#FFD100", marginBottom: 8 }}>
              <AnimatedCounter targetValue={10.61} decimals={2} durationFrames={55} unit="Jt" />
            </span>
            <div
              style={{
                width: "100%",
                height: `${bar1Height}px`,
                backgroundColor: "#FFD100",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <span style={{ fontSize: 20, fontWeight: 900, marginTop: 10, color: "#FFFFFF" }}>
              1. Jawa Timur
            </span>
          </div>

          {/* Bar 2 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#CAF0F8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={8.89} decimals={2} delayFrames={10} durationFrames={55} unit="Jt" />
            </span>
            <div
              style={{
                width: "100%",
                height: `${bar2Height}px`,
                backgroundColor: "#48CAE4",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#CAF0F8" }}>
              2. Jawa Tengah
            </span>
          </div>

          {/* Bar 3 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#CAF0F8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={8.62} decimals={2} delayFrames={18} durationFrames={55} unit="Jt" />
            </span>
            <div
              style={{
                width: "100%",
                height: `${bar3Height}px`,
                backgroundColor: "#90E0EF",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#CAF0F8" }}>
              3. Jawa Barat
            </span>
          </div>

          {/* Bar 4 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#CAF0F8", marginBottom: 8 }}>
              <AnimatedCounter targetValue={5.42} decimals={2} delayFrames={26} durationFrames={55} unit="Jt" />
            </span>
            <div
              style={{
                width: "100%",
                height: `${bar4Height}px`,
                backgroundColor: "#0077B6",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <span style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: "#CAF0F8" }}>
              4. Sulsel
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
