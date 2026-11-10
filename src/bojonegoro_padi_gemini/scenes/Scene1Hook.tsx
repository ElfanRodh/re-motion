import React from "react";
import { C, FONT, W, eio, eo, fmtInt, prog } from "../theme";
import { Appear, Landscape, Reveal, useT } from "../common";

const Laurel: React.FC<{ side: 1 | -1 }> = ({ side }) => (
  <g transform={`scale(${side} 1)`}>
    {Array.from({ length: 8 }).map((_, i) => {
      const phi = 0.42 + i * 0.33;
      const r = 126;
      const cx = Math.sin(phi) * r;
      const cy = -Math.cos(phi) * r;
      return (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={10}
          ry={24}
          fill={C.forest}
          transform={`rotate(${(phi * 180) / Math.PI + 12} ${cx} ${cy})`}
        />
      );
    })}
  </g>
);

export const Scene1Hook: React.FC = () => {
  const t = useT();
  const sun = prog(t, 0.0, 3.2, eio);
  const medal = prog(t, 0.9, 1.7);
  const count = prog(t, 3.1, 4.6, eo);
  const gabah = Math.round(868808 * count);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.skyDawn,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* Matahari Terbit Flat Vector di Tengah */}
      <svg
        width={W}
        height={1920}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        <circle
          cx={540}
          cy={1020 + (1 - sun) * 220}
          r={360}
          fill="#F7D895"
        />
        <circle
          cx={540}
          cy={1020 + (1 - sun) * 220}
          r={260}
          fill="#F2C06A"
        />
      </svg>

      <Landscape drift={Math.sin(t * 0.3) * 4} />

      {/* Judul Besar Utama */}
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 260,
          color: C.deep,
          textAlign: "center",
          zIndex: 40,
        }}
      >
        <Reveal at={0.15} dur={0.7}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 10,
              fontWeight: 700,
              color: C.forest,
              textTransform: "uppercase",
            }}
          >
            Bumi Angling Darma
          </div>
        </Reveal>

        <div
          style={{
            height: 6,
            width: 120 * prog(t, 0.4, 1.0),
            background: C.terra,
            margin: "18px auto 14px",
            borderRadius: 3,
          }}
        />

        <Reveal at={0.5} dur={0.9}>
          <div
            style={{
              fontSize: 168,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -4,
            }}
          >
            Bojonegoro
          </div>
        </Reveal>

        <Reveal at={1.0} dur={0.9}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.15,
              fontWeight: 700,
              color: C.terra,
              marginTop: 4,
            }}
          >
            Juara 1 Padi Jawa Timur
          </div>
        </Reveal>
      </div>

      {/* Medali Peringkat #1 Megah di Tengah (Fase Awal 0.8s - 2.8s) */}
      <div
        style={{
          position: "absolute",
          left: 540 - 160,
          top: 820 - 160,
          width: 320,
          height: 320,
          transform: `scale(${0.7 + medal * 0.3})`,
          opacity: medal * (1 - prog(t, 2.9, 3.4, eio)),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 45,
        }}
      >
        <svg width={320} height={320} viewBox="-160 -160 320 320">
          <g transform="translate(0 6)">
            <Laurel side={1} />
            <Laurel side={-1} />
          </g>
          <circle r={96} fill={C.deep} />
          <circle r={82} fill={C.gold} />
          <path
            d="M0,-82 A82,82 0 0 1 0,82 A68,82 0 0 0 0,-82Z"
            fill="#C48E2C"
          />
          <text
            x={0}
            y={40}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={800}
            fontSize={122}
            fill={C.deep}
          >
            1
          </text>
        </svg>
      </div>

      {/* Kartu Infografis Data BPS (Fase 2.9s - 7.3s) - Lebar Penuh & Simetris */}
      <Appear
        at={2.9}
        dy={40}
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 780,
          zIndex: 45,
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 16,
              right: -14,
              bottom: -16,
              background: C.deep,
              opacity: 0.12,
              borderRadius: 34,
            }}
          />
          <div
            style={{
              position: "relative",
              background: C.paper,
              borderRadius: 34,
              padding: "44px 48px 46px",
              color: C.deep,
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: C.sagePale,
                padding: "8px 24px",
                borderRadius: 20,
                fontSize: 22,
                letterSpacing: 3,
                fontWeight: 700,
                color: C.deep,
              }}
            >
              BERITA RESMI STATISTIK · 2 NOVEMBER 2026
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                gap: 16,
                marginTop: 24,
              }}
            >
              <span
                style={{
                  fontSize: 132,
                  fontWeight: 800,
                  letterSpacing: -3,
                  lineHeight: 0.95,
                }}
              >
                {fmtInt(gabah)}
              </span>
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: C.terra,
                }}
              >
                ton
              </span>
            </div>

            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: C.muted,
                marginTop: 14,
              }}
            >
              Produksi Gabah Kering Giling (GKG) Kabupaten Bojonegoro
            </div>

            <div
              style={{
                height: 3,
                background: "rgba(23, 56, 44, 0.12)",
                margin: "32px 0 28px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: 20,
              }}
            >
              {[
                { a: 4.6, v: "159,19 ribu ha", l: "Luas Panen Padi" },
                { a: 5.1, v: "501.670 ton", l: "Beras Konsumsi" },
                { a: 5.6, v: "8,19%", l: "Kontribusi Jatim" },
              ].map((s) => (
                <Appear key={s.l} at={s.a} dy={16} dur={0.5}>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: C.deep,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: C.muted,
                      marginTop: 4,
                    }}
                  >
                    {s.l}
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </div>
      </Appear>
    </div>
  );
};
