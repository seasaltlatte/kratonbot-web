import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import { getCards } from "@/lib/cards";

export const metadata: Metadata = {
  title: "Kuis: fakta, tafsir, atau legenda? | KratonBot",
};

export default function KuisPage() {
  const pool = getCards().filter(
    (c) => ["FAKTA", "TAFSIR", "LEGENDA"].includes(c.kategori) && !/topik sensitif/i.test(c.judul),
  );
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-biru-tua">Fakta, tafsir, atau legenda?</h1>
      <p className="mt-3 mb-10 max-w-2xl text-lg leading-relaxed text-tinta-pudar">
        AI sering menyampaikan tafsir dan legenda dengan nada seyakin fakta. Latih matamu membedakannya.
      </p>
      <Quiz pool={pool} />
    </div>
  );
}
