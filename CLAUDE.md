# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: Migration complete — all phases done

The migration from WordPress static HTML export to Hugo is complete. See `MIGRATION.md` for the full history.

**Current state:** Hugo manages all pages. No legacy static HTML remains. WordPress plugin/theme directories removed. All auth pages removed and redirected. Build command: `hugo`.

**Business and Network pages are drafts** — set to `draft: true` in their `_index.md` and removed from the nav in `hugo.toml`. They are excluded from production builds and will be revamped in a separate branch. To work on them locally: `hugo server --buildDrafts`. To re-publish: remove `draft: true` and re-add the menu entries in `hugo.toml`.

---

## Architecture

- Hugo owns all pages — edit via `layouts/` and `content/`
- WordPress images remain at `static/wp-content/uploads/` and are referenced directly in templates
- Homepage and rich pages (business, network) have content hardcoded in their `list.html` templates
- Simple text pages (privacy-policy, personvernerklaering) have content in `_index.md` Markdown files

### Forms

Forms use **Netlify Forms**: `data-netlify="true"` on the `<form>` element plus a hidden `<input type="hidden" name="form-name">` field. No backend needed.
- Contact form: `layouts/kontakt-oss/list.html`
- Network signup form: `layouts/network/list.html` (form name: `network-signup`)

### Key pages

| Path | How to edit |
|------|-------------|
| `/` | `layouts/index.html` |
| `/kontakt-oss/` | `layouts/kontakt-oss/list.html` + `content/kontakt-oss/_index.md` |
| `/business/` | `layouts/business/list.html` + `content/business/_index.md` |
| `/network/` | `layouts/network/list.html` + `content/network/_index.md` |
| `/privacy-policy/` | `layouts/privacy-policy/list.html` + `content/privacy-policy/_index.md` |
| `/personvernerklaering/` | `layouts/personvernerklaering/list.html` + `content/personvernerklaering/_index.md` |

---

## Build

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
| Hero overlay | `linear-gradient(135deg, rgba(11,27,48,0.53) 23%, rgba(36,106,130,0.61) 94%)` — extracted from live site stylesheet |
| Photo CTA overlay (Brundtland) | `rgba(16,16,81,0.04)` — near-invisible tint |

### Photo background sections

Full-bleed background image sections use the `photo-bg` partial, which renders the image div and overlay div:

```html
{{/* Default overlay — hero gradient */}}
{{ partial "photo-bg" (dict "image" "/wp-content/uploads/path/to/image.jpg") }}

{{/* Custom overlay */}}
{{ partial "photo-bg" (dict "image" "/wp-content/uploads/path/to/image.jpg" "overlay" "rgba(16, 16, 81, 0.04)") }}
```

The `overlay` param accepts any CSS `background` value. Omitting it defaults to the hero gradient. **Always use this partial** — do not write the two `<div>`s by hand. Hugo sanitizes raw CSS strings passed through template dicts (`ZgotmplZ`); the partial handles this correctly via `safeCSS`.

### Permalinks

Hugo is configured to preserve the original WordPress URL structure for blog posts (`/2024/09/18/slug/`) to avoid breaking existing links.
