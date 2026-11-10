# Panduan Perintah (Prompt) & Kode Remotion: Infografis Padi Bojonegoro (Sinkron Voiceover)

Dokumen ini berisi **Master Prompt Remotion (Full Voiceover-Synced)**, **Tabel Cue Sheet Detik-demi-Detik**, **Prompt Modular per Elemen**, **Kode Komponen `VoiceoverCue` (`.tsx`)**, serta **Perintah CLI Remotion** agar setiap kartu, grafik, traktor, pabrik, dan tombol CTA muncul serta menyorot satu per satu tepat mengikuti kalimat narator (*voiceover*).

## 1. Evaluasi Visual Video Saat Ini & Titik Peningkatan

Berdasarkan struktur video saat ini (durasi 60 detik, rasio vertikal 9:16), ada lima area utama yang membuat tampilan terasa statis dan belum menyatu penuh dengan narasi suara:

| Komponen Video Saat Ini | Masalah Utama | Solusi Dinamis & Sinkron Voiceover di Remotion |
| :--- | :--- | :--- |
| **Kemunculan Elemen vs. Narasi** | Semua kartu dalam satu *scene* langsung tampil di detik pertama, meskipun narator baru menyebutkan datanya 4–8 detik kemudian. | Gunakan `<Sequence from={secToFrame(detik)}>` dan *hook* `useVoiceoverCue()` / `<VoiceoverCueCard />` agar tiap kartu muncul/menyorot tepat saat diucapkan narator. |
| **Transisi Antar-Scene** | Perpindahan *hard-cut* mendadak di detik 00:08, 00:20, 00:33, dan 00:44. | Gunakan `@remotion/transitions` (`TransitionSeries`) dengan efek `slide()`, `fade()`, dan *zoom-through* berbasis *spring*. |
| **Kamera & Latar Belakang** | Latar biru tua statis dan kamera terkunci (`scale(1)`). | Tambahkan *slow camera push* (`scale: 1 -> 1.04`), *ambient glow* bergerak, dan partikel bulir padi emas melayang. |
| **Ilustrasi Vektor Tengah** | Padi, peta, traktor, dan pabrik bergerak tanpa memedulikan fokus kalimat narator. | Picu *zoom* peta Bojonegoro, jalannya traktor, keluarnya karung beras, dan kilau medali tepat pada *timestamp* kata kunci narator. |
| **Outro Scene 5 (00:48–01:00)** | Banner CTA sudah muncul sejak detik 00:44 dan layar membeku di detik 00:48–01:00. | Munculkan banner CTA baru pada detik 00:50 saat narator berkata *"Wong Bojonegoro, bangga nggak nih?"*, diikuti *pulse* ritmis sampai 01:00. |

## 2. Tabel Cue Sheet: Sinkronisasi Animasi Satu per Satu dengan Voiceover

Tabel berikut memetakan waktu ucap narator pada video Anda ke pemicu animasi Remotion secara presisi:

| Scene & Rentang Waktu | Detik Voiceover | Kalimat Narator (Voiceover) | Animasi Elemen yang Dipicu Satu per Satu |
| :--- | :--- | :--- | :--- |
| **Scene 1 (00:00–00:08)** | `00:00.0` | *"Bumi Angling Darma..."* | Badge `PRODUSEN PADI #1 JAWA TIMUR` & judul `BOJONEGORO JUARA 1 PADI JAWA TIMUR` turun dengan *spring*. |
| **Scene 1 (00:00–00:08)** | `00:01.2` | *"...mencetak sejarah!"* | Kartu tengah `868.808 Ton` + matahari & bukit padi melakukan *pop-in*; angka mulai menghitung naik. |
| **Scene 1 (00:00–00:08)** | `00:03.0` | *"Rilis data BPS per 2 November 2026..."* | Teks `Data Badan Pusat Statistik · Rilis 2 November 2026` menyala dengan sapuan cahaya emas. |
| **Scene 1 (00:00–00:08)** | `00:04.2–00:06.5` | *"...mencatat:"* | 4 kartu bawah muncul satu per satu tiap 0,5 detik: `159.190 Ha` (`00:04.2`) → `501.670 Ton` (`00:04.7`) → `8,19%` (`00:05.2`) → `10,61 Jt T` (`00:05.7`). |
| **Scene 2 (00:08–00:20)** | `00:08.0–00:11.5` | *"Kabupaten Bojonegoro jadi penghasil padi nomor satu di Jawa Timur!"* | Peta Jawa Timur muncul lebih dulu, melakukan *zoom-in* ke Bojonegoro dengan *radar pulse* oranye & pin `#1 KAB. BOJONEGORO` tepat di `00:09.5`. |
| **Scene 2 (00:08–00:20)** | `00:12.0–00:16.0` | *"Secara nasional, Jawa Timur kembali kokoh sebagai produsen padi terbesar di Indonesia..."* | Judul `JAWA TIMUR JUARA 1 NASIONAL` menyala, kartu grafik 4 provinsi muncul, dan batang tumbuh berurutan (Sulsel → Jabar → Jateng → Jawa Timur). |
| **Scene 2 (00:08–00:20)** | `00:16.5–00:19.8` | *"...dengan total 10,61 juta ton Gabah Kering Giling."* | Angka utama `10,61 Juta Ton` membesar (*spotlight pulse*), diikuti munculnya 3 sub-kartu (`1,85 Jt Ha` → `6,12 Jt Ton` → `57,45 Jt Ton`) satu per satu. |
| **Scene 3 (00:20–00:33)** | `00:20.0–00:23.5` | *"Dan penopang terbesarnya, ada di Bojonegoro!"* | Header `KABUPATEN BOJONEGORO` & sub-kartu `KONTRIBUSI 8,19%` muncul dan berkilau. |
| **Scene 3 (00:20–00:33)** | `00:24.0–00:26.8` | *"Dengan luas panen 159 ribu hektar,"* | Sub-kartu `LUAS PANEN 159.190 Ha` menyorot emas (`scale 1.1`), dan traktor *combine harvester* mulai jalan memanen padi sambil menyemburkan bulir gabah. |
| **Scene 3 (00:20–00:33)** | `00:27.0–00:32.5` | *"Bojonegoro memimpin di puncak dengan torehan 868.808 ton gabah!"* | Kartu Klasemen muncul; bar Jember, Ngawi, dan Lamongan terisi dulu (`00:27.2`), lalu bar Bojonegoro `868.808 Ton` menyalip ke puncak di `00:29.0` + badge `Unggul +16.616 Ton` muncul di `00:30.5`. |
| **Scene 4 (00:33–00:44)** | `00:33.0–00:36.5` | *"Kalau dikonversi jadi beras siap konsumsi,"* | Header muncul, disusul kartu pabrik penggilingan; `SILO GABAH`, konveyor `RENDEMEN 57,74%`, dan kartu `BAHAN GABAH 868.808 Ton` aktif berurutan. |
| **Scene 4 (00:33–00:44)** | `00:36.8–00:41.5` | *"Bojonegoro menyuplai lebih dari 501 ribu ton beras untuk kebutuhan pangan masyarakat."* | Angka `501.670 Ton Beras` melakukan *pop-up* tepat saat kata *"501 ribu ton"* (`00:37.2`), 3 karung beras muncul satu per satu di pabrik, lalu bar perbandingan & 2 kartu bawah muncul berurutan (`00:39.0–00:40.5`). |
| **Scene 5 (00:44–01:00)** | `00:44.0–00:46.8` | *"Bukti nyata kerja keras petani dan sinergi pemerintah menjaga kedaulatan pangan."* | Subjudul sinergi & medali `PERINGKAT #1 JAWA TIMUR` muncul, diikuti 4 kartu ringkasan bawah yang muncul satu per satu (`00:45.0`, `00:45.5`, `00:46.0`, `00:46.5`). |
| **Scene 5 (00:44–01:00)** | `00:47.0–00:49.5` | *"Matur nuwun petani Bojonegoro!"* | Judul `MATUR NUWUN PETANI BOJONEGORO!` melakukan *hero bounce* + semburan konfeti emas dari medali juara. |
| **Scene 5 (00:44–01:00)** | `00:49.8–01:00.0` | *"Wong Bojonegoro, bangga nggak nih? Tulis di komentar!"* | Banner CTA `WONG BOJONEGORO, BANGGA? TULIS DI KOMENTAR!` baru meluncur masuk di detik `00:50.0` dengan pantulan *spring*, lalu berdenyut ritmis selama musik penutup sampai `01:00`. |

## 3. Master Prompt Remotion Lengkap (Sudah Termasuk Sinkronisasi Voiceover Satu per Satu)

Salin seluruh blok perintah di bawah ini ke AI editor Anda (Cursor / Claude / Windsurf) untuk menerapkan animasi dinamis sekaligus sinkronisasi *voiceover* detik-demi-detik:

```text
Tolong refactor dan tingkatkan kode komposisi Remotion video infografis vertikal (1080x1920, durasi 60 detik) tentang "Bojonegoro Juara 1 Padi Jawa Timur (Data BPS Rilis 2 November 2026)" agar setiap elemen muncul dan menyorot SATU PER SATU tepat mengikuti kalimat narator (voiceover), memiliki transisi antar-scene yang mulus, serta memiliki continuous/idle motion agar layar tidak pernah mati.

Gunakan fungsi bantu `const sec = (s: number) => Math.round(s * fps)` agar seluruh timing animasi di bawah ini presisi pada satuan detik berapapun nilai fps komposisi:

1. ATURAN SINKRONISASI VOICEOVER SATU PER SATU (CUE-BY-CUE TIMELINE):

- SCENE 1 (00:00 - 00:08):
  * Detik 0.0 ("Bumi Angling Darma..."): Munculkan badge "PRODUSEN PADI #1 JAWA TIMUR" dan judul "BOJONEGORO JUARA 1 PADI JAWA TIMUR" dengan spring slide dari atas.
  * Detik 1.2 ("...mencetak sejarah!"): Munculkan kartu tengah "TOTAL PRODUKSI GABAH KERING GILING" + ilustrasi matahari berputar & bukit padi, lalu jalankan counter menuju "868.808 Ton" beserta pop-in badge "PERINGKAT #1 JATIM".
  * Detik 3.0 ("Rilis data BPS per 2 November 2026..."): Berikan efek highlight glow emas menyapu teks subjudul "Data Badan Pusat Statistik · Rilis 2 November 2026".
  * Detik 4.2 - 6.5 ("...mencatat:"): Munculkan 4 kartu bawah SATU PER SATU secara berurutan dengan spring:
    - Detik 4.2: Kartu "LUAS PANEN 2026: 159.190 Ha"
    - Detik 4.7: Kartu "BERAS KONSUMSI: 501.670 Ton"
    - Detik 5.2: Kartu "PORSI JAWA TIMUR: 8,19 %"
    - Detik 5.7: Kartu "PRODUKSI JATIM (RI): 10,61 Jt T"

- SCENE 2 (00:08 - 00:20, waktu lokal scene 0.0s - 12.0s):
  * Detik global 8.0 / lokal 0.0s ("Kabupaten Bojonegoro jadi penghasil padi nomor satu di Jawa Timur!"): Munculkan header atas dan langsung fokuskan animasi pada kartu tengah "PETA LUMBUNG PANGAN PROVINSI JAWA TIMUR". Pada detik 9.5 (lokal 1.5s, tepat saat kata "nomor satu di Jawa Timur"), lakukan animasi zoom-in halus ke wilayah Bojonegoro berwarna oranye, aktifkan lingkaran radar pulse berulang, dan munculkan tooltip "#1 KAB. BOJONEGORO 868.808 Ton GKG (8,19% Jatim)" diikuti legend kabupaten di bawah peta satu per satu pada detik 10.5 (lokal 2.5s).
  * Detik global 12.0 / lokal 4.0s ("Secara nasional, Jawa Timur kembali kokoh sebagai produsen padi terbesar di Indonesia..."): Munculkan kartu bawah "4 BESAR PROVINSI PENGHASIL PADI DI INDONESIA (GKG)". Tumbuhkan ke-4 batang grafik SATU PER SATU dengan jeda 0.35 detik (Sulsel 5,42 Jt -> Jabar 8,62 Jt -> Jateng 8,89 Jt -> Jawa Timur 10,61 Jt berwarna oranye menyala + badge "Jatim Sumbang 18,5% RI").
  * Detik global 16.5 / lokal 8.5s ("...dengan total 10,61 juta ton Gabah Kering Giling."): Berikan efek spotlight bounce (`scale: 1 -> 1.1 -> 1` + kilau emas) pada angka raksasa "10,61 Juta Ton" di bagian atas, lalu munculkan 3 sub-kartu di bawahnya satu per satu pada detik 17.2 ("LUAS PANEN JATIM 1,85 Jt Ha"), detik 17.8 ("BERAS JATIM 6,12 Jt Ton"), dan detik 18.4 ("TOTAL NASIONAL 57,45 Jt Ton").

- SCENE 3 (00:20 - 00:33, waktu lokal scene 0.0s - 13.0s):
  * Detik global 20.0 / lokal 0.0s ("Dan penopang terbesarnya, ada di Bojonegoro!"): Munculkan badge "JUARA 1 JAWA TIMUR", judul "KABUPATEN BOJONEGORO", angka utama "868.808 Ton", dan sorot sub-kartu kanan "KONTRIBUSI: 8,19%" pada detik 21.8 (lokal 1.8s).
  * Detik global 24.0 / lokal 4.0s ("Dengan luas panen 159 ribu hektar,"): Munculkan dan sorot sub-kartu kiri "LUAS PANEN: 159.190 Ha" & "PRODUKTIVITAS: 5,46 Ton/Ha" dengan border emas menyala, sekaligus munculkan kartu ilustrasi tengah di mana traktor combine harvester mulai berjalan memanen padi dari kiri ke kanan dengan roda berputar dan partikel gabah emas berhamburan.
  * Detik global 27.0 / lokal 7.0s ("Bojonegoro memimpin di puncak dengan torehan 868.808 ton gabah!"): Munculkan kartu bawah "KLASEMEN PRODUSEN PADI JAWA TIMUR (GKG)". Isi bar peringkat 4 (Jember 642.150 Ton), peringkat 3 (Ngawi 768.307 Ton), dan peringkat 2 (Lamongan 852.192 Ton) lebih dulu pada detik 27.3 - 28.5, lalu tepat pada detik 29.0 (lokal 9.0s, saat narator menyebut "868.808 ton gabah!"), luncurkan bar #1 Kabupaten Bojonegoro menyalip ke puncak dengan glow oranye-emas dan pop-up badge "Unggul +16.616 Ton dari Peringkat #2" pada detik 30.5.

- SCENE 4 (00:33 - 00:44, waktu lokal scene 0.0s - 11.0s):
  * Detik global 33.0 / lokal 0.0s ("Kalau dikonversi jadi beras siap konsumsi,"): Munculkan header "SUPLAI PANGAN MASYARAKAT", sub-kartu "BAHAN GABAH (GKG): 868.808 Ton", sub-kartu "RENDEMEN BERAS: 57,74%", serta kartu tengah "FASILITAS PENGGILINGAN & PENGEMASAN BERAS MODERN" dengan animasi aliran gabah berjalan dari "SILO GABAH" melewati konveyor menuju mesin "PENGGILINGAN MODERN".
  * Detik global 36.8 / lokal 3.8s ("Bojonegoro menyuplai lebih dari 501 ribu ton beras untuk kebutuhan pangan masyarakat."): Tepat pada detik 37.2 (lokal 4.2s, saat kata "501 ribu ton beras"), munculkan & hitung cepat angka besar "501.670 Ton Beras" dengan efek pop-up emas, munculkan sub-kartu "KONTRIBUSI BERAS: 8,20%", dan munculkan 3 karung beras putih di sisi kanan pabrik satu per satu (detik 37.5, 38.0, 38.5).
  * Detik global 39.0 / lokal 6.0s: Munculkan kartu perbandingan bar di bagian bawah ("Total Gabah Kering Giling 100%" vs "Beras Siap Konsumsi 57,74%"), diikuti pop-in kartu "TOTAL BERAS JATIM: 6,12 Jt Ton (#1 RI)" pada detik 39.6 dan "TOTAL BERAS NASIONAL: 33,11 Jt Ton (BPS 2026)" pada detik 40.2.

- SCENE 5 (00:44 - 01:00, waktu lokal scene 0.0s - 16.0s):
  * Detik global 44.0 / lokal 0.0s ("Bukti nyata kerja keras petani dan sinergi pemerintah menjaga kedaulatan pangan."): Munculkan badge "LUMBUNG PANGAN JAWA TIMUR", subjudul sinergi petani & pemerintah, serta kartu medali utama "PERINGKAT #1 JAWA TIMUR" dengan animasi kilau emas menyapu laurel wreath.
  * Detik global 45.0 - 46.8 / lokal 1.0s - 2.8s: Munculkan 4 kartu ringkasan bawah SATU PER SATU setiap 0.45 detik:
    - Detik 45.0: "PRODUKSI GABAH (GKG): 868.808 Ton"
    - Detik 45.45: "PRODUKSI BERAS: 501.670 Ton"
    - Detik 45.9: "LUAS PANEN: 159.190 Ha"
    - Detik 46.35: "PRODUKSI JAWA TIMUR: 10,61 Jt T"
  * Detik global 47.0 / lokal 3.0s ("Matur nuwun petani Bojonegoro!"): Berikan animasi hero bounce (`scale: 1 -> 1.09 -> 1`) pada judul utama "MATUR NUWUN PETANI BOJONEGORO!" disertai semburan partikel bintang/konfeti emas dari belakang medali.
  * Detik global 49.8 / lokal 5.8s ("Wong Bojonegoro, bangga nggak nih? Tulis di komentar!"): JANGAN tampilkan banner CTA sejak awal scene. Baru munculkan banner kuning "WONG BOJONEGORO, BANGGA? TULIS DI KOMENTAR!" tepat pada detik 50.0 (lokal 6.0s) dengan efek spring slide-up + bounce kuat, lalu berikan efek spotlight pulse pada detik 51.5 (saat kata "Tulis di komentar!").
  * Detik global 53.0 - 60.0 / lokal 9.0s - 16.0s (Outro Musik): Pertahankan gerakan hidup hingga akhir video dengan denyut lembut tombol CTA setiap 90 frames, goyangan tanaman padi (`Math.sin`), dan partikel emas melayang naik.

2. TRANSISI ANTAR-SCENE & CONTINUOUS IDLE MOTION:
- Gunakan `<TransitionSeries>` dari `@remotion/transitions` (kombinasi `slide({ direction: 'from-bottom' })` dan `fade()` berdurasi 18 frames) pada perpindahan scene di detik 00:08, 00:20, 00:33, dan 00:44.
- Berikan slow camera push (`scale` dari `1` ke `1.035`) di setiap scene dan floating halus (`Math.sin(frame / 24 + idx) * 2.5`px) pada setiap kartu yang sudah muncul agar tidak kaku sambil menunggu giliran kartu berikutnya dipicu oleh voiceover.
```

## 4. Contoh Kode Komponen `VoiceoverCue` Siap Pakai (`.tsx`)

Komponen di bawah ini memudahkan Anda mengatur kemunculan elemen satu per satu berdasarkan detik *voiceover* (`appearAtSecond`) sekaligus memberikan efek sorotan/*pulse* ekstra (`highlightAtSecond`) tepat ketika narator menyebutkan angka di kartu tersebut:

```tsx
import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface VoiceoverCueProps {
  /** Detik (di dalam scene atau global) saat elemen mulai muncul */
  appearAtSecond: number;
  /** Opsional: Detik saat elemen mendapat efek sorotan/zoom ketika disebut narator */
  highlightAtSecond?: number;
  /** Indeks elemen untuk variasi gerakan mengambang (idle motion) */
  index?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const VoiceoverCueCard: React.FC<VoiceoverCueProps> = ({
  appearAtSecond,
  highlightAtSecond,
  index = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearFrame = Math.round(appearAtSecond * fps);

  // 1. Animasi Masuk Tepat pada Detik Voiceover
  const entrance = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 13, stiffness: 140, mass: 0.85 },
  });

  // 2. Animasi Sorotan (Spotlight Pulse) Saat Disebut Narator
  let highlightScale = 0;
  let highlightGlow = 0;
  if (typeof highlightAtSecond === 'number') {
    const hlFrame = Math.round(highlightAtSecond * fps);
    const hlProgress = spring({
      frame: frame - hlFrame,
      fps,
      config: { damping: 10, stiffness: 180 },
    });
    highlightScale = interpolate(hlProgress, [0, 0.5, 1], [0, 0.06, 0]);
    highlightGlow = interpolate(
      frame - hlFrame,
      [0, 12, 40],
      [0, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  }

  // 3. Gerakan Mengambang Halus Setelah Elemen Muncul (Mencegah Layar Beku)
  const isVisible = frame >= appearFrame;
  const idleFloatY = isVisible
    ? Math.sin((frame - appearFrame + index * 18) / 22) * 2.5
    : 0;

  const translateY = interpolate(entrance, [0, 1], [36, 0]) + idleFloatY;
  const scale = interpolate(entrance, [0, 1], [0.9, 1]) + highlightScale;
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: 'rgba(15, 34, 64, 0.85)',
        backdropFilter: 'blur(12px)',
        borderRadius: 18,
        border: `1.5px solid rgba(245, 158, 11, ${0.25 + highlightGlow * 0.75})`,
        boxShadow:
          highlightGlow > 0
            ? `0 0 ${24 * highlightGlow}px rgba(245, 158, 11, ${0.55 * highlightGlow})`
            : '0 10px 28px rgba(0, 0, 0, 0.35)',
        pointerEvents: isVisible ? 'auto' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
```

## 5. Perintah CLI Remotion untuk Pratinjau & Render Kualitas Tinggi

Gunakan perintah terminal berikut pada folder proyek Remotion Anda untuk menginstal paket transisi dan melakukan *render* video dengan kehalusan gerak maksimal:

```bash
# 1. Instal paket transisi resmi Remotion (jika belum terpasang)
npx remotion add @remotion/transitions

# 2. Jalankan Remotion Studio untuk mengecek keselarasan ketukan suara & animasi
npx remotion studio

# 3. Render video MP4 kualitas tinggi (H.264, CRF 18 untuk ketajaman teks & grafik)
npx remotion render src/index.ts MainComposition out/bojonegoro-juara-padi.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p \
  --concurrency=4
```
