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
Browser ──▶ /api/chat (Vercel) ──▶ agen KratonBot (src/lib/agent.ts) ◀──▶ Gemini (GOOGLE_API_KEY)
                                     ├─ cari_pengetahuan_keraton → content/kartu (BM25, di memori)
                                     ├─ tanggal_sekarang         → jam WIB
                                     └─ buat_jadwal_kunjungan    → Composio → Google Calendar kelompok
                                                                   (gagal/kosong → tautan "Tambahkan ke Google Calendar")
Browser ──▶ /api/report ──▶ Google Sheets (opsional, lewat Apps Script)
```

Semua berjalan di Vercel: tidak perlu Langflow, tunnel, atau laptop yang menyala. Flow Langflow tetap disimpan sebagai rancangan awal; logikanya dipindahkan ke `src/lib/agent.ts` dengan system prompt yang sama (`content/system-prompt.md`). API key **tidak pernah** dikirim ke browser.

Konfirmasi booking dijaga di server: jadwal hanya dibuat jika pesan bot sebelumnya adalah ringkasan "Ketik ya…" dan pengguna menjawab "ya", email yang diundang ditulis sendiri oleh pengguna, tanggalnya belum lewat, dan hanya satu jadwal per konfirmasi.

## Menjalankan di laptop

Butuh Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env.local   # lalu isi GOOGLE_API_KEY (dan COMPOSIO_API_KEY untuk undangan kalender)
npm run dev
```

Buka http://localhost:3000. Penjelasan setiap variabel ada di `.env.example`.

## Struktur file

| File | Fungsi |
|---|---|
| `src/app/page.tsx` | Landing |
| `src/components/ChatApp.tsx` | Seluruh logika chat: sesi, riwayat (localStorage), tombol booking, laporan |
| `src/app/api/chat/route.ts` | Menerima pesan dan riwayat, menjalankan agen, dan menerjemahkan error menjadi pesan yang jelas |
| `src/lib/agent.ts` | Agen Gemini dengan tiga alat dan penjaga konfirmasi booking |
| `src/lib/search.ts` | Pencarian kartu (BM25) untuk bot |
| `src/lib/calendar.ts` | Undangan Google Calendar lewat Composio, dengan tautan manual sebagai cadangan |
| `content/system-prompt.md` | System prompt KratonBot |
| `src/app/api/report/route.ts` | Menerima laporan jawaban keliru |
| `src/lib/labels.ts` | Lima tanda jawaban. Harus sama dengan `content/system-prompt.md` |
| `src/app/globals.css` | Warna: biru-putih Kasunanan, hijau-kuning (pareanom) Mangkunegaran |

## Kartu pengetahuan (`content/kartu/`)

Bot **dan** halaman Linimasa, Kartu pengetahuan, Kuis, serta Tentang AI semuanya membaca `content/kartu/*.md`, jadi isi situs dan pengetahuan bot selalu sama. Untuk mengubah pengetahuan: edit file kartu, commit, lalu push. Vercel akan deploy ulang otomatis.

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
3. Isi **Environment Variables**: `GOOGLE_API_KEY` (wajib), lalu opsional `COMPOSIO_API_KEY`, `COMPOSIO_CONNECTED_ACCOUNT_ID`, `GEMINI_MODEL`, dan `REPORT_WEBHOOK_URL`.
4. Klik **Deploy**.

Setiap push ke `main` otomatis di-deploy ulang. Kalau mengubah Environment Variables, lakukan Deployments → ⋯ → **Redeploy** agar nilainya terpakai.

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
