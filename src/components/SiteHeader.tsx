"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/chat", label: "Tanya KratonBot" },
  { href: "/linimasa", label: "Linimasa" },
  { href: "/pustaka", label: "Pustaka" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang-ai", label: "Tentang AI ini" },
  { href: "/pedoman", label: "Pedoman" },
];

// Header menempel di atas (tinggi tetap --tinggi-header). Di layar kecil menu masuk ke tombol ☰.
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    // Header berwarna gelap (cokelat tua di mode terang), supaya jelas terpisah dari isi halaman.
    <header data-theme="dark" className="latar-bingkai sticky top-0 z-50 border-b border-emas/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md">
      <nav className="mx-auto flex h-[var(--tinggi-header)] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-baseline gap-3 whitespace-nowrap text-perkamen">
          <span className="hidden font-jawa text-lg text-emas min-[420px]:inline" aria-hidden="true">
            ꦏꦿꦠꦺꦴꦤ꧀
          </span>
          <span className="font-display text-lg tracking-[0.14em] uppercase sm:tracking-[0.18em]">KratonBot</span>
        </Link>

        <ul className="hidden items-center gap-x-6 text-xs tracking-[0.12em] lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="border-b border-transparent py-1 text-abu hover:text-perkamen aria-[current=page]:border-emas aria-[current=page]:text-perkamen"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-hp"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-9 items-center justify-center border border-garis text-perkamen hover:border-emas lg:hidden"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="menu-hp" className="border-t border-garis bg-malam px-4 py-2 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.6)] lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="flex items-center justify-between border-b border-garis/60 py-3.5 text-sm tracking-[0.12em] text-teks last:border-b-0 aria-[current=page]:text-emas"
              >
                {l.label}
                <span className="text-emas" aria-hidden="true">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
