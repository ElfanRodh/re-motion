import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DynamicCameraWrapper } from "../components/DynamicCameraWrapper";
import { VoiceoverCueCard, useVoiceoverCue } from "../components/VoiceoverCueCard";
import { PhysicsCounter } from "../components/PhysicsCounter";
import { VectorRiceMillIcon } from "../components/VectorAssets";
import { PopBurst, ShockwaveRing } from "../../flatvector/components/PopBurst";

export const Scene4PabrikBeras: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => Math.round(s * fps);
  const speed = 60 / fps;
  const t = frame * speed;

  // CUE 1 (Detik global 33.0 / lokal 0.0s - "Kalau dikonversi jadi beras siap konsumsi,"):
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

  // Sub-kartu BAHAN GABAH (GKG): 868.808 Ton & RENDEMEN BERAS: 57,74% aktif berurutan di awal scene
  const bahanGabahCue = useVoiceoverCue({
    appearAtSecond: 0.4,
    highlightAtSecond: 0.7,
    index: 2,
  });

  const rendemenCue = useVoiceoverCue({
    appearAtSecond: 1.0,
    highlightAtSecond: 1.3,
    index: 3,
  });

  // CUE 2 (Detik global 36.8 / lokal 3.8s - "Bojonegoro menyuplai lebih dari 501 ribu ton beras..."):
  // Tepat pada detik 37.2 (lokal 4.2s), munculkan & hitung cepat angka besar 501.670 Ton Beras dengan pop-up emas
  const heroBerasSpring = spring({
    frame: frame - sec(3.8),
    fps,
    config: { damping: 10, stiffness: 195, mass: 0.65 },
  });
  const heroBerasPop = spring({
    frame: frame - sec(4.2),
    fps,
    config: { damping: 9, stiffness: 205, mass: 0.6 },
  });
  const heroBerasScale =
    interpolate(heroBerasSpring, [0, 1], [0.85, 1]) +
    interpolate(heroBerasPop, [0, 0.5, 1], [0, 0.09, 0]);
  const heroBerasGlow = interpolate(
    frame,
    [sec(4.1), sec(4.4), sec(5.3)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sub-kartu KONTRIBUSI BERAS: 8,20% muncul di detik 37.4 (lokal 4.4s)
  const kontribusiBerasCue = useVoiceoverCue({
    appearAtSecond: 4.4,
    highlightAtSecond: 4.6,
    index: 4,
  });

  // Factory machinery motion
  const grainFlowDash = -t * 3;
  const rotorAngle = t * 5.5;
  const rollerAngle = t * 6;
  const ledBlink1 = Math.sin(t / 6) > -0.2;
  const ledBlink2 = Math.cos(t / 8) > 0;

  // 3 karung beras putih di sisi kanan pabrik muncul SATU PER SATU (detik 37.5 / lokal 4.5s, 38.0 / 5.0s, 38.5 / 5.5s)
  const sackSprings = [4.5, 5.0, 5.5].map((appearSec) =>
    spring({
      frame: frame - sec(appearSec),
      fps,
      config: { damping: 9, stiffness: 210, mass: 0.6 },
    })
  );

  // CUE 3 (Detik global 39.0 / lokal 6.0s):
  // Kartu perbandingan bar di bagian bawah + pop-in 2 sub-kartu pada detik 39.6 (lokal 6.6s) & 40.2 (lokal 7.2s)
  const gkgBarSpring = spring({
    frame: frame - sec(6.05),
    fps,
    config: { damping: 13, stiffness: 150, mass: 0.7 },
  });
  const riceBarSpring = spring({
    frame: frame - sec(6.3),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });

  const gkgBarWidth = interpolate(gkgBarSpring, [0, 1], [0, 100]);
  const riceBarWidth =
    interpolate(riceBarSpring, [0, 1], [0, 57.74]) +
    (frame > sec(7.5) ? Math.sin(t / 18) * 1.1 : 0);

  const bottomCardJatim = useVoiceoverCue({
    appearAtSecond: 6.6,
    highlightAtSecond: 6.75,
    index: 5,
  });
  const bottomCardNasional = useVoiceoverCue({
    appearAtSecond: 7.2,
    highlightAtSecond: 7.35,
    index: 6,
  });

  const badgeBreath = 1 + Math.sin(t / 20) * 0.02;

  return (
    <DynamicCameraWrapper sceneDuration={durationInFrames}>
      <PopBurst delay={sec(4.2)} color="#10B981" count={8} radius={115} />
      <ShockwaveRing delay={sec(4.2)} color="#FDE047" maxRadius={165} />

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
        {/* 1. TOP HEADER & HERO CONVERSION CARD (Cue 0.0s & Cue 4.2s) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Detik 33.0 (lokal 0.0s): Header SUPLAI PANGAN MASYARAKAT */}
          <div
            style={{
              transform: `scale(${badgeSpring * badgeBreath})`,
              opacity: badgeSpring,
              backgroundColor: "#10B981",
              color: "#071324",
              fontWeight: 900,
              fontSize: 21,
              padding: "9px 28px",
              borderRadius: 12,
              marginBottom: 12,
              letterSpacing: 1.2,
              boxShadow: "0 6px 0 #047857",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <VectorRiceMillIcon size={24} color="#071324" />
            <span>KONVERSI BERAS SIAP KONSUMSI</span>
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
            SUPLAI PANGAN <span style={{ color: "#F59E0B" }}>MASYARAKAT</span>
          </h1>

          {/* Hero Stat Card (muncul di 0.0s, menyorot emas di 4.2s saat "501 ribu ton beras" diucapkan) */}
          <VoiceoverCueCard
            appearAtSecond={0.0}
            highlightAtSecond={4.2}
            highlightPeakScale={0.07}
            index={1}
            variant="emerald"
            style={{
              width: "100%",
              padding: "18px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 800, letterSpacing: 1 }}>
              PRODUKSI BERAS SIAP KONSUMSI BOJONEGORO 2026
            </div>

            {/* Angka besar 501.670 Ton Beras pop-up & hitung cepat di detik 37.2 (lokal 4.2s) */}
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                color: heroBerasGlow > 0.25 ? "#FDE047" : "#F59E0B",
                lineHeight: 1.05,
                transform: `scale(${heroBerasScale})`,
                opacity: interpolate(heroBerasSpring, [0, 1], [0.25, 1]),
                textShadow:
                  heroBerasGlow > 0.1
                    ? `0 0 ${Math.round(28 * heroBerasGlow)}px rgba(253, 224, 71, ${(
                        0.75 * heroBerasGlow
                      ).toFixed(2)})`
                    : "none",
              }}
            >
              <PhysicsCounter
                target={501670}
                durationInFrames={sec(1.0)}
                delay={sec(3.9)}
                suffix=" Ton Beras"
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
              {/* Sub-kartu 1 (lokal 0.4s): BAHAN GABAH (GKG): 868.808 Ton */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(245, 158, 11, ${
                    0.22 + bahanGabahCue.highlightGlow * 0.78
                  })`,
                  transform: `translateY(${bahanGabahCue.translateY * 0.45}px) scale(${bahanGabahCue.scale})`,
                  opacity: bahanGabahCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>BAHAN GABAH (GKG)</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                  <PhysicsCounter
                    target={868808}
                    delay={sec(0.4)}
                    durationInFrames={sec(1.0)}
                    suffix=" Ton"
                  />
                </div>
              </div>

              {/* Sub-kartu 2 (lokal 1.0s): RENDEMEN BERAS: 57,74% */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(16, 185, 129, ${
                    0.25 + rendemenCue.highlightGlow * 0.75
                  })`,
                  transform: `translateY(${rendemenCue.translateY * 0.45}px) scale(${rendemenCue.scale})`,
                  opacity: rendemenCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>RENDEMEN BERAS</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#10B981", marginTop: 2 }}>
                  <PhysicsCounter
                    target={57.74}
                    decimals={2}
                    delay={sec(1.0)}
                    durationInFrames={sec(1.0)}
                    suffix="%"
                  />
                </div>
              </div>

              {/* Sub-kartu 3 (lokal 4.4s): KONTRIBUSI BERAS: 8,20% */}
              <div
                style={{
                  backgroundColor: "#09172C",
                  borderRadius: 12,
                  padding: "10px 8px",
                  boxShadow: "0 4px 0 #050E1B",
                  border: `1.5px solid rgba(56, 189, 248, ${
                    0.25 + kontribusiBerasCue.highlightGlow * 0.75
                  })`,
                  transform: `translateY(${kontribusiBerasCue.translateY * 0.45}px) scale(${kontribusiBerasCue.scale})`,
                  opacity: kontribusiBerasCue.opacity,
                }}
              >
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>KONTRIBUSI BERAS</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8", marginTop: 2 }}>
                  <PhysicsCounter
                    target={8.2}
                    decimals={2}
                    delay={sec(4.4)}
                    durationInFrames={sec(0.9)}
                    suffix="%"
                  />
                </div>
              </div>
            </div>
          </VoiceoverCueCard>
        </div>

        {/* 2. MIDDLE ARCHITECTURAL DIAGRAM (Cue 0.2s & 3 Karung Beras di 4.5s, 5.0s, 5.5s) */}
        <VoiceoverCueCard
          appearAtSecond={0.2}
          highlightAtSecond={4.5}
          index={2}
          variant="cyan"
          style={{
            width: "100%",
            height: 295,
            padding: "16px 22px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 3,
                  backgroundColor: ledBlink1 ? "#10B981" : "#064E3B",
                }}
              />
              <span style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.6 }}>
                FASILITAS PENGGILINGAN & PENGEMASAN BERAS MODERN
              </span>
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "#071324",
                backgroundColor: "#F59E0B",
                padding: "4px 12px",
                borderRadius: 6,
              }}
            >
              STANDAR MUTU BPS
            </span>
          </div>

          {/* Architectural SVG Diagram */}
          <div style={{ width: "100%", height: 240 }}>
            <svg width="100%" height="240" viewBox="0 0 940 240" style={{ overflow: "visible" }}>
              {/* Facility Floor Slab */}
              <rect x="0" y="216" width="940" height="24" rx="4" fill="#09172C" />
              <rect x="0" y="212" width="940" height="5" fill="#1E3A5F" />

              {/* 1. LEFT: 3-PLANE CYLINDRICAL GRAIN SILO */}
              <g transform="translate(28, 18)">
                <rect x="0" y="34" width="52" height="148" fill="#1E293B" />
                <rect x="52" y="34" width="66" height="148" fill="#334155" />
                <rect x="118" y="34" width="52" height="148" fill="#475569" />
                <polygon points="0,34 85,0 170,34" fill="#64748B" />
                <polygon points="85,0 170,34 85,34" fill="#475569" />
                <polygon points="10,182 160,182 115,198 55,198" fill="#0F172A" />
                <rect x="18" y="182" width="10" height="16" fill="#334155" />
                <rect x="142" y="182" width="10" height="16" fill="#334155" />
                <rect x="68" y="82" width="34" height="82" rx="5" fill="#09172C" />
                <rect x="72" y="96" width="26" height="64" rx="3" fill="#F59E0B" />
                <rect x="85" y="96" width="13" height="64" rx="2" fill="#D97706" />
                <rect x="25" y="48" width="120" height="24" rx="5" fill="#F59E0B" />
                <text x="85" y="65" fill="#071324" fontSize="12" fontWeight="900" textAnchor="middle">
                  SILO GABAH
                </text>
              </g>

              {/* Intake Conveyor Pipe with Continuous Moving Golden Grain Stream */}
              <rect x="198" y="110" width="96" height="22" fill="#09172C" />
              <line
                x1="202"
                y1="121"
                x2="290"
                y2="121"
                stroke="#F59E0B"
                strokeWidth="8"
                strokeDasharray="12 10"
                strokeDashoffset={grainFlowDash}
                strokeLinecap="round"
              />
              <rect x="198" y="108" width="96" height="4" fill="#334155" />
              <rect x="198" y="130" width="96" height="4" fill="#1E293B" />

              {/* 2. CENTER: PRECISION MILLING & WHITENING PLANT */}
              <g transform="translate(290, 22)">
                {[0, 1, 2].map((sIdx) => {
                  const steamProg = ((t * 0.7 + sIdx * 28) % 84) / 84;
                  const steamY = 6 - steamProg * 28;
                  const steamX = 235 + Math.sin(t / 14 + sIdx) * 6;
                  const steamR = 6 + steamProg * 9;
                  const steamOp = interpolate(steamProg, [0, 0.3, 1], [0, 0.45, 0]);
                  return (
                    <circle
                      key={sIdx}
                      cx={steamX}
                      cy={steamY}
                      r={steamR}
                      fill="#E2E8F0"
                      opacity={steamOp}
                    />
                  );
                })}
                <rect x="222" y="2" width="26" height="24" rx="3" fill="#334155" />
                <rect x="0" y="22" width="290" height="168" rx="10" fill="#132A4A" />
                <rect x="195" y="22" width="95" height="168" rx="10" fill="#0F223D" />
                <rect x="16" y="10" width="190" height="14" rx="4" fill="#0284C7" />
                <rect x="22" y="42" width="246" height="86" rx="8" fill="#081528" />

                <g transform="translate(92, 85)">
                  <circle r="30" fill="#132A4A" />
                  <circle r="22" fill="#0284C7" />
                  <g transform={`rotate(${rotorAngle})`}>
                    <rect x="-18" y="-4" width="36" height="8" rx="2" fill="#FDE047" />
                    <rect x="-4" y="-18" width="8" height="36" rx="2" fill="#F59E0B" />
                  </g>
                  <circle r="6" fill="#081528" />
                </g>

                <g transform="translate(198, 85)">
                  <circle r="30" fill="#132A4A" />
                  <circle r="22" fill="#059669" />
                  <g transform={`rotate(${-rotorAngle})`}>
                    <rect x="-18" y="-4" width="36" height="8" rx="2" fill="#F8FAFC" />
                    <rect x="-4" y="-18" width="8" height="36" rx="2" fill="#34D399" />
                  </g>
                  <circle r="6" fill="#081528" />
                </g>

                <rect x="22" y="142" width="136" height="28" rx="6" fill="#081528" />
                <circle cx="38" cy="156" r="5" fill={ledBlink1 ? "#10B981" : "#064E3B"} />
                <circle cx="54" cy="156" r="5" fill={ledBlink2 ? "#F59E0B" : "#78350F"} />
                <text x="108" y="160" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle">
                  PENGGILINGAN MODERN
                </text>

                <rect x="168" y="142" width="100" height="28" rx="6" fill="#F59E0B" />
                <text x="218" y="160" fill="#071324" fontSize="11" fontWeight="900" textAnchor="middle">
                  57,74% BERAS
                </text>
              </g>

              {/* 3. RIGHT: OUTPUT CONVEYOR BELT & 3 POP-IN WOVEN RICE SACKS (4.5s, 5.0s, 5.5s) */}
              <g transform="translate(580, 32)">
                <line
                  x1="0"
                  y1="92"
                  x2="52"
                  y2="92"
                  stroke="#F8FAFC"
                  strokeWidth="7"
                  strokeDasharray="10 8"
                  strokeDashoffset={grainFlowDash}
                  strokeLinecap="round"
                />

                <rect x="12" y="150" width="320" height="24" rx="12" fill="#1E293B" />
                <rect x="22" y="154" width="300" height="16" rx="8" fill="#09172C" />
                <line
                  x1="28"
                  y1="149"
                  x2="316"
                  y2="149"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeDasharray="14 14"
                  strokeDashoffset={grainFlowDash}
                />

                {[42, 172, 302].map((rx, rIdx) => (
                  <g key={rIdx} transform={`translate(${rx}, 162)`}>
                    <circle r="9" fill="#475569" />
                    <g transform={`rotate(${rollerAngle})`}>
                      <line x1="-6" y1="0" x2="6" y2="0" stroke="#F8FAFC" strokeWidth="2" />
                      <line x1="0" y1="-6" x2="0" y2="6" stroke="#F8FAFC" strokeWidth="2" />
                    </g>
                  </g>
                ))}

                <rect x="52" y="174" width="10" height="10" fill="#334155" />
                <rect x="282" y="174" width="10" height="10" fill="#334155" />

                {/* 3 Karung Beras Putih muncul satu per satu di detik 37.5, 38.0, 38.5 */}
                {[
                  { x: 46, badge: "BERAS", sub: "PREMIUM", color: "#F59E0B", textCol: "#071324" },
                  { x: 140, badge: "501.670", sub: "TON BERAS", color: "#10B981", textCol: "#071324" },
                  { x: 234, badge: "8,20%", sub: "PORSI JATIM", color: "#0284C7", textCol: "#FFFFFF" },
                ].map((sack, sIdx) => {
                  const sScale = sackSprings[sIdx];
                  return (
                    <g
                      key={sIdx}
                      transform={`translate(${sack.x + 34}, 148) scale(${sScale}) translate(-34, -96)`}
                    >
                      <polygon points="10,8 22,0 34,10 46,0 58,8 50,18 18,18" fill="#E2E8F0" />
                      <path
                        d="M 10,16 C 4,22 2,42 2,86 C 2,92 8,96 16,96 L 52,96 C 60,96 66,92 66,86 C 66,42 64,22 58,16 Z"
                        fill="#F8FAFC"
                      />
                      <path
                        d="M 42,16 L 58,16 C 64,22 66,42 66,86 C 66,92 60,96 52,96 L 42,96 Z"
                        fill="#E2E8F0"
                      />
                      <rect x="14" y="14" width="40" height="4" rx="2" fill="#D97706" />
                      <rect x="8" y="34" width="52" height="24" rx="4" fill={sack.color} />
                      <text
                        x="34"
                        y="50"
                        fill={sack.textCol}
                        fontSize="10"
                        fontWeight="900"
                        textAnchor="middle"
                      >
                        {sack.badge}
                      </text>
                      <text
                        x="34"
                        y="74"
                        fill="#334155"
                        fontSize="8.5"
                        fontWeight="900"
                        textAnchor="middle"
                      >
                        {sack.sub}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </VoiceoverCueCard>

        {/* 3. BOTTOM: DUAL RATIO CONVERSION PROGRESS (Cue 6.0s) & 2 SUB-CARDS (Cue 6.6s & 7.2s) */}
        <VoiceoverCueCard
          appearAtSecond={6.0}
          highlightAtSecond={6.3}
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
          {/* Progress Bar 1: GKG 100% */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 19,
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: 6,
              }}
            >
              <span>Total Gabah Kering Giling (100%)</span>
              <span style={{ color: "#38BDF8" }}>868.808 Ton</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 18,
                backgroundColor: "#09172C",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 3px 0 #050E1B",
              }}
            >
              <div style={{ width: `${gkgBarWidth}%`, height: "100%", display: "flex" }}>
                <div style={{ width: "76%", height: "100%", backgroundColor: "#0284C7" }} />
                <div style={{ width: "24%", height: "100%", backgroundColor: "#0369A1" }} />
              </div>
            </div>
          </div>

          {/* Progress Bar 2: Beras 57,74% */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 19,
                fontWeight: 900,
                color: "#F59E0B",
                marginBottom: 6,
              }}
            >
              <span>Beras Siap Konsumsi (57,74%)</span>
              <span style={{ color: "#FDE047" }}>501.670 Ton</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 22,
                backgroundColor: "#09172C",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 3px 0 #050E1B",
              }}
            >
              <div style={{ width: `${riceBarWidth}%`, height: "100%", display: "flex" }}>
                <div style={{ width: "76%", height: "100%", backgroundColor: "#F59E0B" }} />
                <div style={{ width: "24%", height: "100%", backgroundColor: "#D97706" }} />
              </div>
            </div>
          </div>

          {/* Bottom 2 Summary Pill Cards: Pop-in di detik 39.6 (lokal 6.6s) & 40.2 (lokal 7.2s) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 2 }}>
            {/* Detik 39.6 (lokal 6.6s): TOTAL BERAS JATIM: 6,12 Jt Ton (#1 RI) */}
            <div
              style={{
                backgroundColor: "#09172C",
                padding: "12px 18px",
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 0 #050E1B",
                border: `1.5px solid rgba(245, 158, 11, ${
                  0.22 + bottomCardJatim.highlightGlow * 0.78
                })`,
                transform: `translateY(${bottomCardJatim.translateY * 0.5}px) scale(${bottomCardJatim.scale})`,
                opacity: bottomCardJatim.opacity,
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>TOTAL BERAS JATIM</div>
                <div style={{ fontSize: 25, fontWeight: 900, color: "#FFFFFF" }}>
                  <PhysicsCounter
                    target={6.12}
                    decimals={2}
                    delay={sec(6.6)}
                    durationInFrames={sec(0.9)}
                    suffix=" Jt Ton"
                  />
                </div>
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: "#071324",
                  backgroundColor: "#F59E0B",
                  padding: "5px 12px",
                  borderRadius: 8,
                }}
              >
                #1 RI
              </span>
            </div>

            {/* Detik 40.2 (lokal 7.2s): TOTAL BERAS NASIONAL: 33,11 Jt Ton (BPS 2026) */}
            <div
              style={{
                backgroundColor: "#09172C",
                padding: "12px 18px",
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 0 #050E1B",
                border: `1.5px solid rgba(56, 189, 248, ${
                  0.25 + bottomCardNasional.highlightGlow * 0.75
                })`,
                transform: `translateY(${bottomCardNasional.translateY * 0.5}px) scale(${bottomCardNasional.scale})`,
                opacity: bottomCardNasional.opacity,
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 800 }}>
                  TOTAL BERAS NASIONAL
                </div>
                <div style={{ fontSize: 25, fontWeight: 900, color: "#38BDF8" }}>
                  <PhysicsCounter
                    target={33.11}
                    decimals={2}
                    delay={sec(7.2)}
                    durationInFrames={sec(0.9)}
                    suffix=" Jt Ton"
                  />
                </div>
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: "#38BDF8",
                  backgroundColor: "#132A4A",
                  padding: "5px 12px",
                  borderRadius: 8,
                }}
              >
                BPS 2026
              </span>
            </div>
          </div>
        </VoiceoverCueCard>
      </div>
    </DynamicCameraWrapper>
  );
};
