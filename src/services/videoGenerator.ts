import { AllowedDuration, CharacterConfig, SceneConfig, VideoConfig, VideoConfigSchema, VoiceoverConfig } from "../types/schema";

export interface GenerateVideoParams {
  prompt: string;
  durationSec: AllowedDuration;
  character: CharacterConfig;
  voiceover: VoiceoverConfig;
  format?: "landscape" | "shorts";
  routerUrl?: string;
  routerKey?: string;
  model?: string;
}

/**
 * Distributes total duration into balanced scene frame budgets
 */
export const calculateSceneDurations = (durationSec: AllowedDuration, fps = 30): number[] => {
  const totalFrames = durationSec * fps;

  switch (durationSec) {
    case 30:
      // 5 scenes x 180 frames = 900 frames (30s)
      return [180, 180, 180, 180, 180];
    case 60:
      // 8 scenes x 225 frames = 1800 frames (60s)
      return [225, 225, 225, 225, 225, 225, 225, 225];
    case 90:
      // 10 scenes x 270 frames = 2700 frames (90s)
      return [270, 270, 270, 270, 270, 270, 270, 270, 270, 270];
    case 120:
      // 12 scenes x 300 frames = 3600 frames (120s)
      return [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
    default:
      return [180, 180, 180, 180, 180];
  }
};

/**
 * Intelligent procedural generator fallback
 * Generates tailored scenes based on prompt keywords, duration, character, and voiceover
 */
export const generateProceduralVideo = (params: GenerateVideoParams): VideoConfig => {
  const { prompt, durationSec, character, voiceover, format = "landscape" } = params;
  const fps = 30;
  const sceneDurations = calculateSceneDurations(durationSec, fps);
  const width = format === "landscape" ? 1920 : 1080;
  const height = format === "landscape" ? 1080 : 1920;

  // Derive theme colors based on prompt tone
  const isCyber = /ai|cyber|tech|robot|code|remotion|komputer|digital/i.test(prompt);
  const isPromo = /promo|diskon|jual|bisnis|produk|market|kopi|belanja/i.test(prompt);
  const isHealthEdu = /kesehatan|edukasi|sehat|bahaya|judi|hukum|belajar/i.test(prompt);

  const theme = isCyber
    ? {
        primaryColor: "#3b82f6",
        accentColor: "#10b981",
        backgroundColor: "#070b14",
        surfaceColor: "#111827",
        textColor: "#f8fafc",
        subtextColor: "#94a3b8",
      }
    : isPromo
      ? {
          primaryColor: "#f59e0b",
          accentColor: "#ef4444",
          backgroundColor: "#0f0b09",
          surfaceColor: "#1c140e",
          textColor: "#ffffff",
          subtextColor: "#fed7aa",
        }
      : isHealthEdu
        ? {
            primaryColor: "#06b6d4",
            accentColor: "#84cc16",
            backgroundColor: "#061317",
            surfaceColor: "#0e242a",
            textColor: "#f0fdfa",
            subtextColor: "#a7f3d0",
          }
        : {
            primaryColor: "#6366f1",
            accentColor: "#ec4899",
            backgroundColor: "#090919",
            surfaceColor: "#14142b",
            textColor: "#ffffff",
            subtextColor: "#cbd5e1",
          };

  // Extract key prompt words for highlight
  const words = prompt
    .split(/\s+/)
    .map((w) => w.replace(/[^\w]/g, ""))
    .filter((w) => w.length > 3);
  const sampleHighlights = words.slice(0, 3);

  // Generate scenes matching the exact frame array
  const visualRotation: Array<"text-highlight" | "illustration" | "chart" | "avatar-dialog"> = ["text-highlight", "avatar-dialog", "illustration", "chart", "text-highlight", "avatar-dialog", "chart", "illustration", "text-highlight", "avatar-dialog", "illustration", "text-highlight"];

  const scenes: SceneConfig[] = sceneDurations.map((durationInFrames, index) => {
    const visualType = visualRotation[index % visualRotation.length];
    const sceneNum = index + 1;

    let title = "";
    let subtitle = "";
    let narration = "";

    if (index === 0) {
      title = prompt.length > 40 ? prompt.slice(0, 38) + "..." : prompt;
      subtitle = `Bersama ${character.name} (${character.role}). Eksplorasi mendalam durasi ${durationSec} detik.`;
      narration = `Halo semua! Saya ${character.name}. Di video kali ini kita akan membahas topik penting: ${prompt}.`;
    } else if (index === sceneDurations.length - 1) {
      title = "Kesimpulan & Langkah Selanjutnya";
      subtitle = "Pahami langkah konkret dan terapkan insight sekarang juga.";
      narration = `Itulah rangkuman penting seputar ${prompt}. Ambil tindakan sekarang dan bagikan video ini jika bermanfaat.`;
    } else {
      switch (visualType) {
        case "avatar-dialog":
          title = `Pandangan ${character.name}`;
          subtitle = `Analisis langsung dari perspektif ${character.role}.`;
          narration = `Menurut pengalaman saya sebagai ${character.role}, memahami esensi ${prompt} memberikan dampak yang luar biasa.`;
          break;
        case "chart":
          title = "Data & Tren Signifikan";
          subtitle = "Fakta terukur berdasarkan analisis komparatif terbaru.";
          narration = "Berikut adalah data dan statistik relevan yang menunjukkan pergeseran tren secara signifikan.";
          break;
        case "illustration":
          title = "Arsitektur & Konsep Kunci";
          subtitle = "Visualisasi sistematis alur kerja dan integrasi proses.";
          narration = "Mari kita bedah arsitektur dan prinsip kerja di balik sistem ini langkah demi langkah.";
          break;
        case "text-highlight":
        default:
          title = `Poin Utama Bagian ${sceneNum}`;
          subtitle = `Fokus terpenting dalam eksplorasi ${prompt.slice(0, 25)}.`;
          narration = `Perhatikan poin penting ini untuk memaksimalkan hasil pemahaman Anda.`;
          break;
      }
    }

    return {
      id: `scene-${sceneNum}-${visualType}`,
      durationInFrames,
      title,
      subtitle,
      visualType,
      typographyAnimation: index % 2 === 0 ? "pop-in" : "word-by-word",
      transitionIn: index === 0 ? "fade" : "slide-left",
      transitionOut: index === sceneDurations.length - 1 ? "fade" : "zoom-blur",
      highlightWords: sampleHighlights.length > 0 ? sampleHighlights : ["Penting", "Kunci"],
      voiceoverNarration: narration,
      character: {
        ...character,
      },
      avatarData: {
        speakerName: character.name,
        speakerRole: character.role,
        avatarType: character.avatarType,
        avatarUrl: character.imageData || character.avatarUrl,
        message: narration,
        badgeText: character.badgeText || "Host",
      },
      chartData: [
        { label: "Pertumbuhan & Efektivitas", value: 85 + ((index * 3) % 15), color: theme.accentColor },
        { label: "Tingkat Adopsi", value: 72 + ((index * 5) % 25), color: theme.primaryColor },
        { label: "Stabilitas", value: 92, color: "#8b5cf6" },
      ],
      callToAction: index === sceneDurations.length - 1 ? "Pelajari Lebih Lanjut" : undefined,
      accentColor: theme.accentColor,
    };
  });

  return {
    title: prompt.slice(0, 50),
    targetDurationSec: durationSec,
    fps,
    width,
    height,
    character,
    voiceover,
    theme,
    audio: {
      bgmVolume: 0.3,
      voiceoverVolume: 1.0,
      fadeInFrames: 15,
      fadeOutFrames: 30,
    },
    scenes,
  };
};

/**
 * 9Router / Gemini Flash Video Generator with automatic Fallback
 */
export const generateVideoWithAI = async (params: GenerateVideoParams): Promise<VideoConfig> => {
  const { prompt, durationSec, character, voiceover, format = "landscape", routerUrl = "http://localhost:20128", routerKey, model = "google/gemini-2.0-flash" } = params;

  const fps = 30;
  const sceneDurations = calculateSceneDurations(durationSec, fps);
  const totalFrames = durationSec * fps;
  const numScenes = sceneDurations.length;

  const systemInstructions = `
You are an expert Remotion Motion Graphic Director. Generate a complete JSON configuration for an animated video.
Strict Rules:
1. Return ONLY pure valid JSON, no markdown formatting, no backticks, no markdown codeblock.
2. The video MUST have EXACTLY ${numScenes} scenes.
3. The scenes MUST have these EXACT durationInFrames: [${sceneDurations.join(", ")}].
   Their sum must equal exactly ${totalFrames} frames (${durationSec} seconds at 30 FPS).
4. The host character is:
   - Name: "${character.name}"
   - Role: "${character.role}"
   - AvatarType: "${character.avatarType}"
   - Badge: "${character.badgeText}"
5. For each scene, include:
   - "id": string
   - "durationInFrames": number (must match the assigned slot)
   - "title": catchy kinetic title (Indonesian or English according to prompt)
   - "subtitle": explanatory subtitle
   - "visualType": one of ["text-highlight", "illustration", "chart", "avatar-dialog"]
   - "typographyAnimation": one of ["pop-in", "typewriter", "word-by-word", "fade-slide"]
   - "transitionIn": one of ["fade", "slide-up", "slide-left", "zoom-blur", "scale-bounce"]
   - "transitionOut": one of ["fade", "slide-up", "slide-left", "zoom-blur", "scale-bounce"]
   - "highlightWords": array of 1-3 keywords to emphasize
   - "voiceoverNarration": script for voice over narration in this scene
   - If visualType is "avatar-dialog": provide "avatarData" { speakerName, speakerRole, message, badgeText }
   - If visualType is "chart": provide "chartData" array of { label, value (0-100), color }
6. Resolution: width=${format === "landscape" ? 1920 : 1080}, height=${format === "landscape" ? 1080 : 1920}.
`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (routerKey) {
      headers["Authorization"] = `Bearer ${routerKey}`;
    }

    const response = await fetch(`${routerUrl}/v1/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemInstructions },
          {
            role: "user",
            content: `Buatkan animasi video berdurasi ${durationSec} detik dengan topik: "${prompt}". Pembicara adalah ${character.name} (${character.role}). Bahasa narasi sesuaikan dengan topik prompt.`,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`9Router error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";

    // Clean any markdown backticks if returned
    content = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = JSON.parse(content);

    // Enforce exact frame numbers on scenes
    if (Array.isArray(parsed.scenes)) {
      parsed.scenes.forEach((scene: SceneConfig, idx: number) => {
        if (idx < sceneDurations.length) {
          scene.durationInFrames = sceneDurations[idx];
        }
      });
    }

    // Attach character & voiceover
    parsed.character = character;
    parsed.voiceover = voiceover;
    parsed.targetDurationSec = durationSec;
    parsed.fps = fps;
    parsed.width = format === "landscape" ? 1920 : 1080;
    parsed.height = format === "landscape" ? 1080 : 1920;

    const validated = VideoConfigSchema.parse(parsed);
    return validated;
  } catch (error) {
    console.warn("9Router / AI gateway unreachable or error, activating smart fallback:", error);
    return generateProceduralVideo(params);
  }
};

