import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DynamicCameraWrapper } from "../components/DynamicCameraWrapper";
import { VoiceoverCueCard } from "../components/VoiceoverCueCard";
import { PhysicsCounter } from "../components/PhysicsCounter";
import { DetailedPaddyStalk, VectorPaddyBadgeIcon } from "../components/VectorAssets";
import { PopBurst, ShockwaveRing } from "../../flatvector/components/PopBurst";

export const Scene1HookPadi: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => Math.round(s * fps);
  const speed = 60 / fps;
  const t = frame * speed;

  // CUE 1 (Detik 0.0 - "Bumi Angling Darma..."):
  // Badge & Judul turun dari atas dengan spring
  const badgeSpring = spring({
    frame: frame - sec(0.0),
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.65 },
  });

  const titleSpring = spring({
    frame: frame - sec(0.15),
    fps,
    config: { damping: 13, stiffness: 155, mass: 0.75 },
  });

  // CUE 2 (Detik 1.2 - "...mencetak sejarah!"):
  // Kartu tengah 868.808 Ton + matahari & bukit padi pop-in + badge PERINGKAT #1 JATIM
  const sunRiseSpring = spring({
    frame: frame - sec(1.25),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });

  const rankBadgeSpring = spring({
    frame: frame - sec(1.4),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.65 },
  });

  // CUE 3 (Detik 3.0 - "Rilis data BPS per 2 November 2026..."):
  // Subjudul BPS muncul & menyala dengan sapuan cahaya emas tepat di detik 3.0
  const bpsEntrance = spring({
    frame: frame - sec(2.85),
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });

  const bpsGlowProgress = interpolate(
    frame,
    [sec(3.0), sec(3.35), sec(4.1)],
    [0, 1, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bpsSweepPos = interpolate(
    frame,
    [sec(3.0), sec(3.85)],
    [-40, 140],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Continuous motion: Sun rotation & pulse
  const sunRotation = t * 0.4;
  const sunPulse = 1 + Math.sin(t / 15) * 0.045;
  const badgeBreath = 1 + Math.sin(t / 20) * 0.02;

  return (
    <DynamicCameraWrapper sceneDuration={durationInFrames}>
      <PopBurst delay={sec(1.2)} color="#F59E0B" count={8} radius={115} />
      <ShockwaveRing delay={sec(1.2)} color="#FDE047" maxRadius={165} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "56px 48px 210px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* 1. TOP EDITORIAL HEADER (Cue 0.0s & Cue 3.0s) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Detik 0.0: Badge PRODUSEN PADI #1 JAWA TIMUR turun dengan spring */}
          <div
            style={{
              transform: `translateY(${interpolate(badgeSpring, [0, 1], [-36, 0])}px) scale(${
                badgeSpring * badgeBreath
              })`,
              opacity: badgeSpring,
              backgroundColor: "#F59E0B",
              color: "#071324",
              fontWeight: 900,
              fontSize: 22,
              padding: "9px 28px",
              borderRadius: 12,
              marginBottom: 14,
              letterSpacing: 1.4,
              boxShadow: "0 6px 0 #B45309",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <VectorPaddyBadgeIcon size={24} color="#071324" />
            <span>PRODUSEN PADI #1 JAWA TIMUR</span>
          </div>

          {/* Detik 0.0: Judul BOJONEGORO JUARA 1 PADI JAWA TIMUR turun dari atas */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.05,
              color: "#FFFFFF",
              margin: "0 0 10px",
              letterSpacing: -0.5,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [-40, 0])}px) scale(${interpolate(
                titleSpring,
                [0, 1],
                [0.92, 1]
              )})`,
              opacity: titleSpring,
            }}
          >
            BOJONEGORO <span style={{ color: "#F59E0B" }}>JUARA 1 PADI</span> JAWA TIMUR
          </h1>

          {/* Detik 3.0: Subjudul BPS menyala dengan sapuan cahaya emas */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "6px 22px",
              borderRadius: 10,
              backgroundColor:
                bpsGlowProgress > 0.05
                  ? `rgba(245, 158, 11, ${(0.18 * bpsGlowProgress).toFixed(2)})`
                  : "rgba(9, 23, 44, 0.55)",
              border: `1.5px solid rgba(245, 158, 11, ${(0.2 + bpsGlowProgress * 0.75).toFixed(2)})`,
              boxShadow:
                bpsGlowProgress > 0.1
                  ? `0 0 ${Math.round(24 * bpsGlowProgress)}px rgba(245, 158, 11, ${(
                      0.55 * bpsGlowProgress
                    ).toFixed(2)})`
                  : "none",
              transform: `translateY(${interpolate(bpsEntrance, [0, 1], [16, 0])}px) scale(${
                1 + bpsGlowProgress * 0.04
              })`,
              opacity: bpsEntrance,
            }}
          >
            <span
              style={{
                fontSize: 21,
                fontWeight: 800,
                color: bpsGlowProgress > 0.35 ? "#FDE047" : "#CBD5E1",
                letterSpacing: 0.6,
              }}
            >
              Data Badan Pusat Statistik · Rilis 2 November 2026
            </span>

            {/* Sapuan cahaya emas (Golden Light Sweep) tepat di detik 3.0 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${bpsSweepPos}%`,
                width: "32%",
                background:
                  "linear-gradient(90deg, transparent, rgba(253, 224, 71, 0.55), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* 2. HERO STAGE CARD (Cue 1.2s - "...mencetak sejarah!"): 868.808 TON GKG + MATAHARI & BUKIT PADI */}
        <VoiceoverCueCard
          appearAtSecond={1.2}
          highlightAtSecond={1.5}
          index={1}
          variant="gold"
          style={{
            width: "100%",
            height: 455,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          {/* Top Metric Banner inside Hero Card */}
          <div
            style={{
              position: "relative",
              zIndex: 12,
              margin: "22px 24px 0",
              backgroundColor: "#09172C",
              border: "1.5px solid rgba(245, 158, 11, 0.35)",
              borderRadius: 16,
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 6px 0 #050E1B",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#94A3B8",
                  letterSpacing: 1.4,
                  marginBottom: 2,
                }}
              >
                TOTAL PRODUKSI GABAH KERING GILING (GKG)
              </div>
              <div
                style={{
                  fontSize: 62,
                  fontWeight: 900,
                  lineHeight: 1.04,
                  color: "#F59E0B",
                }}
              >
                <PhysicsCounter
                  target={868808}
                  durationInFrames={sec(1.4)}
                  delay={sec(1.2)}
                  suffix=" Ton"
                  goldShimmerOnFinish
                />
              </div>
            </div>

            {/* Pop-in Badge PERINGKAT #1 JATIM */}
            <div
              style={{
                backgroundColor: "#F59E0B",
                color: "#071324",
                borderRadius: 12,
                padding: "12px 22px",
                textAlign: "center",
                boxShadow: "0 5px 0 #B45309",
                transform: `scale(${rankBadgeSpring * badgeBreath})`,
                opacity: rankBadgeSpring,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 1 }}>PERINGKAT</div>
              <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>#1</div>
              <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 0.8 }}>JATIM</div>
            </div>
          </div>

          {/* Rising Multi-Plane Editorial Sun */}
          <div
            style={{
              position: "absolute",
              top: interpolate(sunRiseSpring, [0, 1], [190, 88]),
              left: "50%",
              transform: `translateX(-50%) scale(${sunRiseSpring * sunPulse})`,
              zIndex: 2,
            }}
          >
            <svg width="250" height="250" viewBox="-130 -130 260 260" style={{ overflow: "visible" }}>
              {/* Outer Rotating Geometric Ray Petals */}
              <g transform={`rotate(${sunRotation})`}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <path
                    key={i}
                    d="M -12,-76 L 0,-122 L 12,-76 Z"
                    fill="#F59E0B"
                    opacity={0.72}
                    transform={`rotate(${(i * 360) / 12})`}
                  />
                ))}
              </g>
              <circle r="70" fill="#F59E0B" />
              <path d="M 0,-70 A 70 70 0 0 1 0,70 A 52 70 0 0 0 0,-70 Z" fill="#D97706" />
              <circle cx="-12" cy="-12" r="42" fill="#FDE047" />
            </svg>
          </div>

          {/* Multi-Tiered Terraced Valley + 12 Growing & Swaying Detailed Paddy Panicles */}
          <div style={{ position: "relative", zIndex: 6, width: "100%", height: 245 }}>
            <svg
              width="100%"
              height="245"
              viewBox="0 0 980 245"
              preserveAspectRatio="none"
              style={{ position: "absolute", bottom: 0, left: 0 }}
            >
              <path d="M 0,155 Q 240,85 500,122 T 980,105 L 980,245 L 0,245 Z" fill="#064E3B" />
              <path d="M 0,175 Q 300,115 620,152 T 980,138 L 980,245 L 0,245 Z" fill="#047857" />
              <path d="M 0,198 Q 220,152 480,180 T 980,164 L 980,245 L 0,245 Z" fill="#B45309" />
              <path d="M 0,210 Q 260,174 540,196 T 980,180 L 980,245 L 0,245 Z" fill="#D97706" />
              <path d="M 0,224 Q 320,194 640,212 T 980,198 L 980,245 L 0,245 Z" fill="#F59E0B" />
            </svg>

            {/* 12 Anatomically Detailed Rice Panicles Growing at 1.2s & Swaying Continuously */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 16,
                right: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: 12 }).map((_, idx) => {
                const plantGrowth = spring({
                  frame: frame - (sec(1.25) + Math.round(idx * 2)),
                  fps,
                  config: { damping: 13, stiffness: 150, mass: 0.7 },
                });
                const swayAngle = Math.sin(t / 12 + idx * 0.7) * 6;
                const yOffset = Math.sin(idx * 0.9) * 10;

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `translateY(${yOffset}px)`,
                      transformOrigin: "bottom center",
                    }}
                  >
                    <DetailedPaddyStalk
                      width={70}
                      height={140}
                      swayDeg={swayAngle}
                      scaleY={plantGrowth}
                      flip={idx % 3 === 1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </VoiceoverCueCard>

        {/* 3. 2x2 GRID OF STAGGERED DATA CARDS (Cue 4.2s, 4.7s, 5.2s, 5.7s - "...mencatat:") */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            zIndex: 10,
          }}
        >
          {/* Detik 4.2: Kartu LUAS PANEN 2026: 159.190 Ha */}
          <VoiceoverCueCard
            appearAtSecond={4.2}
            highlightAtSecond={4.35}
            index={2}
            variant="navy"
            style={{ padding: "20px 24px" }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8", letterSpacing: 0.8 }}>
              LUAS PANEN 2026
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", margin: "4px 0" }}>
              <PhysicsCounter
                target={159190}
                durationInFrames={sec(1.0)}
                delay={sec(4.2)}
                suffix=" Ha"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#F59E0B" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>
                Lahan Panen Terluas
              </span>
            </div>
          </VoiceoverCueCard>

          {/* Detik 4.7: Kartu BERAS KONSUMSI: 501.670 Ton */}
          <VoiceoverCueCard
            appearAtSecond={4.7}
            highlightAtSecond={4.85}
            index={3}
            variant="navy"
            style={{ padding: "20px 24px" }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8", letterSpacing: 0.8 }}>
              BERAS KONSUMSI
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#10B981", margin: "4px 0" }}>
              <PhysicsCounter
                target={501670}
                durationInFrames={sec(1.0)}
                delay={sec(4.7)}
                suffix=" Ton"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#38BDF8" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#38BDF8" }}>
                Suplai Pangan Rakyat
              </span>
            </div>
          </VoiceoverCueCard>

          {/* Detik 5.2: Kartu PORSI JAWA TIMUR: 8,19 % */}
          <VoiceoverCueCard
            appearAtSecond={5.2}
            highlightAtSecond={5.35}
            index={4}
            variant="navy"
            style={{ padding: "20px 24px" }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8", letterSpacing: 0.8 }}>
              PORSI JAWA TIMUR
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#F59E0B", margin: "4px 0" }}>
              <PhysicsCounter
                target={8.19}
                decimals={2}
                durationInFrames={sec(1.0)}
                delay={sec(5.2)}
                suffix=" %"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#94A3B8" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#94A3B8" }}>
                Kontribusi dari 38 Daerah
              </span>
            </div>
          </VoiceoverCueCard>

          {/* Detik 5.7: Kartu PRODUKSI JATIM (RI): 10,61 Jt T */}
          <VoiceoverCueCard
            appearAtSecond={5.7}
            highlightAtSecond={5.85}
            index={5}
            variant="navy"
            style={{ padding: "20px 24px" }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8", letterSpacing: 0.8 }}>
              PRODUKSI JATIM (RI)
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#38BDF8", margin: "4px 0" }}>
              <PhysicsCounter
                target={10.61}
                decimals={2}
                durationInFrames={sec(1.0)}
                delay={sec(5.7)}
                suffix=" Jt T"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#10B981" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#10B981" }}>
                Jawa Timur Juara 1 Nasional
              </span>
            </div>
          </VoiceoverCueCard>
        </div>
      </div>
    </DynamicCameraWrapper>
  );
};
