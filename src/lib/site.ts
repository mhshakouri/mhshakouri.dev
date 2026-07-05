export const site = {
  name: "Hossein Shakouri",
  fullName: "Mohammad Hossein Shakouri",
  role: "Senior Frontend Engineer",
  url: "https://mhshakouri.dev",
  description:
    "Personal website of Hossein Shakouri — senior frontend engineer with 15+ years building for the web. Projects, writing, and experiments.",
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
