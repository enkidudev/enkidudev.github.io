type WriteupFrontmatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  category?: string;
  difficulty?: string;
  tags?: string[];
  published?: boolean;
  slug?: string;
};

type MarkdownModule = {
  frontmatter?: WriteupFrontmatter;
  Content?: any;
  default?: any;
};

const modules = import.meta.glob<MarkdownModule>(
  "../content/writeups/**/*.md",
  { eager: true }
);

const parsed = Object.entries(modules).flatMap(([file, module]) => {
  const frontmatter = module.frontmatter ?? {};

  // A missing title or published:false keeps README files and templates out of production.
  if (
    frontmatter.published !== true ||
    typeof frontmatter.title !== "string" ||
    !(module.Content ?? module.default)
  ) {
    return [];
  }

  const relativePath = file
    .replace("../content/writeups/", "")
    .replace(/\.md$/, "");

  const fallbackSlug = relativePath
    .replace(/\/index$/, "")
    .replaceAll("/", "-");

  const slug =
    typeof frontmatter.slug === "string" && frontmatter.slug.trim()
      ? frontmatter.slug.trim()
      : fallbackSlug;

  const date =
    frontmatter.date instanceof Date
      ? frontmatter.date.toISOString()
      : typeof frontmatter.date === "string"
        ? frontmatter.date
        : "1970-01-01";

  return [{
    slug,
    title: frontmatter.title,
    description:
      typeof frontmatter.description === "string"
        ? frontmatter.description
        : "A technical field note by Arman Mishra.",
    date,
    category:
      typeof frontmatter.category === "string"
        ? frontmatter.category
        : "Research",
    difficulty:
      typeof frontmatter.difficulty === "string"
        ? frontmatter.difficulty
        : "",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    Content: module.Content ?? module.default,
  }];
});

// Assign IDs in chronological publication order. New dated articles append to the sequence.
const chronological = [...parsed].sort(
  (a, b) => Date.parse(a.date) - Date.parse(b.date) || a.slug.localeCompare(b.slug)
);

const idBySlug = new Map(
  chronological.map((post, index) => [
    post.slug,
    `WR-${String(index + 1).padStart(3, "0")}`,
  ])
);

export const writeups = [...parsed]
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .map((post) => ({
    ...post,
    id: idBySlug.get(post.slug) ?? "WR-000",
  }));

export const writeupCount = writeups.length;
