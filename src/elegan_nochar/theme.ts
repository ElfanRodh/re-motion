import React from "react";
import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const TOTAL_SEC = 56;
export const TOTAL_FRAMES = TOTAL_SEC * FPS;

/** Palet terbatas: hijau sawah + emas padi, terakota hanya untuk fokus "Bojonegoro". */
export const C = {
  cream: "#F5EFE2",
  paper: "#FBF7EC",
  sand: "#E6D9BD",
  sandShade: "#D6C6A3",
  deep: "#17382C",
  forest: "#24533F",
  leaf: "#3F7A55",
  mid: "#7FA67C",
  sage: "#A8C3A0",
  sagePale: "#D5E1CC",
  water: "#D7E4E0",
  gold: "#D8A23A",
  goldPale: "#F0D58A",
  terra: "#C25B34",
  ink: "#1E2B25",
  muted: "#5E6B62",
  skyDawn: "#F4E3BA",
  skyDay: "#EAEFE0",
  skyMill: "#F1E8D3",
  skyGold: "#F2D9A6",
};

export const FONT =
  '"Bahnschrift","Segoe UI","Helvetica Neue",Arial,sans-serif';

/** Batas scene, disesuaikan dengan jeda napas pada voice-over (vo_audio.mp3, 53,2 dtk). */
export const SCENES = [
  { start: 0, end: 7.3 },
  { start: 7.3, end: 21.0 },
  { start: 21.0, end: 33.9 },
  { start: 33.9, end: 42.2 },
  { start: 42.2, end: TOTAL_SEC },
];

export const sceneIndexAt = (t: number) => {
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (t >= SCENES[i].start) return i;
  }
  return 0;
};

export type CaptionPlacement = "top" | "upper-mid" | "center" | "lower-mid" | "bottom";

export interface CaptionChunk {
  a: number;
  b: number;
  text: string;
  hi?: string[];
  placement?: CaptionPlacement;
  customTop?: number;
  theme?: "dark" | "light"; // dark = teks gelap di pill terang, light = teks terang di pill gelap
}

/**
 * Daftar takarir dengan penempatan dinamis kontekstual:
 * - Tidak terpaku di bawah
 * - Berpindah posisi secara adaptif: ATAS (235px), TENGAH (880px), atau BAWAH (1260-1560px)
 * - Bebas dari tabrakan visual dengan kartu & grafik
 */
export const CAPTIONS: CaptionChunk[] = [
  // Scene 1: Hook pembuka
  {
    a: 0.1,
    b: 2.3,
    text: "Bumi Angling Darma mencetak sejarah!",
    hi: ["sejarah!"],
    customTop: 880, // Kinetic hook di TENGAH sebelum medali/judul mengembang
    theme: "light",
  },
  {
    a: 2.8,
    b: 6.8,
    text: "Rilis data BPS per 2 November 2026 mencatat:",
    hi: ["bps", "2", "november", "2026"],
    customTop: 1560, // Di BAWAH, memberi ruang penuh pada kartu data BPS di tengah
    theme: "light",
  },

  // Scene 2: Peta Jatim & Data Nasional
  {
    a: 7.3,
    b: 9.4,
    text: "Kabupaten Bojonegoro jadi penghasil padi",
    hi: ["bojonegoro"],
    customTop: 235, // Di ATAS peta (Laut Jawa)
    theme: "dark",
  },
  {
    a: 9.4,
    b: 11.65,
    text: "nomor satu di Jawa Timur!",
    hi: ["satu"],
    customTop: 1260, // Mengambang di BAWAH kartu sorotan Bojonegoro
    theme: "light",
  },
  {
    a: 12.3,
    b: 15.0,
    text: "Secara nasional, Jawa Timur kembali kokoh",
    hi: ["jawa", "timur"],
    customTop: 235, // Di ATAS peta
    theme: "dark",
  },
  {
    a: 15.0,
    b: 18.0,
    text: "sebagai produsen padi terbesar di Indonesia",
    hi: ["terbesar"],
    customTop: 235, // Di ATAS peta
    theme: "dark",
  },
  {
    a: 18.0,
    b: 20.8,
    text: "dengan total 10,61 juta ton Gabah Kering Giling.",
    hi: ["10,61", "juta", "ton"],
    customTop: 1560, // Di BAWAH panel data nasional
    theme: "light",
  },

  // Scene 3: Penopang & Luas Panen & Klasemen
  {
    a: 21.2,
    b: 24.0,
    text: "Dan penopang terbesarnya, ada di Bojonegoro!",
    hi: ["bojonegoro!"],
    customTop: 1360, // Di BAWAH donut chart 8,19%
    theme: "light",
  },
  {
    a: 24.4,
    b: 27.2,
    text: "Dengan luas panen 159 ribu hektar,",
    hi: ["159", "ribu", "hektar,"],
    customTop: 1560, // Di BAWAH tanah sawah saat harvester bergerak
    theme: "light",
  },
  {
    a: 27.55,
    b: 30.6,
    text: "Bojonegoro memimpin di puncak",
    hi: ["bojonegoro", "puncak"],
    customTop: 235, // Di ATAS podium klasemen
    theme: "dark",
  },
  {
    a: 30.6,
    b: 33.8,
    text: "dengan torehan 868.808 ton gabah!",
    hi: ["868.808", "ton"],
    customTop: 1560, // Di BAWAH podium klasemen
    theme: "light",
  },

  // Scene 4: Penggilingan Gabah ke Beras
  {
    a: 34.3,
    b: 37.3,
    text: "Kalau dikonversi jadi beras siap konsumsi,",
    hi: ["beras"],
    customTop: 235, // Di ATAS gedung pabrik
    theme: "dark",
  },
  {
    a: 37.3,
    b: 39.9,
    text: "Bojonegoro menyuplai lebih dari 501 ribu ton beras",
    hi: ["501", "ribu", "ton"],
    customTop: 1560, // Di BAWAH kompleks pabrik
    theme: "light",
  },
  {
    a: 39.9,
    b: 41.95,
    text: "untuk kebutuhan pangan masyarakat.",
    hi: ["pangan"],
    customTop: 1560, // Di BAWAH diagram rendemen
    theme: "light",
  },

  // Scene 5: Apresiasi Petani & Outro
  {
    a: 42.4,
    b: 44.7,
    text: "Bukti nyata kerja keras petani",
    hi: ["petani"],
    customTop: 235, // Di ATAS headline bukti nyata
    theme: "dark",
  },
  {
    a: 44.7,
    b: 47.15,
    text: "dan sinergi pemerintah menjaga kedaulatan pangan.",
    hi: ["kedaulatan", "pangan."],
    customTop: 1480, // Di BAWAH 4 kartu statistik
    theme: "light",
  },
  {
    a: 47.6,
    b: 49.3,
    text: "Matur nuwun petani Bojonegoro!",
    hi: ["matur", "nuwun"],
    customTop: 1480, // Di BAWAH 4 kartu statistik
    theme: "light",
  },
  {
    a: 49.7,
    b: 51.75,
    text: "Wong Bojonegoro, bangga nggak nih?",
    hi: ["bangga"],
    customTop: 1460, // Di BAWAH tombol komentar CTA
    theme: "light",
  },
  {
    a: 52.1,
    b: 53.3,
    text: "Tulis di komentar!",
    hi: ["komentar!"],
    customTop: 1460, // Di BAWAH tombol komentar CTA
    theme: "light",
  },
];

export const isSpeaking = (t: number) =>
  CAPTIONS.some((c) => t >= c.a && t <= c.b);

/* ---------- easing & helper ---------- */
export const eo = Easing.bezier(0.22, 1, 0.36, 1);
export const eio = Easing.bezier(0.65, 0, 0.35, 1);

export const prog = (
  t: number,
  a: number,
  b: number,
  e: (x: number) => number = eo
) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: e,
  });

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Format angka gaya Indonesia: 868.808 / 159,19 */
export const fmtInt = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const fmtDec = (n: number, d = 2) =>
  n.toFixed(d).replace(".", ",");

/* ---------- konteks waktu absolut (detik) ---------- */
export const TimeCtx = React.createContext(0);
export const useT = () => React.useContext(TimeCtx);
