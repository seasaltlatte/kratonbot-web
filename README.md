# KratonBot Web

Front-end KratonBot: chatbot AI tentang Keraton Kasunanan Surakarta dan Pura Mangkunegaran, untuk tugas Pendidikan Pancasila (tema 7: AI dan rekonstruksi heritage). Dibuat dengan Next.js 16, Tailwind CSS 4, dan TypeScript.

| Halaman | Isi |
|---|---|
| `/` | Landing: contoh jawaban asli, arti lima tanda, dua istana, ajakan berkunjung |
| `/chat` | Chat dengan KratonBot, tombol **Buat jadwal**, dan **Laporkan jawaban keliru** |
| `/linimasa` | Linimasa 1742–2022. Setiap peristiwa merujuk kartu, dan versi tahun yang berbeda ditampilkan |
| `/jelajah` | Semua kartu pengetahuan, dengan filter istana, jenis, dan tema, plus pencarian |
| `/kuis` | Kuis 8 soal "Fakta, tafsir, atau legenda?" dari kartu pengetahuan |
| `/tentang-ai` | Cara kerja, sumber data, batasan, dan privasi (model card) |
| `/pedoman` | Draf Pedoman Penggunaan AI untuk Heritage (luaran kedua tema 7) |

Alur data:

```
Browser ──▶ /api/chat (server Next.js, menyimpan API key) ──▶ LANGFLOW_URL/api/v1/run/kratonbot-chat
Browser ──▶ /api/report ──▶ Google Sheets (opsional, lewat Apps Script)
```

API key Langflow **tidak pernah** dikirim ke browser.

## Menjalankan di laptop

Butuh Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env.local   # lalu isi LANGFLOW_URL dan LANGFLOW_API_KEY
npm run dev
```

Buka http://localhost:3000. `LANGFLOW_URL` diisi dengan URL tunnel yang muncul saat `online.bat` dijalankan di laptop yang menyalakan Langflow.

## Struktur file

| File | Fungsi |
|---|---|
| `src/app/page.tsx` | Landing |
| `src/components/ChatApp.tsx` | Seluruh logika chat: sesi, riwayat (localStorage), tombol booking, laporan |
| `src/app/api/chat/route.ts` | Meneruskan pesan ke Langflow, dan menerjemahkan error menjadi pesan yang jelas |
| `src/app/api/report/route.ts` | Menerima laporan jawaban keliru |
| `src/lib/labels.ts` | Lima tanda jawaban. Harus sama dengan system prompt Agent di Langflow |
| `src/app/globals.css` | Warna: biru-putih Kasunanan, hijau-kuning (pareanom) Mangkunegaran |

## Kartu pengetahuan (`content/kartu/`)

Halaman Linimasa, Kartu pengetahuan, Kuis, dan jumlah kartu di Tentang AI dibaca dari `content/kartu/*.md`. Ini file yang sama dengan yang di-ingest ke Astra DB (`Documents\KratonBot\flow\data\v3`). Setiap kali kartu diubah:

1. Salin file kartu terbaru ke `content/kartu/`.
2. Ingest ulang ke Astra lewat flow Ingest di Langflow, supaya isi situs dan isi bot tetap sama.

Aturan otomatis:
- Kalimat untuk bot ("bot sebaiknya…", "Catatan untuk tim…") disembunyikan dari pengunjung.
- File `07-…` (tentang KratonBot) tidak ditampilkan sebagai kartu.
- Setiap peristiwa di `src/lib/timeline.ts` wajib merujuk judul kartu. Kalau kartunya tidak ditemukan, build gagal, jadi linimasa tidak bisa memuat klaim tanpa sumber.

## Menambahkan ilustrasi AI ke galeri (`/galeri`)

Foto arsip diambil langsung dari Wikimedia Commons, dengan lisensi tercantum per foto di `src/lib/gallery.ts`. Ilustrasi AI dibuat tim:

1. Buka `/galeri`, buka bagian **Prompt untuk membuat ilustrasinya**, lalu salin prompt-nya ke alat gambar AI (misalnya Gemini atau ChatGPT).
2. Pastikan hasilnya **tidak fotorealistik** dan ada tulisan "Ilustrasi AI" di gambar. Kalau alatnya tidak bisa menulis, tambahkan tulisan itu sendiri.
3. Simpan file sebagai `public/galeri/<id>.webp`, misalnya `public/galeri/sangga-buwana.webp`.
4. Isi bagian `ai` pada item tersebut di `src/lib/gallery.ts`:
   ```ts
   ai: { src: "/galeri/sangga-buwana.webp", width: 1200, height: 800, model: "Gemini", madeBy: "Nama", date: "05-11-2026" },
   ```

## Deploy ke Vercel

1. Buat repository di GitHub (boleh private), lalu push kode ini:
   ```bash
   git add -A && git commit -m "KratonBot web"
   git remote add origin https://github.com/USERNAME/kratonbot-web.git
   git push -u origin main
   ```
2. Di https://vercel.com, pilih **Add New → Project**, lalu impor repository tersebut.
3. Isi **Environment Variables**: `LANGFLOW_URL`, `LANGFLOW_API_KEY`, dan `REPORT_WEBHOOK_URL` (opsional).
4. Klik **Deploy**.

**Saat URL tunnel berubah:** buka Vercel → Project → Settings → Environment Variables, ubah `LANGFLOW_URL`, lalu Deployments → ⋯ → **Redeploy**.

## Laporan ke Google Sheets (opsional)

1. Buat Google Sheet baru, lalu buka **Extensions → Apps Script**.
2. Tempel kode berikut:
   ```js
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
       .appendRow([d.waktu, d.pertanyaan, d.jawaban, d.catatan, d.sesi]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Pilih **Deploy → New deployment → Web app**. Atur *Execute as*: Me, dan *Who has access*: Anyone.
4. Salin URL Web App, lalu isi sebagai `REPORT_WEBHOOK_URL`.

Selama `REPORT_WEBHOOK_URL` kosong, laporan hanya muncul di log server (Vercel → Logs).

## Wajib dicek tim sebelum presentasi

- [ ] Ganti `[nama kelompok]` di `src/components/SiteFooter.tsx`.
- [ ] Minta orang yang bisa membaca aksara Jawa untuk memeriksa tulisan **ꦱꦸꦫꦏꦂꦠ** (Surakarta, di landing) dan **ꦏꦿꦠꦺꦴꦤ꧀** (Kraton, di header).
- [ ] Tinjau dan sesuaikan isi `/pedoman` dan `/tentang-ai`. Keduanya draf.
- [ ] Periksa ringkasan peristiwa di `src/lib/timeline.ts`. Ringkasan itu ditulis ulang dari kartu, jadi pastikan tidak ada yang bergeser maknanya.

## Pembagian kerja yang disarankan (3 orang)

- **Landing dan tampilan:** `page.tsx`, `globals.css`, `SiteHeader`, `SiteFooter`
- **Chat:** `ChatApp.tsx`, `api/chat`, `api/report`
- **Halaman informasi dan deploy:** `tentang-ai`, `pedoman`, Vercel, Google Sheets
