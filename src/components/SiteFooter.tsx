import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-sogan-tua text-sogan-muda">
      <div className="motif h-4 opacity-80" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-7 text-sm sm:flex-row sm:justify-between sm:px-6">
        <p>
          Tugas Pendidikan Pancasila, tema 7: AI dan rekonstruksi heritage.
          {/* TODO tim: ganti dengan nama kelompok dan anggota */}
          {" "}Dibuat oleh [nama kelompok].
        </p>
        <p>
          KratonBot adalah program AI dan bisa keliru.{" "}
          <Link href="/pedoman" className="text-white underline underline-offset-2 hover:text-emas-muda">
            Baca pedoman penggunaan
          </Link>
        </p>
      </div>
    </footer>
  );
}
