#!/usr/bin/env python3
"""Turn extracted page blocks into the app's data file and download page images.

Usage: python3 -I scripts/build-toketukcanarias-pages.py <pages.json> <survey_dir>
  pages.json  output of extract-toketukcanarias.py
  survey_dir  per-page JSON captured from the live DOM (map iframes, post meta)
Writes src/components/sites/toketukcanarias/pages.json and public/sites/toketukcanarias/pages/*.
"""
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public/sites/toketukcanarias/pages")
WEB = "/sites/toketukcanarias/pages"
OUT = os.path.join(ROOT, "src/components/sites/toketukcanarias/pages.json")

KIND = {
    "tours": "listing", "tours-tenerife": "listing", "tours-gran-canaria": "listing", "tours-lanzarote": "listing",
    "aviso-legal": "legal", "politica-de-cookies": "legal", "politica-de-privacidad": "legal",
    "condiciones-generales-de-contratacion-cgc": "legal",
    "quienes-somos": "about", "colaboraciones-especiales": "collab", "gracias-por-su-compra": "thanks",
    "construction": "soon", "blog": "blog", "puerto-de-la-cruz-5-razones-para-descubrir": "post",
}

downloaded = {}


def fetch(url):
    """Download url once into PUB, return its public path."""
    if not url:
        return url
    if url in downloaded:
        return downloaded[url]
    name = re.sub(r"[^A-Za-z0-9._-]", "-", "-".join(url.split("/wp-content/uploads/")[-1].split("/")))
    path = os.path.join(PUB, name)
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r, open(path, "wb") as f:
            f.write(r.read())
        print("downloaded", name)
    downloaded[url] = f"{WEB}/{name}"
    return downloaded[url]


def main(pages_json, survey_dir):
    os.makedirs(PUB, exist_ok=True)
    pages = json.load(open(pages_json, encoding="utf-8"))
    out = {}
    for slug, page in pages.items():
        survey = {}
        sp = os.path.join(survey_dir, slug + ".json")
        if os.path.exists(sp):
            survey = json.load(open(sp, encoding="utf-8"))
        maps = [u for u in survey.get("iframes", []) if "maps.google" in u or "google.com/maps" in u]
        blocks = []
        for b in page["blocks"]:
            t = b["type"]
            if t in ("navmenu", "post-navigation", "reviews", "posts") and t != "reviews":
                if t == "posts":
                    blocks.append({"type": "posts"})
                continue
            if t == "carousel":
                b["images"] = [fetch(u) for u in b["images"]]
            elif t in ("card",):
                b["image"] = fetch(b["image"])
            elif t == "image":
                b["src"] = fetch(b["src"])
            elif t == "map":
                b["src"] = maps.pop(0) if maps else b["src"]
            blocks.append(b)
        entry = {
            "kind": KIND.get(slug, "tour"),
            "title": page["title"],
            "blocks": blocks,
        }
        if slug == "blog":
            bg = [x["bg"] for x in survey.get("bgs", []) if "/2026/03/33" in x["bg"]]
            entry["hero"] = fetch(bg[0]) if bg else ""
        if slug == "puerto-de-la-cruz-5-razones-para-descubrir":
            entry["banner"] = fetch("https://toketukcanarias.com/wp-content/uploads/2026/09/Blog-Banner-2.jpg")
            entry["date"] = "julio 13, 2026"
            entry["author"] = "Giona Sophia Schauf"
            entry["thumb"] = fetch("https://toketukcanarias.com/wp-content/uploads/2026/03/34-768x512.jpg")
            entry["excerpt"] = "Si buscas una experiencia auténtica en Tenerife, alejada de las zonas más turísticas del sur, Puerto de la Cruz es tu destino. Esta ciudad costera"
            entry["listDate"] = "13.07.2026"
        out[slug] = entry
    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wrote", OUT, len(out), "pages")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
