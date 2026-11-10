import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { PaddyFieldRow, PaddyIcon, PaddyStalk } from "./common/PaddyIllustration";
import { ShieldCheckFlatIcon } from "./common/FlatIcons";
import { OceanFlatBackground } from "./common/OceanFlatBackground";

export const Scene4Beras: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgePulse = 1 + Math.sin(frame * 0.14) * 0.025;
  const sway = Math.sin(frame * 0.1) * 5;
  const barBreath = Math.sin(frame * 0.12) * 1.2;

  const conversionProgress =
    interpolate(frame, [0.3 * fps, 1.7 * fps], [0, 57.74], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }) +
    (frame > 1.7 * fps ? barBreath : 0);

  const gkgBarProgress = interpolate(frame, [0.2 * fps, 1.5 * fps], [0, 100], {
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
            padding: "10px 30px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ShieldCheckFlatIcon size={24} color="#004670" />
          <span>KONVERSI BERAS SIAP KONSUMSI</span>
        </div>

        <h1
          style={{
            fontSize: 58,
            fontWeight: 900,
            margin: "0 0 18px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          SUPLAI PANGAN <span style={{ color: "#FFD100" }}>MASYARAKAT</span>
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
            PRODUKSI BERAS SIAP KONSUMSI BOJONEGORO 2026
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#FFD100", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={501670} durationFrames={65} unit="Ton Beras" />
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
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>BAHAN BAKU GABAH</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={868808} delayFrames={8} durationFrames={55} unit="Ton" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>RENDEMEN BERAS</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
                <AnimatedCounter targetValue={57.74} decimals={2} delayFrames={14} durationFrames={55} unit="%" />
              </div>
            </div>
            <div style={{ backgroundColor: "#004670", borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>PORSI BERAS JATIM</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#48CAE4", marginTop: 4 }}>
                <AnimatedCounter targetValue={8.2} decimals={2} delayFrames={20} durationFrames={55} unit="%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH ANIMATED CONVERSION STAGE */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#FFD100" }}>
            TRANSFORMASI GABAH KERING GILING KE BERAS KONSUMSI
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#CAF0F8" }}>
            Standar Konversi BPS
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 160px 1fr",
            alignItems: "center",
            gap: 18,
          }}
        >
          {/* Left Box: Gabah Kering Giling */}
          <div
            style={{
              backgroundColor: "#004670",
              borderRadius: 16,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#CAF0F8" }}>GABAH (GKG)</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={868808} durationFrames={60} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFD100" }}>Ton Gabah</div>
            </div>
            <PaddyStalk width={78} height={145} swayDeg={sway} />
          </div>

          {/* Center Animated Flow Chevrons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[0, 1, 2].map((idx) => {
                const active = Math.floor((frame / 6) % 3) === idx;
                return (
                  <svg
                    key={idx}
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      transform: `scale(${active ? 1.22 : 0.95})`,
                      opacity: active ? 1 : 0.35,
                    }}
                  >
                    <path
                      d="M8 4L16 12L8 20"
                      stroke="#FFD100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                );
              })}
            </div>
            <div
              style={{
                backgroundColor: "#FFD100",
                color: "#004670",
                fontWeight: 900,
                fontSize: 16,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              57,74%
            </div>
          </div>

          {/* Right Box: Beras Siap Konsumsi */}
          <div
            style={{
              backgroundColor: "#004670",
              borderRadius: 16,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#48CAE4" }}>BERAS BERSIH</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#FFD100", marginTop: 4 }}>
                <AnimatedCounter targetValue={501670} delayFrames={12} durationFrames={60} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>Ton Beras</div>
            </div>

            {/* Flat Animated Rice Sack Icon */}
            <div
              style={{
                width: 82,
                height: 112,
                borderRadius: 14,
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                transform: `scale(${badgePulse})`,
              }}
            >
              <PaddyIcon size={34} color="#005A8D" />
              <span style={{ fontSize: 12, fontWeight: 900, color: "#004670", marginTop: 4 }}>
                BERAS
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  backgroundColor: "#FFD100",
                  color: "#004670",
                  padding: "2px 6px",
                  borderRadius: 4,
                  marginTop: 2,
                }}
              >
                501K TON
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FULL-WIDTH PROGRESS & REGIONAL COMPARISON CARD */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#005A8D",
          borderRadius: 20,
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 800, color: "#FFFFFF", marginBottom: 6 }}>
              <span>Volume Gabah Kering Giling (100%)</span>
              <span>868.808 Ton</span>
            </div>
            <div style={{ width: "100%", height: 18, backgroundColor: "#004670", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ width: `${gkgBarProgress}%`, height: "100%", backgroundColor: "#48CAE4", borderRadius: 9 }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 900, color: "#FFD100", marginBottom: 6 }}>
              <span>Volume Beras Siap Konsumsi (57,74%)</span>
              <span>501.670 Ton</span>
            </div>
            <div style={{ width: "100%", height: 22, backgroundColor: "#004670", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ width: `${conversionProgress}%`, height: "100%", backgroundColor: "#FFD100", borderRadius: 9 }} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <div style={{ backgroundColor: "#004670", padding: "16px 20px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>TOTAL BERAS JAWA TIMUR</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                <AnimatedCounter targetValue={6.12} decimals={2} delayFrames={15} durationFrames={55} unit="Juta Ton" />
              </div>
            </div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#FFD100", backgroundColor: "#005A8D", padding: "6px 12px", borderRadius: 8 }}>
              #1 RI
            </span>
          </div>

          <div style={{ backgroundColor: "#004670", padding: "16px 20px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, color: "#CAF0F8", fontWeight: 700 }}>TOTAL BERAS NASIONAL</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#48CAE4", marginTop: 2 }}>
                <AnimatedCounter targetValue={33.11} decimals={2} delayFrames={22} durationFrames={55} unit="Juta Ton" />
              </div>
            </div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#CAF0F8", backgroundColor: "#005A8D", padding: "6px 12px", borderRadius: 8 }}>
              BPS 2026
            </span>
          </div>
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
