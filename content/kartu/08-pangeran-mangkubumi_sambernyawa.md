---
title: "Basis Pengetahuan RAG: Pangeran Mangkubumi (Hamengkubuwana I) dan Konflik dengan Pangeran Sambernyawa"
topic: "Sejarah Mataram Islam, Perang Takhta Jawa Ketiga, Perjanjian Giyanti, dan Perjanjian Salatiga"
entities:
  - "Pangeran Mangkubumi / Sri Sultan Hamengkubuwana I"
  - "Pangeran Sambernyawa / Raden Mas Said / Mangkunegara I"
  - "Pakubuwana II"
  - "Pakubuwana III"
  - "Pakubuwana IV"
  - "VOC (Vereenigde Oostindische Compagnie)"
  - "Baron van Imhoff"
  - "Nicolaas Hartingh"
period: "1717–1792 (Fokus konflik 1746–1757)"
language: "id"
rag_design: "Self-contained semantic chunks per heading, explicit entity naming without ambiguous pronouns, structured tables, and synthetic Q&A pairs"
---

# Basis Pengetahuan RAG: Pangeran Mangkubumi (Hamengkubuwana I) dan Konflik dengan Pangeran Sambernyawa (Mangkunegara I)

Dokumen ini disusun khusus sebagai konteks basis pengetahuan (*knowledge base*) untuk sistem AI *chatbot* berbasis arsitektur *Retrieval-Augmented Generation* (RAG). Setiap subbab dirancang agar berdiri sendiri (*self-contained*) dengan penyebutan nama tokoh, tahun, dan lokasi secara eksplisit sehingga tetap utuh saat dipotong menjadi *chunk* vektor maupun diambil secara semantik.

---

## 1. Makna Gelar Pangeran Mangkubumi dan Biografi Singkat Hamengkubuwana I

### 1.1 Pengertian Gelar Pangeran Mangkubumi dalam Tradisi Pemerintahan
Dalam tradisi ketatanegaraan kerajaan-kerajaan di Jawa maupun Kalimantan (seperti Kesultanan Banjar), istilah **Pangeran Mangkubumi** merujuk pada jabatan rangkap: seorang pangeran keluarga raja yang sekaligus mengemban tugas sebagai *Mangkubumi* atau kepala administrasi pemerintahan (*Rijksbestierder* / *Raja Bicara*) ([Wikipedia: Pangeran Mangkubumi](https://id.wikipedia.org/wiki/Pangeran_Mangkubumi)). Posisi ini lazimnya dipercayakan kepada adik atau saudara raja yang sedang berkuasa untuk menjaga kesinambungan birokrasi dan stabilitas internal istana ([Wikipedia: Pangeran Mangkubumi](https://id.wikipedia.org/wiki/Pangeran_Mangkubumi)).

### 1.2 Identitas dan Latar Belakang Pangeran Mangkubumi (Hamengkubuwana I)
Tokoh sentral yang paling dikenal menyandang gelar tersebut di Jawa adalah **Bendara Raden Mas Sujana**, yang setelah dewasa bergelar **Bendara Pangeran Harya (BPH) Mangkubumi** dan kelak bertakhta sebagai **Sri Sultan Hamengkubuwana I** ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

- **Kelahiran dan Silsilah:** Bendara Raden Mas Sujana lahir di Keraton Kartasura pada awal Agustus 1717 (tercatat 5 atau 6 Agustus 1717 dalam sumber rujukan) sebagai putra Susuhunan Amangkurat IV dari selir bernama Mas Ayu Tejawati ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Kedudukan Politik:** Ia merupakan adik dari Susuhunan Pakubuwana II sekaligus paman dari Raden Mas Said (Pangeran Sambernyawa) ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Masa Pemerintahan dan Wafat:** Setelah Perjanjian Giyanti pada 13 Februari 1755, Pangeran Mangkubumi resmi diakui sebagai raja pertama Kesultanan Ngayogyakarta Hadiningrat (penobatan 13 Maret 1755) dan memerintah hingga wafat pada 24 Maret 1792 di Keraton Yogyakarta dalam usia 74 tahun, kemudian dimakamkan di Astana Kasuwargan, Imogiri ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Penghargaan Negara:** Pemerintah Republik Indonesia menganugerahkan gelar Pahlawan Nasional Indonesia kepada Sri Sultan Hamengkubuwana I melalui SK Presiden No. 085/TK/2006 tertanggal 10 November 2006 beserta Bintang Mahaputera Adipurna ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

---

## 2. Akar Konflik di Mataram dan Awal Perlawanan (1740–1746)

Ketegangan yang memicu Perang Takhta Jawa Ketiga berakar pada melemahnya otoritas Kesultanan Mataram akibat konflik suksesi internal dan intervensi kongsi dagang Belanda (VOC) ([Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)).

1. **Dampak Pemberontakan 1740–1742 dan Perpindahan Keraton:** Pada 1740 pecah pemberontakan etnis Tionghoa di Batavia yang meluas ke Jawa. Pakubuwana II sempat berpihak kepada pemberontak sebelum berbalik mendukung VOC, yang berujung pada serbuan ke Keraton Kartasura pada 1742 dan pembangunan keraton baru di Surakarta pada 1745 ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)).
2. **Sayembara Tanah Sukawati yang Dibatalkan:** Sisa pasukan perlawanan yang dipimpin Raden Mas Said (Pangeran Sambernyawa) menguasai wilayah Sukawati. Pakubuwana II menjanjikan hadiah tanah seluas 3.000 *cacah* bagi siapa saja yang sanggup merebutnya kembali. Pangeran Mangkubumi berhasil memukul mundur Mas Said pada 1746, namun janji hadiah tanah tersebut dibatalkan atas hasutan Patih Pringgalaya dan VOC yang khawatir kekuatan Mangkubumi akan terlalu dominan ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)).
3. **Konflik dengan Gubernur Jenderal Baron van Imhoff (Mei 1746):** Gubernur Jenderal VOC Baron van Imhoff mendesak Pakubuwana II menyewakan daerah pesisir kepada VOC senilai 20.000 real untuk melunasi utang keraton. Penolakan Pangeran Mangkubumi berujung pada penghinaan terbuka oleh Baron van Imhoff di hadapan istana. Merasa terhina dan dikecewakan, Pangeran Mangkubumi meninggalkan Surakarta pada Mei 1746 dan memilih bergabung dalam perlawanan bersama Pangeran Sambernyawa ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)).

---

## 3. Aliansi Mangkubumi–Sambernyawa dalam Perang Takhta Jawa Ketiga (1746–1752)

Setelah keluar dari Surakarta pada Mei 1746, Pangeran Mangkubumi dan Raden Mas Said (Pangeran Sambernyawa) membentuk front perlawanan bersama melawan Pakubuwana II dan VOC ([Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga); [Scribd: Makalah Perlawanan Pangeran Mangkubumi dan Mas Said](https://id.scribd.com/document/604204332/Makalah-PERLAWANAN-Pangeran-Mangkubumi-dan-Mas-Said)).

- **Ikatan Kekerabatan dan Pernikahan Politik:** Untuk mempererat persekutuan militer dan politik, Pangeran Mangkubumi menikahkan putrinya, Gusti Raden Ajeng Inten (Gusti Kangjeng Ratu Bendara), dengan Raden Mas Said ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Kekuatan Militer dan Kemenangan Awal:** Pada 1747, pasukan gabungan di bawah pengaruh Mangkubumi diperkirakan mencapai 13.000 prajurit (termasuk sekitar 2.500 pasukan berkuda), dan pada 1748 mereka melancarkan serangan ke Surakarta serta mencatat kemenangan di Demak dan Grobogan ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)).
- **Krisis Suksesi 1749 dan Dualisme Raja:** Menjelang wafatnya Pakubuwana II pada akhir 1749, ia menyerahkan kedaulatan Mataram kepada VOC (11 Desember 1749). Di sisi lain, para pengikut Pangeran Mangkubumi menobatkannya sebagai raja di Desa Banaran (Kabanaran) pada 11/12 Desember 1749 dengan gelar Susuhunan (dikenal sebagai **Sunan Kabanaran**), sementara VOC menobatkan putra Pakubuwana II, Raden Mas Suryadi, sebagai **Pakubuwana III** pada 15 Desember 1749 ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Scribd: Makalah Perlawanan Pangeran Mangkubumi dan Mas Said](https://id.scribd.com/document/604204332/Makalah-PERLAWANAN-Pangeran-Mangkubumi-dan-Mas-Said)).
- **Pertempuran Sungai Bogowonto (1751):** Perang gerilya terus berlanjut hingga puncaknya pada 1751, ketika pasukan Pangeran Mangkubumi menghancurkan pasukan VOC pimpinan Kapten de Clerck (Kapten Klerek) di tepi Sungai Bogowonto ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

---

## 4. Perpecahan Aliansi dan Lahirnya Perjanjian Giyanti (1752–1755)

Persatuan antara Pangeran Mangkubumi dan Pangeran Sambernyawa tidak bertahan hingga akhir perang karena perbedaan ambisi politik atas takhta Mataram ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)).

- **Retaknya Hubungan (1752):** Pada tahun 1752 terjadi perselisihan terbuka antara Pangeran Mangkubumi dan Pangeran Sambernyawa mengenai siapa yang berhak memegang supremasi tunggal atas seluruh wilayah Mataram ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Diplomasi VOC dengan Mangkubumi (1754):** Memanfaatkan perpecahan tersebut dan tertekan oleh biaya perang yang tinggi, VOC melalui Gubernur Pesisir Utara Jawa Nicolaas Hartingh berunding secara langsung dengan Pangeran Mangkubumi pada September 1754 ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)). Kedua pihak menyepakati pembagian setengah wilayah Mataram bagi Mangkubumi serta pembagian dana sewa pesisir sebesar 20.000 real menjadi masing-masing 10.000 real untuk Mangkubumi dan 10.000 real untuk Pakubuwana III ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).
- **Penandatanganan Perjanjian Giyanti (13 Februari 1755):** Kesepakatan resmi ditandatangani di Desa Giyanti (kini wilayah Karanganyar, Jawa Tengah) antara Pangeran Mangkubumi, Susuhunan Pakubuwana III, dan VOC. Melalui konsep *Palihan Nagari*, Kesultanan Mataram dibagi menjadi dua pemerintahan berdaulat ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)):
  1. **Kasunanan Surakarta Hadiningrat**, dipimpin oleh Susuhunan Pakubuwana III.
  2. **Kesultanan Ngayogyakarta Hadiningrat**, dipimpin oleh Pangeran Mangkubumi dengan gelar **Sultan Hamengkubuwana I**.
- **Dampak terhadap Pangeran Sambernyawa:** Perjanjian Giyanti sekaligus membentuk persekutuan baru antara Hamengkubuwana I, Pakubuwana III, dan VOC untuk menghadapi perlawanan kelompok Pangeran Sambernyawa yang tidak dilibatkan dalam perundingan ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)).

---

## 5. Konflik Lanjutan dengan Pangeran Sambernyawa hingga Perjanjian Salatiga (1755–1757)

Keputusan Pangeran Mangkubumi berdamai dengan VOC dan Pakubuwana III melalui Perjanjian Giyanti memicu fase akhir Perang Takhta Jawa Ketiga yang menjadi jalan langsung berdirinya Kadipaten Mangkunegaran ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga); [Detikcom](https://www.detik.com/jateng/berita/d-8202833/sejarah-perjanjian-salatiga-1757-ini-isi-latar-belakang-dan-dampaknya)).

### 5.1 Perlawanan Tiga Front oleh Pangeran Sambernyawa
Merasa dikhianati dan disingkirkan dari hasil Perjanjian Giyanti, Pangeran Sambernyawa menolak mengakui kesepakatan tersebut dan melancarkan perlawanan bersenjata melawan gabungan tiga kekuatan sekaligus: **Pakubuwana III (Surakarta)**, **Hamengkubuwana I (Yogyakarta)**, dan **VOC** ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)). Pertempuran berlarut-larut menghasilkan kebuntuan strategis: gabungan tiga kekuatan gagal menumpas taktik gerilya Sambernyawa, sedangkan Sambernyawa juga tidak mampu menaklukkan ketiganya secara bersamaan ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga)).

### 5.2 Perundingan dan Isi Perjanjian Salatiga (17 Maret 1757)
Karena krisis finansial akibat perang berkepanjangan, VOC memprakarsai perundingan damai sejak 1756 ([Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)). Puncaknya, pada **17 Maret 1757**, ditandatangani **Perjanjian Salatiga** di Gedung Pakuwon, Salatiga, oleh Pangeran Sambernyawa, Pakubuwana III, VOC sebagai penengah, serta wakil Sultan Hamengkubuwana I yaitu Patih Danureja ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga); [Detikcom](https://www.detik.com/jateng/berita/d-8202833/sejarah-perjanjian-salatiga-1757-ini-isi-latar-belakang-dan-dampaknya)).

Inti kesepakatan Perjanjian Salatiga meliputi ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)):
- **Pengakuan Status dan Gelar:** Raden Mas Said diangkat sebagai *Pangeran Miji* (penguasa otonom setingkat adipati) dengan gelar **Kanjeng Gusti Pangeran Adipati Arya (KGPAA) Mangkunegara I** yang memimpin **Kadipaten Mangkunegaran**, tetapi tidak diperbolehkan memakai gelar *Susuhunan* atau *Sultan*.
- **Pembagian Wilayah Lungguh:** Mangkunegara I menerima separuh bagian dari wilayah Surakarta berupa tanah *lungguh* seluas 4.000 *karya*/*cacah* yang tersebar di Kaduwang, Nglaroh, Matesih, Wiroko, Haribaya, Honggobayan, Sembuyan, Gunung Kidul, Kedu, serta Pajang bagian utara dan selatan (kini mencakup wilayah Wonogiri, Karanganyar, serta beberapa enklave).
- **Batasan Simbolik dan Yudikatif:** Sebagai adipati, Mangkunegara I berhak menyelenggarakan upacara penobatan adipati beserta kelengkapannya, namun dilarang menduduki singgasana *Dampar Kencana*, dilarang memiliki *Balai Witana*, dilarang memiliki alun-alun dengan sepasang pohon beringin kembar, serta tidak berwenang menjatuhkan hukuman mati.

Dengan ditandatanganinya Perjanjian Salatiga, wilayah eks-Kesultanan Mataram resmi terpecah menjadi tiga entitas politik: Kasunanan Surakarta, Kesultanan Yogyakarta, dan Kadipaten Mangkunegaran ([Wikipedia: Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)).

---

## 6. Pendirian Yogyakarta, Dinamika Pasca-Perjanjian, dan Warisan Hamengkubuwana I (1755–1792)

### 6.1 Pembangunan Keraton Yogyakarta
Pada April 1755, Sultan Hamengkubuwana I membuka Hutan Pabringan (bekas pesanggrahan Dalem Garjiwati/Ayogya) untuk membangun ibu kota baru bernama **Ngayogyakarta Hadiningrat** ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)). Setelah pembangunan tahap awal selesai, Hamengkubuwana I resmi memindahkan pusat pemerintahan dari Kabanaran ke Keraton Yogyakarta pada **7 Oktober 1756** ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

### 6.2 Ketegangan Lanjutan dan Rekonsiliasi Politik (1788–1790)
- **Tuntutan Mangkunegara I terhadap Yogyakarta (1790):** Pasca-Perjanjian Salatiga, hubungan Yogyakarta dan Mangkunegaran masih menyisakan sengketa terkait perceraian GKR Bendara (putri HB I) dengan Mangkunegara I serta tuntutan kompensasi 4.000 *cacah* dari wilayah Yogyakarta yang sempat memicu mobilisasi pasukan di Gunung Kidul. Pada November 1790, sengketa ini diredam melalui pembayaran upeti tahunan oleh pihak Belanda kepada Mangkunegaran sebesar 4.000 real ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga)).
- **Aliansi Sementara Menghadapi Pakubuwana IV (1790):** Ketika Pakubuwana IV naik takhta di Surakarta pada 1788 dan mengangkat saudaranya sendiri dengan gelar Pangeran Mangkubumi serta tidak mengakui hak suksesi putra mahkota Yogyakarta, ketegangan kembali memuncak. Pada 1790, Hamengkubuwana I dan Mangkunegara I untuk pertama kalinya kembali bersekutu bersama VOC mengepung Surakarta hingga Pakubuwana IV bersedia membubarkan kelompok penasihat spiritualnya ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

### 6.3 Warisan Kebudayaan dan Sikap Anti-Kolonial
Meskipun berdamai melalui Perjanjian Giyanti, Hamengkubuwana I tetap membatasi campur tangan VOC dalam urusan internal Yogyakarta dan berupaya memperlambat pembangunan benteng Belanda ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)). Di bidang kebudayaan dan arsitektur, beliau memprakarsai pembangunan kompleks **Taman Sari Yogyakarta** yang dirancang oleh arsitek asal Portugis bergelar Jawa **Demang Tegis** ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

---

## 7. Ringkasan Kronologi & Entitas Kunci (Referensi Terstruktur untuk RAG)

### 7.1 Lini Masa Peristiwa Penting

| Tahun / Tanggal | Peristiwa | Tokoh & Pihak Terlibat | Signifikansi Sejarah | Sumber |
| :--- | :--- | :--- | :--- | :--- |
| 5/6 Agustus 1717 | Kelahiran BRM Sujana (calon Hamengkubuwana I) | Amangkurat IV, Mas Ayu Tejawati | Awal silsilah pendiri Kesultanan Yogyakarta | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |
| Mei 1746 | Pembatalan hadiah Sukawati & penghinaan Baron van Imhoff | Pangeran Mangkubumi, Pakubuwana II, Patih Pringgalaya, Baron van Imhoff | Pemicu langsung pemberontakan Mangkubumi & aliansi dengan Mas Said | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |
| 11–15 Desember 1749 | Dualisme takhta: Sunan Kabanaran vs. Pakubuwana III | Pangeran Mangkubumi, Pakubuwana II, Pakubuwana III, VOC | Awal resmi Perang Takhta Jawa Ketiga | [Wikipedia](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga) |
| 1751 | Pertempuran Sungai Bogowonto | Pangeran Mangkubumi, Kapten de Clerck (VOC) | Kekalahan besar pasukan VOC oleh taktik Mangkubumi | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |
| 1752 | Perpecahan Mangkubumi dan Pangeran Sambernyawa | Pangeran Mangkubumi, Raden Mas Said | Retaknya koalisi pemberontak akibat perebutan supremasi Mataram | [Wikipedia](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga) |
| 13 Februari 1755 | Penandatanganan Perjanjian Giyanti | Hamengkubuwana I, Pakubuwana III, VOC (Nicolaas Hartingh) | *Palihan Nagari*: Mataram terbagi menjadi Surakarta dan Yogyakarta | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |
| 7 Oktober 1756 | Perpindahan resmi ke Keraton Ngayogyakarta Hadiningrat | Sultan Hamengkubuwana I | Berdirinya pusat pemerintahan Kesultanan Yogyakarta | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |
| 17 Maret 1757 | Penandatanganan Perjanjian Salatiga | Mangkunegara I, Pakubuwana III, Patih Danureja (wakil HB I), VOC | Lahirnya Kadipaten Mangkunegaran dan berakhirnya Perang Takhta Jawa Ketiga | [Wikipedia](https://id.wikipedia.org/wiki/Perjanjian_Salatiga) |
| 1790 | Pengepungan Surakarta & penyelesaian sengketa 4.000 cacah | Hamengkubuwana I, Mangkunegara I, Pakubuwana IV, VOC | Aliansi sementara HB I–MN I dan kompensasi 4.000 real oleh Belanda | [Wikipedia](https://id.wikipedia.org/wiki/Perjanjian_Salatiga) |
| 24 Maret 1792 | Wafatnya Sri Sultan Hamengkubuwana I | Hamengkubuwana I, digantikan Hamengkubuwana II | Akhir pemerintahan raja pertama Yogyakarta | [Wikipedia](https://id.wikipedia.org/wiki/Hamengkubuwana_I) |

---

## 8. Contoh Pasangan Pertanyaan–Jawaban (Q&A) untuk Retrieval Chatbot

1. **Mengapa Pangeran Mangkubumi meninggalkan Keraton Surakarta dan bersekutu dengan Pangeran Sambernyawa pada 1746?**  
   Pangeran Mangkubumi kecewa karena hadiah tanah 3.000 *cacah* atas keberhasilannya merebut Sukawati dibatalkan Pakubuwana II akibat hasutan Patih Pringgalaya, serta tersinggung oleh penghinaan terbuka Gubernur Jenderal VOC Baron van Imhoff terkait penolakan sewa daerah pesisir senilai 20.000 real ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)).

2. **Apa penyebab pecahnya konflik antara Pangeran Mangkubumi dan Pangeran Sambernyawa?**  
   Aliansi mereka retak pada 1752 karena sama-sama menginginkan supremasi tunggal atas seluruh Mataram. Konflik memuncak setelah Pangeran Mangkubumi menandatangani Perjanjian Giyanti (13 Februari 1755) dengan VOC dan Pakubuwana III tanpa melibatkan Pangeran Sambernyawa, sehingga Sambernyawa merasa dikhianati dan memerangi ketiganya ([Wikipedia: Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I); [Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga)).

3. **Bagaimana peran konflik tersebut terhadap berdirinya Kadipaten Mangkunegaran dalam Perjanjian Salatiga?**  
   Perlawanan gerilya Pangeran Sambernyawa selama 1755–1757 terhadap gabungan VOC, Surakarta, dan Yogyakarta menciptakan kebuntuan militer dan membebani keuangan VOC. Untuk mengakhiri perang, VOC memediasi Perjanjian Salatiga pada 17 Maret 1757 yang mengakui Raden Mas Said sebagai *Pangeran Miji* bergelar Mangkunegara I dengan wilayah Kadipaten Mangkunegaran seluas 4.000 *karya*/*cacah* ([Wikipedia: Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga); [Tirto.id](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd)).

---

## 9. Catatan Sumber Rujukan dan Keterbatasan Akses

- **Sumber Terbaca Penuh:**
  - [Wikipedia Bahasa Indonesia — Pangeran Mangkubumi](https://id.wikipedia.org/wiki/Pangeran_Mangkubumi)
  - [Wikipedia Bahasa Indonesia — Hamengkubuwana I](https://id.wikipedia.org/wiki/Hamengkubuwana_I)
  - [Wikipedia Bahasa Indonesia — Perang Takhta Jawa Ketiga](https://id.wikipedia.org/wiki/Perang_Takhta_Jawa_Ketiga)
  - [Wikipedia Bahasa Indonesia — Perjanjian Salatiga](https://id.wikipedia.org/wiki/Perjanjian_Salatiga) (sumber pendukung detail isi pasal perjanjian)
  - [Tirto.id — Isi Perjanjian Salatiga, Sejarah, Latar Belakang, dan Dampaknya](https://tirto.id/isi-perjanjian-salatiga-sejarah-latar-belakang-dan-dampaknya-haLd) & [Detikcom — Sejarah Perjanjian Salatiga 1757](https://www.detik.com/jateng/berita/d-8202833/sejarah-perjanjian-salatiga-1757-ini-isi-latar-belakang-dan-dampaknya) (sumber pendukung konteks Perjanjian Salatiga)
- **Sumber Terbatas / Tidak Dapat Diakses Penuh:**
  - [Scribd — Makalah Perlawanan Pangeran Mangkubumi dan Mas Said](https://id.scribd.com/document/604204332/Makalah-PERLAWANAN-Pangeran-Mangkubumi-dan-Mas-Said) (halaman penuh berbayar/terbatas; hanya cuplikan terindeks yang digunakan).
  - [Kraton Jogja — Sri Sultan Hamengku Buwono I](https://www.kratonjogja.id/raja-raja/2-sri-sultan-hamengku-buwono-i/) (akses diblokir oleh situs).
  - [Instagram Reel DJln9eZh3zk](https://www.instagram.com/reel/DJln9eZh3zk/) (konten video/media sosial tidak dapat diakses langsung oleh perayap teks).
