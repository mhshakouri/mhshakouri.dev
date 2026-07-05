import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { publishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getPost(slug: string) {
  return publishedPosts.find((post) => post.slug === slug);
}

/* Only build-time slugs exist; unknown slugs must 404 rather than render at
   request time — the MDX runtime can't run on Cloudflare Workers (no eval). */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container className="py-16">
      <article>
        <header>
          <p className="text-muted-foreground font-mono text-xs">
            {formatDate(post.date)} · {post.readingTime}
            {post.draft && (
              <span className="border-accent text-accent ml-2 rounded-sm border px-1.5 py-0.5 uppercase">
                Draft — dev only
              </span>
            )}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="prose prose-neutral dark:prose-invert prose-a:text-accent prose-headings:tracking-tight mt-10 max-w-none">
          <MDXContent code={post.body} />
        </div>
      </article>
    </Container>
  );
}
