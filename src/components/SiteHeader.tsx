"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/linimasa", label: "Linimasa" },
  { href: "/pustaka", label: "Pengetahuan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang-ai", label: "Tentang AI" },
  { href: "/pedoman", label: "Pedoman" },
];

export function SiteHeader({ inHero = false }: { inHero?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Tutup menu mobile ketika berpindah halaman
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Pantau scroll untuk memunculkan sticky white navbar saat melewati hero
  useEffect(() => {
    if (!isHome || inHero) return;

    function handleScroll() {
      // Munculkan sticky white navbar ketika scroll melewati hero (> 180px)
      setScrolled(window.scrollY > 180);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, inHero]);

  // JIKA IN HERO: Navbar berada di dalam kartu Hero (transparan, tanpa background putih, teks perkamen)
  if (inHero) {
    return (
      <header className="relative z-20 flex w-full flex-col px-6 pt-6 sm:px-10 sm:pt-8 md:px-12 md:pt-10">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Logo Brand Kiri */}
          <Link href="/" className="group flex items-center gap-3 text-perkamen transition hover:opacity-90">
            <span className="font-display text-sm tracking-[0.16em] uppercase text-perkamen sm:text-base md:text-lg sm:tracking-[0.2em]">
              KERAJAAN MATARAM ISLAM BOT
            </span>
          </Link>

          {/* Navigasi Tengah - Simple & Clear tanpa rounded corner */}
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-xs tracking-[0.16em] uppercase transition-colors ${
                    isActive
                      ? "font-semibold text-perkamen"
                      : "text-perkamen/75 hover:text-perkamen"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emas"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Aksi Kanan & ThemeToggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="rounded-full border border-perkamen/20 bg-malam/40 p-0.5 backdrop-blur-md">
              <ThemeToggle />
            </div>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emas bg-emas px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold tracking-[0.16em] text-malam uppercase shadow-[0_0_24px_rgba(199,164,92,0.35)] transition hover:bg-emas-terang hover:shadow-[0_0_36px_rgba(199,164,92,0.55)]"
            >
              <span>Tanya Sejarah</span>
              <span aria-hidden="true">→</span>
            </Link>

            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full border border-perkamen/20 bg-malam/40 text-perkamen backdrop-blur-md transition hover:bg-perkamen/15 lg:hidden"
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Panel Menu Mobile dalam Hero */}
        {mobileOpen && (
          <div className="mt-4 w-full rounded-2xl border border-garis/80 bg-malam/95 px-6 py-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`border-b border-garis/40 py-2.5 text-xs tracking-[0.16em] uppercase transition-colors ${
                      isActive ? "font-semibold text-emas" : "text-perkamen/80 hover:text-perkamen"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    );
  }

  // DI LUAR HERO (Sticky Header):
  // Di halaman beranda: tersembunyi saat di hero, muncul saat scroll ke bawah
  // Di halaman lain: selalu tampil sticky di atas
  const showSticky = !isHome || scrolled;

  return (
    <header
      className={`w-full border-b border-garis/60 bg-malam/95 shadow-md backdrop-blur-md transition-all duration-300 terang:bg-white/95 ${
        isHome
          ? `fixed top-0 left-0 right-0 z-50 ${
              showSticky
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`
          : "sticky top-0 z-50"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4 sm:px-10 sm:py-5 md:px-12">
        {/* Logo Brand Kiri */}
        <Link href="/" className="group flex items-center gap-3 text-perkamen transition hover:opacity-90 terang:text-[#2a1d14]">
          <span className="font-display text-sm tracking-[0.16em] uppercase sm:text-base md:text-lg sm:tracking-[0.2em]">
            KERAJAAN MATARAM ISLAM BOT
          </span>
        </Link>

        {/* Navigasi Tengah - Simple & Clear tanpa rounded corner */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs tracking-[0.16em] uppercase transition-colors ${
                  isActive
                    ? "font-semibold text-perkamen terang:text-[#2a1d14]"
                    : "text-abu hover:text-perkamen terang:text-abu-gelap terang:hover:text-[#2a1d14]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emas"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Aksi Kanan & ThemeToggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="rounded-full border border-garis/60 bg-malam/40 p-0.5 backdrop-blur-md terang:bg-white/60">
            <ThemeToggle />
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emas bg-emas px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold tracking-[0.16em] text-malam uppercase shadow-[0_0_24px_rgba(199,164,92,0.35)] transition hover:bg-emas-terang hover:shadow-[0_0_36px_rgba(199,164,92,0.55)]"
          >
            <span>Tanya Sejarah</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-garis/60 text-teks backdrop-blur-md transition hover:bg-perkamen/10 terang:text-[#2a1d14] lg:hidden"
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Panel Menu Mobile */}
      {mobileOpen && (
        <div className="w-full border-t border-garis bg-malam/95 px-6 py-5 shadow-2xl backdrop-blur-xl terang:bg-white/95 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-garis/40 py-2.5 text-xs tracking-[0.16em] uppercase transition-colors ${
                    isActive
                      ? "font-semibold text-emas"
                      : "text-abu hover:text-perkamen terang:text-abu-gelap terang:hover:text-[#2a1d14]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
