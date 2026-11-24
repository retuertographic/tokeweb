"use client";

import Image from "next/image";
import { useState } from "react";
import { A, SITE, languages, nav } from "./data";
import { Icon } from "./Icon";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="tk-header">
      <a className="tk-header__logo" href={SITE} aria-label="Toke Tuk Canarias">
        <Image src={`${A}/images/logo.png`} alt="" width={675} height={225} priority />
      </a>
      <div className="tk-header__group">
        <nav className="tk-nav" aria-label="Menu">
          {nav.map((item) => (
            <div className="tk-nav__item" key={item.label}>
              <a className="tk-nav__link" href={item.href}>
                {item.label}
                <Icon name="caretDown" className="tk-nav__caret" />
              </a>
              {item.children && (
                <ul className="tk-nav__sub">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      {child.href ? <a href={child.href}>{child.label}</a> : <span>{child.label}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <button
          type="button"
          className="tk-burger"
          aria-label="Alternar menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menuBar"} />
        </button>
        <a className="tk-book-btn" href={`${SITE}/tours/`}>
          Book online
        </a>
        <div className="tk-flags">
          {languages.map((lang) => (
            <button type="button" key={lang.code} title={lang.label} aria-label={lang.label}>
              <Image src={`${A}/icons/flag-${lang.code}.svg`} alt={lang.code} width={18} height={18} unoptimized />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <ul className="tk-mobile-menu">
          {nav.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
              {item.children && (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      {child.href ? <a href={child.href}>{child.label}</a> : <span>{child.label}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
