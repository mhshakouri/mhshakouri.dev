"""Terminal Cartography — blog header / OG image generator.

One fig per post, same visual system: near-black field, GeistMono
instrumentation, a single emerald signal, faint registry marks.

Usage:
  python3 scripts/generate-poster.py <slug> [<slug> ...]
  python3 scripts/generate-poster.py --all

Output: public/blog/<slug>.png  (2400x1260, ~1.9:1 — page header and OG card)

Requires: pip3 install pillow
Adding a new post's poster: write a draw_<name>(ctx) function and register
it in POSTERS with its fig number and caption.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path(__file__).resolve().parent / "poster-fonts"
OUT_DIR = ROOT / "public" / "blog"

S = 2  # supersample factor
W, H = 2400 * S, 1260 * S

BG = (10, 10, 10)
FG = (237, 237, 237)
MUTED = (128, 128, 128)
FAINT = (58, 58, 58)
GHOST = (23, 23, 23)
REGISTRY = (30, 30, 30)
LINE = (46, 46, 46)
ACCENT = (52, 211, 153)
ACCENT_DIM = (24, 90, 66)


class Ctx:
    """Drawing context with base-coordinate helpers (all coords in 2400x1260 space)."""

    def __init__(self):
        self.img = Image.new("RGB", (W, H), BG)
        self.d = ImageDraw.Draw(self.img)

    def font(self, name, size):
        return ImageFont.truetype(str(FONTS / f"{name}.ttf"), size * S)

    def mono(self, s):
        return self.font("GeistMono-Regular", s)

    def monob(self, s):
        return self.font("GeistMono-Bold", s)

    def text(self, xy, s, font, fill, anchor="la", tracking=0):
        x, y = xy[0] * S, xy[1] * S
        if tracking == 0:
            self.d.text((x, y), s, font=font, fill=fill, anchor=anchor)
            return
        widths = [self.d.textlength(ch, font=font) for ch in s]
        total = sum(widths) + tracking * S * (len(s) - 1)
        if anchor[0] == "m":
            x -= total / 2
        elif anchor[0] == "r":
            x -= total
        for ch, w in zip(s, widths):
            self.d.text((x, y), ch, font=font, fill=fill, anchor="l" + anchor[1])
            x += w + tracking * S

    def line(self, p1, p2, fill=LINE, width=2):
        self.d.line([p1[0] * S, p1[1] * S, p2[0] * S, p2[1] * S], fill=fill, width=width * S)

    def circle(self, c, r, outline=None, fill=None, width=2):
        x, y = c[0] * S, c[1] * S
        self.d.ellipse(
            [x - r * S, y - r * S, x + r * S, y + r * S],
            outline=outline, fill=fill, width=width * S,
        )

    def glow(self, c, layers=((110, 14), (78, 26), (50, 46))):
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        for r, a in layers:
            od.ellipse(
                [(c[0] - r) * S, (c[1] - r) * S, (c[0] + r) * S, (c[1] + r) * S],
                fill=(*ACCENT, a),
            )
        self.img = Image.alpha_composite(self.img.convert("RGBA"), overlay).convert("RGB")
        self.d = ImageDraw.Draw(self.img)

    def frame(self, fig, caption):
        """Shared chrome: survey marks, fig line, coordinates, brand."""
        for cx, cy in [(120, 110), (2280, 110), (120, 1150), (2280, 1150)]:
            self.line((cx - 14, cy), (cx + 14, cy), fill=FAINT, width=1)
            self.line((cx, cy - 14), (cx, cy + 14), fill=FAINT, width=1)
        self.text((170, 98), f"fig. {fig} — {caption}", self.mono(26), FAINT)
        self.text((2230, 98), "41.0082 N  28.9784 E", self.mono(26), FAINT, anchor="ra")
        self.text((2230, 1138), "mhshakouri.dev", self.mono(28), MUTED, anchor="rm")

    def registry(self, hashes, x=170, y0=1138):
        row = "   ".join(hashes)
        self.text((x, y0), row, self.mono(24), REGISTRY, anchor="lm")

    def save(self, slug):
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        out = OUT_DIR / f"{slug}.png"
        self.img.resize((W // S, H // S), Image.LANCZOS).save(out)
        print("saved", out)


# ---------------------------------------------------------------- fig. 00

def draw_building_this_site(c: Ctx):
    """Ghost braces, a schema validated line by line: the build as gatekeeper."""
    cx = 1200
    c.text((cx - 560, 630), "{", c.font("Outfit-Regular", 640), GHOST, anchor="mm")
    c.text((cx + 560, 630), "}", c.font("Outfit-Regular", 640), GHOST, anchor="mm")

    rows = [
        ("title:", "z.string()", True),
        ("description:", "z.string()", True),
        ("date:", "z.iso.date()", True),
        ("draft:", "z.boolean()", True),
    ]
    y = 420
    for key, val, ok in rows:
        c.text((cx - 330, y), key, c.mono(40), FG, anchor="lm")
        c.text((cx - 20, y), val, c.mono(40), MUTED, anchor="lm")
        if ok:
            kx = cx + 390
            c.line((kx, y + 4), (kx + 9, y + 14), fill=ACCENT, width=3)
            c.line((kx + 9, y + 14), (kx + 26, y - 10), fill=ACCENT, width=3)
        y += 130

    c.line((cx - 330, 890), (cx + 420, 890), fill=LINE, width=1)
    c.text((cx + 45, 950), "validated at build time", c.mono(34), MUTED, anchor="mm")


# ---------------------------------------------------------------- fig. 01

def draw_push_to_publish(c: Ctx):
    """The pipeline, west to east: push -> checks + build -> live in 100s."""
    Y = 590
    X0, X1 = 430, 1970
    pps = (X1 - X0) / 100.0

    def tx(sec):
        return X0 + sec * pps

    c.text((X0, Y - 310), "$ git push", c.monob(56), FG, anchor="lm")
    caret = X0 + c.d.textlength("$ git push", font=c.monob(56)) / S + 24
    c.d.rectangle([caret * S, (Y - 336) * S, (caret + 22) * S, (Y - 284) * S], fill=ACCENT)

    c.text((tx(50), Y + 6), "100", c.font("Outfit-Regular", 430), GHOST, anchor="mm")

    TOP, BOT = Y - 130, Y + 130
    c.line((tx(0), Y), (tx(6), Y), width=2)
    c.line((tx(6), Y), (tx(13), TOP), width=2)
    c.line((tx(6), Y), (tx(13), BOT), width=2)
    c.line((tx(13), TOP), (tx(82), TOP), width=2)
    c.line((tx(13), BOT), (tx(82), BOT), width=2)
    c.line((tx(82), TOP), (tx(89), Y), width=2)
    c.line((tx(82), BOT), (tx(89), Y), width=2)
    c.line((tx(89), Y), (tx(100), Y), width=2)

    c.circle((tx(0), Y), 15, outline=FG, width=3)
    c.text((tx(0), Y - 60), "commit", c.mono(34), FG, anchor="mm")
    c.text((tx(0), Y + 62), "t+0s", c.mono(30), MUTED, anchor="mm")

    c.circle((tx(38), TOP), 12, outline=FG, width=3)
    c.text((tx(38), TOP - 96), "github actions", c.mono(38), FG, anchor="mm")
    c.text((tx(38), TOP - 46), "lint · types · build", c.mono(30), MUTED, anchor="mm")

    c.circle((tx(34), BOT), 12, outline=FG, width=3)
    c.text((tx(34), BOT + 50), "workers builds", c.mono(38), FG, anchor="mm")
    c.circle((tx(72), BOT), 12, outline=FG, width=3)
    c.text((tx(72), BOT + 50), "deploy", c.mono(38), FG, anchor="mm")

    c.glow((tx(100), Y))
    c.circle((tx(100), Y), 18, fill=ACCENT)
    c.circle((tx(100), Y), 31, outline=ACCENT_DIM, width=2)
    c.text((tx(100), Y - 66), "live", c.monob(40), FG, anchor="mm")
    c.text((tx(100), Y + 64), "t+100s", c.mono(30), MUTED, anchor="mm")

    RY = 1010
    c.line((X0, RY), (X1, RY), fill=LINE, width=1)
    for sec in range(0, 101, 10):
        major = sec % 50 == 0
        c.line((tx(sec), RY), (tx(sec), RY + (20 if major else 10)),
               fill=LINE if major else FAINT, width=1)
        if major:
            c.text((tx(sec), RY + 56), f"{sec}s", c.mono(28), MUTED, anchor="mm")


POSTERS = {
    "building-this-site": ("00", "building this site", draw_building_this_site,
                           ["8a92621", "6440915", "d2602ee", "3882e00", "8f0dbbd"]),
    "push-to-publish": ("01", "push to publish", draw_push_to_publish,
                        ["6a5d55d", "a3b1c10", "bb5cb26", "a9af5dd", "5176684"]),
}


def render(slug):
    fig, caption, draw, hashes = POSTERS[slug]
    c = Ctx()
    draw(c)
    c.frame(fig, caption)
    c.registry(hashes)
    c.save(slug)


if __name__ == "__main__":
    args = sys.argv[1:]
    slugs = POSTERS.keys() if "--all" in args else args
    if not slugs:
        sys.exit(f"usage: {sys.argv[0]} <slug>|--all   (known: {', '.join(POSTERS)})")
    for slug in slugs:
        render(slug)
