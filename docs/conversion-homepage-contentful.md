# Conversion homepage — lean Contentful model

Preview uses **seed content** until you publish the types below. One main entry drives the page.

Do **not** keep growing the old 25-type model for this version. Archive unused types when you are ready (FAQ, For whom, How we work, Proof, Testimonial cards, etc.).

## Content types to create (only 4)

### 1. `conversionPillar` — Pillar

| Field | Type |
| --- | --- |
| `title` | Short text |
| `body` | Long text |
| `lucideIcon` | Short text (`ListChecks`, `Monitor`, `Cable`) |

Create **3** entries (Program Lifecycle, Tech Stack, Ecosystem Integration).

### 2. `conversionMenuItem` — Menu item

| Field | Type |
| --- | --- |
| `title` | Short text |
| `body` | Long text |

Create **2+** entries (Menu Architecture, Partnerships & Delivery).

### 3. `conversionVendor` — Vendor

| Field | Type |
| --- | --- |
| `name` | Short text |
| `logo` | Media (optional) |

### 4. `conversionHomepage` — Homepage (one entry)

| Field | Type |
| --- | --- |
| `heroHeading` | Short text |
| `heroSubheading` | Long text |
| `heroCta` | Short text |
| `heroImage` | Media (optional) |
| `authorityBody` | Long text |
| `founderLabel` | Short text |
| `founderWins` | Long text (one win per line) |
| `founderImage` | Media (optional) |
| `pillars` | References → many `conversionPillar` |
| `menuItems` | References → many `conversionMenuItem` |
| `vendors` | References → many `conversionVendor` |
| `contactHeading` | Short text |
| `contactSubheading` | Short text |
| `contactResponseNote` | Short text |
| `contactCtaLabel` | Short text |
| `chromeCtaLabel` | Short text |
| `navAuthority` / `navPillars` / `navMenu` / `navPartners` / `navContact` | Short text (optional) |

Publish the homepage entry after linking pillars, menu items, and vendors.

## Seed copy (already on Preview)

See `src/lib/content/conversion-seed.ts` — same words the site shows until CMS is published.

## Page sections

1. Hero → Book a Strategy Audit  
2. Authority (Why + Fabio wins)  
3. Core pillars (3)  
4. Specialized menu (accordion)  
5. Trusted Integration Partners  
6. Low-friction contact form  

## Deploy note

This branch is for **Preview / deployment only**. Do not Promote to Production until you approve the design.
