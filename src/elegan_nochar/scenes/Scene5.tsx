import React from "react";
import { C, FONT, W, H, eio, eo, prog, useT } from "../theme";
import { Appear, Landscape, Reveal } from "../common";

const STATS = [
  { v: "868.808", u: "ton", l: "Gabah Kering Giling", sub: "Peringkat 1 Jawa Timur", a: 44.7 },
  { v: "501.670", u: "ton", l: "Beras Konsumsi", sub: "Siap Pasok Pangan", a: 45.2 },
  { v: "159,19", u: "ribu ha", l: "Luas Panen Padi", sub: "Produktivitas 5,46 Ton/Ha", a: 45.7 },
  { v: "8,19", u: "%", l: "Porsi Jawa Timur", sub: "Penopang Terbesar Jatim", a: 46.2 },
];

export const Scene5: React.FC = () => {
  const t = useT();
  const sun = prog(t, 42.2, 46, eio);
  const cta = prog(t, 49.7, 50.5);
  const bubbleBob = Math.sin(t * 2.4) * 3;
  const thanks = 47.6;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyGold, fontFamily: FONT }}>
      {/* Matahari Senja Emas di Tengah */}
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={540} cy={1100 + (1 - sun) * 70} r={380} fill="#F6C97F" />
        <circle cx={540} cy={1100 + (1 - sun) * 70} r={270} fill="#EDB05A" />
      </svg>
      <Landscape paddy={C.leaf} drift={Math.sin(t * 0.3) * 4} />

      {/* Teks Pembuka (42.4s - 47.3s): Bukti Nyata Sinergi */}
      <Appear
        at={42.4}
        out={47.3}
        dy={20}
        style={{ position: "absolute", left: 64, right: 64, top: 320, textAlign: "center", color: C.deep }}
      >
        <div style={{ fontSize: 26, letterSpacing: 5, fontWeight: 700, color: C.forest }}>
          BUKTI NYATA
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, lineHeight: 1.06, marginTop: 6 }}>
          Kerja Keras Petani,
          <br />
          Sinergi <span style={{ color: C.terra }}>Pemerintah</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, color: C.muted, marginTop: 14 }}>
          Bersama Menjaga Kedaulatan Pangan Indonesia
        </div>
      </Appear>

      {/* Teks Puncak Apresiasi (47.6s - Selesai): MATUR NUWUN */}
      <div style={{ position: "absolute", left: 64, right: 64, top: 250, textAlign: "center", color: C.deep }}>
        <Reveal at={thanks} dur={0.9}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            Matur Nuwun
          </div>
        </Reveal>
        <Reveal at={thanks + 0.2} dur={0.9}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: C.terra, marginTop: 4 }}>
            Petani Bojonegoro!
          </div>
        </Reveal>
      </div>

      {/* 4 Pilar Ringkasan Data (Grid 2x2 Simetris) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 480,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
        }}
      >
        {STATS.map((s, i) => (
          <Appear key={s.l} at={s.a} dy={20} dur={0.6}>
            <div
              style={{
                background: C.paper,
                borderRadius: 28,
                padding: "26px 30px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                borderTop: `6px solid ${i === 0 ? C.terra : C.leaf}`,
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1, color: C.deep }}>
                  {s.v}
                </span>
                <span style={{ fontSize: 26, fontWeight: 700, color: C.terra }}>{s.u}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.deep, marginTop: 4 }}>
                {s.l}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: C.muted, marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
          </Appear>
        ))}
      </div>

      {/* Tombol Interaktif Call-to-Action (Tengah Bawah) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 1080,
          opacity: cta,
          transform: `translateY(${(1 - cta) * 30 + bubbleBob * cta}px)`,
        }}
      >
        <div
          style={{
            background: C.deep,
            borderRadius: 60,
            padding: "24px 44px",
            color: C.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            boxShadow: "0 20px 48px rgba(23, 56, 44, 0.35)",
            border: "1.5px solid rgba(240, 213, 138, 0.3)",
          }}
        >
          <svg width={50} height={46} viewBox="0 0 56 52">
            <path
              d="M8,4 H48 Q54,4 54,10 V34 Q54,40 48,40 H26 L12,50 V40 H8 Q2,40 2,34 V10 Q2,4 8,4 Z"
              fill={C.goldPale}
            />
            <rect x={14} y={14} width={28} height={5} rx={2.5} fill={C.deep} />
            <rect x={14} y={25} width={18} height={5} rx={2.5} fill={C.deep} />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.15 }}>
            Wong Bojonegoro, bangga nggak nih?{" "}
            <span style={{ color: C.goldPale, textDecoration: "underline" }}>Tulis di komentar!</span>
          </div>
        </div>
      </div>

      {/* Rujukan Sumber Data Resmi di Footer */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 1220,
          fontSize: 16,
          fontWeight: 600,
          color: C.deep,
          textAlign: "center",
          opacity: 0.8 * prog(t, 46.8, 47.6),
          lineHeight: 1.4,
        }}
      >
        Sumber Data Resmi: BRS BPS RI No. 109/11/Th. XXIX dan BRS BPS Jawa Timur No. 71/11/35/Th. XXIV
      </div>
    </div>
  );
};

