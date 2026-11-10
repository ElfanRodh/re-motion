import React from "react";
import { C, FONT, W, eio, eo, prog, useT } from "../theme";
import { Appear, Landscape, Reveal } from "../common";
import { Presenter } from "../Presenter";

const STATS = [
  { v: "868.808", u: "ton", l: "gabah kering giling", a: 44.7 },
  { v: "501.670", u: "ton", l: "beras siap konsumsi", a: 45.3 },
  { v: "159,19", u: "ribu ha", l: "luas panen", a: 45.9 },
  { v: "8,19", u: "%", l: "dari produksi padi Jatim", a: 46.5 },
];

export const Scene5: React.FC = () => {
  const t = useT();
  const sun = prog(t, 42.2, 46, eio);
  const cta = prog(t, 49.7, 50.5);
  const bubbleBob = Math.sin(t * 2.4) * 3;
  const thanks = 47.6;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyGold, fontFamily: FONT }}>
      <svg width={W} height={1342} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={540} cy={1010 + (1 - sun) * 60} r={330} fill="#F6C97F" />
        <circle cx={540} cy={1010 + (1 - sun) * 60} r={230} fill="#EDB05A" />
      </svg>
      <Landscape paddy={C.leaf} drift={Math.sin(t * 0.3) * 4} />

      {/* teks pembuka: bukti nyata */}
      <Appear at={42.4} out={47.3} dy={20} style={{ position: "absolute", left: 64, top: 320, width: 900, color: C.deep }}>
        <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.forest }}>
          BUKTI NYATA
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1.06 }}>
          Kerja keras petani,
          <br />
          sinergi <span style={{ color: C.terra }}>pemerintah</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, color: C.muted, marginTop: 14 }}>
          menjaga kedaulatan pangan
        </div>
      </Appear>

      {/* matur nuwun */}
      <div style={{ position: "absolute", left: 64, top: 320, width: 920, color: C.deep }}>
        <Reveal at={thanks} dur={0.8}>
          <div style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700, color: C.forest }}>
            MATUR NUWUN
          </div>
        </Reveal>
        <Reveal at={thanks + 0.15} dur={0.9}>
          <div style={{ fontSize: 124, fontWeight: 800, letterSpacing: -3, lineHeight: 1.04, color: C.deep }}>
            Petani
          </div>
        </Reveal>
        <Reveal at={thanks + 0.3} dur={0.9}>
          <div style={{ fontSize: 124, fontWeight: 800, letterSpacing: -3, lineHeight: 1.04, color: C.terra }}>
            Bojonegoro
          </div>
        </Reveal>
      </div>

      {/* ringkasan data */}
      <div style={{ position: "absolute", left: 620, top: 640, width: 400 }}>
        {STATS.map((s, i) => (
          <Appear key={s.l} at={s.a} dy={0} dx={30} dur={0.6}>
            <div
              style={{
                padding: "8px 0",
                borderTop: `3px solid ${i === 0 ? C.deep : "rgba(23,56,44,0.22)"}`,
                color: C.deep,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{s.v}</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: C.terra }}>{s.u}</span>
              </div>
              <div style={{ fontSize: 21, fontWeight: 600, color: C.muted }}>{s.l}</div>
            </div>
          </Appear>
        ))}
      </div>

      <Presenter x={290} y={1335} scale={0.66} pose="paddy" enterAt={42.5} />

      {/* ajakan berkomentar */}
      <div
        style={{
          position: "absolute",
          left: 430,
          right: 64,
          top: 1160,
          height: 130,
          opacity: cta,
          transform: `translateY(${(1 - cta) * 30 + bubbleBob * cta}px)`,
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 56,
            background: C.deep,
            color: C.paper,
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
            gap: 20,
          }}
        >
          <svg width={56} height={52} viewBox="0 0 56 52">
            <path
              d="M8,4 H48 Q54,4 54,10 V34 Q54,40 48,40 H26 L12,50 V40 H8 Q2,40 2,34 V10 Q2,4 8,4 Z"
              fill={C.goldPale}
            />
            <rect x={14} y={14} width={28} height={5} rx={2.5} fill={C.deep} />
            <rect x={14} y={25} width={18} height={5} rx={2.5} fill={C.deep} />
          </svg>
          <div style={{ fontSize: 33, fontWeight: 800, lineHeight: 1.15 }}>
            Bangga nggak nih?{" "}
            <span style={{ color: C.goldPale }}>Tulis di komentar!</span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 430,
          right: 64,
          top: 1300,
          fontSize: 15,
          fontWeight: 600,
          color: C.paper,
          opacity: 0.85 * prog(t, 46.8, 47.6),
          lineHeight: 1.3,
        }}
      >
        Sumber: BRS BPS RI No. 109/11/Th. XXIX dan BRS BPS Jawa Timur No. 71/11/35/Th. XXIV
      </div>
    </div>
  );
};

