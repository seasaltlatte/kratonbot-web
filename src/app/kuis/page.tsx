import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
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
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle
        as="h1"
        script="Uji mata sejarahmu"
        title="Fakta, tafsir, atau legenda?"
        intro="AI sering menyampaikan tafsir dan legenda dengan nada seyakin fakta. Latih matamu membedakannya."
      />
      <div className="mt-16" />
      <Quiz pool={pool} />
    </div>
  );
}
