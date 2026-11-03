import { CLAIM_LABELS } from "@/lib/labels";

export function LabelChip({ index }: { index: number }) {
  const l = CLAIM_LABELS[index];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold ${l.className}`}>
      <span aria-hidden="true">{l.emoji}</span>
      {l.name}
    </span>
  );
}

export function LabelLegend({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={compact ? "space-y-2.5" : "grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"}>
      {CLAIM_LABELS.map((l, i) => (
        <div key={l.name}>
          <dt>
            <LabelChip index={i} />
          </dt>
          <dd className={`mt-1 text-tinta-pudar ${compact ? "text-sm" : ""}`}>{l.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}
