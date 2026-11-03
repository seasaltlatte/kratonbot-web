import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LabelChip } from "@/components/LabelLegend";
import { SectionTitle } from "@/components/SectionTitle";
import { SourceList } from "@/components/SourceList";
import { getCardByTitle, type Sumber } from "@/lib/cards";
import { GALLERY } from "@/lib/gallery";
import { TIMELINE } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Linimasa | KratonBot",
};

const SITE_NAME = { kasunanan: "Kasunanan", mangkunegaran: "Mangkunegaran" };
const SITE_DOT = { kasunanan: "bg-kasunanan", mangkunegaran: "bg-pareanom" };

export default function LinimasaPage() {
  const events = TIMELINE.map((e) => {
    const cards = e.cards.map(getCardByTitle);
    const seen = new Set<string>();
    const sumber: Sumber[] = cards
      .flatMap((c) => c.sumber)
      .filter((s) => !seen.has(s.text) && seen.add(s.text));
    const photo = e.photo ? GALLERY.find((g) => g.id === e.photo)?.archive : undefined;
    return { ...e, cardIds: cards.map((c) => c.id), sumber, photo };
  });

  return (
    <div className="bg-malam-2 px-4 py-24 sm:px-8">
      <SectionTitle
        as="h1"
        script="Jejak Perjalanan Kerajaan"
        title="Linimasa"
        intro="Dari runtuhnya Kartasura sampai hari ini. Setiap peristiwa diambil dari kartu pengetahuan, dan kalau sumber berbeda soal tahun, kedua versinya ditampilkan."
      />
      <p className="mt-8 flex justify-center gap-x-6 text-sm text-abu">
        {(["kasunanan", "mangkunegaran"] as const).map((s) => (
          <span key={s} className="inline-flex items-center gap-2">
            <span className={`size-2.5 rounded-full ${SITE_DOT[s]}`} aria-hidden="true" />
            {SITE_NAME[s]}
          </span>
        ))}
      </p>

      <ol className="relative mx-auto mt-20 max-w-5xl">
        <span className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-teks/15 md:block" aria-hidden="true" />
        {events.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <li key={e.year + e.title} className="relative mb-24 grid items-start gap-10 md:mb-32 md:grid-cols-2 md:gap-0">
              <span className="absolute top-2 left-1/2 hidden -translate-x-1/2 gap-1 md:flex" aria-hidden="true">
                {e.sites.map((s) => (
                  <span key={s} className={`size-2.5 rounded-full ring-4 ring-malam-2 ${SITE_DOT[s]}`} />
                ))}
              </span>

              <div className={right ? "md:order-2 md:pl-14" : "md:pr-14 md:text-right"}>
                <div className={`flex items-center gap-4 ${right ? "" : "md:flex-row-reverse"}`}>
                  <span className="size-1.5 shrink-0 rounded-full bg-emas md:hidden" aria-hidden="true" />
                  <span className="h-px w-10 bg-teks/20" aria-hidden="true" />
                  <span className="text-sm tracking-[0.22em] text-abu tabular-nums">{e.year}</span>
                </div>
                <p className="mt-3 font-script text-2xl text-emas">
                  {e.sites.map((s) => SITE_NAME[s]).join(" & ")}
                </p>
                <h2 className="mt-1 font-display text-xl leading-snug font-normal tracking-[0.14em] uppercase sm:text-2xl">
                  {e.title}
                </h2>
                <p className="mt-4 leading-[1.8] text-emas-redup">
                  <LabelChip index={0} /> {e.summary}
                </p>
                {e.note && (
                  <p className="mt-4 border-l-2 border-emas/50 bg-catatan px-4 py-2 text-left text-sm text-emas-terang">
                    {e.note}
                  </p>
                )}
                <SourceList sumber={e.sumber} className="mt-4 text-left" />
                <p className={`mt-4 flex flex-wrap gap-x-6 text-xs text-teks ${right ? "" : "md:justify-end"}`}>
                  {e.cardIds.map((id, n) => (
                    <Link key={id} href={`/jelajah#${id}`} className="tautan-kurung py-1">
                      [ {e.cardIds.length > 1 ? `Kartu ${n + 1}` : "Baca kartunya"} ]
                    </Link>
                  ))}
                </p>
              </div>

              {e.photo && (
                <figure className={right ? "md:order-1 md:pr-14" : "md:pl-14"}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-permukaan">
                    <Image src={e.photo.src} alt={e.photo.caption} fill sizes="(min-width: 768px) 40vw, 100vw" className="lukisan object-cover" />
                  </div>
                  <figcaption className="mt-3 text-xs leading-relaxed text-abu-gelap">
                    Foto {e.photo.year}, bukan saat peristiwa. {e.photo.caption} {e.photo.author}. {e.photo.license}.
                  </figcaption>
                </figure>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
