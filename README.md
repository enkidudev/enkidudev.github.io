# Arman Mishra | Enkidu Portfolio v4

Multi-page Astro portfolio with an emerald woodland visual identity, improved text contrast, automatic GitHub writeup ingestion, and restrained Awesome Reveal scroll animations.

## Included

- Home, About, Skills, Certifications, Achievements, Projects, Writeups, GitHub, Resume, and Contact pages.
- Individual project pages for Shredder, Ink, and the Active Directory lab.
- Improved light/dark text contrast, stronger card separation, visible keyboard focus, and responsive layouts.
- ASCII rain hero animation.
- Scroll-triggered fade, slide, and staggered card entrances powered by `@awesome-reveal/core`.
- Resume PDF and GCS appreciation letter.
- Dynamic Markdown writeup ingestion and individual writeup pages.
- Automatically generated writeup count and chronological IDs (`WR-001`, `WR-002`, ...).
- GitHub Pages deployment workflow triggered by portfolio commits and writeup repository dispatch events.

## Apply to the existing project

1. Stop the Astro dev server with `Ctrl+C`.
2. Extract this ZIP.
3. Copy `src`, `public`, `.github`, and `astro.config.mjs` into the existing `enkidudev.github.io` project, allowing folders to merge and files to be replaced.
4. Keep the existing `package.json` and `package-lock.json`.
5. Run `npm.cmd install` to install Astro, `ascii.rest`, and the pinned `@awesome-reveal/core` dependency.
6. Keep Node.js at 20.19 or newer (your Node 24 installation is suitable).

## Writeup repository integration

The portfolio workflow is currently configured with the placeholder:

`enkidudev/security-writeups`

Replace this with the actual `OWNER/REPOSITORY` in `.github/workflows/deploy.yml` once the writeups repository is chosen.

The writeups repository should contain Markdown files with YAML frontmatter. The included separate starter ZIP provides:
- Article template
- Repository README
- GitHub Actions workflow that dispatches a portfolio rebuild after writeup changes

### Public writeups repository

No read token is required to fetch a public repository.

### Private writeups repository

Add a fine-grained personal access token as a repository secret in the portfolio repository:

`WRITEUPS_REPO_READ_TOKEN`

Give it read-only Contents permission for the writeups repository.

The portfolio is public, so any article that is marked `published: true` will become public on the website. Do not put private reports, customer evidence, unpublished bounty details, credentials, or exam-only material in the published content.

### Automatic rebuild trigger

In the writeups repository, add the secret:

`PORTFOLIO_DISPATCH_TOKEN`

The token needs Contents: Read and write access to the portfolio repository so the writeups workflow can send a `repository_dispatch` event. The portfolio workflow listens for `writeups_updated`, fetches the latest Markdown, rebuilds the site, and deploys it.

### Article format

```yaml
---
title: "Example: Kerberos Service Ticket Analysis"
description: "A concise description of the technical investigation."
date: 2026-11-08
category: "Active Directory"
difficulty: "Medium"
tags:
  - Active Directory
  - Kerberos
published: true
slug: "kerberos-service-ticket-analysis"
---
```

Write the article body below the frontmatter using Markdown. Use `published: false` for drafts and templates.

Sequential IDs are assigned at build time in chronological publication order. The newest writeup appears first in the listing, while the ID reflects its position in the publication sequence. Backdating an article can change later sequence numbers.

## Local development

Copy Markdown articles from the writeups repository into `src/content/writeups/`, then run:

```powershell
npm.cmd run dev
```

Build test:

```powershell
npm.cmd run build
```

## GitHub Pages

In the portfolio repository, open **Settings → Pages** and select **GitHub Actions** as the deployment source. Push to `main` to deploy.

## Content accuracy

- Uses the supplied counts: 9 CTF victories, including 5 national CTFs; approximately 5–6 reported findings; 2 paid bounty outcomes.
- No bounty amounts, target names, vulnerability details, or unprovided competition placements have been invented.
- Public writeups should contain sanitized, authorized evidence only.


## Awesome Reveal integration

The site uses the framework-independent `@awesome-reveal/core` API, pinned to `1.0.0-next.11`. This keeps the existing Astro 5 project intact: the upstream Astro adapter currently documents Astro 6 and 7, while the core exposes framework-independent `reveal()` and `cascade()` functions.

Animations are deliberately limited to page introductions, section headings, metric and project grids, and selected article elements. The core uses Intersection Observer and the Web Animations API, respects reduced-motion preferences, and does not hide server-rendered content before its JavaScript runs. The package is a 1.0 release-candidate line, so its version is pinned rather than floated.

References:
- https://awesome-reveal.dev/
- https://awesome-reveal.dev/getting-started/
- https://github.com/awesome-reveal/awesome-reveal
