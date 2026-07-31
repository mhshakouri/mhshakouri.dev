# Process: how work gets done on this site

The site is live and pushing to main publishes. This document is the gate that
keeps that safe. `AGENTS.md` carries conventions; this carries process.

Modelled on the arrowword spec's sections 13 to 16, adapted for a site whose
main risk is not data loss but shipping something wrong to a public page that
recruiters read.

## 1. Ready, before starting work

1. The change is described in one sentence, and it is clear which pages it
   affects.
2. If it touches published content, Hossein has approved the wording. Prose in
   his voice is his call, not Claude's.
3. If it needs an account, a secret, or a DNS change, that is done first. See
   section 3.

## 2. Done, before calling it finished

1. `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format:check`
   all pass locally.
2. The change was seen rendered, not just compiled. Screenshot or DOM check in
   the browser, both light and dark if it is visual.
3. **Verified on production, not just locally.** See the deploy verification
   protocol in section 4. A green build is not evidence the page is live.
4. Accessibility holds: contrast meets WCAG AA, interactive elements are
   keyboard reachable. Run Lighthouse if the change is structural.
5. No em dash anywhere in the diff.
6. Anything learned the hard way is written into `AGENTS.md` or this file in the
   same commit.

## 3. Work only Hossein can do

Claude stops and hands over, using this format: what is blocked, the exact
command or dashboard path, what success looks like, how to verify, what to paste
back.

Standing items:

- Cloudflare dashboard changes: build commands, custom domains, cache purge.
- Secrets: `npx wrangler secret put RESEND_API_KEY`. Never a committed var.
- Anything that spends money or changes DNS.
- Publishing judgment: flipping a post from `draft: true` to `false`.

## 4. Deploy verification protocol

Cloudflare serves prerendered HTML with `cache-control: s-maxage=31536000`, so
**after a deploy, some edge nodes keep serving the old page for a few minutes**
while others serve the new one. This has produced false results twice.

Rules:

1. Never conclude from a single fetch. Require at least three consecutive
   fetches showing the new content.
2. Grep for a string that is **unique to the change**. A weak pattern gives a
   false pass: matching `mhshakouri.dev"` once matched `og:url` and reported a
   deploy that had not happened.
3. If an update must be instant, purge the cache from the Cloudflare dashboard.
   Deploying alone does not guarantee it.

## 5. Branch protection and the SSH identity trap

`main` is protected: the `checks` status check is required, force pushes and
deletions are blocked, admin bypass is enabled.

**Direct pushes to main are rejected**, and the reason is not obvious. Git
pushes over SSH authenticate as `mhshakouritr`, which has push but not admin on
the repo, so the admin bypass configured for `mhshakouri` does not apply.

Two ways to work:

- **Preferred:** branch, push, open a PR, let CI run, merge. Merging via
  `gh pr merge` works because `gh` is authenticated as `mhshakouri`.
- Or add the local SSH key to the `mhshakouri` account, after which direct
  pushes bypass protection as intended.

After a squash merge, local main diverges from remote. Verify with
`git diff main origin/main` (empty means identical content), then
`git reset --hard origin/main`.

## 6. CI and CD, and what each is allowed to know

- **CI** is GitHub Actions, `.github/workflows/ci.yml`. Checks only: build,
  lint, typecheck, format. It holds no Cloudflare credentials, by design.
- **CD** is Cloudflare Workers Builds, configured in the dashboard, triggered by
  pushes to main. It holds no GitHub credentials beyond read access.
- The two are independent. CD does not wait for CI, which is exactly why branch
  protection matters: it stops an unchecked commit reaching main in the first
  place.

Build order matters in CI: `build` must run before `typecheck`, because the
build generates `.content-collections/`, which the tsconfig alias resolves to.

## 7. Non-functional requirements

Checked at the Done gate, not once at the end.

**Security.** No secrets in the repo; `.env.local` is gitignored and has never
been committed. `.env.example` carries names with empty values only. The contact
endpoint validates with zod, uses a honeypot that returns a fake success so bots
learn nothing, and rate limits per IP counting only successful sends.

**Privacy.** The public resume deliberately omits the phone number and the work
authorization note, which appear in the source PDF. That PDF is gitignored. Do
not add them back without asking; this was a deliberate choice in M2.

**Accessibility.** Design tokens meet WCAG AA. Two specific values are load
bearing: `--muted-foreground: #666666` and light `--accent: #047857`
(emerald-700). The obvious emerald-600 fails as text on white at 3.76:1.

**Performance.** Lighthouse has been 98 or better across the board. Blog posts
are fully prerendered; keep them that way, for correctness as much as speed.

**Content safety.** Drafts (`draft: true`) render in `next dev` only, because
`publishedPosts` checks `NODE_ENV`. `next build` always runs in production mode,
so a draft cannot reach a deploy, the RSS feed, or the sitemap. `dynamicParams
= false` means a draft URL 404s even if guessed.
