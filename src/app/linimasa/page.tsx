import type { Metadata } from "next";
import Link from "next/link";
import { LabelChip } from "@/components/LabelLegend";
import { SourceList } from "@/components/SourceList";
import { getCardByTitle, type Sumber } from "@/lib/cards";
import { TIMELINE } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Linimasa | KratonBot",
};

const SITE_LABEL = {
  kasunanan: { name: "Kasunanan", dot: "bg-kasunanan", text: "text-kasunanan" },
  mangkunegaran: { name: "Mangkunegaran", dot: "bg-pareanom", text: "text-pareanom" },
};

export default function LinimasaPage() {
  const events = TIMELINE.map((e) => {
    const cards = e.cards.map(getCardByTitle);
    const seen = new Set<string>();
    const sumber: Sumber[] = cards
      .flatMap((c) => c.sumber)
      .filter((s) => !seen.has(s.text) && seen.add(s.text));
    return { ...e, cardIds: cards.map((c) => c.id), sumber };
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-sogan-tua">Linimasa dua istana</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-tinta-pudar">
        Dari runtuhnya Kartasura sampai hari ini. Setiap peristiwa diambil dari kartu pengetahuan, dan kalau sumber
        berbeda soal tahun, kedua versinya ditampilkan.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {Object.values(SITE_LABEL).map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2">
            <span className={`size-3 rounded-full ${s.dot}`} aria-hidden="true" />
            {s.name}
          </span>
        ))}
      </p>

      <ol className="relative mt-12 border-l-2 border-garis">
        {events.map((e) => (
          <li key={e.year + e.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
            <span className="absolute top-1.5 -left-[9px] flex gap-0.5" aria-hidden="true">
              {e.sites.map((s) => (
                <span key={s} className={`size-4 rounded-full border-2 border-gading ${SITE_LABEL[s].dot}`} />
              ))}
            </span>
            <p className="text-2xl font-extrabold text-sogan-tua tabular-nums">{e.year}</p>
            <h2 className="mt-1 text-xl font-bold">{e.title}</h2>
            <p className="mt-1 text-sm text-tinta-pudar">{e.sites.map((s) => SITE_LABEL[s].name).join(" dan ")}</p>
            <p className="mt-3 leading-relaxed">
              <LabelChip index={0} /> {e.summary}
            </p>
            {e.note && (
              <p className="mt-3 rounded-md bg-emas-muda px-3 py-2 text-sm text-[#5c4a12]">{e.note}</p>
            )}
            <SourceList sumber={e.sumber} className="mt-3" />
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
              {e.cardIds.map((id, i) => (
                <Link key={id} href={`/jelajah#${id}`} className="font-semibold text-sogan underline underline-offset-4">
                  {e.cardIds.length > 1 ? `Baca kartu ${i + 1}` : "Baca kartunya"}
                </Link>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
