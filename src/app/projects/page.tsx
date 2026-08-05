import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I built and shipped, with the constraints that shaped them.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        Things I built and shipped, with the constraints that shaped them. Each
        one lives in its own repository and its own deploy.
      </p>
      <ul className="mt-12 space-y-10">
        {projects.map((project) => (
          <li key={project.slug}>
            <article>
              <h2 className="text-xl font-medium">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {project.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {project.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((item) => (
                  <li
                    key={item}
                    className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
      {projects.length === 0 && (
        <p className="text-muted-foreground mt-12">Nothing here yet.</p>
      )}
    </Container>
  );
}
