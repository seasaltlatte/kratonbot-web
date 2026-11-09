import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  IkonCari,
  IkonGembok,
  IkonKalender,
  IkonLontar,
  IkonPena,
  IkonPerisai,
  IkonTanya,
  IkonTeknologi,
} from "@/components/Icons";
import { LabelChip } from "@/components/LabelLegend";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { getCards, type Kategori } from "@/lib/cards";
import { KATEGORI_INDEX } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Tentang AI ini | KratonBot",
};

const SOURCES = [
  "Situs resmi Mangkunegaran",
  "Visit Jawa Tengah (Disporapar Jawa Tengah)",
  "Indonesia Travel (Kemenparekraf)",
  "Wikipedia bahasa Indonesia dan Inggris",
  "Jurnal Humaniora UGM dan Jurnal Sosial Budaya UIN Suska",
  "Media: IDN Times, detikJateng, NU Online, The Jakarta Post, Tribun Travel, Good News From Indonesia",
  "Analisis tim untuk kaitan dengan nilai Pancasila (ditandai sebagai tafsir)",
];

const BATASAN = [
  "AI bisa keliru, termasuk salah memberi tanda. Selalu periksa sumber yang disebut.",
  "Pengetahuannya terbatas pada kartu di Pustaka. Pertanyaan di luar itu dijawab “belum ada data”, bukan ditebak.",
  "Mode rekonstruksi (“bayangkan suasana…”) adalah cerita imajinatif. Bagian yang berdasar sumber diberi tanda fakta tercatat, sisanya rekaan.",
  "Info praktis seperti jam buka dan harga tiket bisa berubah. Cek ulang ke pengelola sebelum berangkat.",
  "KratonBot bukan perwakilan resmi Keraton Kasunanan maupun Pura Mangkunegaran, dan tidak menggantikan pemandu atau abdi dalem.",
];

const DATA = [
  "Riwayat percakapan disimpan di browser-mu sendiri, lalu dikirim bersama setiap pertanyaan. Server KratonBot tidak menyimpannya.",
  "Email hanya diminta saat membuat jadwal, dan hanya dipakai untuk mengirim undangan kalender.",
  "Laporan “jawaban keliru” dikirim ke tim berisi pertanyaan, jawaban, dan catatanmu.",
  "Jangan menulis data pribadi lain seperti nomor identitas atau alamat rumah.",
];

function Panel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="relative border border-garis bg-permukaan p-6 sm:p-7">
      <span className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-emas" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-emas/50 text-emas">{icon}</span>
        <h2 className="text-lg font-normal tracking-[0.14em] uppercase">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function TentangAI() {
  const cards = getCards();
  const count = (k: Kategori) => cards.filter((c) => c.kategori === k).length;
  const STEPS = [
    { icon: <IkonTanya />, title: "Kamu bertanya", text: "Ketik pertanyaan tentang sejarah, tradisi, atau rencana kunjungan." },
    {
      icon: <IkonCari />,
      title: "Mencari di Pustaka",
      text: `KratonBot mencari kartu yang relevan di antara ${cards.length} kartu pengetahuan yang ditulis tim.`,
    },
    {
      icon: <IkonPena />,
      title: "Menyusun jawaban",
      text: "Gemini menyusun jawaban hanya dari kartu yang ditemukan, memberi tanda, dan menuliskan sumbernya.",
    },
    {
      icon: <IkonKalender />,
      title: "Jadwal bila diminta",
      text: "Untuk kunjungan, KratonBot merangkum datamu dan menunggu jawaban “ya” sebelum membuat undangan.",
    },
  ];
  const kategori = Object.keys(KATEGORI_INDEX) as Kategori[];

  return (
    <article className="cahaya-emas px-4 py-24 sm:px-6">
      <SectionTitle
        as="h1"
        script="Di balik layar"
        title="Tentang AI ini"
        intro="KratonBot adalah chatbot AI buatan mahasiswa untuk tugas Pendidikan Pancasila, tema AI dan rekonstruksi heritage. Halaman ini menjelaskan apa yang ia lakukan, dari mana pengetahuannya, dan di mana ia bisa salah."
      />

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-lg font-normal tracking-[0.14em] uppercase">Cara KratonBot menjawab</h2>
        <ol className="relative mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <span className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-emas/40 lg:block" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120} className="h-full">
              <div className="relative flex h-full flex-col items-center border border-garis bg-permukaan p-6 text-center">
                <span className="relative flex size-16 items-center justify-center rounded-full border border-emas bg-malam text-emas">
                  {s.icon}
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emas text-xs font-semibold text-malam">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 text-base font-normal tracking-[0.12em] uppercase">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-abu">{s.text}</p>
              </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <h2 className="mt-20 text-center text-lg font-normal tracking-[0.14em] uppercase">Isi Pustaka saat ini</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="col-span-2 flex flex-col items-center justify-center border border-emas/40 bg-permukaan p-5 text-center sm:col-span-1">
            <p className="font-display text-4xl text-emas tabular-nums">{cards.length}</p>
            <p className="mt-1 text-sm text-abu">kartu pengetahuan</p>
          </div>
          {kategori.map((k) => (
            <div key={k} className="flex flex-col items-center justify-center border border-garis bg-permukaan p-5 text-center">
              <p className="font-display text-3xl text-perkamen tabular-nums">{count(k)}</p>
              <p className="mt-2">
                <LabelChip index={KATEGORI_INDEX[k]} />
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center">
          <Link href="/pustaka" className="tombol-garis">
            Buka Pustaka
          </Link>
        </p>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <Panel icon={<IkonLontar className="size-5" />} title="Sumber pengetahuan">
            <ul className="space-y-2 text-abu">
              {SOURCES.map((s) => (
                <li key={s} className="flex gap-2">
                  <IkonLontar className="mt-1 size-4 shrink-0 text-emas" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel icon={<IkonPerisai className="size-5" />} title="Batasannya">
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-abu">
              {BATASAN.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Panel>
          <Panel icon={<IkonGembok className="size-5" />} title="Data yang kamu kirim">
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-abu">
              {DATA.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Panel>
          <Panel icon={<IkonTeknologi className="size-5" />} title="Teknologi">
            <p className="leading-relaxed text-abu">
              Google Gemini (model bahasa), pencarian kata kunci (BM25) atas kartu pengetahuan, Composio (Google
              Calendar), dan Next.js di Vercel. Alur agennya dirancang dan diuji lebih dulu di Langflow, lalu dipindahkan
              ke kode agar bisa berjalan tanpa server terpisah.
            </p>
          </Panel>
        </div>

        <p className="mt-14 text-center">
          <Link href="/pedoman" className="tombol-emas">
            Baca pedoman penggunaan AI
          </Link>
        </p>
      </div>
    </article>
  );
}
