import React, { useState, useMemo, useRef, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { MainVideo } from "../compositions/MainVideo";
import { AllowedDuration, ALLOWED_DURATIONS, AvatarType, CharacterConfig, PresenterOverlayMode, VideoConfig, VideoConfigSchema, VoiceoverConfig, calculateTotalFrames } from "../types/schema";
import { sampleLandscapeVideo, sampleShortsVideo, bojonegoroReelsVideo } from "../compositions/sampleData";
import { generateVideoWithAI } from "../services/videoGenerator";
import { getBrowserVoices, testSpeakVoice, stopSpeech } from "../services/voiceoverService";
import { CharacterAvatar } from "../components/character/CharacterAvatar";

export const App: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<"landscape" | "shorts">("shorts");
  const [config, setConfig] = useState<VideoConfig>(bojonegoroReelsVideo);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(bojonegoroReelsVideo, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"generator" | "json" | "scenes">("generator");

  // AI Generator Form States
  const [promptText, setPromptText] = useState<string>("Bojonegoro Juara 1 Padi Jawa Timur 2026 - Rilis Resmi Data BPS Produksi 868.808 Ton Gabah");
  const [selectedDuration, setSelectedDuration] = useState<AllowedDuration>(60);

  // Character Configuration State (Gambar / Teks Persona)
  const [character, setCharacter] = useState<CharacterConfig>(bojonegoroReelsVideo.character);

  // Voiceover Configuration State (Voiceover Sendiri / TTS)
  const [voiceover, setVoiceover] = useState<VoiceoverConfig>(bojonegoroReelsVideo.voiceover);

  // 9Router Gateway States
  const [showRouterSettings, setShowRouterSettings] = useState<boolean>(false);
  const [routerUrl, setRouterUrl] = useState<string>("http://localhost:20128");
  const [routerKey, setRouterKey] = useState<string>("");
  const [routerModel, setRouterModel] = useState<string>("google/gemini-2.0-flash");

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Available Browser Voices
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const playerRef = useRef<PlayerRef>(null);
  const fileImageInputRef = useRef<HTMLInputElement>(null);
  const fileAudioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getBrowserVoices().then((voices) => {
      setAvailableVoices(voices);
      if (voices.length > 0 && !voiceover.voiceName) {
        const idVoice = voices.find((v) => v.lang.startsWith("id")) || voices[0];
        setVoiceover((prev) => ({ ...prev, voiceName: idVoice.name }));
      }
    });

    return () => {
      stopSpeech();
    };
  }, []);

  // Handle Character Image File Upload (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updatedChar: CharacterConfig = {
        ...character,
        mode: "image",
        imageData: dataUrl,
        avatarType: "custom-url",
      };
      setCharacter(updatedChar);

      // Immediately sync with Player Composition
      setConfig((prev) => ({
        ...prev,
        character: updatedChar,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    const updatedChar: CharacterConfig = {
      ...character,
      mode: "preset",
      imageData: "",
      avatarUrl: "",
      avatarType: "avatar-agent",
    };
    setCharacter(updatedChar);
    setConfig((prev) => ({
      ...prev,
      character: updatedChar,
    }));
    if (fileImageInputRef.current) {
      fileImageInputRef.current.value = "";
    }
  };

  // Handle Voiceover Custom Audio Upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioData = event.target?.result as string;

      const tempAudio = new Audio(audioData);
      tempAudio.onloadedmetadata = () => {
        const duration = Math.round(tempAudio.duration) || 30;

        const updatedVo: VoiceoverConfig = {
          ...voiceover,
          enabled: true,
          source: "custom-upload",
          customAudioUrl: audioData,
          audioFileName: file.name,
          audioDurationSec: duration,
        };
        setVoiceover(updatedVo);

        // Auto match closest allowed duration
        let matchedDuration: AllowedDuration = 30;
        if (duration > 105) matchedDuration = 120;
        else if (duration > 75) matchedDuration = 90;
        else if (duration > 45) matchedDuration = 60;
        setSelectedDuration(matchedDuration);

        // Immediately sync with Player Composition
        setConfig((prev) => ({
          ...prev,
          voiceover: updatedVo,
          audio: {
            ...prev.audio,
            voiceoverUrl: audioData,
          },
        }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleClearAudio = () => {
    const updatedVo: VoiceoverConfig = {
      ...voiceover,
      source: "tts-webspeech",
      customAudioUrl: "",
      audioFileName: "",
      audioDurationSec: undefined,
    };
    setVoiceover(updatedVo);
    setConfig((prev) => ({
      ...prev,
      voiceover: updatedVo,
      audio: {
        ...prev.audio,
        voiceoverUrl: undefined,
      },
    }));
    if (fileAudioInputRef.current) {
      fileAudioInputRef.current.value = "";
    }
  };

  // Switch between Landscape and Shorts
  const handleSelectTemplate = (template: "landscape" | "shorts") => {
    setActiveTemplate(template);
    const selected = template === "landscape" ? sampleLandscapeVideo : sampleShortsVideo;
    setConfig({
      ...selected,
      character,
      voiceover,
    });
    setJsonText(JSON.stringify(selected, null, 2));
    setJsonError(null);
  };

  // Generate Video with Prompt, Duration, Character, and Voiceover
  const handleGenerateVideo = async () => {
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setGenerationNotice("Menghubungkan ke 9Router / Gemini Flash...");

    try {
      const generated = await generateVideoWithAI({
        prompt: promptText.trim(),
        durationSec: selectedDuration,
        character,
        voiceover,
        format: activeTemplate,
        routerUrl: routerUrl.trim(),
        routerKey: routerKey.trim(),
        model: routerModel.trim(),
      });

      // Preserve custom uploaded audio/image if present
      if (voiceover.customAudioUrl) {
        generated.voiceover = voiceover;
        generated.audio = {
          ...generated.audio,
          voiceoverUrl: voiceover.customAudioUrl,
        };
      }
      if (character.imageData) {
        generated.character = character;
      }

      setConfig(generated);
      setJsonText(JSON.stringify(generated, null, 2));
      setJsonError(null);
      setGenerationNotice(`Berhasil generate video ${selectedDuration}s (${calculateTotalFrames(generated.scenes)} frames)`);

      // Reset player to frame 0
      if (playerRef.current) {
        playerRef.current.seekTo(0);
      }
    } catch (err) {
      console.error("Gagal generate video:", err);
      setGenerationNotice("Gagal generate video, periksa koneksi.");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationNotice(null), 4000);
    }
  };

  // Voice Test Function
  const handleTestVoice = () => {
    const testSentence = `Halo! Saya ${character.name}, siap membawakan video animasi untuk topik ${promptText.slice(0, 30)}.`;
    testSpeakVoice(testSentence, voiceover, availableVoices);
  };

  // Live JSON validation & update
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);

    try {
      const parsed = JSON.parse(text);
      const validated = VideoConfigSchema.parse(parsed);
      setConfig(validated);
      setJsonError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setJsonError(err.message);
      } else {
        setJsonError("Format JSON tidak valid");
      }
    }
  };

  const totalFrames = useMemo(() => calculateTotalFrames(config.scenes), [config.scenes]);
  const durationInSeconds = (totalFrames / (config.fps || 30)).toFixed(1);

  // Render command string
  const renderCommand = config.title.toLowerCase().includes("bojonegoro")
    ? "npx remotion render src/index.ts ReelsPadiBojonegoro out/bojonegoro-reels.mp4"
    : activeTemplate === "landscape"
      ? "npx remotion render src/index.ts MainVideoLandscape out/video.mp4"
      : "npx remotion render src/index.ts MainVideoShorts out/shorts.mp4";

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(renderCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick Prompt Presets
  const promptPresets = [
    {
      label: "🌾 Bojonegoro Juara 1 (VO Resmi)",
      text: "Bojonegoro Juara 1 Padi Jawa Timur 2026 - Rilis Resmi Data BPS Produksi 868.808 Ton Gabah",
      duration: 60 as AllowedDuration,
      onSelect: () => {
        setConfig(bojonegoroReelsVideo);
        setJsonText(JSON.stringify(bojonegoroReelsVideo, null, 2));
        setCharacter(bojonegoroReelsVideo.character);
        setVoiceover(bojonegoroReelsVideo.voiceover);
        setActiveTemplate("shorts");
      },
    },
    {
      label: "Bahaya Judi Online",
      text: "Edukasi bahaya judi online, dampak psikologis dan kerugian finansial drastis bagi pemuda",
      duration: 30 as AllowedDuration,
    },
    {
      label: "Promo Kopi Kekinian",
      text: "Peluncuran varian Cold Brew Kopi Susu Aren Gula Aren Alami diskon 50% minggu ini",
      duration: 30 as AllowedDuration,
    },
    {
      label: "AI Automation Deep Dive",
      text: "Bagaimana integrasi AI Agent dan otomatisasi workflow meningkatkan profitabilitas bisnis 300%",
      duration: 60 as AllowedDuration,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-emerald-500/20">R</div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              Animated Video Generator
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Remotion 4.0</span>
            </h1>
            <p className="text-xs text-slate-400">Prompt Bebas · 30s/60s/90s/120s · Karakter & Voiceover Dinamis</p>
          </div>
        </div>

        {/* Template Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 p-1 rounded-xl flex gap-1 border border-slate-700/60">
            <button onClick={() => handleSelectTemplate("landscape")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTemplate === "landscape" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-400 hover:text-white"}`}>
              16:9 Landscape (1920x1080)
            </button>
            <button onClick={() => handleSelectTemplate("shorts")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTemplate === "shorts" ? "bg-pink-600 text-white shadow-md shadow-pink-500/20" : "text-slate-400 hover:text-white"}`}>
              9:16 Shorts (1080x1920)
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1920px] mx-auto w-full">
        {/* Left / Center Column: Remotion Player Canvas */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
            {/* Player Container */}
            <div
              className="w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
              style={{
                maxWidth: activeTemplate === "landscape" ? "100%" : "380px",
                aspectRatio: `${config.width} / ${config.height}`,
              }}
            >
              <Player
                ref={playerRef}
                component={MainVideo}
                inputProps={config}
                durationInFrames={Math.max(1, totalFrames)}
                fps={config.fps || 30}
                compositionWidth={config.width}
                compositionHeight={config.height}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                controls
                autoPlay
                loop
              />
            </div>

            {/* Video Metrics Bar */}
            <div className="w-full mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
              <div className="flex items-center gap-4">
                <span>
                  Target: <strong className="text-emerald-400">{config.targetDurationSec || durationInSeconds}s</strong>
                </span>
                <span>
                  Total Frames: <strong className="text-emerald-400">{totalFrames}</strong>
                </span>
                <span>
                  Durasi: <strong className="text-emerald-400">{durationInSeconds}s</strong>
                </span>
                <span>
                  FPS: <strong className="text-slate-200">{config.fps}</strong>
                </span>
                <span>
                  Resolusi:{" "}
                  <strong className="text-slate-200">
                    {config.width}x{config.height}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Rendering Preview</span>
              </div>
            </div>
          </div>

          {/* Render Export Helper */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Remotion CLI Export Command</span>
              <code className="text-xs text-emerald-400 font-mono mt-1 select-all">{renderCommand}</code>
            </div>
            <button onClick={handleCopyCommand} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all shrink-0 active:scale-95">
              {copied ? "Tersalin ✓" : "Salin Perintah"}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Generator & Editor Tabs */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
          {/* Tabs Navigation */}
          <div className="bg-slate-900/80 p-1.5 rounded-2xl flex gap-1 border border-slate-800">
            <button onClick={() => setActiveTab("generator")} className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "generator" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-slate-400 hover:text-white"}`}>
              ✨ AI Generator
            </button>
            <button onClick={() => setActiveTab("scenes")} className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "scenes" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-slate-400 hover:text-white"}`}>
              🎬 Scenes ({config.scenes.length})
            </button>
            <button onClick={() => setActiveTab("json")} className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "json" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-slate-400 hover:text-white"}`}>
              ⚙ JSON Config
            </button>
          </div>

          {/* TAB 1: AI GENERATOR FORM */}
          {activeTab === "generator" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col gap-5 overflow-y-auto max-h-[750px]">
              {/* 1. Prompt Bebas */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>1. Prompt Bebas Video</span>
                  <span className="text-[11px] text-slate-500 font-normal">Topik, cerita, atau konsep animasi</span>
                </label>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Tuliskan topik video animasi secara bebas..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {promptPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setPromptText(preset.text);
                        setSelectedDuration(preset.duration);
                        if ("onSelect" in preset && typeof preset.onSelect === "function") {
                          preset.onSelect();
                        }
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
                    >
                      {preset.label} ({preset.duration}s)
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Pilihan Durasi Video (30s, 60s, 90s, 120s) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>2. Pilihan Durasi Video</span>
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    {selectedDuration}s ({selectedDuration * 30} frames)
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ALLOWED_DURATIONS.map((dur) => {
                    const isSelected = selectedDuration === dur;
                    const sceneCount = dur === 30 ? 5 : dur === 60 ? 8 : dur === 90 ? 10 : 12;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSelectedDuration(dur)}
                        className={`py-2.5 px-2 rounded-2xl text-center border transition-all flex flex-col items-center justify-center ${
                          isSelected ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <span className="text-sm font-extrabold">{dur}s</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">{sceneCount} Scenes</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Definisi Karakter (Input Gambar atau Teks Persona) */}
              <div className="flex flex-col gap-3 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span>3. Definisi Karakter Host</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Gambar / Teks</span>
                  </label>

                  {/* Character Mode Switcher (Image vs Text) */}
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() =>
                        setCharacter((prev) => ({
                          ...prev,
                          mode: "image",
                        }))
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${character.mode === "image" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      🖼️ Gambar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCharacter((prev) => ({
                          ...prev,
                          mode: "text-prompt",
                        }))
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${character.mode === "text-prompt" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      📝 Teks / Persona
                    </button>
                  </div>
                </div>

                {/* Sub-Panel: Mode Gambar */}
                {character.mode === "image" && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col gap-3">
                    <span className="text-[11px] font-semibold text-slate-300">Unggah Gambar Karakter (PNG / JPG / WebP)</span>

                    <div className="flex items-center gap-4">
                      {character.imageData || character.avatarUrl ? (
                        <div className="relative group">
                          <img src={character.imageData || character.avatarUrl} alt="Character" className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg" />
                          <button type="button" onClick={handleClearImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold shadow hover:bg-red-500" title="Hapus gambar">
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 text-[10px] text-center p-1">
                          <span>Belum ada gambar</span>
                        </div>
                      )}

                      <div className="flex-1 flex flex-col gap-1.5">
                        <input
                          ref={fileImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-500">Bisa gambar foto presenter, avatar 3D, atau ilustrasi karakter transparan</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Mode Teks & Persona */}
                {character.mode === "text-prompt" && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col gap-2.5">
                    <span className="text-[11px] font-semibold text-slate-300">Deskripsi Teks / Persona Karakter</span>
                    <textarea
                      value={character.textPrompt || ""}
                      onChange={(e) =>
                        setCharacter((prev) => ({
                          ...prev,
                          textPrompt: e.target.value,
                        }))
                      }
                      rows={2}
                      placeholder="Contoh: Robot AI ramah warna putih aksen cyan atau Pakar Keuangan berjas rapi..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                    />

                    {/* Preset Avatars */}
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Pilih Gaya Visual Avatar</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: "avatar-agent", label: "AI Agent" },
                          { id: "avatar-robot", label: "Robot Cyber" },
                          { id: "avatar-executive", label: "Executive" },
                          { id: "avatar-creative", label: "Creative" },
                        ].map((av) => (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() =>
                              setCharacter((prev) => ({
                                ...prev,
                                avatarType: av.id as AvatarType,
                              }))
                            }
                            className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all ${character.avatarType === av.id ? "bg-blue-600/30 border-blue-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"}`}
                          >
                            {av.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Character Name & Role Details */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Nama Karakter</span>
                    <input
                      type="text"
                      value={character.name}
                      onChange={(e) => setCharacter((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Alex Rivera"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Peran / Jabatan</span>
                    <input
                      type="text"
                      value={character.role}
                      onChange={(e) => setCharacter((prev) => ({ ...prev, role: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Presenter Utama"
                    />
                  </div>
                </div>

                {/* Presenter Overlay Position Selector */}
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1.5 font-semibold">Posisi Tampil Host di Video (Animated Presenter):</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { id: "corner-pip", label: "Sudut Kanan (PIP)" },
                      { id: "side-presenter", label: "Panggung Samping" },
                      { id: "center-stage", label: "Pusat Panggung" },
                      { id: "dialogue-card", label: "Kartu Dialog Saja" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          const updated = {
                            ...character,
                            overlayMode: mode.id as PresenterOverlayMode,
                          };
                          setCharacter(updated);
                          setConfig((prev) => ({ ...prev, character: updated }));
                        }}
                        className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${character.overlayMode === mode.id ? "bg-emerald-600/30 border-emerald-500 text-white font-bold" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Definisi Voice Over (Upload Sendiri atau TTS) */}
              <div className="flex flex-col gap-3 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span>4. Voice Over & Audio Narasi</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Audio Sendiri / TTS</span>
                  </label>

                  {/* Voiceover Source Switcher */}
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() =>
                        setVoiceover((prev) => ({
                          ...prev,
                          source: "custom-upload",
                        }))
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${voiceover.source === "custom-upload" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      🎙️ Audio Sendiri
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setVoiceover((prev) => ({
                          ...prev,
                          source: "tts-webspeech",
                        }))
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${voiceover.source !== "custom-upload" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      🗣️ Text-To-Speech
                    </button>
                  </div>
                </div>

                {/* Sub-Panel: Upload Voiceover Sendiri */}
                {voiceover.source === "custom-upload" && (
                  <div className="p-3.5 bg-slate-900/90 border border-purple-900/40 rounded-xl flex flex-col gap-3">
                    <span className="text-[11px] font-semibold text-purple-300">Unggah File Rekaman Voiceover Anda (MP3, WAV, M4A, AAC)</span>

                    <input
                      ref={fileAudioInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
                    />

                    {voiceover.customAudioUrl && (
                      <div className="flex flex-col gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-400 truncate max-w-[200px]">🎵 {voiceover.audioFileName || "voiceover-audio.mp3"}</span>
                          <span className="font-mono text-slate-400">{voiceover.audioDurationSec}s</span>
                        </div>

                        {/* Audio Preview Element */}
                        <audio src={voiceover.customAudioUrl} controls className="w-full h-8 mt-1" />

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (voiceover.audioDurationSec) {
                                let targetDur: AllowedDuration = 30;
                                if (voiceover.audioDurationSec > 105) targetDur = 120;
                                else if (voiceover.audioDurationSec > 75) targetDur = 90;
                                else if (voiceover.audioDurationSec > 45) targetDur = 60;
                                setSelectedDuration(targetDur);
                              }
                            }}
                            className="text-[11px] text-emerald-400 underline hover:text-emerald-300"
                          >
                            Sesuaikan Durasi Video ke Audio Ini ({voiceover.audioDurationSec}s)
                          </button>

                          <button type="button" onClick={handleClearAudio} className="text-[11px] text-red-400 underline hover:text-red-300">
                            Hapus Audio
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Panel: TTS Voiceover */}
                {voiceover.source !== "custom-upload" && (
                  <div className="flex flex-col gap-3 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Pilihan Suara (Voice Talent)</span>
                      <select value={voiceover.voiceName} onChange={(e) => setVoiceover((prev) => ({ ...prev, voiceName: e.target.value }))} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500">
                        {availableVoices.length > 0 ? (
                          availableVoices.map((v) => (
                            <option key={v.name} value={v.name}>
                              {v.name} ({v.lang})
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="id-ID-ArdiNeural">Bahasa Indonesia (Pria - Ardi)</option>
                            <option value="id-ID-GadisNeural">Bahasa Indonesia (Wanita - Gadis)</option>
                            <option value="en-US-GuyNeural">English (Guy Neural)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Kecepatan (Rate)</span>
                          <span className="font-mono text-emerald-400">{voiceover.rate}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="1.5"
                          step="0.05"
                          value={voiceover.rate}
                          onChange={(e) =>
                            setVoiceover((prev) => ({
                              ...prev,
                              rate: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Nada (Pitch)</span>
                          <span className="font-mono text-emerald-400">{voiceover.pitch}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="1.4"
                          step="0.05"
                          value={voiceover.pitch}
                          onChange={(e) =>
                            setVoiceover((prev) => ({
                              ...prev,
                              pitch: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>

                    <button type="button" onClick={handleTestVoice} className="self-start px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                      <span>🔊</span>
                      <span>Tes Suara Karakter</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 5. 9Router Configuration (Optional / Collapsible) */}
              <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/40">
                <button type="button" onClick={() => setShowRouterSettings(!showRouterSettings)} className="w-full px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white flex items-center justify-between text-left">
                  <span className="flex items-center gap-2">
                    <span>⚡</span> 9Router & Model Configuration
                  </span>
                  <span>{showRouterSettings ? "▲" : "▼"}</span>
                </button>

                {showRouterSettings && (
                  <div className="p-4 pt-1 border-t border-slate-800/80 flex flex-col gap-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">9Router Gateway URL</span>
                      <input type="text" value={routerUrl} onChange={(e) => setRouterUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono" placeholder="http://localhost:20128" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">9Router API Key (Optional)</span>
                      <input type="password" value={routerKey} onChange={(e) => setRouterKey(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono" placeholder="sk-..." />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">LLM Model</span>
                      <input
                        type="text"
                        value={routerModel}
                        onChange={(e) => setRouterModel(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                        placeholder="google/gemini-2.0-flash"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Status Notice Banner */}
              {generationNotice && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl font-medium flex items-center gap-2">
                  <span>✓</span>
                  <span>{generationNotice}</span>
                </div>
              )}

              {/* Main Action Button */}
              <button
                type="button"
                onClick={handleGenerateVideo}
                disabled={isGenerating || !promptText.trim()}
                className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide text-slate-950 shadow-2xl transition-all flex items-center justify-center gap-3 ${
                  isGenerating ? "bg-emerald-600/50 cursor-wait" : "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 hover:opacity-95 active:scale-[0.98] shadow-emerald-500/25"
                }`}
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Merender Skrip & Adegan Video...</span>
                  </>
                ) : (
                  <>
                    <span>🎬</span>
                    <span>GENERATE VIDEO ANIMASI ({selectedDuration} DETIK)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 2: SCENES TIMELINE PIPELINE */}
          {activeTab === "scenes" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Daftar Adegan ({config.scenes.length} Scenes)</span>
                <span className="text-emerald-400 font-mono text-xs font-bold">
                  Total: {totalFrames} frames ({durationInSeconds}s)
                </span>
              </div>

              <div className="flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1">
                {config.scenes.map((s, idx) => (
                  <div key={s.id} className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono font-bold flex items-center justify-center text-emerald-400 text-xs">{idx + 1}</span>
                        <span className="font-bold text-white">{s.title}</span>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">
                        {s.durationInFrames}f ({(s.durationInFrames / (config.fps || 30)).toFixed(1)}s)
                      </span>
                    </div>

                    {s.subtitle && <p className="text-[11px] text-slate-400 italic pl-8">{s.subtitle}</p>}

                    {s.voiceoverNarration && (
                      <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] text-slate-300 border border-slate-800 flex items-start gap-2">
                        <span className="text-xs">🎙</span>
                        <span className="leading-relaxed">{s.voiceoverNarration}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pl-8 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">{s.visualType}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">{s.typographyAnimation}</span>
                      {s.highlightWords && s.highlightWords.length > 0 && <span className="text-[10px] text-emerald-400">Tags: {s.highlightWords.join(", ")}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: JSON CONFIGURATION EDITOR */}
          {activeTab === "json" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">JSON Config Driven Specification</span>
                <button type="button" onClick={() => handleSelectTemplate(activeTemplate)} className="text-xs text-slate-400 hover:text-white underline">
                  Reset Default
                </button>
              </div>

              {jsonError && <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl font-mono">⚠ {jsonError}</div>}

              <textarea value={jsonText} onChange={handleJsonChange} spellCheck={false} rows={24} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-300/90 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

