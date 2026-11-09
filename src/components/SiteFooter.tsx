import Link from "next/link";

// Identitas kelompok. Ganti isi IDENTITAS dengan data kelompok yang sebenarnya.
const IDENTITAS = {
  kelompok: "Kelompok 4",
  anggota: ["[Nama anggota 1]", "[Nama anggota 2]", "[Nama anggota 3]", "[Nama anggota 4]"],
  mataKuliah: "Pendidikan Pancasila",
  dosen: "[Nama dosen pengampu]",
  kelas: "[Kelas]",
};

const MENU = [
  { href: "/chat", label: "Tanya KratonBot" },
  { href: "/linimasa", label: "Linimasa" },
  { href: "/pustaka", label: "Pustaka" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang-ai", label: "Tentang AI ini" },
  { href: "/pedoman", label: "Pedoman" },
];

// Footer selalu gelap dan dibatasi pita motif, supaya terpisah jelas dari isi halaman.
export function SiteFooter() {
  return (
    <footer data-theme="dark" className="bg-[#070908] text-teks">
      <div className="pita-motif h-[18px] opacity-70" aria-hidden="true" />
      <div className="h-px bg-emas/50" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-baseline gap-3">
            <span className="font-jawa text-2xl text-emas" aria-hidden="true">
              ꦏꦿꦠꦺꦴꦤ꧀
            </span>
            <span className="font-display text-xl tracking-[0.18em] text-perkamen uppercase">KratonBot</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-abu">
            Pemandu AI untuk sejarah Keraton Kasunanan Surakarta dan Pura Mangkunegaran, yang selalu menunjukkan
            sumbernya.
          </p>
          <p className="mt-6 font-script text-3xl text-emas">Matur nuwun</p>
        </div>

        <div>
          <h2 className="text-sm font-normal tracking-[0.16em] text-perkamen uppercase">{IDENTITAS.kelompok}</h2>
          <ul className="mt-4 space-y-1.5 text-abu">
            {IDENTITAS.anggota.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <dl className="mt-5 space-y-1 text-sm text-abu-gelap">
            <div>
              <dt className="inline">Mata kuliah: </dt>
              <dd className="inline text-abu">{IDENTITAS.mataKuliah}</dd>
            </div>
            <div>
              <dt className="inline">Dosen: </dt>
              <dd className="inline text-abu">{IDENTITAS.dosen}</dd>
            </div>
            <div>
              <dt className="inline">Kelas: </dt>
              <dd className="inline text-abu">{IDENTITAS.kelas}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Menu footer">
          <h2 className="text-sm font-normal tracking-[0.16em] text-perkamen uppercase">Jelajahi</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-abu hover:text-emas">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-garis">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-abu-gelap sm:px-6">
          Tugas Pendidikan Pancasila, tema 7: AI dan rekonstruksi heritage. KratonBot adalah program AI dan bisa keliru.
        </p>
      </div>
    </footer>
  );
}
