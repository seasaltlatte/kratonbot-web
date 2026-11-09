"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
    const bukaDariHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && cards.some((c) => c.id === id)) setOpenId(id);
    };
    bukaDariHash();
    window.addEventListener("hashchange", bukaDariHash);
    return () => window.removeEventListener("hashchange", bukaDariHash);
  }, [cards]);

  const openCard = openId ? cards.find((c) => c.id === openId) : undefined;

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
        <div
          role="tablist"
          aria-label="Tema"
          className="flex gap-x-6 overflow-x-auto overflow-y-hidden px-4 [scrollbar-width:none] sm:px-6 xl:justify-between xl:gap-x-4"
        >
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tema === t}
              onClick={() => setTema(t)}
              className="relative shrink-0 py-3.5 font-display text-sm tracking-[0.06em] whitespace-nowrap text-abu transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-emas after:transition-transform hover:text-perkamen aria-selected:text-perkamen aria-selected:after:scale-x-100"
            >
              {t === "semua" ? "Semua tema" : t}
              <span className="ml-1.5 align-top font-sans text-[10px] text-emas tabular-nums">{counts[t] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 border-t border-garis px-4 py-4 sm:px-6 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8">
          <label className="flex items-center gap-3 border-b border-emas/50 pb-2 focus-within:border-emas">
            <span className="sr-only">Cari kata</span>
            <svg className="size-4 shrink-0 text-emas" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="cari"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari: Sekaten, 1757, gamelan…"
              className="w-full bg-transparent font-sans text-sm placeholder:text-abu-gelap focus:outline-none"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2 md:contents">
            <label className="flex items-center gap-2.5 border-b border-garis pb-2 text-[11px] tracking-[0.14em] text-abu-gelap uppercase focus-within:border-emas">
              Istana
              <select
                id="istana"
                value={site}
                onChange={(e) => setSite(e.target.value as Site | "semua")}
                className="min-w-0 flex-1 bg-transparent font-sans text-sm tracking-normal text-perkamen normal-case focus:outline-none md:w-44 md:flex-none"
              >
                {SITE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-malam">
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2.5 border-b border-garis pb-2 text-[11px] tracking-[0.14em] text-abu-gelap uppercase focus-within:border-emas">
              Jenis
              <select
                id="jenis"
                value={kategori}
                onChange={(e) => setKategori(e.target.value as Kategori | "semua")}
                className="min-w-0 flex-1 bg-transparent font-sans text-sm tracking-normal text-perkamen normal-case focus:outline-none md:w-36 md:flex-none"
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
      </div>

      <p className="mt-6 mb-4 text-sm text-abu" aria-live="polite">
        Menampilkan {visible.length} dari {cards.length} kartu
      </p>

      {visible.length === 0 ? (
        <p className="border border-dashed border-garis p-8 text-center text-abu">
          Tidak ada kartu yang cocok. Coba kata lain, atau pilih &ldquo;Semua tema&rdquo; dan &ldquo;Semua jenis&rdquo;.
        </p>
      ) : (
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const tone = c.sites.length === 2 ? SITE_BORDER.both : SITE_BORDER[c.sites[0] ?? "kasunanan"];
            return (
              <article
                key={c.id}
                id={c.id}
                className={`flex scroll-mt-24 flex-col border border-t-4 border-garis bg-permukaan p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)] ${tone}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <LabelChip index={KATEGORI_INDEX[c.kategori]} />
                  <span className="text-xs text-abu-gelap">{c.tema}</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug font-medium text-perkamen">{c.judul}</h3>
                <p className="mt-2.5 line-clamp-3 font-sans text-[15px] leading-relaxed text-abu">{c.isi}</p>
                <button
                  type="button"
                  onClick={() => setOpenId(c.id)}
                  aria-haspopup="dialog"
                  className="mt-auto inline-flex items-center gap-2 self-start pt-4 text-sm text-emas hover:text-perkamen"
                >
                  <IkonLontar className="size-4" />
                  Baca selengkapnya ({c.sumber.length} sumber)
                </button>
              </article>
            );
          })}
        </div>
      )}

      {openCard && <CardModal card={openCard} onClose={() => setOpenId(null)} />}
    </div>
  );
}

const SITE_TOP = { kasunanan: "border-t-kasunanan", mangkunegaran: "border-t-pareanom", both: "border-t-emas" };

// Kartu yang dibuka tampil sebagai jendela di tengah layar. Memakai <dialog> bawaan browser:
// tombol Esc, klik di luar kartu, atau tombol × menutupnya, dan fokus kembali ke tombol semula.
function CardModal({ card, onClose }: { card: Card; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const tone = card.sites.length === 2 ? SITE_TOP.both : SITE_TOP[card.sites[0] ?? "kasunanan"];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Jangan memanggil close() saat cleanup: event "close" akan ikut menutup kartu (terjadi di mode dev).
    if (!dialog.open) dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby="judul-kartu"
      className="modal-kartu m-auto w-[min(42rem,calc(100vw-2rem))] max-h-[min(88vh,52rem)] overflow-visible bg-transparent p-0 text-teks backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <article className={`relative flex max-h-[min(88vh,52rem)] flex-col border border-t-4 border-emas/40 bg-permukaan shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ${tone}`}>
        <span className="absolute -bottom-px -left-px size-4 border-b-2 border-l-2 border-emas" aria-hidden="true" />
        <span className="absolute -right-px -bottom-px size-4 border-r-2 border-b-2 border-emas" aria-hidden="true" />

        <header className="flex items-start justify-between gap-4 border-b border-garis px-6 pt-5 pb-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <LabelChip index={KATEGORI_INDEX[card.kategori]} />
            <span className="text-xs text-abu-gelap">
              {card.tema} &middot; {card.situs}
            </span>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Tutup kartu"
            className="-mt-1 -mr-2 inline-flex size-9 shrink-0 items-center justify-center border border-garis text-perkamen hover:border-emas hover:text-emas"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <h2 id="judul-kartu" className="font-display text-2xl leading-snug font-medium text-perkamen sm:text-3xl">
            {card.judul}
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-teks">{card.isi}</p>
          {card.dicek && <p className="mt-3 text-sm text-abu-gelap">Dicek tim: {card.dicek}</p>}

          <h3 className="mt-7 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-emas uppercase">
            <IkonLontar className="size-4" />
            Sumber ({card.sumber.length})
          </h3>
          <SourceList sumber={card.sumber} className="mt-3" />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-garis bg-malam/40 px-6 py-4 sm:px-8">
          <button type="button" onClick={() => ref.current?.close()} className="text-sm text-abu underline underline-offset-4 hover:text-perkamen">
            Tutup
          </button>
          <Link href={`/chat?q=${encodeURIComponent(`Ceritakan tentang ${card.judul}`)}`} className="tombol-emas !min-h-0 !py-2.5 text-sm">
            Tanya KratonBot tentang ini
          </Link>
        </footer>
      </article>
    </dialog>
  );
}
