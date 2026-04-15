# Events Schedule — Solution Design

## Overview

Maintain events in a **Google Sheet** (existing workflow, no change for event managers). A GitHub Actions workflow syncs the sheet to `data/events.yaml` on a schedule. Hugo embeds the data into a static `/events/` page at build time. A small piece of vanilla JS partitions events into upcoming/past based on today's date at render time — ensuring the split is always accurate regardless of when the last build ran.

---

## Data flow

```
Google Sheets (public CSV)
        ↓
GitHub Actions (nightly sync)
        ↓  commits data/events.yaml if changed
Git push to main
        ↓  triggers
Netlify build (hugo)
        ↓
Static /events/ page (data embedded in HTML)
        ↓  at page load
Vanilla JS — partitions events into upcoming / past based on today's date
```

---

## Why client-side date calculation

Hugo's `now` function captures the build timestamp, not the visitor's current time. With a nightly sync + build cycle, "today" can be up to ~24h stale — an event that ended yesterday could remain in the "upcoming" column until the next build.

A small vanilla JS block reads each event's `date` attribute and compares it to `new Date()` at page load. This is always accurate to the day, costs nothing, and fits naturally alongside the Tailwind Play CDN setup (no build step for either).

The data itself remains entirely static and git-driven. JS only handles the visual partitioning.

---

## Google Sheet structure

One sheet, one row per event. Suggested columns:

| Column | Notes |
|--------|-------|
| `title` | Event name |
| `date` | ISO format: `2025-04-24` |
| `time` | Display string: `18:00` |
| `location` | Venue name and/or city |
| `type` | `public`, `members`, or `network` |
| `description` | Short blurb for the card |
| `signup_url` | External link, or blank |

The sheet is published as a public CSV via **File → Share → Publish to web → CSV**. No credentials or service account needed.

---

## Sync: GitHub Actions workflow

A workflow in `.github/workflows/sync-events.yml` runs on a cron schedule (e.g. nightly at 02:00 UTC):

1. Fetch the published CSV URL
2. Parse rows into YAML
3. Write `data/events.yaml`
4. If the file changed, commit and push to `main`

Netlify detects the push via the connected git repo integration and triggers a Hugo build automatically. No deploy hook configuration needed.

The sync script is ~50 lines of Python or Node. No third-party services. The published CSV URL is the only external dependency — store it as a repository variable (not a secret, since it's public).

**To trigger an immediate update** outside the nightly schedule: manually run the workflow from the GitHub Actions UI, or push any change to `main`.

---

## Data file: `data/events.yaml`

Example shape after sync:

```yaml
- title: "YPN Afterwork — April"
  date: "2025-04-24"
  time: "18:00"
  location: "Bar Boca, Oslo"
  type: "public"
  description: "Bli med på månedlig afterwork i sentrum."
  signup_url: "https://..."

- title: "YPN Spring Networking Dinner"
  date: "2025-03-14"
  time: "19:00"
  location: "Theatercaféen"
  type: "members"
  description: ""
  signup_url: ""
```

No `past` field — this is computed in the browser.

---

## Hugo template: `layouts/events/list.html`

Hugo iterates `site.Data.events` and renders each event as a card, writing the `date` into a `data-date` attribute on the card element. All cards are rendered in the HTML; JS then hides/shows them in the correct section.

Page structure:

```
/events/
  [Hero section — consistent with rest of site]
  
  Upcoming events
    [card grid — populated by JS from data-date >= today]
  
  Past events
    [card grid — populated by JS from data-date < today, in reverse order]
    [collapsed or visually subdued]
```

Each card shows: title, date + time, location, type badge (`public` / `members` / `network`), description, and a signup button if `signup_url` is set.

All events present in the CSV are displayed regardless of type — the badge is purely informational. There is no auth or member-only gating.

---

## Client-side JS

A small `<script>` block at the bottom of the events template:

- Reads `data-date` from each card
- Compares to `new Date()` (today, midnight local time)
- Moves cards into the correct container (upcoming or past)
- Sorts upcoming ascending, past descending
- Hides the past section initially with a "Show past events" toggle (optional)

No framework, no external dependency. ~30 lines of vanilla JS.

---

## Content file: `content/events/_index.md`

Minimal front matter to activate the section:

```yaml
---
title: "Arrangementer"
---
```

---

## Hugo config changes (`hugo.toml`)

- Add `/events/` to the nav menu
- Add a permalink rule if a custom URL structure is wanted (default `/events/` is fine)

---

## Trade-offs and constraints

| | |
|---|---|
| **Simple auth** | Public CSV — no service account, no secrets |
| **Existing workflow preserved** | Event managers keep using Google Sheets |
| **Hugo-native data pattern** | Same approach as `data/styret.yaml` already in use |
| **Always-accurate past/future split** | JS recalculates on every page load from real current date |
| **Sync delay** | Sheet changes appear on the site after next sync + build (up to ~24h). Shorten cron to hourly if needed, or trigger manually via GitHub Actions UI |
| **No real-time updates** | Appropriate for Hugo's static nature; event details don't change minute-to-minute |
| **Sheet must stay published** | If the CSV URL is unpublished, the sync breaks silently — add a workflow step to validate the fetch |

---

## What this does not include

- RSVP handling — can be added per-event via `signup_url` pointing to a Netlify Form or external tool
- iCal / calendar feed export
- Individual event detail pages (all info fits on a card for this use case)
- Member-only or network-only gating (`type` is informational only — all events are visible to everyone)
