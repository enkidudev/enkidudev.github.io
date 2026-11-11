import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const writeups = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writeups" }),
});

export const collections = { writeups };
