---
title: "Basis Pengetahuan RAG: Babad Tanah Jawi dan Periodisasi Sejarah Penguasa Jawa"
topic: "Historiografi Tradisional Jawa, Versi Naskah Babad Tanah Jawi, dan Daftar Penguasa Jawa dari Era Kuno hingga Era Baru"
entities:
  - "Babad Tanah Jawi"
  - "Carik Tumenggung Tirtowiguno (Carik Braja)"
  - "Carik Adilangu II"
  - "Ngabehi Kertapradja"
  - "J.J. Meinsma"
  - "W.L. Olthof"
  - "Kerajaan Kadiri, Pengging, Janggala, Majapahit"
  - "Kerajaan Demak, Pajang, Mataram"
  - "Kasunanan Surakarta, Kesultanan Yogyakarta, Kadipaten Mangkunagaran"
period: "Era Jawa Kuno hingga masa kini (fokus naskah abad ke-18–19)"
language: "id"
rag_design: "Self-contained semantic chunks per heading, explicit entity naming, structured dynastic tables, and synthetic Q&A pairs"
---

# Basis Pengetahuan RAG: Babad Tanah Jawi (Sejarah Pulau Jawa dari Era Kuno hingga Masa Kini)

Dokumen ini disusun sebagai basis pengetahuan (*knowledge base*) untuk AI *chatbot* berbasis arsitektur *Retrieval-Augmented Generation* (RAG). Setiap bagian dirancang berdiri sendiri (*self-contained*) dengan penyebutan nama tokoh, era, dan naskah secara eksplisit agar tetap utuh saat dipotong menjadi *chunk* vektor.

---

## 1. Pengertian, Bentuk Sastra, dan Karakteristik Babad Tanah Jawi

**Babad Tanah Jawi** (aksara Jawa: *ꦧꦧꦢ꧀ꦠꦤꦃꦗꦮꦶ*, berarti "Sejarah Tanah Jawa") adalah karya sastra sejarah berbahasa Jawa yang aslinya digubah dalam bentuk puisi tradisional tembang *macapat* ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)). Karya ini berpusat pada historiografi Dinasti Mataram Islam dan menjadi rujukan penting dalam menelaah tradisi penulisan sejarah Pulau Jawa ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

- **Genealogi Lintas Peradaban:** Salah satu ciri khas Babad Tanah Jawi adalah penyusunan silsilah raja-raja Jawa yang ditarik jauh ke belakang hingga **Nabi Adam** dan nabi-nabi lainnya sebagai leluhur para penguasa era Hindu-Buddha hingga raja-raja Islam di Jawa ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi); [Internet Archive: Serat Babad Tanah Jawi](https://archive.org/details/babad-tanah-jawi)).
- **Usia Salinan Naskah:** Meskipun mengisahkan rentang waktu yang sangat panjang, tidak ditemukan salinan fisik Babad Tanah Jawi yang berusia lebih tua dari abad ke-18 ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Sifat Campuran Mitos dan Sejarah:** Karena memadukan unsur mitologi, kosmologi, pengkultusan raja, dan dongeng pujangga keraton, para sejarawan modern memperlakukan Babad Tanah Jawi secara kritis dan tidak menjadikannya sumber primer tunggal tanpa verifikasi ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

---

## 2. Dua Kelompok Induk Naskah dan Edisi Penting Babad Tanah Jawi

Beragam varian Babad Tanah Jawi yang beredar diklasifikasikan ke dalam dua kelompok induk utama, ditambah beberapa edisi cetak modern ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)):

### 2.1 Kelompok Induk Pertama (Carik Braja – Meinsma – Olthof)
- **Naskah Tembang (1788):** Induk pertama ditulis oleh **Carik Tumenggung Tirtowiguno** (dikenal sebagai **Carik Braja**) atas perintah Susuhunan Pakubuwana III di Surakarta dan telah beredar pada tahun 1788 ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi); [Internet Archive: Serat Babad Tanah Jawi](https://archive.org/details/babad-tanah-jawi)).
- **Edisi Prosa / *Gancaran* Meinsma–Kertapradja (1874 & 2014):** Pada tahun 1874, filolog Belanda **Johannes Jacobus Meinsma** menerbitkan versi prosa (*gancaran*) berbahasa Jawa yang sebenarnya dikerjakan oleh **Ngabehi Kertapradja** berdasarkan naskah Carik Braja ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi); [Internet Archive: Serat Babad Tanah Jawi](https://archive.org/details/babad-tanah-jawi)). Edisi transliterasi huruf Latin dari versi Meinsma ini diterbitkan kembali oleh Penerbit Garudhawaca pada 2014 dan tersedia secara digital di [Internet Archive](https://archive.org/details/babad-tanah-jawi).
- **Edisi W.L. Olthof (1941):** Pada tahun 1941, **W.L. Olthof** mereproduksi ulang versi Meinsma (juga tanpa mencantumkan nama Ngabehi Kertapradja pada cetakan awalnya) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)). Sejarawan **M.C. Ricklefs** menilai edisi Meinsma kurang memadai sebagai acuan riset historis primer dan lebih merekomendasikan edisi serta terjemahan Olthof ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi); [BantenProv: Katalog Babad Tanah Jawi Olthof](https://batupusaka.bantenprov.go.id/koleksi/monograf/n-a/NDUz-babad-tanah-jawi-mulai-dari-nabi-adam-sampai-runtuhnya-mataram-w-l-olthof?perpus=aHR0cHM6Ly9pbmxpcy5zZXJhbmdrYWIuZ28uaWQv)).

### 2.2 Kelompok Induk Kedua (Carik Adilangu II) dan Terbitan Balai Pustaka
- **Naskah Carik Adilangu II (1722):** Induk kedua disusun oleh **Carik Adilangu II** yang hidup pada masa pemerintahan Pakubuwana I dan Pakubuwana II, dengan naskah tertua bertarikh tahun 1722 ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)). Berbeda dengan kelompok pertama yang meringkas sejarah pra-Mataram hanya berupa silsilah singkat, kelompok kedua menguraikan kisah Jawa Kuno secara panjang lebar ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Edisi Tembang Balai Pustaka:** Menjelang Perang Dunia II, Balai Pustaka menerbitkan puluhan jilid Babad Tanah Jawi dalam format aslinya berupa tembang *macapat* beraksara Jawa ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

---

## 3. Periodisasi Penguasa Pulau Jawa menurut Babad Tanah Jawi

Dalam rangkuman historiografi tradisional yang merujuk pada Babad Tanah Jawi dan kelanjutannya, urutan penguasa di Tanah Jawa dibagi ke dalam tiga era besar: **Era Jawa Kuno**, **Era Jawa Pertengahan**, dan **Era Jawa Baru** ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

### 3.1 Era Jawa Kuno (Kerajaan-Kerajaan Hindu-Buddha Awal)
Pada era ini, penuturan babad banyak memuat legenda dan silsilah kerajaan sebelum berdirinya kesultanan Islam ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)):
- **Kerajaan Kadiri:** Prabu Gendrayana, Prabu Jayapurusa, Prabu Sariwahana, Prabu Batara Aji Jayabaya, Prabu Jaya Amijaya, Prabu Jaya Amisena, dan Prabu Aji Pamasa ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Kerajaan Pengging:** Prabu Pancadriya, Prabu Anglingdriya, dan Prabu Darmamaya ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Kerajaan Janggala:** Lembu Amiluhur, Raden Panji Kuda Laleyan, Prabu Banjaransari, Prabu Mundingsari, dan Prabu Sri Pamekas ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Kerajaan Majapahit:** Raden Sesuruh, Raden Anom, Raden Adaningkung, Raden Hayam Wuruk, Raden Lembu Amisani, Raden Bratanjung, dan Raden Alit (Prabu Brawijaya) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

### 3.2 Era Jawa Pertengahan (Demak, Pajang, hingga Mataram Kartasura)
Era ini menandai peralihan kekuasaan ke kerajaan-kerajaan Islam di Jawa ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)):

| Kerajaan | Daftar Penguasa dan Masa Pemerintahan | Sumber |
| :--- | :--- | :--- |
| **Kerajaan Demak** | Raden Patah (1478–1518), Pati Unus (1518–1521), Trenggana (1521–1546), Sunan Prawata (1546–1547), Arya Panangsang (1547–1554) | [Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi) |
| **Kerajaan Pajang** | Jaka Tingkir / Sultan Adiwijaya (1568–1582), Arya Pangiri / Awantipura (1583–1586), Pangeran Benawa / Prabuwijaya (1586–1587) | [Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi) |
| **Kerajaan Mataram** | Panembahan Senapati (1586–1601), Anyakrawati / Sunan Krapyak (1601–1613), Sultan Agung / Anyakrakusuma (1613–1645), Amangkurat I (1645–1677), Amangkurat II (1680–1702), Amangkurat III (1702–1705), Pakubuwana I (1705–1719), Amangkurat IV (1719–1726), Pakubuwana II (1726–1742), Amangkurat V / Sunan Kuning (1742–1743) | [Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi) |

### 3.3 Era Jawa Baru (Pecahnya Mataram hingga Penguasa Masa Kini)
Setelah **Perjanjian Giyanti (1755)** membagi Wangsa Mataram menjadi Surakarta dan Yogyakarta, serta **Perjanjian Salatiga (1757)** melahirkan Mangkunegaran, garis suksesi penguasa Jawa berlanjut pada tiga entitas berikut ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)):

1. **Kesunanan Surakarta Hadiningrat:** Pakubuwana II (1745–1749), Pakubuwana III (1749–1788), Pakubuwana IV (1788–1820), Pakubuwana V (1820–1823), Pakubuwana VI (1823–1830), Pakubuwana VII (1830–1858), Pakubuwana VIII (1859–1861), Pakubuwana IX (1861–1893), Pakubuwana X (1893–1939), Pakubuwana XI (1939–1944), Pakubuwana XII (1944–2004), Pakubuwana XIII (2004–2025), dan Pakubuwana XIV (2025–sekarang) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
2. **Kesultanan Ngayogyakarta Hadiningrat:** Hamengkubuwana I / Pangeran Mangkubumi (1755–1792), Hamengkubuwana II (periode pertama 1792–1810), Hamengkubuwana III (periode pertama 1810–1811), Hamengkubuwana IV (1814–1823), Hamengkubuwana V (periode pertama 1823–1826), Hamengkubuwana VI (1855–1877), Hamengkubuwana VII (1877–1921), Hamengkubuwana VIII (1921–1939), Hamengkubuwana IX (1940–1988), dan Hamengkubuwana X (1989–sekarang) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
3. **Kadipaten Mangkunagaran:** Mangkunagara I / Pangeran Sambernyawa (1757–1795), Mangkunagara II (1795–1835), Mangkunagara III (1835–1853), Mangkunagara IV (1853–1881), Mangkunagara V (1881–1896), Mangkunagara VI (1896–1916), Mangkunagara VII (1916–1944), Mangkunagara VIII (1944–1987), Mangkunagara IX (1987–2021), dan Mangkunegara X (2022–sekarang) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

---

## 4. Penilaian Sejarawan dan Panduan Konteks bagi AI Chatbot

Agar AI *chatbot* dapat memberikan jawaban yang akurat secara historiografis ketika mengambil data dari dokumen ini, sistem perlu membedakan bobot keandalan tiap era dalam Babad Tanah Jawi:

- **Pandangan Kritis Filolog:** Peneliti seperti **Dr. G.A.J. Hazeu** dan **Dr. Th.G.Th. Pigeaud** menilai Babad Tanah Jawi bukanlah karya ilmiah historis karena sarat unsur dongeng pujangga ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).
- **Validitas Era Tertentu:** Sejarawan **H.J. de Graaf** berpendapat bahwa catatan Babad Tanah Jawi untuk peristiwa abad ke-18 (serta transisi Pajang menuju Mataram Kartasura sekitar 1580–1700-an) cukup dapat dipercaya sebagai bahan kajian sejarah, sedangkan narasi jauh sebelum atau di luar periode tersebut didominasi mitologi dan kosmologi ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi); [Internet Archive: Serat Babad Tanah Jawi](https://archive.org/details/babad-tanah-jawi)).

---

## 5. Contoh Pasangan Pertanyaan–Jawaban (Q&A) untuk Retrieval Chatbot

1. **Apa itu Babad Tanah Jawi dan bagaimana bentuk aslinya?**  
   Babad Tanah Jawi adalah karya sastra sejarah berbahasa Jawa yang aslinya ditulis dalam bentuk tembang *macapat*, berisi riwayat penguasa Pulau Jawa dari silsilah Nabi Adam, kerajaan Hindu-Buddha, hingga kesultanan Islam dengan pusat narasi pada Kerajaan Mataram ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

2. **Apa perbedaan versi Meinsma, Kertapradja, dan Olthof dalam Babad Tanah Jawi?**  
   Versi Meinsma (1874) merupakan terbitan berbentuk prosa bahasa Jawa (*gancaran*) yang ditulis oleh Ngabehi Kertapradja dari naskah tembang Carik Braja (1788) dan tersedia dalam edisi digital tahun 2014 di [Internet Archive](https://archive.org/details/babad-tanah-jawi). W.L. Olthof kemudian menerbitkan ulang versi tersebut pada 1941, yang oleh sejarawan M.C. Ricklefs dinilai lebih layak dijadikan acuan dibandingkan edisi Meinsma awal ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

3. **Bagaimana pembagian era penguasa Jawa setelah Kerajaan Mataram menurut Babad Tanah Jawi?**  
   Pada Era Jawa Baru, Perjanjian Giyanti (1755) membagi trah Mataram menjadi Kesunanan Surakarta (dimulai dari Pakubuwana II/III hingga Pakubuwana XIV) dan Kesultanan Yogyakarta (Hamengkubuwana I hingga Hamengkubuwana X), sedangkan Perjanjian Salatiga (1757) melahirkan Kadipaten Mangkunagaran (Mangkunagara I hingga Mangkunegara X) ([Wikipedia: Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)).

---

## 6. Sumber Rujukan

- [Wikipedia Bahasa Indonesia — Babad Tanah Jawi](https://id.wikipedia.org/wiki/Babad_Tanah_Jawi)
- [Internet Archive — Serat Babad Tanah Jawi (Edisi Prosa Bahasa Jawa dari versi J.J. Meinsma 1874, Ngabehi Kertapradja / Penerbit Garudhawaca 2014)](https://archive.org/details/babad-tanah-jawi)
- [Dinas Perpustakaan dan Arsip Daerah Kabupaten Serang (BantenProv) — Katalog Babad Tanah Jawi edisi W.L. Olthof](https://batupusaka.bantenprov.go.id/koleksi/monograf/n-a/NDUz-babad-tanah-jawi-mulai-dari-nabi-adam-sampai-runtuhnya-mataram-w-l-olthof?perpus=aHR0cHM6Ly9pbmxpcy5zZXJhbmdrYWIuZ28uaWQv)
