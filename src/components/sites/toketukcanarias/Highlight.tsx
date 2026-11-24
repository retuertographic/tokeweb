"use client";

import { useEffect, useRef, useState } from "react";

/** Elementor "animated headline" with the double-underline highlight marker. */
export function Highlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`tk-hl${drawn ? " is-drawn" : ""}`}>
      <span className="tk-hl__text">{children}</span>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6" />
        <path d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4" />
      </svg>
    </span>
  );
}
