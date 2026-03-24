# Network Page Revamp

## Background

The YPN Network programme has been redesigned as a structured annual programme (August–June) with a fixed cohort of max 20 participants. The old network page reflected the previous open-membership model (NOK 950/year). The new model has a fixed price of kr. 2 000 invoiced to the employer at the first gathering.

The revamp is being built on the `worktree-network` branch. A PR is open at:
`https://github.com/ypngroup/web/pull/new/worktree-network`

---

## Decisions made

**Old page preserved** at `/network-old/` (content + layout) so it can be referenced for comparison. It remains `draft: true` and is not in the nav.

**New page is live** — `draft: true` removed, added to nav as "Network" between Styret and Kontakt oss.

**Data-driven testimonials** — testimonial content lives in `data/network_testimonials.yaml`, not hardcoded in the template. Add/remove/edit entries there without touching the layout.

**Image for "Om programmet"** — currently using the same hero image (`Kristin-Skogen-Lund-og-Lederverket-scaled.jpg`) as a placeholder. A better, different image needs to be sourced.

---

## Page structure (`layouts/network/list.html`)

| # | Section | Background | Notes |
|---|---------|------------|-------|
| 1 | Hero | navy + photo overlay | Same image as old page for now |
| 2 | Om programmet | white | 2-col grid (text + image). Image is placeholder — needs replacing |
| 3 | Programmet | gray | Vertical timeline: Aug / Nov / Mar / Jun |
| 4 | Hva får du? | white | 2-col checklist, 6 items |
| 5 | Hva sier deltakerne? | gray | Card grid, driven by data file |
| 6 | Påmelding | gray | Netlify form, `name="network-signup"` |

---

## Key files

| File | Purpose |
|------|---------|
| `layouts/network/list.html` | New page template |
| `content/network/_index.md` | Front matter — title only, no draft |
| `data/network_testimonials.yaml` | Testimonial content (placeholder names/photos) |
| `layouts/network-old/list.html` | Old page preserved for reference |
| `content/network-old/_index.md` | Old page front matter (`draft: true`) |

---

## What still needs doing

- [ ] **Find a real image** for the "Om programmet" section (the current one is the same as the hero, which is not ideal)
- [ ] **Replace placeholder testimonials** — gather quotes, names, employer names, and headshots from 2–5 previous participants and update `data/network_testimonials.yaml`. Use specific prompts to get outcome-focused quotes (see below)
- [ ] **Review copy** — all Norwegian copy is placeholder-quality. The client should review and approve before publishing
- [ ] **Merge PR** when content is ready

---

## Design notes

- Tailwind via Play CDN — no build step
- Responsive: mobile-first, breakpoints at `sm` (640px) and `md` (768px) / `lg` (1024px)
- Form name grid stacks to 1-col on mobile (`grid-cols-1 sm:grid-cols-2`)
- Testimonial grid: 1-col mobile → 2-col tablet → 3-col desktop. Handles 2–5 cards gracefully
- Accessibility: `aria-required` on required inputs, `aria-hidden` on decorative checkmarks

---

## Marketing assessment

### Overall verdict
The page describes the programme accurately but doesn't sell the *feeling* of being selected for it — and for this audience, belonging to the right room is the whole point.

### Tone of voice
Professional and clean, appropriate for the audience. But the copy speaks *about* ambition rather than *to* it. The hero subheading ("Et årsprogram for ambisiøse, unge ledere") is the strongest line on the page — it's never reinforced below. Body copy immediately retreats to logistics.

### USP
The real USP is the combination of radical exclusivity (max 20, fixed cohort), access you can't buy elsewhere (toppleder visits), and genuine relationships (same group all year). These are scattered and understated. "Eksklusiv" appears three times without specificity. Price (kr. 2 000 invoiced to employer) is a strong trust signal but is buried and unframed.

### CTA
Passive. No urgency, no scarcity nudge, no enrollment context. The form is live but the page says signup opens in April — confusing. No secondary CTAs between sections.

### Target audience alignment
Mostly fits (25–35, early–mid career, employer-sponsored). But copy never addresses *why* they should care at this career stage. "Faglig påfyll" used twice, says almost nothing.

### Issues to address (priority order)

| Priority | Issue | Status |
|----------|-------|--------|
| High | Hero has no hook below the headline | [x] |
| High | Form/timing confusion — form is live but copy says "opens in April" | [x] |
| High | Scarcity not activated — "20 plasser" not prominent near CTA | [x] |
| Medium | "Faglig påfyll" is generic — name the actual themes | [x] |
| Medium | Price framing — reframe as employer-sponsored, not a cost | [x] |
| Medium | No CTA between sections | [x] |
| Low | Testimonials should focus on outcomes, not features | [x] |
| Low | "Bygg nettverk på tvers av bransjer" is too generic | [x] |

---

## Testimonial collection guide

Avoid asking "what did you think?" — generic prompts get generic answers. Use these instead:

- *"Har du hatt nytte av noen av relasjonene du bygde i programmet — konkret?"*
- *"Hva overrasket deg mest?"*
- *"Ville du anbefalt det til en kollega i samme karrierefase? Hvorfor?"*
- *"Var det ett øyeblikk eller én person som stakk seg ut?"*

**What to select for:** quotes that mention a specific moment, outcome, or person. Avoid quotes that describe the format (4 gatherings, Slack channel, etc.) — the page already covers that. The third placeholder quote is a good structural model: it handles an objection and ends with a verdict.

**Target:** 3 quotes minimum, ideally from different industries/sectors.

---

## How to run locally

```bash
hugo server --buildDrafts   # includes /network-old/
hugo server                 # only published pages (including /network/)
```
