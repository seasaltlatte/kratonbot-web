"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IkonLontar } from "@/components/Icons";
import { LabelChip } from "@/components/LabelLegend";
import { SourceList } from "@/components/SourceList";
import type { Card, Kategori, Site } from "@/lib/cards";
import { CLAIM_LABELS, KATEGORI_INDEX } from "@/lib/labels";

const SITE_OPTIONS: { value: Site | "semua"; label: string }[] = [
  { value: "semua", label: "Kedua istana" },
  { value: "kasunanan", label: "Keraton Kasunanan" },
  { value: "mangkunegaran", label: "Pura Mangkunegaran" },
];

const SITE_BORDER = { kasunanan: "border-t-kasunanan", mangkunegaran: "border-t-pareanom", both: "border-t-emas" };

// Pustaka: tab tema di atas, filter ringkas, lalu kisi kartu yang bisa dibuka satu per satu.
export function Explorer({ cards, temas }: { cards: Card[]; temas: string[] }) {
  const [tema, setTema] = useState<string>("semua");
  const [site, setSite] = useState<Site | "semua">("semua");
  const [kategori, setKategori] = useState<Kategori | "semua">("semua");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // Tautan seperti /pustaka#id-kartu (dari linimasa dan galeri) langsung membuka kartunya.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !cards.some((c) => c.id === id)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hash hanya bisa dibaca setelah mount
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, [cards]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { semua: cards.length };
    for (const c of cards) m[c.tema] = (m[c.tema] ?? 0) + 1;
    return m;
  }, [cards]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter(
      (c) =>
        (tema === "semua" || c.tema === tema) &&
        (site === "semua" || c.sites.includes(site)) &&
        (kategori === "semua" || c.kategori === kategori) &&
        (!q || `${c.judul} ${c.isi}`.toLowerCase().includes(q)),
    );
  }, [cards, tema, site, kategori, query]);

  const tabs = ["semua", ...temas];

  return (
    <div>
      {/* Penyaring: deret indeks tema bergaris bawah (seperti indeks buku) dan baris pencarian tanpa kotak. */}
      <div className="border-y border-emas/35 bg-malam/85 backdrop-blur-sm">
        <div role="tablist" aria-label="Tema" className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 sm:flex-wrap sm:overflow-visible sm:justify-center sm:gap-x-8 sm:px-6">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tema === t}
              onClick={() => setTema(t)}
              className="relative shrink-0 py-4 font-display text-[15px] tracking-[0.08em] whitespace-nowrap text-abu transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:scale-x-0 after:bg-emas after:transition-transform hover:text-perkamen aria-selected:text-perkamen aria-selected:after:scale-x-100"
            >
              {t === "semua" ? "Semua tema" : t}
              <sup className="ml-1 font-sans text-[10px] text-emas tabular-nums">{counts[t] ?? 0}</sup>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-garis px-4 py-4 sm:flex-row sm:items-end sm:gap-6 sm:px-6">
          <label className="flex flex-1 items-center gap-3 border-b-2 border-emas/50 pb-1.5 focus-within:border-emas">
            <span className="sr-only">Cari kata</span>
            <svg className="size-5 shrink-0 text-emas" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="cari"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari: Sekaten, 1757, gamelan…"
              className="w-full bg-transparent py-1 text-lg placeholder:text-abu-gelap focus:outline-none"
            />
          </label>
          <label className="flex items-baseline gap-2 text-xs tracking-[0.12em] text-abu-gelap uppercase">
            Istana
            <select
              id="istana"
              value={site}
              onChange={(e) => setSite(e.target.value as Site | "semua")}
              className="border-b border-garis bg-transparent py-1 font-sans text-sm tracking-normal text-perkamen normal-case focus:border-emas focus:outline-none"
            >
              {SITE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-malam">
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-baseline gap-2 text-xs tracking-[0.12em] text-abu-gelap uppercase">
            Jenis
            <select
              id="jenis"
              value={kategori}
              onChange={(e) => setKategori(e.target.value as Kategori | "semua")}
              className="border-b border-garis bg-transparent py-1 font-sans text-sm tracking-normal text-perkamen normal-case focus:border-emas focus:outline-none"
            >
              <option value="semua" className="bg-malam">
                Semua jenis
              </option>
              {(Object.keys(KATEGORI_INDEX) as Kategori[]).map((k) => {
                const l = CLAIM_LABELS[KATEGORI_INDEX[k]];
                return (
                  <option key={k} value={k} className="bg-malam">
                    {l.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 mb-4 text-sm text-abu" aria-live="polite">
        Menampilkan {visible.length} dari {cards.length} kartu
      </p>

      {visible.length === 0 ? (
        <p className="border border-dashed border-garis p-8 text-center text-abu">
          Tidak ada kartu yang cocok. Coba kata lain, atau pilih &ldquo;Semua tema&rdquo; dan &ldquo;Semua jenis&rdquo;.
        </p>
      ) : (
        <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const open = openId === c.id;
            const tone = c.sites.length === 2 ? SITE_BORDER.both : SITE_BORDER[c.sites[0] ?? "kasunanan"];
            return (
              <article
                key={c.id}
                id={c.id}
                className={`flex scroll-mt-24 flex-col border border-t-4 border-garis bg-permukaan p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)] ${tone} ${open ? "md:col-span-2 lg:col-span-3" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <LabelChip index={KATEGORI_INDEX[c.kategori]} />
                  <span className="text-xs text-abu-gelap">{c.tema}</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug font-medium text-perkamen">{c.judul}</h3>
                <p className={`mt-2.5 font-sans text-[15px] leading-relaxed text-abu ${open ? "" : "line-clamp-3"}`}>{c.isi}</p>
                {open && (
                  <>
                    <p className="mt-3 text-sm text-abu-gelap">{c.situs}</p>
                    {c.dicek && <p className="mt-1 text-sm text-abu-gelap">Dicek tim: {c.dicek}</p>}
                    <SourceList sumber={c.sumber} className="mt-4" />
                    <Link
                      href={`/chat?q=${encodeURIComponent(`Ceritakan tentang ${c.judul}`)}`}
                      className="tombol-garis mt-5 self-start !min-h-0 !py-2.5"
                    >
                      Tanya KratonBot tentang ini
                    </Link>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : c.id)}
                  aria-expanded={open}
                  className="mt-4 inline-flex items-center gap-2 self-start text-sm text-emas hover:text-perkamen"
                >
                  <IkonLontar className="size-4" />
                  {open ? "Tutup kartu" : `Baca selengkapnya (${c.sumber.length} sumber)`}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
