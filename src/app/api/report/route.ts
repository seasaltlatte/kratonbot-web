// Menerima laporan "jawaban keliru" dari pengunjung.
// Jika REPORT_WEBHOOK_URL diisi (Google Apps Script, lihat README), laporan ditambahkan ke Google Sheet
// kelompok dan dikirim sebagai email ke tim. Jika tidak, laporan hanya dicatat di log server Vercel.

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || !clip(body.answer, 1)) {
    return Response.json({ error: "Laporan tidak lengkap." }, { status: 400 });
  }

  const now = new Date();
  const report = {
    waktu: now.toISOString(),
    waktu_wib: `${new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long", timeStyle: "short" }).format(now)} WIB`,
    halaman: request.headers.get("origin") ?? new URL(request.url).origin,
    pertanyaan: clip(body.question, 2000),
    jawaban: clip(body.answer, 8000),
    catatan: clip(body.note, 1000),
    sesi: clip(body.sessionId, 100),
  };

  const webhook = process.env.REPORT_WEBHOOK_URL?.trim();
  if (!webhook) {
    console.log("[report]", JSON.stringify(report));
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error("[report] gagal mengirim ke webhook:", e);
    return Response.json({ error: "Laporan belum terkirim. Coba lagi." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
