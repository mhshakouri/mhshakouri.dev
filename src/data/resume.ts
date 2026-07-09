/* Web version of the resume. Curated from the source PDF (git-ignored at the
   repo root) - deliberately excludes phone number and visa details. */

export type SkillGroup = {
  category: string;
  items: string[];
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
  role: "Front-End Engineer / Software Engineer",
  location: "Istanbul, Türkiye",
  relocation: "Open to relocation worldwide",
  summary:
    "A front-end developer at heart, with 15+ years building fast, accessible, maintainable interfaces in TypeScript, Vue/Nuxt, and React/Next.js. I've worked solo and within agile, cross-functional teams, and I happily cross into backend work (Node.js, sometimes PHP or C#, REST APIs, and databases) whenever it helps the product ship. I value clean code, clear communications across teams, and quietly getting things done. A neat coder, a patient collaborator, and a curious, always-learning problem solver.",
  skills: [
    {
      category: "Languages & Markup",
      items: [
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Sass/SCSS",
        "PHP",
        "C#",
        "Python",
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        "Vue.js",
        "Nuxt.js",
        "React",
        "Next.js",
        "Svelte",
        "Node.js",
        "NestJS",
        "Express.js",
        "ASP.NET",
        "Laravel",
        "Lit",
        "Web Components",
      ],
    },
    {
      category: "State, UI & Architecture",
      items: [
        "Pinia",
        "Vuex",
        "TanStack Query",
        "Redux Toolkit",
        "Zustand",
        "Component Architecture",
        "Design Systems",
        "Tailwind CSS",
        "PWAs",
        "Accessibility",
        "SSR / SSG",
      ],
    },
    {
      category: "APIs & Real-time",
      items: [
        "REST APIs",
        "GraphQL",
        "Auth flows",
        "WebRTC",
        "WebSockets",
        "Event-driven systems",
      ],
    },
    {
      category: "Tooling & Build",
      items: [
        "Vite",
        "Webpack",
        "Vitest",
        "Turborepo",
        "pnpm",
        "GitHub Actions",
        "Storybook",
        "Sentry",
        "Elastic APM",
        "GrowthBook",
      ],
    },
    {
      category: "Databases & Infra",
      items: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
        "Traefik",
        "Linux",
        "CI/CD",
        "RabbitMQ",
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      title: "Technical Lead (Contract / Part-Time)",
      company: "Tanincard.ir",
      period: "Jan 2023 – Jun 2026",
      highlights: [
        "Led technical strategy and full-stack development (Next.js/React, Laravel Nova) for a fintech platform, including payment workflows (OTP, barcode, QR) and event-driven third-party integrations.",
        "Designed real-time backup/recovery systems and optimized PostgreSQL/MySQL databases to ensure business continuity and data integrity.",
        "Managed containerized infrastructure (Docker, Traefik, Linux) and CI/CD via GitHub Actions, maintaining high availability through large-scale national network disruptions.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Laravel / Nova",
        "Redis",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "Traefik",
        "GitHub Actions",
      ],
    },
    {
      title: "Software Engineer",
      company: "Bama.ir",
      period: "Aug 2020 – Mar 2026",
      highlights: [
        "Architected large-scale responsive frontend systems (Nuxt.js/Vue.js, TypeScript, ASP.NET Razor Pages) for Iran's premier autotrading platform; migrated legacy stacks to TypeScript, improving site performance ~25%.",
        "Designed scalable auth flows, type-safe REST APIs, A/B testing, and analytics integrations; led code reviews that reduced production issues ~30%.",
        "Monitored SEO, accessibility, and performance metrics, improving discoverability and supporting growth of one of Iran's highest-traffic automotive platforms.",
      ],
      stack: [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "ASP.NET Razor",
        "REST APIs",
        "A/B Testing",
        "Vite",
        "Elastic",
        "GrowthBook",
        "Sentry",
      ],
    },
    {
      title: "Software Engineer",
      company: "Sarava",
      period: "Jan 2017 – Jan 2020",
      highlights: [
        "Built full-stack web apps (Vue.js, React, Node.js, MongoDB, MySQL, WordPress, Docker) for e-commerce and business platforms.",
        "Optimized frontend performance via Webpack and technical SEO; managed full DevOps lifecycle including deployment pipelines and production reliability.",
        "Acted as technical liaison, bridging communication between developers and business stakeholders.",
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
      title: "Freelance Full-Stack Engineer & Consultant",
      company: "Independent",
      period: "2011 – 2022",
      highlights: [
        "Delivered full-stack solutions across fintech, e-commerce, e-health, and SaaS for clients including Rahiaft, GetZoop, Rayan Baray ITG, AxPrint, and Amaspad (Co-Founder / Technical Lead).",
        "Built SSR/Next.js and Nuxt apps with reusable component libraries, APIs, and underlying infrastructure.",
        "Designed CI/CD and containerized deployment workflows (Docker, GitHub Actions); built high-availability financial transaction systems.",
      ],
      stack: [
        "React",
        "Next.js",
        "Nuxt",
        "Vue",
        "Angular",
        "Node.js",
        "PHP",
        "Docker",
      ],
    },
  ] satisfies Experience[],
  education: [
    {
      degree: "BSc, Computer Science",
      school: "Applied Science University of Iran, Tehran",
      year: "2018",
    },
    {
      degree: "BSc, Mining Engineering (Exploration)",
      school: "Azad University, South Tehran Branch, Tehran",
      year: "2014",
    },
  ] satisfies Education[],
  languages: [
    "Persian (Native)",
    "English (Fluent)",
    "Italian (Basic)",
    "French (Basic)",
    "Dutch (Basic)",
  ],
} as const;
