import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CharacterConfig, ThemeConfig } from "../../types/schema";
import { CharacterAvatar } from "./CharacterAvatar";

interface AnimatedPresenterProps {
  character?: CharacterConfig;
  theme: ThemeConfig;
  accentColor?: string;
  isSpeaking?: boolean;
}

export const AnimatedPresenter: React.FC<AnimatedPresenterProps> = ({ character, theme, accentColor, isSpeaking = true }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  if (!character || character.overlayMode === "hidden" || character.overlayMode === "dialogue-card") {
    return null;
  }

  const accent = accentColor || theme.accentColor;
  const primary = theme.primaryColor;
  const overlayMode = character.overlayMode || "corner-pip";

  // Spring entrance for presenter
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // Breathing and idle bobbing motion
  const breathY = Math.sin((frame / 25) * Math.PI) * 4;
  const breathScale = 1 + Math.sin((frame / 35) * Math.PI) * 0.015;

  // Mouth/Soundwave speaking pulse
  const speechPulse = isSpeaking && character.speechAnimation ? Math.abs(Math.sin((frame / 4) * Math.PI)) : 0;

  const characterImage = character.imageData || character.avatarUrl;

  // 1. CORNER-PIP MODE (Picture-in-Picture at bottom right corner)
  if (overlayMode === "corner-pip") {
    const translateY = interpolate(entranceSpring, [0, 1], [100, 0]);
    const opacity = interpolate(entranceSpring, [0, 0.4, 1], [0, 0.8, 1]);

    return (
      <div
        className="absolute bottom-6 right-8 z-30 flex items-center gap-4 bg-slate-950/85 backdrop-blur-xl border-2 rounded-3xl p-3 shadow-2xl pointer-events-none select-none max-w-sm"
        style={{
          transform: `translateY(${translateY + breathY}px) scale(${breathScale})`,
          opacity,
          borderColor: `${accent}66`,
          boxShadow: `0 12px 35px -10px ${accent}44, 0 0 15px ${accent}22`,
        }}
      >
        {/* Character Visual */}
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-inner bg-slate-900 flex items-center justify-center relative"
            style={{
              borderColor: accent,
              boxShadow: isSpeaking ? `0 0 18px ${accent}77` : undefined,
            }}
          >
            {characterImage ? (
              <img
                src={characterImage}
                alt={character.name}
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${1 + speechPulse * 0.06})`,
                }}
              />
            ) : (
              <CharacterAvatar name={character.name} avatarType={character.avatarType} size="md" accentColor={accent} frame={frame} />
            )}
          </div>

          {/* Active Speaking Indicator Dot */}
          {character.speechAnimation && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: isSpeaking ? accent : "#64748b",
              }}
            >
              <div className="w-full h-full rounded-full animate-ping opacity-60" style={{ backgroundColor: accent }} />
            </div>
          )}
        </div>

        {/* Character Details & Dynamic Waveform */}
        <div className="flex flex-col pr-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white tracking-wide truncate max-w-[150px]">{character.name}</span>
            {character.badgeText && (
              <span
                className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${accent}25`,
                  color: accent,
                  border: `1px solid ${accent}44`,
                }}
              >
                {character.badgeText}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">{character.role}</span>

          {/* Live Audio Waveform Bars */}
          {isSpeaking && (
            <div className="flex items-center gap-1 mt-1.5 h-3">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8].map((factor, i) => {
                const barHeight = 4 + Math.sin((frame / 3 + i) * Math.PI) * 7 * factor;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all"
                    style={{
                      height: `${Math.max(3, barHeight)}px`,
                      backgroundColor: accent,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. SIDE-PRESENTER MODE (Half-body standing on right stage)
  if (overlayMode === "side-presenter") {
    const translateX = interpolate(entranceSpring, [0, 1], [150, 0]);
    const opacity = interpolate(entranceSpring, [0, 0.3, 1], [0, 0.8, 1]);

    return (
      <div
        className="absolute bottom-0 right-12 z-20 flex flex-col items-center pointer-events-none select-none"
        style={{
          transform: `translateX(${translateX}px) translateY(${breathY}px)`,
          opacity,
        }}
      >
        {/* Glowing Spotlight Pedestal */}
        <div className="absolute -bottom-8 w-64 h-16 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} />

        {/* Presenter Portrait */}
        <div
          className="w-56 h-72 rounded-3xl overflow-hidden border-2 shadow-2xl relative bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-3"
          style={{
            borderColor: `${accent}77`,
            boxShadow: `0 20px 50px -15px ${accent}44`,
          }}
        >
          {characterImage ? (
            <img
              src={characterImage}
              alt={character.name}
              className="w-full h-full object-contain rounded-2xl"
              style={{
                transform: `scale(${breathScale + speechPulse * 0.03})`,
              }}
            />
          ) : (
            <div style={{ transform: "scale(1.5)" }}>
              <CharacterAvatar name={character.name} avatarType={character.avatarType} size="xl" accentColor={accent} frame={frame} />
            </div>
          )}
        </div>

        {/* Name Badge */}
        <div className="mt-3 px-4 py-1.5 rounded-xl border bg-slate-950/90 backdrop-blur-md text-center shadow-lg" style={{ borderColor: `${accent}55` }}>
          <span className="font-extrabold text-xs text-white block">{character.name}</span>
          <span className="text-[10px] text-slate-400 block">{character.role}</span>
        </div>
      </div>
    );
  }

  // 3. CENTER-STAGE MODE
  const scale = interpolate(entranceSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(entranceSpring, [0, 0.3, 1], [0, 0.8, 1]);

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      style={{
        transform: `scale(${scale * breathScale}) translateY(${breathY}px)`,
        opacity,
      }}
    >
      <div
        className="w-64 h-64 rounded-full overflow-hidden border-4 shadow-2xl relative bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4"
        style={{
          borderColor: accent,
          boxShadow: `0 0 60px ${accent}66`,
        }}
      >
        {characterImage ? <img src={characterImage} alt={character.name} className="w-full h-full object-contain rounded-full" /> : <CharacterAvatar name={character.name} avatarType={character.avatarType} size="xl" accentColor={accent} frame={frame} />}
      </div>

      <div className="mt-6 px-6 py-2 rounded-2xl border bg-slate-950/90 backdrop-blur-md text-center shadow-2xl" style={{ borderColor: `${accent}66` }}>
        <span className="font-extrabold text-base text-white block">{character.name}</span>
        <span className="text-xs text-slate-400 block">{character.role}</span>
      </div>
    </div>
  );
};

