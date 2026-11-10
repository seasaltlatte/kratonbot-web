// Ikon garis emas buatan sendiri (stroke = currentColor). Ukuran diatur lewat className, misalnya "size-4".
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Kartu: dua kartu bertumpuk dengan sudut terlipat, penanda kartu pengetahuan.
export function IkonKartu({ className = "size-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3.5h8.5L19 7v13.5H7z" />
      <path d="M15.5 3.5V7H19" />
      <path d="M4.5 6.5v15h11" />
      <path d="M10 11h6M10 14.5h6M10 18h3.5" />
    </svg>
  );
}

// Lontar: dua lembar daun naskah yang diikat tali, penanda sumber.
export function IkonLontar({ className = "size-4" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5" width="19" height="5.5" rx="1.4" />
      <rect x="2.5" y="13.5" width="19" height="5.5" rx="1.4" />
      <path d="M12 7.75v8.5" />
      <circle cx="12" cy="7.75" r="0.9" />
      <circle cx="12" cy="16.25" r="0.9" />
      <path d="M5.5 7.75h3.5M15 7.75h3.5M5.5 16.25h3.5M15 16.25h3.5" />
    </svg>
  );
}

// Pertanyaan: gelembung bicara.
export function IkonTanya({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5h16v10H10l-4.5 3.5V15.5H4z" />
      <path d="M10 9a2 2 0 1 1 2.6 1.9c-.4.1-.6.5-.6.9v.2M12 13.6v.1" />
    </svg>
  );
}

// Mencari di pustaka: kaca pembesar di atas lontar.
export function IkonCari({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4" width="13" height="4" rx="1" />
      <rect x="2.5" y="10" width="9" height="4" rx="1" />
      <circle cx="16" cy="15" r="3.5" />
      <path d="M18.5 17.5 21.5 20.5" />
    </svg>
  );
}

// Menyusun jawaban: pena.
export function IkonPena({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l1.2-4.4L15.6 5.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z" />
      <path d="M14 6.8l3.2 3.2M4 20h16" />
    </svg>
  );
}

// Kalender kunjungan.
export function IkonKalender({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h2M14 13.5h2M8 16.5h2" />
    </svg>
  );
}

// Perisai: batasan dan keamanan.
export function IkonPerisai({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z" />
      <path d="M12 8v4.5M12 15.5v.1" />
    </svg>
  );
}

// Gembok: data pengguna.
export function IkonGembok({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5" />
    </svg>
  );
}

// Roda gigi: teknologi.
export function IkonTeknologi({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </svg>
  );
}

// Linimasa: garis waktu dengan tiga titik.
export function IkonLinimasa({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v18" />
      <circle cx="12" cy="6" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="18" r="1.8" />
      <path d="M14 6h6M4 12h6M14 18h5" />
    </svg>
  );
}

// Galeri: bingkai foto dengan gunung dan matahari.
export function IkonGaleri({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M3 16l5-5 4 4 3-3 6 6" />
      <circle cx="16" cy="9" r="1.6" />
    </svg>
  );
}

// Ornamen pemisah antarbagian: garis dengan belah ketupat dan titik (generik, bukan motif larangan).
export function OrnamenPemisah({ className = "" }: P) {
  return (
    <div className={`flex items-center justify-center gap-3 text-emas ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-emas/60 sm:w-28" />
      <svg viewBox="0 0 48 16" className="h-4 w-12" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 1.5 30.5 8 24 14.5 17.5 8z" />
        <path d="M24 5 27 8 24 11 21 8z" fill="currentColor" stroke="none" />
        <circle cx="10" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="38" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="3" cy="8" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="45" cy="8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-emas/60 sm:w-28" />
    </div>
  );
}

export function IkonPeta({ className = "size-4" }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}
