import React from "react";
import {
  C,
  CAPTIONS,
  FONT,
  H,
  SCENES,
  W,
  eio,
  eo,
  prog,
  sceneIndexAt,
  useT,
} from "./theme";

/* ---------- Reveal teks bertopeng (naik dari garis) ---------- */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 0.8, children, style }) => {
  const t = useT();
  const p = prog(t, at, at + dur);
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 112}%)`, opacity: p > 0 ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
};

/* ---------- fade + geser halus ---------- */
export const Appear: React.FC<{
  at: number;
  out?: number;
  dur?: number;
  dy?: number;
  dx?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, out, dur = 0.7, dy = 26, dx = 0, style, children }) => {
  const t = useT();
  const p = prog(t, at, at + dur);
  const o = out !== undefined ? 1 - prog(t, out, out + 0.45, eio) : 1;
  return (
    <div
      style={{
        opacity: p * o,
        transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ---------- Lanskap berlapis (bidang datar) ---------- */
export const Landscape: React.FC<{
  dy?: number; // geser bukit turun (scene informasi lebih tenang)
  drift?: number; // parallax horizontal
  paddy?: string;
}> = ({ dy = 0, drift = 0, paddy = C.leaf }) => {
  const rows = Array.from({ length: 6 });
  const nd = dy * 0.55;
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <defs>
        <clipPath id="ls-clip">
          <rect x={0} y={0} width={W} height={1342} />
        </clipPath>
      </defs>
      <g clipPath="url(#ls-clip)">
        <g transform={`translate(${drift * 0.3} ${dy})`}>
          <path
            d="M-60,1010 C140,930 260,960 380,1000 C520,1050 620,930 760,940 C900,950 1000,1000 1160,980 L1160,1400 L-60,1400Z"
            fill={C.sage}
          />
          <path
            d="M-60,1030 C100,990 190,1000 300,1030 C340,1040 380,1030 380,1030 L380,1400 L-60,1400Z"
            fill={C.mid}
            opacity={0.0}
          />
        </g>
        <g transform={`translate(${drift * 0.6} ${dy})`}>
          <path
            d="M-60,1110 C180,1050 340,1100 520,1090 C720,1075 880,1030 1160,1090 L1160,1400 L-60,1400Z"
            fill={C.mid}
          />
        </g>
        <g transform={`translate(${drift} ${nd})`}>
          <path
            d="M-60,1200 C260,1160 520,1220 1160,1170 L1160,1400 L-60,1400Z"
            fill={paddy}
          />
          {rows.map((_, k) => (
            <path
              key={k}
              d={`M-60,${1200 + k * 30} C260,${1160 + k * 30} 520,${1220 + k * 30} 1160,${1170 + k * 30}`}
              stroke={C.forest}
              strokeWidth={5}
              fill="none"
              opacity={0.55}
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

/* ---------- Tanah gelap tempat teks narasi ---------- */
export const Ground: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1342,
        width: W,
        height: H - 1342,
        background: C.deep,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1342,
        width: W,
        height: 10,
        background: C.forest,
      }}
    />
  </>
);

/* ---------- Penanda babak (1-5) di bagian atas ---------- */
export const TopBar: React.FC = () => {
  const t = useT();
  const idx = sceneIndexAt(t);
  const labels = ["Capaian", "Jawa Timur", "Kabupaten", "Beras", "Apresiasi"];
  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        right: 64,
        top: 186,
        fontFamily: FONT,
        color: C.deep,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 12,
          fontSize: 22,
          letterSpacing: 3,
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        <span>Pemkab Bojonegoro</span>
        <span style={{ color: C.muted }}>Data BPS 2026</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {SCENES.map((s, i) => {
          const fill =
            i < idx ? 1 : i === idx ? prog(t, s.start, s.end, (x) => x) : 0;
          return (
            <div key={i} style={{ flex: 1 }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(23,56,44,0.16)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fill * 100}%`,
                    height: "100%",
                    background: i === idx ? C.terra : C.deep,
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  fontWeight: i === idx ? 800 : 600,
                  letterSpacing: 1,
                  color: i === idx ? C.deep : C.muted,
                  opacity: i === idx ? 1 : 0.7,
                }}
              >
                {labels[i]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Takarir sinkron dengan voice-over ---------- */
export const Captions: React.FC = () => {
  const t = useT();
  const chunk = CAPTIONS.find((c) => t >= c.a - 0.05 && t < c.b + 0.2);
  if (!chunk) return null;
  const words = chunk.text.split(" ");
  const totalLen = words.reduce((s, w) => s + w.length + 2, 0);
  let acc = 0;
  const dur = chunk.b - chunk.a;
  const inP = prog(t, chunk.a - 0.05, chunk.a + 0.25);
  const outP = prog(t, chunk.b, chunk.b + 0.18, eio);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 1392,
        height: 170,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * 16}px)`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontSize: 58, lineHeight: 1.18, fontWeight: 800, color: C.paper }}>
        {words.map((w, i) => {
          const ws = chunk.a + (acc / totalLen) * dur;
          acc += w.length + 2;
          const key = w.toLowerCase();
          const hi = chunk.hi?.includes(key);
          const spoken = t >= ws - 0.02;
          return (
            <span
              key={i}
              style={{
                color: hi && spoken ? C.goldPale : C.paper,
                opacity: spoken ? 1 : 0.45,
                marginRight: 14,
                display: "inline-block",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Transisi antar-scene: tirai hijau menyapu layar ---------- */
export const Wipes: React.FC = () => {
  const t = useT();
  const half = 0.4;
  const cuts = SCENES.slice(1).map((s) => s.start);
  return (
    <>
      {cuts.map((c, i) => {
        if (t < c - half || t > c + half) return null;
        const cover = prog(t, c - half, c, eio);
        const reveal = prog(t, c, c + half, eio);
        const x = t < c ? -W + cover * W : reveal * W;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: W,
              height: H,
              background: C.deep,
              zIndex: 50,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -14,
                top: 0,
                width: 14,
                height: H,
                background: C.gold,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

