import Image from "next/image";
import Link from "next/link";
import "./pages.css";
import { Carousel } from "./Carousel";
import { Faq } from "./Faq";
import { Slideshow } from "./Slideshow";
import { SiteShell } from "./SiteShell";
import { Turitop } from "./Turitop";
import { testimonials } from "./data";
import rawPages from "./pages.json";

type Block =
  | { type: "turitop"; service: string }
  | { type: "heading"; tag: string; html: string }
  | { type: "text"; html: string }
  | { type: "carousel"; images: string[]; thumbs: boolean }
  | { type: "map"; src: string }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "card"; image: string; title: string; text: string; button: string; href: string }
  | { type: "image"; src: string; href: string; w: number; h: number }
  | { type: "button"; text: string; href: string }
  | { type: "reviews" }
  | { type: "posts" }
  | { type: "postinfo"; text: string };

export type PageKind = "tour" | "listing" | "legal" | "about" | "collab" | "thanks" | "soon" | "blog" | "post";

export type PageData = {
  kind: PageKind;
  title: string;
  blocks: Block[];
  hero?: string;
  banner?: string;
  date?: string;
  author?: string;
  thumb?: string;
  excerpt?: string;
  listDate?: string;
};

export const pages = rawPages as unknown as Record<string, PageData>;
const POST_SLUG = "puerto-de-la-cruz-5-razones-para-descubrir";

/** Trusted HTML extracted (and whitelisted) from the source site by scripts/extract-toketukcanarias.py. */
function Rich({ html, className }: { html: string; className?: string }) {
  return <div className={`tk-rich${className ? ` ${className}` : ""}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function HeadingHtml({ html, className }: { html: string; className: string }) {
  return <h2 className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const of = <T extends Block["type"]>(blocks: Block[], type: T) =>
  blocks.filter((b): b is Extract<Block, { type: T }> => b.type === type);

function Testimonials() {
  return (
    <div className="tk-testimonials">
      <Carousel perView={[1, 1]} label="Opiniones de clientes">
        {testimonials.map((t) => (
          <div className="tk-testimonial" key={t.name}>
            <div className="tk-testimonial__header">
              <div className="tk-testimonial__name">{t.name}</div>
              <div className="tk-testimonial__title">{t.country} • Verficado</div>
            </div>
            <div className="tk-testimonial__text">{t.text}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

function TourPage({ page }: { page: PageData }) {
  const b = page.blocks;
  const turitop = of(b, "turitop")[0];
  const headings = of(b, "heading");
  const texts = of(b, "text");
  const carousel = of(b, "carousel")[0];
  const map = of(b, "map")[0];
  const faqs = of(b, "faq");
  const mapTitle = headings.find((h) => h.html.includes("Lugar de Salida"));
  const faqTitle = headings.find((h) => h.html.includes("Preguntas"));
  return (
    <div className="tk-page tk-page--tour">
      {turitop && <Turitop service={turitop.service} />}
      <section className="tk-gray">
        <div className="tk-gray__inner">
          <HeadingHtml html={headings[0].html} className="tk-h2-bold" />
          {texts[0] && <Rich html={texts[0].html} className="tk-tour__intro" />}
          <div className="tk-tour__grid">
            {carousel && <Slideshow images={carousel.images} thumbs={carousel.thumbs} />}
            <div className="tk-rich">
              {texts.slice(1).map((t, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: t.html }} />
              ))}
            </div>
          </div>
          {mapTitle && <HeadingHtml html={mapTitle.html} className="tk-h2-bold tk-tour__map-title" />}
          {map && <iframe className="tk-map" src={map.src} title="Lugar de salida" loading="lazy" />}
        </div>
      </section>
      {faqs.length > 0 && (
        <section className="tk-gray tk-faq tk-faq--tour">
          <div className="tk-gray__inner">
            {faqTitle && <HeadingHtml html={faqTitle.html} className="tk-h2-bold" />}
            {faqs.map((f, i) => (
              <Faq key={i} items={f.items} html />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ListingPage({ page }: { page: PageData }) {
  const groups: { title: string; cards: Extract<Block, { type: "card" }>[] }[] = [];
  let pageTitle = "";
  for (const block of page.blocks) {
    if (block.type === "heading") {
      if (!pageTitle) pageTitle = block.html;
      else groups.push({ title: block.html, cards: [] });
    } else if (block.type === "card" && groups.length) {
      groups[groups.length - 1].cards.push(block);
    }
  }
  const hasReviews = page.blocks.some((x) => x.type === "reviews");
  return (
    <div className="tk-page tk-page--listing">
      <div className="tk-listing">
        <HeadingHtml html={pageTitle} className="tk-listing__title" />
        {groups.map((g) => (
          <section key={g.title}>
            <HeadingHtml html={g.title} className="tk-listing__sub" />
            <div className={`tk-listing__grid tk-listing__grid--${Math.min(g.cards.length, 3)}`}>
              {g.cards.map((c) => (
                <Link className="tk-lcard" href={c.href} key={c.href}>
                  <div className="tk-lcard__img">
                    <Image src={c.image} alt="" fill sizes="317px" />
                  </div>
                  <div className="tk-lcard__body">
                    <h2 className="tk-lcard__title">{c.title}</h2>
                    {c.text && <div className="tk-lcard__text">{c.text}</div>}
                    <span className="tk-lcard__btn">{c.button || "Ver más"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      {hasReviews && (
        <section className="tk-listing-reviews">
          <Testimonials />
        </section>
      )}
    </div>
  );
}

function LegalPage({ page }: { page: PageData }) {
  const title = of(page.blocks, "heading")[0];
  return (
    <div className="tk-page tk-page--legal">
      <div className="tk-legal">
        <HeadingHtml html={title.html} className="tk-legal__title" />
        {of(page.blocks, "text").map((t, i) => (
          <Rich key={i} html={t.html} />
        ))}
      </div>
    </div>
  );
}

function Img({ block, className }: { block: Extract<Block, { type: "image" }>; className?: string }) {
  return (
    <div className={className}>
      <Image src={block.src} alt="" width={block.w} height={block.h} sizes="(max-width: 767px) 100vw, 540px" />
    </div>
  );
}

function AboutPage({ page }: { page: PageData }) {
  const [title, sub] = of(page.blocks, "heading");
  const [t1, t2, t3] = of(page.blocks, "text");
  const [i1, i2, i3] = of(page.blocks, "image");
  return (
    <div className="tk-page tk-page--about">
      <div className="tk-about-page">
        <HeadingHtml html={title.html} className="tk-about-page__title" />
        <div className="tk-about-row">
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: sub.html }} />
            <Rich html={t1.html} />
          </div>
          <Img block={i1} className="tk-about-row__img" />
        </div>
        <div className="tk-about-row tk-about-row--reverse">
          <Img block={i2} className="tk-about-row__img" />
          <Rich html={t2.html} />
        </div>
        <div className="tk-about-row">
          <Rich html={t3.html} />
          <Img block={i3} className="tk-about-row__img" />
        </div>
      </div>
    </div>
  );
}

function CollabPage({ page }: { page: PageData }) {
  const title = of(page.blocks, "heading")[0];
  const text = of(page.blocks, "text")[0];
  const image = of(page.blocks, "image")[0];
  const button = of(page.blocks, "button")[0];
  return (
    <div className="tk-page tk-page--collab">
      <div className="tk-collab">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: title.html }} />
          <Rich html={text.html} />
        </div>
        <div className="tk-collab__side">
          <Image src={image.src} alt="AMATE – Asociación de Cáncer de Mama de Tenerife" width={image.w} height={image.h} sizes="316px" />
          {button && (
            <a className="tk-teal-btn" href={button.href} target="_blank" rel="noopener noreferrer">
              {button.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ThanksPage({ page }: { page: PageData }) {
  const title = of(page.blocks, "heading")[0];
  const carousel = of(page.blocks, "carousel")[0];
  const text = of(page.blocks, "text")[0];
  return (
    <div className="tk-page tk-page--thanks">
      <section className="tk-thanks">
        <HeadingHtml html={title.html} className="tk-h2-bold" />
        <div className="tk-tour__grid">
          {carousel && <Slideshow images={carousel.images} thumbs={false} />}
          <Rich html={text.html} />
        </div>
      </section>
    </div>
  );
}

function SoonPage({ page }: { page: PageData }) {
  const title = of(page.blocks, "heading")[0];
  const image = of(page.blocks, "image")[0];
  return (
    <div className="tk-page tk-page--soon">
      <div className="tk-soon">
        <h2 dangerouslySetInnerHTML={{ __html: title.html }} />
        <Image src={image.src} alt="Descubre Tenerife como nunca antes – Reserva online" width={image.w} height={image.h} sizes="(max-width: 1160px) 100vw, 1140px" />
      </div>
    </div>
  );
}

function PostCard() {
  const post = pages[POST_SLUG];
  const href = `/${POST_SLUG}/`;
  const title = of(post.blocks, "heading")[0];
  return (
    <article className="tk-post-card">
      <Link className="tk-post-card__img" href={href}>
        {post.thumb && <Image src={post.thumb} alt="" fill sizes="(max-width: 767px) 100vw, 467px" />}
      </Link>
      <div className="tk-post-card__body">
        <h3>
          <Link href={href} dangerouslySetInnerHTML={{ __html: title.html }} />
        </h3>
        <div className="tk-post-card__meta">
          {post.author} - {post.listDate}
        </div>
        <p>{post.excerpt}</p>
        <Link className="tk-post-card__more" href={href}>
          Lee más
        </Link>
      </div>
    </article>
  );
}

function BlogPage({ page }: { page: PageData }) {
  const title = of(page.blocks, "heading")[0];
  return (
    <div className="tk-page tk-page--blog">
      <div className="tk-blog__head">
        <h1 dangerouslySetInnerHTML={{ __html: title.html }} />
      </div>
      <div className="tk-blog__hero">
        <div style={{ backgroundImage: `url(${page.hero})` }} role="img" aria-label="Tuk tuk frente a la costa de Puerto de la Cruz" />
      </div>
      <div className="tk-blog__list">
        <PostCard />
      </div>
    </div>
  );
}

function PostPage({ page }: { page: PageData }) {
  const [title, more] = of(page.blocks, "heading");
  const image = of(page.blocks, "image")[0];
  const content = of(page.blocks, "text")[0];
  return (
    <div className="tk-page tk-page--post">
      <div className="tk-post__banner" style={{ backgroundImage: `url(${page.banner})` }}>
        <h1 dangerouslySetInnerHTML={{ __html: title.html }} />
      </div>
      <div className="tk-post__body">
        <article>
          <div className="tk-post__meta">
            <span>{page.date}</span>
            <span>{page.author}</span>
          </div>
          {image && (
            <div className="tk-post__img">
              <Image src={image.src} alt="" fill sizes="(max-width: 1024px) 100vw, 744px" priority />
            </div>
          )}
          {content && <Rich html={content.html} className="tk-post__content" />}
        </article>
        <aside className="tk-post__side">{more && <h2 dangerouslySetInnerHTML={{ __html: more.html }} />}</aside>
      </div>
    </div>
  );
}

const renderers: Record<PageKind, (p: { page: PageData }) => React.ReactNode> = {
  tour: TourPage,
  listing: ListingPage,
  legal: LegalPage,
  about: AboutPage,
  collab: CollabPage,
  thanks: ThanksPage,
  soon: SoonPage,
  blog: BlogPage,
  post: PostPage,
};

export function SitePage({ slug }: { slug: string }) {
  const page = pages[slug];
  const Render = renderers[page.kind];
  return (
    <SiteShell>
      <Render page={page} />
    </SiteShell>
  );
}
