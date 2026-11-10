# Animated Video Generator (Remotion + React + TypeScript + Tailwind)

Aplikasi pembuatan video motion graphics dinamis berbasis data skrip (JSON-driven) menggunakan Remotion 4.x, React, TypeScript, dan Tailwind CSS.

---

## 🚀 Fitur Utama

1. **Prompt Bebas & AI Video Generator**:
   - Mendukung input prompt bebas (edukasi, promo, explainer, dsb.).
   - Pilihan durasi presisi: **30s (5 scenes / 900 frames)**, **60s (8 scenes / 1800 frames)**, **90s (10 scenes / 2700 frames)**, dan **120s (12 scenes / 3600 frames)**.
   - Terintegrasi dengan gateway **9Router (Gemini Flash)** serta dilengkapi _procedural generator fallback_ cerdas saat offline.
2. **Karakter & Host Kustom**:
   - Definisi nama karakter, peran/jabatan, dan badge status.
   - Pilihan avatar: _AI Agent_, _Cyber Robot_, _Executive_, _Creative_, atau _Custom URL_.
   - Komponen avatar reaktif dengan animasi ekspresi dan breathing Remotion.
3. **Voice Over Dinamis & Audio Sync**:
   - Narasi suara per adegan otomatis dihasilkan berdasarkan topik dan persona karakter.
   - Integrasi Web Speech API (preview suara langsung di browser) & 9Router TTS.
   - Slider pengaturan kecepatan (_rate_) dan nada (_pitch_) beserta tombol "Tes Suara".
4. **Dynamic JSON-Driven Composition**: Setiap adegan (scene), durasi, tipografi, transisi, dan visual dikontrol secara dinamis via skrip JSON yang tervalidasi skema Zod.
5. **Remotion Motion Primitives**:
   - `spring()` physics-based animation (bouncing, smooth scale, damping).
   - `interpolate()` dengan kurva easing halus (`Easing.out(Easing.cubic)`).
   - Sinkronisasi mutlak frame-by-frame (bebas dari race-condition CSS `@keyframes`).
6. **Kinetic Typography Engine**:
   - `pop-in` (spring scale with bounce)
   - `typewriter` (karakter per frame dengan kursor kedip)
   - `word-by-word` (staggered word reveal berurutan)
   - `fade-slide` (subtle smooth entrance)
7. **Scene Visual Types**:
   - `text-highlight`: kinetic headline dengan highlight kata kunci dan call-to-action.
   - `illustration`: SVG motion graphics prosedural (Quantum AI core) tanpa ketergantungan aset eksternal.
   - `chart`: animated bar progress metrics dengan kalkulasi counter numerik dinamis.
   - `avatar-dialog`: kartu percakapan pembicara dengan speech bubble.
8. **Smooth Scene Transitions**: Slide, Fade, Zoom Blur, dan Scale Bounce.
9. **Audio Layering**: Fade-in / fade-out background music (BGM) otomatis dan layer voiceover.
10. **Resolusi Multiformat**:

- 16:9 Landscape (1920x1080 @ 30 FPS)
- 9:16 Shorts/Reels/TikTok (1080x1920 @ 30 FPS)

11. **Interactive Web UI**: Preview instan menggunakan `@remotion/player` dengan editor JSON langsung di browser.

---

## 📁 Struktur Direktori

```text
├── index.html                  # HTML entry point untuk web preview
├── package.json                # Project dependencies & scripts
├── remotion.config.ts          # Konfigurasi Remotion CLI / rendering
├── tailwind.config.js          # Styling konfigurasi Tailwind
├── tsconfig.json               # Konfigurasi TypeScript
├── vite.config.ts              # Konfigurasi Vite dev server
└── src/
    ├── index.ts                # Entry point registrasi Remotion (registerRoot)
    ├── Root.tsx                # Remotion Root compositions (Landscape & Shorts)
    ├── main.tsx                # React DOM entry point
    ├── app/
    │   └── App.tsx             # Interactive Web UI + Remotion Player
    ├── compositions/
    │   ├── MainVideo.tsx       # Komposisi utama (Series-based scenes pipeline)
    │   └── sampleData.ts       # Presets video (Landscape & Shorts)
    ├── components/
    │   ├── audio/
    │   │   └── AudioLayer.tsx  # Dynamic BGM fade & Voiceover
    │   ├── common/
    │   │   └── BackgroundGradient.tsx # Ambient lighting & grid lines
    │   ├── scenes/
    │   │   ├── AvatarDialogScene.tsx
    │   │   ├── ChartScene.tsx
    │   │   ├── IllustrationScene.tsx
    │   │   ├── SceneRenderer.tsx
    │   │   └── TextHighlightScene.tsx
    │   ├── transitions/
    │   │   └── SceneTransition.tsx
    │   └── typography/
    │       └── KineticText.tsx
    ├── styles/
    │   └── globals.css
    └── types/
        └── schema.ts           # Zod Schema & TypeScript interfaces
```

---

## 🛠️ Cara Menjalankan

### 1. Install Dependensi

```bash
npm install
```

### 2. Jalankan Web UI Player Preview

```bash
npm run dev
```

Akses di browser: `http://localhost:3000`

### 3. Jalankan Remotion Studio Standalone

```bash
npm run preview
```

### 4. Render Video ke MP4 (Headless Chromium)

- **Render Video Reels Bojonegoro (9:16 Vertikal + Voice Over Asli)**:
  ```bash
  npm run render:bojonegoro
  ```
- **Format 16:9 Landscape (1920x1080)**:
  ```bash
  npm run render
  ```
- **Format 9:16 Shorts / Reels**:
  ```bash
  npm run render:shorts
  ```
  Hasil video akan otomatis disimpan ke folder `out/`.

