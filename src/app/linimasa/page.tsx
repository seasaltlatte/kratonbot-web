import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LabelChip } from "@/components/LabelLegend";
import { Reveal } from "@/components/Reveal";
import { ScrollSpine } from "@/components/ScrollSpine";
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
    <div className="batik overflow-hidden bg-malam-2 px-4 py-24 sm:px-8">
      <Reveal>
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
      </Reveal>

      <ol className="relative mx-auto mt-20 max-w-5xl">
        <ScrollSpine />
        {events.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <li key={e.year + e.title} className="relative mb-20 grid items-center gap-8 pl-12 md:mb-28 md:grid-cols-2 md:gap-0 md:pl-0">
              <span className="absolute top-8 left-4 flex -translate-x-1/2 gap-1 md:left-1/2" aria-hidden="true">
                {e.sites.map((s) => (
                  <span key={s} className={`size-3 rounded-full ring-4 ring-malam-2 ${SITE_DOT[s]}`} />
                ))}
              </span>

              <Reveal from={right ? "kanan" : "kiri"} className={right ? "md:order-2 md:pl-14" : "md:pr-14"}>
                <article className="relative border border-garis bg-permukaan/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-8">
                  <span className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-emas" aria-hidden="true" />
                  <span className="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-emas" aria-hidden="true" />
                  <p className="font-display text-4xl leading-none text-emas tabular-nums sm:text-5xl">{e.year}</p>
                  <p className="mt-4 font-script text-2xl text-emas-redup">{e.sites.map((s) => SITE_NAME[s]).join(" & ")}</p>
                  <h2 className="mt-1 font-display text-xl leading-snug font-normal tracking-[0.12em] uppercase sm:text-2xl">
                    {e.title}
                  </h2>
                  <p className="mt-4 leading-[1.8]">
                    <LabelChip index={0} /> {e.summary}
                  </p>
                  {e.note && (
                    <p className="mt-4 border-l-2 border-emas/60 bg-catatan px-4 py-2 text-sm text-emas-terang">{e.note}</p>
                  )}
                  <SourceList sumber={e.sumber} className="mt-4" />
                  <p className="mt-5 flex flex-wrap gap-x-6 text-xs text-teks">
                    {e.cardIds.map((id, n) => (
                      <Link key={id} href={`/jelajah#${id}`} className="tautan-kurung py-1">
                        [ {e.cardIds.length > 1 ? `Kartu ${n + 1}` : "Baca kartunya"} ]
                      </Link>
                    ))}
                  </p>
                </article>
              </Reveal>

              {e.photo && (
                <Reveal from="zoom" delay={150} className={right ? "md:order-1 md:pr-14" : "md:pl-14"}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden border border-garis bg-permukaan">
                      <Image
                        src={e.photo.src}
                        alt={e.photo.caption}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="lukisan object-cover transition-transform duration-[2s] hover:scale-105"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs leading-relaxed text-abu-gelap">
                      Foto {e.photo.year}, bukan saat peristiwa. {e.photo.caption} {e.photo.author}. {e.photo.license}.
                    </figcaption>
                  </figure>
                </Reveal>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
