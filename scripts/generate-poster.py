"""Terminal Cartography - blog header / OG image generator.

One fig per post, same visual system: near-black field, GeistMono
instrumentation, a single emerald signal, faint registry marks.

Usage:
  python3 scripts/generate-poster.py <slug> [<slug> ...]
  python3 scripts/generate-poster.py --all

Output: public/blog/<slug>.png  (2400x1260, ~1.9:1 - page header and OG card)

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
# 4:5 social variants are not served by the site, so they stay out of public/.
SOCIAL_DIR = ROOT / "assets" / "social"

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
    """Drawing context in base coordinates (2400 wide, `height` tall).

    `dy` shifts every subsequent drawing call down, which is how the portrait
    social variant reuses a landscape fig's draw function unchanged."""

    def __init__(self, height=1260):
        self.height = height
        self.W = W
        self.H = height * S
        self.dy = 0
        self.img = Image.new("RGB", (self.W, self.H), BG)
        self.d = ImageDraw.Draw(self.img)

    def font(self, name, size):
        return ImageFont.truetype(str(FONTS / f"{name}.ttf"), size * S)

    def mono(self, s):
        return self.font("GeistMono-Regular", s)

    def monob(self, s):
        return self.font("GeistMono-Bold", s)

    def text(self, xy, s, font, fill, anchor="la", tracking=0):
        x, y = xy[0] * S, (xy[1] + self.dy) * S
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
        self.d.line(
            [p1[0] * S, (p1[1] + self.dy) * S, p2[0] * S, (p2[1] + self.dy) * S],
            fill=fill, width=width * S,
        )

    def rect(self, p1, p2, fill):
        self.d.rectangle(
            [p1[0] * S, (p1[1] + self.dy) * S, p2[0] * S, (p2[1] + self.dy) * S],
            fill=fill,
        )

    def circle(self, c, r, outline=None, fill=None, width=2):
        x, y = c[0] * S, (c[1] + self.dy) * S
        self.d.ellipse(
            [x - r * S, y - r * S, x + r * S, y + r * S],
            outline=outline, fill=fill, width=width * S,
        )

    def glow(self, c, layers=((110, 14), (78, 26), (50, 46))):
        cx, cy = c[0], c[1] + self.dy
        overlay = Image.new("RGBA", (self.W, self.H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        for r, a in layers:
            od.ellipse(
                [(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S],
                fill=(*ACCENT, a),
            )
        self.img = Image.alpha_composite(self.img.convert("RGBA"), overlay).convert("RGB")
        self.d = ImageDraw.Draw(self.img)

    def frame(self, fig, caption):
        """Shared chrome: survey marks, fig line, coordinates, brand."""
        self.dy = 0
        bottom = self.height - 110
        for cx, cy in [(120, 110), (2280, 110), (120, bottom), (2280, bottom)]:
            self.line((cx - 14, cy), (cx + 14, cy), fill=FAINT, width=1)
            self.line((cx, cy - 14), (cx, cy + 14), fill=FAINT, width=1)
        self.text((170, 98), f"fig. {fig} · {caption}", self.mono(26), FAINT)
        self.text((2230, 98), "41.0082 N  28.9784 E", self.mono(26), FAINT, anchor="ra")
        self.text((2230, self.height - 122), "mhshakouri.dev", self.mono(28), MUTED,
                  anchor="rm")

    def registry(self, hashes, x=170):
        self.dy = 0
        row = "   ".join(hashes)
        self.text((x, self.height - 122), row, self.mono(24), REGISTRY, anchor="lm")

    def title_block(self, lines, hook, y=700, leading=128):
        """Portrait only: the post title, so the image carries meaning in-feed."""
        self.dy = 0
        for i, line in enumerate(lines):
            self.text((170, y + i * leading), line, self.monob(92), FG, anchor="lm")
        self.text((170, y + len(lines) * leading + 32), hook, self.mono(38), MUTED,
                  anchor="lm")

    def save(self, path):
        path.parent.mkdir(parents=True, exist_ok=True)
        self.img.resize((self.W // S, self.H // S), Image.LANCZOS).save(path)
        print("saved", path)


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
    c.rect((caret, Y - 336), (caret + 22, Y - 284), fill=ACCENT)

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


# ---------------------------------------------------------------- fig. 02

def draw_spec_driven_development_with_ai(c: Ctx):
    """The pricing model that took three attempts: product owns the schema,
    listings are offerings, entries are the dated series that becomes a chart."""
    c.text((1560, 700), "v3", c.font("Outfit-Regular", 400), GHOST, anchor="mm")

    # The two rejected models, struck through, for whoever leans in.
    for y, label in [(206, "v1  price on the product"),
                     (252, "v2  attributes on each row")]:
        c.text((170, y), label, c.mono(26), REGISTRY, anchor="lm")
        width = c.d.textlength(label, font=c.mono(26)) / S
        c.line((170, y), (170 + width, y), fill=REGISTRY, width=1)

    PROD_X, LIST_X = 440, 940
    c.text((PROD_X, 560), "product", c.mono(38), FG, anchor="mm")
    c.text((PROD_X, 715), "owns the schema", c.mono(26), MUTED, anchor="mm")
    c.text((LIST_X, 375), "price listings", c.mono(38), FG, anchor="mm")
    c.text((LIST_X, 418), "one per producer", c.mono(26), MUTED, anchor="mm")

    listings = [470, 640, 810]
    for y in listings:
        c.line((PROD_X, 640), (LIST_X, y), width=2)
    c.circle((PROD_X, 640), 15, outline=FG, width=3)
    for y in listings:
        c.circle((LIST_X, y), 12, outline=FG, width=3)

    # The two outer listings carry their own series; hinted, not drawn.
    for y in (470, 810):
        c.line((LIST_X + 20, y), (1120, y), fill=FAINT, width=1)
        for dot_x in (1152, 1184, 1216):
            c.circle((dot_x, y), 4, fill=REGISTRY)

    c.text((1660, 452), "price entries", c.mono(38), FG, anchor="mm")
    c.text((1660, 495), "one dated series per listing", c.mono(26), MUTED,
           anchor="mm")

    series = [(1260, 700), (1400, 682), (1540, 712), (1680, 648),
              (1820, 660), (1940, 600), (2060, 548)]
    c.line((LIST_X + 20, 640), series[0], width=2)
    for a, b in zip(series, series[1:]):
        c.line(a, b, fill=ACCENT, width=2)
    for x, y in series[:-1]:
        c.circle((x, y), 6, fill=MUTED)

    AXIS_Y = 880
    c.line((series[0][0], AXIS_Y), (series[-1][0], AXIS_Y), fill=LINE, width=1)
    for x, _ in series:
        c.line((x, AXIS_Y), (x, AXIS_Y + 12), fill=FAINT, width=1)
    c.text((1660, 938), "stored gregorian · displayed shamsi", c.mono(26),
           FAINT, anchor="mm")

    c.glow(series[-1])
    c.circle(series[-1], 16, fill=ACCENT)
    c.circle(series[-1], 29, outline=ACCENT_DIM, width=2)

    c.text((1200, 1052), "the specs are the work", c.mono(34), MUTED,
           anchor="mm")



# ---------------------------------------------------------------- fig. 03

def draw_the_validator_cannot_see_quality(c: Ctx):
    """A scorecard where everything passed. No warning colour anywhere, because
    that absence is the whole point: nothing flagged the wrong answer."""
    c.text((1200, 660), "8/8", c.font("Outfit-Regular", 520), GHOST, anchor="mm")

    LEFT = 300
    c.text((LEFT, 300), "checks", c.mono(34), FG)
    c.text((LEFT, 344), "every one a machine can run", c.mono(26), MUTED)

    checks = [
        "persian script",
        "fits the squares",
        "one word",
        "no arabic letters",
        "no zero-width joiner",
    ]
    y = 440
    for label in checks:
        kx = LEFT
        c.line((kx, y + 2), (kx + 9, y + 12), fill=ACCENT, width=3)
        c.line((kx + 9, y + 12), (kx + 26, y - 12), fill=ACCENT, width=3)
        c.text((LEFT + 54, y), label, c.mono(32), FG, anchor="lm")
        y += 78

    c.line((LEFT, 860), (LEFT + 620, 860), fill=LINE, width=1)
    c.text((LEFT, 906), "8 of 8, passed", c.mono(30), MUTED, anchor="lm")

    RIGHT = 1360
    c.text((RIGHT, 300), "the answer it passed", c.mono(34), FG)
    c.text((RIGHT, 344), "theme: birds", c.mono(26), MUTED)
    # Name the app, because this image travels on its own.
    c.text((RIGHT, 384), "arrowword.mhshakouri.dev", c.mono(26), FAINT)

    rows = [("paw", "offered as a falcon"), ("leopard", "described as a bird")]
    # Connector starts past the widest word, so both rows align and neither touches.
    widest = max(c.d.textlength(w, font=c.monob(48)) for w, _ in rows) / S
    dash = RIGHT + widest + 40
    y = 460
    for word, gloss in rows:
        c.text((RIGHT, y), word, c.monob(48), FG, anchor="lm")
        c.line((dash, y), (dash + 60, y), fill=LINE, width=2)
        c.text((dash + 90, y), gloss, c.mono(32), MUTED, anchor="lm")
        y += 130

    c.text((RIGHT, 906), "nothing flagged either one", c.mono(30), MUTED, anchor="lm")

    c.text((1200, 1050), "well formed is not the same as right", c.mono(34), MUTED,
           anchor="mm")


POSTERS = {
    "building-this-site": ("00", "building this site", draw_building_this_site,
                           ["8a92621", "6440915", "d2602ee", "3882e00", "8f0dbbd"]),
    "push-to-publish": ("01", "push to publish", draw_push_to_publish,
                        ["6a5d55d", "a3b1c10", "bb5cb26", "a9af5dd", "5176684"]),
    "the-validator-cannot-see-quality": (
        "03",
        "the validator cannot see quality",
        draw_the_validator_cannot_see_quality,
        ["8dc0597", "f705222", "a0d068e", "632ec02", "8a3b6c3"],
    ),
    "spec-driven-development-with-ai": ("02", "spec-driven development",
                                        draw_spec_driven_development_with_ai,
                                        ["a925311", "4c75d3f", "5176684",
                                         "e09d750", "8b4376a"]),
}


# Title and hook for the 4:5 social variant. Keep title lines under ~34 chars
# so they fit at 84pt; the hook is one line of context for people who scroll past.
SOCIAL = {
    "the-validator-cannot-see-quality": (
        ["The validator cannot", "tell you the answer", "is good"],
        "it scored 8 of 8 while calling a leopard a bird.",
    ),
    "spec-driven-development-with-ai": (
        ["Spec-driven", "development with AI:", "what actually broke"],
        "the model built my wrong design perfectly. twice.",
    ),
}


def site_path(slug):
    return f"mhshakouri.dev/blog/{slug}"


def render(slug):
    fig, caption, draw, hashes = POSTERS[slug]
    c = Ctx()
    draw(c)
    c.frame(fig, caption)
    c.registry(hashes)
    c.save(OUT_DIR / f"{slug}.png")


def render_social(slug):
    """4:5 portrait for LinkedIn: same fig, shifted down, title above it."""
    if slug not in SOCIAL:
        sys.exit(f"no SOCIAL entry for {slug}; add title lines and a hook first")
    fig, caption, draw, hashes = POSTERS[slug]
    title, hook = SOCIAL[slug]
    c = Ctx(height=3000)
    c.dy = 1300
    draw(c)
    c.title_block(title, hook)
    c.text((1200, 2650), f"full write-up · {site_path(slug)}", c.mono(40), MUTED,
           anchor="mm")
    c.frame(fig, caption)
    c.registry(hashes)
    c.save(SOCIAL_DIR / f"{slug}-4x5.png")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    slugs = list(POSTERS) if "--all" in flags else args
    if not slugs:
        sys.exit(
            f"usage: {sys.argv[0]} <slug>|--all [--social]\n"
            f"  known: {', '.join(POSTERS)}"
        )
    for slug in slugs:
        if "--social" in flags:
            render_social(slug)
        else:
            render(slug)
