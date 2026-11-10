import { z } from "zod";

export const ALLOWED_DURATIONS = [30, 60, 90, 120] as const;
export type AllowedDuration = (typeof ALLOWED_DURATIONS)[number];

export const VisualTypeEnum = z.enum(["text-highlight", "illustration", "chart", "avatar-dialog"]);

export type VisualType = z.infer<typeof VisualTypeEnum>;

export const TransitionTypeEnum = z.enum(["none", "fade", "slide-up", "slide-left", "zoom-blur", "scale-bounce"]);

export type TransitionType = z.infer<typeof TransitionTypeEnum>;

export const TypographyAnimationEnum = z.enum(["pop-in", "typewriter", "word-by-word", "fade-slide"]);

export type TypographyAnimation = z.infer<typeof TypographyAnimationEnum>;

export const AvatarTypeEnum = z.enum(["avatar-robot", "avatar-agent", "avatar-executive", "avatar-creative", "custom-url"]);

export type AvatarType = z.infer<typeof AvatarTypeEnum>;

export const PresenterOverlayModeEnum = z.enum(["corner-pip", "side-presenter", "center-stage", "dialogue-card", "hidden"]);

export type PresenterOverlayMode = z.infer<typeof PresenterOverlayModeEnum>;

export const CharacterInputModeEnum = z.enum(["image", "text-prompt", "preset"]);
export type CharacterInputMode = z.infer<typeof CharacterInputModeEnum>;

export const VoiceoverSourceEnum = z.enum(["custom-upload", "tts-webspeech", "tts-9router", "url"]);
export type VoiceoverSource = z.infer<typeof VoiceoverSourceEnum>;

export const CharacterConfigSchema = z.object({
  id: z.string().optional().default("char-default"),
  mode: CharacterInputModeEnum.optional().default("preset"),
  name: z.string().min(1, "Nama karakter wajib diisi").default("Alex Rivera"),
  role: z.string().default("Lead Presenter"),
  textPrompt: z.string().optional(),
  avatarType: AvatarTypeEnum.optional().default("avatar-agent"),
  avatarUrl: z.string().optional(),
  imageData: z.string().optional(),
  badgeText: z.string().optional().default("Verified Host"),
  overlayMode: PresenterOverlayModeEnum.optional().default("corner-pip"),
  speechAnimation: z.boolean().optional().default(true),
  bio: z.string().optional(),
});

export type CharacterConfig = z.infer<typeof CharacterConfigSchema>;

export const VoiceoverConfigSchema = z.object({
  enabled: z.boolean().optional().default(true),
  source: VoiceoverSourceEnum.optional().default("tts-webspeech"),
  provider: z.enum(["webspeech", "9router-tts", "custom-url"]).optional().default("webspeech"),
  voiceName: z.string().optional().default("id-ID-ArdiNeural"),
  language: z.string().optional().default("id-ID"),
  rate: z.number().min(0.5).max(2.0).optional().default(1.0),
  pitch: z.number().min(0.5).max(1.8).optional().default(1.0),
  audioUrl: z.string().optional(),
  customAudioUrl: z.string().optional(),
  audioFileName: z.string().optional(),
  audioDurationSec: z.number().optional(),
  autoSyncDuration: z.boolean().optional().default(true),
});

export type VoiceoverConfig = z.infer<typeof VoiceoverConfigSchema>;

export const ChartItemSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().optional(),
});

export type ChartItem = z.infer<typeof ChartItemSchema>;

export const AvatarDialogSchema = z.object({
  speakerName: z.string(),
  speakerRole: z.string().optional(),
  avatarUrl: z.string().optional(),
  avatarType: AvatarTypeEnum.optional(),
  message: z.string(),
  badgeText: z.string().optional(),
});

export type AvatarDialog = z.infer<typeof AvatarDialogSchema>;

export const SceneConfigSchema = z.object({
  id: z.string(),
  durationInFrames: z.number().int().min(15, "Scene must be at least 15 frames"),
  title: z.string(),
  subtitle: z.string().optional(),
  visualType: VisualTypeEnum,
  typographyAnimation: TypographyAnimationEnum.default("pop-in"),
  transitionIn: TransitionTypeEnum.default("fade"),
  transitionOut: TransitionTypeEnum.default("fade"),
  highlightWords: z.array(z.string()).default([]),
  voiceoverNarration: z.string().optional(),
  character: CharacterConfigSchema.optional(),
  assets: z.array(z.string()).optional(),
  chartData: z.array(ChartItemSchema).optional(),
  avatarData: AvatarDialogSchema.optional(),
  callToAction: z.string().optional(),
  accentColor: z.string().optional(),
});

export type SceneConfig = z.infer<typeof SceneConfigSchema>;

export const AudioConfigSchema = z.object({
  bgmUrl: z.string().optional(),
  bgmVolume: z.number().min(0).max(1).default(0.35),
  voiceoverUrl: z.string().optional(),
  voiceoverVolume: z.number().min(0).max(1).default(1.0),
  fadeInFrames: z.number().int().default(15),
  fadeOutFrames: z.number().int().default(30),
});

export type AudioConfig = z.infer<typeof AudioConfigSchema>;

export const ThemeConfigSchema = z.object({
  primaryColor: z.string().default("#3b82f6"),
  accentColor: z.string().default("#10b981"),
  backgroundColor: z.string().default("#090d16"),
  surfaceColor: z.string().default("#111827"),
  textColor: z.string().default("#f8fafc"),
  subtextColor: z.string().default("#94a3b8"),
});

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;

export const VideoConfigSchema = z.object({
  title: z.string().default("Dynamic Motion Video"),
  targetDurationSec: z.number().default(30),
  fps: z.number().int().default(30),
  width: z.number().int().default(1920),
  height: z.number().int().default(1080),
  character: CharacterConfigSchema.default({
    id: "char-1",
    mode: "preset",
    name: "Alex Rivera",
    role: "Lead Presenter",
    avatarType: "avatar-agent",
    badgeText: "Verified Host",
    overlayMode: "corner-pip",
    speechAnimation: true,
  }),
  voiceover: VoiceoverConfigSchema.default({
    enabled: true,
    source: "tts-webspeech",
    provider: "webspeech",
    voiceName: "id-ID-ArdiNeural",
    language: "id-ID",
    rate: 1.0,
    pitch: 1.0,
    autoSyncDuration: true,
  }),
  theme: ThemeConfigSchema.default({
    primaryColor: "#3b82f6",
    accentColor: "#10b981",
    backgroundColor: "#090d16",
    surfaceColor: "#111827",
    textColor: "#f8fafc",
    subtextColor: "#94a3b8",
  }),
  audio: AudioConfigSchema.default({
    bgmVolume: 0.35,
    voiceoverVolume: 1.0,
    fadeInFrames: 15,
    fadeOutFrames: 30,
  }),
  scenes: z.array(SceneConfigSchema).min(1, "Video must contain at least 1 scene"),
});

export type VideoConfig = z.infer<typeof VideoConfigSchema>;

/**
 * Total frames calculate helper
 * Accurately calculates total frames across all scenes for Root composition
 */
export const calculateTotalFrames = (scenes: SceneConfig[]): number => {
  return scenes.reduce((total, scene) => total + scene.durationInFrames, 0);
};

