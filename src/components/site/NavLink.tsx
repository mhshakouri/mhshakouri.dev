"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`hover:text-foreground transition-colors ${
        active ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
