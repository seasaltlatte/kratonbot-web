import Image from "next/image";
import Link from "next/link";
import { HeroCursor } from "@/components/HeroCursor";
import { IkonGaleri, IkonKalender, IkonLinimasa, IkonLontar, IkonPeta } from "@/components/Icons";
import { LabelChip, TandaIkon } from "@/components/LabelLegend";
import { Reveal } from "@/components/Reveal";
import { ScrollSpine } from "@/components/ScrollSpine";
import { SectionTitle } from "@/components/SectionTitle";
import { SiteHeader } from "@/components/SiteHeader";
import { getCards } from "@/lib/cards";
import { GALLERY } from "@/lib/gallery";
import { TIMELINE } from "@/lib/timeline";

const chatLink = (q: string) => `/chat?q=${encodeURIComponent(q)}`;

// Foto hero: pendapa Pura Mangkunegaran sekitar 1880 (James Page, KITLV, domain publik).
const HERO = {
  src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg/3840px-Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg",
  credit: "Foto: pendapa Pura Mangkunegaran, sekitar 1880. James Page, KITLV. Domain publik.",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Pendopo_of_the_Palace_of_the_Mangkoenagoro_of_Surakarta_WDL2898.jpg",
};

const photo = (id: string) => GALLERY.find((g) => g.id === id)!.archive;
const KUNJUNGAN = photo("kasunanan-1890");
const gmaps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const SITES = [
  {
    year: "1755",
    event: "Perjanjian Giyanti",
    name: "Keraton Kasunanan Surakarta Hadiningrat",
    script: "Kasunanan",
    photo: photo("kasunanan-1890"),
    fact: "Perjanjian Giyanti tahun 1755 membagi wilayah Mataram menjadi dua: Kasunanan Surakarta dan Kesultanan Yogyakarta.",
    source: "Sumber: Wikipedia bahasa Indonesia, “Keraton Surakarta Hadiningrat”. Foto: fotografer tidak diketahui, 1890.",
    maps: gmaps("Keraton Kasunanan Surakarta Hadiningrat, Baluwarti, Surakarta"),
  },
  {
    year: "1757",
    event: "Perjanjian Salatiga",
    name: "Pura Mangkunegaran",
    script: "Mangkunegaran",
    photo: photo("pendhapa-mangkunegaran"),
    fact: "Perjanjian Salatiga, 17 Maret 1757, melahirkan Praja Mangkunegaran. Raden Mas Said menjadi Mangkunegara I.",
    source: "Sumber: Situs resmi Mangkunegaran, “Sejarah Singkat Mangkunegaran”. Foto: James Page, sekitar 1880.",
    maps: gmaps("Pura Mangkunegaran, Keprabon, Surakarta"),
  },
];

// Butiran emas di hero: [posisi kiri %, ukuran px, durasi s, jeda s].
const DUST: [number, number, number, number][] = [
  [6, 3, 14, -2], [13, 2, 18, -9], [21, 4, 16, -5], [28, 2, 20, -12], [35, 3, 15, -1],
  [42, 2, 19, -7], [49, 4, 17, -14], [56, 2, 21, -3], [63, 3, 16, -10], [70, 2, 18, -6],
  [77, 4, 15, -13], [84, 2, 20, -4], [91, 3, 17, -8], [97, 2, 22, -11], [17, 2, 23, -16], [66, 3, 24, -18],
];

const TEASER_YEARS = ["1744–1745", "1755", "1757", "2022"];

const CLAIM_MARKS = [
  {
    name: "FAKTA TERCATAT",
    jenis: "fakta" as const,
    desc: "Tertulis di sumber yang sudah diperiksa tim.",
  },
  {
    name: "TAFSIR",
    jenis: "tafsir" as const,
    desc: "Pendapat atau interpretasi, bukan kepastian.",
  },
  {
    name: "LEGENDA",
    jenis: "legenda" as const,
    desc: "Kisah yang dipercaya dan dituturkan turun-temurun.",
  },
  {
    name: "INFO PRAKTIS",
    jenis: "praktis" as const,
    desc: "Jam buka, tiket, aturan. Bisa berubah, cek ulang.",
  },
  {
    name: "BELUM ADA DATA",
    jenis: "kosong" as const,
    desc: "Bot tidak menemukannya di sumber, jadi tidak menebak.",
  },
];

export default function Home() {
  const cards = getCards();
  const teaser = TIMELINE.filter((e) => TEASER_YEARS.includes(e.year));
  const EXPLORE = [
    {
      href: "/linimasa",
      big: `${TIMELINE[0].year.slice(0, 4)}–${TIMELINE[TIMELINE.length - 1].year}`,
      Icon: IkonLinimasa,
      title: "Linimasa",
      text: "Dari Kotagede sampai Mangkunegara X.",
    },
    {
      href: "/pustaka",
      big: `${cards.length}`,
      Icon: IkonLontar,
      title: "Pengetahuan",
      text: "Semua yang diketahui Kerajaan Mataram Islam Bot, lengkap dengan sumber.",
    },
    {
      href: "/galeri",
      big: `${GALLERY.length}`,
      Icon: IkonGaleri,
      title: "Rekonstruksi AI vs arsip",
      text: "Foto arsip di samping bayangan AI.",
    },
  ];

  return (
    <>
      {/* Wrapper Bersatu: Hero Canvas Card & Linimasa berbagi satu latar batik yang menyatu tanpa putus */}
      <div className="batik bg-malam-2">
        <div className="p-2 sm:p-3 md:p-4 lg:p-5">
          <section
            data-theme="dark"
            className="relative isolate flex min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-1.5rem)] md:min-h-[calc(100svh-2rem)] flex-col justify-between overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] border border-teks/15 bg-malam shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            {/* Foto Latar & Debu Emas */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <Image src={HERO.src} alt="" fill priority unoptimized sizes="100vw" className="lukisan hero-bg object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-malam/80 via-malam/20 to-malam/95" />
              <div className="absolute inset-0" aria-hidden="true">
                {DUST.map((d, i) => (
                  <span
                    key={i}
                    className="debu"
                    style={{ left: `${d[0]}%`, width: d[1], height: d[1], animationDuration: `${d[2]}s`, animationDelay: `${d[3]}s` }}
                  />
                ))}
              </div>
              <HeroCursor />
            </div>

            {/* Top Bar Navigation di dalam kartu Hero */}
            <SiteHeader inHero />

            {/* Area Konten Hero */}
            <div className="hero-naik relative z-20 w-full px-6 pb-6 sm:px-10 sm:pb-8 md:px-12 md:pb-10">
              <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
                {/* Kolom Kiri: Judul Besar, Skrip, & Tombol CTA */}
                <div className="max-w-4xl text-left lg:mb-12">
                  <p className="kilau font-script text-3xl sm:text-4xl md:text-5xl">
                    Mengenal Lebih Dekat
                  </p>
                  <h1 className="mt-2 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.15] font-medium tracking-[0.06em] text-perkamen uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    Kerajaan Mataram Islam
                  </h1>
                  <p className="kilau mt-3 font-script text-2xl sm:text-3xl md:text-4xl [animation-delay:-3.5s]">
                    di Kota Surakarta
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-perkamen/90 italic drop-shadow-[0_1px_4px_rgba(0,0,0,1)] sm:text-lg">
                    Tanya sejarah Keraton Kasunanan dan Pura Mangkunegaran. Setiap jawaban menunjukkan sumbernya.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link href="/chat" className="tombol-emas group min-w-48">
                      Tanya Sejarah
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </Link>
                    <Link href="/linimasa" className="tombol-garis min-w-48 bg-malam/40 backdrop-blur-sm">
                      Lihat Linimasa
                    </Link>
                  </div>
                </div>

                {/* Kolom Kanan: Kredit Foto */}
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="flex flex-col items-start gap-1 text-xs text-abu-gelap lg:items-end lg:text-right">
                    <a
                      href={HERO.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-xs text-[11px] leading-tight hover:text-abu transition-colors"
                    >
                      {HERO.credit}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Linimasa singkat */}
        <section className="overflow-hidden px-4 pt-16 pb-28 sm:px-8 sm:pt-20">
          <SectionTitle
            panel
            script="Jejak Perjalanan"
            title="Linimasa"
            intro="Dari runtuhnya Kartasura sampai lahirnya Pura Mangkunegaran"
          />
          <ol className="relative mx-auto mt-20 max-w-4xl">
            <ScrollSpine />
            {teaser.map((e, i) => (
              <li
                key={e.year}
                className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
              >
                <Reveal from={i % 2 ? "kanan" : "kiri"}>
                  <article className="relative border border-garis bg-permukaan/95 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                    <span className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-emas" aria-hidden="true" />
                    <span className="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-emas" aria-hidden="true" />
                    <p className="font-display text-3xl text-emas tabular-nums">{e.year}</p>
                    <h3 className="mt-2 font-display text-xl font-normal tracking-[0.12em] uppercase">{e.title}</h3>
                    <p className="mt-3 leading-[1.8] text-abu">{e.summary}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center">
            <Link href="/linimasa" className="tombol-emas group min-w-64">
              Lihat linimasa lengkap
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </p>
        </section>
      </div>

      {/* Kerajaan Mataram Islam Bot: Lima Tanda (Inspo 1 - Kompatibel Mode Terang & Gelap) */}
      <section className="border-t border-garis px-4 py-24 sm:px-8 sm:py-28">
        <SectionTitle
          script="Lima Tanda di Setiap Jawaban"
          title="Tahu Mana yang Pasti"
          intro="AI mudah terdengar yakin walaupun sedang mengarang. Setiap kalimat diberi tanda agar kamu bisa memilah sumber dari dugaan."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:items-center">
          {/* Kartu Contoh Jawaban (Aman keterbacaan di tema terang & gelap) */}
          <div className="rounded-2xl border border-garis bg-permukaan p-6 shadow-sm sm:p-7 terang:border-[#e8dfd2] terang:bg-white">
            {/* Header Kartu */}
            <div className="flex items-center gap-2 border-b border-garis pb-4 text-xs font-display tracking-[0.2em] text-abu uppercase terang:border-[#eee7dc] terang:text-[#7d7164]">
              <TandaIkon jenis="fakta" className="tanda-fakta" />
              <span>Contoh Jawaban</span>
            </div>

            {/* Bubble Pertanyaan Pengguna */}
            <div className="mt-6 flex justify-end">
              <Link
                href="/chat?q=Apa%20itu%20Perjanjian%20Salatiga%3F"
                className="rounded-lg bg-emas px-4 py-2.5 text-sm font-medium text-malam transition-opacity hover:opacity-90 sm:text-base terang:bg-[#8a6036] terang:text-white"
              >
                Kapan Perjanjian Salatiga disepakati?
              </Link>
            </div>

            {/* Jawaban Bot */}
            <div className="mt-4 rounded-xl border border-garis/80 bg-catatan/40 p-5 sm:p-6 terang:border-[#e8dfd2] terang:bg-[#f4eee4]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-script text-2xl text-emas sm:text-3xl terang:text-[#8a6036]">
                  Kerajaan Mataram Islam Bot
                </p>
                <span className="text-lg">
                  <LabelChip index={0} />
                </span>
              </div>

              <p className="mt-4 font-arsip text-base leading-relaxed text-perkamen sm:text-lg terang:text-[#2b221a]">
                Perjanjian Salatiga disepakati pada 17 Maret 1757. Perjanjian ini melahirkan Praja Mangkunegaran dan
                menetapkan Raden Mas Said sebagai Mangkunegara I.
              </p>

              <div className="my-4 border-b border-garis terang:border-[#e2d8c9]" />

              <p className="font-arsip text-xs text-abu sm:text-sm terang:text-[#827567]">
                Sumber: Situs resmi Mangkunegaran, “Sejarah Singkat Mangkunegaran”
              </p>
            </div>
          </div>

          {/* Daftar 5 Tanda */}
          <div className="space-y-6 sm:space-y-7">
            {CLAIM_MARKS.map((mark, i) => (
              <div
                key={mark.name}
                className={i < CLAIM_MARKS.length - 1 ? "border-b border-garis pb-5 terang:border-[#e5dcce]" : "pb-1"}
              >
                <div className="flex items-center gap-2.5">
                  <TandaIkon jenis={mark.jenis} className={`tanda-${mark.jenis} size-3.5`} />
                  <h3 className="font-display text-xs font-medium tracking-[0.2em] text-perkamen uppercase sm:text-sm terang:text-[#2a1d14]">
                    {mark.name}
                  </h3>
                </div>
                <p className="mt-2 font-arsip text-base text-abu sm:text-lg leading-relaxed terang:text-[#6f6254]">
                  {mark.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dua Istana: Dua Kerajaan, Satu Sejarah (Inspo 2 - Desain Kubah Klasik & 2 Kolom) */}
      <section className="border-t border-garis bg-malam-2 px-4 py-24 sm:px-8 sm:py-28">
        <SectionTitle
          script="Dua Kerajaan, Satu Sejarah"
          title="Mataram Islam di Surakarta"
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-garis/60 terang:md:divide-[#dfd6c7]">
          {SITES.map((s, index) => (
            <article
              key={s.name}
              className={`flex flex-col ${index === 0 ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"}`}
            >
              {/* Header: Tahun & Nama Peristiwa */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl sm:text-6xl text-emas tabular-nums terang:text-[#8a6036]">
                  {s.year}
                </span>
                <span className="font-display text-xs sm:text-sm tracking-[0.22em] text-abu uppercase terang:text-[#7d7164]">
                  {s.event}
                </span>
              </div>

              {/* Foto Berbingkai Kubah / Arch Klasik */}
              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-t-[6rem] sm:rounded-t-[8rem] md:rounded-t-[10rem] lg:rounded-t-[12rem] rounded-b-none border border-garis/40 shadow-sm terang:border-[#e5dcce]">
                <Image
                  src={s.photo.src}
                  alt={s.photo.caption}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="lukisan object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Teks Konten */}
              <div className="flex flex-1 flex-col pt-6 sm:pt-7">
                <p className="font-script text-3xl sm:text-4xl text-emas terang:text-[#8a6036]">
                  {s.script}
                </p>
                <h3 className="mt-2 font-display text-lg sm:text-xl font-normal tracking-[0.14em] text-perkamen uppercase leading-snug terang:text-[#2a1d14]">
                  {s.name}
                </h3>

                <div className="mt-4">
                  <span className="text-lg">
                  <LabelChip index={0} />
                </span>
                </div>

                <p className="mt-4 font-arsip text-base sm:text-lg leading-relaxed text-perkamen terang:text-[#2a1d14]">
                  {s.fact}
                </p>

                <p className="mt-4 font-arsip text-xs sm:text-sm text-abu terang:text-[#827567] leading-normal pb-7">
                  {s.source}
                </p>

                <a
                  href={s.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tombol-emas group mt-auto w-full gap-2.5 sm:w-auto sm:self-start"
                >
                  <IkonPeta className="size-5" />
                  Lihat lokasi di Google Maps
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Jelajahi */}
      <section className="batik border-t border-garis bg-malam-2 px-4 py-28 sm:px-8">
        <SectionTitle panel script="Cari Tahu Lebih Banyak" title="Jelajahi" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
          {EXPLORE.map((x, i) => (
            <Reveal key={x.href} delay={i * 120}>
              <Link
                href={x.href}
                className="group relative flex h-full flex-col items-center border border-garis bg-permukaan p-8 text-center transition-colors hover:border-emas/60 terang:bg-white"
              >
                <span className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-emas" aria-hidden="true" />
                <span className="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-emas" aria-hidden="true" />
                <span className="flex size-14 items-center justify-center rounded-full border border-emas/50 text-emas transition-colors group-hover:bg-emas group-hover:text-malam">
                  <x.Icon className="size-6" />
                </span>
                <p className="mt-5 font-display text-3xl text-emas tabular-nums">{x.big}</p>
                <h3 className="mt-2 font-display text-base font-normal tracking-[0.14em] uppercase">{x.title}</h3>
                <p className="mt-2 leading-relaxed text-abu">{x.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Berkunjung: selalu gelap karena teksnya di atas foto. */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-malam px-4 py-32 text-center sm:px-8">
        <div className="absolute inset-0 -z-10">
          <Image src={KUNJUNGAN.src} alt="" fill unoptimized sizes="100vw" className="lukisan object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-malam via-malam/60 to-malam" />
        </div>
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-emas/60 text-emas" aria-hidden="true">
          <IkonKalender className="size-6" />
        </span>
        <p className="mt-5 font-script text-3xl text-emas sm:text-4xl">Mau berkunjung langsung?</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-[1.8] text-teks">
          Sebutkan tanggal, jam, dan jumlah orang. Undangan masuk ke Google Calendar-mu setelah kamu menekan{" "}
          <span className="text-perkamen">Buat jadwal</span>. Ini pengingat pribadi, bukan tiket resmi.
        </p>
        <p className="mt-10">
          <Link href={chatLink("Aku mau merencanakan kunjungan")} className="tombol-emas">
            Rencanakan kunjungan
          </Link>
        </p>
        <p className="absolute right-4 bottom-3 max-w-[16rem] text-right text-[10px] leading-snug text-abu-gelap/80 sm:right-8 sm:bottom-5 sm:max-w-none">
          Foto latar: {KUNJUNGAN.caption} {KUNJUNGAN.author}, {KUNJUNGAN.year}. {KUNJUNGAN.license}.
        </p>
      </section>
    </>
  );
}
