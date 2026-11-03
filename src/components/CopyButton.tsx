"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Salin prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard tidak tersedia (mis. bukan HTTPS); teks tetap bisa diseleksi manual.
        }
      }}
      className="border border-garis bg-permukaan px-3 py-1 text-sm font-semibold hover:border-emas"
    >
      {copied ? "Tersalin" : label}
    </button>
  );
}
