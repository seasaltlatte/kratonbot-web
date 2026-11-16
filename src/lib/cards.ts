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
    .replace(/\s*\(catatan RAG:[^)]*\)/gi, "")
    .replace(/,\s*jadi bot sebaiknya[^.]*\./gi, ".")
    .replace(/:\s*bot harus[^.]*\./gi, ".")
    .split(/\n\s*\n/)
    .map((par) =>
      par
        .split(/(?<=\.)\s+/)
        .filter((s) => !/\b[Bb]ot (sebaiknya|harus)\b|^Sajikan\b|\bAI chatbot\b|\bdokumen ini\b/i.test(s))
        .join(" ")
        .trim()
    )
    .filter((p) => p.length > 0);

  return paragraphs.join("\n\n");
}

const KATEGORI_VALID = ["FAKTA", "TAFSIR", "LEGENDA", "INFO PRAKTIS"];

// Bagian artikel yang bukan pengetahuan: daftar pustaka, contoh tanya-jawab, ringkasan untuk mesin.
const BAGIAN_DILEWATI =
  /^(Catatan )?Sumber (Rujukan|Referensi)\b|Contoh Pasangan Pertanyaan|Catatan Sumber|Ringkasan (Kronologi|Data Kunci)/i;

// Tabel markdown → satu baris teks per baris tabel, misalnya
// "Air Bleng — Karakteristik: Berasa asin; Khasiat: Dipercaya membantu …".
// Kolom nomor dan kolom sumber dibuang (sumbernya sudah dikumpulkan sebagai daftar sumber).
function tabelKeTeks(lines: string[]): string[] {
  const cells = (l: string) =>
    l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
  const rows = lines.filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l)).map(cells);
  if (rows.length < 2) return [];
  const [head, ...body] = rows;
  const pakai = head
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => !/^(no\.?|nomor|sumber|rujukan|referensi)$/i.test(h));
  if (pakai.length === 0) return [];
  const [label, ...rest] = pakai;
  return body
    .map((r) => {
      const nama = r[label.i] ?? "";
      const detail = rest
        .filter(({ i }) => r[i] && r[i] !== "-" && r[i] !== "—")
        .map(({ h, i }) => `${h}: ${r[i]}`)
        .join("; ");
      return detail ? `${nama} — ${detail}.` : nama;
    })
    .filter(Boolean);
}

/**
 * File artikel (08 dan seterusnya) memakai pemisah '---' dan subbab '## …', bukan format kartu klasik.
 * Setiap subbab menjadi satu kartu. Label dan situs dibaca dari baris "Kategori:" dan "Situs:"
 * tepat di bawah judul subbab; kalau tidak ada, dipakai nilai aman (FAKTA, warisan Mataram)
 * alih-alih menebak dari kata kunci.
 */
function parseMarkdownSection(block: string): string | null {
  const match = block.match(/^##\s+(?:\d+\.?\s*)*(.*)$/m);
  if (!match) return null;
  const rawTitle = match[1].trim();
  if (BAGIAN_DILEWATI.test(rawTitle)) return null;

  const title = rawTitle
    .replace(/\s*(dan|&)\s*Panduan Konteks bagi AI Chatbot\s*$/i, "")
    .replace(/[*_]/g, "")
    .trim();
  let body = block.slice(block.indexOf(match[0]) + match[0].length).trim();

  // Baris metadata opsional di bawah judul subbab.
  const meta = (name: string) => {
    const m = body.match(new RegExp(`^${name}:\\s*(.+)$`, "m"));
    if (m) body = body.replace(m[0], "").trim();
    return m?.[1].trim();
  };
  const kategoriTulis = meta("Kategori")?.toUpperCase();
  const kategori = kategoriTulis && KATEGORI_VALID.includes(kategoriTulis) ? kategoriTulis : "FAKTA";
  const situs = meta("Situs") ?? "Warisan Mataram Islam";

  // 1. Kumpulkan semua sumber [label](url), termasuk yang ada di dalam tabel.
  const links: { text: string; url: string }[] = [];
  for (const lm of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
    const text = lm[1].replace(/^(Wikipedia:\s*|Website:\s*)/i, "").trim();
    const url = lm[2].trim();
    if (!links.some((l) => l.url === url)) links.push({ text: text || url, url });
  }

  // 2. Hapus sitasi dalam kurung, misal ([sumber.com](url); [lain.com](url)), lalu sisa link jadi teks biasa.
  body = body.replace(/\(\s*\[[^\]]+\]\([^)]+\)(?:[\s;,]*\[[^\]]+\]\([^)]+\))*\s*\)/g, "");
  body = body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // 3. Format markdown → teks: subjudul, butir, tebal/miring.
  body = body.replace(/^#{3,}\s*(?:\d+\.?\s*)*(.*)$/gm, "$1:");
  body = body.replace(/^\s*[-*]\s+\*\*([^*]+):\*\*\s*/gm, "$1: ");
  body = body.replace(/^\s*[-*]\s+/gm, "");
  // Tebal/miring bisa bersarang (**Air Kesakten (*Kasekten*)**), jadi semua tanda bintang dibuang.
  body = body.replace(/\*+/g, "");
  body = body.replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:]|$)/g, "$1$2");

  // 4. Susun paragraf; tabel diubah menjadi baris teks, bukan dibuang.
  const paragraphs: string[] = [];
  let tabel: string[] = [];
  const tutupTabel = () => {
    if (tabel.length) paragraphs.push(...tabelKeTeks(tabel));
    tabel = [];
  };
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("|")) {
      tabel.push(line);
      continue;
    }
    tutupTabel();
    if (line && !/^-{3,}$/.test(line)) paragraphs.push(line);
  }
  tutupTabel();

  const cleanedBody = paragraphs
    .map((p) => p.replace(/\s{2,}/g, " ").replace(/\s+([.,;:])/g, "$1"))
    .join("\n\n");
  if (cleanedBody.length < 20) return null;

  return [
    `Judul: ${title}`,
    `Situs: ${situs}`,
    `Kategori: ${kategori}`,
    `Sumber: ${links.map((l) => `${l.text}, ${l.url}`).join(" ; ")}`,
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
        const parsed = parseMarkdownSection(trimmed);
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
