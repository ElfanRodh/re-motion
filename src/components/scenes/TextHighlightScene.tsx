import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";

interface TextHighlightSceneProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const TextHighlightScene: React.FC<TextHighlightSceneProps> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = scene.accentColor || theme.accentColor;

  // Badge entrance spring
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // CTA button spring
  const ctaSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 0.4, 1], [0, 0.8, 1]);

  const ctaScale = interpolate(ctaSpring, [0, 1], [0.7, 1]);
  const ctaOpacity = interpolate(ctaSpring, [0, 0.3, 1], [0, 0.8, 1]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-8 max-w-5xl mx-auto z-10">
      {/* Top Tag/Badge */}
      <div
        className="mb-8 px-5 py-2 rounded-full border text-sm font-semibold tracking-wider uppercase backdrop-blur-md"
        style={{
          transform: `scale(${badgeScale})`,
          opacity: badgeOpacity,
          borderColor: `${accent}55`,
          backgroundColor: `${accent}15`,
          color: accent,
          boxShadow: `0 0 20px ${accent}22`,
        }}
      >
        ✦ Dynamic Motion System
      </div>

      {/* Main Kinetic Title */}
      <KineticText text={scene.title} animation={scene.typographyAnimation} highlightWords={scene.highlightWords} accentColor={accent} className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white mb-6" delayFrames={6} />

      {/* Subtitle */}
      {scene.subtitle && <KineticText text={scene.subtitle} animation="fade-slide" className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-8 font-normal" delayFrames={14} as="p" />}

      {/* Call to Action Button / Pill */}
      {scene.callToAction && (
        <div
          className="px-8 py-3.5 rounded-xl font-bold text-lg text-slate-950 shadow-2xl transition-all"
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaOpacity,
            backgroundColor: accent,
            boxShadow: `0 10px 30px ${accent}66`,
          }}
        >
          {scene.callToAction}
        </div>
      )}
    </div>
  );
};

