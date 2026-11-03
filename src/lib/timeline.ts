// Linimasa disusun tim dari kartu pengetahuan. Setiap peristiwa WAJIB merujuk kartu (awalan judulnya);
// build akan gagal kalau kartunya tidak ada, jadi linimasa tidak bisa memuat klaim tanpa sumber.
import type { Site } from "@/lib/cards";

export type TimelineEvent = {
  year: string;
  title: string;
  summary: string;
  note?: string;
  sites: Site[];
  cards: string[];
  photo?: string; // id item di GALLERY; foto ditampilkan dengan tahun pemotretannya sendiri
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1742–1743",
    title: "Geger Pacinan merusak Keraton Kartasura",
    summary:
      "Pemberontakan yang melibatkan laskar Tionghoa merusak keraton Mataram di Kartasura. Pakubuwono II lalu memutuskan memindahkan pusat pemerintahan.",
    note: "Sumber berbeda soal tahun: 1742 untuk awal pemberontakan, 1743 untuk kerusakan keraton.",
    sites: ["kasunanan"],
    cards: ["Geger Pacinan", "Situs Keraton Kartasura"],
    photo: "kartasura",
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
    year: "1777 atau 1782",
    title: "Panggung Sangga Buwana berdiri",
    summary: "Menara di kompleks keraton ini dibangun pada masa Pakubuwono III.",
    note: "Sumber berbeda: 1777 menurut Wikipedia, 1782 menurut sumber pariwisata Jawa Tengah.",
    sites: ["kasunanan"],
    cards: ["Panggung Sangga Buwana - menara"],
    photo: "sangga-buwana",
  },
  {
    year: "1795",
    title: "Raden Mas Said wafat",
    summary: "Mangkunegara I wafat pada 28 Desember 1795 dan dimakamkan di Astana Mangadeg, Karanganyar.",
    sites: ["mangkunegaran"],
    cards: ["Raden Mas Said - kelahiran"],
  },
  {
    year: "1861–1881",
    title: "Industri gula Mangkunegaran",
    summary:
      "Mangkunegara IV mendirikan industri gula, termasuk pabrik gula Colomadu dan Tasikmadu. Ia juga menulis Serat Wedhatama.",
    sites: ["mangkunegaran"],
    cards: ["Mangkunegara IV"],
  },
  {
    year: "1945–1950",
    title: "Kekuasaan pemerintahan berakhir",
    summary:
      "Daerah Istimewa Surakarta dibubarkan pada 1946, dan Revolusi Sosial di Surakarta menghapus hak pemerintahan Mangkunegaran. Kedua istana berlanjut sebagai pusat adat dan budaya.",
    sites: ["kasunanan", "mangkunegaran"],
    cards: ["Status Kasunanan", "Status Mangkunegaran"],
  },
  {
    year: "1954–1959",
    title: "Sangga Buwana terbakar dan dibangun kembali",
    summary: "Menara terbakar pada 18 November 1954 dan selesai dibangun kembali pada 30 September 1959.",
    sites: ["kasunanan"],
    cards: ["Panggung Sangga Buwana - menara"],
  },
  {
    year: "2022",
    title: "Mangkunegara X dan Pracima Tuin",
    summary:
      "KGPAA Mangkunegara X dinobatkan pada 12 Maret 2022 di usia 24 tahun. Revitalisasi Pracima Tuin dimulai pada tahun yang sama, lalu taman itu dibuka sebagai ruang publik.",
    sites: ["mangkunegaran"],
    cards: ["Mangkunegara X", "Pracima Tuin"],
  },
];
