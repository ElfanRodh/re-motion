import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";

interface ChartSceneProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const ChartScene: React.FC<ChartSceneProps> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = scene.accentColor || theme.accentColor;
  const items = scene.chartData || [
    { label: "Performance", value: 94, color: "#10b981" },
    { label: "Render Speed", value: 88, color: "#3b82f6" },
    { label: "Efficiency", value: 96, color: "#8b5cf6" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl px-8 z-10">
      <KineticText text={scene.title} animation={scene.typographyAnimation} highlightWords={scene.highlightWords} accentColor={accent} className="text-4xl md:text-5xl font-black text-white text-center mb-4" />

      {scene.subtitle && <KineticText text={scene.subtitle} animation="fade-slide" className="text-lg md:text-xl text-slate-300 text-center mb-10 max-w-2xl" delayFrames={8} as="p" />}

      {/* Bar Chart Container */}
      <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
        {items.map((item, index) => {
          const barDelay = 10 + index * 6;
          const barSpring = spring({
            frame: Math.max(0, frame - barDelay),
            fps,
            config: { damping: 14, stiffness: 100 },
          });

          const currentWidth = interpolate(barSpring, [0, 1], [0, item.value]);
          const displayValue = Math.round(currentWidth);
          const barColor = item.color || accent;

          return (
            <div key={`${item.label}-${index}`} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm md:text-base font-semibold">
                <span className="text-slate-200">{item.label}</span>
                <span className="font-mono text-lg font-bold" style={{ color: barColor }}>
                  {displayValue}%
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${currentWidth}%`,
                    background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
                    boxShadow: `0 0 12px ${barColor}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

