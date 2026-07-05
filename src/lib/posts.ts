import { allPosts } from "content-collections";

/* Drafts are visible in `next dev` only. `next build` always runs with
   NODE_ENV=production, so drafts can never reach a deploy, the RSS feed,
   or the sitemap. */
const showDrafts = process.env.NODE_ENV === "development";

export const publishedPosts = allPosts
  .filter((post) => showDrafts || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));
