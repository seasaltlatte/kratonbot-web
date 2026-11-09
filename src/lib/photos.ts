// Foto berlisensi jelas dari Wikimedia Commons untuk linimasa. Foto galeri ikut didaftarkan agar bisa dipakai ulang.
import { GALLERY, type ArchivePhoto } from "@/lib/gallery";

const COMMONS = "https://commons.wikimedia.org/wiki/File:";

const BARU: Record<string, ArchivePhoto> = {
  kotagede: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Makam_Raja_Mataram_Kotagede.jpg/1280px-Makam_Raja_Mataram_Kotagede.jpg",
    width: 1280,
    height: 854,
    caption: "Kompleks makam raja-raja Mataram di Kotagede.",
    author: "Arry gunawan",
    year: "2021",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: `${COMMONS}Makam_Raja_Mataram_Kotagede.jpg`,
  },
  imogiri: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/COLLECTIE_TROPENMUSEUM_De_ingang_van_het_graf_van_Sultan_Agung_op_de_begraafplaats_Imogiri_TMnr_60004750.jpg",
    width: 700,
    height: 525,
    caption: "Gerbang menuju makam Sultan Agung di kompleks makam raja-raja Imogiri.",
    author: "Fotografer tidak diketahui",
    year: "sekitar 1890",
    institution: "Wereldmuseum Amsterdam (Tropenmuseum)",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: `${COMMONS}COLLECTIE_TROPENMUSEUM_De_ingang_van_het_graf_van_Sultan_Agung_op_de_begraafplaats_Imogiri_TMnr_60004750.jpg`,
  },
  "kartasura-peta": {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Karaton_Kartasura_Map.jpg",
    width: 1000,
    height: 824,
    caption: "Peta kompleks Keraton Kartasura.",
    author: "Pembuat tidak diketahui",
    year: "tahun tidak diketahui",
    license: "Domain publik",
    sourceUrl: `${COMMONS}Karaton_Kartasura_Map.jpg`,
  },
  giyanti: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Karanganyar_Lokasi_Perjanjian_Giyanti_Bennylin_2.jpg/1280px-Karanganyar_Lokasi_Perjanjian_Giyanti_Bennylin_2.jpg",
    width: 1280,
    height: 960,
    caption: "Situs Perjanjian Giyanti di Kerten, Jantiharjo, Karanganyar.",
    author: "Bennylin",
    year: "2020",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: `${COMMONS}Karanganyar_Lokasi_Perjanjian_Giyanti_Bennylin_2.jpg`,
  },
  colomadu: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/53/COLLECTIE_TROPENMUSEUM_De_Colomadu_suikerfabriek_in_Malangjiwan_in_de_omgeving_van_Soerakarta_TMnr_60005243.jpg",
    width: 700,
    height: 542,
    caption: "Pabrik gula Colomadu milik Mangkunegara IV, di dekat Surakarta.",
    author: "Woodbury & Page",
    year: "sekitar 1867",
    institution: "Wereldmuseum Amsterdam (Tropenmuseum)",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: `${COMMONS}COLLECTIE_TROPENMUSEUM_De_Colomadu_suikerfabriek_in_Malangjiwan_in_de_omgeving_van_Soerakarta_TMnr_60005243.jpg`,
  },
  "mangkunegara-x": {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Adipati_Mangkunegara_X_dan_Sunan_Pakubuwono_XIII_230301.jpg/1280px-Adipati_Mangkunegara_X_dan_Sunan_Pakubuwono_XIII_230301.jpg",
    width: 1280,
    height: 764,
    caption: "Peringatan kenaikan takhta Mangkunegara X di Pura Mangkunegaran.",
    author: "Bimo K.A.",
    year: "2023",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: `${COMMONS}Adipati_Mangkunegara_X_dan_Sunan_Pakubuwono_XIII_230301.jpg`,
  },
};

export const PHOTOS: Record<string, ArchivePhoto> = {
  ...Object.fromEntries(GALLERY.map((g) => [g.id, g.archive])),
  ...BARU,
};

export function getPhoto(id: string): ArchivePhoto {
  const p = PHOTOS[id];
  if (!p) throw new Error(`Foto "${id}" tidak ada di src/lib/photos.ts`);
  return p;
}
