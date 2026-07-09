import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX, type Options } from "@content-collections/mdx";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const mdxOptions: Options = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        // NB: this version of rehype-pretty-code calls the option `theme`
        // (singular) even for the multi-theme record form. The compiled MDX
        // is cached on content only — clear .content-collections/ after
        // changing plugin options here.
        theme: { light: "github-light", dark: "github-dark" },
        defaultLang: "plaintext",
      },
    ],
  ],
};

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.iso.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /* header/OG image under public/, e.g. "/blog/<slug>.png".
       Generate with: python3 scripts/generate-poster.py <slug> */
    image: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      slug: document._meta.path,
      readingTime: readingTime(document.content).text,
      body,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.iso.date(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    featured: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, mdxOptions);
    return { ...document, slug: document._meta.path, body };
  },
});

const talks = defineCollection({
  name: "talks",
  directory: "content/talks",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.iso.date(),
    url: z.string().url().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, mdxOptions);
    return { ...document, slug: document._meta.path, body };
  },
});

export default defineConfig({
  content: [posts, projects, talks],
});
