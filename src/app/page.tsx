import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <Container className="py-20">
      <p className="text-accent font-mono text-sm">{site.role}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Hi, I&apos;m Hossein.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-lg">
        I build for the web. This site is my corner of it — projects, writing,
        and experiments live here.
      </p>
      <div className="mt-8 flex gap-3">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          GitHub
        </a>
        <a
          href={`mailto:${site.email}`}
          className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          Get in touch
        </a>
      </div>
    </Container>
  );
}
