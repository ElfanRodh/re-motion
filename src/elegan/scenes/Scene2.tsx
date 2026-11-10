import React from "react";
import { JATIM_MAP_VIEWBOX, JATIM_REGENCY_PATHS } from "../../assets/jatimMapPaths";
import { C, FONT, W, eio, eo, fmtDec, fmtInt, lerp, prog, useT } from "../theme";
import { Appear, Landscape } from "../common";
import { Presenter } from "../Presenter";

const PANEL = { x: 60, y: 300, w: 960, h: 600 };
const K = 1.25; // skala peta (800x460 -> 1000x575)
const OX = 40;
const OY = 300;

const BOJO = JATIM_REGENCY_PATHS.find((r) => r.name === "Bojonegoro")!;
const BOJO_PX = { x: OX + BOJO.cx * K, y: OY + BOJO.cy * K };

export const Scene2: React.FC = () => {
  const t = useT();
  const zoomIn = prog(t, 8.1, 9.7, eio);
  const zoomOut = prog(t, 12.3, 13.7, eio);

  // kamera: tiga keadaan (penuh -> fokus Bojonegoro -> peta provinsi utuh)
  const full = { z: 1, fx: 540, fy: 587, px: 540, py: 645 };
  const focus = { z: 2.15, fx: BOJO_PX.x, fy: BOJO_PX.y, px: 540, py: 645 };
  const whole = { z: 0.8, fx: 540, fy: 587, px: 540, py: 645 };
  const a = zoomOut > 0 ? focus : full;
  const b = zoomOut > 0 ? whole : focus;
  const p = zoomOut > 0 ? zoomOut : zoomIn;
  const cam = {
    z: lerp(a.z, b.z, p),
    fx: lerp(a.fx, b.fx, p),
    fy: lerp(a.fy, b.fy, p),
    px: lerp(a.px, b.px, p),
    py: lerp(a.py, b.py, p),
  };

  const landColor = (name: string) => {
    if (name === "Bojonegoro") return C.terra;
    const toLeaf = prog(t, 12.6, 14.0, eio);
    // transisi sage -> leaf setelah narasi berpindah ke tingkat provinsi
    const mix = (c1: string, c2: string, m: number) => {
      const h = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
      const A = h(c1);
      const B = h(c2);
      return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * m)).join(",")})`;
    };
    return mix(C.sage, C.leaf, toLeaf);
  };

  const mapIn = prog(t, 7.4, 8.4);
  const pulse = (t * 1.1) % 1;

  // bar nasional
  const barP = prog(t, 15.4, 17.0, eo);
  const jatimShare = 10.61 / 57.45;
  const BAR_W = 960;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.skyDay, fontFamily: FONT }}>
      <Landscape dy={330} />

      {/* panel peta */}
      <Appear at={7.3} dy={30} style={{ position: "absolute", left: PANEL.x, top: PANEL.y }}>
        <div
          style={{
            width: PANEL.w,
            height: PANEL.h,
            borderRadius: 30,
            background: C.water,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <svg
            width={W}
            height={1920}
            viewBox={`0 0 ${W} 1920`}
            style={{ position: "absolute", left: -PANEL.x, top: -PANEL.y, opacity: mapIn }}
          >
            <g
              transform={`translate(${cam.px - cam.z * cam.fx} ${cam.py - cam.z * cam.fy}) scale(${cam.z})`}
            >
              <g transform={`translate(${OX} ${OY}) scale(${K})`}>
                {JATIM_REGENCY_PATHS.filter((r) => r.name !== "Bojonegoro").map((r) => (
                  <path
                    key={r.id}
                    d={r.d}
                    fill={landColor(r.name)}
                    stroke={C.water}
                    strokeWidth={0.9 / cam.z + 0.4}
                    strokeLinejoin="round"
                  />
                ))}
                <path
                  d={BOJO.d}
                  fill={C.terra}
                  stroke={C.water}
                  strokeWidth={0.9 / cam.z + 0.4}
                  strokeLinejoin="round"
                />
                {/* penanda lokasi */}
                {t > 9.3 && (
                  <circle
                    cx={BOJO.cx}
                    cy={BOJO.cy}
                    r={(8 + pulse * 20) / (cam.z * 0.7)}
                    fill="none"
                    stroke={C.terra}
                    strokeWidth={2 / cam.z + 0.6}
                    opacity={1 - pulse}
                  />
                )}
              </g>
            </g>
          </svg>

          {/* label panel */}
          <Appear
            at={12.5}
            dy={10}
            style={{ position: "absolute", left: 34, top: 28, color: C.deep }}
          >
            <div style={{ fontSize: 22, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
              PETA PROVINSI
            </div>
            <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>Jawa Timur</div>
          </Appear>
          <Appear
            at={8.0}
            out={12.2}
            dy={10}
            style={{ position: "absolute", left: 34, top: 28, color: C.deep }}
          >
            <div style={{ fontSize: 22, letterSpacing: 3, fontWeight: 700, color: C.muted }}>
              38 KABUPATEN/KOTA
            </div>
            <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>Jawa Timur</div>
          </Appear>
        </div>
      </Appear>

      {/* kartu sorotan Bojonegoro */}
      <Appear
        at={9.6}
        out={12.2}
        dy={30}
        style={{ position: "absolute", left: 60, top: 990, width: 560 }}
      >
        <div style={{ position: "relative" }}>
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
              padding: "26px 34px",
              color: C.deep,
              borderLeft: `10px solid ${C.terra}`,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: C.muted }}>
              PERINGKAT 1 DARI 38 KAB/KOTA
            </div>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
              Bojonegoro
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: C.terra }}>
              868.808 ton GKG
            </div>
          </div>
        </div>
      </Appear>

      <Presenter x={850} y={1335} scale={0.5} pose="point" enterAt={7.6} exitAt={12.3} flip />

      {/* produksi nasional vs Jawa Timur */}
      <Appear at={14.8} dy={30} style={{ position: "absolute", left: 60, top: 930, width: 960 }}>
        <div style={{ color: C.deep, background: C.paper, borderRadius: 26, padding: "30px 30px 28px", height: 376, boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: C.muted }}>
              PRODUKSI GABAH NASIONAL (GKG)
            </div>
            <div style={{ fontSize: 34, fontWeight: 800 }}>57,45 juta ton</div>
          </div>
          <div
            style={{
              marginTop: 62,
              width: BAR_W - 60,
              height: 58,
              borderRadius: 29,
              background: C.sage,
              position: "relative",
            }}
          >
            <div
              style={{
                width: BAR_W * jatimShare * barP,
                height: "100%",
                background: C.gold,
                borderRadius: 29,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -56,
                fontSize: 30,
                fontWeight: 800,
                opacity: prog(t, 16.0, 16.8),
                whiteSpace: "nowrap",
              }}
            >
              Jawa Timur {fmtDec(10.61 * barP)} juta ton ·{" "}
              <span style={{ color: C.terra }}>{fmtDec(jatimShare * 100 * barP, 1)}%</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 34 }}>
            {[
              { a: 18.2, v: "1,85 juta ha", l: "luas panen Jatim" },
              { a: 18.8, v: "6,12 juta ton", l: "produksi beras Jatim" },
            ].map((s) => (
              <Appear key={s.l} at={s.a} dy={14} dur={0.5}>
                <div
                  style={{
                    background: C.sagePale,
                    borderRadius: 20,
                    padding: "14px 26px",
                    minWidth: 300,
                  }}
                >
                  <div style={{ fontSize: 40, fontWeight: 800 }}>{s.v}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: C.muted }}>{s.l}</div>
                </div>
              </Appear>
            ))}
          </div>
        </div>
      </Appear>
    </div>
  );
};

