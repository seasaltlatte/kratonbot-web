import Image from "next/image";
import Link from "next/link";
import { HeroCursor } from "@/components/HeroCursor";
import { IkonGaleri, IkonKalender, IkonLinimasa, IkonLontar } from "@/components/Icons";
import { LabelChip, LabelLegend } from "@/components/LabelLegend";
import { Reveal } from "@/components/Reveal";
import { ScrollSpine } from "@/components/ScrollSpine";
import { SectionTitle } from "@/components/SectionTitle";
import { SourceList } from "@/components/SourceList";
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

const SITES = [
  {
    name: "Keraton Kasunanan Surakarta Hadiningrat",
    script: "Kasunanan",
    photo: photo("kasunanan-1890"),
    border: "border-t-kasunanan",
    fact: "Perjanjian Giyanti tahun 1755 membagi wilayah Mataram menjadi dua: Kasunanan Surakarta dan Kesultanan Yogyakarta.",
    source: "Wikipedia bahasa Indonesia, “Keraton Surakarta Hadiningrat”",
    questions: [
      "Bagaimana sejarah berdirinya Keraton Surakarta?",
      "Apa saja yang bisa dilihat di Museum Keraton Surakarta?",
    ],
  },
  {
    name: "Pura Mangkunegaran",
    script: "Mangkunegaran",
    photo: photo("pendhapa-mangkunegaran"),
    border: "border-t-pareanom",
    fact: "Perjanjian Salatiga, 17 Maret 1757, melahirkan Praja Mangkunegaran. Raden Mas Said menjadi Mangkunegara I.",
    source: "Situs resmi Mangkunegaran, “Sejarah Singkat Mangkunegaran”",
    questions: ["Siapa Raden Mas Said?", "Bagaimana cara berkunjung ke Pura Mangkunegaran?"],
  },
];

// Butiran emas di hero: [posisi kiri %, ukuran px, durasi s, jeda s]. Nilai tetap agar tidak beda antara server dan browser.
const DUST: [number, number, number, number][] = [
  [6, 3, 14, -2], [13, 2, 18, -9], [21, 4, 16, -5], [28, 2, 20, -12], [35, 3, 15, -1],
  [42, 2, 19, -7], [49, 4, 17, -14], [56, 2, 21, -3], [63, 3, 16, -10], [70, 2, 18, -6],
  [77, 4, 15, -13], [84, 2, 20, -4], [91, 3, 17, -8], [97, 2, 22, -11], [17, 2, 23, -16], [66, 3, 24, -18],
];

const TEASER_YEARS = ["1586", "1755", "1757", "2022"];

export default function Home() {
  const cards = getCards();
  const teaser = TIMELINE.filter((e) => TEASER_YEARS.includes(e.year));
  const EXPLORE = [
    { href: "/linimasa", big: `${TIMELINE[0].year.slice(0, 4)}–${TIMELINE[TIMELINE.length - 1].year}`, Icon: IkonLinimasa, title: "Linimasa", text: "Dari Kotagede sampai Mangkunegara X." },
    { href: "/pustaka", big: `${cards.length}`, Icon: IkonLontar, title: "Pustaka", text: "Semua yang diketahui KratonBot, lengkap dengan sumber." },
    { href: "/galeri", big: `${GALLERY.length}`, Icon: IkonGaleri, title: "Rekonstruksi AI vs arsip", text: "Foto arsip di samping bayangan AI." },
  ];

  return (
    <>
      {/* Hero */}
      {/* Hero selalu gelap (data-theme="dark") karena tulisannya berada di atas foto. */}
      <section
        data-theme="dark"
        className="relative isolate flex min-h-[calc(100svh-var(--tinggi-header))] items-center justify-center overflow-hidden bg-malam"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="lukisan hero-bg object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-malam/85 via-malam/30 to-malam" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,9,8,0.8))]" />
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

        <div className="bingkai-napas pointer-events-none absolute inset-3 border border-teks/20 sm:inset-6 md:inset-8" aria-hidden="true">
          <span className="absolute -top-1.5 -left-1.5 size-3 border-t border-l border-teks/50" />
          <span className="absolute -top-1.5 -right-1.5 size-3 border-t border-r border-teks/50" />
          <span className="absolute -bottom-1.5 -left-1.5 size-3 border-b border-l border-teks/50" />
          <span className="absolute -right-1.5 -bottom-1.5 size-3 border-r border-b border-teks/50" />
        </div>

        <div className="hero-naik relative w-full max-w-5xl px-6 py-24 text-center">
          <p className="kilau font-script text-3xl sm:text-4xl">Mengenal Lebih Dekat</p>
          <h1 className="mt-2 font-display text-[clamp(2rem,7vw,5.5rem)] leading-[1.05] font-medium tracking-[0.1em] text-perkamen uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            <span className="block">Kerajaan</span>
            <span className="block">Mataram Islam</span>
          </h1>
          <p className="kilau mt-2 pb-2 font-script text-[clamp(2rem,5vw,3.75rem)] [animation-delay:-3.5s]">
            di Kota Surakarta
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-emas-redup italic">
            Tanya sejarah Keraton Kasunanan dan Pura Mangkunegaran. Setiap jawaban menunjukkan sumbernya.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/chat" className="tombol-emas group min-w-56">
              Tanya Sejarah
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/linimasa" className="tombol-garis min-w-56 bg-malam/40 backdrop-blur-sm">
              Lihat Linimasa
            </Link>
          </div>
        </div>

        <span className="petunjuk-gulir absolute bottom-16 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-perkamen/60 sm:block" aria-hidden="true" />

        <a
          href={HERO.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-6 bottom-5 left-6 text-center text-xs text-abu-gelap hover:text-abu sm:right-12 sm:bottom-12 sm:left-auto sm:text-right"
        >
          {HERO.credit}
        </a>
      </section>

      {/* Linimasa singkat */}
      <section className="batik overflow-hidden bg-malam-2 px-4 py-28 sm:px-8">
        <SectionTitle
          script="Jejak Perjalanan Kerajaan"
          title="Linimasa"
          intro="Dari berdirinya Mataram di Kotagede, terbaginya Mataram, sampai hari ini."
        />
        <ol className="relative mx-auto mt-20 max-w-4xl">
          <ScrollSpine />
          {teaser.map((e, i) => (
            <li
              key={e.year}
              className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
            >
              <Reveal from={i % 2 ? "kanan" : "kiri"}>
                <article className="relative border border-garis bg-permukaan/90 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                  <span className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-emas" aria-hidden="true" />
                  <span className="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-emas" aria-hidden="true" />
                  <p className="font-display text-3xl text-emas tabular-nums">{e.year}</p>
                  <h3 className="mt-2 font-display text-lg font-normal tracking-[0.12em] uppercase">{e.title}</h3>
                  <p className="mt-3 leading-[1.8] text-abu">{e.summary}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-center">
          <Link href="/linimasa" className="tombol-garis bg-malam-2/80">
            Lihat linimasa lengkap
          </Link>
        </p>
      </section>

      {/* KratonBot */}
      <section className="cahaya-emas border-t border-garis px-4 py-28 sm:px-8">
        <SectionTitle
          script="Bertanya kepada Sang Pendamping"
          title="KratonBot"
          intro="KratonBot menjawab dari kartu pengetahuan yang disusun tim, lalu menandai mana fakta tercatat, tafsir, dan legenda. Kalau datanya tidak ada, ia bilang belum tahu."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal from="kiri">
            <figure className="overflow-hidden border border-emas/30 bg-permukaan shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-3 border-b border-garis bg-malam/60 px-5 py-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-emas/60 font-jawa text-emas" aria-hidden="true">
                  ꦏ
                </span>
                <span className="font-script text-2xl text-emas">KratonBot</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-abu">
                  <span className="size-2 rounded-full bg-pareanom-terang" aria-hidden="true" />
                  Daring
                </span>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <p className="text-right">
                  <span className="inline-block border border-emas/40 bg-malam/40 px-4 py-2 text-sm text-perkamen">
                    Apa itu Perjanjian Salatiga?
                  </span>
                </p>
                <div>
                  <p className="leading-[1.8]">
                    <LabelChip index={0} /> Perjanjian Salatiga yang disepakati pada 17 Maret 1757 adalah perjanjian yang
                    melahirkan Praja Mangkunegaran dan menetapkan Raden Mas Said sebagai Mangkunegara I dengan
                    kedudukan Pangeran Miji.
                  </p>
                  <SourceList
                    className="mt-4"
                    sumber={[
                      { text: "Situs resmi Mangkunegaran, “Sejarah Singkat Mangkunegaran”" },
                      { text: "Wikipedia bahasa Indonesia, “Raden Mas Said”" },
                    ]}
                  />
                </div>
              </div>
              <figcaption className="border-t border-garis bg-malam/40 px-5 py-3 text-xs text-abu-gelap">
                Jawaban asli KratonBot saat diuji tim, 2 November 2026.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal from="kanan" delay={120}>
            <div className="border border-garis bg-permukaan/80 p-6 sm:p-7">
              <h3 className="font-display text-lg font-normal tracking-[0.16em] uppercase">Lima tanda di setiap jawaban</h3>
              <p className="mt-3 mb-6 leading-relaxed text-abu">
                AI mudah terdengar yakin walaupun sedang mengarang. Tanda ini membantumu memilah mana yang tercatat di
                sumber dan mana yang bukan.
              </p>
              <LabelLegend compact />
            </div>
            <Link href="/chat" className="tombol-emas mt-6 w-full">
              Mulai bertanya
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Dua istana */}
      <section className="batik border-t border-garis bg-malam-2 px-4 py-28 sm:px-8">
        <SectionTitle script="Dua istana, satu sejarah" title="Mataram di Surakarta" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {SITES.map((s, i) => (
            <Reveal key={s.name} from={i ? "kanan" : "kiri"}>
              <article className={`group flex h-full flex-col border border-t-4 border-teks/12 bg-permukaan shadow-[0_24px_60px_-36px_rgba(0,0,0,0.7)] ${s.border}`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.caption}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="lukisan object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="font-script text-2xl text-emas">{s.script}</p>
                  <h3 className="font-display text-lg leading-snug font-normal tracking-[0.12em] uppercase">{s.name}</h3>
                  <p className="mt-5 leading-[1.8] text-emas-redup">
                    <LabelChip index={0} /> {s.fact}
                  </p>
                  <p className="mt-3 flex gap-2 text-xs text-abu-gelap">
                    <IkonLontar className="size-4 shrink-0 text-emas" />
                    <span>
                      {s.source}. Foto: {s.photo.author}, {s.photo.year}, {s.photo.license}.
                    </span>
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-garis pt-5">
                    {s.questions.map((q) => (
                      <li key={q}>
                        <Link href={chatLink(q)} className="group/q inline-flex items-baseline gap-3 hover:text-perkamen">
                          <span className="text-emas transition-transform group-hover/q:translate-x-1" aria-hidden="true">
                            →
                          </span>
                          <span className="underline decoration-teks/25 underline-offset-4 group-hover/q:decoration-emas">{q}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Jelajahi */}
      <section className="cahaya-emas border-t border-garis px-4 py-28 sm:px-8">
        <SectionTitle script="Belajar tanpa harus bertanya" title="Jelajahi" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
          {EXPLORE.map((x, i) => (
            <Reveal key={x.href} delay={i * 120}>
              <Link
                href={x.href}
                className="group relative flex h-full flex-col items-center border border-garis bg-permukaan p-8 text-center transition-colors hover:border-emas/60"
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
          <Image src={KUNJUNGAN.src} alt="" fill sizes="100vw" className="lukisan object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-malam via-malam/60 to-malam" />
        </div>
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-emas/60 text-emas" aria-hidden="true">
          <IkonKalender className="size-6" />
        </span>
        <p className="mt-5 font-script text-3xl text-emas sm:text-4xl">Mau berkunjung langsung?</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-[1.8] text-teks">
          Sebutkan tanggal, jam, dan jumlah orang. KratonBot merangkumnya dulu, dan baru setelah kamu menekan{" "}
          <span className="text-perkamen">Buat jadwal</span>, undangan masuk ke Google Calendar-mu. Ini pengingat
          pribadi, bukan tiket resmi, jadi tetap cek tiket dan aturan berkunjung ke pengelola.
        </p>
        <p className="mt-10">
          <Link href={chatLink("Aku mau merencanakan kunjungan")} className="tombol-emas">
            Rencanakan kunjungan
          </Link>
        </p>
        <p className="mt-8 text-xs text-abu-gelap">
          Foto latar: {KUNJUNGAN.caption} {KUNJUNGAN.author}, {KUNJUNGAN.year}. {KUNJUNGAN.license}.
        </p>
      </section>
    </>
  );
}
