import React from "react";
import { C, FONT, W, H, eio, eo, fmtDec, fmtInt, prog } from "../theme";
import { Appear, Landscape, useT } from "../common";

const G = 1060; // Garis tanah penggilingan

const gearPath = (r: number, teeth = 10) => {
  let d = "";
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.82;
    const a2 = ((i + 0.5) / (teeth * 2)) * Math.PI * 2;
    d += `${i === 0 ? "M" : "L"}${Math.cos(a) * rr},${Math.sin(a) * rr} L${Math.cos(a2) * rr},${Math.sin(a2) * rr} `;
  }
  return d + "Z";
};

const Sack: React.FC<{ x: number; y: number; show: number }> = ({ x, y, show }) => (
  <g transform={`translate(${x} ${y + (1 - show) * -60}) scale(0.95)`} opacity={show}>
    <path
      d="M6,26 Q0,10 22,4 L88,4 Q110,10 104,26 L108,138 Q108,152 94,152 L16,152 Q2,152 2,138 Z"
      fill="#F6F1E3"
    />
    <path
      d="M70,4 L88,4 Q110,10 104,26 L108,138 Q108,152 94,152 L66,152 Z"
      fill="#DDD5BF"
    />
    <rect x={20} y={0} width={70} height={14} rx={7} fill={C.sand} />
    <rect x={28} y={62} width={54} height={36} rx={6} fill={C.leaf} />
    <text
      x={55}
      y={87}
      textAnchor="middle"
      fontFamily={FONT}
      fontWeight={800}
      fontSize={18}
      fill={C.paper}
    >
      BERAS
    </text>
  </g>
);

export const Scene4Beras: React.FC = () => {
  const t = useT();
  const spin = t * 90;
  const dots = Array.from({ length: 10 });
  const gabahCount = prog(t, 34.6, 36.2, eo);
  const berasCount = prog(t, 37.4, 39.4, eo);
  const bars = prog(t, 39.9, 41.4, eo);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.skyMill,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <Landscape dy={240} />

      {/* Header Judul Hilirisasi */}
      <Appear
        at={34.2}
        dy={20}
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 260,
          textAlign: "center",
          color: C.deep,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, fontWeight: 700, color: C.muted }}>
          PROSES HILIRISASI PANGAN
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, marginTop: 4 }}>
          Konversi Gabah Menjadi <span style={{ color: C.leaf }}>Beras Konsumsi</span>
        </div>
      </Appear>

      {/* Ilustrasi Kompleks Penggilingan Modern Vektor */}
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
        {/* Tanah Fondasi */}
        <rect x={0} y={G} width={W} height={16} fill={C.sandShade} />

        {/* 1. Tumpukan Gabah Kering (Kiri) */}
        <g opacity={prog(t, 34.5, 35.2)} transform={`translate(0 ${(1 - prog(t, 34.5, 35.4)) * 40})`}>
          <path d={`M40,${G} Q160,${G - 240} 290,${G} Z`} fill={C.gold} />
          <path d={`M170,${G - 170} Q236,${G - 120} 290,${G} L170,${G} Z`} fill="#B88626" />
          {Array.from({ length: 20 }).map((_, i) => (
            <ellipse
              key={i}
              cx={80 + (i * 37) % 180}
              cy={G - 20 - ((i * 53) % 120) * (1 - ((80 + (i * 37) % 180) - 170) ** 2 / 26000)}
              rx={4.5}
              ry={8}
              fill={C.goldPale}
              opacity={0.7}
            />
          ))}
        </g>

        {/* 2. Elevator Vertikal & Silo */}
        <g opacity={prog(t, 34.7, 35.6)}>
          <rect x={290} y={G - 350} width={100} height={350} rx={14} fill="#C9CDBF" />
          <rect x={350} y={G - 350} width={40} height={350} rx={14} fill="#B2B8A8" />
          <path d={`M290,${G - 350} Q340,${G - 400} 390,${G - 350} Z`} fill="#9EA593" />
          <rect x={224} y={G - 370} width={22} height={370} rx={8} fill={C.ink} opacity={0.85} />
          <path d={`M224,${G - 370} L340,${G - 360}`} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          {dots.map((_, i) => {
            const ph = (t * 0.55 + i / 10) % 1;
            return (
              <circle key={i} cx={235} cy={G - 12 - ph * 350} r={5.5} fill={C.goldPale} opacity={0.95} />
            );
          })}
        </g>

        {/* 3. Gedung Pabrik Penggilingan (Tengah) */}
        <g opacity={prog(t, 34.9, 35.9)} transform={`translate(0 ${(1 - prog(t, 34.9, 35.9)) * 30})`}>
          <rect x={406} y={G - 320} width={400} height={320} fill={C.sand} />
          <rect x={660} y={G - 320} width={146} height={320} fill={C.sandShade} />
          <path d={`M380,${G - 320} L606,${G - 435} L832,${G - 320} Z`} fill={C.forest} />
          <path d={`M606,${G - 435} L832,${G - 320} L690,${G - 320} Z`} fill={C.deep} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={438 + i * 80} y={G - 280} width={56} height={70} rx={6} fill="#CFE3E0" />
          ))}

          {/* Roda Gigi Presisi */}
          <g transform={`translate(606 ${G - 120}) rotate(${spin})`}>
            <path d={gearPath(62)} fill={C.forest} />
            <circle r={24} fill={C.sand} />
            <circle r={9} fill={C.forest} />
          </g>
          <g transform={`translate(700 ${G - 160}) rotate(${-spin * 1.3})`}>
            <path d={gearPath(36, 8)} fill={C.terra} />
            <circle r={14} fill={C.sand} />
          </g>
          <rect x={766} y={G - 96} width={68} height={96} rx={4} fill={C.ink} />
        </g>

        {/* 4. Konveyor Beras & Tumpukan Karung */}
        <g opacity={prog(t, 36.8, 37.5)}>
          <rect x={830} y={G - 26} width={86} height={14} rx={7} fill={C.ink} opacity={0.85} />
          {Array.from({ length: 8 }).map((_, i) => {
            const ph = (t * 0.7 + i / 8) % 1;
            return (
              <ellipse key={i} cx={830 + ph * 76} cy={G - 34 + ph * 8} rx={6} ry={3.2} fill="#FFFFFF" opacity={1 - ph * 0.3} />
            );
          })}
        </g>
        <Sack x={860} y={G - 150} show={prog(t, 37.6, 38.2)} />
        <Sack x={950} y={G - 150} show={prog(t, 38.3, 38.9)} />
        <Sack x={905} y={G - 290} show={prog(t, 39.0, 39.6)} />
      </svg>

      {/* Label Statistik Gabah Masuk */}
      <Appear at={34.6} dy={14} style={{ position: "absolute", left: 60, top: G - 420, color: C.deep, width: 280 }}>
        <div style={{ background: C.paper, borderRadius: 20, padding: "16px 22px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.muted }}>GABAH KERING GILING</div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, color: C.gold, marginTop: 4 }}>
            {fmtInt(868808 * gabahCount)}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.deep }}>ton diproduksi</div>
        </div>
      </Appear>

      {/* Label Statistik Beras Keluar */}
      <Appear at={37.4} dy={14} style={{ position: "absolute", right: 60, top: G - 470, color: C.deep, width: 290, textAlign: "right" }}>
        <div style={{ background: C.paper, borderRadius: 20, padding: "16px 22px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.muted }}>BERAS KONSUMSI</div>
          <div style={{ fontSize: 50, fontWeight: 800, letterSpacing: -1, color: C.leaf, marginTop: 4 }}>
            {fmtInt(501670 * berasCount)}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.deep }}>ton siap pasok</div>
        </div>
      </Appear>

      {/* Panel Diagram Rendemen Penggilingan (Bawah) */}
      <Appear at={39.8} dy={20} style={{ position: "absolute", left: 60, right: 60, top: 1120, color: C.deep }}>
        <div style={{ background: C.paper, borderRadius: 30, padding: "34px 44px", boxShadow: "0 18px 45px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 24, letterSpacing: 2, fontWeight: 700, color: C.muted }}>
              TINGKAT RENDEMEN PENGGILINGAN PADI
            </div>
            <div style={{ fontSize: 42, fontWeight: 800, color: C.leaf }}>
              {fmtDec(57.74 * bars)}%
            </div>
          </div>

          {[
            { l: "Gabah (Bahan Baku)", w: 1, c: C.gold, val: "100%" },
            { l: "Beras (Hasil Giling)", w: 0.5774, c: C.leaf, val: "57,74%" },
          ].map((b) => (
            <div key={b.l} style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                <span>{b.l}</span>
                <span style={{ color: b.c }}>{b.val}</span>
              </div>
              <div style={{ width: "100%", height: 36, borderRadius: 18, background: "rgba(23,56,44,0.08)" }}>
                <div style={{ width: `${b.w * bars * 100}%`, height: "100%", borderRadius: 18, background: b.c }} />
              </div>
            </div>
          ))}
        </div>
      </Appear>
    </div>
  );
};
