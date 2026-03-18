# YPN Group — Site Migration Plan

## Overview

We are migrating the YPN Group website from a WordPress-derived static HTML export to a clean, lightweight, AI-maintainable stack based on Hugo.

**Current state:** Static HTML files exported from WordPress via Simply Static, hosted on Netlify. HTML is messy with WordPress/plugin artifacts. No build process.

**Target state:** Hugo-generated static site, content in Markdown with YAML front matter, hosted on Netlify. Build command: `hugo`.

---

## Target Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Static site generator | **Hugo** | Fastest builds, zero runtime dependencies (single binary), AI-friendly content model |
| Content format | **Markdown + YAML front matter** | Plain text, trivially readable and writable by AI agents |
| Templating | **Hugo templates (Go HTML templates)** | No framework overhead |
| CSS | **Tailwind CSS** | Utility-first, easy to reason about and instruct an AI to modify |
| Forms | **Netlify Forms** | Already in use, keep as-is |
| Hosting | **Netlify** | Already in use, free tier sufficient |
| Source control | **Git (GitHub)** | Deployment trigger, source of truth |
| CMS | None needed | AI agent edits Markdown files directly |

No Node runtime in production. No database. No CMS backend.

---

## Content Model

```
content/
  _index.md                    # Homepage
  blogg/
    <slug>.md                  # Blog posts
  kontakt-oss/
    _index.md                  # Contact page
  business/
    _index.md                  # Business page
  network/
    _index.md                  # Network page
  privacy-policy/
    _index.md                  # Privacy policy (EN)
  personvernerklaering/
    _index.md                  # Personvernerklæring (NO)
```

Each content file uses YAML front matter:

```yaml
---
title: "Post title"
date: 2024-09-18
author: "Author Name"
categories: ["Young Leaders"]
tags: ["OBOS", "Young Professionals"]
featured_image: "/uploads/2024/09/image.jpg"
---

Post body in Markdown...
```

---

## What to Preserve

- **`/wp-content/uploads/`** — all images referenced by content; keep in place or move to `/static/uploads/`
- **URL structure** — Hugo's `permalinks` config can match the existing `/2024/09/18/post-slug/` pattern to avoid breaking links
- **Netlify form markup** — copy directly from `kontakt-oss/index.html`
- **Fonts** — Open Sans 400 (body), Poppins 600/700 (headings) via Google Fonts

---

## Authentication / Member Pages

The current site uses Ultimate Member (WordPress plugin) for login, registration, and user profiles. These pages (`/login/`, `/register/`, `/user/`, `/author/`) are kept as static HTML for now.

**Decision deferred.** Options when ready:
- **Netlify Identity** — free tier (1000 users), lowest friction given existing Netlify hosting
- **Keep existing static pages** — already functional, no action needed short-term
- **Remove member features** — if the networking is moving to Slack/external platform

---

## Migration Phases

### Phase 1 — Scaffold Hugo project
- Initialize Hugo project in repo
- Set up Tailwind CSS
- Migrate homepage and main navigation
- Deploy to Netlify with `hugo` build command

### Phase 2 — Migrate blog content ✓ Complete
- Convert blog posts to Markdown files under `content/blogg/`
- Configure permalinks to preserve existing URLs (`/2024/09/18/slug/`)
- Set up list and single post templates

**Migrated posts:**
- `content/blogg/pimp-my-ppt.md` → `/2024/04/15/pimp-my-ppt-presentation-hackathon-.../`
- `content/blogg/stretch-engage.md` → `/2024/04/27/stretch-engage-en-suksesshistorie-om-brobygging/`
- `content/blogg/obos-daniel-siraj.md` → `/2024/09/18/fra-advokatfullmektig-til-konsernsjef-i-norges-storste-boligbyggelag-obos/`

**Kept as static (address in a later phase):**
- `static/2024/04/15/ypn-blog/` — trivial placeholder page, no real content; can be deleted or redirected to `/blogg/` once static cleanup phase begins
- `static/2024/11/24/let-ai-run-the-show/` — login redirect page (Ultimate Member artifact); fate tied to Phase 4 auth decision

### Phase 3 — Migrate static pages ✓ Complete
- Privacy policy (`/privacy-policy/`) — Markdown content, navy hero template
- Personvernerklaering (`/personvernerklaering/`) — Markdown content, 8-section Norwegian privacy declaration
- Business (`/business/`) — hardcoded template, 4 sections with images, workshop steps, service cards
- Network (`/network/`) — hardcoded template, hero, Netlify signup form, benefits grid, photo gallery
- Business + Network added to main navigation

**Removed legacy static HTML:** `static/business/`, `static/network/`, `static/personvernerklaering/`, `static/privacy-policy/`

### Phase 4 — Auth decision
- Evaluate whether login/registration/profiles are needed
- If yes: implement Netlify Identity
- If no: remove or redirect those pages

### Phase 5 — Cleanup
- Archive or remove `wp-content/plugins/`, `wp-content/themes/`
- Keep `wp-content/uploads/` or move images to `static/uploads/`
- Set up Netlify redirects for any changed URLs

---

## Design Notes

- **Color scheme:** Yellow/black (YPN brand)
- **Typography:** Open Sans (body), Poppins (headings)
- **Icons:** FontAwesome (currently loaded from local `wp-content/` — move to CDN or replace)
- **Language:** Norwegian (nb-NO) primary
