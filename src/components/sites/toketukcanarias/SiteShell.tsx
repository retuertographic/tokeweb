import Image from "next/image";
import Link from "next/link";
import "./toketuk.css";
import { A, legalLinks } from "./data";
import { FooterMenu } from "./FooterMenu";
import { Header } from "./Header";

/** Header + footer shared by every toketukcanarias.com page. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="tk">
      <Header />
      <main>{children}</main>
      <footer>
        <section className="tk-split">
          <div className="tk-split__text">
            <h6 className="tk-split__eyebrow">
              Descubre Tenerife &amp; GRAN CANARIA <span aria-hidden="true">🌴</span>
            </h6>
            <h3 className="tk-split__title">Las islas canarias - con mil paisajes y un alma única.</h3>
            <Link className="tk-split__link" href="/tours/">
              Reservar Online ⟶
            </Link>
          </div>
          <div className="tk-split__img" role="img" aria-label="Flota de tuk tuks eléctricos" />
        </section>

        <div className="tk-footer">
          <Link className="tk-footer__logo" href="/" aria-label="Toke Tuk Canarias">
            <Image src={`${A}/images/logo.png`} alt="" width={675} height={225} />
          </Link>
          <div>
            <h4>Contacto</h4>
            <p className="tk-footer__text">
              Calle Bethencourt y Molina 1. Centro Comercial Nuestra Señora de Africa Local 57 38003 S/C de Tenerife –
              ESPAÑA
              <br />
              Teléfono: <a href="tel:+34671403758">+34 671 40 37 58</a>
            </p>
          </div>
          <div>
            <h4>toke tuk canarias</h4>
            <FooterMenu />
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="tk-footer__links">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tk-footer__bottom">Toke Tuk Canarias © 2026 – Todos los derechos reservados</div>
      </footer>
    </div>
  );
}
