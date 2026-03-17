# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: Phase 1 complete — Hugo scaffold live

This repo is being migrated from a WordPress static HTML export to a Hugo-based site. See `MIGRATION.md` for the full plan and rationale.

**Current state:** Hugo scaffold is live. Homepage and contact page are Hugo-rendered. All legacy WordPress HTML has been moved to `static/` so legacy URLs continue to work. Build command: `hugo`.

**Target state:** Hugo + Tailwind CSS + Markdown content, deployed to Netlify via `hugo` build command.

Work is being done incrementally. Legacy HTML in `static/` and new Hugo content coexist during the transition.

---

## Current repo (WordPress static export)

### Architecture

- Every page is a directory containing an `index.html` file
- Static assets (WordPress CSS/JS/images) live under `wp-content/`
- User and author archive pages are pre-generated under `user/` and `author/` — these are legacy, not actively maintained
- Page builder markup follows Beaver Builder conventions: `fl-row`, `fl-col`, `fl-module`

### Forms

Forms use **Netlify Forms**: `data-netlify="true"` on the `<form>` element plus a hidden `<input type="hidden" name="form-name">` field. No backend needed.

### Key pages

| Path | Purpose |
|------|---------|
| `index.html` | Homepage |
| `kontakt-oss/index.html` | Contact page (Netlify form) |
| `register/index.html` | Registration |
| `login/index.html` | Login |
| `privacy-policy/index.html` | Privacy policy |

### Working with legacy HTML

- Edit HTML files directly — no compilation
- Primary language is Norwegian (nb-NO)
- When removing WordPress artifacts, check for inline `<script>` blocks referencing removed plugins before deleting markup

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
- Tailwind CSS — edit `assets/css/main.css` and use utility classes in templates
- Images from the WordPress era are in `wp-content/uploads/` (or will be moved to `static/uploads/`)

### Permalinks

Hugo is configured to preserve the original WordPress URL structure for blog posts (`/2024/09/18/slug/`) to avoid breaking existing links.
