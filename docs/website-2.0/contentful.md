# Website 2.0 — lean Contentful model

**Goal:** Marketing copy for every live route lives in Contentful. Not a 25-type sprawl. Not a vendor logo cloud.

**Current priority (Sep 2026):** Homepage, `/about`, `/services`, `/franchisees`, `/contact`, and header/footer chrome are CMS-owned. Migration `004-cms-pages.js` adds `servicesPage` + `franchiseeLandingPage` + footer fields. Seed: `npm run contentful:seed`.

Owner decisions: [`decisions.md`](./decisions.md). Brand/copy: `docs/brand/`. Page IA: [`overview.md`](./overview.md).

Until the types below are published, Preview uses seed files (`conversion-seed.ts`, `services-page.ts`, `franchisees/copy.ts`, `about-seed.ts`). Seeds are **unpublished-CMS fallback**, not a second site.

**Rebuild / wipe:** [`engineering/contentful-rebuild.md`](../engineering/contentful-rebuild.md).

**Runbook:** [`engineering/contentful-phase1.md`](../engineering/contentful-phase1.md) — then migration `004` + seed.

**Editing map:** [`engineering/contentful-editing-map.md`](../engineering/contentful-editing-map.md).

**Copy vs Brand OS:** [`contentful-copy-review.md`](./contentful-copy-review.md).

---

## Target model (create these)

### Live routes

| Type | Purpose |
| --- | --- |
| `conversionHomepage` | Homepage + `/contact` + nav/footer chrome |
| `conversionPillar` | Three homepage pillar cards |
| `conversionMenuItem` | Title + body cards: homepage accordion, `/services` modes/capabilities, `/franchisees` pains/offers |
| `services` (Contentful UI) or `servicesPage` (migration `004`) | Singleton `/services` |
| `franchiseeLandingPage` (set this ID **before** first Save; `franchisee` / `franchisees` also work) | Singleton `/franchisees` (+ localized `es` for `/es/franchisees`) |
| `aboutUsTitleSubtitle` + `aboutUsCard` | `/about` |
| `seoMetadata` | Keep; homepage SEO still uses hero fields |

Field map: **Field reference** below and the editing map.

### Do not recreate

| Type | Why |
| --- | --- |
| `conversionVendor` | Retired. Vendor-agnostic — no logo cloud, no “Trusted Integration Partners.” Delete when wiping leftovers. |
| `heroFields` | Retired. Franchisee hero is on `franchiseeLandingPage`. |
| `franchiseePainsTitle` / `franchiseePainCard` / `franchiseeOfferCard` | Folded into `franchiseeLandingPage` + `conversionMenuItem`. |
| `partner` / `partnerLogo` | Same as vendor cloud — do not add. |

### Next — Phase 2 content (only when building those pages)

| Type | Purpose |
| --- | --- |
| `caseStudy` | Anonymized results pages (`/results/[slug]`) — RichText body, metrics, SEO |
| `framework` | Maturity / vendor-risk frameworks |
| `metricStat` | Proof bar stats (value, label, sortOrder) |

Do **not** invent types mid-task. Prefer seed until a type is on this list.

### Stay in code (not CMS)

| Copy | Why |
| --- | --- |
| Contact form labels, placeholders, ClickUp option UUIDs | CRM field parity — [`clickup-field-alignment.md`](../engineering/clickup-field-alignment.md) |
| Assessment scoring keys (`1-9`, `one`, `standard`, …) | `src/lib/franchisees/score.ts` — labels are CMS; values are logic |
| Legal pages | `/privacy-policy`, `/terms-and-conditions`, `/accessibility` |

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
| 3 | Create conversion types + `servicesPage` + `franchiseeLandingPage` (migrations `002`–`004`) |
| 4 | Point the app at those types (already coded) |
| 5 | Rename unused types to `DEPRECATED_*` via `contentful-migration` scripts (never hand-edit field IDs in UI for destructive changes) |
| 6 | Verify Preview; then apply migrations to `master` |
| 7 | Delete `DEPRECATED_*` after a quiet week, including `conversionVendor` |
| 8 | Only then add `caseStudy` / `framework` / `metricStat` |

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
| `title` | Short text (localized) |
| `body` | Long text (localized) |

Reused for homepage accordion, `/services` modes + capabilities, `/franchisees` pains + offers. Distinct entry IDs; do not mix them on the wrong page.

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
| `contactHeading` | Short text |
| `contactSubheading` | Short text |
| `contactResponseNote` | Short text |
| `contactCtaLabel` | Short text |
| `chromeCtaLabel` | Short text |
| `navAuthority` / `navPillars` / `navMenu` / `navContact` | Short text (optional) |
| `footerTagline` / `footerGeo` / `footerEmail` | Short text |
| `linkedInUrl` / `instagramUrl` | Short text |

Do not seed `vendors` / `navPartners` / `partnersHeading`. Those fields may still exist on older entries; the site ignores them.

### `services` / `servicesPage` (one entry)

Contentful UI names the type `services` when you call it “Services”. You cannot rename that ID later. The site queries both.

| Field ID | Also accepted | Type |
| --- | --- | --- |
| `metaTitle` / `metaDescription` | | SEO |
| `eyebrow` / `heading` | | Short text |
| `intro` | | **Long text** (not Short text — the paste is >256 characters) |
| `modes` | `engagementModes` | References → `conversionMenuItem` only |
| `capabilitiesEyebrow` / `capabilitiesHeading` | | Section chrome |
| `capabilities` | | References → `conversionMenuItem` only |
| `notHeading` | `notThisHeading` | Short text |
| `notItems` | `notThisItems` | Long text, one line per “what we don’t do” |
| `ctaHeading` / `ctaBody` / `ctaLabel` | | Strategy Audit CTA |

### `franchiseeLandingPage` (one entry `franchisee-landing-website-2`)

Localized `en-US` + `es`. Linked `pains` / `offers` are `conversionMenuItem`. `questions` is JSON — **do not change option `value` keys**.

---

## Deploy note

Website 2.0 stays on **Preview** until the owner approves Promote to Production.
