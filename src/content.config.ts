import { existsSync } from "node:fs";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writeups = defineCollection({
  loader: glob({ pattern: ["**/*.{md,mdx}", "!blog/**"], base: "./src/content/writeups" }),
});

const blogFiles = glob({
  pattern: "blog/**/*.md",
  base: "./src/content/writeups",
  generateId: ({ entry }) => entry,
});

const blog = defineCollection({
  loader: {
    ...blogFiles,
    async load(context) {
      // Astro's glob loader skips cache cleanup when the last matching file is removed.
      for (const [id, { filePath }] of context.store.entries()) {
        if (filePath && !existsSync(new URL(encodeURI(filePath), context.config.root))) {
          context.store.delete(id);
        }
      }
      await blogFiles.load(context);
    },
  },
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.coerce.date(),
    category: z.enum(["Exam Reviews", "Security"]),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    published: z.boolean().default(false),
  }),
});

export const collections = { writeups, blog };
