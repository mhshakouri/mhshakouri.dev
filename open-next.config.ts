import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/* Read-only cache backed by the deployed static assets. Required so SSG pages
   (blog posts) are served from the prerender instead of re-rendered at request
   time — Workers forbids the `new Function` call the MDX runtime needs, so
   runtime rendering of MDX pages would 500. If ISR is ever added, switch to
   the R2 incremental cache (see wrangler.jsonc note). */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
