import { VoiceoverConfig } from "../types/schema";

export interface AvailableVoice {
  name: string;
  lang: string;
  gender?: "male" | "female";
}

/**
 * Get system voices available in browser speech synthesis
 */
export const getBrowserVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }

    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };

    // Fallback if event doesn't fire
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 500);
  });
};

/**
 * Play a voice test sample using Web Speech API
 */
export const testSpeakVoice = (text: string, config: VoiceoverConfig, availableVoices: SpeechSynthesisVoice[] = []): void => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Web Speech API not supported in this environment");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = config.rate || 1.0;
  utterance.pitch = config.pitch || 1.0;
  utterance.lang = config.language || "id-ID";

  if (availableVoices.length > 0 && config.voiceName) {
    const selected = availableVoices.find((v) => v.name === config.voiceName || v.voiceURI === config.voiceName);
    if (selected) {
      utterance.voice = selected;
    }
  }

  window.speechSynthesis.speak(utterance);
};

/**
 * Stop active speech synthesis
 */
export const stopSpeech = (): void => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Call 9Router OpenAI-compatible Text-To-Speech endpoint (/v1/audio/speech)
 */
export const generate9RouterTTS = async (
  text: string,
  options: {
    routerUrl?: string;
    routerKey?: string;
    model?: string;
    voice?: string;
  },
): Promise<string | null> => {
  const { routerUrl = "http://localhost:20128", routerKey, model = "openai/tts-1", voice = "alloy" } = options;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (routerKey) {
      headers["Authorization"] = `Bearer ${routerKey}`;
    }

    const res = await fetch(`${routerUrl}/v1/audio/speech`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        input: text,
        voice,
      }),
    });

    if (!res.ok) {
      throw new Error(`TTS Error ${res.status}: ${res.statusText}`);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.warn("9Router TTS request failed:", err);
    return null;
  }
};

