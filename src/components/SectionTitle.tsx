import type { ReactNode } from "react";

// Judul bagian bergaya portal tim: aksen tulisan tangan emas, judul Bodoni kapital dengan garis samping,
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
      <div className="mt-2 flex items-center justify-center gap-5 sm:gap-8">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-teks/20 sm:w-32" aria-hidden="true" />
        <Tag className="font-display text-[clamp(1.6rem,5vw,2.9rem)] leading-tight font-normal tracking-[0.2em] uppercase">
          {title}
        </Tag>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-teks/20 sm:w-32" aria-hidden="true" />
      </div>
      {intro && <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-abu italic">{intro}</p>}
    </div>
  );
}
