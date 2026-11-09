// Linimasa disusun tim dari kartu pengetahuan. Setiap peristiwa WAJIB merujuk kartu (awalan judulnya) dan foto
// (id di src/lib/photos.ts); build akan gagal kalau salah satunya tidak ada, jadi linimasa tidak bisa memuat
// klaim tanpa sumber atau foto tanpa lisensi. Hanya peristiwa yang mengubah arah sejarah kedua istana yang dimuat.
import type { Site } from "@/lib/cards";

export type TimelineEvent = {
  year: string;
  title: string;
  summary: string;
  note?: string;
  sites: Site[];
  cards: string[];
  photo: string; // id di src/lib/photos.ts; foto ditampilkan dengan tahun pemotretannya sendiri
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1586",
    title: "Mataram Islam berdiri di Kotagede",
    summary:
      "Panembahan Senapati menjadi raja pertama Mataram dan memerintah dari Kotagede sampai 1601. Mataram inilah yang kelak melahirkan Kasunanan Surakarta dan Mangkunegaran.",
    note: "Sumber berbeda soal awal Kotagede: ada yang menyebut 1582. Sejak sekitar 1584 Senapati sudah menjadi adipati di bawah Pajang.",
    sites: ["kasunanan", "mangkunegaran"],
    cards: ["Berdirinya Mataram Islam"],
    photo: "kotagede",
  },
  {
    year: "1613–1645",
    title: "Sultan Agung dan puncak kejayaan Mataram",
    summary:
      "Wilayah Mataram meluas ke sebagian besar Jawa. Sultan Agung menyerang Batavia, pusat VOC, pada 1628 dan 1629, dan dikenal sebagai pendiri kalender Jawa.",
    sites: ["kasunanan", "mangkunegaran"],
    cards: ["Sultan Agung dan puncak"],
    photo: "imogiri",
  },
  {
    year: "1680",
    title: "Ibu kota pindah ke Kartasura",
    summary:
      "Setelah Pemberontakan Trunajaya dan didudukinya Keraton Plered, Amangkurat II mendirikan keraton baru di Kartasura. Kartasura menjadi ibu kota Mataram sampai 1745.",
    sites: ["kasunanan"],
    cards: ["Pindahnya ibu kota Mataram ke Kartasura", "Situs Keraton Kartasura"],
    photo: "kartasura",
  },
  {
    year: "1742–1743",
    title: "Geger Pacinan merusak Keraton Kartasura",
    summary:
      "Pemberontakan yang melibatkan laskar Tionghoa merusak keraton Mataram di Kartasura. Pakubuwono II lalu memutuskan memindahkan pusat pemerintahan.",
    note: "Sumber berbeda soal tahun: 1742 untuk awal pemberontakan, 1743 untuk kerusakan keraton.",
    sites: ["kasunanan"],
    cards: ["Geger Pacinan"],
    photo: "kartasura-peta",
  },
  {
    year: "1744–1745",
    title: "Keraton baru di Desa Sala",
    summary:
      "Pakubuwono II mendirikan keraton pengganti di Desa Sala, dekat Bengawan Solo. Nama desa itu kemudian diganti menjadi Surakarta Hadiningrat.",
    note: "Tahun 1744 umumnya merujuk pada pembangunan, 1745 pada peresmian.",
    sites: ["kasunanan"],
    cards: ["Pendirian Keraton Kasunanan", "Asal nama Surakarta"],
    photo: "kasunanan-1890",
  },
  {
    year: "1755",
    title: "Perjanjian Giyanti",
    summary: "Wilayah Mataram dibagi dua: Kasunanan Surakarta dan Kesultanan Yogyakarta.",
    sites: ["kasunanan", "mangkunegaran"],
    cards: ["Perjanjian Giyanti"],
    photo: "giyanti",
  },
  {
    year: "1757",
    title: "Perjanjian Salatiga dan lahirnya Mangkunegaran",
    summary:
      "Disepakati pada 17 Maret 1757. Raden Mas Said menjadi Mangkunegara I dengan kedudukan Pangeran Miji. Bekas kediaman Patih Sindureja diberikan kepadanya, lalu diperluas menjadi istana.",
    sites: ["mangkunegaran"],
    cards: ["Perjanjian Salatiga", "Asal-usul bangunan"],
    photo: "pendhapa-mangkunegaran",
  },
  {
    year: "1861–1881",
    title: "Industri gula Mangkunegaran",
    summary:
      "Mangkunegara IV mendirikan industri gula, termasuk pabrik gula Colomadu dan Tasikmadu. Ia juga menulis Serat Wedhatama.",
    sites: ["mangkunegaran"],
    cards: ["Mangkunegara IV"],
    photo: "colomadu",
  },
  {
    year: "1945–1950",
    title: "Kekuasaan pemerintahan berakhir",
    summary:
      "Daerah Istimewa Surakarta dibubarkan pada 1946, dan Revolusi Sosial di Surakarta menghapus hak pemerintahan Mangkunegaran. Kedua istana berlanjut sebagai pusat adat dan budaya.",
    sites: ["kasunanan", "mangkunegaran"],
    cards: ["Status Kasunanan", "Status Mangkunegaran"],
    photo: "sangga-buwana",
  },
  {
    year: "2022",
    title: "Mangkunegara X dan Pracima Tuin",
    summary:
      "KGPAA Mangkunegara X dinobatkan pada 12 Maret 2022 di usia 24 tahun. Revitalisasi Pracima Tuin dimulai pada tahun yang sama, lalu taman itu dibuka sebagai ruang publik.",
    sites: ["mangkunegaran"],
    cards: ["Mangkunegara X", "Pracima Tuin"],
    photo: "mangkunegara-x",
  },
];
