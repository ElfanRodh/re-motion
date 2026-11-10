import React from "react";
import { Series, useVideoConfig } from "remotion";
import { VideoConfig } from "../types/schema";
import { BackgroundGradient } from "../components/common/BackgroundGradient";
import { ReelsOverlay } from "../components/common/ReelsOverlay";
import { SceneTransition } from "../components/transitions/SceneTransition";
import { SceneRenderer } from "../components/scenes/SceneRenderer";
import { AudioLayer } from "../components/audio/AudioLayer";

export const MainVideo: React.FC<VideoConfig> = ({ theme, audio, character, voiceover, scenes }) => {
  const { durationInFrames } = useVideoConfig();

  // Support uploaded custom audio or remote audio URL
  const activeVoiceoverUrl = voiceover?.customAudioUrl || voiceover?.audioUrl || audio?.voiceoverUrl;

  const mergedAudio = {
    ...audio,
    voiceoverUrl: activeVoiceoverUrl,
    voiceoverVolume: voiceover?.enabled ? (audio?.voiceoverVolume ?? 1.0) : 0,
  };

  const isBojonegoroReels = scenes.some((s) => s.id.startsWith("scene-1-bojonegoro"));

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 font-sans select-none">
      {/* Dynamic Background Atmosphere */}
      <BackgroundGradient theme={theme} />

      {/* Sequential Scene Render Pipeline */}
      <Series>
        {scenes.map((scene) => (
          <Series.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
            <SceneTransition
              durationInFrames={scene.durationInFrames}
              transitionIn={scene.transitionIn}
              transitionOut={scene.transitionOut}
            >
              <SceneRenderer
                scene={{
                  ...scene,
                  character: character || scene.character,
                }}
                theme={theme}
              />
            </SceneTransition>
          </Series.Sequence>
        ))}
      </Series>

      {/* Social Media Reels Progress, Verified Header & Live Synced Voiceover Subtitles */}
      {isBojonegoroReels && (
        <ReelsOverlay sceneDurations={scenes.map((s) => s.durationInFrames)} />
      )}

      {/* Audio Layer (BGM Fade In/Out + Voiceover) */}
      <AudioLayer audio={mergedAudio} totalDurationInFrames={durationInFrames} />
    </div>
  );
};
