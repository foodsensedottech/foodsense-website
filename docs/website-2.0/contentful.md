# Website 2.0 — lean Contentful model

**Goal:** A small, owner-editable model for the Strategy Audit homepage — not another 25-type sprawl.

**Current priority (Aug 2026):** Phase 1 is **complete** (11 types on master). Phase 2 types (`caseStudy`, etc.) — see [`decisions.md`](./decisions.md).

Owner decisions: [`decisions.md`](./decisions.md). Brand/copy: `docs/brand/`. Page IA: [`overview.md`](./overview.md).

Until the lean types below are published, Preview uses seed copy in `src/lib/content/conversion-seed.ts`.

**Runbook:** [`engineering/contentful-phase1.md`](../engineering/contentful-phase1.md) — `npm run contentful:phase1`

**Editing map (what goes where):** [`engineering/contentful-editing-map.md`](../engineering/contentful-editing-map.md) — homepage sections → fields → Contentful deep links. Use this instead of building a custom WYSIWYG.

---

## Target model (create these)

### Now — conversion homepage (4 types)

| Type | Purpose |
| --- | --- |
| `conversionHomepage` | Single homepage entry (hero, authority, contact, chrome, refs) |
| `conversionPillar` | Core pillar cards (expect 3) |
| `conversionMenuItem` | Specialized menu accordion rows |
| `conversionVendor` | Partner / vendor names (+ optional logo) |

Field map for those four types: see **Field reference** at the bottom of this file.

### Next — Phase 2 content (only when building those pages)

| Type | Purpose |
| --- | --- |
| `caseStudy` | Anonymized results pages (`/results/[slug]`) — RichText body, metrics, SEO |
| `framework` | Maturity / vendor-risk frameworks |
| `metricStat` | Proof bar stats (value, label, sortOrder) |
| `partner` | Named partners (e.g. Blackthorn) — name, blurb, url, logo |
| `seoMetadata` | **Fix first:** `pageId` becomes a free unique Symbol slug (drop closed enum) |

Do **not** invent types mid-task. Prefer seed or copy in Brand OS until a type is on this list.

### Keep for non-homepage routes (for now)

| Type | Why keep |
| --- | --- |
| `aboutUsCard` / about title types used by `/about` | About page still needs CMS cards until rebuilt |
| Contact / form chrome types still referenced by `/contact` or shared chrome | Only if live routes still fetch them |

Re-audit these after About / Contact are folded into Website 2.0 or static Brand OS copy.

---

## Retire (old franchisee / multi-section model)

**Rule:** rename to `DEPRECATED_*` → confirm no code references + Preview green → delete after ≥1 week.

### Section-header + card pairs (retire for Homepage 2.0)

| Header / section type | Card / item type |
| --- | --- |
| `faqSection` | `faqItem` |
| `forWhomSection` | `forWhomCard` |
| `offeringsSection` | `offeringMode` |
| `proofSection` | `proofBeat` |
| `howWeWorkSection` | `howWeWorkStep` |
| `franchiseeOffersTitle` | `franchiseeOfferCard` |
| `franchiseePainsTitle` | `franchiseePainCard` |
| `servicesTitleAndSubtitle` | `servicesCard` |
| `testimonialsTitleAndSubtitle` (“Contact section reuse”) | — merge contact strings into `conversionHomepage` or a single `siteChrome` later |
| `aboutUsTitleSubtitle` | Keep cards only if `/about` still needs them; else retire with About rebuild |

### Orphans / wrong shape

| Type | Action |
| --- | --- |
| `testimonialCard` | Audit entry count; if zero, deprecate (old positioning) |
| `blogPost` | Deprecate until owned RichText articles exist (LinkedIn embeds do not count as site SEO) |
| `franchiseePainsTitle` | Malformed (card-shaped); deprecate with pains pair |
| Closed `seoMetadata.pageId` enum | Migrate to free slug **before** any case study / framework entry |

### Locales

- Locales `en-US` + `es` exist; **0 fields localized**.
- Do not enable Spanish field localization until Phase 4 is scheduled.
- Enabling localization is non-destructive; disabling is destructive — decide fields carefully.

---

## Reorganization sequence

Phases match [`assessment.md`](./assessment.md); Contentful work is **Phase 1** after ClickUp lead integrity (Phase 0).

| Step | Action |
| --- | --- |
| 1 | Create Contentful `staging` from `master` (confirm environment allowance on plan) |
| 2 | Fix `seoMetadata.pageId` → free unique Symbol |
| 3 | Create the 4 `conversion*` types + publish one homepage entry (linked pillars / menu / vendors) |
| 4 | Point the Website 2.0 app at those types (already coded in `src/lib/contentful/conversion.ts`) |
| 5 | Rename unused types to `DEPRECATED_*` via `contentful-migration` scripts (never hand-edit field IDs in UI for destructive changes) |
| 6 | Verify Preview; then apply migrations to `master` |
| 7 | Delete `DEPRECATED_*` after a quiet week |
| 8 | Only then add `caseStudy` / `framework` / `metricStat` / `partner` |

**Do not** add a generic `page` composition layer yet. That is Phase 3 debt after the site is converting.

---

## Field reference — conversion types

### `conversionPillar`

| Field | Type |
| --- | --- |
| `title` | Short text |
| `body` | Long text |
| `lucideIcon` | Short text (`ListChecks`, `Monitor`, `Cable`, …) |

### `conversionMenuItem`

| Field | Type |
| --- | --- |
| `title` | Short text |
| `body` | Long text |

### `conversionVendor`

| Field | Type |
| --- | --- |
| `name` | Short text |
| `logo` | Media (optional) |

### `conversionHomepage` (one entry)

| Field | Type |
| --- | --- |
| `heroHeading` | Short text |
| `heroSubheading` | Long text |
| `heroCta` | Short text |
| `heroBrandLabel` | Short text (eyebrow above H1; SEO-tunable) |
| `heroImage` | Media (optional) |
| `authorityEyebrow` | Short text |
| `authorityHeading` | Short text (section H2; SEO-tunable) |
| `authorityWinsLabel` | Short text |
| `authorityBody` | Long text |
| `founderLabel` | Short text |
| `founderWins` | Long text (one win per line) |
| `founderImage` | Media (optional) |
| `pillars` | References → many `conversionPillar` |
| `pillarsEyebrow` / `pillarsHeading` | Short text (section chrome) |
| `menuItems` | References → many `conversionMenuItem` |
| `menuEyebrow` / `menuHeading` | Short text (section chrome) |
| `vendors` | References → many `conversionVendor` |
| `partnersEyebrow` / `partnersHeading` | Short text (section chrome) |
| `contactHeading` | Short text |
| `contactSubheading` | Short text |
| `contactResponseNote` | Short text |
| `contactCtaLabel` | Short text |
| `chromeCtaLabel` | Short text |
| `navAuthority` / `navPillars` / `navMenu` / `navPartners` / `navContact` | Short text (optional) |

---

## Deploy note

Website 2.0 stays on **Preview** until the owner approves Promote to Production.
