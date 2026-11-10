import Link from "next/link";

const IDENTITAS = {
  kelompok: "Kelompok 4",
  anggota: [
    { nama: "M. Enno Ramadhan Al Firdaus", nim: "L0125024" },
    { nama: "Alice Restituta Cynthia Dewi", nim: "L0125032" },
    { nama: "Bintang Rizqika Ariyanto", nim: "L0125036" },
    { nama: "Muhammad Yoga Prakasa", nim: "L0125056" },
    { nama: "Syifa Kaila Putri", nim: "L0125068" },
  ],
};

const MENU = [
  { href: "/chat", label: "Tanya Sejarah" },
  { href: "/linimasa", label: "Linimasa" },
  { href: "/pustaka", label: "Pengetahuan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang-ai", label: "Tentang AI" },
  { href: "/pedoman", label: "Pedoman" },
];

// Footer selalu gelap dan dibatasi pita motif, supaya terpisah jelas dari isi halaman.
export function SiteFooter() {
  return (
    <footer data-theme="dark" className="latar-bingkai text-teks">
      <div className="pita-motif h-[18px] opacity-70" aria-hidden="true" />
      <div className="h-px bg-emas/50" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_0.8fr]">
        <div>
          <p className="flex items-baseline gap-3 whitespace-nowrap">
            <span className="font-jawa text-2xl text-emas" aria-hidden="true">
              ꦏꦿꦠꦺꦴꦤ꧀
            </span>
            <span className="font-display text-xl tracking-[0.18em] text-perkamen uppercase">Kerajaan Mataram Islam Bot</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-abu">
            Pemandu AI untuk sejarah Keraton Kasunanan Surakarta dan Pura Mangkunegaran, yang selalu menunjukkan
            sumbernya.
          </p>
          <p className="mt-6 font-script text-3xl text-emas">Matur nuwun</p>
        </div>

        <div>
          <h2 className="text-sm font-normal tracking-[0.16em] text-perkamen uppercase">{IDENTITAS.kelompok}</h2>
          <ul className="mt-4 space-y-2">
            {IDENTITAS.anggota.map((a) => (
              <li key={a.nim} className="flex flex-col border-b border-garis/60 pb-2">
                <span className="text-teks">{a.nama}</span>
                <span className="text-xs tracking-[0.12em] text-abu-gelap tabular-nums">{a.nim}</span>
              </li>
            ))}
          </ul>
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
          Tugas Pendidikan Pancasila, tema 7: AI dan rekonstruksi heritage. Kerajaan Mataram Islam Bot adalah program AI dan bisa keliru.
        </p>
      </div>
    </footer>
  );
}
