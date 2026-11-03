import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedoman penggunaan AI untuk heritage | KratonBot",
};

// Draf pedoman (luaran kedua tema 7). Tim wajib meninjau dan menyesuaikan isinya.
const FOR_VISITORS = [
  "Perlakukan jawaban AI sebagai pintu masuk, bukan kata akhir. Buka sumber yang disebut untuk detail yang penting.",
  "Perhatikan tanda di setiap jawaban. Tafsir dan legenda bukan fakta tercatat.",
  "Cerita rekonstruksi adalah imajinasi. Jangan mengutipnya sebagai sejarah di tugas, media sosial, atau pemberitaan.",
  "Hormati keraton sebagai institusi budaya yang masih hidup. Untuk urusan internal, ritual, dan pusaka, rujuk sumber resmi.",
  "Jika menemukan jawaban keliru, laporkan lewat tombol di bawah jawaban.",
];

const FOR_BUILDERS = [
  "Setiap klaim harus bisa ditelusuri ke sumber. AI dilarang mengarang nama, tahun, angka, harga, dan sumber.",
  "Bedakan jenis pengetahuan (fakta, tafsir, legenda, info praktis) sejak data ditulis, bukan setelah AI menjawab.",
  "Jika sumber berbeda pendapat, tampilkan semua versi. Jangan memilih satu tanpa dasar.",
  "Rekonstruksi imajinatif wajib diberi label jelas dan dipisahkan dari bagian yang berdasar sumber.",
  "Gambar rekonstruksi AI dibuat dengan gaya yang jelas bukan foto, diberi tulisan “Ilustrasi AI” di gambarnya, dipasang di samping arsip asli, dan disertai model serta prompt yang dipakai.",
  "AI tidak boleh menyamar sebagai tokoh sejarah atau perwakilan resmi keraton.",
  "Tindakan nyata (seperti membuat jadwal) hanya dijalankan setelah pengguna mengonfirmasi ringkasannya.",
  "Minta data pribadi seminimal mungkin dan jelaskan untuk apa data itu dipakai.",
  "Sediakan jalur koreksi, dan tinjau data secara berkala bersama sumber yang kompeten.",
];

const PANCASILA = [
  {
    sila: "Sila kedua: Kemanusiaan yang adil dan beradab",
    text: "Jujur tentang batas pengetahuan AI dan menghormati keyakinan serta tradisi yang masih dijalankan.",
  },
  {
    sila: "Sila ketiga: Persatuan Indonesia",
    text: "Menjaga memori kolektif dan identitas budaya agar tidak terdistorsi oleh informasi rekaan.",
  },
  {
    sila: "Sila keempat: Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
    text: "Membuka sumber dan menyediakan jalur koreksi sehingga pengetahuan bisa diuji bersama.",
  },
  {
    sila: "Sila kelima: Keadilan sosial bagi seluruh rakyat Indonesia",
    text: "Memberi akses pengetahuan heritage yang setara, gratis, dan tanpa wajib daftar akun.",
  },
];

export default function Pedoman() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-sogan-tua">Pedoman penggunaan AI untuk heritage</h1>
      <p className="mt-4 text-lg leading-relaxed text-tinta-pudar">
        AI bisa membuat sejarah terasa dekat, tapi juga bisa membuat cerita rekaan terdengar seperti fakta. Pedoman
        ini disusun agar teknologi seperti KratonBot dipakai secara transparan dan bertanggung jawab.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Untuk pengunjung</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
          {FOR_VISITORS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Untuk pembuat AI heritage</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
          {FOR_BUILDERS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-sogan-tua">Kaitannya dengan Pancasila</h2>
        <dl className="mt-4 space-y-5">
          {PANCASILA.map((p) => (
            <div key={p.sila} className="border-l-4 border-emas pl-4">
              <dt className="font-semibold">{p.sila}</dt>
              <dd className="mt-1 leading-relaxed text-tinta-pudar">{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-12">
        <Link href="/chat" className="font-semibold text-sogan underline underline-offset-4">
          Coba KratonBot
        </Link>
      </p>
    </article>
  );
}
