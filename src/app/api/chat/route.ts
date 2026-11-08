// Menerima pesan pengunjung dan menjawabnya dengan agen KratonBot (src/lib/agent.ts).
// API key hanya ada di server (env Vercel), tidak pernah dikirim ke browser.
import { AgentError, runAgent, type Turn } from "@/lib/agent";

export const maxDuration = 60;

const MAX_MESSAGE = 2000;
const MAX_TURNS = 16;
const MAX_TURN_TEXT = 4000;

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Format permintaan tidak valid.");
  }
  const { message, history } = (body ?? {}) as { message?: unknown; history?: unknown };
  if (typeof message !== "string" || !message.trim()) {
    return fail(400, "Pesan masih kosong.");
  }
  if (message.length > MAX_MESSAGE) {
    return fail(400, `Pesan terlalu panjang (maksimal ${MAX_MESSAGE} karakter).`);
  }

  // Riwayat dikirim browser karena server tidak menyimpan percakapan.
  const turns: Turn[] = (Array.isArray(history) ? history : [])
    .filter(
      (t): t is Turn =>
        !!t && (t.role === "user" || t.role === "bot") && typeof t.text === "string" && t.text.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_TURN_TEXT) }));

  try {
    const reply = await runAgent(turns, message.trim());
    return Response.json({ reply });
  } catch (e) {
    if (e instanceof AgentError) {
      console.error(`[chat] ${e.kind}: ${e.message}`);
      if (e.kind === "konfigurasi") return fail(500, "Server salah konfigurasi. Hubungi tim pengembang.");
      if (e.kind === "sibuk") return fail(503, "KratonBot sedang ramai. Coba kirim ulang sebentar lagi.");
      return fail(502, "KratonBot gagal menyusun jawaban. Coba kirim ulang pertanyaanmu.");
    }
    console.error("[chat] error tak terduga:", e);
    return fail(500, "Terjadi kesalahan di server. Coba lagi sebentar lagi.");
  }
}
