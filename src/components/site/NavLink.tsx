"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`hover:text-foreground transition-colors ${
        active ? "text-foreground" : "text-muted-foreground"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
