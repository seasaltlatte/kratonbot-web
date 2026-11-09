import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Explorer } from "@/components/Explorer";
import { getCards, TEMA } from "@/lib/cards";

export const metadata: Metadata = {
  title: "Pustaka | Kerajaan Mataram Islam Bot",
};

export default function PustakaPage() {
  return (
    <div className="batik overflow-hidden bg-malam-2">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-24 sm:px-6">
        <SectionTitle
          panel
          as="h1"
          script="Semua yang diketahui bot"
          title="Pustaka Pengetahuan"
          intro="Semua yang diketahui Kerajaan Mataram Islam Bot ada di sini, lengkap dengan sumbernya. Kalau sebuah hal tidak ada di kartu, bot juga tidak tahu."
        />
        <div className="mt-10" />
        <Explorer cards={getCards()} temas={Object.values(TEMA)} />
      </div>
    </div>
  );
}
