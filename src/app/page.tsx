import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const highlights = [
  "Claude Code",
  "Cursor",
  "Spec-driven development",
  "Agentic workflows",
  "TypeScript",
  "Vue / Nuxt",
  "React / Next.js",
  "Node.js",
];

export default function HomePage() {
  return (
    <Container className="py-20">
      <p className="text-accent font-mono text-sm">{site.role}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Hi, I&apos;m Hossein.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
        Software engineer with 15+ years shipping production web systems, now
        building AI-first. AI coding agents are my primary development
        interface, not an assistant I occasionally reach for.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/resume"
          className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          View resume
        </Link>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          GitHub
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          LinkedIn
        </a>
        <Link
          href="/contact"
          className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          Get in touch
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="text-accent font-mono text-sm tracking-wide uppercase">
          About
        </h2>
        <div className="text-muted-foreground mt-4 max-w-xl space-y-4 leading-relaxed">
          <p>
            I introduced and ran the first spec-driven AI development framework
            at Bama.ir, one of Iran&apos;s busiest vehicle marketplaces, and
            built payment interfaces AI-first for a fintech platform that stayed
            available through nationwide network disruption. I have also shipped
            a production Python application without hand-writing the Python, by
            owning the architecture and directing the agent.
          </p>
          <p>
            My background is deep front-end, TypeScript with Vue/Nuxt and
            React/Next.js, and I work comfortably across backend, APIs,
            databases, and deployment. Based in {site.location}, open to
            relocation and remote.
          </p>
        </div>
        <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 font-mono text-xs"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
