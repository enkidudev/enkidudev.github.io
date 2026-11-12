import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";
import { projects } from "../../data/projects";
import { writeups } from "../../data/writeups";

export const getStaticPaths: GetStaticPaths = () => [
  ...projects.map(({ title, href }) => ({
    params: { card: href.split("/").filter(Boolean).join("-") },
    props: { title, category: "PROJECT" },
  })),
  ...writeups.map(({ title, slug }) => ({
    params: { card: `writeups-${slug}` },
    props: { title, category: "FIELD NOTES" },
  })),
];

function titleLines(title: string) {
  const lines: string[] = [];
  for (const word of title.split(/\s+/)) {
    const last = lines.at(-1);
    if (last && last.length + word.length < 30) lines[lines.length - 1] += ` ${word}`;
    else lines.push(word);
  }
  return lines;
}

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const GET: APIRoute = async ({ props }) => {
  const { title, category } = props as { title: string; category: string };
  const lines = titleLines(title);
  const size = lines.length > 4 ? 49 : 66;
  const text = lines.map((line, index) => `<tspan x="82" dy="${index === 0 ? 0 : size + 9}">${escapeXml(line)}</tspan>`).join("");
  const artwork = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#111613"/>
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="#466152" stroke-width="2"/>
  <rect x="82" y="72" width="70" height="4" fill="#a9c7a9"/>
  <text x="82" y="123" fill="#a9c7a9" font-family="sans-serif" font-size="25" letter-spacing="4">${category}</text>
  <text x="82" y="218" fill="#f0f3eb" font-family="serif" font-size="${size}">${text}</text>
  <text x="82" y="547" fill="#a9c7a9" font-family="sans-serif" font-size="26">Arman Mishra</text>
</svg>`;
  const image = await sharp(Buffer.from(artwork)).jpeg({ quality: 84 }).toBuffer();
  return new Response(new Uint8Array(image), { headers: { "Content-Type": "image/jpeg" } });
};
