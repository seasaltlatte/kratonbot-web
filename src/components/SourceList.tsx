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
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 border border-garis px-3 py-1.5 text-sm text-emas hover:border-emas [&::-webkit-details-marker]:hidden">
        <IkonLontar className="size-4" />
        Sumber ({sumber.length})
        <span className="transition-transform group-open:rotate-180" aria-hidden="true">
          ▾
        </span>
      </summary>
      {list}
    </details>
  );
}
