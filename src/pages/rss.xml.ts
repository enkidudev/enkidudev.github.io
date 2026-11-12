import type { APIRoute } from "astro";
import { writeups } from "../data/writeups";

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const GET: APIRoute = ({ site }) => {
  const indexUrl = new URL("/writeups/", site).href;
  const feedUrl = new URL("/rss.xml", site).href;
  const items = writeups.map((post) => {
    const url = new URL(`/writeups/${post.slug}/`, site).href;
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate></item>`;
  });
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Arman Mishra · Writeups</title><link>${indexUrl}</link>
<description>Security research and defensive case studies by Arman Mishra.</description>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items.join("\n")}
</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
