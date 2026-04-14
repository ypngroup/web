# Network Page — Marketing Improvement Notes

Assessment conducted April 2026 against the live preview at localhost.

---

## What's working well

- **Hero subheading is strong.** "Et årsprogram for ambisiøse, unge ledere" is the sharpest, most evocative line on the page. It speaks to identity, not features.
- **Hero body copy is good.** "Relasjonene du bygger i dag er karrierens fundament om fem år" is genuinely compelling — outcome-first, aspirational.
- **Thomas contact section is excellent.** Named, personal, with direct contact methods. Positions the founder as accessible. One of the strongest trust signals on the page and well-placed before the form.
- **Refund guarantee is there.** Removes the biggest barrier to committing. It's below the form button, but present.
- **Scarcity is present.** "20 plasser" appears multiple times including near the CTA.
- **Employer note is a smart addition.** The downloadable PDF for managers is a real friction-reducer for the employer-sponsored path.

---

## Issues by priority

### 1. ~~Duplicate image — still using the hero photo for "Om programmet"~~ (High) ✓ Done

The same `Kristin-Skogen-Lund-og-Lederverket-scaled.jpg` appears in both the hero overlay and the "Om programmet" section body. The hero has it at 40% opacity (dark overlay), and then the same face reappears in full colour in the very next section. It creates a jarring repetition. **It actively undermines the premium feel being built.** A photo of a gathering, of participants at a samling, or even a documentary-style event shot would land better here.

### 2. ~~The "Programmet" section undersells the product~~ (High) ✓ Done

The four gathering descriptions read like logistics, not experiences:

- **August:** "speed dating og uformelle aktiviteter" — sounds like a corporate offsite, not the launch of an exclusive 10-month cohort.
- **November:** "Fagsamling" is used as a heading, and the description is generic ("Keynotes, paneler og workshops"). What's the theme? What's the setup? Even a hint of specificity ("Diskuter lederskap med toppledere fra Norges 100 største selskaper") would do more work.
- **Mars:** The topplederbesøk is the most exclusive thing in the programme, and the copy hedges it to death: "Eksklusivt besøk hos en ledende norsk virksomhet — eller direkte møte med en administrerende direktør." The "eller" undercuts both. Pick one, or if it truly varies, say "I fjor besøkte kullet Telenor og møtte konsernsjefen."
- **Juni:** "vi feirer et år med faglig påfyll, nye bekjentskaper" — this is the weakest closing line. The year ends. What do participants leave with? What's changed for them?

### 3. "Hva får du?" is a feature list, not a value list (Medium)

Six of the six checklist items describe *format*, not *outcome*. Compare:

| Current | Outcome-oriented alternative |
|---------|------------------------------|
| "4 eksklusive samlinger per år" | "4 samlinger der du møter de samme folkene — og faktisk rekker å bygge tillit" |
| "Kun 20 plasser — bli kjent med de samme personene" | "En fast gruppe på 20. Du kjenner dem alle ved årets slutt." |
| "Møt kjente toppledere og bedrifter" | "Besøk toppledere du ellers aldri ville nådd — eksklusivt, for kullet" |
| "Relasjoner på tvers av bransjer" | "Perspektiver utenfor din bransje, fra ledere på nøyaktig samme sted i karrieren" |

The checklist is a repeating pattern the brain scans. It needs punchy, outcome-rich wording.

### 4. "Hva sier deltakerne?" — three placeholders (High / Launch blocker)

This is the most trust-building section on a page selling a relationship programme, and all three cards say "Fornavn Etternavn / Bedrift AS" with a broken placeholder image. Until real quotes land here, the section actively signals that the programme hasn't run yet — or that nobody will vouch for it. **This should be considered a launch blocker**, not a nice-to-have.

If real quotes aren't yet available, consider:
- Pulling one strong paragraph from Daniel Kjørberg Siraj's interview (on the homepage) that speaks to the value of professional networks at a young career stage
- Or temporarily removing the section and surfacing the Thomas contact section earlier

### 5. The "Skal arbeidsgiver betale?" section is underdesigned and undersold (Medium)

This section handles a real decision point — the person's manager needs to say yes — but it's styled as a minor footnote after the navy Thomas section. Issues:

- "den ekte investeringen er fire arbeidsdager" is a jarring reframe that could backfire. It's framing the programme as costing time, not just money. If you want to address the time objection, flip it: "For de fleste er fire halvdager i løpet av et år en liten investering for relasjoner som varer."
- The downloadable PDF link is the highest-value CTA on this section but is not visual enough — a button styled like the others would convert better than a plain text link.
- There's no preview of what the PDF contains, which means most people won't download something they can't evaluate.

### 6. Form friction — asking for invoice information upfront (Medium)

The form asks for "Fakturainformasjon" (firmanavn, org.nr, referanse) before the person has even been accepted or confirmed. This is a significant barrier for someone who's still deciding — they're being asked to do their manager's procurement work before knowing if there's even a spot for them. Suggested fix: make this field conditional ("Har du allerede intern godkjenning? Du kan også sende dette etterpå.") or move it to a confirmation step.

### 7. Page title / SEO — "YPN Nettverksprogram" is weak (Low)

The `<title>` tag says "YPN Nettverksprogram — YPN Group". For someone searching for lederutviklingsprogram or nettverksprogram for unge ledere, this doesn't rank well and doesn't signal what the page is about. A stronger title: "YPN Network — Lederutviklingsprogram for unge ledere i Norge".

### 8. Nav label mismatch (Low)

The nav says "Network" (English) but the page title is "YPN Nettverksprogram" (Norwegian). The Slack upsell on `/slack/` and the homepage hero both call it "YPN Network". Pick one and use it consistently — either the Norwegian form or the branded English form. "Network" works fine as a brand name, but the mix signals inconsistency.

### 9. Footer sends people away from the funnel (Low)

The footer on the Network page leads with "BLI MED I YPN NETTVERKET PÅ SLACK" and the LinkedIn CTA. For a visitor who's on the conversion page for a kr. 2 000 annual programme, the footer is steering them toward a free product. Worth considering a Network-specific footer — or at least reordering the CTAs so the Slack offer doesn't appear more prominently than the programme itself.

---

## Cross-channel gaps

**Homepage → Network page**: The homepage hero is well-aligned — same scarcity, same price, same framing. But the "VI FOKUSERER PÅ 3 OMRÅDER" section below the hero still describes YPN broadly (Slack, fagarrangementer, sosiale aktiviteter) without any mention of the Network programme — even though it's now the primary product.

**Slack page → Network page**: The upsell section on the Slack page is well-written and creates a clear upgrade path. The stat tiles are consistent across both pages. This works.

**Homepage blog content**: The Daniel Kjørberg Siraj piece and the Knut Brundtland visit are sitting on the homepage as general interest content, but they're the strongest proof the programme concept works. Neither links to the Network page. A single line — "Besøk som dette er en del av YPN Network. [Les mer →]" — would tie proof to product.

---

## Summary table

| Issue | Priority | Launch blocker? |
|-------|----------|----------------|
| Placeholder testimonials (all 3) | High | **Yes** |
| ~~Same image in hero and body~~ ✓ | High | No — but damages quality signal |
| ~~"Programmet" copy is logistics, not experience~~ ✓ | High | No |
| Feature list, not value list ("Hva får du?") | Medium | No |
| Invoice field friction in form | Medium | No |
| "Fire arbeidsdager" framing backfires | Medium | No |
| PDF download styled as plain text link | Medium | No |
| Page title weak for SEO | Low | No |
| Nav label mismatch (Network vs Nettverksprogram) | Low | No |
| Footer competes with funnel | Low | No |
| Homepage "3 areas" section misses Network | Low | No |

The page is structurally solid and the flow is correct. The main thing standing between this and launch is real testimonials. Everything else is copy and polish.
