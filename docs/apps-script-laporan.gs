/**
 * Penerima laporan "jawaban keliru" Surantara.
 * Tempel seluruh isi file ini di Google Sheet → Extensions → Apps Script, lalu deploy sebagai Web app
 * (Execute as: Me, Who has access: Anyone). Panduan lengkap ada di README, bagian "Laporan jawaban keliru".
 *
 * Setiap laporan:
 *  1. ditambahkan sebagai satu baris di sheet pertama, dan
 *  2. dikirim sebagai email ke EMAIL_TIM.
 */

// Ganti dengan alamat Gmail kelompok. Beberapa alamat bisa dipisah koma.
const EMAIL_TIM = "ganti-dengan-email-kelompok@gmail.com";

const KOLOM = ["Waktu (WIB)", "Pertanyaan", "Jawaban bot", "Catatan pelapor", "Sesi", "Status"];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  // Baris judul dibuat otomatis saat laporan pertama masuk.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(KOLOM);
    sheet.getRange(1, 1, 1, KOLOM.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([d.waktu_wib || d.waktu, d.pertanyaan, d.jawaban, d.catatan || "-", d.sesi, "Belum diperiksa"]);

  MailApp.sendEmail({
    to: EMAIL_TIM,
    subject: "[Surantara] Laporan jawaban keliru",
    body: [
      "Ada laporan jawaban keliru dari pengunjung " + (d.halaman || "Surantara") + ".",
      "",
      "Waktu: " + (d.waktu_wib || d.waktu),
      "Catatan pelapor: " + (d.catatan || "-"),
      "",
      "Pertanyaan:",
      d.pertanyaan || "-",
      "",
      "Jawaban bot:",
      d.jawaban,
      "",
      "Semua laporan: " + ss.getUrl(),
    ].join("\n"),
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
