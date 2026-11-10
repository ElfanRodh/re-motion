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

export interface CaptionChunk {
  a: number;
  b: number;
  text: string;
  hi?: string[];
}

export const CAPTIONS: CaptionChunk[] = [
  { a: 0.1, b: 2.3, text: "Bumi Angling Darma mencetak sejarah!", hi: ["sejarah!"] },
  { a: 2.8, b: 6.8, text: "Rilis data BPS per 2 November 2026 mencatat:", hi: ["bps", "2", "november", "2026"] },
  { a: 7.3, b: 9.4, text: "Kabupaten Bojonegoro jadi penghasil padi", hi: ["bojonegoro"] },
  { a: 9.4, b: 11.65, text: "nomor satu di Jawa Timur!", hi: ["satu"] },
  { a: 12.3, b: 15.0, text: "Secara nasional, Jawa Timur kembali kokoh", hi: ["jawa", "timur"] },
  { a: 15.0, b: 18.0, text: "sebagai produsen padi terbesar di Indonesia", hi: ["terbesar"] },
  { a: 18.0, b: 20.8, text: "dengan total 10,61 juta ton Gabah Kering Giling.", hi: ["10,61", "juta", "ton"] },
  { a: 21.2, b: 24.0, text: "Dan penopang terbesarnya, ada di Bojonegoro!", hi: ["bojonegoro!"] },
  { a: 24.4, b: 27.2, text: "Dengan luas panen 159 ribu hektar,", hi: ["159", "ribu", "hektar,"] },
  { a: 27.55, b: 30.6, text: "Bojonegoro memimpin di puncak", hi: ["bojonegoro", "puncak"] },
  { a: 30.6, b: 33.8, text: "dengan torehan 868.808 ton gabah!", hi: ["868.808", "ton"] },
  { a: 34.3, b: 37.3, text: "Kalau dikonversi jadi beras siap konsumsi,", hi: ["beras"] },
  { a: 37.3, b: 39.9, text: "Bojonegoro menyuplai lebih dari 501 ribu ton beras", hi: ["501", "ribu", "ton"] },
  { a: 39.9, b: 41.95, text: "untuk kebutuhan pangan masyarakat.", hi: ["pangan"] },
  { a: 42.4, b: 44.7, text: "Bukti nyata kerja keras petani", hi: ["petani"] },
  { a: 44.7, b: 47.15, text: "dan sinergi pemerintah menjaga kedaulatan pangan.", hi: ["kedaulatan", "pangan."] },
  { a: 47.6, b: 49.3, text: "Matur nuwun petani Bojonegoro!", hi: ["matur", "nuwun"] },
  { a: 49.7, b: 51.75, text: "Wong Bojonegoro, bangga nggak nih?", hi: ["bangga"] },
  { a: 52.1, b: 53.3, text: "Tulis di komentar!", hi: ["komentar!"] },
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

