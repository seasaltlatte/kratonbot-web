// Membaca kartu pengetahuan (content/kartu/*.md), sumber yang sama dengan yang di-ingest ke Astra DB.
// Hanya dipakai di server (saat build). Komponen client menerima hasilnya lewat props.
import fs from "node:fs";
import path from "node:path";

export type Kategori = "FAKTA" | "TAFSIR" | "LEGENDA" | "INFO PRAKTIS";
export type Site = "kasunanan" | "mangkunegaran";
export type Sumber = { text: string; url?: string };

export type Card = {
  id: string;
  judul: string;
  situs: string;
  sites: Site[];
  kategori: Kategori;
  tema: string;
  sumber: Sumber[];
  dicek?: string;
  isi: string;
};

const DIR = path.join(process.cwd(), "content", "kartu");

// Awalan nama file → tema untuk filter Pustaka.
// File 07 (tentang KratonBot sendiri) sengaja tidak didaftarkan agar tidak tampil sebagai pengetahuan umum.
export const TEMA: Record<string, string> = {
  "01": "Sejarah",
  "02": "Keraton Kasunanan",
  "03": "Pura Mangkunegaran",
  "04": "Tradisi dan legenda",
  "05": "Info kunjungan",
  "06": "Nilai Pancasila",
  "08": "Mangkubumi & Sambernyawa",
  "09-babad-tanah-jawi": "Babad Tanah Jawi",
  "09-panembahan-senopati-ratu-kidul": "Panembahan Senopati & Ratu Kidul",
  "10": "Bintang Kehormatan",
  "11": "Astana Mangadeg & Girilayu",
  "12": "Makam Kotagede & Imogiri",
  "13": "Pasarean Tegalarum",
  "14": "Sapta Tirta Pablengan",
  "15": "Pesanggrahan Langenharjo",
  "16": "Astana Oetara",
};

// Urutan tema terstruktur (01 sampai 16) untuk tab filter Pustaka
export const TEMA_LIST = [
  "Sejarah",
  "Keraton Kasunanan",
  "Pura Mangkunegaran",
  "Tradisi dan legenda",
  "Info kunjungan",
  "Nilai Pancasila",
  "Mangkubumi & Sambernyawa",
  "Babad Tanah Jawi",
  "Panembahan Senopati & Ratu Kidul",
  "Bintang Kehormatan",
  "Astana Mangadeg & Girilayu",
  "Makam Kotagede & Imogiri",
  "Pasarean Tegalarum",
  "Sapta Tirta Pablengan",
  "Pesanggrahan Langenharjo",
  "Astana Oetara",
];

export function getTemaForFile(file: string): string | undefined {
  const base = file.replace(/\.md$/, "");
  if (TEMA[base]) return TEMA[base];
  const p2 = file.slice(0, 2);
  if (TEMA[p2]) return TEMA[p2];
  return undefined;
}

const field = (block: string, name: string) =>
  block.match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1].trim();

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

function parseSumber(raw: string): Sumber[] {
  return raw
    .split(/\s;\s/)
    .map((s) => {
      const url = s.match(/https?:\/\/[^\s)]+/)?.[0].replace(/[.,]$/, "");
      const text = (url ? s.replace(url, "") : s)
        .replace(/,\s*\(/, " (")
        .replace(/,\s*$/, "")
        .replace(/\s{2,}/g, " ")
        .trim();
      return url ? { text, url } : { text };
    })
    .filter((s) => s.text);
}

// Kartu juga berisi instruksi untuk bot ("bot sebaiknya…", "Catatan untuk tim"). Itu tidak untuk pengunjung.
function cleanIsi(isi: string) {
  const paragraphs = isi
    .replace(/Catatan untuk tim:[\s\S]*$/i, "")
    .replace(/,\s*jadi bot sebaiknya[^.]*\./gi, ".")
    .replace(/:\s*bot harus[^.]*\./gi, ".")
    .split(/\n\s*\n/)
    .map((par) =>
      par
        .split(/(?<=\.)\s+/)
        .filter((s) => !/\b[Bb]ot (sebaiknya|harus)\b|^Sajikan\b/i.test(s))
        .join(" ")
        .trim()
    )
    .filter((p) => p.length > 0);

  return paragraphs.join("\n\n");
}

/**
 * Parser penyesuaian untuk file markdown artikel RAG (nomor 08-16) yang menggunakan
 * pemisah '---' dan subbab '## ...' alih-alih format kartu klasik.
 */
function parseMarkdownSection(file: string, block: string): string | null {
  const match = block.match(/^##\s+(?:(?:\d+\.?\s*)*)(.*)$/m);
  if (!match) return null;
  const rawTitle = match[1].trim();
  if (/^(Catatan )?Sumber (Rujukan|Referensi)$/i.test(rawTitle)) return null;
  if (/Contoh Pasangan Pertanyaan|Catatan Sumber|Ringkasan (Kronologi|Data Kunci)/i.test(rawTitle)) return null;

  const title = rawTitle.replace(/^\d+[\.\)]\s*/, "").trim();
  let body = block.replace(/^##\s+.*$/m, "").trim();
  if (body.length < 20) return null;

  let kategori = "FAKTA";
  if (/mitologi|legenda|ratu kidul|mistik|gaib|ghaib/i.test(title + " " + body)) {
    kategori = "LEGENDA";
  } else if (/interpretasi|analisis|tafsir|pendapat|panduan konteks/i.test(title + " " + body)) {
    kategori = "TAFSIR";
  } else if (/jam buka|tiket|kunjungan|rute|lokasi|etika/i.test(title + " " + body)) {
    kategori = "INFO PRAKTIS";
  }

  let situs = "Mataram Islam Surakarta";
  if (/mangkunegar|sambernyawa|mangadeg|girilayu|pablengan|astana oetara/i.test(title + " " + body + " " + file)) {
    situs = "Pura Mangkunegaran";
  }
  if (/kasunanan|surakarta|pakubuwon|sangga buwana|langenharjo/i.test(title + " " + body + " " + file)) {
    situs = situs === "Pura Mangkunegaran" ? "Kasunanan & Mangkunegaran" : "Keraton Kasunanan";
  }
  if (/kotagede|imogiri/i.test(file)) {
    situs = "Kotagede & Imogiri";
  } else if (/tegalarum|amangkurat/i.test(file)) {
    situs = "Pasarean Tegalarum";
  }

  // 1. Ekstrak semua sumber [label](url)
  const links: { text: string; url: string }[] = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let lm;
  while ((lm = linkRegex.exec(body)) !== null) {
    const text = lm[1].replace(/^(Wikipedia:\s*|Website:\s*)/i, "").trim();
    const url = lm[2].trim();
    if (!links.some((l) => l.url === url)) {
      links.push({ text, url });
    }
  }

  // 2. Hapus referensi sitasi dalam tanda kurung, misal: ([sumber.com](url); [lain.com](url))
  body = body.replace(/\(\s*\[[^\]]+\]\([^\)]+\)(?:[\s;,]*\[[^\]]+\]\([^\)]+\))*\s*\)/g, "");

  // 3. Jika ada link tersisa dalam kalimat, ganti [Nama](url) menjadi Nama
  body = body.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // 4. Ubah heading h3/h4 seperti "### 3.1 Judul Subbab" menjadi "Judul Subbab:"
  body = body.replace(/^#{3,}\s*(?:\d+\.?\s*)*(.*)$/gm, "$1:");

  // 5. Ubah format bullet "- **Label:** teks" menjadi "Label: teks"
  body = body.replace(/^[-*]\s+\*\*([^*]+):\*\*\s*/gm, "$1: ");
  body = body.replace(/^[-*]\s+/gm, "");

  // 6. Bersihkan format bold (**teks**) dan italic (*teks* / _teks_)
  body = body.replace(/\*\*([^*]+)\*\*/g, "$1");
  body = body.replace(/\*([^*]+)\*/g, "$1");
  body = body.replace(/_([^_]+)_/g, "$1");

  // 7. Hapus baris tabel markdown (|---|---|)
  body = body.replace(/^\|.*\|$/gm, "");

  // 8. Susun paragraf yang rapi
  const paragraphs = body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !/^(\||\+|-{3,})/.test(p))
    .map((p) => p.replace(/\s{2,}/g, " ").replace(/\s+([.,;:])/g, "$1"));

  const cleanedBody = paragraphs.join("\n\n");

  const sumber = links.length > 0
    ? links.slice(0, 4).map((l) => `${l.text}, ${l.url}`).join(" ; ")
    : "Dokumentasi sejarah tim";

  return [
    `Judul: ${title}`,
    `Situs: ${situs}`,
    `Kategori: ${kategori}`,
    `Sumber: ${sumber}`,
    `Dicek: 16-11-2026`,
    `Isi: ${cleanedBody}`,
  ].join("\n");
}

// Semua blok kartu per file, dengan baris CRLF dinormalkan (sebagian file diedit di Windows).
function readBlocks(): { file: string; block: string }[] {
  const out: { file: string; block: string }[] = [];
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).sort()) {
    const text = fs
      .readFileSync(path.join(DIR, file), "utf8")
      .replace(/\r\n?/g, "\n")
      .replace(/<!--[\s\S]*?-->/g, "");
    for (const rawBlock of text.split(/\n-{3,}\n/)) {
      const trimmed = rawBlock.trim();
      if (!trimmed) continue;
      if (field(trimmed, "Judul")) {
        out.push({ file, block: trimmed });
      } else {
        const parsed = parseMarkdownSection(file, trimmed);
        if (parsed) out.push({ file, block: parsed });
      }
    }
  }
  return out;
}

let cache: Card[] | null = null;

export function getCards(): Card[] {
  if (cache) return cache;
  const cards: Card[] = [];
  const seenIds = new Map<string, number>();
  for (const { file, block } of readBlocks()) {
    const tema = getTemaForFile(file);
    if (!tema) continue;
    const judul = field(block, "Judul")!;
    const situs = field(block, "Situs") ?? "";
    const sites: Site[] = [];
    if (/Kasunanan|Masjid Agung|Kartasura/.test(situs)) sites.push("kasunanan");
    if (/Mangkunegaran/.test(situs)) sites.push("mangkunegaran");
    if (sites.length === 0) {
      // Warisan leluhur Mataram (Kotagede, Imogiri, Tegalarum, Babad Tanah Jawi, dll.) adalah warisan bersama
      sites.push("kasunanan", "mangkunegaran");
    }
    const baseId = slug(judul);
    const count = (seenIds.get(baseId) ?? 0) + 1;
    seenIds.set(baseId, count);
    const id = count === 1 ? baseId : `${baseId}-${count}`;

    cards.push({
      id,
      judul,
      situs,
      sites,
      kategori: (field(block, "Kategori") ?? "FAKTA") as Kategori,
      tema,
      sumber: parseSumber(field(block, "Sumber") ?? ""),
      dicek: field(block, "Dicek"),
      isi: cleanIsi(block.match(/^Isi:\s*([\s\S]*)$/m)?.[1] ?? ""),
    });
  }
  cache = cards;
  return cards;
}

// Untuk bot: semua kartu, termasuk file 07 (tentang KratonBot) dan instruksi untuk bot di dalam isi,
// dalam format teks asli (Judul/Situs/Kategori/Sumber/Isi) yang dirujuk system prompt.
export type BotCard = { judul: string; situs: string; isi: string; block: string };
let botCache: BotCard[] | null = null;

export function getBotCards(): BotCard[] {
  botCache ??= readBlocks().map(({ block }) => ({
    judul: field(block, "Judul")!,
    situs: field(block, "Situs") ?? "",
    isi: block.match(/^Isi:\s*([\s\S]*)$/m)?.[1].trim() ?? "",
    block,
  }));
  return botCache;
}

export function getCardByTitle(prefix: string): Card {
  const card = getCards().find((c) => c.judul.startsWith(prefix));
  if (!card) throw new Error(`Kartu "${prefix}" tidak ditemukan di content/kartu`);
  return card;
}
