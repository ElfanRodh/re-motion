import React from "react";
import { C, FONT, W, eio, eo, fmtDec, fmtInt, prog, useT } from "../theme";
import { Appear, Landscape } from "../common";

const G = 985; // garis tanah

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
  <g
    transform={`translate(${x} ${y + (1 - show) * -60}) scale(0.88)`}
    opacity={show}
  >
    <path d="M6,26 Q0,10 22,4 L88,4 Q110,10 104,26 L108,138 Q108,152 94,152 L16,152 Q2,152 2,138 Z" fill="#F6F1E3" />
    <path d="M70,4 L88,4 Q110,10 104,26 L108,138 Q108,152 94,152 L66,152 Z" fill="#DDD5BF" />
    <rect x={20} y={0} width={70} height={14} rx={7} fill={C.sand} />
    <rect x={30} y={62} width={50} height={36} rx={5} fill={C.leaf} />
    <text x={55} y={87} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={16} fill={C.paper}>
      BERAS
    </text>
  </g>
);

export const Scene4: React.FC = () => {
  const t = useT();
  const spin = t * 90;
  const dots = Array.from({ length: 10 });
  const gabahCount = prog(t, 34.6, 36.2, eo);
  const berasCount = prog(t, 37.4, 39.4, eo);
  const bars = prog(t, 39.9, 41.4, eo);
  const BAR = 760;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyMill, fontFamily: FONT }}>
      <Landscape dy={340} />

      <Appear at={34.2} dy={20} style={{ position: "absolute", left: 64, top: 330, color: C.deep }}>
        <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
          DARI GABAH KE BERAS
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          Penggilingan <span style={{ color: C.terra }}>padi</span>
        </div>
      </Appear>

      <svg width={W} height={1342} style={{ position: "absolute", left: 0, top: 0 }}>
        {/* tanah */}
        <rect x={0} y={G} width={W} height={14} fill={C.sandShade} />

        {/* tumpukan gabah */}
        <g opacity={prog(t, 34.5, 35.2)} transform={`translate(0 ${(1 - prog(t, 34.5, 35.4)) * 40})`}>
          <path d={`M30,${G} Q140,${G - 230} 262,${G} Z`} fill={C.gold} />
          <path d={`M146,${G - 160} Q210,${G - 120} 262,${G} L150,${G} Z`} fill="#B88626" />
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse
              key={i}
              cx={70 + (i * 37) % 170}
              cy={G - 20 - ((i * 53) % 110) * (1 - ((70 + (i * 37) % 170) - 146) ** 2 / 24000)}
              rx={4}
              ry={7}
              fill={C.goldPale}
              opacity={0.7}
            />
          ))}
        </g>

        {/* silo + elevator */}
        <g opacity={prog(t, 34.7, 35.6)}>
          <rect x={272} y={G - 330} width={92} height={330} rx={12} fill="#C9CDBF" />
          <rect x={326} y={G - 330} width={38} height={330} rx={12} fill="#B2B8A8" />
          <path d={`M272,${G - 330} Q318,${G - 380} 364,${G - 330} Z`} fill="#9EA593" />
          <rect x={206} y={G - 350} width={20} height={350} rx={8} fill={C.ink} opacity={0.85} />
          <path d={`M206,${G - 350} L316,${G - 340}`} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          {dots.map((_, i) => {
            const ph = (t * 0.55 + i / 10) % 1;
            return (
              <circle key={i} cx={216} cy={G - 12 - ph * 330} r={5.5} fill={C.goldPale} opacity={0.95} />
            );
          })}
          {/* gabah dari tumpukan menuju elevator */}
          <path d={`M240,${G - 16} L214,${G - 16}`} stroke={C.ink} strokeWidth={12} strokeLinecap="round" opacity={0.0} />
        </g>

        {/* bangunan penggilingan */}
        <g opacity={prog(t, 34.9, 35.9)} transform={`translate(0 ${(1 - prog(t, 34.9, 35.9)) * 30})`}>
          <rect x={380} y={G - 300} width={380} height={300} fill={C.sand} />
          <rect x={620} y={G - 300} width={140} height={300} fill={C.sandShade} />
          <path d={`M358,${G - 300} L570,${G - 410} L782,${G - 300} Z`} fill={C.forest} />
          <path d={`M570,${G - 410} L782,${G - 300} L650,${G - 300} Z`} fill={C.deep} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={408 + i * 74} y={G - 262} width={52} height={64} rx={6} fill="#CFE3E0" />
          ))}
          {/* roda gigi */}
          <g transform={`translate(570 ${G - 112}) rotate(${spin})`}>
            <path d={gearPath(58)} fill={C.forest} />
            <circle r={22} fill={C.sand} />
            <circle r={8} fill={C.forest} />
          </g>
          <g transform={`translate(660 ${G - 150}) rotate(${-spin * 1.3})`}>
            <path d={gearPath(34, 8)} fill={C.terra} />
            <circle r={12} fill={C.sand} />
          </g>
          {/* pintu keluar */}
          <rect x={720} y={G - 90} width={64} height={90} rx={4} fill={C.ink} />
        </g>

        {/* alur beras ke karung */}
        <g opacity={prog(t, 36.8, 37.5)}>
          <rect x={782} y={G - 26} width={80} height={14} rx={7} fill={C.ink} opacity={0.85} />
          {Array.from({ length: 8 }).map((_, i) => {
            const ph = (t * 0.7 + i / 8) % 1;
            return (
              <ellipse key={i} cx={780 + ph * 70} cy={G - 34 + ph * 8} rx={6} ry={3.2} fill="#FFFFFF" opacity={1 - ph * 0.3} />
            );
          })}
        </g>
        <Sack x={838} y={G - 136} show={prog(t, 37.6, 38.2)} />
        <Sack x={928} y={G - 136} show={prog(t, 38.3, 38.9)} />
        <Sack x={883} y={G - 266} show={prog(t, 39.0, 39.6)} />
      </svg>

      {/* label gabah & beras */}
      <Appear at={34.6} dy={14} style={{ position: "absolute", left: 40, top: G - 365, color: C.deep, width: 230 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.muted }}>Gabah GKG</div>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          {fmtInt(868808 * gabahCount)}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.gold }}>ton</div>
      </Appear>
      <Appear at={37.4} dy={14} style={{ position: "absolute", left: 800, top: G - 480, color: C.deep, width: 250 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.muted }}>Beras siap konsumsi</div>
        <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1, color: C.leaf }}>
          {fmtInt(501670 * berasCount)}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.leaf }}>ton</div>
      </Appear>

      {/* rendemen */}
      <Appear at={39.8} dy={20} style={{ position: "absolute", left: 64, top: 1060, color: C.deep }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: 950, alignItems: "baseline" }}>
          <div style={{ fontSize: 24, letterSpacing: 2, fontWeight: 700, color: C.muted }}>
            RENDEMEN PENGGILINGAN
          </div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>
            {fmtDec(57.74 * bars)}%
          </div>
        </div>
        {[
          { l: "Gabah", w: 1, c: C.gold },
          { l: "Beras", w: 0.5774, c: C.leaf },
        ].map((b) => (
          <div key={b.l} style={{ display: "flex", alignItems: "center", marginTop: 14 }}>
            <div style={{ width: 110, fontSize: 28, fontWeight: 700 }}>{b.l}</div>
            <div style={{ width: BAR, height: 40, borderRadius: 10, background: "rgba(23,56,44,0.08)" }}>
              <div style={{ width: BAR * b.w * bars, height: "100%", borderRadius: 10, background: b.c }} />
            </div>
          </div>
        ))}
      </Appear>
    </div>
  );
};

