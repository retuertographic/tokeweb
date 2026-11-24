"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Props = {
  children: React.ReactNode;
  /** Slides visible per breakpoint: [desktop, mobile(<768px)] */
  perView: [number, number];
  gap?: number;
  autoplayMs?: number;
  className?: string;
  label: string;
};

/** Infinite-looking slider with arrows, dots and autoplay (replaces Swiper). */
export function Carousel({ children, perView, gap = 10, autoplayMs = 5000, className, label }: Props) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [view, setView] = useState(perView[0]);
  const hover = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setView(mq.matches ? perView[1] : perView[0]);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [perView]);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (!autoplayMs) return;
    const t = setInterval(() => {
      if (!hover.current) setIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, count]);

  // Render slides twice so the strip can always show `view` slides after `index`.
  const loop = [...slides, ...slides];
  const width = `calc((100% - ${gap * (view - 1)}px) / ${view})`;

  return (
    <div
      className={`tk-carousel${className ? ` ${className}` : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <div className="tk-carousel__viewport">
        <div
          className="tk-carousel__track"
          style={{ gap, transform: `translateX(calc(-${index} * (${width} + ${gap}px)))` }}
        >
          {loop.map((slide, i) => (
            <div className="tk-carousel__slide" style={{ width }} key={i} aria-hidden={i < index || i >= index + view}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="tk-carousel__arrow tk-carousel__arrow--prev" aria-label="Anterior" onClick={() => go(index - 1)}>
        <Icon name="chevronLeft" />
      </button>
      <button type="button" className="tk-carousel__arrow tk-carousel__arrow--next" aria-label="Siguiente" onClick={() => go(index + 1)}>
        <Icon name="chevronRight" />
      </button>
      <div className="tk-carousel__dots">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`tk-carousel__dot${i === index ? " is-active" : ""}`}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
