<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# mhshakouri.dev

Personal website of Hossein Shakouri (senior frontend/software engineer).
Full plan and milestones: see `docs/PLAN.md`.

## Stack

- Next.js 16 (App Router, `src/` dir, Turbopack) + TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- Content: MDX in `/content`, typed via content-collections (from M3)
- Deploy target: Cloudflare via `@opennextjs/cloudflare` (M7)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (must pass before commit)
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run format` — Prettier (with Tailwind class sorting)

## Conventions

- Components: `src/components/ui/` for primitives, `src/components/site/` for site chrome (nav, footer). PascalCase files for components.
- Prefer Server Components; add `"use client"` only where interactivity requires it.
- Design tokens live as CSS custom properties in `globals.css` — no hardcoded colors in components.
- Small, focused commits per feature/milestone.

## Working with Hossein

- This is a learning project for Claude Code as much as a website. Hossein reviews
  every diff and wants to keep full mental ownership of the codebase.
- Explain non-obvious changes and decisions briefly when making them — what and why,
  not a lecture.
- Some features (notably `/playground` demos and design decisions) are hands-on for
  Hossein; offer review rather than implementation there unless asked.
- Prefer plan mode / proposing an approach before large multi-file changes.
