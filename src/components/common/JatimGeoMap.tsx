import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { JATIM_MAP_VIEWBOX, JATIM_REGENCY_PATHS } from "../../assets/jatimMapPaths";

interface JatimGeoMapProps {
  highlightTop3?: boolean;
  showBojonegoroCallout?: boolean;
  compact?: boolean;
}

export const JatimGeoMap: React.FC<JatimGeoMapProps> = ({
  highlightTop3 = true,
  showBojonegoroCallout = true,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bojonegoro = JATIM_REGENCY_PATHS.find((r) => r.name === "Bojonegoro");
  const lamongan = JATIM_REGENCY_PATHS.find((r) => r.name === "Lamongan");
  const ngawi = JATIM_REGENCY_PATHS.find((r) => r.name === "Ngawi");

  const bjnX = bojonegoro?.cx ?? 209.5;
  const bjnY = bojonegoro?.cy ?? 133;

  const calloutScale = interpolate(frame, [0.25 * fps, 0.65 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Continuous gentle map float on every frame
  const floatY = Math.sin(frame * 0.06) * 3.5;

  // Continuous beacon ring animation (kelip-kelip)
  const pulse1 = (frame % 36) / 36;
  const pulse2 = ((frame + 18) % 36) / 36;
  const bjnBlink = 0.5 + 0.5 * Math.sin(frame * 0.22);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
        <svg
          width="100%"
          height="100%"
          viewBox={JATIM_MAP_VIEWBOX}
          style={{
            opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 0.45 * fps], [0.95, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: `0px ${floatY}px`,
            overflow: "visible",
          }}
        >
          {/* 1. All 38 Kabupaten/Kota Polygons with Subtle Sequential Shimmer */}
          {JATIM_REGENCY_PATHS.map((regency, idx) => {
            const isBojonegoro = regency.name === "Bojonegoro";
            const isLamongan = highlightTop3 && regency.name === "Lamongan";
            const isNgawi = highlightTop3 && regency.name === "Ngawi";

            // Subtle wave shimmer across the 38 regencies
            const wave = Math.sin(frame * 0.08 + idx * 0.55);
            let fill = wave > 0.55 ? "#0088CC" : wave < -0.55 ? "#006BA6" : "#0077B6";
            const stroke = "#004E7C";
            const strokeWidth = 1.4;

            if (isBojonegoro) {
              fill = bjnBlink > 0.5 ? "#FFD100" : "#FFE033";
            } else if (isLamongan) {
              fill = "#48CAE4";
            } else if (isNgawi) {
              fill = "#90E0EF";
            }

            return (
              <path
                key={regency.id}
                d={regency.d}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            );
          })}

          {/* 2. Bojonegoro Polygon Highlighted on Top */}
          {bojonegoro && (
            <path
              d={bojonegoro.d}
              fill={bjnBlink > 0.5 ? "#FFD100" : "#FFE347"}
              stroke="#FFFFFF"
              strokeWidth={2.4}
              strokeLinejoin="round"
            />
          )}

          {/* 3. Animated Dashed Connection Line Between Top 3 Regencies */}
          {highlightTop3 && lamongan && ngawi && (
            <polyline
              points={`${ngawi.cx},${ngawi.cy} ${bjnX},${bjnY} ${lamongan.cx},${lamongan.cy}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeDashoffset={-frame * 1.2}
              opacity={0.75}
            />
          )}

          {/* 4. Twinkling Beacon Markers on #2 Lamongan & #3 Ngawi */}
          {highlightTop3 && lamongan && (
            <g transform={`translate(${lamongan.cx}, ${lamongan.cy})`}>
              <circle
                r={interpolate(pulse2, [0, 1], [5, 18])}
                fill="none"
                stroke="#48CAE4"
                strokeWidth="2"
                opacity={interpolate(pulse2, [0, 1], [0.85, 0])}
              />
              <circle r="5" fill="#004670" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {highlightTop3 && ngawi && (
            <g transform={`translate(${ngawi.cx}, ${ngawi.cy})`}>
              <circle
                r={interpolate(pulse1, [0, 1], [5, 18])}
                fill="none"
                stroke="#90E0EF"
                strokeWidth="2"
                opacity={interpolate(pulse1, [0, 1], [0.85, 0])}
              />
              <circle r="5" fill="#004670" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {/* 5. Twinkling Beacon & Flat Callout for #1 Bojonegoro */}
          {showBojonegoroCallout && (
            <g>
              <circle
                cx={bjnX}
                cy={bjnY}
                r={interpolate(pulse1, [0, 1], [6, 28])}
                fill="none"
                stroke="#FFD100"
                strokeWidth="2.8"
                opacity={interpolate(pulse1, [0, 1], [0.95, 0])}
              />
              <circle
                cx={bjnX}
                cy={bjnY}
                r={interpolate(pulse2, [0, 1], [6, 28])}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                opacity={interpolate(pulse2, [0, 1], [0.8, 0])}
              />
              <circle cx={bjnX} cy={bjnY} r="6" fill="#004670" stroke="#FFFFFF" strokeWidth="2.5" />
              <polyline
                points={`${bjnX},${bjnY - 6} ${bjnX - 18},${bjnY - 46} ${bjnX + 150},${bjnY - 46}`}
                fill="none"
                stroke="#FFD100"
                strokeWidth="2.5"
              />
              <g transform={`translate(${bjnX - 18}, ${bjnY - 90}) scale(${calloutScale})`}>
                <rect x="0" y="0" width="215" height="40" rx="8" fill="#FFD100" />
                <text x="14" y="18" fill="#004670" fontSize="13" fontWeight="900">
                  1. Bojonegoro
                </text>
                <text x="14" y="33" fill="#004670" fontSize="12" fontWeight="800">
                  868.808 Ton GKG
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Clean Flat Legend Row */}
      {!compact && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            paddingTop: 8,
            fontSize: 17,
            fontWeight: 800,
            color: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                backgroundColor: "#FFD100",
                transform: `scale(${0.9 + bjnBlink * 0.2})`,
              }}
            />
            <span>1. Bojonegoro (868,8 Rb Ton)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: "#48CAE4" }} />
            <span>2. Lamongan (852,1 Rb Ton)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: "#90E0EF" }} />
            <span>3. Ngawi (768,3 Rb Ton)</span>
          </div>
        </div>
      )}
    </div>
  );
};
