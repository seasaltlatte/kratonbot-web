import type { Sumber } from "@/lib/cards";

export function SourceList({ sumber, className = "" }: { sumber: Sumber[]; className?: string }) {
  return (
    <ul className={`space-y-1 text-sm text-tinta-pudar ${className}`}>
      {sumber.map((s) => (
        <li key={s.text + (s.url ?? "")} className="pl-5 -indent-5">
          <span aria-hidden="true">📚 </span>
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-garis underline-offset-2 hover:text-sogan hover:decoration-sogan"
            >
              {s.text}
            </a>
          ) : (
            s.text
          )}
        </li>
      ))}
    </ul>
  );
}
