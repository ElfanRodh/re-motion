import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DynamicCameraWrapper } from "../components/DynamicCameraWrapper";
import { VoiceoverCueCard, useVoiceoverCue } from "../components/VoiceoverCueCard";
import { PhysicsCounter } from "../components/PhysicsCounter";
import {
  DetailedPaddyStalk,
  VectorPaddyBadgeIcon,
  VectorTractorBadgeIcon,
} from "../components/VectorAssets";
import { PopBurst, ShockwaveRing } from "../../flatvector/components/PopBurst";

export const Scene3TraktorKlasemen: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => Math.round(s * fps);
  const speed = 60 / fps;
  const t = frame * speed;

  // CUE 1 (Detik global 20.0 / lokal 0.0s - "Dan penopang terbesarnya, ada di Bojonegoro!"):
  const badgeSpring = spring({
    frame: frame - sec(0.0),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  const titleSpring = spring({
    frame: frame - sec(0.12),
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });

  // Sub-kartu kanan KONTRIBUSI: 8,19% muncul & berkilau di detik 21.8 (lokal 1.8s)
  const kontribusiCue = useVoiceoverCue({
    appearAtSecond: 1.5,
    highlightAtSecond: 1.8,
    highlightPeakScale: 0.1,
    index: 4,
  });

  // CUE 2 (Detik global 24.0 / lokal 4.0s - "Dengan luas panen 159 ribu hektar,"):
  // Sub-kartu kiri LUAS PANEN: 159.190 Ha menyorot emas (scale 1.1) & PRODUKTIVITAS: 5,46 Ton/Ha
  const luasPanenCue = useVoiceoverCue({
    appearAtSecond: 4.0,
    highlightAtSecond: 4.15,
    highlightPeakScale: 0.1,
    index: 2,
  });

  const produktivitasCue = useVoiceoverCue({
    appearAtSecond: 4.4,
    highlightAtSecond: 4.55,
    highlightPeakScale: 0.08,
    index: 3,
  });

  // Combine Harvester Physics: mulai jalan memanen padi tepat di detik 24.0 (lokal 4.0s)
  const isTractorRunning = frame >= sec(4.0);
  const engineVibration = isTractorRunning ? Math.sin(t * 0.8) * 1.5 : 0;
  const wheelRotation = isTractorRunning ? (t - 240) * 6 : 0;
  const cutterRotation = isTractorRunning ? (t - 240) * 6.5 : 0;

  // Harvester travels left-to-right across the paddy field starting at local 4.0s
  const tractorX = interpolate(
    frame,
    [sec(4.0), durationInFrames],
    [-40, 560],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const cutterWorldX = tractorX + 318;

  // CUE 3 (Detik global 27.0 / lokal 7.0s - "Bojonegoro memimpin di puncak dengan torehan 868.808 ton gabah!"):
  // Bar Jember (#4), Ngawi (#3), dan Lamongan (#2) terisi dulu pada detik 27.3 - 28.5 (lokal 7.3s - 8.5s)
  const othersBarProgress = interpolate(
    frame,
    [sec(7.2), sec(8.5)],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Lalu tepat pada detik 29.0 (lokal 9.0s, saat narator menyebut "868.808 ton gabah!"),
  // luncurkan bar #1 Kabupaten Bojonegoro menyalip ke puncak!
  const bojoOvertakeProgress = interpolate(
    frame,
    [sec(7.4), sec(8.9), sec(9.0), sec(10.3)],
    [0, 0.35, 0.38, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const bojoGlowIntensity = interpolate(
    frame,
    [sec(9.0), sec(9.5), sec(11.0)],
    [0, 1, 0.45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const barBreath = frame > sec(10.4) ? Math.sin(t / 18) * 1.2 : 0;

  const regencies = [
    {
      rank: 1,
      name: "Kabupaten Bojonegoro",
      ton: 868808,
      isLead: true,
      widthPct: interpolate(bojoOvertakeProgress, [0, 1], [0, 96]) + barBreath,
      baseColor: "#F59E0B",
      shadeColor: "#D97706",
      counterDelaySec: 8.9,
      counterDurSec: 1.3,
    },
    {
      rank: 2,
      name: "Kabupaten Lamongan",
      ton: 852192,
      isLead: false,
      widthPct: interpolate(othersBarProgress, [0, 1], [0, 91]),
      baseColor: "#0284C7",
      shadeColor: "#0369A1",
      counterDelaySec: 7.5,
      counterDurSec: 1.0,
    },
    {
      rank: 3,
      name: "Kabupaten Ngawi",
      ton: 768307,
      isLead: false,
      widthPct: interpolate(othersBarProgress, [0, 1], [0, 81]),
      baseColor: "#38BDF8",
      shadeColor: "#0284C7",
      counterDelaySec: 7.35,
      counterDurSec: 1.0,
    },
    {
      rank: 4,
      name: "Kabupaten Jember",
      ton: 642150,
      isLead: false,
      widthPct: interpolate(othersBarProgress, [0, 1], [0, 68]),
      baseColor: "#64748B",
      shadeColor: "#475569",
      counterDelaySec: 7.2,
      counterDurSec: 1.0,
    },
  ];

  // Pop-up badge "Unggul +16.616 Ton dari Peringkat #2" tepat pada detik 30.5 (lokal 10.5s)
  const diffBadgeSpring = spring({
    frame: frame - sec(10.5),
    fps,
    config: { damping: 9, stiffness: 210, mass: 0.6 },
  });

  const badgeBreath = 1 + Math.sin(t / 20) * 0.02;

  return (
    <DynamicCameraWrapper sceneDuration={durationInFrames}>
      <PopBurst delay={sec(0.2)} color="#F59E0B" count={8} radius={115} />
      <ShockwaveRing delay={sec(0.2)} color="#FDE047" maxRadius={165} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "54px 48px 210px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* 1. TOP HEADER & HERO METRIC CARD (Cue 0.0s, 1.8s, 4.0s) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Detik 20.0 (lokal 0.0s): Badge JUARA 1 PRODUKSI PADI JAWA TIMUR */}
          <div
            style={{
              transform: `scale(${badgeSpring * badgeBreath})`,
              opacity: badgeSpring,
              backgroundColor: "#F59E0B",
              color: "#071324",
              fontWeight: 900,
              fontSize: 21,
              padding: "9px 28px",
              borderRadius: 12,
              marginBottom: 12,
              letterSpacing: 1.2,
              boxShadow: "0 6px 0 #B45309",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <VectorTractorBadgeIcon size={25} color="#071324" />
            <span>JUARA 1 PRODUKSI PADI JAWA TIMUR</span>
          </div>

          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.06,
              color: "#FFFFFF",
              margin: "0 0 12px",
              letterSpacing: -0.5,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [36, 0])}px) scale(${interpolate(
                titleSpring,
                [0, 1],
                [0.92, 1]
              )})`,
              opacity: titleSpring,
            }}
          >
            KABUPATEN <span style={{ color: "#F59E0B" }}>BOJONEGORO</span>
          </h1>

          {/* Hero Stat Card (muncul di lokal 0.0s, disorot ulang saat 868.808 disebut di lokal 9.0s) */}
          <VoiceoverCueCard
            appearAtSecond={0.0}
            highlightAtSecond={9.0}
            index={1}
            variant="gold"
            style={{
              width: "100%",
              padding: "18px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 800, letterSpacing: 1 }}>
              TOTAL PRODUKSI GABAH KERING GILING (GKG) 2026
            </div>
            <div style={{ fontSize: 66, fontWeight: 900, color: "#F59E0B", lineHeight: 1.05 }}>
              <PhysicsCounter
                target={868808}
                durationInFrames={sec(1.4)}
                delay={sec(0.2)}
                suffix=" Ton"
                goldShimmerOnFinish
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginTop: 12,
              }}
            >
              {/* Detik 24.0 (lokal 4.0s): Sub-kartu kiri LUAS PANEN: 159.190 Ha menyorot emas (scale 1.1) */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow:
                    luasPanenCue.highlightGlow > 0.1
                      ? `0 4px 0 #050E1B, 0 0 ${Math.round(
                          24 * luasPanenCue.highlightGlow
                        )}px rgba(245, 158, 11, ${(0.75 * luasPanenCue.highlightGlow).toFixed(2)})`
                      : "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(245, 158, 11, ${
                    0.25 + luasPanenCue.highlightGlow * 0.75
                  })`,
                  transform: `translateY(${luasPanenCue.translateY * 0.45}px) scale(${luasPanenCue.scale})`,
                  opacity: luasPanenCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>LUAS PANEN</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                  <PhysicsCounter
                    target={159190}
                    delay={sec(4.0)}
                    durationInFrames={sec(1.0)}
                    suffix=" Ha"
                    goldShimmerOnFinish
                  />
                </div>
              </div>

              {/* Detik 24.4 (lokal 4.4s): Sub-kartu tengah PRODUKTIVITAS: 5,46 Ton/Ha */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(253, 224, 71, ${
                    0.22 + produktivitasCue.highlightGlow * 0.78
                  })`,
                  transform: `translateY(${produktivitasCue.translateY * 0.45}px) scale(${produktivitasCue.scale})`,
                  opacity: produktivitasCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>PRODUKTIVITAS</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#FDE047", marginTop: 2 }}>
                  <PhysicsCounter
                    target={5.46}
                    decimals={2}
                    delay={sec(4.4)}
                    durationInFrames={sec(1.0)}
                    suffix=" Ton/Ha"
                  />
                </div>
              </div>

              {/* Detik 21.8 (lokal 1.8s): Sub-kartu kanan KONTRIBUSI: 8,19% muncul lebih dulu & berkilau */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow:
                    kontribusiCue.highlightGlow > 0.1
                      ? `0 4px 0 #050E1B, 0 0 ${Math.round(
                          24 * kontribusiCue.highlightGlow
                        )}px rgba(245, 158, 11, ${(0.75 * kontribusiCue.highlightGlow).toFixed(2)})`
                      : "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(245, 158, 11, ${
                    0.25 + kontribusiCue.highlightGlow * 0.75
                  })`,
                  transform: `translateY(${kontribusiCue.translateY * 0.45}px) scale(${kontribusiCue.scale})`,
                  opacity: kontribusiCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>KONTRIBUSI JATIM</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8", marginTop: 2 }}>
                  <PhysicsCounter
                    target={8.19}
                    decimals={2}
                    delay={sec(1.5)}
                    durationInFrames={sec(1.0)}
                    suffix="%"
                    goldShimmerOnFinish
                  />
                </div>
              </div>
            </div>
          </VoiceoverCueCard>
        </div>

        {/* 2. MIDDLE ACTION STAGE (Cue 4.0s - "Dengan luas panen 159 ribu hektar,"): TRAKTOR COMBINE HARVESTER */}
        <VoiceoverCueCard
          appearAtSecond={4.0}
          highlightAtSecond={4.2}
          index={2}
          variant="emerald"
          style={{
            width: "100%",
            height: 270,
            padding: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Layered Farmland Horizon Planes */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 984 270"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0 }}
          >
            <path d="M 0,130 Q 260,85 540,115 T 984,95 L 984,270 L 0,270 Z" fill="#064E3B" />
            <path d="M 0,158 Q 340,122 680,148 T 984,132 L 984,270 L 0,270 Z" fill="#047857" />
            <polygon points="0,192 984,176 984,270 0,270" fill="#B45309" />
            <polygon points="0,215 984,202 984,270 0,270" fill="#D97706" />
            <rect x="0" y="242" width="984" height="28" fill="#78350F" />
          </svg>

          {/* Top-Left Field Callout Pill */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 20,
              backgroundColor: "#09172C",
              border: "1.5px solid rgba(16, 185, 129, 0.45)",
              padding: "7px 16px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 0 #050E1B",
              zIndex: 15,
            }}
          >
            <VectorPaddyBadgeIcon size={18} color="#FDE047" />
            <span style={{ fontSize: 15, fontWeight: 900, color: "#FDE047", letterSpacing: 0.6 }}>
              MEKANISASI PANEN · 159.190 HEKTAR
            </span>
          </div>

          {/* Row of 17 Detailed Paddy Plants that get cut as Harvester passes */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: 0,
              right: 0,
              height: 130,
              pointerEvents: "none",
              zIndex: 6,
            }}
          >
            {Array.from({ length: 17 }).map((_, idx) => {
              const stalkX = 110 + idx * 50;
              const cutProgress = interpolate(
                cutterWorldX - stalkX,
                [-12, 24],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const windSway = Math.sin(t / 12 + idx * 0.6) * 5;

              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: stalkX,
                    bottom: 0,
                  }}
                >
                  <DetailedPaddyStalk
                    width={58}
                    height={115}
                    swayDeg={windSway}
                    cutProgress={cutProgress}
                  />
                </div>
              );
            })}
          </div>

          {/* Parabolic Stream of 15 Pointed Golden Rice Grains from Rear Unloading Auger */}
          {isTractorRunning && (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 984 270"
              style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 12 }}
            >
              {Array.from({ length: 15 }).map((_, i) => {
                const prog = (((t - 240) * 1.35 + i * 12) % 90) / 90;
                const startX = tractorX + 34;
                const startY = 68 + engineVibration;
                const grainX = startX - prog * 105;
                const grainY = startY - Math.sin(prog * Math.PI) * 32 + prog * 115;
                const rot = prog * 260 + i * 24;
                const alpha = interpolate(prog, [0, 0.8, 1], [1, 0.9, 0]);

                return (
                  <g
                    key={i}
                    transform={`translate(${grainX}, ${grainY}) rotate(${rot})`}
                    opacity={alpha}
                  >
                    <path
                      d="M 0,-6 C 2.8,-3 2.8,3 0,6 C -2.8,3 -2.8,-3 0,-6 Z"
                      fill={i % 2 === 0 ? "#FDE047" : "#F59E0B"}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Bespoke Forward-Facing Combine Harvester (Moving Left -> Right from local 4.0s) */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: tractorX,
              transform: `translateY(${engineVibration}px)`,
              zIndex: 10,
            }}
          >
            <svg width="365" height="205" viewBox="0 0 365 205" style={{ overflow: "visible" }}>
              <ellipse cx="185" cy="188" rx="155" ry="10" fill="#050E1B" opacity={0.55} />
              <path
                d="M 135,68 L 54,28 L 34,38"
                stroke="#F59E0B"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 135,71 L 54,31"
                stroke="#D97706"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="26,34 40,28 42,45 28,48" fill="#B45309" />
              <polygon points="105,52 185,52 195,72 95,72" fill="#D97706" />
              <polygon points="105,52 185,52 180,60 102,60" fill="#F59E0B" />
              <polygon points="65,142 255,142 262,92 205,68 90,68 58,112" fill="#047857" />
              <polygon points="65,142 255,142 258,118 62,118" fill="#064E3B" />
              <polygon points="90,68 205,68 198,84 82,84" fill="#10B981" />
              <polygon points="75,98 205,98 202,106 72,106" fill="#F59E0B" />
              <rect x="85" y="112" width="36" height="14" rx="2" fill="#052E24" />
              <polygon points="200,56 262,56 276,104 195,104" fill="#0284C7" />
              <polygon points="236,56 262,56 276,104 246,104" fill="#38BDF8" />
              <polygon points="196,50 268,50 264,58 198,58" fill="#F8FAFC" />
              <rect x="262" y="58" width="7" height="5" rx="1" fill="#FDE047" />
              <line x1="232" y1="56" x2="238" y2="104" stroke="#09172C" strokeWidth="4" />
              <polygon points="252,115 316,142 310,162 246,136" fill="#334155" />
              <polygon points="282,158 352,158 344,174 278,174" fill="#F59E0B" />
              <polygon points="282,166 350,166 344,174 278,174" fill="#B45309" />

              {/* Rotating 6-Blade Hexagonal Header Reel */}
              <g transform="translate(318, 142)">
                <circle r="28" fill="#09172C" opacity={0.35} />
                <g transform={`rotate(${cutterRotation})`}>
                  {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i * 360) / 6;
                    return (
                      <g key={i} transform={`rotate(${angle})`}>
                        <line x1="0" y1="0" x2="0" y2="-27" stroke="#FDE047" strokeWidth="3.2" />
                        <rect x="-5" y="-28" width="10" height="3.5" rx="1" fill="#F59E0B" />
                      </g>
                    );
                  })}
                  <circle r="22" fill="none" stroke="#CBD5E1" strokeWidth="2" />
                </g>
                <circle r="7" fill="#F59E0B" />
                <circle r="3" fill="#09172C" />
              </g>

              {/* Rear Steering Wheel */}
              <g transform="translate(92, 154)">
                <circle r="27" fill="#09172C" />
                <circle r="22" fill="#1E293B" />
                <circle r="13" fill="#F59E0B" />
                <circle r="7" fill="#D97706" />
                <g transform={`rotate(${wheelRotation})`}>
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
                  <line x1="0" y1="-18" x2="0" y2="18" stroke="#94A3B8" strokeWidth="2.5" />
                  <circle cx="0" cy="-9" r="2" fill="#09172C" />
                  <circle cx="9" cy="0" r="2" fill="#09172C" />
                  <circle cx="0" cy="9" r="2" fill="#09172C" />
                  <circle cx="-9" cy="0" r="2" fill="#09172C" />
                </g>
              </g>

              {/* Front Heavy Drive Wheel */}
              <g transform="translate(218, 144)">
                <circle r="39" fill="#09172C" />
                <circle r="33" fill="#1E293B" />
                <circle r="21" fill="#F59E0B" />
                <circle r="12" fill="#D97706" />
                <g transform={`rotate(${wheelRotation})`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect
                      key={i}
                      x="-2.5"
                      y="-38"
                      width="5"
                      height="6"
                      rx="1"
                      fill="#334155"
                      transform={`rotate(${i * 45})`}
                    />
                  ))}
                  <circle cx="0" cy="-16" r="2.8" fill="#09172C" />
                  <circle cx="16" cy="0" r="2.8" fill="#09172C" />
                  <circle cx="0" cy="16" r="2.8" fill="#09172C" />
                  <circle cx="-16" cy="0" r="2.8" fill="#09172C" />
                </g>
                <circle r="4.5" fill="#F8FAFC" />
              </g>
            </svg>
          </div>
        </VoiceoverCueCard>

        {/* 3. BOTTOM STAGE (Cue 7.0s - "Bojonegoro memimpin di puncak dengan torehan 868.808 ton gabah!"): KLASEMEN */}
        <VoiceoverCueCard
          appearAtSecond={7.0}
          highlightAtSecond={9.0}
          index={3}
          variant="navy"
          style={{
            width: "100%",
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.5 }}>
              KLASEMEN PRODUSEN PADI JAWA TIMUR (GKG)
            </span>

            {/* Pop-Up Overtake Badge tepat pada detik 30.5 (lokal 10.5s) */}
            <div
              style={{
                transform: `scale(${diffBadgeSpring})`,
                opacity: diffBadgeSpring,
                backgroundColor: "#10B981",
                color: "#071324",
                fontSize: 14,
                fontWeight: 900,
                padding: "5px 12px",
                borderRadius: 8,
                boxShadow: "0 4px 0 #047857",
              }}
            >
              Unggul +16.616 Ton dari Peringkat #2
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {regencies.map((reg) => (
              <div key={reg.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        backgroundColor: reg.isLead ? "#F59E0B" : "#09172C",
                        color: reg.isLead ? "#071324" : "#94A3B8",
                        fontWeight: 900,
                        fontSize: 14,
                        padding: "2px 9px",
                        borderRadius: 6,
                      }}
                    >
                      #{reg.rank}
                    </span>
                    <span
                      style={{
                        fontSize: reg.isLead ? 22 : 19,
                        fontWeight: reg.isLead ? 900 : 800,
                        color: reg.isLead ? "#FFFFFF" : "#94A3B8",
                      }}
                    >
                      {reg.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: reg.isLead ? 23 : 19,
                      fontWeight: 900,
                      color: reg.isLead ? "#F59E0B" : "#CBD5E1",
                    }}
                  >
                    <PhysicsCounter
                      target={reg.ton}
                      delay={sec(reg.counterDelaySec)}
                      durationInFrames={sec(reg.counterDurSec)}
                      suffix=" Ton"
                      goldShimmerOnFinish={reg.isLead}
                    />
                  </span>
                </div>

                {/* 2-Plane Horizontal Race Track */}
                <div
                  style={{
                    width: "100%",
                    height: reg.isLead ? 24 : 18,
                    backgroundColor: "#09172C",
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow:
                      reg.isLead && bojoGlowIntensity > 0.1
                        ? `0 3px 0 #050E1B, 0 0 ${Math.round(
                            22 * bojoGlowIntensity
                          )}px rgba(245, 158, 11, ${(0.65 * bojoGlowIntensity).toFixed(2)})`
                        : "0 3px 0 #050E1B",
                  }}
                >
                  <div
                    style={{
                      width: `${reg.widthPct}%`,
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <div style={{ width: "76%", height: "100%", backgroundColor: reg.baseColor }} />
                    <div style={{ width: "24%", height: "100%", backgroundColor: reg.shadeColor }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VoiceoverCueCard>
      </div>
    </DynamicCameraWrapper>
  );
};
