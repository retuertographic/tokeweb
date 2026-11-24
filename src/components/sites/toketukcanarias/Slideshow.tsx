"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/** Elementor media-carousel "slideshow" skin: one large slide + thumbnail strip, autoplay 5s. */
export function Slideshow({ images, thumbs = true }: { images: string[]; thumbs?: boolean }) {
  const [index, setIndex] = useState(0);
  const hover = useRef(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => {
      if (!hover.current) setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(t);
  }, [count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <div
      className="tk-slideshow"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galería del tour"
    >
      <div className="tk-slideshow__main">
        <div className="tk-slideshow__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((src, i) => (
            <div className="tk-slideshow__slide" key={src} aria-hidden={i !== index}>
              <Image src={src} alt="" fill sizes="(max-width: 767px) 100vw, 550px" priority={i === 0} />
            </div>
          ))}
        </div>
        {count > 1 && (
          <>
            <button type="button" className="tk-carousel__arrow tk-carousel__arrow--prev" aria-label="Anterior" onClick={() => go(index - 1)}>
              <Icon name="chevronLeft" />
            </button>
            <button type="button" className="tk-carousel__arrow tk-carousel__arrow--next" aria-label="Siguiente" onClick={() => go(index + 1)}>
              <Icon name="chevronRight" />
            </button>
          </>
        )}
      </div>
      {thumbs && count > 1 && (
        <div className="tk-slideshow__thumbs">
          <div
            className="tk-slideshow__strip"
            style={{ transform: `translateX(calc(-${Math.max(0, Math.min(index - 2, count - 5))} * ((100% - 40px) / 5 + 10px)))` }}
          >
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              className={`tk-slideshow__thumb${i === index ? " is-active" : ""}`}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => go(i)}
            >
              <Image src={src} alt="" fill sizes="110px" />
            </button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
