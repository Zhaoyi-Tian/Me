import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/posts",
    // Use file IDs so getPosts can report duplicate slugs instead of losing entries.
    generateId: ({ entry }) => entry,
  }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "slug must use lowercase letters, numbers and single hyphens",
      }),
      pubDatetime: z.date(),
      title: z.string(),
      featured: z.boolean().optional(),
      tags: z.array(z.string()).default([]),
      ogImage: image().or(z.string()),
      description: z.string(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { posts, pages };
