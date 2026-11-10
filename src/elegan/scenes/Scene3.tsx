import React from "react";
import { JATIM_REGENCY_PATHS } from "../../assets/jatimMapPaths";
import { C, FONT, W, eio, eo, fmtDec, fmtInt, prog, useT } from "../theme";
import { Appear, Landscape } from "../common";
import { Presenter } from "../Presenter";

/* ---------- Combine harvester (bidang datar) ---------- */
const Harvester: React.FC<{ spin: number }> = ({ spin }) => {
  const Wheel: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.ink} />
      <circle cx={cx} cy={cy} r={r * 0.55} fill={C.sage} />
      <g transform={`rotate(${spin} ${cx} ${cy})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <rect
            key={a}
            x={cx - 3}
            y={cy - r * 0.5}
            width={6}
            height={r * 0.5}
            fill={C.forest}
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r * 0.14} fill={C.ink} />
    </g>
  );
  return (
    <svg width={640} height={380} viewBox="0 0 640 380" style={{ overflow: "visible" }}>
      {/* auger */}
      <path d="M96,122 L30,52" stroke={C.forest} strokeWidth={16} strokeLinecap="round" />
      <path d="M30,52 L12,46" stroke={C.deep} strokeWidth={10} strokeLinecap="round" />
      {/* tangki gabah */}
      <path d="M70,120 L96,62 L318,62 L338,120 Z" fill={C.leaf} />
      <path d="M96,62 L318,62 L322,76 L92,76 Z" fill={C.forest} />
      {/* badan */}
      <rect x={44} y={118} width={430} height={128} rx={22} fill={C.leaf} />
      <path d="M44,208 L474,208 L474,224 Q474,246 452,246 L66,246 Q44,246 44,224 Z" fill={C.forest} />
      <rect x={70} y={146} width={210} height={14} rx={7} fill={C.forest} opacity={0.7} />
      <rect x={70} y={172} width={150} height={14} rx={7} fill={C.forest} opacity={0.7} />
      {/* kabin */}
      <path d="M340,118 L352,56 L476,56 L486,118 Z" fill={C.deep} />
      <path d="M356,112 L364,68 L470,68 L478,112 Z" fill="#CFE3E0" />
      <path d="M420,68 L470,68 L478,112 L400,112 Z" fill="#B7D0CC" />
      <rect x={338} y={44} width={158} height={16} rx={8} fill={C.deep} />
      {/* knalpot */}
      <rect x={300} y={38} width={10} height={36} rx={4} fill={C.ink} />
      {/* feeder + header */}
      <path d="M474,148 L520,138 L546,250 L474,250 Z" fill={C.forest} />
      <path d="M520,206 L618,206 L632,298 L520,298 Z" fill={C.gold} />
      <path d="M520,206 L618,206 L621,226 L520,226 Z" fill="#B88626" />
      {/* reel */}
      <g transform={`rotate(${spin * 0.5} 580 196)`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x={576} y={146} width={8} height={50} rx={4} fill={C.terra} transform={`rotate(${a} 580 196)`} />
        ))}
        <circle cx={580} cy={196} r={9} fill={C.deep} />
      </g>
      <Wheel cx={400} cy={296} r={60} />
      <Wheel cx={118} cy={312} r={42} />
    </svg>
  );
};

/* ---------- Beat B: panen ---------- */
const HarvestBeat: React.FC = () => {
  const t = useT();
  const hx = -80 + prog(t, 24.0, 27.3, (x) => x) * 640; // posisi kiri harvester
  const headerX = hx + 520;
  const spin = t * 320;
  const stalks = Array.from({ length: 52 });
  const baseY = 1020;
  const count = prog(t, 24.5, 26.3, eo);
  return (
    <>
      <Appear at={24.3} out={27.3} dy={20} style={{ position: "absolute", left: 64, top: 330 }}>
        <div style={{ color: C.deep }}>
          <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
            LUAS PANEN BOJONEGORO
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}>
              {fmtDec(159.19 * count)}
            </span>
            <span style={{ fontSize: 46, fontWeight: 700, color: C.terra }}>ribu hektare</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.muted }}>
            Rata-rata produktivitas 5,46 ton GKG per hektare
          </div>
        </div>
      </Appear>

      <Appear at={24.3} out={27.3} dy={0} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1342 }}>
        {/* sawah */}
        <svg width={W} height={1342} style={{ position: "absolute", left: 0, top: 0 }}>
          <rect x={0} y={baseY - 4} width={W} height={1342 - baseY + 4} fill="#B9893B" />
          <rect x={0} y={baseY + 70} width={W} height={1342 - baseY - 70} fill="#A87C33" />
          {[0, 1].map((row) =>
            stalks.map((_, i) => {
              const x = i * 22 + row * 11;
              const by = baseY + row * 62 + 18;
              const cut = x < headerX - row * 0;
              const h = cut ? 18 : 150 + (i % 3) * 10;
              const sway = cut ? 0 : Math.sin(t * 2 + i * 0.7) * 4;
              return (
                <g key={`${row}-${i}`}>
                  <path
                    d={`M${x},${by} Q${x + sway * 0.4},${by - h * 0.6} ${x + sway + 8},${by - h}`}
                    stroke={cut ? "#8A6A2B" : "#C79A3E"}
                    strokeWidth={cut ? 5 : 4}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {!cut && (
                    <ellipse
                      cx={x + sway + 9}
                      cy={by - h - 4}
                      rx={6}
                      ry={16}
                      fill={row ? "#E1B652" : C.goldPale}
                      transform={`rotate(14 ${x + sway + 9} ${by - h})`}
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>
        {/* harvester */}
        <div style={{ position: "absolute", left: hx, top: baseY - 335 + Math.sin(t * 14) * 1.6 }}>
          <Harvester spin={spin} />
        </div>
        {/* sekam */}
        <svg width={W} height={1342} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
          {Array.from({ length: 14 }).map((_, i) => {
            const ph = ((t * 1.2 + i / 14) % 1);
            return (
              <circle
                key={i}
                cx={headerX + 40 - ph * 150 + Math.sin(i) * 20}
                cy={baseY - 100 - ph * 70 + (i % 3) * 14}
                r={3.2}
                fill={C.goldPale}
                opacity={1 - ph}
              />
            );
          })}
        </svg>
      </Appear>
    </>
  );
};

/* ---------- Beat A: kontribusi 8,19% ---------- */
const ShareBeat: React.FC = () => {
  const t = useT();
  const ring = prog(t, 21.6, 23.4, eo);
  const R = 150;
  const circ = 2 * Math.PI * R;
  const share = 0.0819;
  return (
    <Appear at={21.2} out={24.1} dy={20} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1342 }}>
      <div style={{ position: "absolute", left: 64, top: 330, color: C.deep }}>
        <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
          PENOPANG TERBESAR
        </div>
        <div style={{ fontSize: 118, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
          Kabupaten
          <br />
          <span style={{ color: C.terra }}>Bojonegoro</span>
        </div>
      </div>
      <svg width={420} height={420} viewBox="-210 -210 420 420" style={{ position: "absolute", left: 60, top: 740 }}>
        <circle r={R} fill="none" stroke={C.sage} strokeWidth={46} />
        <circle
          r={R}
          fill="none"
          stroke={C.terra}
          strokeWidth={46}
          strokeDasharray={`${circ * share * ring} ${circ}`}
          transform="rotate(-90)"
          strokeLinecap="butt"
        />
        <text x={0} y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={88} fill={C.deep}>
          {fmtDec(8.19 * ring)}%
        </text>
        <text x={0} y={62} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={21} fill={C.muted}>
          produksi padi Jatim
        </text>
      </svg>
    </Appear>
  );
};

/* ---------- Beat C: klasemen ---------- */
const RankBeat: React.FC = () => {
  const t = useT();
  const rows = [
    { n: 1, name: "Bojonegoro", v: 868808, at: 29.0, color: C.terra },
    { n: 2, name: "Lamongan", v: 852192, at: 28.2, color: C.sage },
    { n: 3, name: "Ngawi", v: 768307, at: 27.6, color: C.sage },
  ];
  const BAR = 620;
  return (
    <Appear at={27.5} dy={24} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1342 }}>
      <div style={{ position: "absolute", left: 64, top: 330, color: C.deep }}>
        <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
          KLASEMEN PRODUKSI GABAH JATIM 2026
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: -1 }}>Tiga besar kabupaten</div>
      </div>
      {rows.map((r, i) => {
        const p = prog(t, r.at, r.at + 1.4, eo);
        const top = 510 + i * 195;
        return (
          <div key={r.n} style={{ position: "absolute", left: 64, top, width: 950, color: C.deep }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, opacity: prog(t, r.at, r.at + 0.4) }}>
              <span style={{ fontSize: 54, fontWeight: 800, color: r.n === 1 ? C.terra : C.muted }}>{r.n}</span>
              <span style={{ fontSize: 44, fontWeight: 800 }}>{r.name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
              <div style={{ width: BAR, height: 74, borderRadius: 14, background: "rgba(23,56,44,0.08)" }}>
                <div
                  style={{
                    width: (BAR * r.v) / 868808 * p,
                    height: "100%",
                    borderRadius: 14,
                    background: r.color,
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: 22,
                  fontSize: 44,
                  fontWeight: 800,
                  opacity: p > 0.2 ? 1 : 0,
                  color: r.n === 1 ? C.terra : C.deep,
                }}
              >
                {fmtInt(r.v * p)}
              </div>
            </div>
          </div>
        );
      })}
      <Appear at={31.4} dy={14} style={{ position: "absolute", left: 64, top: 1105, color: C.deep }}>
        <div
          style={{
            display: "inline-block",
            background: C.paper,
            borderRadius: 18,
            padding: "14px 28px",
            fontSize: 30,
            fontWeight: 700,
            borderLeft: `8px solid ${C.terra}`,
          }}
        >
          Unggul <b style={{ color: C.terra }}>16.616 ton</b> dari Lamongan
        </div>
      </Appear>
    </Appear>
  );
};

export const Scene3: React.FC = () => {
  const t = useT();
  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyDay, fontFamily: FONT }}>
      <Landscape dy={170} drift={Math.sin(t * 0.3) * 3} />
      <ShareBeat />
      <HarvestBeat />
      <RankBeat />
      <Presenter x={860} y={1335} scale={0.56} pose="present" enterAt={21.3} exitAt={23.8} flip />
    </div>
  );
};

