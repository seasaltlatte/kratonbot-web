"use client";

// Pengalih mode gelap/terang. Ikon dipilih lewat CSS (varian `terang:`), jadi tidak perlu state React
// dan tidak ada kedipan saat halaman dimuat. Pilihan disimpan di localStorage ("kratonbot-tema").
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("kratonbot-tema", next);
    } catch {
      // Penyimpanan browser tidak tersedia; mode tetap berganti untuk kunjungan ini.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti mode gelap atau terang"
      title="Ganti mode gelap atau terang"
      className="inline-flex size-9 items-center justify-center rounded-full text-emas transition-colors hover:bg-emas/15"
    >
      {/* Matahari: tampil di mode gelap (klik untuk ke terang) */}
      <svg className="size-4 terang:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Bulan: tampil di mode terang (klik untuk ke gelap) */}
      <svg className="hidden size-4 terang:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
