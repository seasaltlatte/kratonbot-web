// Membuat jadwal kunjungan sebagai undangan Google Calendar lewat Composio (akun Google kelompok).
// Kalau Composio belum dikonfigurasi atau gagal, dikembalikan tautan "Tambahkan ke Google Calendar"
// supaya pengunjung tetap bisa menyimpan jadwalnya sendiri.

export const SITUS = {
  "Keraton Kasunanan": "Keraton Kasunanan Surakarta Hadiningrat, Surakarta, Jawa Tengah",
  "Pura Mangkunegaran": "Pura Mangkunegaran, Surakarta, Jawa Tengah",
} as const;
export type Situs = keyof typeof SITUS;

export type Kunjungan = {
  nama: string;
  situs: Situs;
  tanggal: string; // YYYY-MM-DD
  jam: string; // HH:MM, WIB
  jumlah_orang: number;
  email: string;
};

const DURASI_JAM = 2;

function detail(k: Kunjungan) {
  return [
    `Jumlah orang: ${k.jumlah_orang}.`,
    "Dibuat oleh KratonBot (AI) sebagai pengingat, bukan tiket resmi. Cek jam buka, harga tiket, dan aturan berpakaian ke pengelola sebelum berangkat.",
  ].join("\n");
}

export function judul(k: Kunjungan) {
  return `Kunjungan ke ${k.situs} - ${k.nama}`;
}

// Tautan template Google Calendar; zona waktu ditetapkan lewat ctz.
export function tautanManual(k: Kunjungan) {
  const mulai = `${k.tanggal.replaceAll("-", "")}T${k.jam.replace(":", "")}00`;
  const [h, m] = k.jam.split(":").map(Number);
  const selesaiJam = String(h + DURASI_JAM).padStart(2, "0");
  const selesai = `${k.tanggal.replaceAll("-", "")}T${selesaiJam}${String(m).padStart(2, "0")}00`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: judul(k),
    dates: `${mulai}/${selesai}`,
    ctz: "Asia/Jakarta",
    details: detail(k),
    location: SITUS[k.situs],
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export async function buatJadwal(k: Kunjungan): Promise<Record<string, unknown>> {
  const apiKey = process.env.COMPOSIO_API_KEY?.trim();
  if (!apiKey) {
    return { berhasil: false, galat: "Layanan undangan otomatis belum aktif.", tautan_manual: tautanManual(k) };
  }

  const body: Record<string, unknown> = {
    user_id: process.env.COMPOSIO_USER_ID?.trim() || "default",
    arguments: {
      calendar_id: "primary",
      summary: judul(k),
      description: detail(k),
      location: SITUS[k.situs],
      start_datetime: `${k.tanggal}T${k.jam}:00`,
      event_duration_hour: DURASI_JAM,
      event_duration_minutes: 0,
      timezone: "Asia/Jakarta",
      attendees: [k.email],
      send_updates: "all",
      create_meeting_room: false,
    },
  };
  const connected = process.env.COMPOSIO_CONNECTED_ACCOUNT_ID?.trim();
  if (connected) body.connected_account_id = connected;

  try {
    const res = await fetch("https://backend.composio.dev/api/v3.1/tools/execute/GOOGLECALENDAR_CREATE_EVENT", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.successful) {
      return { berhasil: true, judul: judul(k), waktu: `${k.tanggal} ${k.jam} WIB`, diundang: k.email };
    }
    console.error("[calendar] Composio gagal:", res.status, data?.error ?? data);
  } catch (e) {
    console.error("[calendar] Composio tidak bisa dihubungi:", e);
  }
  return { berhasil: false, galat: "Undangan otomatis gagal dibuat.", tautan_manual: tautanManual(k) };
}
