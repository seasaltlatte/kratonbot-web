// Pengaman link sumber: model kadang menyalin nama sumber tanpa URL, atau membungkus URL dengan backtick.
// Fungsi ini merapikan bagian "📚 Sumber:" di jawaban memakai sumber dari kartu yang benar-benar diambil
// pada jawaban itu. Server tidak pernah mengarang URL: baris yang tidak cocok dibiarkan apa adanya.
import type { Sumber } from "@/lib/cards";

const URL_RE = /https?:\/\/[^\s<>()`"'\]]+[^\s<>()`"'\].,;:!?]/g;

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[“”"'‘’`*_]/g, "")
    .replace(/\(diakses[^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Teks link: buang URL, tanda baca di ujung, dan catatan "(diakses …)".
const rapikanTeks = (s: string) =>
  s
    .replace(URL_RE, "")
    .replace(/\(diakses[^)]*\)/gi, "")
    .replace(/[\s,;:–—-]+$/u, "")
    .replace(/^[\s,;:–—-]+/u, "")
    .replace(/\s{2,}/g, " ")
    .trim();

function cariUrl(teks: string, sumber: Sumber[]): string | undefined {
  const t = norm(teks);
  if (t.length < 6) return undefined;
  let terbaik: { url: string; skor: number } | undefined;
  for (const s of sumber) {
    if (!s.url) continue;
    const n = norm(s.text);
    if (n.length < 6) continue;
    const cocok = t.includes(n) || n.includes(t);
    if (cocok && (!terbaik || n.length > terbaik.skor)) terbaik = { url: s.url, skor: n.length };
  }
  return terbaik?.url;
}

// Satu entri sumber → link markdown jika memungkinkan.
function jadikanLink(isi: string, sumber: Sumber[]): string {
  const tanpaBacktick = isi
    .replace(/`([^`]*)`/g, "$1")
    // Link palsu tanpa URL, misalnya [Tim Surantara](Tim Surantara), jadi teks biasa.
    .replace(/\[([^\]]+)\]\((?!https?:\/\/)[^)]*\)/g, "$1");
  if (/\]\(https?:\/\//.test(tanpaBacktick)) return tanpaBacktick; // sudah link markdown
  const urls = tanpaBacktick.match(URL_RE) ?? [];
  if (urls.length > 1) return tanpaBacktick; // beberapa URL dalam satu baris: biarkan, tetap bisa diklik
  const teks = rapikanTeks(tanpaBacktick);
  const url = urls[0] ?? cariUrl(teks, sumber);
  if (!url) return tanpaBacktick;
  return `[${teks || new URL(url).hostname}](${url})`;
}

export function lengkapiLinkSumber(jawaban: string, sumber: Sumber[]): string {
  const lines = jawaban.split("\n");
  const mulai = lines.findIndex((l) => l.includes("📚"));
  if (mulai < 0) return jawaban;

  for (let i = mulai; i < lines.length; i++) {
    const line = lines[i];
    if (i === mulai) {
      // "📚 Sumber: A, url ; B" di baris yang sama.
      const m = line.match(/^(.*📚\s*\**\s*Sumber\s*:?\**:?\s*)(.+)$/u);
      if (m) lines[i] = m[1] + m[2].split(/\s;\s/).map((s) => jadikanLink(s, sumber)).join(" ; ");
      continue;
    }
    const butir = line.match(/^(\s*(?:[-*•]|\d+[.)])\s+)(.+)$/u);
    if (butir) lines[i] = butir[1] + jadikanLink(butir[2], sumber);
  }
  return lines.join("\n");
}
