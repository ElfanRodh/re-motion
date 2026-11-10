import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { KineticText } from "../typography/KineticText";
import { CharacterAvatar } from "../character/CharacterAvatar";

interface AvatarDialogSceneProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const AvatarDialogScene: React.FC<AvatarDialogSceneProps> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = scene.accentColor || theme.accentColor;
  const avatar = scene.avatarData || {
    speakerName: scene.character?.name || "Alex Rivera",
    speakerRole: scene.character?.role || "Lead Motion Architect",
    avatarType: scene.character?.avatarType || "avatar-agent",
    avatarUrl: scene.character?.avatarUrl,
    message: scene.voiceoverNarration || "Remotion allows us to programmatically build videos with pixel-perfect React components and instantaneous iteration.",
    badgeText: scene.character?.badgeText || "Verified Presenter",
  };

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 0.4, 1], [0, 0.8, 1]);
  const cardY = interpolate(cardSpring, [0, 1], [30, 0]);

  // Subtle floating speech bubble effect
  const floatY = Math.sin((frame / 40) * Math.PI) * 4;

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl px-8 z-10 w-full">
      <KineticText text={scene.title} animation={scene.typographyAnimation} highlightWords={scene.highlightWords} accentColor={accent} className="text-4xl md:text-5xl font-black text-white text-center mb-10" />

      {/* Dialogue Card */}
      <div
        className="w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 md:p-10 shadow-2xl relative"
        style={{
          transform: `translateY(${cardY + floatY}px) scale(${cardScale})`,
          opacity: cardOpacity,
          boxShadow: `0 20px 40px -15px ${accent}22`,
        }}
      >
        {/* Speaker Profile Header */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-800">
          <CharacterAvatar name={avatar.speakerName} avatarType={avatar.avatarType || scene.character?.avatarType} avatarUrl={avatar.avatarUrl || scene.character?.avatarUrl} imageData={scene.character?.imageData} size="md" accentColor={accent} frame={frame} />

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-white tracking-wide">{avatar.speakerName}</span>
              {avatar.badgeText && (
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${accent}25`,
                    color: accent,
                    border: `1px solid ${accent}44`,
                  }}
                >
                  {avatar.badgeText}
                </span>
              )}
            </div>
            {avatar.speakerRole && <span className="text-sm text-slate-400 font-medium">{avatar.speakerRole}</span>}
          </div>
        </div>

        {/* Message body with typewriter kinetic animation */}
        <div className="text-slate-100 text-xl md:text-2xl leading-relaxed font-sans">
          <KineticText text={avatar.message} animation="typewriter" accentColor={accent} delayFrames={12} as="p" />
        </div>
      </div>
    </div>
  );
};

