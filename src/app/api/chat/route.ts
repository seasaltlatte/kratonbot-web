// Meneruskan pesan pengunjung ke flow Langflow "kratonbot-chat".
// API key Langflow hanya ada di server (env), tidak pernah dikirim ke browser.

export const maxDuration = 60;

const MAX_MESSAGE = 2000;
const SESSION_ID = /^[A-Za-z0-9_-]{8,100}$/;

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const baseUrl = process.env.LANGFLOW_URL?.trim().replace(/\/+$/, "");
  const apiKey = process.env.LANGFLOW_API_KEY?.trim();
  if (!baseUrl || !apiKey) {
    return fail(500, "Server belum dikonfigurasi: isi LANGFLOW_URL dan LANGFLOW_API_KEY.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Format permintaan tidak valid.");
  }
  const { message, sessionId } = (body ?? {}) as { message?: unknown; sessionId?: unknown };
  if (typeof message !== "string" || !message.trim()) {
    return fail(400, "Pesan masih kosong.");
  }
  if (message.length > MAX_MESSAGE) {
    return fail(400, `Pesan terlalu panjang (maksimal ${MAX_MESSAGE} karakter).`);
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/api/v1/run/kratonbot-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        input_value: message.trim(),
        input_type: "chat",
        output_type: "chat",
        session_id: typeof sessionId === "string" && SESSION_ID.test(sessionId) ? sessionId : undefined,
      }),
      signal: AbortSignal.timeout(55_000),
      cache: "no-store",
    });
  } catch (e) {
    const timedOut = e instanceof DOMException && e.name === "TimeoutError";
    return fail(
      timedOut ? 504 : 502,
      timedOut
        ? "KratonBot terlalu lama menjawab. Coba kirim ulang pertanyaanmu."
        : "KratonBot sedang offline. Coba lagi beberapa saat lagi.",
    );
  }

  if (res.status === 401 || res.status === 403) {
    console.error("[chat] Langflow menolak API key:", res.status);
    return fail(500, "Server salah konfigurasi (API key ditolak). Hubungi tim pengembang.");
  }
  if (!res.ok) {
    console.error("[chat] Langflow error:", res.status);
    return fail(502, "KratonBot sedang offline. Coba lagi beberapa saat lagi.");
  }

  const data = await res.json().catch(() => null);
  const reply = data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
  if (typeof reply !== "string" || !reply.trim()) {
    return fail(502, "KratonBot tidak mengirim jawaban. Coba kirim ulang pertanyaanmu.");
  }
  return Response.json({ reply });
}
