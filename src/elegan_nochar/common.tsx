import React from "react";
import { spring } from "remotion";
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
  FPS,
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

/* ---------- Lanskap berlapis layar penuh (bidang datar tanpa potongan kaku) ---------- */
export const Landscape: React.FC<{
  dy?: number; // pergeseran vertikal
  drift?: number; // parallax horizontal
  paddy?: string;
  fullHeight?: boolean;
}> = ({ dy = 0, drift = 0, paddy = C.leaf, fullHeight = true }) => {
  const rows = Array.from({ length: 8 });
  const nd = dy * 0.55;
  const clipH = fullHeight ? H : 1400;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
    >
      <defs>
        <clipPath id="ls-clip-full">
          <rect x={0} y={0} width={W} height={clipH} />
        </clipPath>
      </defs>
      <g clipPath="url(#ls-clip-full)">
        {/* Layer Bukit Jauh */}
        <g transform={`translate(${drift * 0.25} ${dy})`}>
          <path
            d="M-60,1150 C140,1050 260,1080 420,1130 C580,1180 720,1050 880,1070 C1020,1080 1100,1140 1200,1120 L1200,1950 L-60,1950Z"
            fill={C.sage}
          />
        </g>
        {/* Layer Bukit Menengah */}
        <g transform={`translate(${drift * 0.55} ${dy})`}>
          <path
            d="M-60,1260 C180,1190 360,1250 540,1230 C740,1210 900,1160 1200,1220 L1200,1950 L-60,1950Z"
            fill={C.mid}
          />
        </g>
        {/* Layer Hamparan Sawah */}
        <g transform={`translate(${drift} ${nd})`}>
          <path
            d="M-60,1360 C260,1320 540,1380 1200,1330 L1200,1950 L-60,1950Z"
            fill={paddy}
          />
          {rows.map((_, k) => (
            <path
              key={k}
              d={`M-60,${1360 + k * 45} C260,${1320 + k * 45} 540,${1380 + k * 45} 1200,${1330 + k * 45}`}
              stroke={C.forest}
              strokeWidth={5}
              fill="none"
              opacity={0.5}
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

/* ---------- Captions di Bagian Bawah Video dengan Animasi Pop-Up / Wow Per Kata ---------- */
export const PopUpBottomCaptions: React.FC = () => {
  const t = useT();
  const chunk = CAPTIONS.find((c) => t >= c.a - 0.05 && t < c.b + 0.22);
  if (!chunk) return null;

  const words = chunk.text.split(" ");
  const totalChars = words.reduce((sum, w) => sum + w.length + 1, 0);
  let charAcc = 0;
  const dur = chunk.b - chunk.a;

  // Transisi masuk / keluar halus satu frasa
  const inP = prog(t, chunk.a - 0.05, chunk.a + 0.2);
  const outP = prog(t, chunk.b, chunk.b + 0.18, eio);

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        bottom: 140, // Safe Zone bawah Instagram Reels / TikTok
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 90,
        pointerEvents: "none",
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * 16}px)`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          background: "transparent", // TANPA border dan TANPA kotak latar
          border: "none",
          padding: "10px 16px",
        }}
      >
        <div
          style={{
            fontSize: 58,
            lineHeight: 1.25,
            fontWeight: 900,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          {words.map((w, i) => {
            const wordStart = chunk.a + (charAcc / totalChars) * dur;
            charAcc += w.length + 1;
            const wordEnd = chunk.a + (charAcc / totalChars) * dur;

            const isCurrent = t >= wordStart - 0.02 && t < wordEnd + 0.02;
            const isSpoken = t >= wordEnd + 0.02;

            const key = w.toLowerCase().replace(/[^a-z0-9]/g, "");
            const isHighlight = chunk.hi?.some(
              (h) => h.toLowerCase().replace(/[^a-z0-9]/g, "") === key
            );

            // Pop-Up Spring Animation untuk kata yang sedang aktif ("WOW" effect)
            const wordFrame = Math.max(0, (t - (wordStart - 0.02)) * FPS);
            const popSpring = spring({
              frame: wordFrame,
              fps: FPS,
              config: { damping: 9, stiffness: 240, mass: 0.5 },
            });

            // Scale membal: meledak dari 0.82 ke 1.28 lalu stabil di ~1.08 saat aktif
            let scale = 1.0;
            let translateY = 0;
            let color = "#FFFFFF";
            let opacity = 0.5;
            let textShadow = "0 3px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)";

            if (isCurrent) {
              scale = 0.82 + popSpring * 0.42; // Pop-Up wow bounce
              translateY = -8 * (1 - Math.abs(popSpring - 1));
              color = isHighlight ? "#FF5533" : "#FACC15"; // Kuning emas memukau / Coral menyala
              opacity = 1.0;
              textShadow = `
                0 0 24px ${isHighlight ? "rgba(255, 85, 51, 0.7)" : "rgba(250, 204, 21, 0.7)"},
                0 4px 16px rgba(0,0,0,0.9),
                0 2px 4px rgba(0,0,0,0.95),
                -2px -2px 0 rgba(0,0,0,0.8),
                2px -2px 0 rgba(0,0,0,0.8),
                -2px 2px 0 rgba(0,0,0,0.8),
                2px 2px 0 rgba(0,0,0,0.8)
              `;
            } else if (isSpoken) {
              scale = 1.0;
              color = "#FFFFFF";
              opacity = 0.95;
              textShadow = `
                0 4px 14px rgba(0,0,0,0.85),
                0 2px 4px rgba(0,0,0,0.95),
                -1.5px -1.5px 0 rgba(0,0,0,0.7),
                1.5px -1.5px 0 rgba(0,0,0,0.7),
                -1.5px 1.5px 0 rgba(0,0,0,0.7),
                1.5px 1.5px 0 rgba(0,0,0,0.7)
              `;
            } else {
              // Kata yang belum diucapkan
              scale = 0.96;
              color = "#E2E8F0";
              opacity = 0.45;
              textShadow = "0 3px 10px rgba(0,0,0,0.6)";
            }

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transformOrigin: "center bottom",
                  color,
                  opacity,
                  marginRight: 16,
                  textShadow,
                  willChange: "transform, color",
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
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
              zIndex: 70,
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
