import { allPosts } from "content-collections";

export const publishedPosts = allPosts
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));
