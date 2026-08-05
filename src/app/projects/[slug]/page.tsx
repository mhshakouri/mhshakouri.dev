import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/* Same constraint as the blog: Workers forbids eval, so the MDX runtime cannot
   run at request time. Only build-time slugs exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container className="py-16">
      <article>
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              >
                Open the app
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                Source
              </a>
            )}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 font-mono text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        </header>
        <div className="prose prose-neutral dark:prose-invert prose-a:text-accent prose-headings:tracking-tight mt-10 max-w-none">
          <MDXContent code={project.body} />
        </div>
      </article>
    </Container>
  );
}
