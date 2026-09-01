# Contentful editing map (Website 2.0)

**Goal:** Know what goes where — without building a custom WYSIWYG.

Contentful’s editor **is** the CMS. This page is the navigation map: homepage section → fields → deep links.

Space: `es87a9loayi1` · Environment: **`master`** (Production + most Preview)

Same structure as [PR #18](https://github.com/foodsensedottech/foodsense-website/pull/18). **Words** live in [`conversion-seed.ts`](../../src/lib/content/conversion-seed.ts) and the paste pack in [`contentful-copy-review.md`](../website-2.0/contentful-copy-review.md). Do not add content types for copy changes.

---

## How to edit (always)

1. Open the entry (links below)
2. Change copy
3. **Publish**
4. Wait for revalidation (~1h ISR) or trigger Contentful → `/api/revalidate` webhook

| Goal | Where |
| --- | --- |
| Change **words** on the site | **Content** (entries) — use this doc |
| Change **fields / structure** | **Content model** + a migration in `contentful/migrations/` — do not hand-edit destructive changes in the UI |

**All entries:** https://app.contentful.com/spaces/es87a9loayi1/entries  
**Content types:** https://app.contentful.com/spaces/es87a9loayi1/content_types

---

## Start here — Conversion Homepage (one entry)

Almost all homepage copy lives on **one** entry. Open this first:

**[Conversion Homepage — Website 2.0](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-homepage-website-2)**  
Type: `conversionHomepage` · ID: `conversion-homepage-website-2`

Linked pillars / menu / vendors are edited as **separate entries** (linked from this page). Use the reference fields or the deep links below.

---

## Homepage visual map

```
┌─────────────────────────────────────────────────────────────────┐
│  NAV + HEADER CTA                                               │
│  chromeCtaLabel, navAuthority, navPillars, navMenu,             │
│  navPartners, navContact                                        │
├─────────────────────────────────────────────────────────────────┤
│  HERO                                                           │
│  heroBrandLabel  → small label above H1 (ICP chip: multi-unit / multi-brand)   │
│  heroHeading     → H1 (main SEO phrase)                         │
│  heroSubheading  → supporting paragraph                         │
│  heroCta         → primary button                               │
│  heroImage       → optional full-bleed media                    │
├─────────────────────────────────────────────────────────────────┤
│  AUTHORITY                                                      │
│  authorityEyebrow / authorityHeading / authorityBody              │
│  authorityWinsLabel + founderWins (one win per line)             │
│  founderLabel / founderImage                                    │
├─────────────────────────────────────────────────────────────────┤
│  PILLARS                                                        │
│  pillarsEyebrow / pillarsHeading  (on homepage entry)           │
│  pillars → 3× conversionPillar (title, body, lucideIcon)        │
├─────────────────────────────────────────────────────────────────┤
│  SPECIALIZED MENU                                               │
│  menuEyebrow / menuHeading                                      │
│  menuItems → conversionMenuItem (title, body)                   │
├─────────────────────────────────────────────────────────────────┤
│  PARTNERS / VENDORS                                             │
│  partnersEyebrow / partnersHeading   ← field IDs stay these     │
│  vendors → conversionVendor (name, optional logo)               │
│  (Brand OS copy: “Vendors we have run in the field”)              │
├─────────────────────────────────────────────────────────────────┤
│  CONTACT                                                        │
│  contactHeading / contactSubheading / contactResponseNote       │
│  contactCtaLabel  (submit button)                               │
│  Form field labels / dropdowns → NOT in Contentful (code +      │
│  ClickUp parity: docs/engineering/clickup-field-alignment.md)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## SEO tuning cheat sheet

| On the page | Contentful field(s) | Tip |
| --- | --- | --- |
| Hero H1 | `heroHeading` | Primary homepage keyword phrase |
| Hero support | `heroSubheading` | Secondary phrases / ICP (“10+ unit”, markets) |
| Hero brand chip | `heroBrandLabel` | ICP chip (“Multi-unit · Multi-brand franchisees”). Logo already says FoodSense. |
| Authority H2 | `authorityHeading` | Section SEO phrase |
| Authority eyebrow | `authorityEyebrow` | Short label, not the main keyword dump |
| Pillars H2 | `pillarsHeading` | e.g. services / “what we do” variants |
| Menu H2 | `menuHeading` | Secondary services cluster |
| Partners H2 | `partnersHeading` | Integration / vendor-landscape phrases (field ID stays `partnersHeading`) |
| Contact H2 | `contactHeading` | CTA language (“Strategy Audit”, etc.) |

Eyebrows and H2s are optional Symbols on the homepage entry — edit them anytime after migration `003`.

---

## Linked entries (edit these for card / accordion copy)

### Pillars (`conversionPillar`) — keep three

| Entry ID | Open |
| --- | --- |
| `conversion-pillar-program-lifecycle` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-program-lifecycle) |
| `conversion-pillar-tech-stack` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-tech-stack) |
| `conversion-pillar-ecosystem` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-ecosystem) |

Fields: `title`, `body`, `lucideIcon` (`ListChecks`, `Monitor`, `Cable`, …)

Do not add a fourth pillar type. Three cards is the model.

### Menu accordion (`conversionMenuItem`)

Existing four (built in Phase 1):

| Entry ID | Open |
| --- | --- |
| `conversion-menu-revenue` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-revenue) (POS & core) |
| `conversion-menu-partnerships` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-partnerships) (Kiosk) |
| `conversion-menu-delivery` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-delivery) |
| `conversion-menu-vendor-governance` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-vendor-governance) |

Optional extra rows (same type — **no migration**). Seed will create + link these if you run `npm run contentful:seed`:

| Entry ID | Open |
| --- | --- |
| `conversion-menu-loyalty` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-loyalty) (Loyalty, CRM) |
| `conversion-menu-data` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-data) (Data & analytics) |

Fields: `title`, `body`

To add a row: create a `conversionMenuItem`, then link it on the homepage `menuItems` field (order = display order). Kitchen, roadmapping, and maturity stay on `/services` (code), not new types.

### Partners (`conversionVendor`)

| Entry ID | Open |
| --- | --- |
| `conversion-vendor-oracle` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-oracle) |
| `conversion-vendor-ncr` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-ncr) |
| `conversion-vendor-toast` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-toast) |
| `conversion-vendor-deliverect` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-deliverect) |
| `conversion-vendor-tillster` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-tillster) |
| `conversion-vendor-grubbrr` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-grubbrr) |
| `conversion-vendor-hme` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-hme) |
| `conversion-vendor-r365` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-vendor-r365) |

Fields: `name`, `logo` (optional)

---

## Other routes still on CMS

### `/about`

| Piece | Type | Entry |
| --- | --- | --- |
| Title + subhead | `aboutUsTitleSubtitle` | [5tTay5jmvkeJCPx27jw2Dk](https://app.contentful.com/spaces/es87a9loayi1/entries/5tTay5jmvkeJCPx27jw2Dk) |
| Card | `aboutUsCard` | [3bYkWJrCQf7JNbTgmJvYAW](https://app.contentful.com/spaces/es87a9loayi1/entries/3bYkWJrCQf7JNbTgmJvYAW) |
| Card | `aboutUsCard` | [42voWpqVNwVz30lYAC5Z3j](https://app.contentful.com/spaces/es87a9loayi1/entries/42voWpqVNwVz30lYAC5Z3j) |
| Card | `aboutUsCard` | [ut5Pk0Znki7QJRqqZAU7d](https://app.contentful.com/spaces/es87a9loayi1/entries/ut5Pk0Znki7QJRqqZAU7d) |
| Card | `aboutUsCard` | [8KX0fVS0xR93B3Alft7Ib](https://app.contentful.com/spaces/es87a9loayi1/entries/8KX0fVS0xR93B3Alft7Ib) |

`/about` reads those five entries. Empty “Our Story” / “Our Team” chrome was removed from `src/app/about/page.tsx`.

### `/contact`

Heading, subhead, response note, and submit label come from the **same** `conversionHomepage` contact fields as the homepage form (`getConversionHomepage()`). Form labels are still code (below).

### `/franchisees` (deferred)

Uses leftover franchisee types + static copy fallbacks. Not the primary conversion path — see [`decisions.md`](../website-2.0/decisions.md).

### Do **not** edit for the live homepage

| Type | Why |
| --- | --- |
| `heroFields` | Legacy franchisee-era hero — conversion homepage uses `conversionHomepage` |
| Old `seoMetadata` home title | Homepage `<title>` / OG come from conversion hero fields |

---

## Not in Contentful (code)

| Copy | Where |
| --- | --- |
| Contact form labels, placeholders, dropdown options | `src/components/sections/contact/` + `src/lib/constants/form-fields.ts` + ClickUp option UUIDs |
| Footer tagline / geo / email / socials | `src/lib/contentful/site-chrome.ts` + seed `chrome.footerTagline` — **no CMS field** |
| `/services` page (engagement modes + full capabilities) | `src/lib/content/services-page.ts` — do not add a `servicesCard` type |

---

## Reseed from repo (optional)

Canonical seed: `src/lib/content/conversion-seed.ts`  
Publish to Contentful:

```bash
CONTENTFUL_ENVIRONMENT=master npm run contentful:seed
```

Requires `CONTENTFUL_MANAGEMENT_TOKEN`. Prefer editing in Contentful for day-to-day SEO tweaks; reseed when you want repo → CMS sync.

Seed writes **only** fields that already exist on `conversionHomepage` / linked types (migrations `002` + `003`). It does not create types.

---

## Why not a custom WYSIWYG?

A custom backend editor would re-implement login, drafts, publish, media, and preview on top of Contentful’s CMA. For this lean model (one homepage entry + linked cards), **Contentful UI + this map** is faster and safer. Optional later: Contentful **Live Preview** for side-by-side editing — still not a custom CMS.
