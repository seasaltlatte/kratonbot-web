import type { ReactNode } from "react";
import { OrnamenPemisah } from "@/components/Icons";

// Judul bagian bergaya portal tim: aksen tulisan tangan emas, judul Bodoni kapital, ornamen pemisah,
// lalu pengantar miring.
export function SectionTitle({
  script,
  title,
  intro,
  as: Tag = "h2",
}: {
  script: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-script text-3xl text-emas sm:text-4xl">{script}</p>
      <Tag className="mt-2 font-display text-[clamp(1.6rem,5vw,2.9rem)] leading-tight font-normal tracking-[0.2em] uppercase">
        {title}
      </Tag>
      <OrnamenPemisah className="mt-4" />
      {intro && <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-abu italic">{intro}</p>}
    </div>
  );
}
