import type { ReactNode } from "react";
import { OrnamenPemisah } from "@/components/Icons";

// Judul bagian bergaya portal tim: aksen tulisan tangan emas, judul Bodoni kapital, ornamen pemisah,
// lalu pengantar miring. `panel` membingkai judul dengan bidang padat agar terbaca di atas motif batik.
export function SectionTitle({
  script,
  title,
  intro,
  as: Tag = "h2",
  panel = false,
}: {
  script: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  panel?: boolean;
}) {
  const content = (
    <>
      <p className="font-script text-3xl text-emas sm:text-4xl">{script}</p>
      <Tag className="mt-2 font-display text-[clamp(1.6rem,5vw,2.9rem)] leading-tight font-normal tracking-[0.2em] uppercase">
        {title}
      </Tag>
      <OrnamenPemisah className="mt-4" />
      {intro && <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-abu italic">{intro}</p>}
    </>
  );

  if (!panel) return <div className="mx-auto max-w-3xl text-center">{content}</div>;

  // Tanpa kotak: "sorot" berbentuk elips yang memudarkan motif batik di belakang teks, plus judul
  // yang lebih besar dan berbayang lembut, sehingga teks menonjol tanpa menyerupai kartu di bawahnya.
  return (
    // `isolate` perlu agar sorot (-z-10) tergambar di atas motif batik milik section, bukan di bawahnya.
    <div className="relative isolate mx-auto max-w-3xl px-4 py-14 text-center sm:py-16">
      <span
        className="pointer-events-none absolute -inset-x-28 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_closest-side,var(--malam-2)_62%,color-mix(in_srgb,var(--malam-2)_75%,transparent)_80%,transparent)]"
        aria-hidden="true"
      />
      <p className="font-script text-4xl text-emas drop-shadow-[0_1px_0_var(--malam-2)] sm:text-5xl">{script}</p>
      <Tag className="mt-3 font-display text-[clamp(2rem,6.5vw,3.6rem)] leading-tight font-medium tracking-[0.22em] uppercase drop-shadow-[0_2px_12px_color-mix(in_srgb,var(--emas)_25%,transparent)]">
        {title}
      </Tag>
      <OrnamenPemisah className="mt-5" />
      {intro && <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-medium text-teks italic">{intro}</p>}
    </div>
  );
}
