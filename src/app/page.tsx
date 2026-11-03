import Image from "next/image";
import Link from "next/link";
import { LabelChip, LabelLegend } from "@/components/LabelLegend";
import { SectionTitle } from "@/components/SectionTitle";
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

const TEASER_YEARS = ["1744–1745", "1755", "1757", "2022"];

export default function Home() {
  const cards = getCards();
  const teaser = TIMELINE.filter((e) => TEASER_YEARS.includes(e.year));
  const EXPLORE = [
    { href: "/linimasa", big: `${TIMELINE[0].year.slice(0, 4)}–${TIMELINE[TIMELINE.length - 1].year}`, title: "Linimasa", text: "Dari runtuhnya Kartasura sampai Mangkunegara X." },
    { href: "/jelajah", big: `${cards.length}`, title: "Kartu pengetahuan", text: "Semua yang diketahui KratonBot, lengkap dengan sumber." },
    { href: "/galeri", big: `${GALLERY.length}`, title: "Rekonstruksi AI vs arsip", text: "Foto arsip di samping bayangan AI." },
    { href: "/kuis", big: "8", title: "Kuis", text: "Fakta, tafsir, atau legenda?" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="lukisan hero-bg object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-malam/85 via-malam/30 to-malam" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,9,8,0.8))]" />
        </div>

        <div className="pointer-events-none absolute inset-3 border border-teks/15 sm:inset-6 md:inset-8" aria-hidden="true">
          <span className="absolute -top-1.5 -left-1.5 size-3 border-t border-l border-teks/50" />
          <span className="absolute -top-1.5 -right-1.5 size-3 border-t border-r border-teks/50" />
          <span className="absolute -bottom-1.5 -left-1.5 size-3 border-b border-l border-teks/50" />
          <span className="absolute -right-1.5 -bottom-1.5 size-3 border-r border-b border-teks/50" />
        </div>

        <div className="hero-naik relative w-full max-w-5xl px-6 py-24 text-center">
          <p className="font-script text-3xl text-emas drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl">
            Mengenal Lebih Dekat
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,7vw,5.5rem)] leading-[1.05] font-medium tracking-[0.1em] text-perkamen uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            <span className="block">Kerajaan</span>
            <span className="block">Mataram Islam</span>
          </h1>
          <p className="mt-2 font-script text-[clamp(2rem,5vw,3.75rem)] text-emas drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            di Kota Surakarta
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-emas-redup italic">
            Tanya sejarah Keraton Kasunanan dan Pura Mangkunegaran. Setiap jawaban menunjukkan sumbernya.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-5 text-xs text-teks">
            <Link href="/chat" className="tautan-kurung py-2">
              [ Tanya Sejarah ]
            </Link>
            <Link href="/linimasa" className="tautan-kurung py-2">
              [ Lihat Linimasa ]
            </Link>
          </div>
        </div>

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
      <section className="bg-malam-2 px-4 py-28 sm:px-8">
        <SectionTitle
          script="Jejak Perjalanan Kerajaan"
          title="Linimasa"
          intro="Dari runtuhnya Kartasura sampai lahirnya Pura Mangkunegaran, dan terus sampai hari ini."
        />
        <ol className="relative mx-auto mt-20 max-w-4xl">
          <span className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-teks/15 md:block" aria-hidden="true" />
          {teaser.map((e, i) => (
            <li
              key={e.year}
              className={`relative mb-16 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
            >
              <span
                className={`absolute top-2 hidden size-2 rounded-full bg-emas md:block ${i % 2 ? "-left-1" : "-right-1"}`}
                aria-hidden="true"
              />
              <p className="text-sm tracking-[0.22em] text-abu">{e.year}</p>
              <h3 className="mt-2 font-display text-xl font-normal tracking-[0.12em] uppercase">{e.title}</h3>
              <p className="mt-3 leading-[1.8] text-abu">{e.summary}</p>
            </li>
          ))}
        </ol>
        <p className="text-center text-xs text-teks">
          <Link href="/linimasa" className="tautan-kurung py-2">
            [ Linimasa lengkap ]
          </Link>
        </p>
      </section>

      {/* KratonBot */}
      <section className="border-t border-garis px-4 py-28 sm:px-8">
        <SectionTitle
          script="Bertanya kepada Sang Pendamping"
          title="KratonBot"
          intro="KratonBot menjawab dari kartu pengetahuan yang disusun tim, lalu menandai mana fakta tercatat, tafsir, dan legenda. Kalau datanya tidak ada, ia bilang belum tahu."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <figure className="border border-teks/12 bg-permukaan p-6 sm:p-8">
            <p className="text-right">
              <span className="inline-block border border-emas/40 px-4 py-2 text-sm text-perkamen">
                Apa itu Perjanjian Salatiga?
              </span>
            </p>
            <p className="mt-6 font-script text-2xl text-emas">KratonBot</p>
            <p className="mt-2 leading-[1.8]">
              <LabelChip index={0} /> Perjanjian Salatiga yang disepakati pada 17 Maret 1757 adalah perjanjian yang
              melahirkan Praja Mangkunegaran dan menetapkan Raden Mas Said sebagai Mangkunegara I dengan kedudukan
              Pangeran Miji.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-abu">
              <li>📚 Situs resmi Mangkunegaran, &ldquo;Sejarah Singkat Mangkunegaran&rdquo;</li>
              <li>📚 Wikipedia bahasa Indonesia, &ldquo;Raden Mas Said&rdquo;</li>
            </ul>
            <figcaption className="mt-6 border-t border-garis pt-3 text-xs text-abu-gelap">
              Jawaban asli KratonBot saat diuji tim, 2 November 2026.
            </figcaption>
          </figure>

          <div>
            <h3 className="font-display text-lg font-normal tracking-[0.16em] uppercase">Lima tanda di setiap jawaban</h3>
            <p className="mt-3 mb-8 leading-relaxed text-abu">
              AI mudah terdengar yakin walaupun sedang mengarang. Tanda ini membantumu memilah mana yang tercatat di
              sumber dan mana yang bukan.
            </p>
            <LabelLegend compact />
            <p className="mt-10 text-xs text-teks">
              <Link href="/chat" className="tautan-kurung py-2">
                [ Mulai bertanya ]
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Dua istana */}
      <section className="border-t border-garis bg-malam-2 px-4 py-28 sm:px-8">
        <SectionTitle script="Dua istana, satu sejarah" title="Mataram di Surakarta" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {SITES.map((s) => (
            <article key={s.name} className={`flex flex-col border border-t-2 border-teks/12 bg-permukaan ${s.border}`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={s.photo.src} alt={s.photo.caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="lukisan object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-script text-2xl text-emas">{s.script}</p>
                <h3 className="font-display text-lg leading-snug font-normal tracking-[0.12em] uppercase">{s.name}</h3>
                <p className="mt-5 leading-[1.8] text-emas-redup">
                  <LabelChip index={0} /> {s.fact}
                </p>
                <p className="mt-2 text-xs text-abu-gelap">Sumber: {s.source}</p>
                <p className="mt-1 text-xs text-abu-gelap">
                  Foto: {s.photo.author}, {s.photo.year}. {s.photo.license}.
                </p>
                <ul className="mt-6 space-y-3 border-t border-garis pt-5">
                  {s.questions.map((q) => (
                    <li key={q}>
                      <Link href={chatLink(q)} className="group inline-flex items-baseline gap-3 hover:text-white">
                        <span className="text-emas transition-transform group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                        <span className="underline decoration-teks/25 underline-offset-4 group-hover:decoration-emas">{q}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Jelajahi */}
      <section className="border-t border-garis px-4 py-28 sm:px-8">
        <SectionTitle script="Belajar tanpa harus bertanya" title="Jelajahi" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-px border border-garis bg-garis sm:grid-cols-2 lg:grid-cols-4">
          {EXPLORE.map((x) => (
            <Link key={x.href} href={x.href} className="group block bg-malam p-7 text-center hover:bg-permukaan">
              <p className="font-display text-3xl text-emas tabular-nums">{x.big}</p>
              <h3 className="mt-3 font-display text-base font-normal tracking-[0.14em] uppercase group-hover:text-white">
                {x.title}
              </h3>
              <p className="mt-2 leading-relaxed text-abu">{x.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Berkunjung */}
      <section className="border-t border-garis bg-malam-2 px-4 py-28 text-center sm:px-8">
        <p className="font-script text-3xl text-emas sm:text-4xl">Mau berkunjung langsung?</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-[1.8] text-abu">
          Sebutkan tanggal, jam, dan jumlah orang. KratonBot merangkumnya dulu, dan baru setelah kamu menekan{" "}
          <span className="text-perkamen">Buat jadwal</span>, undangan masuk ke Google Calendar-mu. Ini pengingat
          pribadi, bukan tiket resmi, jadi tetap cek tiket dan aturan berkunjung ke pengelola.
        </p>
        <p className="mt-10 text-xs text-teks">
          <Link href={chatLink("Aku mau merencanakan kunjungan")} className="tautan-kurung py-2">
            [ Rencanakan kunjungan ]
          </Link>
        </p>
      </section>
    </>
  );
}
