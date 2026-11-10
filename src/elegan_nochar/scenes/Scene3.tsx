import React from "react";
import { C, FONT, W, H, eio, eo, fmtDec, fmtInt, prog, useT } from "../theme";
import { Appear, Landscape } from "../common";

/* ---------- Combine harvester (bidang datar flat vector) ---------- */
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
    <svg width={700} height={420} viewBox="0 0 640 380" style={{ overflow: "visible" }}>
      {/* auger pipa gabah */}
      <path d="M96,122 L30,52" stroke={C.forest} strokeWidth={16} strokeLinecap="round" />
      <path d="M30,52 L12,46" stroke={C.deep} strokeWidth={10} strokeLinecap="round" />
      {/* tangki gabah */}
      <path d="M70,120 L96,62 L318,62 L338,120 Z" fill={C.leaf} />
      <path d="M96,62 L318,62 L322,76 L92,76 Z" fill={C.forest} />
      {/* badan utama */}
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
      {/* feeder + pemotong gabah */}
      <path d="M474,148 L520,138 L546,250 L474,250 Z" fill={C.forest} />
      <path d="M520,206 L618,206 L632,298 L520,298 Z" fill={C.gold} />
      <path d="M520,206 L618,206 L621,226 L520,226 Z" fill="#B88626" />
      {/* reel putar */}
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

/* ---------- Beat A: Kontribusi 8,19% ---------- */
const ShareBeat: React.FC = () => {
  const t = useT();
  const ring = prog(t, 21.6, 23.4, eo);
  const R = 180;
  const circ = 2 * Math.PI * R;
  const share = 0.0819;

  return (
    <Appear at={21.2} out={24.1} dy={20} style={{ position: "absolute", left: 0, top: 0, width: W, height: H }}>
      <div style={{ position: "absolute", left: 64, right: 64, top: 260, color: C.deep, textAlign: "center" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, fontWeight: 700, color: C.muted }}>
          PENOPANG TERBESAR LUMBUNG JATIM
        </div>
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, marginTop: 8 }}>
          Kabupaten <span style={{ color: C.terra }}>Bojonegoro</span>
        </div>
      </div>

      {/* Donut Chart Berpusat di Tengah */}
      <div style={{ position: "absolute", left: (W - 480) / 2, top: 540, width: 480, height: 480 }}>
        <svg width={480} height={480} viewBox="-240 -240 480 480">
          <circle r={R} fill="none" stroke={C.sage} strokeWidth={52} />
          <circle
            r={R}
            fill="none"
            stroke={C.terra}
            strokeWidth={52}
            strokeDasharray={`${circ * share * ring} ${circ}`}
            transform="rotate(-90)"
            strokeLinecap="round"
          />
          <text x={0} y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={104} fill={C.deep}>
            {fmtDec(8.19 * ring)}%
          </text>
          <text x={0} y={72} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={26} fill={C.muted}>
            Produksi Padi Jawa Timur
          </text>
        </svg>
      </div>

      <div style={{ position: "absolute", left: 80, right: 80, top: 1060, textAlign: "center" }}>
        <div style={{ display: "inline-block", background: C.paper, borderRadius: 28, padding: "24px 44px", boxShadow: "0 18px 40px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: C.deep }}>868.808 Ton Gabah Kering Giling</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: C.muted, marginTop: 6 }}>Menopang kedaulatan pangan regional dan nasional</div>
        </div>
      </div>
    </Appear>
  );
};

/* ---------- Beat B: Panen Harvester ---------- */
const HarvestBeat: React.FC = () => {
  const t = useT();
  const hx = -60 + prog(t, 24.0, 27.3, (x) => x) * 680;
  const headerX = hx + 550;
  const spin = t * 320;
  const stalks = Array.from({ length: 58 });
  const baseY = 1140;
  const count = prog(t, 24.5, 26.3, eo);

  return (
    <>
      <Appear at={24.3} out={27.3} dy={20} style={{ position: "absolute", left: 64, right: 64, top: 260, textAlign: "center" }}>
        <div style={{ color: C.deep }}>
          <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
            LUAS PANEN KABUPATEN BOJONEGORO
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 18, marginTop: 6 }}>
            <span style={{ fontSize: 144, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}>
              {fmtDec(159.19 * count)}
            </span>
            <span style={{ fontSize: 44, fontWeight: 700, color: C.terra }}>ribu hektare</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.muted, marginTop: 8 }}>
            Rata-rata produktivitas mencapai 5,46 ton GKG per hektare
          </div>
        </div>
      </Appear>

      <Appear at={24.3} out={27.3} dy={0} style={{ position: "absolute", left: 0, top: 0, width: W, height: H }}>
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
          <rect x={0} y={baseY - 4} width={W} height={H - baseY + 4} fill="#B9893B" />
          <rect x={0} y={baseY + 70} width={W} height={H - baseY - 70} fill="#A87C33" />
          {[0, 1].map((row) =>
            stalks.map((_, i) => {
              const x = i * 20 + row * 10;
              const by = baseY + row * 62 + 20;
              const cut = x < headerX;
              const h = cut ? 18 : 160 + (i % 3) * 12;
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

        {/* Harvester bergerak */}
        <div style={{ position: "absolute", left: hx, top: baseY - 330 + Math.sin(t * 14) * 1.8 }}>
          <Harvester spin={spin} />
        </div>

        {/* Partikel sekam gabah berhamburan */}
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const ph = ((t * 1.2 + i / 16) % 1);
            return (
              <circle
                key={i}
                cx={headerX + 40 - ph * 160 + Math.sin(i) * 20}
                cy={baseY - 90 - ph * 80 + (i % 3) * 16}
                r={3.5}
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

/* ---------- Beat C: Klasemen 3 Besar Jawa Timur ---------- */
const RankBeat: React.FC = () => {
  const t = useT();
  const rows = [
    { n: 1, name: "Bojonegoro", v: 868808, at: 29.0, color: C.terra, label: "JUARA 1 JAWA TIMUR" },
    { n: 2, name: "Lamongan", v: 852192, at: 28.2, color: C.sage, label: "Peringkat 2" },
    { n: 3, name: "Ngawi", v: 768307, at: 27.6, color: C.sage, label: "Peringkat 3" },
  ];
  const BAR = 560;

  return (
    <Appear at={27.5} dy={24} style={{ position: "absolute", left: 0, top: 0, width: W, height: H }}>
      <div style={{ position: "absolute", left: 64, right: 64, top: 260, color: C.deep, textAlign: "center" }}>
        <div style={{ fontSize: 26, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
          KLASEMEN PRODUKSI GABAH JAWA TIMUR 2026
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, marginTop: 4 }}>
          Tiga Besar Kabupaten Lumbung Padi
        </div>
      </div>

      <div style={{ position: "absolute", left: 60, right: 60, top: 410 }}>
        {rows.map((r, i) => {
          const p = prog(t, r.at, r.at + 1.4, eo);
          return (
            <div
              key={r.n}
              style={{
                marginBottom: 26,
                background: C.paper,
                borderRadius: 28,
                padding: "26px 36px",
                boxShadow: "0 14px 35px rgba(0,0,0,0.05)",
                borderLeft: r.n === 1 ? `12px solid ${C.terra}` : `12px solid ${C.sage}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <span style={{ fontSize: 50, fontWeight: 800, color: r.n === 1 ? C.terra : C.muted }}>
                    #{r.n}
                  </span>
                  <span style={{ fontSize: 46, fontWeight: 800, color: C.deep }}>{r.name}</span>
                </div>
                <div style={{ fontSize: 44, fontWeight: 800, color: r.n === 1 ? C.terra : C.deep }}>
                  {fmtInt(r.v * p)} <span style={{ fontSize: 24, fontWeight: 600, color: C.muted }}>ton GKG</span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div style={{ width: "100%", height: 32, borderRadius: 16, background: "rgba(23,56,44,0.08)", marginTop: 18 }}>
                <div
                  style={{
                    width: `${((r.v / 868808) * p) * 100}%`,
                    height: "100%",
                    borderRadius: 16,
                    background: r.color,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Keunggulan Margin */}
        <Appear at={31.2} dy={14} style={{ textAlign: "center", marginTop: 20 }}>
          <div
            style={{
              display: "inline-block",
              background: C.deep,
              color: C.paper,
              borderRadius: 22,
              padding: "16px 36px",
              fontSize: 30,
              fontWeight: 700,
              boxShadow: "0 12px 30px rgba(23,56,44,0.25)",
            }}
          >
            Bojonegoro Unggul <b style={{ color: C.goldPale }}>+16.616 ton</b> dari Kabupaten Lamongan
          </div>
        </Appear>
      </div>
    </Appear>
  );
};

export const Scene3: React.FC = () => {
  const t = useT();
  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyDay, fontFamily: FONT }}>
      <Landscape dy={190} drift={Math.sin(t * 0.3) * 3} />
      <ShareBeat />
      <HarvestBeat />
      <RankBeat />
    </div>
  );
};
