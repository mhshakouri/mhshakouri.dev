import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm print:hidden">
      <Container className="flex h-14 items-center justify-between">
        {/* The full name needs 133px but a 375px viewport leaves far less once
            the nav is placed, so mobile shows the handle. Home is hidden there
            too: this wordmark is already the link home. */}
        <Link href="/" className="font-semibold tracking-tight">
          <span className="font-mono text-sm sm:hidden">{site.handle}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <nav className="flex items-center gap-4 text-sm sm:gap-6">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={item.href === "/" ? "hidden sm:inline" : ""}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
