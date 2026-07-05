# mhshakouri.dev — Personal Website Plan

## Context

Hossein is a senior frontend/software engineer building his personal site at **mhshakouri.dev**. This is his first project with Claude Code, so the plan has two goals:

1. Ship a high-quality personal site (Next.js App Router, hosted on Cloudflare).
2. Set the project up so the workflow is **hybrid**: AI-driven when he wants speed, hands-on when he wants to write code himself — and always understandable and steerable.

The directory `/Users/hossein/Projects/personal/mhshakouri` is currently empty.

## Decisions (from Q&A)

- **Stack**: Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4
- **Content**: MDX files in `/content`, typed via **content-collections** (the maintained Contentlayer successor) — blog posts, projects, talks as type-safe collections
- **Hosting**: Cloudflare, deployed with **@opennextjs/cloudflare** (Cloudflare's current recommended path for Next.js; supports the server function we need for the contact form). Git-push-to-deploy from GitHub.
- **Design**: from scratch — define a small design-token system first (typography scale, color palette with dark mode, spacing) before building pages
- **v1 scope**: Home/About, Projects, Blog, Resume (+ PDF), Uses, Talks/OSS, Playground (interactive demos), Contact form

## Repo layout (target)

```
mhshakouri/
├── CLAUDE.md                  # project conventions & context for Claude
├── .claude/settings.json      # shared permissions/config
├── content/
│   ├── blog/*.mdx
│   ├── projects/*.mdx
│   └── talks/*.mdx
├── src/
│   ├── app/                   # App Router routes
│   │   ├── (site)/            # home, about, uses, resume, contact
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── playground/
│   │   └── api/contact/       # route handler → Resend email
│   ├── components/            # ui/ (primitives) + site/ (nav, footer…)
│   ├── lib/                   # utilities, seo helpers
│   └── styles/                # tailwind theme / design tokens
└── content-collections.ts
```

## Milestones

Each milestone is a small, reviewable chunk — commit at the end of each so the git history doubles as a learning trail.

### M0 — Foundation & Claude Code setup

- `git init`, create GitHub repo
- Scaffold Next.js with `create-next-app` (TypeScript, Tailwind, App Router, src dir)
- Strict TS config, ESLint + Prettier
- Write **CLAUDE.md**: stack, commands (`dev`, `build`, `lint`), conventions (naming, component patterns, "explain non-obvious changes"), and a note that Hossein wants to review diffs and understand changes — not just accept them
- First commit + push

### M1 — Design system

- Tailwind v4 theme: CSS custom properties for colors (light/dark), font pairing (e.g. a display font + system/sans body via `next/font`), spacing/typography scale
- Dark mode toggle (class strategy, no-flash script)
- Base layout: header/nav, footer, container; `ui/` primitives (Button, Link, Card, Prose)

### M2 — Core pages

- Home/About: intro, role, social links (GitHub/LinkedIn/email)
- Resume page from structured data (`src/data/resume.ts`) + print-stylesheet or generated PDF download
- Uses page (static MDX or simple page)

### M3 — Content layer & blog

- Set up content-collections with schemas for `blog`, `projects`, `talks`
- Blog index + `[slug]` pages with MDX rendering, code syntax highlighting (Shiki), reading time
- RSS feed, sitemap, `metadata` API for SEO/OpenGraph (+ dynamic OG images via `next/og` later if desired)

### M4 — Projects & Talks/OSS (DEFERRED post-launch — decided 2026-07-05)

- Reframed as **case studies of professional work** (Bama TypeScript migration,
  Tanincard fintech resilience, this website), not a repo-link portfolio grid.
  Structure per entry: Problem → Approach → Outcome (with numbers).
- Hidden from nav/sitemap until real content exists; content-collections
  schemas are already in place from M3.
- Talks/open-source section (can live on one page initially)

### M5 — Playground (hands-on, post-launch)

- `/playground` index; each demo is a self-contained client component route
- Good candidates for the **hands-on** track — build demos yourself, use Claude for review
- Uses page is also planned post-launch (guidelines session with Claude)

### M6 — Contact form

- Route handler `POST /api/contact` → send email via **Resend** (free tier); honeypot + basic rate limiting
- This is why we deploy with OpenNext rather than static export

### M7 — Deploy & domain

- `@opennextjs/cloudflare` setup, `wrangler.jsonc`, deploy via Cloudflare's git integration (preview deployments per PR)
- Point mhshakouri.dev DNS, set up redirects (www → apex)
- Analytics: Cloudflare Web Analytics (free, no cookies)
- Lighthouse pass: aim 95+ across the board

## Working model — hybrid AI + hands-on

This section is the "how to use Claude Code" answer, and its essence goes into CLAUDE.md:

- **CLAUDE.md** = persistent project memory: stack, commands, conventions, preferences. Claude reads it every session. Keep it short and current.
- **Plan mode** (shift+tab) for anything non-trivial: Claude proposes before touching code — the main steering tool.
- **Review every diff** at first; ask "walk me through what you changed and why" — cheap and fast way to keep full mental ownership.
- **Split the work deliberately**: let Claude do scaffolding, config, boilerplate, SEO plumbing; keep design decisions and playground demos hands-on. Claude reviews your code too (`/code-review` on a branch).
- **Small commits per milestone/feature** so everything is inspectable and revertable.
- **Skills** (`/init`, `/code-review`, `/verify`) are just packaged workflows — no setup needed now; custom skills/hooks can come later once the basics feel natural.

## Verification

- `npm run dev` after each milestone; check pages in the browser (Claude can use its preview tools to screenshot/inspect)
- `npm run lint && npm run build` must pass before each commit
- M3+: validate RSS/sitemap output, check OG tags with a link-preview checker
- M6: send a real test email through the contact form
- M7: verify production deploy on a preview URL before DNS cutover; run Lighthouse

## First session after approval (M0 scope only)

1. `git init` + scaffold `create-next-app`
2. Configure tooling (strict TS, Prettier)
3. Write CLAUDE.md together
4. Commit, create GitHub repo, push
