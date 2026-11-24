import Image from "next/image";
import "./toketuk.css";
import { Carousel } from "./Carousel";
import { Faq } from "./Faq";
import { FooterMenu } from "./FooterMenu";
import { Header } from "./Header";
import { Highlight } from "./Highlight";
import { Icon } from "./Icon";
import {
  A,
  GOOGLE_REVIEWS_URL,
  OFFICE_MAPS_URL,
  SITE,
  gallery,
  googleReviews,
  legalLinks,
  steps,
  testimonials,
  toursGranCanaria,
  toursTenerife,
  whyUs,
  type Tour,
} from "./data";

function TourCard({ tour }: { tour: Tour }) {
  return (
    <a className="tk-card" href={tour.href}>
      <div className="tk-card__img">
        <Image src={tour.image} alt="" fill sizes="(max-width: 767px) 100vw, 650px" />
      </div>
      <div className="tk-card__body">
        <h2 className="tk-card__title">{tour.title}</h2>
        <div className="tk-card__text">{tour.text}</div>
        <span className="tk-card__btn">Ver más</span>
      </div>
    </a>
  );
}

function ToursBlock({ island, rows }: { island: string; rows: Tour[][] }) {
  return (
    <>
      <div className="tk-sand tk-tours-title">
        <h3>
          Nuestros Tours en <Highlight>{island}</Highlight>
        </h3>
      </div>
      <div className="tk-sand tk-tour-rows">
        {rows.map((row) => (
          <div className="tk-tour-row" key={row[0].title}>
            {row.map((tour) => (
              <TourCard tour={tour} key={tour.title} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Stars() {
  return <span aria-label="5 estrellas">★★★★★</span>;
}

export function HomePage() {
  return (
    <div className="tk">
      <Header />

      <main>
        {/* Hero */}
        <section className="tk-banner tk-banner--hero">
          <div className="tk-banner__inner">
            <div className="tk-glass tk-glass--hero">
              <h3 className="tk-glass__title">
                ¡Explora <Highlight>Tenerife &amp; Gran Canaria</Highlight> como nunca antes lo habías hecho!
              </h3>
              <h4 className="tk-glass__lead">
                Súbete a uno de nuestros tuk tuks y descubre los rincones con más encanto, secretos escondidos y
                monumentos.
              </h4>
              <a className="tk-grad-btn" href={`${SITE}/tours/`}>
                <Icon name="mapPin" />
                Ver tours
              </a>
            </div>
          </div>
        </section>

        <ToursBlock island="Tenerife" rows={toursTenerife} />
        <ToursBlock island="Gran Canaria" rows={toursGranCanaria} />

        {/* 100% eléctrico */}
        <section className="tk-banner tk-banner--electric">
          <div className="tk-banner__inner">
            <div className="tk-glass tk-glass--electric">
              <h3 className="tk-glass__title">
                <Highlight>100% Eléctrico.</Highlight> 100% Alma Canaria.
              </h3>
              <p className="tk-glass__lead">
                Vive Tenerife de una forma diferente: a bordo de nuestros tuk tuks 100% eléctricos, silenciosos,
                cómodos y con un toque de color que refleja el espíritu de las islas. Respira el aire del Atlántico,
                siente el viento en la cara y déjate guiar por nuestro equipo multilingüe, que conoce cada rincón y
                cada secreto de estos paisajes. Una experiencia sostenible, auténtica y con alma canaria.
              </p>
            </div>
            <Image
              className="tk-electric-img"
              src={`${A}/images/electric-tuktuk.png`}
              alt="Tuk tuk eléctrico de Toke Tuk Canarias"
              width={688}
              height={688}
            />
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="tk-sand tk-how">
          <h2 className="tk-h2">¿Cómo funciona?</h2>
          <div className="tk-steps">
            {steps.map((s) => (
              <div className="tk-step" key={s.step}>
                <h5 className="tk-step__label">{s.step}</h5>
                <div className="tk-step__line">
                  <span className="tk-step__icon">
                    <Icon name={s.icon} />
                  </span>
                </div>
                <h3 className="tk-step__title">{s.title}</h3>
                <p className="tk-step__text">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tk-sand tk-gallery">
          <Carousel perView={[3, 1]} label="Galería de tuk tuks">
            {gallery.map((src) => (
              <Image key={src} src={src} alt="" fill sizes="(max-width: 767px) 100vw, 430px" />
            ))}
          </Carousel>
        </section>

        {/* Google reviews */}
        <section className="tk-sand tk-greviews">
          <div className="tk-greviews__grid">
            {googleReviews.map((r) => (
              <article className="tk-greview" key={r.name}>
                <a className="tk-greview__avatar" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                  <Image src={`${A}/avatars/${r.avatar}.png`} alt={r.name} width={80} height={80} />
                </a>
                <Image className="tk-greview__google" src={`${A}/icons/google.png`} alt="google" width={20} height={20} />
                <a className="tk-greview__name" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                  {r.name}
                </a>
                <div className="tk-greview__stars">
                  <Stars />
                </div>
                <div className="tk-greview__date">{r.date}</div>
                {r.text && (
                  <p className="tk-greview__text">
                    {r.text}
                    {r.truncated && (
                      <>
                        {" "}
                        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                          Read more
                        </a>
                      </>
                    )}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="tk-sand tk-why">
          <h2 className="tk-h2">¿Por qué elegirnos?</h2>
          <div className="tk-why__grid">
            {whyUs.map((w) => (
              <div className="tk-why__card" key={w.title}>
                <div className="tk-why__icon">
                  <Icon name={w.icon} />
                </div>
                <h3 className="tk-why__title">{w.title}</h3>
                <p className="tk-why__text">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiénes somos */}
        <section className="tk-sand tk-about">
          <div className="tk-about__inner">
            <div className="tk-about__img">
              <Image src={`${A}/images/about.jpg`} alt="" fill sizes="(max-width: 767px) 270px, 672px" />
            </div>
            <div className="tk-about__box">
              <h3 className="tk-about__title">
                Tu Tuk Tuk vive y enseña <strong>Tenerife &amp; Gran Canaria</strong>
              </h3>
              <p>
                Toke Tuk Canarias es una empresa especializada en recorridos turísticos por Tenerife y Gran Canaria que
                muestra la isla desde otro punto de vista, a través de los ojos de quienes la conocen y la aman.
                Descubre sus rincones más especiales, su historia, cultura, tradiciones y la calidez de su gente.
              </p>
              <p>
                Además, Toke Tuk Canarias está comprometido con el cuidado del entorno único de Tenerife y Gran
                Canaria. Por eso, todos nuestros tuktuks son 100% eléctricos, manteniendo limpio el aire, azul el cielo
                y preservando la naturaleza que hace de esta isla un lugar tan especial.
              </p>
            </div>
          </div>
        </section>

        {/* Oficina */}
        <section className="tk-banner tk-banner--office">
          <div className="tk-banner__inner">
            <div className="tk-glass tk-glass--office">
              <h3 className="tk-glass__title">
                Nuestra Oficina en <Highlight>Santa Cruz</Highlight>
              </h3>
              <p className="tk-glass__lead">
                Encuéntranos en el corazón de Santa Cruz de Tenerife, en el Centro Comercial Nuestra Señora de África.
                Nuestro equipo está aquí para ayudarte a planificar tu ruta perfecta, resolver todas tus dudas y darte
                la bienvenida con una sonrisa canaria. Ven a conocernos antes de tu aventura en tuk tuk.
              </p>
              <a className="tk-grad-btn" href={OFFICE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="mapPin" />
                Cómo llegar
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="tk-sand tk-faq">
          <h2 className="tk-h2 tk-h2--medium">Preguntas más frecuentes</h2>
          <Faq />
        </section>

        {/* Reserva */}
        <section className="tk-sand tk-book">
          <div className="tk-book__inner">
            <h2 className="tk-h2 tk-h2--medium">¡Reserva tu tuk tuk hoy!</h2>
            <div className="tk-book__text">
              <p>Descubre Tenerife y Gran Canaria a Bordo de Nuestros Tuktuks.</p>
              <p>Tours Privados y Empresariales, Reserva Fácilmente por Teléfono, WhatsApp o Formulario.</p>
            </div>
            <div className="tk-testimonials">
              <Carousel perView={[1, 1]} label="Opiniones de clientes" autoplayMs={5000}>
                {testimonials.map((t) => (
                  <div className="tk-testimonial" key={t.name}>
                    <div className="tk-testimonial__header">
                      <div className="tk-testimonial__name">
                        {t.name}
                        <span className="tk-stars">
                          <Stars />
                        </span>
                      </div>
                      <div className="tk-testimonial__title">{t.country} • Verficado</div>
                    </div>
                    <div className="tk-testimonial__text">{t.text}</div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <section className="tk-split">
          <div className="tk-split__text">
            <h6 className="tk-split__eyebrow">
              Descubre Tenerife &amp; GRAN CANARIA <span aria-hidden="true">🌴</span>
            </h6>
            <h3 className="tk-split__title">Las islas canarias - con mil paisajes y un alma única.</h3>
            <a className="tk-split__link" href={`${SITE}/tours/`}>
              Reservar Online ⟶
            </a>
          </div>
          <div className="tk-split__img" role="img" aria-label="Flota de tuk tuks eléctricos" />
        </section>

        <div className="tk-footer">
          <a className="tk-footer__logo" href={SITE} aria-label="Toke Tuk Canarias">
            <Image src={`${A}/images/logo.png`} alt="" width={675} height={225} />
          </a>
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
                  <a href={l.href}>{l.label}</a>
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
