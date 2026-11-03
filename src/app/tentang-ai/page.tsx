import type { Metadata } from "next";
import Link from "next/link";
import { getCards, type Kategori } from "@/lib/cards";

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

export default function TentangAI() {
  const cards = getCards();
  const count = (k: Kategori) => cards.filter((c) => c.kategori === k).length;
  const STEPS = [
    "Kamu mengirim pertanyaan.",
    `KratonBot mencari potongan yang relevan di ${cards.length} kartu pengetahuan yang ditulis tim. Setiap kartu mencatat sumber dan jenisnya: fakta, tafsir, legenda, atau info praktis.`,
    "Model bahasa Gemini menyusun jawaban hanya dari kartu yang ditemukan, memberi tanda sesuai jenis kartu, dan menuliskan sumbernya.",
    "Untuk jadwal kunjungan, KratonBot merangkum datamu dan menunggu konfirmasi sebelum membuat undangan Google Calendar.",
  ];
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-sogan-tua">Tentang AI ini</h1>
      <p className="mt-4 text-lg leading-relaxed text-tinta-pudar">
        KratonBot adalah chatbot AI buatan mahasiswa untuk tugas Pendidikan Pancasila, tema AI dan rekonstruksi
        heritage. Halaman ini menjelaskan apa yang ia lakukan, dari mana pengetahuannya, dan di mana ia bisa salah.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Cara KratonBot menjawab</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed">
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Sumber pengetahuannya</h2>
        <p className="mt-3 leading-relaxed">
          {cards.length} kartu pengetahuan tentang dua istana: {count("FAKTA")} fakta, {count("TAFSIR")} tafsir,{" "}
          {count("LEGENDA")} legenda, dan {count("INFO PRAKTIS")} info praktis. Semuanya bisa dibaca di halaman{" "}
          <Link href="/jelajah" className="font-semibold text-sogan underline underline-offset-4">
            kartu pengetahuan
          </Link>
          . Sumbernya antara lain:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-tinta-pudar">
          {SOURCES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Batasannya</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>AI bisa keliru, termasuk salah memberi tanda. Selalu periksa sumber yang disebut.</li>
          <li>
            Pengetahuannya terbatas pada kartu-kartu itu. Pertanyaan di luar itu akan dijawab &ldquo;belum ada data&rdquo;,
            bukan ditebak.
          </li>
          <li>
            Mode rekonstruksi (&ldquo;bayangkan suasana&hellip;&rdquo;) adalah cerita imajinatif. Bagian yang
            berdasar sumber ditandai 🟢, sisanya rekaan.
          </li>
          <li>Info praktis seperti jam buka dan harga tiket bisa berubah. Cek ulang ke pengelola sebelum berangkat.</li>
          <li>
            KratonBot bukan perwakilan resmi Keraton Kasunanan maupun Pura Mangkunegaran, dan tidak menggantikan
            pemandu atau abdi dalem.
          </li>
          <li>Jadwal kunjungan yang dibuatnya adalah pengingat di kalender, bukan tiket atau reservasi resmi.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Data yang kamu kirim</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>Isi percakapan disimpan di server tim agar KratonBot ingat konteks obrolan.</li>
          <li>Email hanya diminta saat membuat jadwal, dan hanya dipakai untuk mengirim undangan kalender.</li>
          <li>Laporan &ldquo;jawaban keliru&rdquo; dikirim ke tim berisi pertanyaan, jawaban, dan catatanmu.</li>
          <li>Jangan menulis data pribadi lain seperti nomor identitas atau alamat rumah.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Teknologi</h2>
        <p className="mt-3 leading-relaxed text-tinta-pudar">
          Langflow (alur agen AI), Google Gemini (model bahasa dan embedding), DataStax Astra DB (pencarian kartu
          pengetahuan), Composio (Google Calendar), dan Next.js (situs ini).
        </p>
      </section>

      <p className="mt-12">
        <Link href="/pedoman" className="font-semibold text-sogan underline underline-offset-4">
          Baca pedoman penggunaan AI untuk heritage
        </Link>
      </p>
    </article>
  );
}
