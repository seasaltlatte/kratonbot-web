---
title: "Basis Pengetahuan RAG: Astana Oetara dan Kepemimpinan KGPAA Mangkunegara VI"
topic: "Kompleks Pemakaman Astana Oetara di Surakarta, Alasan Mangkunegara VI Memilih Dekat Rakyat (Bukan di Girilayu), serta Arsitektur Karya Ir. Soekarno"
entities:
  - "Astana Oetara (Pesarean Nayu)"
  - "KGPAA Mangkunegara VI (GRM Suyitno / KPA Dayaningrat)"
  - "Ir. Soekarno (Arsitek Astana Oetara)"
  - "Perkumpulan Keluarga Soejono Soewasti"
  - "Astana Girilayu & Astana Mangadeg (Perbandingan)"
  - "Kelurahan Nusukan, Kecamatan Banjarsari, Kota Surakarta"
period: "1896–1928 hingga pelestarian masa kini"
language: "id"
rag_design: "Self-contained semantic chunks per heading, explicit entity naming, structured summary table, and synthetic Q&A pairs"
---

# Basis Pengetahuan RAG: Astana Oetara dan KGPAA Mangkunegara VI

Dokumen ini disusun sebagai basis pengetahuan (*knowledge base*) untuk AI *chatbot* berarsitektur *Retrieval-Augmented Generation* (RAG). Setiap subbab dirancang agar berdiri sendiri (*self-contained*) dengan penyebutan lengkap nama situs, tokoh, serta konteks historisnya sehingga tetap utuh saat dipotong menjadi *chunk* vektor.

---

## 1. Profil Umum, Lokasi, dan Status Cagar Budaya Astana Oetara

**Astana Oetara** (kerap disebut **Pesarean Nayu**, atau dahulu dikenal sebagai *Manyu Giriyoso Sekaran Nayu*) adalah kompleks pemakaman sekaligus museum hidup dan situs cagar budaya peninggalan **KGPAA Mangkunegara VI** ([astanaoetara.com](https://www.astanaoetara.com/); [Kompas.com](https://www.kompas.com/stori/read/2022/06/18/090000079/astana-oetara-kompleks-pemakaman-mangkunegara-vi); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)).

- **Etimologi dan Lokasi:** Kata *astana* berarti makam/kuburan dan *oetara* berarti utara, merujuk pada posisinya di sisi utara Kota Surakarta ([Kompas.com](https://www.kompas.com/stori/read/2022/06/18/090000079/astana-oetara-kompleks-pemakaman-mangkunegara-vi)). Kompleks seluas kurang lebih **1,4 hektare** (14.000 m²) ini beralamat di **Jl. Nayu, Kampung Nayu, Kelurahan Nusukan, Kecamatan Banjarsari, Kota Surakarta, Jawa Tengah** ([astanaoetara.com](https://www.astanaoetara.com/); [astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)).
- **Status Cagar Budaya dan Pengelola:** Pemerintah Kota Surakarta menetapkan Astana Oetara sebagai **Situs Cagar Budaya** melalui **SK Wali Kota Surakarta Nomor 432.22/50.1 Tahun 2021** tertanggal **21 Mei 2021** (sebelumnya juga tercatat sebagai cagar budaya kota pada 2014 menurut Kompas.com) ([astanaoetara.com](https://www.astanaoetara.com/); [Kompas.com](https://www.kompas.com/stori/read/2022/06/18/090000079/astana-oetara-kompleks-pemakaman-mangkunegara-vi)). Pengelolaan saat ini berada di bawah **Perkumpulan Keluarga Soejono Soewasti** yang menaungi Trah Mangkunegoro VI ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)).
- **Informasi Kunjungan:** Astana Oetara terbuka bagi masyarakat umum sebagai pusat kegiatan warga dan museum edukasi pada hari **Selasa, Rabu, Kamis, Sabtu, dan Minggu pukul 09.00–15.00 WIB** melalui pendaftaran daring ([astanaoetara.com](https://www.astanaoetara.com/)).

---

## 2. Alasan Mangkunegara VI Dimakamkan di Astana Oetara, Bukan di Astana Girilayu

Berbeda dari penguasa Mangkunegaran lainnya yang dimakamkan di kawasan perbukitan Karanganyar (Mangkunegara I–III di Astana Mangadeg, serta Mangkunegara IV, V, VII, VIII, dan IX di Astana Girilayu), **KGPAA Mangkunegara VI** dimakamkan di dalam Kota Surakarta di Astana Oetara ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu); [Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI)):

- **Keinginan untuk Dekat dengan Rakyat dan Pengikutnya:** Menurut penjelasan resmi pengelola dan keturunan MN VI, Mangkunegara VI memilih dan menyiapkan sendiri Astana Oetara sejak **1909** (lalu dibangun pada **1926**) dengan alasan utama **agar lebih dekat dengan rakyat**, keluarga, keturunan, serta para pegawai Mangkunegaran yang berjasa pada masa pemerintahannya ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)).
- **Bukan karena Penolakan dari Girilayu:** Keturunan Mangkunegara VI menegaskan bahwa tidak pernah ada larangan atau penolakan dari pihak Astana Mangadeg maupun Astana Girilayu; pemakaman di Astana Oetara murni merupakan kehendak dan perencanaan pribadi MN VI ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)).
- **Prosesi Pemakaman dari Tiong Ting:** Karena telah mengundurkan diri dari takhta pada **11 Januari 1916** dan menetap di Surabaya hingga wafat pada **25 Juni 1928**, jenazah Mangkunegara VI tidak disemayamkan di Pura Mangkunegaran, melainkan di Tiong Ting atas permintaan masyarakat Tionghoa setempat sebelum diberangkatkan menuju Astana Oetara ([Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)).

---

## 3. Arsitektur Karya Ir. Soekarno dan Tokoh yang Dimakamkan di Astana Oetara

### 3.1 Arsitektur Jawa–Eropa dan Empat Bangunan Utama
Kompleks Astana Oetara dirancang oleh **Ir. Soekarno** (yang kelak menjadi Presiden pertama Republik Indonesia) dengan memadukan unsur arsitektur **Jawa dan Eropa (*Art Nouveau*)** ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)). Empat bangunan utamanya meliputi ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)):
1. **Kedaton Makam KGPAA Mangkunegara VI**
2. **Pendopo Handayaningrat** (*Pendopo Pantjasila Ing Handayaningratan*)
3. **Masjid Astana Oetara**
4. **Kantoor dan Pemberentian Tamoe** (kini difungsikan sebagai galeri dan museum)

### 3.2 Tokoh yang Dimakamkan
Selain **KGPAA Mangkunegara VI**, permaisuri, selir, dan keturunannya, di area Astana Oetara juga dimakamkan sejumlah tokoh pergerakan dan pegawai berjasa Mangkunegaran, antara lain ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)):
- **KPH Soejono Handajaningrat** (putra MN VI sekaligus tokoh pergerakan kemerdekaan bersama Dr. Sutomo di Parindra).
- **K.R.M.H. Jonosewojo** (pejuang kemerdekaan dan komandan Divisi VII Kodam Brawijaya pada masa TKR).
- **Roy B.B. Janis** (tokoh pejuang era Reformasi).
- Para pegawai berjasa Praja Mangkunegaran serta kerabat yang memenuhi ketentuan pengelola.

---

## 4. Profil Kepemimpinan KGPAA Mangkunegara VI (1896–1916)

**KGPAA Mangkunegara VI** (lahir di Surakarta pada **1 Maret 1857** dengan nama kecil **GRM Suyitno** / KPA Dayaningrat; wafat di Surabaya pada **25 Juni 1928**) adalah putra keempat Mangkunegara IV dan R.Ay. Dunuk yang memerintah Kadipaten Mangkunegaran selama 19 tahun (**1896–1916**) ([Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI); [astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)).

- **Reformasi Keuangan (*Politik Ikat Pinggang*):** Menghadapi krisis kas kadipaten dan anjloknya harga gula dunia, MN VI menerapkan penghematan ketat, menghapus jabatan Wakil Komandan Legiun demi efisiensi, serta memisahkan keuangan perusahaan dari keuangan kerajaan sejak 1 Juni 1899 hingga seluruh utang kadipaten berhasil dilunasi ([Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI)).
- **Pembaruan Sosial dan Sikap Egaliter:** Beliau mempelopori gaya rambut pendek bagi pejabat dan kawula, menyederhanakan tata krama *sembah sungkem*, mengganti kebiasaan duduk di lantai menjadi duduk di kursi saat pertemuan, membuka kebebasan beragama bagi kerabat pura, serta memutus kewajiban menghadap persidangan Kasunanan ([Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI); [astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)).
- **Pengunduran Diri (1916):** Karena usulannya menunjuk putranya (KPA Suyono Handayaningrat) sebagai penerus diveto oleh kelompok kerabat dan pemerintah kolonial Belanda, MN VI menjadi satu-satunya penguasa Mangkunegaran yang mengundurkan diri secara sukarela pada **11 Januari 1916**, lalu pindah ke Surabaya dan digantikan keponakannya, Mangkunegara VII ([Wikipedia: Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI)).

---

## 5. Contoh Pasangan Pertanyaan–Jawaban (Q&A) untuk Retrieval Chatbot

1. **Mengapa KGPAA Mangkunegara VI dimakamkan di Astana Oetara dan bukan di Astana Girilayu?**  
   Mangkunegara VI memang merencanakan dan menyiapkan sendiri kompleks Astana Oetara sejak 1909 dengan alasan **ingin tetap dekat dengan rakyat**, keluarga, dan para pegawai Mangkunegaran yang berjasa, bukan karena adanya larangan dari Astana Girilayu ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)).

2. **Siapa arsitek kompleks Astana Oetara dan apa keunikan bangunannya?**  
   Arsitek Astana Oetara adalah **Ir. Soekarno** (Presiden pertama RI), yang memadukan gaya arsitektur Jawa dan Eropa (*Art Nouveau*) pada empat bangunan utama: Kedaton Makam MN VI, Pendopo Handayaningrat, Masjid Astana Oetara, serta galeri/museum Kantoor dan Pemberentian Tamoe ([astanaoetara.com/info/sejarah-edukasi](https://www.astanaoetara.com/info/sejarah-edukasi)).

3. **Di mana lokasi Astana Oetara dan bagaimana statusnya saat ini?**  
   Astana Oetara berlokasi di Jl. Nayu, Kelurahan Nusukan, Kecamatan Banjarsari, Kota Surakarta, Jawa Tengah. Kompleks ini telah ditetapkan sebagai **Situs Cagar Budaya** oleh Pemkot Surakarta (SK Wali Kota No. 432.22/50.1 Tahun 2021) dan dikelola sebagai museum hidup yang terbuka bagi masyarakat ([astanaoetara.com](https://www.astanaoetara.com/)).

---

## 6. Sumber Rujukan

- [Situs Resmi Astana Oetara — Beranda](https://www.astanaoetara.com/) & [Sejarah & Edukasi Astana Oetara](https://www.astanaoetara.com/info/sejarah-edukasi)
- [Kompas.com Stori — Astana Oetara, Kompleks Pemakaman Mangkunegara VI](https://www.kompas.com/stori/read/2022/06/18/090000079/astana-oetara-kompleks-pemakaman-mangkunegara-vi) (sebagian isi berlangganan Arsip)
- [Wikipedia Bahasa Indonesia — Mangkunegara VI](https://id.wikipedia.org/wiki/Mangkunegara_VI)
- [detikNews — Mengapa KGPAA Mangkunegara VI Tak Dimakamkan di Mangadeg atau Girilayu?](https://news.detik.com/berita-jawa-tengah/d-5681835/mengapa-kgpaa-mangkunegara-vi-tak-dimakamkan-di-mangadeg-atau-girilayu)
