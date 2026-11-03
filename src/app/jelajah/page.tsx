import type { Metadata } from "next";
import { Explorer } from "@/components/Explorer";
import { getCards, TEMA } from "@/lib/cards";

export const metadata: Metadata = {
  title: "Jelajahi kartu pengetahuan | KratonBot",
};

export default function JelajahPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-biru-tua">Jelajahi kartu pengetahuan</h1>
      <p className="mt-3 mb-10 max-w-2xl text-lg leading-relaxed text-tinta-pudar">
        Semua yang diketahui KratonBot ada di sini, lengkap dengan sumbernya. Kalau sebuah hal tidak ada di kartu, KratonBot
        juga tidak tahu.
      </p>
      <Explorer cards={getCards()} temas={Object.values(TEMA)} />
    </div>
  );
}
