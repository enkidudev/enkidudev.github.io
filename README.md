# Arman Mishra | Enkidu

A static Astro portfolio for security research, project case studies, and technical writeups. The production site is [armanmishra.in](https://www.armanmishra.in).

## Development

Use Node.js 20.19 or newer.

```sh
npm ci
npm run dev
npm run check
npm run build
```

Shared page metadata, navigation, and footer live in `src/components/`. Design tokens and responsive layouts live in `src/styles/global.css`. Project and profile details live in `src/data/`. Static PDFs and favicon files live in `public/`. Astro builds responsive WebP variants from the artwork under `src/assets/`.

Astro ClientRouter handles transitions. CSS handles hero entrances and card interactions, with reduced-motion support. The site script uses Astro page lifecycle events to bind and remove filters, image fallbacks, and reading progress.

## Publishing writeups

The [writeup repository](https://github.com/enkidudev/security-writeups) supplies production content. GitHub Actions syncs its files into `src/content/writeups/` before building. To preview locally, copy an article and its relative assets into that folder. Keep public articles and private assessment records separate.

Markdown and MDX articles share this frontmatter:

```yaml
---
title: "A technical writeup"
description: "The question investigated and the main result."
date: 2026-11-08
category: "Methodology"
difficulty: "Foundational"
tags:
  - Enumeration
published: false
slug: "a-technical-writeup"
---
```

Set `published: true` when the article is ready for public release. Use a unique lowercase, hyphenated slug and leave it stable after publishing. Without an explicit slug, the file path supplies it. Articles are ordered newest first, while `WR-001` IDs count from the oldest date. Backdating may change later IDs.

Use level-two and level-three headings for the table of contents. Standard Markdown supports tables, images, links, and references. MDX can also import Astro components such as `WriteupCallout.astro` using a relative path, or include a locally stored diagram with descriptive alternative text.

Expressive Code adds syntax highlighting and code copying. Use a `bash` fence for shell snippets and `ansi` for terminal output. Optional fence metadata includes `title="Example"`, `showLineNumbers`, `{2-4}` for highlights, `ins={2}` and `del={3}` for changes, and `collapse={8-18}` for long sections.

## Deployment

GitHub Pages uses the existing Actions workflow. Pushes to `main` and `writeups_updated` repository dispatch events rebuild the site. The source workflow can use a repository secret named `PORTFOLIO_DISPATCH_TOKEN` to send that event. If the writeup repository becomes private, configure a read-only `WRITEUPS_REPO_READ_TOKEN` in the portfolio repository.

Set the canonical origin in `astro.config.mjs`. Page metadata, sitemap, and robots.txt use this setting.
