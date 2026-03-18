# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: Phase 1 complete — Hugo scaffold live

This repo is being migrated from a WordPress static HTML export to a Hugo-based site. See `MIGRATION.md` for the full plan and rationale.

**Current state:** Hugo scaffold is live. Homepage and contact page are Hugo-rendered. All legacy WordPress HTML has been moved to `static/` so legacy URLs continue to work. Build command: `hugo`.

**Target state:** Hugo + Tailwind CSS + Markdown content, deployed to Netlify via `hugo` build command.

Work is being done incrementally. Legacy HTML in `static/` and new Hugo content coexist during the transition.

---

## Current repo (Hugo + legacy static)

### Architecture

- Hugo owns `/` (homepage) and `/kontakt-oss/` — edit via `layouts/` and `content/`
- All other legacy WordPress HTML lives in `static/` — Hugo copies it verbatim into `public/`, preserving all URLs
- WordPress images remain at `static/wp-content/uploads/` and are referenced directly in templates
- Homepage content is hardcoded in `layouts/index.html` (not front-matter-driven)

### Forms

Forms use **Netlify Forms**: `data-netlify="true"` on the `<form>` element plus a hidden `<input type="hidden" name="form-name">` field. No backend needed. The contact form is in `layouts/kontakt-oss/list.html`.

### Key pages

| Path | Owner | How to edit |
|------|-------|-------------|
| `/` | Hugo | `layouts/index.html` |
| `/kontakt-oss/` | Hugo | `layouts/kontakt-oss/list.html` + `content/kontakt-oss/_index.md` |
| `/register/` | Legacy static | `static/register/index.html` |
| `/login/` | Legacy static | `static/login/index.html` |
| `/privacy-policy/` | Legacy static | `static/privacy-policy/index.html` |

---

## Target repo (Hugo)

### Build

```bash
hugo          # build to /public
hugo server   # local dev server with live reload (http://localhost:1313)
```

### Content

All content lives in `content/` as Markdown files with YAML front matter. To add or edit content, edit the `.md` files — no HTML needed.

```
content/
  _index.md        # Homepage
  blogg/           # Blog posts
  sider/           # Static pages (kontakt-oss, privacy-policy, etc.)
  events/
```

Front matter example:

```yaml
---
title: "Post title"
date: 2024-09-18
author: "Author Name"
categories: ["Young Leaders"]
tags: ["OBOS"]
featured_image: "/uploads/2024/09/image.jpg"
---
```

### Templates and styles

- Templates live in `layouts/`
- Tailwind CSS via Play CDN (`<script src="https://cdn.tailwindcss.com">`) — no build step, no `assets/css/main.css`. Use utility classes directly in templates.
- Custom fonts (Open Sans, Poppins) and brand colors configured in the Tailwind config script in `layouts/partials/head.html`
- Images from the WordPress era are at `static/wp-content/uploads/` and referenced with `/wp-content/uploads/...` paths

### Design conventions (match live site)

These conventions are derived from the live site at youngprofessionalsnorway.no and must be followed when editing templates:

| Element | Convention |
|---------|------------|
| Section headings (H2) | `font-heading font-semibold text-4xl md:text-5xl leading-tight` — **not** bold (700), not small |
| Focus area / sub-headings (H3) | `font-heading font-semibold text-2xl` |
| Brundtland CTA heading | `font-heading font-light text-3xl md:text-5xl` — light weight (300) for contrast |
| Body text | `leading-relaxed` on all `<p>` — base font is 15px / line-height 1.857 |
| Buttons | `font-heading font-normal uppercase tracking-wider px-8 py-4 text-base` — not semibold, not small |
| Section padding | `py-20` on content sections; `py-28` on full-bleed photo CTA sections |
| Fonts loaded | Open Sans 400, Poppins 300/600/700 (all three weights needed) |

### Permalinks

Hugo is configured to preserve the original WordPress URL structure for blog posts (`/2024/09/18/slug/`) to avoid breaking existing links.
