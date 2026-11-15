import { getCollection } from "astro:content";

export const blogDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
  timeZone: "UTC",
});

export async function blogPosts() {
  const posts = await getCollection("blog", ({ data }) => data.published);
  if (new Set(posts.map(({ data }) => data.slug)).size !== posts.length) {
    throw new Error("Published blog slugs must be unique.");
  }
  return posts.sort((a, b) =>
    b.data.date.getTime() - a.data.date.getTime() || a.data.slug.localeCompare(b.data.slug)
  );
}
