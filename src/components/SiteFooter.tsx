import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-garis bg-malam-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center sm:px-6">
        <p className="font-script text-3xl text-emas">Matur nuwun</p>
        <p className="font-display text-lg tracking-[0.2em] text-perkamen uppercase">Kelompok 4</p>
        <p className="max-w-xl text-abu italic">
          Tugas Pendidikan Pancasila, tema 7: AI dan rekonstruksi heritage.
        </p>
        <p className="text-sm text-abu-gelap">
          KratonBot adalah program AI dan bisa keliru.{" "}
          <Link href="/pedoman" className="text-teks underline underline-offset-4 hover:text-perkamen">
            Baca pedoman penggunaan
          </Link>
        </p>
      </div>
    </footer>
  );
}
