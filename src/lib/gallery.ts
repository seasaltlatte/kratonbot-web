// Galeri "Rekonstruksi AI vs Arsip". Setiap item memasangkan foto arsip berlisensi jelas dengan
// ilustrasi rekonstruksi AI. Ilustrasi AI ditambahkan tim: simpan file di public/galeri/ lalu isi `ai`.

export type ArchivePhoto = {
  src: string;
  width: number;
  height: number;
  caption: string;
  author: string;
  year: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
  institution?: string;
};

export type AiIllustration = {
  src: string; // contoh: "/galeri/sangga-buwana.webp"
  width: number;
  height: number;
  model: string; // contoh: "Gemini (Imagen)", "ChatGPT", "Midjourney"
  madeBy: string; // nama anggota kelompok
  date: string; // DD-MM-YYYY
};

export type GalleryItem = {
  id: string;
  title: string;
  site: "kasunanan" | "mangkunegaran";
  speculation: "rendah" | "sedang" | "tinggi";
  speculationReason: string;
  archive: ArchivePhoto;
  cards: string[]; // awalan judul kartu pengetahuan yang menjadi dasar
  imagined: string[]; // bagian yang terpaksa dibayangkan AI
  prompt: string;
  askBot: string; // pertanyaan mode rekonstruksi untuk KratonBot
  ai?: AiIllustration;
};

const PROMPT_RULES =
  "Foto arsip di sebelahnya dilampirkan sebagai acuan bentuk; ikuti bentuk yang terlihat di foto itu. Gaya ilustrasi cat air atau sketsa, BUKAN fotorealistik. Jangan menambahkan tokoh sejarah, raja, atau upacara. Tulis 'Ilustrasi AI' di pojok kanan bawah.";

export const GALLERY: GalleryItem[] = [
  {
    id: "sangga-buwana",
    title: "Panggung Sangga Buwana sebelum terbakar",
    site: "kasunanan",
    speculation: "sedang",
    speculationReason: "Bentuk menaranya terlihat di foto arsip, tetapi fotonya hitam-putih dan hanya dari satu sudut.",
    archive: {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/COLLECTIE_TROPENMUSEUM_De_tweede_poort_van_de_kraton_van_de_Susuhunan_van_Solo_met_daarachter_de_toren_Panggung_Songgo_Buwono_Soerakarta_TMnr_60001432.jpg",
      width: 1000,
      height: 669,
      caption: "Gerbang kedua keraton Susuhunan Solo, dengan menara Panggung Sangga Buwana di belakangnya.",
      author: "Fotografer tidak diketahui",
      year: "antara 1910 dan 1930",
      institution: "Wereldmuseum Amsterdam (Tropenmuseum)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_De_tweede_poort_van_de_kraton_van_de_Susuhunan_van_Solo_met_daarachter_de_toren_Panggung_Songgo_Buwono_Soerakarta_TMnr_60001432.jpg",
    },
    cards: ["Panggung Sangga Buwana - menara", "Panggung Sangga Buwana dan kisah"],
    imagined: [
      "Warna asli dinding dan atap, karena fotonya hitam-putih.",
      "Bentuk sisi menara yang tidak terlihat dari sudut foto.",
      "Cuaca, cahaya, dan suasana sekitar.",
    ],
    prompt: `Ilustrasi Panggung Sangga Buwana, menara bertingkat di kompleks Keraton Kasunanan Surakarta, seperti terlihat pada awal abad ke-20 sebelum terbakar tahun 1954. Sudut pandang dari balik gerbang keraton, mengikuti foto arsip Tropenmuseum. ${PROMPT_RULES}`,
    askBot: "Bayangkan suasana Panggung Sangga Buwana sebelum terbakar tahun 1954",
  },
  {
    id: "pendhapa-mangkunegaran",
    title: "Pendhapa Ageng Pura Mangkunegaran sekitar 1880",
    site: "mangkunegaran",
    speculation: "rendah",
    speculationReason: "Pendapanya masih berdiri dan terdokumentasi, sehingga AI hanya perlu membayangkan warna dan suasana masa itu.",
    archive: {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg/1280px-Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg",
      width: 1280,
      height: 682,
      caption: "Pendapa istana Mangkunegaran di Surakarta.",
      author: "James Page",
      year: "sekitar 1880",
      institution: "KITLV, melalui World Digital Library",
      license: "Domain publik",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg",
    },
    cards: ["Pendhapa Ageng Pura Mangkunegaran", "Asal-usul bangunan"],
    imagined: [
      "Warna tiang, lantai, dan atap pada tahun 1880-an.",
      "Perabot dan aktivitas di dalam pendapa.",
    ],
    prompt: `Ilustrasi Pendhapa Ageng Pura Mangkunegaran, pendapa terbuka bertiang kayu, seperti pada sekitar tahun 1880 berdasarkan foto arsip KITLV. Tanpa orang. ${PROMPT_RULES}`,
    askBot: "Bayangkan suasana Pendhapa Ageng Pura Mangkunegaran pada akhir abad ke-19",
  },
  {
    id: "kasunanan-1890",
    title: "Keraton Kasunanan tampak depan, 1890",
    site: "kasunanan",
    speculation: "rendah",
    speculationReason: "Ada foto arsip bertanggal, dan kompleks keratonnya masih berdiri sampai sekarang.",
    archive: {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/COLLECTIE_TROPENMUSEUM_Vooraanzicht_van_de_kraton_in_Soerakarta._TMnr_60002335.jpg",
      width: 1000,
      height: 740,
      caption: "Tampak depan keraton di Surakarta.",
      author: "Fotografer tidak diketahui",
      year: "1890",
      institution: "Wereldmuseum Amsterdam (Tropenmuseum)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Vooraanzicht_van_de_kraton_in_Soerakarta._TMnr_60002335.jpg",
    },
    cards: ["Tata ruang kompleks", "Keraton Kasunanan Surakarta Hadiningrat - gambaran umum"],
    imagined: ["Warna bangunan pada tahun 1890.", "Kegiatan orang di depan keraton."],
    prompt: `Ilustrasi tampak depan kompleks Keraton Kasunanan Surakarta pada tahun 1890, mengikuti foto arsip Tropenmuseum. ${PROMPT_RULES}`,
    askBot: "Bayangkan suasana di depan Keraton Kasunanan Surakarta pada tahun 1890",
  },
  {
    id: "kartasura",
    title: "Keraton Kartasura sebelum Geger Pacinan",
    site: "kasunanan",
    speculation: "tinggi",
    speculationReason:
      "Keraton Kartasura rusak jauh sebelum fotografi ada. Tidak ada satu pun foto istananya; yang tersisa hanya sebagian tembok benteng.",
    archive: {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Kartasura_Fortress%2C_Kartasura%2C_Central_Java_2015-07-31_01.jpg/1280px-Kartasura_Fortress%2C_Kartasura%2C_Central_Java_2015-07-31_01.jpg",
      width: 1280,
      height: 1478,
      caption: "Sisa tembok benteng Keraton Kartasura, kondisi tahun 2015.",
      author: "Crisco 1492",
      year: "2015",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kartasura_Fortress,_Kartasura,_Central_Java_2015-07-31_01.jpg",
    },
    cards: ["Situs Keraton Kartasura", "Geger Pacinan"],
    imagined: [
      "Hampir seluruh bentuk istana: bangunan, atap, tata letak, dan warnanya.",
      "Hanya keberadaan benteng dan beberapa struktur sisa yang tercatat di sumber.",
    ],
    prompt: `Ilustrasi sketsa kasar kompleks keraton Jawa abad ke-18 yang dikelilingi tembok benteng bata, sebagai bayangan Keraton Kartasura sebelum rusak. Tampilkan sebagai sketsa yang jelas tidak lengkap. ${PROMPT_RULES}`,
    askBot: "Bayangkan suasana Keraton Kartasura sebelum Geger Pacinan",
  },
];
