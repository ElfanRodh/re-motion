import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DynamicCameraWrapper } from "../components/DynamicCameraWrapper";
import { VoiceoverCueCard } from "../components/VoiceoverCueCard";
import { PhysicsCounter } from "../components/PhysicsCounter";
import {
  DetailedPaddyStalk,
  VectorCommentBubbleIcon,
  VectorShareArrowIcon,
  VectorShieldRibbonIcon,
  VectorTrophyIcon,
} from "../components/VectorAssets";
import { PopBurst, ShockwaveRing } from "../../flatvector/components/PopBurst";

export const Scene5ApresiasiOutro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => Math.round(s * fps);
  const speed = 60 / fps;
  const t = frame * speed;

  // CUE 1 (Detik global 44.0 / lokal 0.0s - "Bukti nyata kerja keras petani dan sinergi pemerintah menjaga kedaulatan pangan."):
  const badgeSpring = spring({
    frame: frame - sec(0.0),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  const subtitleSpring = spring({
    frame: frame - sec(0.15),
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });

  const crestEntrance = spring({
    frame: frame - sec(0.25),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.65 },
  });

  // CUE 3 (Detik global 47.0 / lokal 3.0s - "Matur nuwun petani Bojonegoro!"):
  // Judul utama muncul & melakukan hero bounce (scale: 1 -> 1.09 -> 1) tepat di detik 47.0 (lokal 3.0s)
  const titleEntrance = spring({
    frame: frame - sec(0.1),
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });

  const titleHeroBounce = spring({
    frame: frame - sec(3.0),
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.65 },
  });

  const titleScale =
    interpolate(titleEntrance, [0, 1], [0.92, 1]) +
    interpolate(titleHeroBounce, [0, 0.45, 1], [0, 0.09, 0]);

  const titleGlow = interpolate(
    frame,
    [sec(3.0), sec(3.35), sec(4.4)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CUE 4 (Detik global 50.0 / lokal 6.0s - "Wong Bojonegoro, bangga nggak nih? Tulis di komentar!"):
  // JANGAN tampilkan banner CTA sejak awal scene. Baru meluncur masuk di detik 50.0 (lokal 6.0s) dengan spring slide-up + bounce kuat!
  const ctaEntrance = spring({
    frame: frame - sec(6.0),
    fps,
    config: { damping: 9, stiffness: 195, mass: 0.68 },
  });

  // Spotlight pulse pada detik 51.5 (lokal 7.5s, saat kata "Tulis di komentar!")
  const ctaSpotlight = spring({
    frame: frame - sec(7.5),
    fps,
    config: { damping: 9, stiffness: 210, mass: 0.6 },
  });
  const ctaSpotlightScale = interpolate(ctaSpotlight, [0, 0.5, 1], [0, 0.065, 0]);
  const ctaSpotlightGlow = interpolate(
    frame,
    [sec(7.5), sec(7.85), sec(8.8)],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Continuous motion for the 00:53 - 01:00 (lokal 9.0s - 16.0s) outro window
  const medalPulse = 1 + Math.sin(t / 18) * 0.04;
  const wreathSway = Math.sin(t / 16) * 3.2;
  const sunburstRot = t * 0.3;

  // Metallic sheen sweep across the Heraldic Crest every 90 frames
  const sheenCycle = t % 90;
  const sheenOffset = interpolate(sheenCycle, [0, 42], [-140, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Periodic spring bounce on the CTA banner every 90 frames during outro (after local 8.5s)
  const isOutroLoop = frame >= sec(8.5);
  const ctaLoopFrame = (t - 510 + 900) % 90;
  const ctaPeriodicBounce =
    isOutroLoop && ctaLoopFrame < 28 ? Math.sin((ctaLoopFrame / 28) * Math.PI) * 0.045 : 0;
  const bubbleRockDeg = Math.sin(t / 9) * 8;

  const ctaTranslateY = interpolate(ctaEntrance, [0, 1], [68, 0]);
  const ctaScale =
    interpolate(ctaEntrance, [0, 1], [0.85, 1]) + ctaSpotlightScale + ctaPeriodicBounce;

  return (
    <DynamicCameraWrapper sceneDuration={durationInFrames}>
      {/* Semburan partikel bintang/konfeti emas dari belakang medali tepat saat "Matur nuwun petani Bojonegoro!" (lokal 3.0s) */}
      <PopBurst x="50%" y="16%" delay={sec(3.0)} color="#F59E0B" count={12} radius={150} />
      <ShockwaveRing x="50%" y="16%" delay={sec(3.0)} color="#FDE047" maxRadius={210} />
      <PopBurst x="50%" y="36%" delay={sec(3.05)} color="#FDE047" count={14} radius={175} />

      {/* 30 Deterministic Vector Confetti Ribbons & 4-Point Sparkles (intensifies at local 3.0s) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4 }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const xPos = random(`outro-x-${i}`) * 1020 + 30;
          const fallSpeed = 0.75 + random(`outro-sp-${i}`) * 0.85;
          const yStart = random(`outro-y-${i}`) * 1920;
          const yPos = ((t * fallSpeed + yStart) % 2040) - 60;
          const driftX = Math.sin(t / 22 + i * 1.3) * 18;
          const rot = t * (0.9 + random(`outro-r-${i}`) * 1.4) + i * 25;
          const baseAlpha = frame >= sec(3.0) ? 0.35 : 0.14;
          const sparkleTwinkle = baseAlpha + (Math.sin(t / 14 + i * 1.9) + 1) * 0.32;
          const isStar = i % 2 === 0;
          const palette = ["#F59E0B", "#FDE047", "#38BDF8", "#10B981"];
          const fillCol = palette[i % palette.length];

          return (
            <g
              key={i}
              transform={`translate(${xPos + driftX}, ${yPos}) rotate(${rot})`}
              opacity={sparkleTwinkle}
            >
              {isStar ? (
                <polygon
                  points="0,-9 2.5,-2.5 9,0 2.5,2.5 0,9 -2.5,2.5 -9,0 -2.5,-2.5"
                  fill={fillCol}
                />
              ) : (
                <polygon points="-6,-4 6,-4 4,4 -8,4" fill={fillCol} />
              )}
            </g>
          );
        })}
      </svg>

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "52px 48px 205px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* 1. TOP HEADER (Cue 0.0s & Hero Bounce at Cue 3.0s) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Detik 44.0 (lokal 0.0s): Badge LUMBUNG PANGAN UTAMA JAWA TIMUR */}
          <div
            style={{
              transform: `scale(${badgeSpring * medalPulse})`,
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
            <VectorShieldRibbonIcon size={24} color="#071324" />
            <span>LUMBUNG PANGAN JAWA TIMUR</span>
          </div>

          {/* Detik 47.0 (lokal 3.0s): Judul MATUR NUWUN PETANI BOJONEGORO! melakukan hero bounce */}
          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.05,
              color: "#FFFFFF",
              margin: "0 0 8px",
              letterSpacing: -0.5,
              transform: `translateY(${interpolate(titleEntrance, [0, 1], [36, 0])}px) scale(${titleScale})`,
              textShadow:
                titleGlow > 0.05
                  ? `0 0 ${Math.round(32 * titleGlow)}px rgba(245, 158, 11, ${(
                      0.8 * titleGlow
                    ).toFixed(2)})`
                  : "none",
              opacity: titleEntrance,
            }}
          >
            MATUR NUWUN{" "}
            <span style={{ color: titleGlow > 0.35 ? "#FDE047" : "#F59E0B" }}>
              PETANI BOJONEGORO!
            </span>
          </h1>

          {/* Detik 44.0 (lokal 0.0s): Subjudul sinergi petani & pemerintah */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#CBD5E1",
              textAlign: "center",
              transform: `translateY(${interpolate(subtitleSpring, [0, 1], [18, 0])}px)`,
              opacity: subtitleSpring,
            }}
          >
            Kerja Keras Petani & Sinergi Pemerintah Menjaga Kedaulatan Pangan
          </div>
        </div>

        {/* 2. CENTERPIECE (Cue 0.0s & Highlight at Cue 3.0s): MEDALI UTAMA PERINGKAT #1 JAWA TIMUR */}
        <VoiceoverCueCard
          appearAtSecond={0.0}
          highlightAtSecond={3.0}
          index={1}
          variant="gold"
          style={{
            width: "100%",
            height: 410,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Rotating Geometric Sunburst Rays Behind Crest */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              width: 340,
              height: 340,
              transform: `translateX(-50%) rotate(${sunburstRot}deg)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <svg viewBox="-170 -170 340 340" width="340" height="340">
              {Array.from({ length: 16 }).map((_, i) => (
                <polygon
                  key={i}
                  points="0,0 -12,-165 12,-165"
                  fill="#F59E0B"
                  opacity={0.09}
                  transform={`rotate(${(i * 360) / 16})`}
                />
              ))}
            </svg>
          </div>

          {/* Heraldic Crest & Laurel Wreath Assembly */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              marginTop: 18,
              transform: `scale(${crestEntrance * medalPulse})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg width="230" height="205" viewBox="-115 -105 230 205" style={{ overflow: "visible" }}>
              <defs>
                <clipPath id="shieldSheenClip">
                  <polygon points="0,-64 56,-32 56,30 0,66 -56,30 -56,-32" />
                </clipPath>
              </defs>

              {/* Left Golden Laurel Wreath Branch */}
              <g transform={`rotate(${wreathSway})`}>
                {Array.from({ length: 7 }).map((_, i) => {
                  const angle = -142 + i * 16;
                  return (
                    <g key={`wl-${i}`} transform={`rotate(${angle}) translate(0, -84)`}>
                      <path d="M 0,-15 C 11,-8 11,8 0,15 C -11,8 -11,-8 0,-15 Z" fill="#F59E0B" />
                      <path d="M 0,-15 C 0,-8 5,0 0,15 Z" fill="#FDE047" />
                    </g>
                  );
                })}
              </g>

              {/* Right Golden Laurel Wreath Branch */}
              <g transform={`rotate(${-wreathSway})`}>
                {Array.from({ length: 7 }).map((_, i) => {
                  const angle = 142 - i * 16;
                  return (
                    <g key={`wr-${i}`} transform={`rotate(${angle}) translate(0, -84)`}>
                      <path d="M 0,-15 C 11,-8 11,8 0,15 C -11,8 -11,-8 0,-15 Z" fill="#F59E0B" />
                      <path d="M 0,-15 C -5,0 0,8 0,15 Z" fill="#D97706" />
                    </g>
                  );
                })}
              </g>

              <path d="M -22,74 Q 0,64 22,74 L 16,86 Q 0,78 -16,86 Z" fill="#D97706" />
              <polygon points="0,-64 56,-32 56,30 0,66 -56,30 -56,-32" fill="#F59E0B" />
              <polygon points="0,-64 56,-32 56,30 0,66 0,-64" fill="#D97706" />
              <polygon points="0,-54 47,-26 47,25 0,56 -47,25 -47,-26" fill="#09172C" />
              <polygon points="0,-54 47,-26 47,25 0,56 0,-54" fill="#112849" />
              <polygon
                points="0,-32 9,-10 32,-10 14,4 20,26 0,13 -20,26 -14,4 -32,-10 -9,-10"
                fill="#FDE047"
              />
              <polygon points="0,-32 9,-10 32,-10 14,4 20,26 0,13" fill="#F59E0B" />

              {/* Metallic Sheen Sweep Across Shield */}
              <g clipPath="url(#shieldSheenClip)">
                <polygon
                  points={`${sheenOffset - 24},-80 ${sheenOffset + 12},-80 ${sheenOffset - 28},80 ${
                    sheenOffset - 64
                  },80`}
                  fill="#FFFFFF"
                  opacity={0.32}
                />
              </g>
            </svg>

            {/* 2-Plane Champion Ribbon Banner */}
            <div
              style={{
                backgroundColor: "#F59E0B",
                color: "#071324",
                fontWeight: 900,
                fontSize: 22,
                padding: "7px 28px",
                borderRadius: 10,
                marginTop: 2,
                boxShadow: "0 5px 0 #B45309",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <VectorTrophyIcon size={21} color="#071324" />
              <span>PERINGKAT #1 JAWA TIMUR</span>
            </div>

            <div style={{ fontSize: 16, fontWeight: 800, color: "#E2E8F0", marginTop: 6 }}>
              Kabupaten Bojonegoro · Bumi Angling Darma
            </div>
          </div>

          {/* Terraced Harvest Horizon + Swaying Paddy Plants (keeps 00:53 - 01:00 alive) */}
          <div style={{ position: "relative", zIndex: 5, width: "100%", height: 110 }}>
            <svg
              width="100%"
              height="110"
              viewBox="0 0 980 110"
              preserveAspectRatio="none"
            >
              <path d="M 0,48 Q 260,12 520,36 T 980,24 L 980,110 L 0,110 Z" fill="#047857" />
              <path d="M 0,68 Q 240,40 500,58 T 980,46 L 980,110 L 0,110 Z" fill="#D97706" />
              <path d="M 0,84 Q 320,62 640,78 T 980,68 L 980,110 L 0,110 Z" fill="#F59E0B" />
            </svg>

            {/* Swaying Rice Panicles along the bottom hills */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: 24,
                right: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => {
                const sway = Math.sin(t / 13 + idx * 0.8) * 5.5;
                return (
                  <div key={idx} style={{ transformOrigin: "bottom center" }}>
                    <DetailedPaddyStalk
                      width={48}
                      height={92}
                      swayDeg={sway}
                      flip={idx % 2 === 1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </VoiceoverCueCard>

        {/* 3. 2x2 SUMMARY SCORECARD GRID: Muncul SATU PER SATU setiap 0.45 detik (45.0s, 45.45s, 45.9s, 46.35s) */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Detik 45.0 (lokal 1.0s): PRODUKSI GABAH (GKG): 868.808 Ton */}
          <VoiceoverCueCard
            appearAtSecond={1.0}
            highlightAtSecond={1.15}
            index={2}
            variant="navy"
            style={{ padding: "16px 22px" }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI GABAH (GKG)</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#F59E0B", margin: "2px 0" }}>
              <PhysicsCounter
                target={868808}
                delay={sec(1.0)}
                durationInFrames={sec(0.95)}
                suffix=" Ton"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF" }}>
              Peringkat #1 di Jawa Timur
            </div>
          </VoiceoverCueCard>

          {/* Detik 45.45 (lokal 1.45s): PRODUKSI BERAS: 501.670 Ton */}
          <VoiceoverCueCard
            appearAtSecond={1.45}
            highlightAtSecond={1.6}
            index={3}
            variant="navy"
            style={{ padding: "16px 22px" }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI BERAS</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#10B981", margin: "2px 0" }}>
              <PhysicsCounter
                target={501670}
                delay={sec(1.45)}
                durationInFrames={sec(0.95)}
                suffix=" Ton"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#38BDF8" }}>
              Beras Siap Konsumsi
            </div>
          </VoiceoverCueCard>

          {/* Detik 45.9 (lokal 1.9s): LUAS PANEN: 159.190 Ha */}
          <VoiceoverCueCard
            appearAtSecond={1.9}
            highlightAtSecond={2.05}
            index={4}
            variant="navy"
            style={{ padding: "16px 22px" }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: "#94A3B8" }}>LUAS PANEN</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#38BDF8", margin: "2px 0" }}>
              <PhysicsCounter
                target={159190}
                delay={sec(1.9)}
                durationInFrames={sec(0.95)}
                suffix=" Ha"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF" }}>
              Sawah Pertanian Produktif
            </div>
          </VoiceoverCueCard>

          {/* Detik 46.35 (lokal 2.35s): PRODUKSI JAWA TIMUR: 10,61 Jt T */}
          <VoiceoverCueCard
            appearAtSecond={2.35}
            highlightAtSecond={2.5}
            index={5}
            variant="navy"
            style={{ padding: "16px 22px" }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: "#94A3B8" }}>PRODUKSI JAWA TIMUR</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#FDE047", margin: "2px 0" }}>
              <PhysicsCounter
                target={10.61}
                decimals={2}
                delay={sec(2.35)}
                durationInFrames={sec(0.95)}
                suffix=" Jt T"
                goldShimmerOnFinish
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>
              Provinsi Juara 1 Nasional
            </div>
          </VoiceoverCueCard>
        </div>

        {/* 4. BANNER CTA: BARU MUNCUL DI DETIK 50.0 (lokal 6.0s) SAAT NARATOR BERKATA "Wong Bojonegoro, bangga nggak nih?" */}
        <div
          style={{
            width: "100%",
            transform: `translateY(${ctaTranslateY}px) scale(${ctaScale})`,
            opacity: ctaEntrance,
            pointerEvents: frame >= sec(6.0) ? "auto" : "none",
          }}
        >
          <div
            style={{
              backgroundColor: ctaSpotlightGlow > 0.25 ? "#FDE047" : "#F59E0B",
              borderRadius: 18,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow:
                ctaSpotlightGlow > 0.1
                  ? `0 8px 0 #B45309, 0 0 ${Math.round(
                      36 * ctaSpotlightGlow
                    )}px rgba(253, 224, 71, ${(0.85 * ctaSpotlightGlow).toFixed(
                      2
                    )}), 0 16px 32px rgba(0, 0, 0, 0.45)`
                  : "0 8px 0 #B45309, 0 16px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ transform: `rotate(${bubbleRockDeg}deg)` }}>
                <VectorCommentBubbleIcon size={44} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#071324",
                    lineHeight: 1.12,
                    letterSpacing: 0.3,
                  }}
                >
                  WONG BOJONEGORO, BANGGA?
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 900,
                    color: "#09172C",
                    opacity: 0.9,
                  }}
                >
                  TULIS DI KOMENTAR!
                </div>
              </div>
            </div>

            {/* 2-Plane Share Button with Custom Vector Arrow */}
            <div
              style={{
                backgroundColor: "#071324",
                color: "#FDE047",
                fontWeight: 900,
                fontSize: 16,
                padding: "11px 20px",
                borderRadius: 12,
                boxShadow: "0 4px 0 #02060D",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: 0.8,
              }}
            >
              <span>BAGIKAN</span>
              <VectorShareArrowIcon size={18} color="#FDE047" />
            </div>
          </div>
        </div>
      </div>
    </DynamicCameraWrapper>
  );
};
