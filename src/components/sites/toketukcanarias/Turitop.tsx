"use client";

import { useEffect } from "react";

/**
 * TuriTop booking box, embedded as on the source (company T1657).
 * The loader script is re-injected on every mount so client-side navigation
 * between tour pages initialises each box.
 */
export function Turitop({ service }: { service: string }) {
  useEffect(() => {
    document.getElementById("js-turitop")?.remove();
    const s = document.createElement("script");
    s.id = "js-turitop";
    s.src = "https://app.turitop.com/js/load-turitop.min.js";
    s.dataset.company = "T1657";
    s.dataset.buttoncolor = "green";
    s.dataset.afftag = "ttafid";
    document.body.appendChild(s);
  }, [service]);

  return (
    <div className="tk-booking">
      <div className="load-turitop" data-service={service} data-lang="es" data-embed="box" />
    </div>
  );
}
