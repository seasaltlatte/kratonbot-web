import Link from "next/link";
import { LabelChip } from "@/components/LabelLegend";
import { SourceList } from "@/components/SourceList";
import type { Card } from "@/lib/cards";
import { KATEGORI_INDEX } from "@/lib/labels";

const SITE_STYLE = {
  kasunanan: "border-l-kasunanan",
  mangkunegaran: "border-l-pareanom",
  both: "border-l-emas",
};

export function KnowledgeCard({ card }: { card: Card }) {
  const tone =
    card.sites.length === 2 ? SITE_STYLE.both : card.sites[0] === "mangkunegaran" ? SITE_STYLE.mangkunegaran : SITE_STYLE.kasunanan;
  return (
    <article id={card.id} className={`scroll-mt-24 border border-garis border-l-4 bg-permukaan p-5 ${tone}`}>
      <div className="flex flex-wrap items-center gap-2">
        <LabelChip index={KATEGORI_INDEX[card.kategori]} />
        <span className="text-sm text-abu">{card.situs}</span>
      </div>
      <h3 className="mt-3 text-lg leading-snug font-normal text-perkamen">{card.judul}</h3>
      <p className="mt-2 leading-relaxed">{card.isi}</p>
      {card.dicek && <p className="mt-2 text-sm text-abu">Dicek tim: {card.dicek}</p>}
      <SourceList sumber={card.sumber} className="mt-3" />
      <Link
        href={`/chat?q=${encodeURIComponent(`Ceritakan tentang ${card.judul}`)}`}
        className="mt-3 inline-block text-sm font-semibold text-emas underline underline-offset-4"
      >
        Tanya KratonBot tentang ini
      </Link>
    </article>
  );
}
