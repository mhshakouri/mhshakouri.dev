/* Web version of the resume. Curated from the source PDF (git-ignored at the
   repo root) - deliberately excludes phone number and work-authorization note. */

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Practice = {
  label: string;
  body: string;
};

export type Project = {
  name: string;
  status: string;
  highlights: string[];
  stack?: string[];
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  year: string;
};

export const resume = {
  name: "Mohammad Hossein Shakouri",
  role: "Senior Front-End Engineer",
  roleDetail: "AI-Native Practice",
  location: "Istanbul, Türkiye",
  relocation: "Open to relocation and remote",
  summary:
    "Front-end engineer with 15+ years shipping production web systems: large-scale Vue/Nuxt and React/Next.js applications in TypeScript, built for performance, accessibility, and scale at Iran's leading vehicle marketplace, plus payment interfaces for a live fintech platform. Comfortable across backend, APIs, databases, and deployment when it helps the product ship. I now work AI-first: coding agents are my primary development interface, and I own the specs, the architecture, and the review. I introduced and ran the first spec-driven AI development framework at my company. I ship, then iterate.",
  practice: [
    {
      label: "Spec-driven development",
      body: "Designed and ran a spec-to-implementation framework at Bama.ir, the first at the company, working inside it daily. Architecture documents, decision records, and milestones drive the build; the AI implements against them.",
    },
    {
      label: "Review and guardrails",
      body: "I use AI to review AI-generated output, and treat validation, tests, and explicit constraints as part of the prompt surface rather than an afterthought.",
    },
    {
      label: "Proven in production, not just side projects",
      body: "Built payment interfaces and flows for a live fintech platform AI-first, where correctness and reliability were not optional.",
    },
  ] satisfies Practice[],
  projects: [
    {
      name: "Steel Industry Platform",
      status: "in progress, built AI-first",
      highlights: [
        "Custom multilingual platform with a bespoke price-management engine: multiple price sources per product, dated price history, and trend charts, plus a lead-capture CRM.",
        "Developed spec-first: architecture document, nine architecture decision records, a milestone roadmap, and an operations runbook drive the AI implementation.",
        "Self-hosted, containerized, with a custom CMS admin component for dynamic per-product pricing schemas.",
      ],
      stack: [
        "Next.js",
        "Payload CMS",
        "TypeScript",
        "MongoDB",
        "Docker",
        "Caddy",
        "Claude Code",
      ],
    },
    {
      name: "Multiplayer Arrowword App",
      status: "prototype, real-time",
      highlights: [
        "Cooperative real-time puzzle app: two players solve a photographed Persian arrowword together from separate devices, with synced state and live presence.",
        "Fully specified before implementation, including the data model, Persian script handling, and a deliberate decision to avoid OCR in favor of human-marked grid geometry.",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Cloudflare Workers",
        "Durable Objects",
        "R2",
      ],
    },
  ] satisfies Project[],
  /* Frontend leads: recruiters scan this list for the requisition's keywords.
     PHP and C# are deliberately absent; they remain visible in the experience
     stack lines, which is context rather than a capability being sold. */
  skills: [
    {
      category: "Frontend",
      items: [
        "Vue.js",
        "Nuxt.js",
        "React",
        "Next.js",
        "Pinia",
        "Vuex",
        "Redux Toolkit",
        "Zustand",
        "TanStack Query",
        "Tailwind CSS",
        "Design systems",
        "SSR and SSG",
        "Accessibility",
        "Performance",
      ],
    },
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Python"],
    },
    {
      category: "AI Development",
      items: [
        "Claude Code",
        "Cursor",
        "Agentic workflows",
        "Spec-driven workflows",
        "AI-assisted refactoring and review",
        "Prompt and context design",
      ],
    },
    {
      category: "Backend and APIs",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "Payload CMS",
        "REST",
        "GraphQL",
        "Authentication and authorization",
        "Real-time and event-driven systems",
      ],
    },
    {
      category: "Data and Infrastructure",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Schema design",
        "Query optimization",
        "Docker",
        "Traefik",
        "Caddy",
        "Linux",
        "CI/CD",
        "GitHub Actions",
      ],
    },
    {
      category: "Practice",
      items: [
        "Spec-driven development",
        "Code review",
        "Technical leadership",
        "A/B testing",
        "Analytics",
        "Technical SEO",
        "Agile",
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      title: "Technical Lead (Contract)",
      company: "Tanincard.ir",
      period: "Jan 2023 - Jun 2026",
      highlights: [
        "Owned technical strategy and delivery for a fintech platform: customer site plus client, provider, and admin panels in Next.js and React, with a provider map and QR and OTP payment flows.",
        "Built the front-end payment interfaces and flows AI-first, using AI coding agents as the primary development interface on production code handling real transactions.",
        "Ran infrastructure end to end: CI/CD with GitHub Actions, containerized deployment with Docker and Traefik, and real-time backup and recovery, keeping the platform available through nationwide network disruption.",
        "Hired and led the development team, and architected end-to-end flows with the backend engineers.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Laravel/Nova",
        "Redis",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "Traefik",
        "GitHub Actions",
        "Linux",
      ],
    },
    {
      title: "Software Engineer",
      company: "Bama.ir",
      period: "Aug 2020 - Mar 2026",
      highlights: [
        "Introduced and ran a spec-driven AI development framework, the first at the company, and used it for most day-to-day delivery.",
        "Architected large-scale responsive front-end systems in Nuxt.js, Vue.js, and TypeScript for Iran's leading vehicle marketplace; migrated legacy stacks to TypeScript and improved site performance by around 25%.",
        "Built listing and detail pages with complex filtering at scale, type-safe REST APIs, auth flows, A/B testing, and analytics; led code reviews that cut production issues by around 30%.",
      ],
      stack: [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "ASP.NET Razor",
        "REST APIs",
        "Webpack/Vite",
        "Elastic",
        "GrowthBook",
        "Sentry",
      ],
    },
    {
      title: "Software Engineer",
      company: "Sarava",
      period: "Jan 2017 - Jan 2020",
      highlights: [
        "Sole technical resource for the company: built full-stack e-commerce and business platforms end to end, including product pages and checkout flows.",
        "Optimized front-end performance and technical SEO, and owned the entire DevOps lifecycle from deployment pipelines to production reliability.",
      ],
      stack: [
        "Vue.js",
        "React",
        "Node.js",
        "MongoDB",
        "MySQL",
        "WordPress",
        "Docker",
        "Nginx",
      ],
    },
    {
      title: "Freelance Full-Stack Engineer and Consultant",
      company: "Independent",
      period: "2011 - 2022",
      highlights: [
        "Delivered full-stack products across fintech, e-commerce, e-health, and SaaS, including multiple online shops built end to end with checkout and payment integration.",
        "Built SSR applications with reusable component libraries, APIs, CI/CD, and containerized deployment; co-founded and led engineering at Amaspad.",
      ],
      stack: [
        "React",
        "Next.js",
        "Nuxt",
        "Vue",
        "Node.js",
        "PHP",
        "Docker",
        "GitHub Actions",
      ],
    },
  ] satisfies Experience[],
  education: [
    {
      degree: "BSc, Computer Science",
      school: "Applied Science University of Iran, Tehran",
      year: "2018",
    },
  ] satisfies Education[],
  languages: [
    "Persian (native)",
    "English (fluent)",
    "Italian, French, Dutch (basic)",
  ],
} as const;
