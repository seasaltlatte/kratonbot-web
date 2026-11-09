import { CLAIM_LABELS } from "@/lib/labels";

export type Jenis = (typeof CLAIM_LABELS)[number]["jenis"];

// Tanda jenis pengetahuan: keluarga belah ketupat yang sama dengan ornamen situs.
// Penuh = tercatat, setengah = tafsir, bertitik = legenda, bersilang = info praktis, putus-putus = kosong.
export function TandaIkon({ jenis, className = "" }: { jenis: Jenis; className?: string }) {
  const outline = "M6 1 11 6 6 11 1 6Z";
  return (
    <svg viewBox="0 0 12 12" className={`inline-block size-[0.8em] shrink-0 ${className}`} aria-hidden="true">
      {jenis === "fakta" && <path d={outline} fill="currentColor" />}
      {jenis === "tafsir" && (
        <>
          <path d={outline} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 1 1 6 6 11Z" fill="currentColor" />
        </>
      )}
      {jenis === "legenda" && (
        <>
          <path d={outline} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6" cy="6" r="1.6" fill="currentColor" />
        </>
      )}
      {jenis === "praktis" && (
        <>
          <path d={outline} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.5 6h5M6 3.5v5" stroke="currentColor" strokeWidth="1.1" />
        </>
      )}
      {jenis === "kosong" && (
        <path d={outline} fill="none" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1.6 1.4" />
      )}
    </svg>
  );
}

export function LabelChip({ index }: { index: number }) {
  const l = CLAIM_LABELS[index];
  return (
    <span className={`tanda tanda-${l.jenis}`}>
      <TandaIkon jenis={l.jenis} />
      {l.name}
    </span>
  );
}

export function LabelLegend({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={compact ? "space-y-4" : "grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"}>
      {CLAIM_LABELS.map((l, i) => (
        <div key={l.name} className="border-l border-garis pl-4">
          <dt className="text-lg">
            <LabelChip index={i} />
          </dt>
          <dd className={`mt-0.5 text-abu ${compact ? "text-sm" : ""}`}>{l.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}
