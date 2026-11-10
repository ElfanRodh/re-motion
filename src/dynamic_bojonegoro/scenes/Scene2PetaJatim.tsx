import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DynamicCameraWrapper } from "../components/DynamicCameraWrapper";
import { VoiceoverCueCard, useVoiceoverCue } from "../components/VoiceoverCueCard";
import { PhysicsCounter } from "../components/PhysicsCounter";
import { VectorCrownIcon, VectorTrophyIcon } from "../components/VectorAssets";
import { JATIM_MAP_VIEWBOX, JATIM_REGENCY_PATHS } from "../../assets/jatimMapPaths";
import { PopBurst, ShockwaveRing } from "../../flatvector/components/PopBurst";

export const Scene2PetaJatim: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => Math.round(s * fps);
  const speed = 60 / fps;
  const t = frame * speed;

  // CUE 1 (Detik global 8.0 / lokal 0.0s - "Kabupaten Bojonegoro jadi penghasil padi nomor satu di Jawa Timur!"):
  const badgeSpring = spring({
    frame: frame - sec(0.0),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  const titleSpring = spring({
    frame: frame - sec(0.1),
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });

  // Judul JAWA TIMUR JUARA 1 NASIONAL menyala saat detik global 12.0 (lokal 4.0s)
  const titleHighlightSpring = spring({
    frame: frame - sec(4.0),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.65 },
  });
  const titleHighlightScale = interpolate(titleHighlightSpring, [0, 0.5, 1], [0, 0.075, 0]);
  const titleGlowAlpha = interpolate(
    frame,
    [sec(4.0), sec(4.3), sec(5.2)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pada detik 9.5 (lokal 1.5s, tepat saat kata "nomor satu di Jawa Timur"):
  // Zoom-in halus ke wilayah Bojonegoro berwarna oranye
  const mapZoom = interpolate(
    frame,
    [sec(0.8), sec(2.6), durationInFrames],
    [1.0, 1.24, 1.28],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const mapPanX = interpolate(frame, [sec(0.8), sec(2.6)], [0, 38], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mapPanY = interpolate(frame, [sec(0.8), sec(2.6)], [0, 18], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bojonegoro = JATIM_REGENCY_PATHS.find((r) => r.name === "Bojonegoro");
  const lamongan = JATIM_REGENCY_PATHS.find((r) => r.name === "Lamongan");
  const ngawi = JATIM_REGENCY_PATHS.find((r) => r.name === "Ngawi");
  const bjnX = bojonegoro?.cx ?? 209.5;
  const bjnY = bojonegoro?.cy ?? 133;

  // Radar Pulse Rings aktif mulai detik 9.5 (lokal 1.5s)
  const isRadarActive = frame >= sec(1.4);
  const pulsePeriod = 66;
  const radarRings = [0, 22, 44].map((offset) => {
    const prog = (((t - 90) + offset + pulsePeriod * 10) % pulsePeriod) / pulsePeriod;
    return {
      scale: interpolate(prog, [0, 1], [1, 2.5]),
      opacity: isRadarActive ? interpolate(prog, [0, 1], [0.85, 0]) : 0,
    };
  });

  // Tooltip "#1 KAB. BOJONEGORO 868.808 Ton GKG (8,19% Jatim)" muncul tepat di detik 9.5 (lokal 1.5s)
  const calloutSpring = spring({
    frame: frame - sec(1.5),
    fps,
    config: { damping: 11, stiffness: 175, mass: 0.65 },
  });
  const tooltipFloatY = Math.sin(t / 18) * 3.5;

  // Legend kabupaten di bawah peta muncul satu per satu mulai detik 10.5 (lokal 2.5s)
  const legendItems = [
    { label: "1. Bojonegoro (868,8 Rb T)", color: "#F59E0B", appearSec: 2.5 },
    { label: "2. Lamongan (852,1 Rb T)", color: "#0284C7", appearSec: 2.8 },
    { label: "3. Ngawi (768,3 Rb T)", color: "#059669", appearSec: 3.1 },
  ];

  // CUE 2 (Detik global 12.0 / lokal 4.0s - "Secara nasional, Jawa Timur kembali kokoh..."):
  // 4 Batang grafik tumbuh SATU PER SATU dengan jeda 0.35 detik (Sulsel -> Jabar -> Jateng -> Jawa Timur)
  const provinces = [
    {
      rank: 4,
      name: "4. Sulsel",
      value: 5.42,
      targetHeight: 76,
      isLead: false,
      baseColor: "#64748B",
      shadeColor: "#475569",
      appearSec: 4.2,
    },
    {
      rank: 3,
      name: "3. Jawa Barat",
      value: 8.62,
      targetHeight: 116,
      isLead: false,
      baseColor: "#38BDF8",
      shadeColor: "#0284C7",
      appearSec: 4.55,
    },
    {
      rank: 2,
      name: "2. Jawa Tengah",
      value: 8.89,
      targetHeight: 122,
      isLead: false,
      baseColor: "#0284C7",
      shadeColor: "#0369A1",
      appearSec: 4.9,
    },
    {
      rank: 1,
      name: "1. Jawa Timur",
      value: 10.61,
      targetHeight: 148,
      isLead: true,
      baseColor: "#F59E0B",
      shadeColor: "#D97706",
      appearSec: 5.25,
    },
  ];

  // Crown & badge "Jatim Sumbang 18,5% RI" pop-in saat batang Jawa Timur tumbuh (lokal 5.65s)
  const crownSpring = spring({
    frame: frame - sec(5.65),
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.6 },
  });

  // CUE 3 (Detik global 16.5 / lokal 8.5s - "...dengan total 10,61 juta ton Gabah Kering Giling."):
  // Spotlight bounce (scale: 1 -> 1.1 -> 1 + kilau emas) pada angka raksasa 10,61 Juta Ton
  const heroSpotlight = spring({
    frame: frame - sec(8.5),
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.65 },
  });
  const heroNumberScale = 1 + interpolate(heroSpotlight, [0, 0.5, 1], [0, 0.1, 0]);
  const heroNumberGlow = interpolate(
    frame,
    [sec(8.5), sec(8.8), sec(9.6)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 3 Sub-kartu muncul satu per satu pada detik 17.2 (lokal 9.2s), 17.8 (lokal 9.8s), 18.4 (lokal 10.4s)
  const subCard1 = useVoiceoverCue({ appearAtSecond: 9.2, highlightAtSecond: 9.3, index: 4 });
  const subCard2 = useVoiceoverCue({ appearAtSecond: 9.8, highlightAtSecond: 9.9, index: 5 });
  const subCard3 = useVoiceoverCue({ appearAtSecond: 10.4, highlightAtSecond: 10.5, index: 6 });

  const badgeBreath = 1 + Math.sin(t / 20) * 0.02;

  return (
    <DynamicCameraWrapper sceneDuration={durationInFrames}>
      <PopBurst delay={sec(1.5)} color="#F59E0B" count={8} radius={115} />
      <ShockwaveRing delay={sec(1.5)} color="#38BDF8" maxRadius={165} />

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
        {/* 1. TOP HEADER & MAIN NATIONAL STAT CARD */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* 2-Plane Category Badge */}
          <div
            style={{
              transform: `scale(${badgeSpring * badgeBreath})`,
              opacity: badgeSpring,
              backgroundColor: "#F59E0B",
              color: "#071324",
              fontWeight: 900,
              fontSize: 21,
              padding: "9px 26px",
              borderRadius: 12,
              marginBottom: 12,
              letterSpacing: 1.2,
              boxShadow: "0 6px 0 #B45309",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <VectorTrophyIcon size={23} color="#071324" />
            <span>PERINGKAT 1 DARI 38 PROVINSI DI INDONESIA</span>
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
              transform: `translateY(${interpolate(titleSpring, [0, 1], [36, 0])}px) scale(${
                interpolate(titleSpring, [0, 1], [0.92, 1]) + titleHighlightScale
              })`,
              textShadow:
                titleGlowAlpha > 0.05
                  ? `0 0 ${Math.round(28 * titleGlowAlpha)}px rgba(245, 158, 11, ${(
                      0.75 * titleGlowAlpha
                    ).toFixed(2)})`
                  : "none",
              opacity: titleSpring,
            }}
          >
            JAWA TIMUR <span style={{ color: "#F59E0B" }}>JUARA 1 NASIONAL</span>
          </h1>

          {/* Kartu Utama Atas: Muncul saat bahasan nasional & menyorot penuh di detik 16.5 (lokal 8.5s) */}
          <VoiceoverCueCard
            appearAtSecond={4.0}
            highlightAtSecond={8.5}
            highlightPeakScale={0.07}
            index={1}
            variant="gold"
            style={{
              width: "100%",
              padding: "18px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 800, letterSpacing: 1 }}>
              TOTAL PRODUKSI GABAH KERING GILING (GKG) JAWA TIMUR 2026
            </div>
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                color: heroNumberGlow > 0.3 ? "#FDE047" : "#F59E0B",
                lineHeight: 1.05,
                transform: `scale(${heroNumberScale})`,
                textShadow:
                  heroNumberGlow > 0.1
                    ? `0 0 ${Math.round(26 * heroNumberGlow)}px rgba(253, 224, 71, ${(
                        0.7 * heroNumberGlow
                      ).toFixed(2)})`
                    : "none",
              }}
            >
              <PhysicsCounter
                target={10.61}
                decimals={2}
                durationInFrames={sec(1.2)}
                delay={sec(8.3)}
                suffix=" Juta Ton"
                goldShimmerOnFinish
              />
            </div>

            {/* 3 Sub-Kartu muncul SATU PER SATU di detik 17.2 (9.2s), 17.8 (9.8s), 18.4 (10.4s) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginTop: 12,
              }}
            >
              {/* Detik 17.2 (lokal 9.2s): LUAS PANEN JATIM 1,85 Jt Ha */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(245, 158, 11, ${0.2 + subCard1.highlightGlow * 0.8})`,
                  transform: `translateY(${subCard1.translateY * 0.5}px) scale(${subCard1.scale})`,
                  opacity: subCard1.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>LUAS PANEN JATIM</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                  <PhysicsCounter
                    target={1.85}
                    decimals={2}
                    delay={sec(9.2)}
                    durationInFrames={sec(0.8)}
                    suffix=" Jt Ha"
                  />
                </div>
              </div>

              {/* Detik 17.8 (lokal 9.8s): BERAS JATIM 6,12 Jt Ton */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(16, 185, 129, ${0.25 + subCard2.highlightGlow * 0.75})`,
                  transform: `translateY(${subCard2.translateY * 0.5}px) scale(${subCard2.scale})`,
                  opacity: subCard2.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>BERAS JATIM</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#10B981", marginTop: 2 }}>
                  <PhysicsCounter
                    target={6.12}
                    decimals={2}
                    delay={sec(9.8)}
                    durationInFrames={sec(0.8)}
                    suffix=" Jt Ton"
                  />
                </div>
              </div>

              {/* Detik 18.4 (lokal 10.4s): TOTAL NASIONAL 57,45 Jt Ton */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(56, 189, 248, ${0.25 + subCard3.highlightGlow * 0.75})`,
                  transform: `translateY(${subCard3.translateY * 0.5}px) scale(${subCard3.scale})`,
                  opacity: subCard3.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>TOTAL NASIONAL</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8", marginTop: 2 }}>
                  <PhysicsCounter
                    target={57.45}
                    decimals={2}
                    delay={sec(10.4)}
                    durationInFrames={sec(0.8)}
                    suffix=" Jt Ton"
                  />
                </div>
              </div>
            </div>
          </VoiceoverCueCard>
        </div>

        {/* 2. MIDDLE: PETA LUMBUNG PANGAN PROVINSI JAWA TIMUR (Muncul di lokal 0.0s, Zoom & Radar di 1.5s) */}
        <VoiceoverCueCard
          appearAtSecond={0.0}
          highlightAtSecond={1.5}
          index={2}
          variant="cyan"
          style={{
            width: "100%",
            height: 410,
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.6 }}>
              PETA LUMBUNG PANGAN PROVINSI JAWA TIMUR
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#071324",
                backgroundColor: "#38BDF8",
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              38 KABUPATEN / KOTA
            </span>
          </div>

          {/* Map Viewport with Camera Zoom to Bojonegoro at 1.5s */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              borderRadius: 14,
              backgroundColor: "#09172C",
              margin: "8px 0",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `scale(${mapZoom}) translate(${mapPanX}px, ${mapPanY}px)`,
                transformOrigin: "28% 32%",
              }}
            >
              <svg width="100%" height="100%" viewBox={JATIM_MAP_VIEWBOX}>
                {JATIM_REGENCY_PATHS.map((regency, idx) => {
                  const isBjn = regency.name === "Bojonegoro";
                  const isLmg = regency.name === "Lamongan";
                  const isNgw = regency.name === "Ngawi";

                  let fill = idx % 2 === 0 ? "#132A4A" : "#19365E";
                  let stroke = "#09172C";
                  let strokeWidth = 1.2;

                  if (isBjn) {
                    fill = "#F59E0B";
                    stroke = "#FDE047";
                    strokeWidth = 2.4;
                  } else if (isLmg) {
                    fill = "#0284C7";
                    stroke = "#38BDF8";
                    strokeWidth = 1.8;
                  } else if (isNgw) {
                    fill = "#059669";
                    stroke = "#34D399";
                    strokeWidth = 1.8;
                  }

                  return (
                    <path
                      key={regency.id}
                      d={regency.d}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                    />
                  );
                })}

                {/* Supply-Chain Vector Trajectory Connecting Top 3 Hubs */}
                {lamongan && ngawi && (
                  <polyline
                    points={`${ngawi.cx},${ngawi.cy} ${bjnX},${bjnY} ${lamongan.cx},${lamongan.cy}`}
                    fill="none"
                    stroke="#FDE047"
                    strokeWidth="2.4"
                    strokeDasharray="6 6"
                    strokeDashoffset={-t * 0.8}
                    opacity={calloutSpring}
                  />
                )}

                {lamongan && (
                  <circle
                    cx={lamongan.cx}
                    cy={lamongan.cy}
                    r="4.5"
                    fill="#071324"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                  />
                )}
                {ngawi && (
                  <circle
                    cx={ngawi.cx}
                    cy={ngawi.cy}
                    r="4.5"
                    fill="#071324"
                    stroke="#34D399"
                    strokeWidth="2.2"
                  />
                )}

                {/* 3 Concentric Radar Pulse Rings at Bojonegoro (aktif di detik 9.5 / lokal 1.5s) */}
                {radarRings.map((ring, rIdx) => (
                  <circle
                    key={rIdx}
                    cx={bjnX}
                    cy={bjnY}
                    r={14}
                    fill="none"
                    stroke={rIdx % 2 === 0 ? "#FDE047" : "#F59E0B"}
                    strokeWidth="2.4"
                    style={{
                      transform: `scale(${ring.scale})`,
                      transformOrigin: `${bjnX}px ${bjnY}px`,
                      opacity: ring.opacity,
                    }}
                  />
                ))}

                {/* Core Centroid Pin for Bojonegoro */}
                <circle
                  cx={bjnX}
                  cy={bjnY}
                  r="6.5"
                  fill="#071324"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <circle cx={bjnX} cy={bjnY} r="3" fill="#FDE047" />
              </svg>
            </div>

            {/* Tooltip "#1 KAB. BOJONEGORO 868.808 Ton GKG (8,19% Jatim)" muncul tepat di lokal 1.5s */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 18,
                transform: `translateY(${tooltipFloatY}px) scale(${calloutSpring})`,
                opacity: calloutSpring,
                transformOrigin: "left top",
                backgroundColor: "#F59E0B",
                color: "#071324",
                borderRadius: 12,
                padding: "10px 16px",
                boxShadow: "0 6px 0 #B45309, 0 12px 24px rgba(0, 0, 0, 0.45)",
                zIndex: 15,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 0.8 }}>
                #1 KAB. BOJONEGORO
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.15 }}>
                868.808 Ton GKG{" "}
                <span
                  style={{
                    backgroundColor: "#071324",
                    color: "#FDE047",
                    padding: "2px 7px",
                    borderRadius: 6,
                    fontSize: 13,
                    marginLeft: 4,
                  }}
                >
                  8,19% Jatim
                </span>
              </div>
            </div>
          </div>

          {/* Legend Strip: muncul satu per satu mulai detik 10.5 (lokal 2.5s) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#09172C",
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            {legendItems.map((item) => {
              const legSpring = spring({
                frame: frame - sec(item.appearSec),
                fps,
                config: { damping: 12, stiffness: 170, mass: 0.65 },
              });
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    transform: `translateY(${interpolate(legSpring, [0, 1], [14, 0])}px) scale(${legSpring})`,
                    opacity: legSpring,
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      backgroundColor: item.color,
                    }}
                  />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </VoiceoverCueCard>

        {/* 3. BOTTOM: 4 BESAR PROVINSI PENGHASIL PADI DI INDONESIA (Muncul di detik 12.0 / lokal 4.0s) */}
        <VoiceoverCueCard
          appearAtSecond={4.0}
          highlightAtSecond={5.3}
          index={3}
          variant="navy"
          style={{
            width: "100%",
            height: 300,
            padding: "18px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.5 }}>
              4 BESAR PROVINSI PENGHASIL PADI DI INDONESIA (GKG)
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#071324",
                backgroundColor: "#F59E0B",
                padding: "4px 12px",
                borderRadius: 8,
                transform: `scale(${crownSpring})`,
                opacity: crownSpring,
                boxShadow: "0 4px 0 #B45309",
              }}
            >
              Jatim Sumbang 18,5% RI
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 22,
              height: 225,
              paddingTop: 10,
            }}
          >
            {provinces.map((prov) => {
              const barSpring = spring({
                frame: frame - sec(prov.appearSec),
                fps,
                config: { damping: 12, stiffness: 150, mass: 0.65 },
              });
              const barBreath = prov.isLead && frame > sec(6.0) ? Math.sin(t / 18) * 3 : 0;
              const barH = Math.max(
                0,
                interpolate(barSpring, [0, 1], [0, prov.targetHeight]) + barBreath
              );

              return (
                <div
                  key={prov.name}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: interpolate(barSpring, [0, 0.25], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {/* Custom Geometric Crown SVG on Jawa Timur */}
                  {prov.isLead && (
                    <div
                      style={{
                        transform: `scale(${crownSpring}) translateY(${Math.sin(t / 14) * 2.5}px)`,
                        opacity: crownSpring,
                        marginBottom: 4,
                      }}
                    >
                      <VectorCrownIcon size={34} />
                    </div>
                  )}

                  {/* Value */}
                  <div
                    style={{
                      fontSize: prov.isLead ? 23 : 20,
                      fontWeight: 900,
                      color: prov.isLead ? "#F59E0B" : "#CBD5E1",
                      marginBottom: 6,
                    }}
                  >
                    <PhysicsCounter
                      target={prov.value}
                      decimals={2}
                      delay={sec(prov.appearSec)}
                      durationInFrames={sec(0.85)}
                      suffix=" Jt"
                    />
                  </div>

                  {/* 2-Plane Flat Split Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: barH,
                      display: "flex",
                      borderRadius: "8px 8px 0 0",
                      overflow: "hidden",
                      boxShadow: prov.isLead
                        ? "0 -4px 0 #FDE047, 0 0 20px rgba(245, 158, 11, 0.45)"
                        : "0 -3px 0 rgba(255,255,255,0.18)",
                    }}
                  >
                    <div style={{ width: "74%", height: "100%", backgroundColor: prov.baseColor }} />
                    <div style={{ width: "26%", height: "100%", backgroundColor: prov.shadeColor }} />
                  </div>

                  {/* Province Name */}
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: prov.isLead ? 900 : 800,
                      color: prov.isLead ? "#FFFFFF" : "#94A3B8",
                      marginTop: 8,
                    }}
                  >
                    {prov.name}
                  </div>
                </div>
              );
            })}
          </div>
        </VoiceoverCueCard>
      </div>
    </DynamicCameraWrapper>
  );
};
