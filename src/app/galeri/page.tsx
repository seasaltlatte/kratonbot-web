import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/CopyButton";
import { IkonGaleri, IkonLontar, IkonPena, IkonPerisai } from "@/components/Icons";
import { LabelChip } from "@/components/LabelLegend";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { getCardByTitle } from "@/lib/cards";
import { GALLERY, type AiIllustration, type GalleryItem } from "@/lib/gallery";
import { KATEGORI_INDEX } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Galeri rekonstruksi AI vs arsip | KratonBot",
};

const RULES: { icon: ReactNode; text: string }[] = [
  { icon: <IkonGaleri className="size-5" />, text: "Ilustrasi AI selalu dipasang berdampingan dengan foto arsip atau kondisi nyata." },
  {
    icon: <IkonPena className="size-5" />,
    text: "Gayanya sengaja dibuat seperti lukisan atau sketsa, bukan foto, dan diberi tulisan “Ilustrasi AI” di gambarnya.",
  },
  { icon: <IkonLontar className="size-5" />, text: "Model AI, pembuat, tanggal, dan prompt yang dipakai dicantumkan lengkap." },
  {
    icon: <IkonPerisai className="size-5" />,
    text: "Bagian yang terpaksa dibayangkan AI ditulis terang-terangan, dan tingkat spekulasinya diberi nilai.",
  },
  {
    icon: <IkonPerisai className="size-5" />,
    text: "Setiap ilustrasi hanyalah perkiraan: tidak 100% sama dengan bentuk, warna, atau kejadian yang sebenarnya.",
  },
];

// Ilustrasi AI cukup disimpan sebagai public/galeri/<id>.webp|png|jpg; halaman memakainya otomatis.
// Isi `ai` di src/lib/gallery.ts hanya perlu jika ingin mencantumkan model, pembuat, dan tanggal yang tepat.
function cariIlustrasi(item: GalleryItem): AiIllustration | undefined {
  if (item.ai) return item.ai;
  for (const ext of ["webp", "png", "jpg", "jpeg"]) {
    const file = path.join(process.cwd(), "public", "galeri", `${item.id}.${ext}`);
    if (!fs.existsSync(file)) continue;
    const t = fs.statSync(file).mtime;
    const date = `${String(t.getDate()).padStart(2, "0")}-${String(t.getMonth() + 1).padStart(2, "0")}-${t.getFullYear()}`;
    return { src: `/galeri/${item.id}.${ext}`, width: 1200, height: 900, model: "Gemini", madeBy: "Kelompok 4", date };
  }
  return undefined;
}

const LEVELS = { rendah: 1, sedang: 2, tinggi: 3 } as const;
const SITE = {
  kasunanan: { name: "Keraton Kasunanan", dot: "bg-kasunanan" },
  mangkunegaran: { name: "Pura Mangkunegaran", dot: "bg-pareanom" },
};

function SpeculationMeter({ level }: { level: GalleryItem["speculation"] }) {
  const n = LEVELS[level];
  return (
    <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap text-perkamen">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2 w-5 ${i <= n ? "bg-emas" : "bg-garis"}`} />
        ))}
      </span>
      Spekulasi {level}
    </span>
  );
}

// Bingkai gambar yang sama untuk arsip dan ilustrasi supaya keduanya mudah dibandingkan.
function Frame({ label, tone, children }: { label: string; tone: "arsip" | "ai"; children: ReactNode }) {
  return (
    <div className="border border-emas/30 bg-permukaan/80 p-2">
      {/* Tanpa overflow-hidden: kalau isi placeholder lebih tinggi dari 4:3 (di HP), bingkainya ikut memanjang. */}
      <div className="batik relative aspect-[4/3] bg-malam">
        {children}
        <span
          className={`absolute top-2 left-2 px-2.5 py-1 text-xs font-semibold tracking-[0.12em] uppercase ${
            tone === "ai" ? "bg-emas text-malam" : "bg-malam/85 text-perkamen"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function GalleryEntry({ item, index }: { item: GalleryItem; index: number }) {
  const cards = item.cards.map(getCardByTitle);
  const a = item.archive;
  const ai = cariIlustrasi(item);
  return (
    <article id={item.id} className="relative scroll-mt-24 border border-emas/35 bg-permukaan/95 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)]">
      <span className="absolute -top-px -left-px size-4 border-t-2 border-l-2 border-emas" aria-hidden="true" />
      <span className="absolute -right-px -bottom-px size-4 border-r-2 border-b-2 border-emas" aria-hidden="true" />

      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-emas/25 bg-malam/40 px-5 py-4 sm:px-7">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-3xl leading-none text-emas tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="inline-flex items-center gap-2 text-sm text-abu">
              <span className={`size-2.5 rounded-full ${SITE[item.site].dot}`} aria-hidden="true" />
              {SITE[item.site].name}
            </p>
            <h2 className="mt-1 font-display text-lg leading-snug font-normal tracking-[0.1em] text-perkamen uppercase sm:text-xl">
              {item.title}
            </h2>
          </div>
        </div>
        <SpeculationMeter level={item.speculation} />
      </header>

      <div className="p-5 sm:p-7">
        <p className="text-abu">{item.speculationReason}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <figure>
            <Frame label={`Arsip · ${a.year}`} tone="arsip">
              <Image src={a.src} alt={a.caption} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-contain" />
            </Frame>
            <figcaption className="mt-2 text-xs leading-relaxed text-abu-gelap">
              {a.caption} Foto: {a.author}
              {a.institution ? `, ${a.institution}` : ""}.{" "}
              {a.licenseUrl ? (
                <a href={a.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emas">
                  {a.license}
                </a>
              ) : (
                a.license
              )}
              ,{" "}
              <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emas">
                Wikimedia Commons
              </a>
              .
            </figcaption>
          </figure>

          <figure>
            <Frame label="Rekonstruksi AI" tone="ai">
              {ai ? (
                <Image
                  src={ai.src}
                  alt={`Ilustrasi AI, bukan foto: ${item.title}`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex min-h-full flex-col items-center justify-center bg-malam/70 px-5 pt-12 pb-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-dashed border-emas/70 text-emas">
                    <IkonPena className="size-5" />
                  </span>
                  <p className="mt-3 font-semibold text-emas-terang">Ilustrasi sedang disiapkan tim</p>
                  <p className="mt-1 max-w-xs text-sm text-abu">Sementara itu, minta KratonBot merekonstruksi suasananya dengan kata-kata.</p>
                  <Link href={`/chat?q=${encodeURIComponent(item.askBot)}`} className="tombol-emas mt-4 !min-h-0 !px-4 !py-2 text-center text-sm">
                    Coba rekonstruksi teks
                  </Link>
                </div>
              )}
            </Frame>
            <figcaption className="mt-2 text-xs leading-relaxed text-abu-gelap">
              {ai
                ? `Ilustrasi AI, bukan foto. Dibuat dengan ${ai.model} oleh ${ai.madeBy}, ${ai.date}.`
                : "Ilustrasi akan dibuat dari prompt di bawah, dengan foto arsip di sebelah kiri sebagai acuan."}
            </figcaption>
            <p className="mt-3 flex gap-2.5 border-l-2 border-emas bg-catatan px-3.5 py-2.5 text-sm leading-relaxed text-emas-terang">
              <IkonPerisai className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong className="font-semibold">Perkiraan, bukan kejadian sebenarnya.</strong> Ilustrasi ini dibayangkan AI dari
                foto arsip dan prompt, sehingga tidak 100% sama dengan bentuk, warna, atau suasana aslinya.
              </span>
            </p>
          </figure>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="border-l-2 border-pareanom/70 pl-4">
            <h3 className="text-sm font-normal tracking-[0.14em] uppercase">Yang tercatat di sumber</h3>
            <ul className="mt-3 space-y-2">
              {cards.map((c) => (
                <li key={c.id} className="flex flex-wrap items-baseline gap-2">
                  <LabelChip index={KATEGORI_INDEX[c.kategori]} />
                  <Link href={`/pustaka#${c.id}`} className="text-emas underline underline-offset-2 hover:text-perkamen">
                    {c.judul}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="border-l-2 border-dashed border-emas/60 pl-4">
            <h3 className="text-sm font-normal tracking-[0.14em] uppercase">Yang harus dibayangkan AI</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-abu">
              {item.imagined.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <details className="group mt-6 border border-garis bg-malam/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-emas hover:text-perkamen [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <IkonLontar className="size-4" />
              Prompt untuk membuat ilustrasinya
            </span>
            <span className="transition-transform group-open:rotate-180" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="border-t border-garis px-4 py-4">
            <p className="leading-relaxed">{item.prompt}</p>
            <div className="mt-3">
              <CopyButton text={item.prompt} />
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function GaleriPage() {
  return (
    <div className="batik overflow-hidden bg-malam-2 px-4 py-24 sm:px-8">
      <Reveal>
        <SectionTitle panel
          as="h1"
          script="Antara bukti dan bayangan"
          title="Rekonstruksi AI vs arsip"
          intro="Gambar masa lalu buatan AI sebagian besar berisi rekaan, karena AI mengisi bagian yang tidak tercatat di sumber. Galeri ini memasangkan setiap rekonstruksi dengan bukti aslinya, supaya kamu bisa melihat sendiri mana yang tercatat dan mana yang dibayangkan."
        />
      </Reveal>

      <div className="mx-auto mt-14 max-w-5xl">
        <section className="border border-garis bg-permukaan/90 p-5 sm:p-7">
          <h2 className="text-center text-sm font-normal tracking-[0.14em] uppercase">Aturan rekonstruksi di galeri ini</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {RULES.map((r) => (
              <li key={r.text} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emas/50 text-emas">{r.icon}</span>
                <span className="leading-relaxed text-abu">{r.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Daftar rekonstruksi" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex flex-col gap-2 border border-garis bg-permukaan/80 p-4 transition-colors hover:border-emas"
            >
              <span className="font-display text-xl text-emas tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-snug text-perkamen">{item.title}</span>
              <SpeculationMeter level={item.speculation} />
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-14">
          {GALLERY.map((item, i) => (
            <Reveal key={item.id}>
              <GalleryEntry item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
