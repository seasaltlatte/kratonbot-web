import Link from "next/link";
import { LabelChip, LabelLegend } from "@/components/LabelLegend";
import { getCards } from "@/lib/cards";
import { GALLERY } from "@/lib/gallery";
import { TIMELINE } from "@/lib/timeline";

const chatLink = (q: string) => `/chat?q=${encodeURIComponent(q)}`;

const SITES = [
  {
    name: "Keraton Kasunanan Surakarta Hadiningrat",
    tone: "border-kasunanan bg-kasunanan-muda/60",
    accent: "text-kasunanan",
    fact: "Perjanjian Giyanti tahun 1755 membagi wilayah Mataram menjadi dua: Kasunanan Surakarta dan Kesultanan Yogyakarta.",
    source: "Wikipedia bahasa Indonesia, “Keraton Surakarta Hadiningrat”",
    questions: [
      "Bagaimana sejarah berdirinya Keraton Surakarta?",
      "Apa saja yang bisa dilihat di Museum Keraton Surakarta?",
    ],
  },
  {
    name: "Pura Mangkunegaran",
    tone: "border-pareanom bg-pareanom-muda/60",
    accent: "text-pareanom",
    fact: "Perjanjian Salatiga, 17 Maret 1757, melahirkan Praja Mangkunegaran. Raden Mas Said menjadi Mangkunegara I.",
    source: "Situs resmi Mangkunegaran, “Sejarah Singkat Mangkunegaran”",
    questions: ["Siapa Raden Mas Said?", "Bagaimana cara berkunjung ke Pura Mangkunegaran?"],
  },
];

export default function Home() {
  const cards = getCards();
  const EXPLORE = [
    {
      href: "/linimasa",
      big: `${TIMELINE[0].year.slice(0, 4)}–${TIMELINE[TIMELINE.length - 1].year}`,
      title: "Linimasa dua istana",
      text: "Dari runtuhnya Kartasura sampai Mangkunegara X, dengan semua versi tahun yang berbeda antar sumber.",
    },
    {
      href: "/jelajah",
      big: `${cards.length} kartu`,
      title: "Kartu pengetahuan",
      text: "Semua yang diketahui KratonBot, bisa disaring per istana, jenis, dan tema, lengkap dengan sumber.",
    },
    {
      href: "/galeri",
      big: `${GALLERY.length} pasang`,
      title: "Rekonstruksi AI vs arsip",
      text: "Foto arsip berdampingan dengan rekonstruksi AI, lengkap dengan bagian mana yang dibayangkan.",
    },
    {
      href: "/kuis",
      big: "8 soal",
      title: "Fakta, tafsir, atau legenda?",
      text: "Uji kemampuanmu membedakan sejarah dari tafsir dan kisah yang dipercaya.",
    },
  ];
  return (
    <>
      <section className="border-b border-garis">
        <div className="motif h-10 sm:h-12" aria-hidden="true" />
        <div className="h-1 bg-emas" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-20">
          <div>
            <p
              className="font-jawa text-[clamp(3rem,9vw,6rem)] leading-[1.3] font-bold whitespace-nowrap pb-[0.3em] text-emas/40 select-none"
              aria-hidden="true"
            >
              ꦱꦸꦫꦏꦂꦠ
            </p>
            <p className="mt-2 text-sm text-tinta-pudar">Surakarta, ditulis dalam aksara Jawa.</p>
            <h1 className="mt-8 max-w-xl text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.1] font-extrabold tracking-tight text-sogan-tua">
              Tanya sejarah Keraton Surakarta dan Mangkunegaran, lengkap dengan sumbernya.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-pudar">
              KratonBot menjawab dari kartu pengetahuan yang disusun tim, lalu menandai mana fakta tercatat, tafsir,
              dan legenda. Kalau datanya tidak ada, ia bilang belum tahu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/chat"
                className="rounded-lg bg-sogan px-6 py-3 text-lg font-semibold text-white hover:bg-sogan-tua"
              >
                Mulai bertanya
              </Link>
              <Link href="/tentang-ai" className="font-semibold text-sogan underline underline-offset-4">
                Lihat cara kerjanya
              </Link>
            </div>
          </div>

          <figure className="rounded-2xl border border-garis bg-white p-5 shadow-[0_1px_0_var(--emas)] sm:p-6">
            <div className="flex justify-end">
              <p className="rounded-2xl rounded-br-sm bg-sogan px-4 py-2.5 text-white">Apa itu Perjanjian Salatiga?</p>
            </div>
            <div className="mt-5">
              <p className="mb-1 text-sm font-bold text-sogan">KratonBot</p>
              <p className="leading-relaxed">
                <LabelChip index={0} />{" "}
                Perjanjian Salatiga yang disepakati pada 17 Maret 1757 adalah perjanjian yang melahirkan Praja
                Mangkunegaran dan menetapkan Raden Mas Said sebagai Mangkunegara I dengan kedudukan Pangeran Miji.
              </p>
              <p className="mt-3 text-sm font-semibold">📚 Sumber:</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-tinta-pudar">
                <li>Situs resmi Mangkunegaran, &ldquo;Sejarah Singkat Mangkunegaran&rdquo;</li>
                <li>Wikipedia bahasa Indonesia, &ldquo;Raden Mas Said&rdquo;</li>
              </ul>
            </div>
            <figcaption className="mt-5 border-t border-garis pt-3 text-xs text-tinta-pudar">
              Jawaban asli KratonBot saat diuji tim, 2 November 2026.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-sogan-tua">Lima tanda di setiap jawaban</h2>
        <p className="mt-2 mb-8 max-w-2xl text-tinta-pudar">
          AI mudah terdengar yakin walaupun sedang mengarang. Tanda ini membantumu memilah mana yang tercatat di
          sumber dan mana yang bukan.
        </p>
        <LabelLegend />
      </section>

      <section className="border-t border-garis">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-sogan-tua">Belajar tanpa harus bertanya</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((x) => (
              <Link key={x.href} href={x.href} className="group block border-t-4 border-sogan-muda pt-4 hover:border-sogan">
                <p className="text-3xl font-extrabold text-sogan-tua tabular-nums">{x.big}</p>
                <h3 className="mt-2 text-lg font-bold group-hover:text-sogan">{x.title}</h3>
                <p className="mt-1 leading-relaxed text-tinta-pudar">{x.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-garis bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-sogan-tua">Dua istana dari satu sejarah Mataram</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SITES.map((s) => (
              <article key={s.name} className={`rounded-xl border-t-4 p-6 ${s.tone}`}>
                <h3 className={`text-xl font-bold ${s.accent}`}>{s.name}</h3>
                <p className="mt-4 leading-relaxed">
                  <LabelChip index={0} /> {s.fact}
                </p>
                <p className="mt-2 text-sm text-tinta-pudar">Sumber: {s.source}</p>
                <ul className="mt-5 space-y-2">
                  {s.questions.map((q) => (
                    <li key={q}>
                      <Link href={chatLink(q)} className={`font-semibold underline underline-offset-4 ${s.accent}`}>
                        {q}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-sogan-tua">Mau berkunjung langsung?</h2>
          <p className="mt-3 leading-relaxed text-tinta-pudar">
            Sebutkan tanggal, jam, dan jumlah orang. KratonBot merangkumnya dulu, dan baru setelah kamu menekan{" "}
            <strong className="text-tinta">Buat jadwal</strong>, undangan masuk ke Google Calendar-mu. Ini pengingat
            pribadi, bukan tiket resmi, jadi tetap cek tiket dan aturan berkunjung ke pengelola.
          </p>
          <Link
            href={chatLink("Aku mau merencanakan kunjungan")}
            className="mt-6 inline-block rounded-lg bg-pareanom px-5 py-2.5 font-semibold text-white hover:bg-[#245536]"
          >
            Rencanakan kunjungan
          </Link>
        </div>
      </section>
    </>
  );
}
