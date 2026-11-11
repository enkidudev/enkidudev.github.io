import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineConfig({
  site: "https://www.armanmishra.in",
  trailingSlash: "always",
  integrations: [
    expressiveCode({
      themes: ["github-dark"],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      defaultProps: { showLineNumbers: false },
      styleOverrides: { codeFontFamily: "var(--mono)" },
    }),
    mdx(),
    sitemap({ filter: (url) => !new URL(url).pathname.startsWith("/404") }),
    icon({ include: { lucide: ["arrow-up-right", "menu", "x", "github", "mail", "linkedin", "copy", "arrow-down", "terminal"] } }),
  ],
});
