"use client";

import { useState } from "react";
import { faqs } from "./data";
import { Icon } from "./Icon";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="tk-faq__box">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`tk-faq__item${isOpen ? " is-open" : ""}`} key={f.q}>
            <button
              type="button"
              className="tk-faq__q"
              aria-expanded={isOpen}
              aria-controls={`tk-faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{f.q}</span>
              <Icon name={isOpen ? "minus" : "plus"} />
            </button>
            <div className="tk-faq__a" id={`tk-faq-${i}`} role="region">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
