import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { CopyButton } from "@/components/CopyButton";
import { LabelChip } from "@/components/LabelLegend";
import { getCardByTitle } from "@/lib/cards";
import { GALLERY, type GalleryItem } from "@/lib/gallery";
import { KATEGORI_INDEX } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Galeri rekonstruksi AI vs arsip | KratonBot",
};

const RULES = [
  "Ilustrasi AI selalu dipasang berdampingan dengan foto arsip atau kondisi nyata.",
  "Gayanya sengaja dibuat seperti lukisan atau sketsa, bukan foto, dan diberi tulisan “Ilustrasi AI” di gambarnya.",
  "Model AI, pembuat, tanggal, dan prompt yang dipakai dicantumkan lengkap.",
  "Bagian yang terpaksa dibayangkan AI ditulis terang-terangan, dan tingkat spekulasinya diberi nilai.",
];

const LEVELS = { rendah: 1, sedang: 2, tinggi: 3 } as const;
const SITE = {
  kasunanan: { name: "Keraton Kasunanan", border: "border-t-kasunanan" },
  mangkunegaran: { name: "Pura Mangkunegaran", border: "border-t-pareanom" },
};

function SpeculationMeter({ level }: { level: GalleryItem["speculation"] }) {
  const n = LEVELS[level];
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2.5 w-6 ${i <= n ? "bg-emas" : "bg-garis"}`} />
        ))}
      </span>
      Spekulasi {level}
    </span>
  );
}

function GalleryEntry({ item }: { item: GalleryItem }) {
  const cards = item.cards.map(getCardByTitle);
  const a = item.archive;
  return (
    <article id={item.id} className={`scroll-mt-24 border border-garis border-t-4 bg-permukaan p-5 sm:p-7 ${SITE[item.site].border}`}>
      <p className="text-sm text-abu">{SITE[item.site].name}</p>
      <h2 className="mt-1 text-2xl font-normal tracking-[0.14em] uppercase text-perkamen">{item.title}</h2>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <SpeculationMeter level={item.speculation} />
        <span className="text-sm text-abu">{item.speculationReason}</span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <figure>
          <p className="mb-2 text-sm font-bold text-perkamen">Arsip: {a.year}</p>
          <Image
            src={a.src}
            alt={a.caption}
            width={a.width}
            height={a.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-72 w-full bg-malam object-contain"
          />
          <figcaption className="mt-2 text-sm leading-relaxed text-abu">
            {a.caption} Foto: {a.author}
            {a.institution ? `, ${a.institution}` : ""}.{" "}
            {a.licenseUrl ? (
              <a href={a.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {a.license}
              </a>
            ) : (
              a.license
            )}
            ,{" "}
            <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Wikimedia Commons
            </a>
            .
          </figcaption>
        </figure>

        <figure>
          <p className="mb-2 text-sm font-bold text-emas-terang">Rekonstruksi AI</p>
          {item.ai ? (
            <>
              <div className="relative">
                <Image
                  src={item.ai.src}
                  alt={`Ilustrasi AI: ${item.title}`}
                  width={item.ai.width}
                  height={item.ai.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-72 w-full bg-malam object-contain"
                />
                <span className="absolute top-3 left-3 bg-malam/80 px-2.5 py-1 text-sm font-bold text-perkamen">
                  Ilustrasi AI, bukan foto
                </span>
              </div>
              <figcaption className="mt-2 text-sm text-abu">
                Dibuat dengan {item.ai.model} oleh {item.ai.madeBy}, {item.ai.date}.
              </figcaption>
            </>
          ) : (
            <div className="flex h-72 flex-col items-center justify-center border-2 border-dashed border-emas/60 bg-catatan/50 p-6 text-center">
              <p className="font-semibold text-emas-terang">Ilustrasi AI belum ditambahkan</p>
              <p className="mt-2 max-w-xs text-sm text-emas-terang">
                Sementara itu, minta KratonBot merekonstruksi suasananya dengan kata-kata.
              </p>
              <Link
                href={`/chat?q=${encodeURIComponent(item.askBot)}`}
                className="mt-4 bg-emas px-4 py-2 text-sm font-semibold text-malam hover:bg-emas-terang"
              >
                Coba rekonstruksi teks
              </Link>
            </div>
          )}
        </figure>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="font-normal tracking-[0.14em] uppercase">Yang tercatat di sumber</h3>
          <ul className="mt-3 space-y-2">
            {cards.map((c) => (
              <li key={c.id} className="flex flex-wrap items-baseline gap-2">
                <LabelChip index={KATEGORI_INDEX[c.kategori]} />
                <Link href={`/pustaka#${c.id}`} className="text-emas underline underline-offset-2">
                  {c.judul}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-normal tracking-[0.14em] uppercase">Yang harus dibayangkan AI</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-abu">
            {item.imagined.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </div>

      <details className="mt-6 border border-garis bg-malam p-4">
        <summary className="cursor-pointer font-semibold">Prompt untuk membuat ilustrasinya</summary>
        <p className="mt-3 leading-relaxed">{item.prompt}</p>
        <div className="mt-3">
          <CopyButton text={item.prompt} />
        </div>
      </details>
    </article>
  );
}

export default function GaleriPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6">
      <SectionTitle
        as="h1"
        script="Antara bukti dan bayangan"
        title="Rekonstruksi AI vs arsip"
        intro="AI bisa menggambar masa lalu dengan meyakinkan, padahal sebagian besar isinya rekaan. Galeri ini memasangkan setiap rekonstruksi dengan bukti aslinya, supaya kamu bisa melihat sendiri mana yang tercatat dan mana yang dibayangkan."
      />
      <div className="mt-16" />

      <section className="mt-8 bg-emas-redup/60 p-5 sm:p-6">
        <h2 className="font-normal tracking-[0.14em] uppercase text-perkamen">Aturan rekonstruksi di galeri ini</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10 space-y-10">
        {GALLERY.map((item) => (
          <GalleryEntry key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
