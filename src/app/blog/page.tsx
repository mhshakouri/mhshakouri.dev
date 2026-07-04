import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { publishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on frontend engineering, the web, and side projects.",
};

export default function BlogPage() {
  return (
    <Container className="py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-4">
        Writing on frontend engineering, the web, and side projects.
      </p>
      <ul className="mt-12 space-y-10">
        {publishedPosts.map((post) => (
          <li key={post.slug}>
            <article>
              <p className="text-muted-foreground font-mono text-xs">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h2 className="mt-2 text-xl font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {post.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
      {publishedPosts.length === 0 && (
        <p className="text-muted-foreground mt-12">No posts yet.</p>
      )}
    </Container>
  );
}
