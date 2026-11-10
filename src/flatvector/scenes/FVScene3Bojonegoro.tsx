import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FlatVectorBackground } from "../components/FlatVectorBackground";
import { EditorialHarvester } from "../components/FlatVectorIllustrations";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { PopBurst, ShockwaveRing } from "../components/PopBurst";

export const FVScene3Bojonegoro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy Spring Pop-up animations
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 240, mass: 0.5 },
  });

  const headerSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 9, stiffness: 210, mass: 0.6 },
  });

  const harvesterCardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.7 },
  });

  const leaderboardSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.7 },
  });

  // Elastic Horizontal Bar Expansion with Springs (Overshoot & Settle)
  const bar1Spring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.6 },
  });
  const bar2Spring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.6 },
  });
  const bar3Spring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.6 },
  });
  const bar4Spring = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.6 },
  });

  const barWidthBojonegoro = interpolate(bar1Spring, [0, 1], [0, 96]);
  const barWidthLamongan = interpolate(bar2Spring, [0, 1], [0, 91]);
  const barWidthNgawi = interpolate(bar3Spring, [0, 1], [0, 81]);
  const barWidthJember = interpolate(bar4Spring, [0, 1], [0, 68]);

  // Harvester horizontal travel with energetic engine suspension vibration
  const harvesterX = interpolate(frame, [0, 13 * fps], [-80, 580], {
    extrapolateRight: "clamp",
  });
  const engineVibration = Math.sin(frame * 0.45) * 2.5;

  const livelyPulse = 1 + Math.sin(frame * 0.18) * 0.035;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 48px 260px",
        backgroundColor: "#0C1B33",
        overflow: "hidden",
      }}
    >
      <FlatVectorBackground />

      <PopBurst delay={3} color="#F59E0B" count={8} radius={120} />
      <ShockwaveRing delay={3} color="#FDE047" maxRadius={170} />
      <PopBurst x="90%" y="70%" delay={18} color="#F59E0B" count={6} radius={90} />

      {/* 1. HEADER & STAT CARD WITH SPRING POP */}
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
            transform: `scale(${badgeSpring * livelyPulse})`,
            backgroundColor: "#F59E0B",
            color: "#0C1B33",
            fontWeight: 900,
            fontSize: 24,
            padding: "9px 32px",
            borderRadius: 10,
            marginBottom: 14,
            letterSpacing: 1.2,
            boxShadow: "0 6px 0 #D97706",
          }}
        >
          🏆 JUARA 1 JAWA TIMUR
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            margin: "0 0 16px",
            textAlign: "center",
            color: "#FFFFFF",
            transform: `translateY(${interpolate(headerSpring, [0, 1], [50, 0])}px) scale(${headerSpring})`,
          }}
        >
          KABUPATEN BOJONEGORO
        </h1>

        <div
          style={{
            width: "100%",
            backgroundColor: "#152E52",
            borderRadius: 22,
            padding: "24px 28px",
            textAlign: "center",
            boxShadow: "0 10px 0 #0A172A",
            transform: `scale(${headerSpring})`,
          }}
        >
          <div style={{ fontSize: 18, color: "#94A3B8", fontWeight: 800, marginBottom: 4 }}>
            TOTAL PRODUKSI GABAH KERING GILING (GKG) 2026
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#F59E0B", lineHeight: 1.05 }}>
            <AnimatedCounter targetValue={868808} durationFrames={50} unit="Ton" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 18,
            }}
          >
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>LUAS PANEN</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                <AnimatedCounter targetValue={159190} delayFrames={8} durationFrames={45} unit="Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>PRODUKTIVITAS</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#FDE047", marginTop: 4 }}>
                <AnimatedCounter targetValue={5.46} decimals={2} delayFrames={14} durationFrames={45} unit="Ton/Ha" />
              </div>
            </div>
            <div style={{ backgroundColor: "#0C1B33", borderRadius: 12, padding: "14px 10px", boxShadow: "0 4px 0 #07101C" }}>
              <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700 }}>KONTRIBUSI</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#38BDF8", marginTop: 4 }}>
                <AnimatedCounter targetValue={8.19} decimals={2} delayFrames={20} durationFrames={45} unit="%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AGRICULTURAL ACTION: COMBINE HARVESTER IN ACTION WITH BOUNCY SUSPENSION */}
      <div
        style={{
          width: "100%",
          height: 250,
          backgroundColor: "#152E52",
          borderRadius: 22,
          position: "relative",
          overflow: "hidden",
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
          transform: `scale(${harvesterCardSpring}) translateY(${interpolate(harvesterCardSpring, [0, 1], [60, 0])}px)`,
        }}
      >
        {/* Background Field Rows */}
        <polygon points="0,90 980,60 980,180 0,220" fill="#047857" />
        <polygon points="0,150 980,120 980,250 0,250" fill="#B45309" />
        <polygon points="0,170 980,150 980,250 0,250" fill="#D97706" />

        {/* Moving Editorial Combine Harvester with Suspension Dynamics */}
        <div style={{ position: "absolute", top: 35 + engineVibration, left: harvesterX }}>
          <EditorialHarvester width={380} height={200} />
        </div>

        {/* Flying Golden Grain Sparks */}
        {Array.from({ length: 6 }).map((_, i) => {
          const sparkOffset = ((frame * 6 + i * 24) % 180);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 95 - Math.sin((sparkOffset / 180) * Math.PI) * 45,
                left: harvesterX + 130 - sparkOffset * 0.7,
                width: 8,
                height: 8,
                backgroundColor: "#FDE047",
                borderRadius: 2,
                transform: `rotate(${frame * 12 + i * 45}deg)`,
                opacity: 1 - sparkOffset / 180,
              }}
            />
          );
        })}

        {/* Overlay Field Text Badge */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 24,
            backgroundColor: "#0A172A",
            padding: "8px 18px",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 900,
            color: "#FDE047",
            boxShadow: "0 4px 0 #06101C",
          }}
        >
          🌾 LUAS PANEN: 159.190 HEKTAR
        </div>
      </div>

      {/* 3. EDITORIAL LEADERBOARD WITH ELASTIC POPUP BARS */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          backgroundColor: "#152E52",
          padding: "26px 32px",
          borderRadius: 22,
          zIndex: 10,
          boxShadow: "0 10px 0 #0A172A",
          transform: `scale(${leaderboardSpring})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 23, fontWeight: 900, color: "#F59E0B" }}>
            KLASEMEN PRODUSEN PADI JAWA TIMUR (GKG)
          </span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#FDE047" }}>
            Unggul +16.616 Ton dari Peringkat #2
          </span>
        </div>

        {/* Row 1: Bojonegoro */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 900, marginBottom: 8, color: "#FFFFFF" }}>
            <span>1. Kabupaten Bojonegoro</span>
            <span style={{ color: "#F59E0B" }}>
              <AnimatedCounter targetValue={868808} durationFrames={45} unit="Ton" />
            </span>
          </div>
          <div style={{ height: 26, width: "100%", backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden", boxShadow: "0 3px 0 #08121E" }}>
            <div style={{ height: "100%", width: `${barWidthBojonegoro}%`, display: "flex" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#F59E0B" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#D97706" }} />
            </div>
          </div>
        </div>

        {/* Row 2: Lamongan */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23, fontWeight: 800, color: "#94A3B8", marginBottom: 8 }}>
            <span>2. Kabupaten Lamongan</span>
            <span style={{ color: "#FFFFFF" }}>
              <AnimatedCounter targetValue={852192} delayFrames={8} durationFrames={45} unit="Ton" />
            </span>
          </div>
          <div style={{ height: 20, width: "100%", backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barWidthLamongan}%`, display: "flex" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#0284C7" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#0369A1" }} />
            </div>
          </div>
        </div>

        {/* Row 3: Ngawi */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23, fontWeight: 800, color: "#94A3B8", marginBottom: 8 }}>
            <span>3. Kabupaten Ngawi</span>
            <span style={{ color: "#FFFFFF" }}>
              <AnimatedCounter targetValue={768307} delayFrames={16} durationFrames={45} unit="Ton" />
            </span>
          </div>
          <div style={{ height: 20, width: "100%", backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barWidthNgawi}%`, display: "flex" }}>
              <div style={{ width: "75%", height: "100%", backgroundColor: "#059669" }} />
              <div style={{ width: "25%", height: "100%", backgroundColor: "#047857" }} />
            </div>
          </div>
        </div>

        {/* Row 4: Jember */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 700, color: "#94A3B8", marginBottom: 8 }}>
            <span>4. Kabupaten Jember</span>
            <span style={{ color: "#94A3B8" }}>
              <AnimatedCounter targetValue={642150} delayFrames={24} durationFrames={45} unit="Ton" />
            </span>
          </div>
          <div style={{ height: 18, width: "100%", backgroundColor: "#0C1B33", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barWidthJember}%`, backgroundColor: "#334155" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
