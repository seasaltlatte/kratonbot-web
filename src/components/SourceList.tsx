import { IkonLontar } from "@/components/Icons";
import type { Sumber } from "@/lib/cards";

// Daftar sumber dengan ikon lontar. `lipat` menampilkannya sebagai tombol "Sumber (n)" yang bisa dibuka.
export function SourceList({
  sumber,
  className = "",
  lipat = false,
}: {
  sumber: Sumber[];
  className?: string;
  lipat?: boolean;
}) {
  const list = (
    <ul className={`space-y-1.5 text-sm text-abu ${lipat ? "mt-3" : className}`}>
      {sumber.map((s) => (
        <li key={s.text + (s.url ?? "")} className="flex gap-2">
          <IkonLontar className="mt-0.5 size-4 shrink-0 text-emas" />
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-garis underline-offset-2 hover:text-emas hover:decoration-emas"
            >
              {s.text}
            </a>
          ) : (
            <span>{s.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
  if (!lipat) return list;
  return (
    <details className={`group ${className}`}>
      <summary className="group/s inline-flex cursor-pointer list-none items-center gap-2.5 text-sm font-medium text-perkamen [&::-webkit-details-marker]:hidden">
        <span className="flex size-9 items-center justify-center rounded-full bg-emas/15 text-emas ring-1 ring-emas/50 transition group-hover/s:bg-emas group-hover/s:text-malam">
          <IkonLontar className="size-[18px]" />
        </span>
        <span className="border-b border-dashed border-emas/60 pb-0.5 whitespace-nowrap group-hover/s:border-solid">Lihat sumber</span>
        <span className="flex size-5 items-center justify-center rounded-full bg-emas text-[11px] font-semibold text-malam tabular-nums">
          {sumber.length}
        </span>
        <span className="text-emas transition-transform group-open:rotate-180" aria-hidden="true">
          ▾
        </span>
      </summary>
      {list}
    </details>
  );
}
