<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# mhshakouri.dev

Personal website of Hossein Shakouri (senior frontend/software engineer).
Live at https://mhshakouri.dev. Full plan and milestones: see `docs/PLAN.md`.

CI: GitHub Actions (`.github/workflows/ci.yml`) runs build, lint, typecheck,
and format:check on PRs and main. Build must run first - it generates
`.content-collections/`, which the tsconfig alias needs for typecheck.
Note: Prettier must never format MDX (`*.mdx` is in .prettierignore) - its
markdown parser corrupts JSX comments.

CD: Cloudflare Workers Builds (dashboard git integration) builds and deploys
every push to main - pushing to main IS publishing. The CI workflow holds no
Cloudflare credentials by design; `npm run deploy` remains as manual fallback.
Draft posts (`draft: true`) are safe on main: excluded from prod builds.

## Stack

- Next.js 16 (App Router, `src/` dir, Turbopack) + TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- Content: MDX in `/content`, typed via content-collections (from M3)
- Deploy: Cloudflare Workers via `@opennextjs/cloudflare` (wrangler.jsonc, open-next.config.ts)

## Commands

- `npm run dev` - dev server
- `npm run build` - production build (must pass before commit)
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript check
- `npm run format` - Prettier (with Tailwind class sorting)
- `npm run preview:cf` - build + run on workerd locally (the real CF runtime)
- `npm run deploy` - build + deploy to Cloudflare (needs `wrangler login`)

## Process

`docs/PROCESS.md` is the gate: ready/done checklists, the deploy verification
protocol, branch protection, and non-functional requirements. Read it before
shipping anything. Two things from it that bite immediately:

- **Direct pushes to main are rejected.** Branch, PR, let CI run, merge.
- **A deploy is not live until three consecutive fetches say so.** Prerendered
  HTML carries a one year `s-maxage`, so edge nodes serve stale for minutes.

## Hard-won constraints

Each of these cost real time. Do not rediscover them.

- **Workers forbids `eval`/`new Function`**, so MDX pages MUST be fully
  prerendered. Keep `dynamicParams = false` on MDX routes and the static-assets
  incremental cache in `open-next.config.ts`. A post rendering at request time
  returns 500 on the real runtime while working fine under `next start`.
- **Workers Builds auto-detects the wrong commands.** They must be
  `npx opennextjs-cloudflare build` and `npx opennextjs-cloudflare deploy`. The
  defaults produce a green Next build and a deploy that fails with "Could not
  find compiled Open Next config".
- **Prettier corrupts MDX**: its markdown parser rewrites `{/* */}` into invalid
  `{/_ _/}`. `*.mdx` is in `.prettierignore`; keep it there.
- **CI must build before typecheck**, because the build generates
  `.content-collections/`, which the tsconfig alias resolves to. Typecheck first
  fails on a fresh checkout while passing locally.
- **Use `||` not `??` for env fallbacks.** `.env` templates ship variables as
  empty strings, which are defined, so `??` passes `""` through. This sent
  `from: ""` to Resend and produced a 502.
- **Contrast values are load bearing**: `--muted-foreground: #666666` and light
  `--accent: #047857`. Emerald-600 fails WCAG AA as text at 3.76:1.
- **The mobile header has 73px for the wordmark** at 375px, but the full name
  needs 133px. Hence the mono `mhshakouri` handle below `sm`, and Home hidden
  there since the wordmark already links home.
- **Secrets** go in via `wrangler secret put` (e.g. RESEND_API_KEY), never
  committed vars. Local workerd preview reads `.env.local` at build time.

## Related projects

Side projects live in their own repositories, never here (see Conventions).
Keep this list to one line each; it is a pointer, not a registry.

- **arrowword** - cooperative Persian arrowword solver for two devices, from a
  photo, no OCR. `github.com/mhshakouri/arrowword`, deploys to
  `arrowword.mhshakouri.dev`, local path `../arrowword`. Its spec, conventions,
  and collaboration protocol live in that repo.

The durable registry is `/projects`, built from the `projects` content
collection once M5 lands. When that exists, this section stays as the pointer
for agents and the page becomes the public list.

## Starting a new side project

When Hossein says "make this a playground project", "spin this out", or "make it
a child project", this is the recipe. Arrowword is the reference implementation;
copy its shape.

1. Create `~/Projects/personal/<name>/`. Never a folder inside this repo.
2. Scaffold `AGENTS.md` (including a parent pointer back to this repo),
   `README.md`, `docs/SPEC.md`, `.gitignore`, `.github/workflows/ci.yml`, and a
   Prettier config. Symlink `CLAUDE.md` to `AGENTS.md`.
3. `git init` and commit. **Hossein creates the GitHub repo** under
   `github.com/mhshakouri/<name>`; ask him for it rather than attempting it.
4. CI exists before the project counts as started: typecheck plus whatever test
   command it has. Then branch protection requiring the `checks` context.
5. Deploy target is `<name>.mhshakouri.dev`, its own Cloudflare Worker,
   independent of this site's deploys.
6. Add one line to Related projects above.
7. If it wants this site's look, **copy** tokens from `src/app/globals.css`.
   Never import across repos, never add a shared package.

Human steps, always his: creating the GitHub repo, DNS and subdomain setup, and
any Cloudflare resources such as R2 buckets.

## Conventions

- Playground and side projects NEVER live in this repo. No `src/app/playground/`,
  no demo app code, no dependencies added for them. Each one is its own
  repository, its own deploy, its own subdomain (arrowword.mhshakouri.dev is the
  pattern). This site may link to them and describe them; it must not host them.
  Design tokens are copied into those projects, never imported.
- Components: `src/components/ui/` for primitives, `src/components/site/` for site chrome (nav, footer). PascalCase files for components.
- Prefer Server Components; add `"use client"` only where interactivity requires it.
- Design tokens live as CSS custom properties in `globals.css` - no hardcoded colors in components.
- Blog header/OG images ("Terminal Cartography" series): generated by
  `python3 scripts/generate-poster.py <slug>` (needs `pip3 install pillow`),
  committed under `public/blog/`, referenced via the `image` frontmatter field.
  One fig number per post; add a draw function in the script for new posts.
- LinkedIn variant: `... <slug> --social` renders 4:5 portrait (title above the
  same fig) into `assets/social/`, which is outside `public/` so it is never
  served. Needs a SOCIAL entry with title lines and a hook. Prefer 4:5 for the
  feed; the 1.9:1 header is the og:image.
- Small, focused commits per feature/milestone.

## Working with Hossein

- This is a learning project for Claude Code as much as a website. Hossein reviews
  every diff and wants to keep full mental ownership of the codebase.
- Explain non-obvious changes and decisions briefly when making them - what and why,
  not a lecture.
- Design decisions are hands-on for Hossein; offer review rather than
  implementation there unless asked.
- Prefer plan mode / proposing an approach before large multi-file changes.
