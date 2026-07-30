import type { Metadata } from "next";
import { PrintButton } from "@/components/site/PrintButton";
import { Container } from "@/components/ui/Container";
import { resume } from "@/data/resume";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${resume.name}, ${resume.role.toLowerCase()} with an AI-native practice.`,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 print:mt-6">
      <h2 className="text-accent font-mono text-sm tracking-wide uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StackLine({ stack }: { stack: readonly string[] }) {
  return (
    <p className="mt-2 font-mono text-xs">
      <span className="text-muted-foreground">Stack: </span>
      {stack.join(" · ")}
    </p>
  );
}

export default function ResumePage() {
  return (
    <Container className="py-16 print:py-0">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {resume.name}
          </h1>
          <p className="mt-1">
            {resume.role}
            <span className="text-muted-foreground">
              {" · "}
              {resume.roleDetail}
            </span>
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            {resume.location} · {resume.relocation}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            {" · "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              github.com/mhshakouri
            </a>
            {" · "}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              linkedin.com/in/mhshakouri
            </a>
          </p>
        </div>
        <PrintButton />
      </header>

      <Section title="Summary">
        <p className="text-muted-foreground leading-relaxed">
          {resume.summary}
        </p>
      </Section>

      <Section title="AI-native engineering practice">
        <dl className="space-y-3">
          {resume.practice.map((item) => (
            <div key={item.label} className="text-sm leading-relaxed">
              <dt className="inline font-medium">{item.label}: </dt>
              <dd className="text-muted-foreground inline">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Selected AI-built projects">
        <div className="space-y-6 print:space-y-4">
          {resume.projects.map((project) => (
            <article key={project.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-muted-foreground font-mono text-xs">
                  {project.status}
                </p>
              </div>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {project.stack && <StackLine stack={project.stack} />}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Core skills">
        <dl className="space-y-2 text-sm">
          {resume.skills.map((group) => (
            <div key={group.category}>
              <dt className="inline font-medium">{group.category}: </dt>
              <dd className="text-muted-foreground inline">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience">
        <div className="space-y-8 print:space-y-5">
          {resume.experience.map((job) => (
            <article key={`${job.company}-${job.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {job.title} ·{" "}
                  <span className="text-muted-foreground">{job.company}</span>
                </h3>
                <p className="text-muted-foreground font-mono text-xs">
                  {job.period}
                </p>
              </div>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <StackLine stack={job.stack} />
            </article>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <ul className="space-y-2 text-sm">
          {resume.education.map((entry) => (
            <li key={entry.degree}>
              <span className="font-medium">{entry.degree}</span>
              <span className="text-muted-foreground">
                {" "}
                · {entry.school}, {entry.year}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Languages">
        <p className="text-muted-foreground text-sm">
          {resume.languages.join(" · ")}
        </p>
      </Section>
    </Container>
  );
}
