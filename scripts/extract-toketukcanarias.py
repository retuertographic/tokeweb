#!/usr/bin/env python3
"""Extract structured content blocks from saved toketukcanarias.com page HTML.

Usage: python3 -I scripts/extract-toketukcanarias.py docs/research/toketukcanarias/pages OUT.json
Each page becomes an ordered list of Elementor widgets turned into simple blocks.
"""
import html as H
import json
import re
import sys
from html.parser import HTMLParser

ALLOWED = {"p", "strong", "b", "em", "i", "br", "ul", "ol", "li", "a", "h1", "h2", "h3", "h4", "h5", "h6", "span", "u", "hr", "table", "tbody", "thead", "tr", "td", "th"}
SITE = "https://toketukcanarias.com"


class Cleaner(HTMLParser):
    """Keep a small tag whitelist, drop attributes except href/target."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg"):
            self.skip += 1
            return
        if self.skip:
            return
        if tag == "img":
            a = dict(attrs)
            if "emoji" in (a.get("class") or ""):
                self.out.append(H.escape(a.get("alt", "")))
            return
        if tag not in ALLOWED or tag == "span":
            return
        keep = ""
        if tag == "a":
            href = dict(attrs).get("href", "")
            if href.startswith(SITE):
                href = href[len(SITE):] or "/"
            keep = f' href="{H.escape(href)}"'
        self.out.append(f"<{tag}{keep}>")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg"):
            self.skip -= 1
            return
        if self.skip or tag not in ALLOWED or tag in ("span", "br", "hr"):
            return
        self.out.append(f"</{tag}>")

    def handle_startendtag(self, tag, attrs):
        if tag in ("br", "hr") and not self.skip:
            self.out.append(f"<{tag} />")
        else:
            self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        if not self.skip:
            self.out.append(H.escape(data, quote=False))


def clean(fragment):
    c = Cleaner()
    c.feed(fragment)
    s = "".join(c.out)
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"<p>\s*(&nbsp;| )?\s*</p>", "", s)
    s = s.replace("<br /> </p>", "</p>")
    return s.strip()


def text(fragment):
    return H.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", fragment))).strip()


def widget_spans(page):
    """Yield (type, inner_html) for each widget in document order (non-nested)."""
    for m in re.finditer(r'<div class="elementor-element[^"]*elementor-widget[^"]*"[^>]*data-widget_type="([^"]+)"[^>]*>', page):
        start = m.end()
        # find matching closing div by depth counting
        depth = 1
        for t in re.finditer(r"<div\b|</div>", page[start:]):
            depth += 1 if t.group(0) == "<div" else -1
            if depth == 0:
                yield m.group(1), page[start:start + t.start()], m.group(0)
                break


def local(href):
    href = H.unescape(href)
    return href[len(SITE):] if href.startswith(SITE) else href


def parse_widget(kind, inner, opening):
    k = kind.split(".")[0]
    if k == "html":
        m = re.search(r'load-turitop"[^>]*data-service="([^"]+)"', inner)
        if m:
            return {"type": "turitop", "service": m.group(1)}
        return {"type": "rawhtml", "html": clean(inner)}
    if k in ("heading", "theme-post-title"):
        m = re.search(r"<(h[1-6]|p|div|span)[^>]*elementor-heading-title[^>]*>(.*?)</\1>", inner, re.S)
        tag = m.group(1) if m else "h2"
        return {"type": "heading", "tag": tag, "html": clean(m.group(2) if m else inner)}
    if k in ("text-editor", "theme-post-content"):
        return {"type": "text", "html": clean(inner)}
    if k == "media-carousel":
        imgs = re.findall(r"background-image: url\(&#039;([^&]+)&#039;\)", inner)
        seen = []
        for i in imgs:
            if i not in seen:
                seen.append(i)
        return {"type": "carousel", "images": seen, "thumbs": "elementor-thumbnails-swiper" in inner}
    if k == "google_maps":
        m = re.search(r'src="([^"]+)"', inner)
        return {"type": "map", "src": H.unescape(m.group(1)) if m else ""}
    if k == "toggle":
        items = []
        for q, a in re.findall(r'elementor-tab-title[^>]*>(.*?)</div>\s*<div[^>]*elementor-tab-content[^>]*>(.*?)</div>', inner, re.S):
            items.append({"q": text(q), "a": clean(a)})
        return {"type": "faq", "items": items}
    if k == "call-to-action":
        bg = re.search(r"background-image: url\(([^)]+)\)", inner)
        title = re.search(r'elementor-cta__title[^>]*>(.*?)</', inner, re.S)
        desc = re.search(r'elementor-cta__description[^>]*>(.*?)</div>', inner, re.S)
        btn = re.search(r'elementor-cta__button[^>]*>(.*?)</', inner, re.S)
        href = re.search(r'<a[^>]*href="([^"]+)"', inner)
        return {"type": "card", "image": H.unescape(bg.group(1)).strip("'\"") if bg else "", "title": text(title.group(1)) if title else "",
                "text": text(desc.group(1)) if desc else "", "button": text(btn.group(1)) if btn else "", "href": local(href.group(1)) if href else ""}
    if k in ("image", "theme-post-featured-image"):
        m = re.search(r'<img[^>]*src="([^"]+)"', inner)
        a = re.search(r'<a[^>]*href="([^"]+)"', inner)
        return {"type": "image", "src": m.group(1) if m else "", "href": local(a.group(1)) if a else ""}
    if k == "button":
        a = re.search(r'<a[^>]*href="([^"]+)"', inner)
        return {"type": "button", "text": text(inner), "href": local(a.group(1)) if a else ""}
    if k == "reviews":
        return {"type": "reviews"}
    if k == "posts":
        return {"type": "posts"}
    if k == "post-info":
        return {"type": "postinfo", "text": text(inner)}
    if k == "nav-menu":
        return {"type": "navmenu", "text": text(inner)}
    return {"type": k, "text": text(inner)[:200]}


def main(src_dir, out):
    import os
    result = {}
    for f in sorted(os.listdir(src_dir)):
        if not f.endswith(".html"):
            continue
        s = open(os.path.join(src_dir, f), encoding="utf-8").read()
        m = re.search(r'data-elementor-type="(wp-page|wp-post|single-post|single-page|archive)".*?(?=<footer[^>]*data-elementor-type="footer")', s, re.S)
        page = m.group(0) if m else s
        page = re.sub(r"<script.*?</script>", "", page, flags=re.S)
        page = re.sub(r"<style.*?</style>", "", page, flags=re.S)
        title = re.search(r"<title>(.*?)</title>", s, re.S)
        desc = re.search(r'<meta name="description" content="([^"]*)"', s)
        blocks = [parse_widget(k, inner, op) for k, inner, op in widget_spans(page)]
        result[f[:-5]] = {"title": H.unescape(title.group(1)).strip() if title else "", "description": H.unescape(desc.group(1)) if desc else "", "blocks": blocks}
    json.dump(result, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
