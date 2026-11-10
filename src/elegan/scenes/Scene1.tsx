import React from "react";
import { C, FONT, W, eo, eio, fmtInt, prog, useT } from "../theme";
import { Appear, Landscape, Reveal } from "../common";
import { Presenter } from "../Presenter";

const Laurel: React.FC<{ side: 1 | -1 }> = ({ side }) => (
  <g transform={`scale(${side} 1)`}>
    {Array.from({ length: 7 }).map((_, i) => {
      const phi = 0.45 + i * 0.36;
      const r = 114;
      const cx = Math.sin(phi) * r;
      const cy = -Math.cos(phi) * r;
      return (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={9}
          ry={22}
          fill={C.forest}
          transform={`rotate(${(phi * 180) / Math.PI + 12} ${cx} ${cy})`}
        />
      );
    })}
  </g>
);

export const Scene1: React.FC = () => {
  const t = useT();
  const sun = prog(t, 0.0, 3.2, eio);
  const medal = prog(t, 0.9, 1.7);
  const count = prog(t, 3.1, 4.6, eo);
  const gabah = 868808 * count;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyDawn, fontFamily: FONT }}>
      {/* matahari terbit */}
      <svg width={W} height={1342} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={300} cy={900 + (1 - sun) * 200} r={300} fill="#F7D895" />
        <circle cx={300} cy={900 + (1 - sun) * 200} r={215} fill="#F2C06A" />
      </svg>

      <Landscape drift={Math.sin(t * 0.3) * 4} />

      {/* medali peringkat 1 */}
      <div
        style={{
          position: "absolute",
          left: 300 - 150,
          top: 835 - 150,
          width: 300,
          height: 300,
          transform: `scale(${0.7 + medal * 0.3})`,
          opacity: medal,
        }}
      >
        <svg width={300} height={300} viewBox="-150 -150 300 300">
          <g transform="translate(0 6)">
            <Laurel side={1} />
            <Laurel side={-1} />
          </g>
          <circle r={88} fill={C.deep} />
          <circle r={74} fill={C.gold} />
          <circle r={74} fill={C.goldPale} opacity={0.0} />
          <path d="M0,-74 A74,74 0 0 1 0,74 A60,74 0 0 0 0,-74Z" fill="#C48E2C" />
          <text
            x={0}
            y={36}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={800}
            fontSize={110}
            fill={C.deep}
          >
            1
          </text>
        </svg>
      </div>

      {/* judul */}
      <div style={{ position: "absolute", left: 64, top: 330, width: 900, color: C.deep }}>
        <Reveal at={0.15} dur={0.7}>
          <div style={{ fontSize: 30, letterSpacing: 9, fontWeight: 700, color: C.forest }}>
            BUMI ANGLING DARMA
          </div>
        </Reveal>
        <div style={{ height: 6, width: 90 * prog(t, 0.4, 1.0), background: C.terra, margin: "18px 0 10px" }} />
        <Reveal at={0.5} dur={0.9}>
          <div style={{ fontSize: 176, lineHeight: 1.02, fontWeight: 800, letterSpacing: -3 }}>
            Bojonegoro
          </div>
        </Reveal>
        <Reveal at={1.0} dur={0.9}>
          <div style={{ fontSize: 68, lineHeight: 1.15, fontWeight: 700, color: C.terra }}>
            Juara 1 Padi Jawa Timur
          </div>
        </Reveal>
      </div>

      {/* kartu data BPS */}
      <Appear at={2.9} dy={40} style={{ position: "absolute", left: 56, top: 985 }}>
        <div style={{ position: "relative", width: 590 }}>
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 12,
              right: -10,
              bottom: -12,
              background: C.deep,
              opacity: 0.14,
              borderRadius: 26,
            }}
          />
          <div
            style={{
              position: "relative",
              background: C.paper,
              borderRadius: 26,
              padding: "26px 34px 28px",
              color: C.deep,
            }}
          >
            <div style={{ fontSize: 24, letterSpacing: 2, fontWeight: 700, color: C.muted }}>
              RILIS BPS · 2 NOVEMBER 2026
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 8 }}>
              <span style={{ fontSize: 108, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
                {fmtInt(gabah)}
              </span>
              <span style={{ fontSize: 36, fontWeight: 700, color: C.terra }}>ton</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: C.muted, marginTop: 6 }}>
              Produksi gabah kering giling (GKG)
            </div>
            <div style={{ height: 3, background: C.sagePale, margin: "14px 0 12px" }} />
            <div style={{ display: "flex", gap: 36 }}>
              {[
                { a: 4.6, v: "159,19 ribu ha", l: "luas panen" },
                { a: 5.1, v: "501.670 ton", l: "beras" },
                { a: 5.6, v: "8,19%", l: "produksi Jatim" },
              ].map((s) => (
                <Appear key={s.l} at={s.a} dy={14} dur={0.5}>
                  <div style={{ fontSize: 27, fontWeight: 800 }}>{s.v}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: C.muted }}>{s.l}</div>
                </Appear>
              ))}
            </div>
          </div>
        </div>
      </Appear>

      <Presenter x={835} y={1335} scale={0.64} pose="present" enterAt={1.4} />
    </div>
  );
};

