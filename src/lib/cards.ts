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

// Awalan nama file → tema. File 07 (tentang KratonBot sendiri) tidak ditampilkan sebagai pengetahuan.
export const TEMA: Record<string, string> = {
  "01": "Sejarah",
  "02": "Keraton Kasunanan",
  "03": "Pura Mangkunegaran",
  "04": "Tradisi dan legenda",
  "05": "Info kunjungan",
  "06": "Nilai Pancasila",
};

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
  const text = isi
    .replace(/Catatan untuk tim:[\s\S]*$/, "")
    .replace(/,\s*jadi bot sebaiknya[^.]*\./g, ".")
    .replace(/:\s*bot harus[^.]*\./g, ".");
  return text
    .split(/(?<=\.)\s+/)
    .filter((s) => !/\b[Bb]ot (sebaiknya|harus)\b|^Sajikan\b/.test(s))
    .join(" ")
    .trim();
}

// Semua blok kartu per file, dengan baris CRLF dinormalkan (sebagian file diedit di Windows).
function readBlocks(): { file: string; block: string }[] {
  const out: { file: string; block: string }[] = [];
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).sort()) {
    const text = fs
      .readFileSync(path.join(DIR, file), "utf8")
      .replace(/\r\n?/g, "\n")
      .replace(/<!--[\s\S]*?-->/g, "");
    for (const block of text.split(/\n-{3,}\n/)) {
      if (field(block, "Judul")) out.push({ file, block: block.trim() });
    }
  }
  return out;
}

let cache: Card[] | null = null;

export function getCards(): Card[] {
  if (cache) return cache;
  const cards: Card[] = [];
  for (const { file, block } of readBlocks()) {
    const tema = TEMA[file.slice(0, 2)];
    if (!tema) continue;
    const judul = field(block, "Judul")!;
    const situs = field(block, "Situs") ?? "";
    const sites: Site[] = [];
    if (/Kasunanan|Masjid Agung|Kartasura/.test(situs)) sites.push("kasunanan");
    if (/Mangkunegaran/.test(situs)) sites.push("mangkunegaran");
    cards.push({
      id: slug(judul),
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
