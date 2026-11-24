"use client";

import { useState } from "react";
import { nav } from "./data";
import { Icon } from "./Icon";

/** Vertical nav menu in the footer; the caret toggles each submenu. */
export function FooterMenu() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="tk-footer__links tk-footer__menu">
      {nav.map((item) => (
        <li key={item.label}>
          <button type="button" aria-expanded={open === item.label} onClick={() => setOpen(open === item.label ? null : item.label)}>
            {item.label}
            <Icon name="caretDown" />
          </button>
          {open === item.label && item.children && (
            <ul>
              <li>
                <a href={item.href}>{item.label}</a>
              </li>
              {item.children.map((child) => (
                <li key={child.label}>{child.href ? <a href={child.href}>{child.label}</a> : <span>{child.label}</span>}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
