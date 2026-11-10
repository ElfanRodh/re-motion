import React from "react";
import { C, eo, isSpeaking, prog, useT } from "./theme";

/**
 * Presenter flat-vector: pemandu berbusana adat Jawa Timur (blangkon, beskap putih
 * berkerah tegak, sarung batik gelap). Dibangun murni dari bidang warna solid
 * (basis + bidang bayangan), tanpa outline tebal dan tanpa gradien.
 */
const SKIN = "#E5B08A";
const SKIN_SH = "#CC9370";
const JACKET = "#F7F4EC";
const JACKET_SH = "#DDD7C9";
const SARONG = "#2C2B30";
const SARONG_SH = "#1D1C21";
const BLANGKON = "#5B4637";
const BLANGKON_SH = "#3E3026";
const BATIK = "#C9A66B";
const FRAME = "#6A3F2B";

export type Pose = "present" | "point" | "paddy";

const Arm: React.FC<{
  upper: number;
  fore: number;
  mirror?: boolean;
  holdPaddy?: boolean;
}> = ({ upper, fore, mirror, holdPaddy }) => {
  const UL = 128;
  const FL = 112;
  return (
    <g transform={`rotate(${upper})`}>
      <rect x={-23} y={-8} width={46} height={UL + 22} rx={23} fill={JACKET} />
      <rect
        x={mirror ? -23 : 3}
        y={-8}
        width={20}
        height={UL + 22}
        rx={10}
        fill={JACKET_SH}
      />
      <g transform={`translate(0 ${UL}) rotate(${fore})`}>
        <rect x={-21} y={-14} width={42} height={FL + 10} rx={21} fill={JACKET} />
        <rect
          x={mirror ? -21 : 4}
          y={-14}
          width={17}
          height={FL + 10}
          rx={8}
          fill={JACKET_SH}
        />
        <rect x={-22} y={FL - 22} width={44} height={14} rx={7} fill={JACKET_SH} />
        {/* tangan */}
        <ellipse cx={0} cy={FL + 14} rx={17} ry={22} fill={SKIN} />
        <path
          d={`M${mirror ? -10 : 10},${FL + 6} q${mirror ? -22 : 22},-2 ${
            mirror ? -26 : 26
          },${-18} q${mirror ? 6 : -6},${22} ${mirror ? 14 : -14},${34} z`}
          fill={SKIN}
        />
        {holdPaddy && <PaddyBundle y={FL + 10} />}
      </g>
    </g>
  );
};

const PaddyBundle: React.FC<{ y: number }> = ({ y }) => {
  const stems = [-34, -22, -10, 2, 14, 26];
  return (
    <g transform={`translate(0 ${y})`}>
      {stems.map((a, i) => {
        const len = 190 + (i % 3) * 18;
        const x2 = a * 1.9;
        const y2 = -len;
        return (
          <g key={i}>
            <path
              d={`M0,26 Q${a * 0.6},${-len * 0.45} ${x2},${y2}`}
              stroke="#8FA24A"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            {Array.from({ length: 7 }).map((_, k) => {
              const p = 0.46 + k * 0.085;
              const cx = x2 * (p * p) * 0.9 + a * 0.6 * p * (1 - p) * 1.1;
              const cy = -len * p;
              return (
                <ellipse
                  key={k}
                  cx={cx + (k % 2 ? 6 : -6)}
                  cy={cy}
                  rx={5.5}
                  ry={11}
                  fill={k % 2 ? C.gold : "#E7BC55"}
                  transform={`rotate(${(k % 2 ? 24 : -24) + a * 0.4} ${cx} ${cy})`}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

export const Presenter: React.FC<{
  x: number;
  y: number; // titik pijakan kaki
  scale?: number;
  pose?: Pose;
  flip?: boolean;
  enterAt?: number;
  exitAt?: number;
}> = ({ x, y, scale = 1, pose = "present", flip, enterAt = 0, exitAt }) => {
  const t = useT();
  const sway = Math.sin(t * 1.4);
  const speaking = isSpeaking(t);
  const open = speaking
    ? Math.max(0, Math.sin(t * 15.5) * 0.6 + Math.sin(t * 9.1 + 1) * 0.4) * 0.9
    : 0;
  const blinkPhase = (t * 1000) % 3400;
  const blink = blinkPhase < 130 ? 1 - Math.sin((blinkPhase / 130) * Math.PI) * 0.92 : 1;

  let upperL = 0,
    foreL = 0,
    upperR = 0,
    foreR = 0;
  if (pose === "present") {
    upperL = 34 + sway * 3;
    foreL = 66 + Math.sin(t * 1.7 + 1) * 5;
    upperR = -12;
    foreR = 125;
  } else if (pose === "point") {
    upperL = 64 + sway * 2.5;
    foreL = 10 + Math.sin(t * 1.7) * 3;
    upperR = -8 + sway;
    foreR = 8;
  } else {
    upperL = 26 + sway * 2;
    foreL = 104 + Math.sin(t * 1.6) * 3;
    upperR = -12;
    foreR = 125;
  }

  const inP = prog(t, enterAt, enterAt + 0.8);
  const outP = exitAt !== undefined ? prog(t, exitAt, exitAt + 0.6) : 0;
  const tx = (1 - inP) * (flip ? -160 : 160) + outP * (flip ? -200 : 200);
  const op = Math.min(inP * 1.4, 1) * (1 - outP);
  const breathe = 1 + Math.sin(t * 2.1) * 0.003;

  return (
    <div
      style={{
        position: "absolute",
        left: x - 200 * scale,
        top: y - 1000 * scale,
        width: 400 * scale,
        height: 1000 * scale,
        opacity: op,
        transform: `translateX(${tx}px) scaleX(${flip ? -1 : 1})`,
        transformOrigin: "50% 100%",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 400 1000"
        width={400 * scale}
        height={1000 * scale}
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id="pf-face">
            <ellipse cx={200} cy={152} rx={60} ry={70} />
          </clipPath>
          <clipPath id="pf-torso">
            <path d="M128,268 Q200,250 272,268 Q292,276 290,312 L284,524 Q200,544 116,524 L110,312 Q108,276 128,268 Z" />
          </clipPath>
          <clipPath id="pf-sarong">
            <path d="M120,500 L280,500 L296,944 Q200,964 104,944 Z" />
          </clipPath>
        </defs>

        {/* bayangan lantai */}
        <ellipse cx={200} cy={984} rx={150} ry={13} fill={C.deep} opacity={0.22} />

        <g transform={`translate(0 ${-(breathe - 1) * 400})`}>
          {/* sandal + kaki */}
          <ellipse cx={156} cy={962} rx={32} ry={15} fill={SKIN} />
          <ellipse cx={244} cy={962} rx={32} ry={15} fill={SKIN} />
          <path d="M120,968 Q158,990 198,970 L198,982 Q158,996 120,982 Z" fill="#35292A" />
          <path d="M202,970 Q242,990 280,968 L280,982 Q242,996 202,982 Z" fill="#35292A" />

          {/* sarung batik */}
          <path d="M120,500 L280,500 L296,944 Q200,964 104,944 Z" fill={SARONG} />
          <g clipPath="url(#pf-sarong)">
            <path d="M232,500 L280,500 L296,960 L250,960 Z" fill={SARONG_SH} />
            <path d="M168,520 L184,520 L170,950 L150,950 Z" fill={SARONG_SH} opacity={0.7} />
            <rect x={90} y={874} width={230} height={70} fill="#363238" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d={`M${116 + i * 25},${900} l9,13 l-9,13 l-9,-13 z`}
                fill={BATIK}
                opacity={0.8}
              />
            ))}
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((__, i) => (
                <circle
                  key={`${r}-${i}`}
                  cx={134 + i * 34 + (r % 2) * 17}
                  cy={560 + r * 56}
                  r={3.2}
                  fill={BATIK}
                  opacity={0.45}
                />
              ))
            )}
          </g>

          {/* leher */}
          <rect x={180} y={206} width={40} height={56} rx={14} fill={SKIN} />
          <path d="M180,236 Q200,250 220,236 L220,262 L180,262 Z" fill={SKIN_SH} />

          {/* beskap */}
          <path
            d="M128,268 Q200,250 272,268 Q292,276 290,312 L284,524 Q200,544 116,524 L110,312 Q108,276 128,268 Z"
            fill={JACKET}
          />
          <g clipPath="url(#pf-torso)">
            <rect x={232} y={250} width={80} height={300} fill={JACKET_SH} />
            <rect x={197} y={262} width={4} height={270} fill={JACKET_SH} />
          </g>
          {[304, 348, 392, 436, 480].map((yy) => (
            <circle key={yy} cx={188} cy={yy} r={4.5} fill="#C9C2B0" />
          ))}
          <rect x={124} y={430} width={52} height={7} rx={3.5} fill={JACKET_SH} />
          <rect x={226} y={430} width={52} height={7} rx={3.5} fill={JACKET_SH} />
          {/* kerah tegak */}
          <path d="M166,248 Q200,266 234,248 L232,280 Q200,294 168,280 Z" fill={JACKET} />
          <path d="M200,262 Q216,262 234,248 L232,280 Q216,288 200,288 Z" fill={JACKET_SH} />

          {/* lengan kanan (sisi kiri layar) = lengan gestur */}
          <g transform="translate(130 292)">
            <Arm upper={upperL} fore={foreL} holdPaddy={pose === "paddy"} />
          </g>
          <g transform="translate(270 292)">
            <Arm upper={upperR} fore={foreR} mirror />
          </g>

          {/* kepala (diperbesar agar proporsi ramah & proporsional) */}
          <g transform="translate(200 222) scale(1.24) translate(-200 -222)">
          <ellipse cx={139} cy={160} rx={10} ry={17} fill={SKIN} />
          <ellipse cx={261} cy={160} rx={10} ry={17} fill={SKIN_SH} />
          <ellipse cx={200} cy={152} rx={60} ry={70} fill={SKIN} />
          <g clipPath="url(#pf-face)">
            <ellipse cx={236} cy={160} rx={46} ry={76} fill={SKIN_SH} opacity={0.55} />
            <ellipse cx={200} cy={232} rx={70} ry={26} fill={SKIN_SH} opacity={0.45} />
          </g>
          {/* pipi */}
          <circle cx={166} cy={186} r={11} fill="#E39A7B" opacity={0.35} />
          <circle cx={236} cy={186} r={11} fill="#E39A7B" opacity={0.3} />

          {/* alis */}
          <path d="M158,128 Q176,118 194,128" stroke="#2A2020" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M206,128 Q224,118 242,128" stroke="#2A2020" strokeWidth={6} fill="none" strokeLinecap="round" />

          {/* mata */}
          <g>
            <ellipse cx={177} cy={152} rx={10} ry={11 * blink} fill="#FFFFFF" />
            <ellipse cx={223} cy={152} rx={10} ry={11 * blink} fill="#FFFFFF" />
            <ellipse cx={179} cy={153} rx={6} ry={7 * blink} fill="#4A2D20" />
            <ellipse cx={225} cy={153} rx={6} ry={7 * blink} fill="#4A2D20" />
            <circle cx={181} cy={150} r={1.8 * blink} fill="#FFFFFF" />
            <circle cx={227} cy={150} r={1.8 * blink} fill="#FFFFFF" />
          </g>

          {/* kacamata */}
          <rect x={153} y={134} width={46} height={40} rx={14} fill="none" stroke={FRAME} strokeWidth={5} />
          <rect x={201} y={134} width={46} height={40} rx={14} fill="none" stroke={FRAME} strokeWidth={5} />
          <path d="M199,148 Q200,144 201,148" stroke={FRAME} strokeWidth={5} fill="none" />
          <path d="M153,148 L142,150 M247,148 L258,150" stroke={FRAME} strokeWidth={4} />

          {/* hidung & mulut */}
          <path d="M201,160 Q196,178 205,181" stroke={SKIN_SH} strokeWidth={4} fill="none" strokeLinecap="round" />
          {open > 0.12 ? (
            <g>
              <path
                d={`M184,192 Q200,${192 + open * 4} 216,192 Q200,${200 + open * 15} 184,192 Z`}
                fill="#6B2D2D"
              />
              <path d="M188,193 Q200,196 212,193 L211,197 Q200,199 189,197 Z" fill="#FBF3EA" opacity={0.9} />
            </g>
          ) : (
            <path d="M185,192 Q200,201 215,192" stroke="#8A4A3C" strokeWidth={4} fill="none" strokeLinecap="round" />
          )}

          {/* blangkon */}
          <path
            d="M134,132 C128,70 168,50 200,50 C232,50 272,70 266,132 C240,118 160,118 134,132 Z"
            fill={BLANGKON}
          />
          <path
            d="M200,50 C232,50 272,70 266,132 C250,124 226,119 204,118 C214,98 216,70 200,50 Z"
            fill={BLANGKON_SH}
          />
          <path
            d="M134,132 C160,118 240,118 266,132 L264,148 C240,134 160,134 136,148 Z"
            fill="#463629"
          />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M${146 + i * 13},${136 + Math.sin(i / 1.4) * -3} l4,5 l-4,5 l-4,-5 z`}
              fill={BATIK}
              opacity={0.85}
            />
          ))}
          <path d="M266,140 Q282,150 280,188 Q268,170 262,152 Z" fill="#463629" />
          <path d="M138,142 Q132,160 140,176 Q142,156 148,146 Z" fill="#2A2020" />
          </g>
        </g>
      </svg>
    </div>
  );
};

