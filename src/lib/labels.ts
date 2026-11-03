// Lima tanda yang dipakai KratonBot di setiap jawaban (sama dengan system prompt Agent).
export const CLAIM_LABELS = [
  {
    emoji: "🟢",
    name: "Fakta tercatat",
    meaning: "Tertulis di sumber yang sudah diperiksa tim.",
    className: "border border-[#2a4433] bg-pareanom-gelap text-pareanom-terang",
  },
  {
    emoji: "🟡",
    name: "Tafsir",
    meaning: "Pendapat atau interpretasi, bukan kepastian.",
    className: "border border-[#4a3d1c] bg-catatan text-emas-terang",
  },
  {
    emoji: "🟣",
    name: "Legenda",
    meaning: "Kisah yang dipercaya dan dituturkan turun-temurun.",
    className: "border border-[#3d3150] bg-[#1d1726] text-[#c7b3e3]",
  },
  {
    emoji: "🔵",
    name: "Info praktis",
    meaning: "Jam buka, tiket, aturan. Bisa berubah, cek ulang ke pengelola.",
    className: "border border-[#27405a] bg-kasunanan-gelap text-kasunanan-terang",
  },
  {
    emoji: "⚪",
    name: "Belum ada data",
    meaning: "KratonBot tidak menemukannya di sumber, jadi tidak menebak.",
    className: "border border-[#33312b] bg-[#1a1a18] text-abu",
  },
] as const;

// Kategori kartu → indeks di CLAIM_LABELS.
export const KATEGORI_INDEX = {
  FAKTA: 0,
  TAFSIR: 1,
  LEGENDA: 2,
  "INFO PRAKTIS": 3,
} as const;

export const BOOKING_PROMPT = /ketik\s+\**ya\**\s+untuk\s+membuat\s+jadwal/i;
