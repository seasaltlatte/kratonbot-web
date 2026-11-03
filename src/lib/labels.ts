// Lima tanda yang dipakai KratonBot di setiap jawaban (sama dengan system prompt Agent).
export const CLAIM_LABELS = [
  {
    emoji: "🟢",
    name: "Fakta tercatat",
    meaning: "Tertulis di sumber yang sudah diperiksa tim.",
    className: "bg-pareanom-muda text-pareanom",
  },
  {
    emoji: "🟡",
    name: "Tafsir",
    meaning: "Pendapat atau interpretasi, bukan kepastian.",
    className: "bg-emas-muda text-[#7a5d00]",
  },
  {
    emoji: "🟣",
    name: "Legenda",
    meaning: "Kisah yang dipercaya dan dituturkan turun-temurun.",
    className: "bg-[#ece5f6] text-[#5d3f8f]",
  },
  {
    emoji: "🔵",
    name: "Info praktis",
    meaning: "Jam buka, tiket, aturan. Bisa berubah, cek ulang ke pengelola.",
    className: "bg-biru-muda text-biru-tua",
  },
  {
    emoji: "⚪",
    name: "Belum ada data",
    meaning: "KratonBot tidak menemukannya di sumber, jadi tidak menebak.",
    className: "bg-[#eceff1] text-tinta-pudar",
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
