"use client";

import { useMemo, useState } from "react";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import type { Card, Kategori, Site } from "@/lib/cards";
import { CLAIM_LABELS, KATEGORI_INDEX } from "@/lib/labels";

type Option<T> = { value: T | "semua"; label: string };

const SITE_OPTIONS: Option<Site>[] = [
  { value: "semua", label: "Semua" },
  { value: "kasunanan", label: "Keraton Kasunanan" },
  { value: "mangkunegaran", label: "Pura Mangkunegaran" },
];

const KATEGORI_OPTIONS: Option<Kategori>[] = [
  { value: "semua", label: "Semua" },
  ...(Object.keys(KATEGORI_INDEX) as Kategori[]).map((k) => {
    const l = CLAIM_LABELS[KATEGORI_INDEX[k]];
    return { value: k, label: `${l.emoji} ${l.name}` };
  }),
];

function Filter<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Option<T>[];
  value: T | "semua";
  onChange: (v: T | "semua") => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-perkamen">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className="rounded-full border border-garis bg-permukaan px-3 py-1 text-sm hover:border-emas aria-pressed:border-emas aria-pressed:bg-emas aria-pressed:text-malam"
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Explorer({ cards, temas }: { cards: Card[]; temas: string[] }) {
  const [site, setSite] = useState<Site | "semua">("semua");
  const [kategori, setKategori] = useState<Kategori | "semua">("semua");
  const [tema, setTema] = useState<string>("semua");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter(
      (c) =>
        (site === "semua" || c.sites.includes(site)) &&
        (kategori === "semua" || c.kategori === kategori) &&
        (tema === "semua" || c.tema === tema) &&
        (!q || `${c.judul} ${c.isi}`.toLowerCase().includes(q)),
    );
  }, [cards, site, kategori, tema, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <div>
          <label htmlFor="cari" className="mb-2 block text-sm font-semibold text-perkamen">
            Cari kata
          </label>
          <input
            id="cari"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="misalnya: Sekaten, 1757, gamelan"
            className="w-full border border-garis bg-permukaan px-3 py-2 focus:border-emas focus:outline-none"
          />
        </div>
        <Filter legend="Istana" options={SITE_OPTIONS} value={site} onChange={setSite} />
        <Filter legend="Jenis pengetahuan" options={KATEGORI_OPTIONS} value={kategori} onChange={setKategori} />
        <Filter
          legend="Tema"
          options={[{ value: "semua", label: "Semua" }, ...temas.map((t) => ({ value: t, label: t }))]}
          value={tema}
          onChange={setTema}
        />
      </div>

      <div>
        <p className="mb-4 text-sm text-abu" aria-live="polite">
          Menampilkan {visible.length} dari {cards.length} kartu
        </p>
        {visible.length === 0 ? (
          <p className="border border-dashed border-garis p-6 text-abu">
            Tidak ada kartu yang cocok. Coba kata lain atau pilih &ldquo;Semua&rdquo; di filter.
          </p>
        ) : (
          <div className="space-y-4">
            {visible.map((c) => (
              <KnowledgeCard key={c.id} card={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
