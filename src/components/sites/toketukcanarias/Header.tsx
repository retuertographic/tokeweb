"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { A, languages, nav } from "./data";
import { Icon } from "./Icon";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="tk-header">
      <Link className="tk-header__logo" href="/" aria-label="Toke Tuk Canarias">
        <Image src={`${A}/images/logo.png`} alt="" width={675} height={225} priority />
      </Link>
      <div className="tk-header__group">
        <nav className="tk-nav" aria-label="Menu">
          {nav.map((item) => (
            <div className="tk-nav__item" key={item.label}>
              <Link className="tk-nav__link" href={item.href ?? "#"}>
                {item.label}
                <Icon name="caretDown" className="tk-nav__caret" />
              </Link>
              {item.children && (
                <ul className="tk-nav__sub">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      {child.href ? <Link href={child.href}>{child.label}</Link> : <span>{child.label}</span>}
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
        <Link className="tk-book-btn" href="/tours/">
          Book online
        </Link>
        <div className="tk-flags">
          {languages.map((lang) => (
            <button type="button" key={lang.code} title={lang.label} aria-label={lang.label}>
              <Image src={`${A}/icons/flag-${lang.code}.svg`} alt={lang.code} width={18} height={18} unoptimized />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <ul className="tk-mobile-menu" onClick={() => setOpen(false)}>
          {nav.map((item) => (
            <li key={item.label}>
              <Link href={item.href ?? "#"}>{item.label}</Link>
              {item.children && (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      {child.href ? <Link href={child.href}>{child.label}</Link> : <span>{child.label}</span>}
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
