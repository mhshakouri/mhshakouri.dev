export const site = {
  name: "Hossein Shakouri",
  /* Compact brand for narrow viewports; matches the domain and his handles. */
  handle: "mhshakouri",
  fullName: "Mohammad Hossein Shakouri",
  /* Title leads with the role recruiters search for; the practice is the
     differentiator, not the headline. */
  role: "Senior Front-End Engineer",
  roleDetail: "AI-Native Practice",
  url: "https://mhshakouri.dev",
  description:
    "Personal website of Hossein Shakouri, senior front-end engineer with 15+ years shipping production web systems, now building AI-first. Writing on spec-driven development, AI-first delivery, and the web.",
  github: "https://github.com/mhshakouri",
  /* This site's own source, linked from the footer next to "Built AI-first". */
  repo: "https://github.com/mhshakouri/mhshakouri.dev",
  linkedin: "https://www.linkedin.com/in/mhshakouri",
  email: "mhshakouri@gmail.com",
  location: "Istanbul, Türkiye",
  /* /uses returns once it has real content (see docs/PLAN.md) */
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
