---
title: "Basis Pengetahuan RAG: Kompleks Pemakaman Astana Mangadeg, Astana Giribangun, dan Astana Girilayu"
topic: "Kompleks Pemakaman Penguasa Praja Mangkunegaran dan Keluarga Presiden ke-2 RI di Kecamatan Matesih, Karanganyar"
entities:
  - "Astana Mangadeg"
  - "Astana Giribangun"
  - "Astana Girilayu"
  - "Mangkunegara I, II, III, IV, V, VII, VIII, IX"
  - "Presiden Soeharto & Ibu Tien Soeharto"
  - "Yayasan Mangadeg Surakarta"
  - "Kecamatan Matesih, Kabupaten Karanganyar"
language: "id"
rag_design: "Self-contained semantic chunks per burial complex, explicit entity naming, comparative matrix, and synthetic Q&A pairs"
---

# Basis Pengetahuan RAG: Astana Mangadeg, Astana Giribangun, dan Astana Girilayu

Dokumen ini disusun sebagai basis pengetahuan (*knowledge base*) untuk AI *chatbot* berarsitektur *Retrieval-Augmented Generation* (RAG). Setiap subbab dirancang agar berdiri sendiri (*self-contained*) dengan penyebutan lengkap nama kompleks makam, lokasi administratif, ketinggian, serta tokoh yang dimakamkan sehingga tetap utuh saat dipotong menjadi *chunk* vektor.

---

## 1. Peta Konseptual Kawasan Pemakaman Trah Mangkunegaran di Matesih

Kategori: FAKTA
Situs: Pura Mangkunegaran

Di kawasan perbukitan kaki Gunung Lawu, Kecamatan Matesih, Kabupaten Karanganyar, Jawa Tengah (sekitar 35–37 km di sebelah timur Kota Surakarta), terdapat tiga kompleks pemakaman yang saling berkaitan secara historis dan genealogis dengan **Praja Mangkunegaran** ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)):

1. **Astana Mangadeg:** Peristirahatan terakhir penguasa awal Mangkunegaran (Mangkunegara I, II, dan III) di ketinggian sekitar 750 meter di atas permukaan laut (mdpl) ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg); [Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).
2. **Astana Giribangun:** Mausoleum keluarga Presiden ke-2 RI Soeharto di lereng tepat di bawah Astana Mangadeg (ketinggian 660 mdpl) yang dibangun oleh Yayasan Mangadeg Surakarta karena garis keturunan Ibu Tien Soeharto dari Mangkunegara III ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).
3. **Astana Girilayu:** Kompleks pemakaman lanjutan bagi para penguasa Mangkunegaran berikutnya (Mangkunegara IV, V, VII, VIII, dan IX) yang terletak di puncak Bukit Girilayu (ketinggian sekitar 750 mdpl), berjarak sekitar 3 km dari kompleks Mangadeg–Giribangun ([Wikipedia: Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).

---

## 2. Astana Mangadeg (Makam Mangkunegara I, II, dan III)

Kategori: FAKTA
Situs: Pura Mangkunegaran

**Astana Mangadeg** (dari kata *mangadeg* yang berarti "berdiri") adalah kompleks pemakaman bagi para penguasa awal Kadipaten Mangkunegaran beserta kerabat dekat dan para pengikut setia perjuangannya ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg)).

- **Lokasi dan Geografi:** Kompleks ini berada di puncak **Bukit Mangadeg** di kaki Gunung Lawu (ketinggian sekitar 750 mdpl), di wilayah Kecamatan Matesih, Kabupaten Karanganyar, sekitar 37 km ke arah timur dari Kota Surakarta ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg); [Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)).
- **Tokoh yang Dimakamkan:** Di Astana Mangadeg terdapat tiga bangunan makam utama (*kedaton*/*mausoleum*) tersendiri, yaitu **Kedaton I** di bagian tengah untuk **KGPAA Mangkunegara I** (Raden Mas Said / Pangeran Sambernyawa), **Kedaton II** di sisi timur (*wetan*) untuk **Mangkunegara II**, dan **Kedaton III** di sisi barat (*kulon*) untuk **Mangkunegara III**, beserta makam kerabat dekat dan rekan seperjuangan masa perang melawan Mataram dan VOC ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg); [Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)).
- **Signifikansi Sejarah dan Ajaran *Tri Darma*:** Sebelum menjadi tempat pemakaman, Bukit Mangadeg merupakan lokasi pertapaan dan permenungan Pangeran Sambernyawa selama 16 tahun perjuangan gerilyanya ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg); [Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)). Di tempat ini pula beliau merumuskan falsafah perjuangan **Tri Darma**: *rumangsa melu handarbeni* (merasa ikut memiliki), *wajib melu hangrungkebi* (wajib ikut mempertahankan), dan *mulat sarira hangrasa wani* (berani bermawas diri) ([Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)).
- **Ketentuan Ziarah:** Peziarah yang hendak masuk diwajibkan melapor dan meminta izin kepada juru pelihara pesarean, mengenakan pakaian rapi (bagi perempuan diwajibkan memakai *jarik*), serta mematuhi larangan mengambil foto di area Kedaton I, II, dan III ([Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)).

---

## 3. Astana Giribangun (Makam Keluarga Soeharto dan Keterkaitannya dengan Mangadeg)

Kategori: FAKTA
Situs: Pura Mangkunegaran

**Astana Giribangun** adalah kompleks mausoleum seluas sekitar 4,3 hektare bagi keluarga Presiden ke-2 Republik Indonesia, **H. Muhammad Soeharto**, yang terletak di Desa Girilayu, Kecamatan Matesih, Kabupaten Karanganyar, pada ketinggian **660 mdpl** ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).

### 3.1 Keterkaitan Genealogis dan Tata Ruang dengan Astana Mangadeg
- **Hubungan Kekerabatan Ibu Tien Soeharto:** Astana Giribangun didirikan pada tahun **1974** oleh **Yayasan Mangadeg Surakarta** dan diresmikan pada **23 Juli 1976** dengan pemindahan jenazah K.P.H. Soemoharjomo (ayah Ibu Tien Soeharto) dan Siti Hartini Oudang (kakak tertua Ibu Tien) dari Makam Utoroloyo, Surakarta ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).
- **Filosofi Ketinggian Lokasi:** Penempatan Astana Giribangun pada ketinggian 660 mdpl—tepat di bawah Astana Mangadeg yang berada di ketinggian 750 mdpl—dilakukan secara sengaja sebagai bentuk penghormatan kepada para penguasa Mangkunegaran, mengingat **Ibu Tien Soeharto** merupakan keturunan **Mangkunegara III** ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)). Di sisi timur kompleks Giribangun bahkan tersedia pintu yang terhubung langsung menuju Astana Mangadeg ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).

### 3.2 Struktur Tiga Tingkatan Cungkup Astana Giribangun
Kompleks Astana Giribangun terbagi menjadi tiga tingkatan bangunan makam (*cungkup*) bergaya joglo Surakarta ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)):
1. **Cungkup Argosari (Tingkat Tertinggi/Utama):** Ruangan tengah seluas 81 m² beratap sirap dengan dinding kayu berukir gaya Surakarta, berisi lima makam utama: Siti Hartini (paling barat), pasangan orang tua Ibu Tien yaitu Soemoharjomo (tengah), Ibu Tien Soeharto (paling timur), dan Presiden Soeharto (di sebelah barat makam Ibu Tien). Bagian ini dikelilingi emperan seluas 243 m² (kapasitas 12 makam) dan beranda seluas 405 m² (kapasitas 48 makam bagi pengurus/penasihat Yayasan Mangadeg, termasuk pengusaha Sukamdani Sahid Gitosardjono beserta istri) ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).
2. **Cungkup Argokembang (Tingkat Tengah):** Area seluas 567 m² dengan kapasitas 116 makam bagi pengurus pleno/seksi Yayasan Mangadeg atau keluarga besar Mangkunegaran yang berjasa ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).
3. **Cungkup Argotuwuh (Tingkat Terluar/Bawah):** Area seluas 729 m² dengan kapasitas 156 makam bagi pengurus Yayasan Mangadeg serta keluarga besar Mangkunegaran ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).

---

## 4. Astana Girilayu (Makam Mangkunegara IV, V, VII, VIII, dan IX)

Kategori: FAKTA
Situs: Pura Mangkunegaran

**Astana Girilayu** (dari kata *giri* yang berarti gunung/bukit dan *layu* yang berarti mati/wafat) adalah kompleks pemakaman bagi para penguasa (*Pengageng* / *Mangkunagara*) Praja Mangkunegaran beserta putra-putrinya ([Wikipedia: Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).

- **Lokasi dan Sejarah Pembangunan:** Terletak di puncak **Bukit Girilayu**, Desa Girilayu, Kecamatan Matesih, Kabupaten Karanganyar (ketinggian sekitar **750 mdpl**), berjarak sekitar 3 km dari kompleks Mangadeg–Giribangun ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)). Menurut keterangan pihak Pura Mangkunegaran, kompleks ini mulai dibangun pada masa pemerintahan Mangkunegara IV karena lahan pemakaman di Astana Mangadeg sudah penuh ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).
- **Tokoh yang Dimakamkan:** Di Astana Girilayu dimakamkan **Mangkunegara IV**, **Mangkunegara V**, **Mangkunegara VII**, **Mangkunegara VIII**, serta **Mangkunegara IX** (dimakamkan pada 15 Agustus 2021), masing-masing dengan bangunan mausoleum tersendiri ([Wikipedia: Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).
- **Ketentuan Pemakaman dan Ziarah:** Area paling atas dikhususkan bagi *Pengageng* (Adipati Mangkunegara yang bertakhta) beserta putra-putrinya; generasi cucu tidak dimakamkan di kompleks ini ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)). Peziarah umum diwajibkan melepas alas kaki saat memasuki kompleks makam serta menjaga norma kesopanan ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).

---

## 5. Matriks Perbandingan Astana Mangadeg, Giribangun, dan Girilayu

Kategori: FAKTA
Situs: Pura Mangkunegaran

| Nama Kompleks | Lokasi & Ketinggian | Tokoh Utama yang Dimakamkan | Keterkaitan Sejarah / Pengelolaan | Sumber |
| :--- | :--- | :--- | :--- | :--- |
| **Astana Mangadeg** | Puncak Bukit Mangadeg, Matesih, Karanganyar (±750 mdpl) | Mangkunegara I (Pangeran Sambernyawa), Mangkunegara II, Mangkunegara III, dan kerabat/pejuang awal | Bekas tempat semadi MN I dan tempat perumusan doktrin *Tri Darma* | [Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg); [Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html) |
| **Astana Giribangun** | Desa Girilayu, Matesih, Karanganyar (660 mdpl, tepat di bawah Mangadeg) | Presiden ke-2 RI Soeharto, Ibu Tien Soeharto, Soemoharjomo, Siti Hartini, dan pengurus Yayasan Mangadeg | Dibangun 1974 oleh Yayasan Mangadeg Surakarta; terhubung dengan trah MN III melalui Ibu Tien | [Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun) |
| **Astana Girilayu** | Puncak Bukit Girilayu, Matesih, Karanganyar (±750 mdpl, ±3 km dari Mangadeg) | Mangkunegara IV, Mangkunegara V, Mangkunegara VII, Mangkunegara VIII, Mangkunegara IX, dan putra-putri | Dibangun pada era MN IV sebagai lanjutan karena Astana Mangadeg telah penuh | [Wikipedia: Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix) |

---

## 6. Contoh Pasangan Pertanyaan–Jawaban (Q&A) untuk Retrieval Chatbot

1. **Siapa saja penguasa Mangkunegaran yang dimakamkan di Astana Mangadeg dan siapa yang dimakamkan di Astana Girilayu?**  
   Di **Astana Mangadeg** dimakamkan tiga penguasa awal Mangkunegaran, yakni **Mangkunegara I, II, dan III** ([Wikipedia: Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg)). Setelah kapasitas Astana Mangadeg penuh, dibangunlah **Astana Girilayu** pada masa Mangkunegara IV yang menjadi tempat pemakaman **Mangkunegara IV, V, VII, VIII, dan IX** ([Wikipedia: Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu); [detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).

2. **Apa hubungan Astana Giribangun (makam Presiden Soeharto) dengan Astana Mangadeg?**  
   Astana Giribangun dibangun pada tahun 1974 oleh **Yayasan Mangadeg Surakarta** di ketinggian 660 mdpl—tepat di bawah Astana Mangadeg (750 mdpl)—sebagai bentuk penghormatan kepada para leluhur Mangkunegaran karena **Ibu Tien Soeharto** adalah keturunan Mangkunegara III; bahkan terdapat pintu timur yang menghubungkan Giribangun langsung ke Mangadeg ([Wikipedia: Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)).

3. **Apa aturan bagi peziarah yang berkunjung ke Astana Mangadeg dan Astana Girilayu?**  
   Di Astana Mangadeg, peziarah wajib melapor ke juru pelihara, berbusana rapi (perempuan memakai *jarik*), dan dilarang memotret di area Kedaton I–III ([Duaistanto Journey](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)). Sementara di Astana Girilayu, peziarah wajib melepas alas kaki saat memasuki kompleks makam dan menjaga kesopanan ([detikNews](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)).

---

## 7. Sumber Rujukan

- [Wikipedia Bahasa Indonesia — Astana Mangadeg](https://id.wikipedia.org/wiki/Astana_Mangadeg)
- [Duaistanto Journey — Sejarah Astana Mangadeg: MenapakTilas Jejak Terakhir Pangeran Samber Nyawa](https://www.duaistanto.com/2017/12/astana-mangadeg-menapaktilas-jejak.html)
- [Wikipedia Bahasa Indonesia — Astana Giribangun](https://id.wikipedia.org/wiki/Astana_Giribangun)
- [Wikipedia Bahasa Indonesia — Astana Girilayu](https://id.wikipedia.org/wiki/Astana_Girilayu)
- [detikNews — Mengenal Astana Girilayu, Peristirahatan Terakhir KGPAA Mangkunegara IX](https://news.detik.com/berita-jawa-tengah/d-5682509/mengenal-astana-girilayu-peristirahatan-terakhir-kgpaa-mangkunegara-ix)
