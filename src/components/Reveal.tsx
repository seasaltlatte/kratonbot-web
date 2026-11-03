"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Menampilkan isinya dengan animasi saat masuk layar (sekali saja). Tanpa JS, isi langsung terlihat
// karena gaya tersembunyinya hanya berlaku di bawah kelas `.js` (lihat globals.css).
export function Reveal({
  children,
  from = "bawah",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: "bawah" | "kiri" | "kanan" | "zoom";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("terlihat");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variant = { bawah: "", kiri: "dari-kiri", kanan: "dari-kanan", zoom: "zoom" }[from];
  return (
    <div ref={ref} className={`muncul ${variant} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
