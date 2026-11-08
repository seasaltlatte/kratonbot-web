// Otak KratonBot yang berjalan langsung di server Vercel (menggantikan flow Langflow).
// Gemini + function calling dengan tiga alat: pencarian kartu, tanggal WIB, dan pembuatan jadwal.
// Konfirmasi booking dijaga di server, tidak hanya bergantung pada kepatuhan model.
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI, type Content, type FunctionCall, type FunctionDeclaration, type Part } from "@google/genai";
import { buatJadwal, SITUS, type Kunjungan, type Situs } from "@/lib/calendar";
import { BOOKING_PROMPT } from "@/lib/labels";
import { searchCards } from "@/lib/search";

export type Turn = { role: "user" | "bot"; text: string };

export class AgentError extends Error {
  constructor(
    public kind: "konfigurasi" | "sibuk" | "gagal",
    message: string,
  ) {
    super(message);
  }
}

const SYSTEM_PROMPT = fs.readFileSync(path.join(process.cwd(), "content", "system-prompt.md"), "utf8");

// Model utama bisa diatur lewat GEMINI_MODEL; sisanya cadangan saat model utama penuh (429/503).
const MODELS = [...new Set([process.env.GEMINI_MODEL?.trim(), "gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-flash-latest"])].filter(
  (m): m is string => !!m,
);
const MAX_LANGKAH = 6;

const TOOLS: FunctionDeclaration[] = [
  {
    name: "cari_pengetahuan_keraton",
    description:
      "Cari informasi sejarah, budaya, nilai, dan info kunjungan Keraton Kasunanan Surakarta dan Pura Mangkunegaran di kartu pengetahuan yang sudah diverifikasi tim. Gunakan kata kunci yang spesifik.",
    parametersJsonSchema: {
      type: "object",
      properties: { kueri: { type: "string", description: "Kata kunci pencarian, misalnya 'Perjanjian Salatiga 1757'." } },
      required: ["kueri"],
    },
  },
  {
    name: "tanggal_sekarang",
    description: "Tanggal dan jam saat ini di zona waktu WIB (Asia/Jakarta).",
    parametersJsonSchema: { type: "object", properties: {} },
  },
  {
    name: "buat_jadwal_kunjungan",
    description:
      "Membuat undangan Google Calendar untuk jadwal kunjungan. Hanya boleh dipanggil setelah user menjawab 'ya' pada ringkasan.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        nama: { type: "string" },
        situs: { type: "string", enum: Object.keys(SITUS) },
        tanggal: { type: "string", description: "Format YYYY-MM-DD" },
        jam: { type: "string", description: "Jam kedatangan WIB, format HH:MM" },
        jumlah_orang: { type: "integer" },
        email: { type: "string" },
      },
      required: ["nama", "situs", "tanggal", "jam", "jumlah_orang", "email"],
    },
  },
];

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const SETUJU = /^\s*(ya|iya|yes|y|ok|oke|okay|setuju|lanjut|buat)\b/i;

function tanggalSekarang() {
  const now = new Date();
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", ...o }).format(now);
  const iso = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(now);
  return {
    tanggal: fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    iso,
    jam: `${fmt({ hour: "2-digit", minute: "2-digit", hour12: false })} WIB`,
  };
}

// Hasil pemeriksaan sekali per permintaan: apakah booking boleh dijalankan pada giliran ini.
function izinBooking(history: Turn[], message: string) {
  const lastBot = [...history].reverse().find((t) => t.role === "bot");
  const emails = new Set(
    [...history.filter((t) => t.role === "user").map((t) => t.text), message].flatMap((t) => t.match(EMAIL) ?? []).map((e) => e.toLowerCase()),
  );
  return {
    dikonfirmasi: !!lastBot && BOOKING_PROMPT.test(lastBot.text) && SETUJU.test(message) && message.length < 80,
    emails,
  };
}

async function jalankanAlat(
  call: FunctionCall,
  izin: ReturnType<typeof izinBooking>,
  state: { sudahBooking: boolean },
): Promise<Record<string, unknown>> {
  const args = (call.args ?? {}) as Record<string, unknown>;
  switch (call.name) {
    case "cari_pengetahuan_keraton": {
      const hasil = searchCards(String(args.kueri ?? ""), 5);
      return hasil.length
        ? { hasil: hasil.map((c) => c.block).join("\n\n---\n\n") }
        : { hasil: "", catatan: "Tidak ada kartu yang cocok. Coba kata kunci lain, atau katakan belum ada data." };
    }
    case "tanggal_sekarang":
      return tanggalSekarang();
    case "buat_jadwal_kunjungan": {
      if (!izin.dikonfirmasi) {
        return { berhasil: false, galat: "Ditolak server: user belum menjawab 'ya' pada ringkasan jadwal. Tampilkan ringkasan dan minta konfirmasi dulu." };
      }
      if (state.sudahBooking) return { berhasil: false, galat: "Satu konfirmasi hanya untuk satu jadwal." };
      const k: Kunjungan = {
        nama: String(args.nama ?? "").slice(0, 80),
        situs: args.situs as Situs,
        tanggal: String(args.tanggal ?? ""),
        jam: String(args.jam ?? ""),
        jumlah_orang: Number(args.jumlah_orang) || 1,
        email: String(args.email ?? "").trim().toLowerCase(),
      };
      if (!(k.situs in SITUS)) return { berhasil: false, galat: "Situs tidak dikenal." };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k.tanggal) || !/^\d{2}:\d{2}$/.test(k.jam)) {
        return { berhasil: false, galat: "Format tanggal atau jam salah (YYYY-MM-DD dan HH:MM)." };
      }
      if (new Date(`${k.tanggal}T${k.jam}:00+07:00`).getTime() <= Date.now()) {
        return { berhasil: false, galat: "Tanggal atau jam sudah lewat." };
      }
      if (!izin.emails.has(k.email)) {
        return { berhasil: false, galat: "Email harus email yang ditulis sendiri oleh user di percakapan ini." };
      }
      state.sudahBooking = true;
      return buatJadwal(k);
    }
    default:
      return { galat: `Alat ${call.name} tidak dikenal.` };
  }
}

async function generate(ai: GoogleGenAI, contents: Content[]) {
  let lastErr: unknown;
  for (const model of MODELS) {
    try {
      return await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT, tools: [{ functionDeclarations: TOOLS }], temperature: 0.2 },
      });
    } catch (e) {
      lastErr = e;
      const status = (e as { status?: number }).status;
      console.error(`[agent] ${model} gagal:`, status ?? e);
      if (status === 400 || status === 401 || status === 403) break; // salah konfigurasi, model lain juga akan gagal
    }
  }
  const status = (lastErr as { status?: number })?.status;
  if (status === 401 || status === 403 || status === 400) {
    throw new AgentError("konfigurasi", "GOOGLE_API_KEY ditolak atau model tidak tersedia.");
  }
  throw new AgentError("sibuk", "Semua model Gemini sedang penuh atau tidak bisa dihubungi.");
}

export async function runAgent(history: Turn[], message: string): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new AgentError("konfigurasi", "GOOGLE_API_KEY belum diisi.");
  const ai = new GoogleGenAI({ apiKey });

  const contents: Content[] = [
    ...history.map((t) => ({ role: t.role === "user" ? "user" : "model", parts: [{ text: t.text }] })),
    { role: "user", parts: [{ text: message }] },
  ];
  const izin = izinBooking(history, message);
  const state = { sudahBooking: false };

  for (let langkah = 0; langkah < MAX_LANGKAH; langkah++) {
    const res = await generate(ai, contents);
    const calls = res.functionCalls ?? [];
    if (calls.length === 0) {
      const text = res.text?.trim();
      if (!text) throw new AgentError("gagal", "Model tidak mengirim jawaban.");
      return text;
    }
    // Kirim balik konten model apa adanya (termasuk thought signature), lalu hasil setiap alat.
    contents.push(res.candidates?.[0]?.content ?? { role: "model", parts: calls.map((c) => ({ functionCall: c })) });
    const parts: Part[] = [];
    for (const call of calls) {
      const response = await jalankanAlat(call, izin, state);
      parts.push({ functionResponse: { ...(call.id ? { id: call.id } : {}), name: call.name, response } });
    }
    contents.push({ role: "user", parts });
  }
  throw new AgentError("gagal", "Terlalu banyak langkah alat.");
}
