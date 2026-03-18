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

### Permalinks

Hugo is configured to preserve the original WordPress URL structure for blog posts (`/2024/09/18/slug/`) to avoid breaking existing links.
