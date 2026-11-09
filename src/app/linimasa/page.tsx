import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LabelChip } from "@/components/LabelLegend";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { ScrollSpine } from "@/components/ScrollSpine";
import { SectionTitle } from "@/components/SectionTitle";
import { SourceList } from "@/components/SourceList";
import { IkonKartu } from "@/components/Icons";
import { getCardByTitle, type Sumber } from "@/lib/cards";
import { getPhoto } from "@/lib/photos";
import { TIMELINE } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Linimasa | Kerajaan Mataram Islam Bot",
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
    return { ...e, cardIds: cards.map((c) => c.id), sumber, foto: getPhoto(e.photo) };
  });

  return (
    <div className="batik overflow-hidden bg-malam-2 px-4 py-24 sm:px-8">
      <Reveal>
        <SectionTitle panel
          as="h1"
          script="Jejak Perjalanan Kerajaan"
          title="Linimasa"
          intro="Dari berdirinya Mataram di Kotagede sampai hari ini. Setiap peristiwa diambil dari kartu pengetahuan, dan kalau sumber berbeda soal tahun, kedua versinya ditampilkan."
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
            <li key={e.year + e.title} className="relative mb-20 grid items-center gap-6 pl-12 md:mb-28 md:grid-cols-2 md:gap-0 md:pl-0">
              <span className="absolute top-9 left-4 flex -translate-x-1/2 gap-1 md:left-1/2" aria-hidden="true">
                {e.sites.map((s) => (
                  <span key={s} className={`size-3.5 rounded-full ring-4 ring-malam-2 ${SITE_DOT[s]}`} />
                ))}
              </span>

              <Reveal from={right ? "kanan" : "kiri"} className={right ? "md:order-2 md:pl-14" : "md:pr-14"}>
                <article className="relative border border-emas/35 bg-permukaan/95 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)] backdrop-blur-sm">
                  <span className="absolute -top-px -left-px size-4 border-t-2 border-l-2 border-emas" aria-hidden="true" />
                  <span className="absolute -right-px -bottom-px size-4 border-r-2 border-b-2 border-emas" aria-hidden="true" />
                  <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-emas/25 bg-malam/40 px-6 py-4 sm:px-7">
                    <p className="font-display text-4xl leading-none text-emas tabular-nums sm:text-5xl">{e.year}</p>
                    <p className="font-script text-2xl leading-none text-emas-redup">{e.sites.map((s) => SITE_NAME[s]).join(" & ")}</p>
                  </header>
                  <div className="p-6 sm:p-7">
                    <h2 className="font-display text-xl leading-snug font-normal tracking-[0.1em] uppercase sm:text-2xl">{e.title}</h2>
                    <p className="mt-4 leading-[1.8]">
                      <LabelChip index={0} /> {e.summary}
                    </p>
                    {e.note && (
                      <p className="mt-4 border-l-2 border-emas/60 bg-catatan px-4 py-2 text-sm text-emas-terang">{e.note}</p>
                    )}
                  </div>
                  {/* Kaki kartu: sumber (bisa dibuka) di kiri, tautan ke kartu pengetahuan di kanan. */}
                  <footer className="flex flex-col items-start gap-4 border-t border-emas/25 bg-malam/35 px-6 py-4 sm:px-7">
                    <SourceList sumber={e.sumber} lipat className="w-full" />
                    <span className="flex flex-wrap gap-2">
                      {e.cardIds.map((id, n) => (
                        <Link
                          key={id}
                          href={`/pustaka#${id}`}
                          className="group/k inline-flex items-center gap-2 whitespace-nowrap bg-emas px-3.5 py-2 text-xs font-semibold tracking-[0.12em] text-malam uppercase shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition hover:bg-emas-terang"
                        >
                          <IkonKartu className="size-4" />
                          {e.cardIds.length > 1 ? `Kartu ${n + 1}` : "Baca kartu"}
                          <span className="transition-transform group-hover/k:translate-x-0.5" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      ))}
                    </span>
                  </footer>
                </article>
              </Reveal>

              <Reveal from="zoom" delay={150} className={right ? "md:order-1 md:pr-14" : "md:pl-14"}>
                <figure className="border border-emas/30 bg-permukaan/80 p-2">
                  <div className="batik relative aspect-[4/3] overflow-hidden">
                    <Parallax className="absolute -inset-y-[12%] inset-x-0">
                      <Image
                        src={e.foto.src}
                        alt={e.foto.caption}
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="lukisan object-cover"
                      />
                    </Parallax>
                  </div>
                  <figcaption className="px-1 pt-2.5 pb-1 text-xs leading-relaxed text-abu-gelap">
                    Foto {e.foto.year}, bukan saat peristiwa. {e.foto.caption} {e.foto.author}
                    {e.foto.institution ? `, ${e.foto.institution}` : ""}.{" "}
                    {e.foto.licenseUrl ? (
                      <a href={e.foto.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emas">
                        {e.foto.license}
                      </a>
                    ) : (
                      e.foto.license
                    )}
                    ,{" "}
                    <a href={e.foto.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emas">
                      Wikimedia Commons
                    </a>
                    .
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
