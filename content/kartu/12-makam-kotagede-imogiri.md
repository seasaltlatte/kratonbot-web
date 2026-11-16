---
title: "Basis Pengetahuan RAG: Makam Raja-Raja Mataram di Kotagede dan Astana Pajimatan Himagiri (Imogiri)"
topic: "Sejarah, Pembagian Kompleks, Daftar Raja yang Dimakamkan, serta Pengecualian HB II dan Amangkurat I"
entities:
  - "Pasarean Mataram Kotagede (Astana Kita Ageng)"
  - "Astana Pajimatan Himagiri (Makam Raja Imogiri)"
  - "Panembahan Senapati & Panembahan Hanyakrawati"
  - "Sultan Agung Hanyakrakusuma"
  - "Sri Sultan Hamengkubuwana II (Pengecualian Imogiri)"
  - "Susuhunan Amangkurat I / Sunan Tegalarum (Pengecualian Imogiri)"
  - "Kasunanan Surakarta Hadiningrat & Kesultanan Ngayogyakarta Hadiningrat"
language: "id"
rag_design: "Self-contained semantic chunks per burial complex, explicit exception handling, structured tables, and synthetic Q&A pairs"
---

# Basis Pengetahuan RAG: Makam Raja-Raja Mataram di Kotagede dan Imogiri

Dokumen ini disusun sebagai basis pengetahuan (*knowledge base*) untuk AI *chatbot* berarsitektur *Retrieval-Augmented Generation* (RAG). Setiap subbab dirancang agar berdiri sendiri (*self-contained*) dengan penyebutan eksplisit nama kompleks makam, daftar penguasa, dan pengecualian historisnya agar tetap utuh saat dipotong menjadi *chunk* vektor.

---

## 1. Makam Raja-Raja Mataram di Kotagede (*Pasarean Mataram* / *Astana Kita Ageng*)

Kategori: FAKTA
Situs: Kotagede (Warisan Mataram Islam)

**Kompleks Makam Raja Kotagede** (dikenal juga sebagai **Pasarean Mataram**, **Astana Kita Ageng**, atau **Hastana Kitha Ageng**) merupakan kompleks pemakaman tertua bagi para pendiri dan raja awal Kesultanan Mataram Islam sebelum masa Sultan Agung ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).

### 1.1 Sejarah, Lokasi, dan Arsitektur
- **Lokasi:** Terletak di sebelah barat **Masjid Gedhe Mataram Kotagede**, masuk wilayah Dusun Sayangan, Jagalan, Kecamatan Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta—sekitar 100 meter dari Pasar Kotagede ([Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede); [Kompas.com](https://yogyakarta.kompas.com/read/2022/09/24/091100678/-makam-raja-raja-mataram-di-kotagede--sejarah-dan-daftar-nama-raja-yang)).
- **Pembangunan:** Didirikan oleh **Panembahan Senapati** secara bertahap antara tahun **1589 hingga 1606** di kawasan bekas ibu kota pertama Mataram Islam yang dirintis oleh Ki Ageng Pamanahan di Alas Mentaok ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)). Setelah kebakaran merusak sebagian bangunan, Susuhunan Pakubuwana X memprakarsai renovasi besar pada abad ke-20 (sekitar 1926) ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).
- **Struktur Bangunan dan Pengelolaan:** Kompleks ini dikelilingi tembok bata dengan tiga **Gapura Paduraksa** bergaya arsitektur Jawa pra-Islam, memiliki tiga cungkup utama (**Bangsal Prabayaksa**, **Bangsal Witana**, dan **Bangsal Tajug**), serta bersebelahan dengan pemandian keramat **Sendang Seliran** ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)). Pasca-Perjanjian Giyanti (1755), kawasan pusaka Kotagede tidak dibagi secara sepihak dan tetap dirawat bersama oleh abdi dalem dari **Kasunanan Surakarta** dan **Kesultanan Yogyakarta** ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede)).

### 1.2 Tokoh yang Dimakamkan dan Pengecualian Sultan Hamengkubuwana II
Tokoh penting yang dimakamkan di Kompleks Makam Raja Kotagede antara lain:
- **Ki Ageng Pamanahan** (Ki Gede Mataram, perintis Alas Mentaok sekaligus ayah Panembahan Senapati) ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).
- **Panembahan Senapati** (Danang Sutawijaya, pendiri sekaligus raja pertama Mataram Islam) ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).
- **Panembahan Hanyakrawati** (Mas Jolang, raja kedua Mataram Islam sebelum Sultan Agung) ([Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).
- **Sultan Hadiwijaya** (Joko Tingkir, Raja Kesultanan Pajang) ([Wikipedia: Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede); [Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).
- **Sri Sultan Hamengkubuwana II (Pengecualian Era Yogyakarta):** Meskipun para Sultan Yogyakarta umumnya dimakamkan di Imogiri, **Sultan Hamengkubuwana II** (wafat 3 Januari 1828) dimakamkan di Kotagede karena faktor keamanan jalur dan situasi genting di tengah berkecamuknya **Perang Jawa / Perang Diponegoro (1825–1830)** ([LiraNews](https://liranews.com/refleksi-perjuangan-sultan-hb-ii-menuju-pahlawan-nasional/); [Intisari](https://intisari.grid.id/read/033785918/padahal-raja-trah-mataram-islam-juga-ini-alasan-sultan-hamengkubuwono-ii-tak-dimakamkan-di-makam-imogiri)).

### 1.3 Ketentuan Ziarah di Makam Kotagede
Peziarah wajib melepas alas kaki, dilarang memotret di area makam, serta mengenakan busana adat Jawa (perempuan mengenakan kain *jarik* sebatas dada/kemben tanpa penutup kepala; laki-laki mengenakan *jarik* dan baju peranakan). Kunjungan dibuka pada hari Senin, Kamis, Jumat, dan Minggu, serta tutup selama bulan Ramadan ([Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)).

---

## 2. Makam Raja Imogiri (*Astana Pajimatan Himagiri*)

Kategori: FAKTA
Situs: Imogiri, makam raja Kasunanan dan Yogyakarta (Keraton Kasunanan)

**Pasarean Dalem Para Nata Astana Pajimatan Himagiri** (populer disebut **Makam Raja Imogiri**) adalah kompleks pemakaman kerajaan berteras di Kalurahan Wukirsari, Kapanewon Imogiri, Kabupaten Bantul, Daerah Istimewa Yogyakarta, yang menjadi tempat peristirahatan terakhir **Sultan Agung** beserta raja-raja penerus Wangsa Mataram di Surakarta dan Yogyakarta ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)).

### 2.1 Etimologi, Sejarah Pembangunan, dan Tata Letak
- **Makna Nama:** Secara etimologis, *astana* berarti tempat, *pajimatan* berarti penyakralan, dan *himagiri* berasal dari kata Sanskerta *hima* (kabut/salju) serta *giri* (gunung/bukit), sehingga bermakna "tempat penyakralan gunung berkabut" ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)).
- **Pendirian (1632):** Kompleks ini mulai dibangun pada **1632** atas prakarsa **Sultan Agung Hanyakrakusuma** (dipimpin arsitek K.R.K.T. Citrokusumo) di atas **Bukit Merak** (ketinggian ~100 mdpl) di sebelah selatan Astana Girilaya yang sebelumnya telah dipakai untuk makam kerabat Sultan Agung ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)). Sultan Agung wafat pada 1646 dan menjadi raja pertama yang dimakamkan di Imogiri ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)).
- **Arsitektur Simbolis:** Akses menuju puncak makam melewati **Gapura Supit Urang** dan rangkaian tangga (sekitar 446 anak tangga dengan segmentasi simbolis: 32 anak tangga melambangkan tahun pembangunan 1632, 13 melambangkan naik takhtanya Sultan Agung pada 1613, 46 melambangkan wafatnya tahun 1646, dan 9 melambangkan Walisanga), dilengkapi masjid, bangsal, *regol*, dan *kelir* ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)).

### 2.2 Pembagian Kompleks dan Daftar Raja yang Dimakamkan
Pasca-Perjanjian Giyanti (1755), pengelolaan Astana Pajimatan Himagiri dibagi bersama antara Kasunanan Surakarta (sisi barat) dan Kesultanan Yogyakarta (sisi timur), sedangkan makam raja Mataram sebelum perpecahan berada di sisi utara paling atas ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)):

| Bagian Kompleks | Sub-Kompleks (*Astana* / *Kedhaton*) | Penguasa yang Dimakamkan | Sumber |
| :--- | :--- | :--- | :--- |
| **Utara / Atas (Mataram Islam)** | *Astana Kasultanagungan* | Sultan Agung Anyakrakusuma, Kanjeng Ratu Batang (permaisuri), Amangkurat II, Amangkurat III | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Utara / Atas (Mataram Islam)** | *Astana Pakubuwanan* | Pakubuwana I, Amangkurat IV, Pakubuwana II | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Barat (Kasunanan Surakarta)** | *Astana Kaswargan* | Pakubuwana III, Pakubuwana IV, Pakubuwana V | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Barat (Kasunanan Surakarta)** | *Astana Kapingsangan* | Pakubuwana VI, Pakubuwana VII, Pakubuwana VIII, Pakubuwana IX | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Barat (Kasunanan Surakarta)** | *Astana Girimulya* | Pakubuwana X, Pakubuwana XI, Pakubuwana XII, Pakubuwana XIII | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Timur (Kesultanan Yogyakarta)** | *Astana Kaswargan* | Hamengkubuwana I, Hamengkubuwana III *(tanpa HB II)* | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Timur (Kesultanan Yogyakarta)** | *Astana Besiyaran* | Hamengkubuwana IV, Hamengkubuwana V, Hamengkubuwana VI | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |
| **Sisi Timur (Kesultanan Yogyakarta)** | *Astana Saptarengga* | Hamengkubuwana VII, Hamengkubuwana VIII, Hamengkubuwana IX | [Wikipedia: Imogiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri) |

### 2.3 Pengecualian Amangkurat I (Dimakamkan di Tegalarum) dan Hamengkubuwana II
- **Mengapa Amangkurat I Tidak Dimakamkan di Imogiri?** Susuhunan **Amangkurat I** (memerintah 1646–1677) wafat pada 13 Juli 1677 di Wanayasa (Banyumas utara) saat melarikan diri dari Pemberontakan Trunajaya yang menduduki Keraton Plered ([Wikipedia: Amangkurat I](https://id.wikipedia.org/wiki/Amangkurat_I)). Sebelum wafat, Amangkurat I berwasiat agar dimakamkan di dekat gurunya di kawasan **Pesarean Tegalarum / Tegalwangi** (Adiwerna, Tegal, Jawa Tengah), sehingga ia mendapat gelar anumerta *Sunan Tegalarum* ([Wikipedia: Amangkurat I](https://id.wikipedia.org/wiki/Amangkurat_I); [Hops.id](https://www.hops.id/unik/29410786981/sebelum-wafat-raja-amangkurat-i-sempat-berwasiat-supaya-dimakamkan-dekat-gurunya-di-daerah-ini)).
- **Mengapa Hamengkubuwana II Tidak Dimakamkan di Imogiri?** Sultan **Hamengkubuwana II** dimakamkan di **Makam Kotagede** karena faktor keamanan saat berkecamuknya Perang Diponegoro pada tahun 1828 ([LiraNews](https://liranews.com/refleksi-perjuangan-sultan-hb-ii-menuju-pahlawan-nasional/); [Intisari](https://intisari.grid.id/read/033785918/padahal-raja-trah-mataram-islam-juga-ini-alasan-sultan-hamengkubuwono-ii-tak-dimakamkan-di-makam-imogiri)).

### 2.4 Tradisi Rutin di Astana Pajimatan Himagiri
Tiga tradisi adat utama yang secara berkala diselenggarakan di Imogiri oleh abdi dalem Surakarta dan Yogyakarta meliputi ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)):
1. **Ngarak Siwur:** Kirab budaya membawa *siwur* (gayung tempurung kelapa dari masing-masing keraton Surakarta dan Yogyakarta) pada hari Kamis Wage sore di bulan Sura.
2. **Nawu Enceh:** Upacara pengurasan dan pembersihan air tempayan (*enceh*) di depan makam Sultan Agung pada hari Jumat Kliwon bulan Sura disertai doa bagi leluhur.
3. **Nyadran Karaton:** Ziarah dan doa bersama pada bulan Ruwah yang melibatkan *abdi dalem*, *santana dalem*, dan *pangageng* keraton.

---

## 3. Contoh Pasangan Pertanyaan–Jawaban (Q&A) untuk Retrieval Chatbot

1. **Siapa saja raja Mataram Islam yang dimakamkan di Kotagede dan siapa yang dimakamkan di Imogiri?**  
   **Makam Kotagede** merupakan tempat peristirahatan tokoh perintis dan raja Mataram sebelum Sultan Agung—yakni Ki Ageng Pamanahan, Panembahan Senapati, dan Panembahan Hanyakrawati—ditambah Sultan Hadiwijaya dari Pajang serta pengecualian Sultan Hamengkubuwana II ([Dinas Kebudayaan DIY](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede); [LiraNews](https://liranews.com/refleksi-perjuangan-sultan-hb-ii-menuju-pahlawan-nasional/)). Sementara itu, **Makam Imogiri** menjadi tempat pemakaman Sultan Agung, para penerus Mataram setelahnya (kecuali Amangkurat I), raja-raja Kasunanan Surakarta (Pakubuwana III–XIII), dan Sultan Yogyakarta (HB I serta HB III–IX) ([Wikipedia: Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)).

2. **Mengapa Sultan Hamengkubuwana II dimakamkan di Kotagede, bukan di Imogiri?**  
   Sultan Hamengkubuwana II yang wafat pada Januari 1828 dimakamkan di Kotagede karena pertimbangan faktor keamanan jalur dan situasi konflik di tengah berlangsungnya Perang Jawa (Perang Diponegoro) ([LiraNews](https://liranews.com/refleksi-perjuangan-sultan-hb-ii-menuju-pahlawan-nasional/); [Intisari](https://intisari.grid.id/read/033785918/padahal-raja-trah-mataram-islam-juga-ini-alasan-sultan-hamengkubuwono-ii-tak-dimakamkan-di-makam-imogiri)).

3. **Mengapa Susuhunan Amangkurat I tidak dimakamkan di Imogiri meskipun ia putra Sultan Agung?**  
   Amangkurat I wafat pada 1677 di Wanayasa saat melarikan diri dari Pemberontakan Trunajaya dan berwasiat agar dimakamkan di dekat gurunya di Pesarean Tegalarum (Tegalwangi), Kabupaten Tegal ([Wikipedia: Amangkurat I](https://id.wikipedia.org/wiki/Amangkurat_I)).

---

## 4. Catatan Sumber Rujukan dan Keterbatasan Akses

- **Sumber Terbaca:**
  - [Wikipedia Bahasa Indonesia — Keraton Kotagede](https://id.wikipedia.org/wiki/Keraton_Kotagede)
  - [Dinas Kebudayaan DIY — Kompleks Makam Raja-Raja Mataram Islam di Kotagede](https://budaya.jogjaprov.go.id/berita/detail/1395-kompleks-makam-raja-raja-mataram-islam-destinasi-wisata-religi-di-kotagede)
  - [Kompas.com Yogyakarta — Makam Raja-Raja Mataram di Kotagede](https://yogyakarta.kompas.com/read/2022/09/24/091100678/-makam-raja-raja-mataram-di-kotagede--sejarah-dan-daftar-nama-raja-yang) (sebagian isi berlangganan Arsip)
  - [Wikipedia Bahasa Indonesia — Astana Pajimatan Himagiri](https://id.wikipedia.org/wiki/Astana_Pajimatan_Himagiri)
  - Sumber pendukung pengecualian: [Wikipedia — Amangkurat I](https://id.wikipedia.org/wiki/Amangkurat_I), [LiraNews — Refleksi Perjuangan Sultan HB II](https://liranews.com/refleksi-perjuangan-sultan-hb-ii-menuju-pahlawan-nasional/), dan [Intisari — Alasan Sultan HB II Tak Dimakamkan di Imogiri](https://intisari.grid.id/read/033785918/padahal-raja-trah-mataram-islam-juga-ini-alasan-sultan-hamengkubuwono-ii-tak-dimakamkan-di-makam-imogiri).
- **Sumber Terbatas / Tidak Dapat Diakses:**
  - `https://www.kratonjogja.id/tata-rakiting/17-makam-imogiri-peristirahatan-raja-raja-mataram/` (akses diblokir oleh situs).
