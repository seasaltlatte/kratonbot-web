"use client";

import { useEffect, useRef } from "react";

// Cahaya emas lembut yang mengikuti kursor di hero. Hanya untuk mouse/trackpad (pointer: fine)
// dan mati bila pengguna memilih "kurangi gerakan". Dipasang di dalam lapisan latar hero.
export function HeroCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.closest("section");
    if (!el || !area) return;
    const ok = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty("--kx", `${x}px`);
      el.style.setProperty("--ky", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cahaya-kursor" aria-hidden="true" />;
}
