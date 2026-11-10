import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const TOTAL_SEC = 56;
export const TOTAL_FRAMES = TOTAL_SEC * FPS;

/**
 * Palet warna Flat Vector Editorial:
 * Terdiri dari 2-3 tonal planes per tema (base, shadow, highlight)
 * tanpa photoreal gradients atau AI artifacts.
 */
export const C = {
  // Latar dan Kertas
  cream: "#F8F5EE",
  paper: "#FDFBF7",
  cardBg: "#FFFFFF",
  cardBorder: "rgba(20, 40, 32, 0.08)",

  // Hijau Pertanian & Hutan
  deep: "#142820",
  forest: "#204636",
  leaf: "#3A6E4F",
  sage: "#8CAE84",
  sagePale: "#D3E2CD",
  water: "#D6E5DF",

  // Emas Padi & Gabah
  gold: "#D99D26",
  goldDark: "#B8801C",
  goldPale: "#F6DC8A",
  goldBright: "#FACC15",

  // Aksen Terakota Bojonegoro Juara
  terra: "#D1552C",
  terraDark: "#A93F1C",
  terraPale: "#F8D4C7",

  // Teks & Muted
  ink: "#111C16",
  muted: "#5B6C62",
  subtle: "#8A9990",

  // Langit per Scene
  skyDawn: "#F4E5C6",
  skyDay: "#EBF2E8",
  skyField: "#E8EFE5",
  skyMill: "#F2EADB",
  skyGold: "#F2DCB3",
};

export const FONT =
  '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/**
 * Batas 5 Scene sesuai jeda napas naskah Voice-Over (53,2 detik)
 */
export const SCENES = [
  { start: 0.0, end: 7.3, name: "Capaian & Hook" },
  { start: 7.3, end: 21.0, name: "Peta Jatim & Nasional" },
  { start: 21.0, end: 33.9, name: "Bojonegoro Juara Jatim" },
  { start: 33.9, end: 42.2, name: "Konversi Beras Konsumsi" },
  { start: 42.2, end: TOTAL_SEC, name: "Apresiasi & Interaksi" },
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
  { a: 9.4, b: 11.65, text: "nomor satu di Jawa Timur!", hi: ["satu", "jawa", "timur!"] },
  { a: 12.3, b: 15.0, text: "Secara nasional, Jawa Timur kembali kokoh", hi: ["jawa", "timur"] },
  { a: 15.0, b: 18.0, text: "sebagai produsen padi terbesar di Indonesia", hi: ["terbesar", "indonesia"] },
  { a: 18.0, b: 20.8, text: "dengan total 10,61 juta ton Gabah Kering Giling.", hi: ["10,61", "juta", "ton"] },
  { a: 21.2, b: 24.0, text: "Dan penopang terbesarnya, ada di Bojonegoro!", hi: ["penopang", "terbesarnya,", "bojonegoro!"] },
  { a: 24.4, b: 27.2, text: "Dengan luas panen 159 ribu hektar,", hi: ["159", "ribu", "hektar,"] },
  { a: 27.55, b: 30.6, text: "Bojonegoro memimpin di puncak", hi: ["bojonegoro", "puncak"] },
  { a: 30.6, b: 33.8, text: "dengan torehan 868.808 ton gabah!", hi: ["868.808", "ton"] },
  { a: 34.3, b: 37.3, text: "Kalau dikonversi jadi beras siap konsumsi,", hi: ["beras", "konsumsi,"] },
  { a: 37.3, b: 39.9, text: "Bojonegoro menyuplai lebih dari 501 ribu ton beras", hi: ["501", "ribu", "ton"] },
  { a: 39.9, b: 41.95, text: "untuk kebutuhan pangan masyarakat.", hi: ["pangan", "masyarakat."] },
  { a: 42.4, b: 44.7, text: "Bukti nyata kerja keras petani", hi: ["petani"] },
  { a: 44.7, b: 47.15, text: "dan sinergi pemerintah menjaga kedaulatan pangan.", hi: ["kedaulatan", "pangan."] },
  { a: 47.6, b: 49.3, text: "Matur nuwun petani Bojonegoro!", hi: ["matur", "nuwun", "petani", "bojonegoro!"] },
  { a: 49.7, b: 51.75, text: "Wong Bojonegoro, bangga nggak nih?", hi: ["bangga"] },
  { a: 52.1, b: 53.3, text: "Tulis di komentar!", hi: ["tulis", "komentar!"] },
];

export const isSpeaking = (t: number) =>
  CAPTIONS.some((c) => t >= c.a && t <= c.b);

/* ---------- Easing & Interpolasi Helpers ---------- */
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

export const fmtInt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const fmtDec = (n: number, d = 2) =>
  n.toLocaleString("id-ID", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

