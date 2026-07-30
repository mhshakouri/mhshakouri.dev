export const site = {
  name: "Hossein Shakouri",
  /* Compact brand for narrow viewports; matches the domain and his handles. */
  handle: "mhshakouri",
  fullName: "Mohammad Hossein Shakouri",
  role: "AI-Native Software Engineer",
  url: "https://mhshakouri.dev",
  description:
    "Personal website of Hossein Shakouri, AI-native software engineer with 15+ years shipping production web systems. Writing on spec-driven development, AI-first delivery, and the web.",
  github: "https://github.com/mhshakouri",
  linkedin: "https://www.linkedin.com/in/mhshakouri",
  email: "mhshakouri@gmail.com",
  location: "Istanbul, Türkiye",
  /* /projects and /uses return once they have real content (see docs/PLAN.md) */
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
