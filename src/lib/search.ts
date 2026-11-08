// Pencarian kartu pengetahuan untuk bot: BM25 sederhana di memori, tanpa database vektor.
// Korpusnya kecil (±60 kartu), jadi pencarian kata kunci sudah cukup dan hasilnya bisa ditelusuri.
import { getBotCards, type BotCard } from "@/lib/cards";

const STOPWORDS = new Set(
  "yang dan di ke dari pada untuk dengan ini itu atau juga dalam oleh sebagai adalah akan tidak ada apa siapa bagaimana kapan mengapa kenapa dimana berapa saja sudah telah bisa dapat lebih para karena tentang seperti saat secara hingga sampai antara tersebut ia mereka kita kami aku saya kamu anda nya the of and".split(
    " ",
  ),
);

// Pemangkas imbuhan yang ringan, cukup agar "kerajaannya" cocok dengan "kerajaan".
function stem(w: string) {
  if (w.length <= 5 || /^\d+$/.test(w)) return w;
  return w.replace(/(nya|kah|lah|pun)$/, "").replace(/(kan|an|i)$/, (m, _s, off) => (off > 4 ? "" : m));
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

type Doc = { card: BotCard; tf: Map<string, number>; len: number };
let index: { docs: Doc[]; df: Map<string, number>; avgLen: number } | null = null;

function getIndex() {
  if (index) return index;
  const docs: Doc[] = getBotCards().map((card) => {
    // Judul dan situs diberi bobot lebih dengan diulang.
    const toks = [...tokens(card.judul), ...tokens(card.judul), ...tokens(card.situs), ...tokens(card.isi)];
    const tf = new Map<string, number>();
    for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { card, tf, len: toks.length };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  index = { docs, df, avgLen: docs.reduce((s, d) => s + d.len, 0) / docs.length };
  return index;
}

export function searchCards(query: string, limit = 5): BotCard[] {
  const { docs, df, avgLen } = getIndex();
  const q = [...new Set(tokens(query))];
  if (q.length === 0) return [];
  const N = docs.length;
  const k1 = 1.4;
  const b = 0.75;
  return docs
    .map((d) => {
      let score = 0;
      for (const t of q) {
        const f = d.tf.get(t);
        if (!f) continue;
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
      }
      return { card: d.card, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, limit)
    .map((r) => r.card);
}
