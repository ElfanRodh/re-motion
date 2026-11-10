import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { JATIM_MAP_VIEWBOX, JATIM_REGENCY_PATHS } from "../../assets/jatimMapPaths";

interface FlatVectorJatimMapProps {
  highlightTop3?: boolean;
  showCallout?: boolean;
  compact?: boolean;
}

export const FlatVectorJatimMap: React.FC<FlatVectorJatimMapProps> = ({
  highlightTop3 = true,
  showCallout = true,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bojonegoro = JATIM_REGENCY_PATHS.find((r) => r.name === "Bojonegoro");
  const lamongan = JATIM_REGENCY_PATHS.find((r) => r.name === "Lamongan");
  const ngawi = JATIM_REGENCY_PATHS.find((r) => r.name === "Ngawi");

  const bjnX = bojonegoro?.cx ?? 209.5;
  const bjnY = bojonegoro?.cy ?? 133;

  const reveal = interpolate(frame, [0, 0.45 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const beaconPulse = (frame % 40) / 40;
  const calloutScale = interpolate(frame, [0.3 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
            opacity: reveal,
            scale: interpolate(reveal, [0, 1], [0.93, 1]),
            overflow: "visible",
          }}
        >
          {/* Base Layer: 38 Regencies (Editorial Flat Vector Silhouette Masses) */}
          {JATIM_REGENCY_PATHS.map((regency, idx) => {
            const isBojonegoro = regency.name === "Bojonegoro";
            const isLamongan = highlightTop3 && regency.name === "Lamongan";
            const isNgawi = highlightTop3 && regency.name === "Ngawi";

            // Cohesive flat palette across provinces
            let fill = (idx % 2 === 0) ? "#152E52" : "#1B3B66";
            let stroke = "#0C1B33";
            let strokeWidth = 1.2;

            if (isBojonegoro) {
              fill = "#F59E0B";
              stroke = "#FDE047";
              strokeWidth = 2.2;
            } else if (isLamongan) {
              fill = "#0284C7";
              stroke = "#38BDF8";
              strokeWidth = 1.8;
            } else if (isNgawi) {
              fill = "#059669";
              stroke = "#34D399";
              strokeWidth = 1.8;
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

          {/* Bojonegoro Polygon Highlighted with Top Face Plane */}
          {bojonegoro && (
            <path
              d={bojonegoro.d}
              fill="#F59E0B"
              stroke="#FFFFFF"
              strokeWidth={2.4}
              strokeLinejoin="round"
            />
          )}

          {/* Animated Connecting Vector Flight Path between Lumbung Hubs */}
          {highlightTop3 && lamongan && ngawi && (
            <polyline
              points={`${ngawi.cx},${ngawi.cy} ${bjnX},${bjnY} ${lamongan.cx},${lamongan.cy}`}
              fill="none"
              stroke="#FDE047"
              strokeWidth="2.4"
              strokeDasharray="6 6"
              strokeDashoffset={-frame * 1.5}
            />
          )}

          {/* Centroid Pins for #2 Lamongan & #3 Ngawi */}
          {highlightTop3 && lamongan && (
            <g transform={`translate(${lamongan.cx}, ${lamongan.cy})`}>
              <circle r="4.5" fill="#0C1B33" stroke="#38BDF8" strokeWidth="2" />
            </g>
          )}

          {highlightTop3 && ngawi && (
            <g transform={`translate(${ngawi.cx}, ${ngawi.cy})`}>
              <circle r="4.5" fill="#0C1B33" stroke="#34D399" strokeWidth="2" />
            </g>
          )}

          {/* Centroid Pin & Beacon for #1 Bojonegoro */}
          <g transform={`translate(${bjnX}, ${bjnY})`}>
            {/* Expanding Flat Beacon Ring */}
            <circle
              r={interpolate(beaconPulse, [0, 1], [6, 32])}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              opacity={interpolate(beaconPulse, [0, 1], [0.9, 0])}
            />
            {/* Core Pin */}
            <circle r="6" fill="#0C1B33" stroke="#FDE047" strokeWidth="2.5" />
          </g>

          {/* Editorial Callout Flag for Bojonegoro */}
          {showCallout && (
            <g>
              <polyline
                points={`${bjnX},${bjnY - 6} ${bjnX - 18},${bjnY - 48} ${bjnX + 175},${bjnY - 48}`}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              <g transform={`translate(${bjnX - 18}, ${bjnY - 96}) scale(${calloutScale})`}>
                {/* 2-Plane Editorial Label Box */}
                <rect x="0" y="0" width="220" height="44" rx="8" fill="#F59E0B" />
                <rect x="0" y="38" width="220" height="6" rx="2" fill="#D97706" />
                <text x="14" y="20" fill="#0C1B33" fontSize="13" fontWeight="900" letterSpacing="0.5">
                  1. KAB. BOJONEGORO
                </text>
                <text x="14" y="34" fill="#0C1B33" fontSize="12" fontWeight="800">
                  868.808 TON GKG (#1 JATIM)
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Editorial Legend Bar */}
      {!compact && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0A172A",
            borderRadius: 12,
            padding: "8px 18px",
            fontSize: 15,
            fontWeight: 800,
            color: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: "#F59E0B" }} />
            <span>1. Bojonegoro (868,8 Rb T)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: "#0284C7" }} />
            <span>2. Lamongan (852,1 Rb T)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: "#059669" }} />
            <span>3. Ngawi (768,3 Rb T)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: "#152E52" }} />
            <span style={{ color: "#94A3B8" }}>35 Kab/Kota</span>
          </div>
        </div>
      )}
    </div>
  );
};

