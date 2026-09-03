# Contentful editing map (Website 2.0)

**Goal:** Know what goes where — without building a custom WYSIWYG.

Contentful’s editor **is** the CMS. This page is the navigation map: homepage section → fields → deep links.

Space: `es87a9loayi1` · Environment: **`master`** (Production + most Preview)

Same structure as [PR #18](https://github.com/foodsensedottech/foodsense-website/pull/18), plus migration `004` for `/services`, `/franchisees`, and footer fields. **Words** live in seed files and the paste pack in [`contentful-copy-review.md`](../website-2.0/contentful-copy-review.md). Rebuild notes: [`contentful-rebuild.md`](./contentful-rebuild.md).

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

Linked pillars and menu items are edited as **separate entries**. Leave `vendors` / `partnersHeading` / `navPartners` empty. The site ignores them. Footer fields (`footerTagline`, `footerGeo`, `footerEmail`, `linkedInUrl`, `instagramUrl`) are optional — add them on the type only if you want CMS-owned footer; Preview already seeds those lines.

---

## Homepage visual map

```
┌─────────────────────────────────────────────────────────────────┐
│  NAV + HEADER CTA                                               │
│  chromeCtaLabel, navAuthority, navPillars, navMenu, navContact  │
│  footerTagline, footerGeo, footerEmail, linkedInUrl, instagramUrl │
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
| Pillars H2 | `pillarsHeading` | How we work — not a capability list |
| Menu H2 | `menuHeading` | Programs a multi-unit group has to get right |
| Contact H2 | `contactHeading` | CTA language (“Strategy Audit”, etc.) |
| Footer | `footerTagline` | Same line as the homepage H1 is fine |

Eyebrows and H2s are optional Symbols on the homepage entry — edit them anytime after migration `003`.

---

## Linked entries (edit these for card / accordion copy)

### Pillars (`conversionPillar`) — keep three

| Entry ID | Open |
| --- | --- |
| `conversion-pillar-program-lifecycle` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-program-lifecycle) — Full-Lifecycle Technology Rollouts Built for Kitchen Throughput |
| `conversion-pillar-tech-stack` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-tech-stack) — Hands-On Rollout Support for Lean Local IT Teams |
| `conversion-pillar-ecosystem` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-pillar-ecosystem) — Established Regional & Franchise Ecosystem |

Fields: `title`, `body`, `lucideIcon` (`ListChecks`, `Monitor`, `Cable`, …)

Do not add a fourth pillar type. Three cards is the model.

### Menu accordion (`conversionMenuItem`)

Existing four (built in Phase 1):

| Entry ID | Open |
| --- | --- |
| `conversion-menu-revenue` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-revenue) — POS Migration for Multi-Unit Operations |
| `conversion-menu-partnerships` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-partnerships) — Kiosk Programs Your Store Team Can Run |
| `conversion-menu-delivery` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-delivery) — Delivery Volume the Kitchen Can Fulfill |
| `conversion-menu-vendor-governance` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-vendor-governance) — Vendor Accountability Across Every Store |

Optional extra rows (same type — **no migration**). Seed will create + link these if you run `npm run contentful:seed`:

| Entry ID | Open |
| --- | --- |
| `conversion-menu-loyalty` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-loyalty) — Loyalty the Store and the App Can Both Run |
| `conversion-menu-data` | [Edit](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-menu-data) — Reporting Operators and Digital Leads Can Share |

Fields: `title`, `body`

To add a homepage accordion row: create a `conversionMenuItem`, then link it on the homepage `menuItems` field (order = display order).

---

## Other routes

### `/about`

| Piece | Type | Entry |
| --- | --- | --- |
| Title + subhead | `aboutUsTitleSubtitle` | [5tTay5jmvkeJCPx27jw2Dk](https://app.contentful.com/spaces/es87a9loayi1/entries/5tTay5jmvkeJCPx27jw2Dk) |
| Card | `aboutUsCard` | [3bYkWJrCQf7JNbTgmJvYAW](https://app.contentful.com/spaces/es87a9loayi1/entries/3bYkWJrCQf7JNbTgmJvYAW) |
| Card | `aboutUsCard` | [42voWpqVNwVz30lYAC5Z3j](https://app.contentful.com/spaces/es87a9loayi1/entries/42voWpqVNwVz30lYAC5Z3j) |
| Card | `aboutUsCard` | [ut5Pk0Znki7QJRqqZAU7d](https://app.contentful.com/spaces/es87a9loayi1/entries/ut5Pk0Znki7QJRqqZAU7d) |
| Card | `aboutUsCard` | [8KX0fVS0xR93B3Alft7Ib](https://app.contentful.com/spaces/es87a9loayi1/entries/8KX0fVS0xR93B3Alft7Ib) |

### `/contact`

Heading, subhead, response note, and submit label come from the **same** `conversionHomepage` contact fields as the homepage form. Form labels are still code (below).

### `/services`

Content type API ID is **`services`** if you created it in the UI (name “Services”). Migration `004` uses `servicesPage`. The site accepts both.

One entry. Suggested ID `services-page-website-2`.

Modes and capabilities are linked `conversionMenuItem`s (`services-mode-*`, `services-cap-*`). Field IDs `engagementModes` / `notThisHeading` / `notThisItems` are accepted as aliases of `modes` / `notHeading` / `notItems`.

**Intro must be Long text**, not Short text. You cannot switch the type in place: omit the Intro field, delete it, add a new Long text field with Field ID `intro`.

### `/franchisees`

**Not a live conversion route.** Redirects to `/`. Do not paste assessment copy. `franchiseeLandingPage` can stay unused.

### Do **not** edit for the live site

| Type | Why |
| --- | --- |
| `conversionVendor` | Retired — vendor-agnostic, no logo cloud |
| `heroFields` | Retired — franchisee hero is on `franchiseeLandingPage` |
| Old franchisee pain/offer types | Folded into `franchiseeLandingPage` |

---

## Not in Contentful (code)

| Copy | Where |
| --- | --- |
| Contact form labels, placeholders, dropdown options | `src/components/sections/contact/` + `src/lib/constants/form-fields.ts` + ClickUp option UUIDs |
| Legal pages | `/privacy-policy`, `/terms-and-conditions`, `/accessibility` |

---

## Reseed from repo (optional)

Publish homepage, services, franchisees, about, and footer chrome:

```bash
CONTENTFUL_ENVIRONMENT=master npm run contentful:migrate:master
CONTENTFUL_ENVIRONMENT=master npm run contentful:seed
```

Requires `CONTENTFUL_MANAGEMENT_TOKEN`. Prefer editing in Contentful for day-to-day SEO tweaks; reseed when you want repo → CMS sync.

Migration `004` creates `servicesPage`, `franchiseeLandingPage`, and footer fields. Seed skips unknown fields if `004` has not been applied yet.

---

## Why not a custom WYSIWYG?

A custom backend editor would re-implement login, drafts, publish, media, and preview on top of Contentful’s CMA. For this lean model (one homepage entry + linked cards), **Contentful UI + this map** is faster and safer. Optional later: Contentful **Live Preview** for side-by-side editing — still not a custom CMS.
