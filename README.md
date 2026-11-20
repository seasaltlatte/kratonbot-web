# Surantara

**Surantara** (Surakarta + Antara) adalah situs, dan **Surantara Bot** adalah chatbot AI di dalamnya, tentang Keraton Kasunanan Surakarta dan Pura Mangkunegaran. "Antara" bermakna jembatan atau penghubung: Surantara menghubungkan masa keemasan sejarah Surakarta dengan generasi digital masa kini. Surantara Bot selalu menunjukkan sumber dan membedakan fakta, tafsir, dan legenda. Dibuat untuk tugas Pendidikan Pancasila (tema 7: AI dan rekonstruksi heritage).

**Situs:** https://kratonbot-web.vercel.app

Dibuat dengan Next.js 16, Tailwind CSS 4, TypeScript, Google Gemini, dan Composio. Front-end dan back-end berada di satu proyek dan berjalan di Vercel.

## Halaman

| Halaman | Isi |
|---|---|
| `/` | Landing: hero, linimasa singkat, contoh jawaban, dua istana, ajakan berkunjung |
| `/chat` | Chat dengan Surantara Bot, tombol **Buat jadwal**, dan **Laporkan jawaban keliru** |
| `/linimasa` | Linimasa 1742–2022; setiap peristiwa merujuk kartu, versi tahun yang berbeda ditampilkan |
| `/pustaka` | Semua kartu pengetahuan, dengan filter dan pencarian |
| `/galeri` | Foto arsip berdampingan dengan rekonstruksi AI |
| `/tentang-ai` | Cara kerja, sumber data, batasan, dan privasi |
| `/pedoman` | Pedoman penggunaan AI untuk heritage |

## Cara kerja

```
Browser ──▶ /api/chat ──▶ agen Surantara Bot (src/lib/agent.ts) ◀──▶ Gemini
                            ├─ cari_pengetahuan_keraton → content/kartu (pencarian BM25)
                            ├─ tanggal_sekarang         → jam WIB
                            └─ buat_jadwal_kunjungan    → Composio → Google Calendar
                                                          (gagal → tautan "Tambahkan ke Google Calendar")
Browser ──▶ /api/report ──▶ Google Sheets (opsional)
```

- Bot hanya menjawab dari kartu di `content/kartu/`, memberi label 🟢 fakta, 🟡 tafsir, 🟣 legenda, 🔵 info praktis, atau ⚪ belum ada data, dan mencantumkan sumbernya.
- Riwayat percakapan disimpan di browser pengunjung dan dikirim bersama setiap pertanyaan; server tidak menyimpan percakapan.
- API key hanya ada di server, tidak pernah dikirim ke browser.
- Jadwal kunjungan hanya dibuat jika bot sudah menampilkan ringkasan dan pengguna menjawab "ya", email yang diundang ditulis sendiri oleh pengguna, dan tanggalnya belum lewat. Pemeriksaan ini dilakukan di server.

## Struktur repo

```
content/
  kartu/*.md            kartu pengetahuan (dipakai bot dan halaman situs)
  system-prompt.md      aturan perilaku Surantara Bot
src/
  app/                  halaman (front-end); nama folder = alamat halaman
  app/api/chat/         API chat (back-end)
  app/api/report/       API laporan jawaban keliru
  components/           komponen tampilan: ChatApp, Explorer, header, footer, dll.
  lib/agent.ts          otak bot: Gemini + alat + penjaga booking
  lib/search.ts         pencarian kartu
  lib/calendar.ts       undangan Google Calendar
  lib/cards.ts          membaca file kartu
  lib/timeline.ts       data linimasa
  lib/gallery.ts        data galeri
  lib/labels.ts         lima tanda jawaban
  app/globals.css       warna, font, mode gelap/terang, animasi
```

## Menjalankan di laptop

Butuh Node.js 20 atau lebih baru.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local` (penjelasan lengkap ada di `.env.example`), lalu buka http://localhost:3000. Di PowerShell yang memblokir skrip, pakai `npm.cmd run dev`.

| Variabel | Wajib | Isi |
|---|---|---|
| `GOOGLE_API_KEY` | ya | API key Gemini dari Google AI Studio |
| `GEMINI_MODEL` | tidak | model utama (bawaan: `gemini-3.5-flash-lite`, dengan cadangan otomatis) |
| `COMPOSIO_API_KEY` | tidak | API key Composio dengan izin *Tool execution: Write*, untuk undangan kalender otomatis |
| `COMPOSIO_CONNECTED_ACCOUNT_ID` | tidak | ID akun Google Calendar yang aktif di Composio |
| `REPORT_WEBHOOK_URL` | tidak | URL Apps Script untuk menyimpan laporan ke Google Sheets |

`.env.local` tidak pernah masuk GitHub.

## Mengubah isi

| Mau mengubah… | Edit |
|---|---|
| Pengetahuan bot dan isi situs | `content/kartu/*.md` |
| Aturan atau gaya jawaban bot | `content/system-prompt.md` |
| Tampilan, warna, font | `src/app/globals.css` dan `src/components/` |
| Isi suatu halaman | `src/app/<halaman>/page.tsx` |
| Peristiwa linimasa | `src/lib/timeline.ts` (wajib merujuk judul kartu; build gagal jika kartunya tidak ada) |
| Ilustrasi AI di galeri | lihat bagian di bawah |

Format kartu: blok dipisah `---`, dengan baris `Judul`, `Situs`, `Kategori` (FAKTA, TAFSIR, LEGENDA, atau INFO PRAKTIS), `Sumber`, `Dicek` (opsional), dan `Isi`. Kalimat untuk bot ("bot sebaiknya…", "Catatan untuk tim…") dibaca bot tetapi disembunyikan dari pengunjung.

### Menambahkan ilustrasi AI ke galeri

1. Buka `/galeri`, salin prompt di bagian **Prompt untuk membuat ilustrasinya** ke alat gambar AI.
2. Pastikan hasilnya tidak fotorealistik dan ada tulisan "Ilustrasi AI" di gambar.
3. Simpan sebagai `public/galeri/<id>.webp`, lalu isi bagian `ai` pada item tersebut di `src/lib/gallery.ts`:
   ```ts
   ai: { src: "/galeri/sangga-buwana.webp", width: 1200, height: 800, model: "Gemini", madeBy: "Nama", date: "05-11-2026" },
   ```

## Deploy

Proyek ini terhubung ke Vercel lewat GitHub:

- Push ke `main` → situs utama diperbarui otomatis dalam 1–2 menit.
- Push ke branch lain → Vercel membuat alamat preview terpisah.
- Jika build gagal, situs lama tetap tampil.
- Setelah mengubah Environment Variables di Vercel (Settings → Environment Variables), lakukan **Deployments → ⋯ → Redeploy** agar nilainya terpakai.

## Laporan jawaban keliru (Google Sheets + email)

Tombol **Laporkan jawaban keliru** di chat mengirim laporan ke `/api/report`. Agar tim menerimanya:

1. Di akun Gmail kelompok, buat Google Sheet baru (misalnya "Laporan Surantara").
2. Buka **Extensions → Apps Script**, hapus isinya, lalu tempel seluruh isi [`docs/apps-script-laporan.gs`](docs/apps-script-laporan.gs). Ganti `EMAIL_TIM` dengan alamat Gmail kelompok, lalu simpan.
3. **Deploy → New deployment → Web app**, atur *Execute as*: **Me** dan *Who has access*: **Anyone**, lalu izinkan aksesnya (pilih *Advanced → Go to …* jika muncul peringatan).
4. Salin URL Web App (`https://script.google.com/macros/s/…/exec`), lalu isi sebagai `REPORT_WEBHOOK_URL` di Vercel (**Settings → Environment Variables**) dan **Redeploy**. Untuk mencoba di laptop, isi juga di `.env.local`.

Setiap laporan menjadi satu baris di Sheet (waktu WIB, pertanyaan, jawaban bot, catatan, sesi, status) dan dikirim sebagai email ke tim. Kolom **Status** bisa diubah tim menjadi "Sudah diperbaiki" setelah kartu dikoreksi.

Jangan membagikan URL Web App di tempat umum: siapa pun yang memilikinya bisa menulis ke Sheet. Tanpa `REPORT_WEBHOOK_URL`, laporan hanya tercatat di log Vercel, yang tersimpan sebentar saja.
