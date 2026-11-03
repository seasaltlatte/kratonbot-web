import Link from "next/link";

const links = [
  { href: "/chat", label: "Tanya KratonBot" },
  { href: "/linimasa", label: "Linimasa" },
  { href: "/jelajah", label: "Kartu pengetahuan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kuis", label: "Kuis" },
  { href: "/tentang-ai", label: "Tentang AI ini" },
  { href: "/pedoman", label: "Pedoman" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-garis bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2 font-bold text-sogan-tua">
          <span className="font-jawa text-xl" aria-hidden="true">
            ꦏꦿꦠꦺꦴꦤ꧀
          </span>
          <span className="text-lg">KratonBot</span>
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-tinta-pudar">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-sogan">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
