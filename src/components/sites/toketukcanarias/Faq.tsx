"use client";

import { useId, useState } from "react";
import { faqs } from "./data";
import { Icon } from "./Icon";

export type FaqItem = { q: string; a: string };

/** Elementor toggle accordion. `a` may contain trusted HTML extracted from the source site. */
export function Faq({ items = faqs, html = false }: { items?: FaqItem[]; html?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="tk-faq__box">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`tk-faq__item${isOpen ? " is-open" : ""}`} key={f.q}>
            <button
              type="button"
              className="tk-faq__q"
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{f.q}</span>
              <Icon name={isOpen ? "minus" : "plus"} />
            </button>
            <div className="tk-faq__a" id={`${id}-${i}`} role="region">
              <div>{html ? <div className="tk-rich" dangerouslySetInnerHTML={{ __html: f.a }} /> : <p>{f.a}</p>}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
