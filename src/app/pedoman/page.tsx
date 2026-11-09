import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SectionTitle } from "@/components/SectionTitle";

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

// Pedoman ditata seperti naskah piagam: satu lembar perkamen berbingkai ganda, tiap bagian diberi nomor bab
// (I, II, III) dan tiap butir diberi nomor pasal, supaya sub-bagian mudah dikenali.
function Bab({ nomor, script, judul, children }: { nomor: string; script: string; judul: string; children: ReactNode }) {
  return (
    <section className="relative pt-12 first:pt-0">
      <div className="flex items-end gap-5 border-b-2 border-emas/60 pb-4">
        <span className="font-display text-6xl leading-none text-emas sm:text-7xl" aria-hidden="true">
          {nomor}
        </span>
        <div className="pb-1">
          <p className="font-script text-2xl leading-none text-emas-redup">{script}</p>
          <h2 className="mt-2 font-display text-xl font-medium tracking-[0.14em] uppercase sm:text-2xl">{judul}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Pasal({ items }: { items: string[] }) {
  return (
    <ol className="mt-6 space-y-4">
      {items.map((t, i) => (
        <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 leading-[1.75]">
          <span className="pt-0.5 font-display text-lg leading-none text-emas tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="border-l border-garis pl-4 text-teks">{t}</span>
        </li>
      ))}
    </ol>
  );
}

const ANGKA_SILA: Record<string, string> = { pertama: "1", kedua: "2", ketiga: "3", keempat: "4", kelima: "5" };

export default function Pedoman() {
  return (
    <div className="batik overflow-hidden bg-malam-2">
      <div className="mx-auto w-full max-w-4xl px-4 pt-16 pb-24 sm:px-6">
        <SectionTitle
          panel
          as="h1"
          script="Agar AI tetap jujur"
          title="Pedoman penggunaan AI"
          intro="AI bisa membuat sejarah terasa dekat, tapi juga bisa membuat cerita rekaan terdengar seperti fakta. Pedoman ini disusun agar teknologi seperti KratonBot dipakai secara transparan dan bertanggung jawab."
        />

        {/* Lembar naskah: bingkai ganda dan ornamen sudut. */}
        <article className="relative mt-10 bg-permukaan p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
          <div className="relative border-2 border-double border-emas/60 px-5 py-10 sm:px-12 sm:py-14">
            {["top-2 left-2", "top-2 right-2 rotate-90", "bottom-2 right-2 rotate-180", "bottom-2 left-2 -rotate-90"].map((pos) => (
              <svg key={pos} className={`absolute size-6 text-emas ${pos}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M2 14V2h12" />
                <path d="M6 10V6h4" />
                <circle cx="2" cy="2" r="1.2" fill="currentColor" />
              </svg>
            ))}

            <Bab nomor="I" script="Bagi yang bertanya" judul="Untuk pengunjung">
              <Pasal items={FOR_VISITORS} />
            </Bab>

            <Bab nomor="II" script="Bagi yang membangun" judul="Untuk pembuat AI heritage">
              <Pasal items={FOR_BUILDERS} />
            </Bab>

            <Bab nomor="III" script="Nilai yang dijaga" judul="Kaitannya dengan Pancasila">
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {PANCASILA.map((p) => {
                  const [sila, nama] = p.sila.split(": ");
                  return (
                    <div key={p.sila} className="flex gap-4 bg-malam/50 p-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-emas font-display text-lg text-emas">
                        {ANGKA_SILA[sila.replace(/^Sila\s+/i, "").toLowerCase()] ?? "•"}
                      </span>
                      <div>
                        <dt className="font-display text-base leading-snug font-medium text-perkamen">{nama}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-abu">{p.text}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Bab>
          </div>
        </article>

        <p className="mt-12 text-center">
          <Link href="/chat" className="tombol-emas">
            Coba KratonBot
          </Link>
        </p>
      </div>
    </div>
  );
}
