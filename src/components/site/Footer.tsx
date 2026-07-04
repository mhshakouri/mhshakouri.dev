import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border border-t print:hidden">
      <Container className="text-muted-foreground flex h-16 items-center justify-between text-sm">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
