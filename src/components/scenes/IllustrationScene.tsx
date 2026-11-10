import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";

interface IllustrationSceneProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const IllustrationScene: React.FC<IllustrationSceneProps> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = scene.accentColor || theme.accentColor;
  const primary = theme.primaryColor;

  // Center node spring entrance
  const coreSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const coreScale = interpolate(coreSpring, [0, 1], [0.4, 1]);
  const coreRotation = (frame * 1.5) % 360;
  const outerRotation = -(frame * 0.8) % 360;
  const pulseScale = 1 + Math.sin((frame / 20) * Math.PI) * 0.05;

  const hasCustomAsset = scene.assets && scene.assets.length > 0;

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl px-8 z-10 w-full">
      {/* Title */}
      <KineticText text={scene.title} animation={scene.typographyAnimation} highlightWords={scene.highlightWords} accentColor={accent} className="text-4xl md:text-6xl font-black text-white text-center mb-3" />

      {scene.subtitle && <KineticText text={scene.subtitle} animation="fade-slide" className="text-lg md:text-xl text-slate-300 text-center mb-8 max-w-2xl" delayFrames={8} as="p" />}

      {/* Visual Canvas */}
      <div className="relative w-80 h-80 flex items-center justify-center my-4">
        {hasCustomAsset ? (
          <div
            className="w-full h-full rounded-3xl overflow-hidden border border-slate-700 shadow-2xl p-2 bg-slate-900/60"
            style={{
              transform: `scale(${coreScale})`,
            }}
          >
            <img src={scene.assets![0]} alt={scene.title} className="w-full h-full object-contain rounded-2xl" />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center" style={{ transform: `scale(${coreScale * pulseScale})` }}>
            {/* Outer Orbit Ring */}
            <div
              className="absolute w-72 h-72 rounded-full border border-dashed"
              style={{
                borderColor: `${accent}44`,
                transform: `rotate(${outerRotation}deg)`,
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-lg" style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}` }} />
            </div>

            {/* Middle Orbit Ring */}
            <div
              className="absolute w-56 h-56 rounded-full border"
              style={{
                borderColor: `${primary}55`,
                transform: `rotate(${coreRotation}deg)`,
              }}
            >
              <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 rounded-full shadow-lg" style={{ backgroundColor: primary, boxShadow: `0 0 12px ${primary}` }} />
            </div>

            {/* Glowing Core Orb */}
            <div
              className="w-36 h-36 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${primary}dd, ${accent}dd)`,
                boxShadow: `0 0 40px ${accent}66`,
              }}
            >
              {/* Inner animated circuit icon */}
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3" />
                <path d="M15 1v3" />
                <path d="M9 20v3" />
                <path d="M15 20v3" />
                <path d="M20 9h3" />
                <path d="M20 14h3" />
                <path d="M1 9h3" />
                <path d="M1 14h3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

