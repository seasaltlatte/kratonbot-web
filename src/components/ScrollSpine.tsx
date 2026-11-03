"use client";

import { useEffect, useRef } from "react";

// Garis tengah linimasa yang terisi emas mengikuti posisi scroll. Diletakkan di dalam elemen
// `relative` yang membungkus seluruh linimasa; panjangnya mengikuti elemen induk itu.
export function ScrollSpine() {
  const fill = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = fill.current?.parentElement;
    if (!parent) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = parent.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      if (dot.current) dot.current.style.top = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span className="absolute top-0 bottom-0 left-4 w-px bg-teks/15 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
      <span
        ref={fill}
        className="absolute top-0 bottom-0 left-4 w-0.5 origin-top -translate-x-[0.5px] bg-gradient-to-b from-emas-terang to-emas md:left-1/2 md:-translate-x-1/2"
        style={{ transform: "scaleY(0)" }}
        aria-hidden="true"
      />
      <span
        ref={dot}
        className="absolute left-4 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emas-terang shadow-[0_0_16px_4px_rgba(220,193,122,0.6)] md:left-1/2"
        style={{ top: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
