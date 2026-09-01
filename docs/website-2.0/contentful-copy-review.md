# Contentful copy review — Brand OS PDF pack

**Date:** 1 September 2026  
**Sources:** Brand OS PDFs 01–12, live `www.foodsense.tech`, repo seed `src/lib/content/conversion-seed.ts`.

**CMS structure (do not fork):** the Phase 1 lean model from migrations `002` + `003`, documented in [PR #18](https://github.com/foodsensedottech/foodsense-website/pull/18) and [`docs/engineering/contentful-editing-map.md`](../engineering/contentful-editing-map.md).

This brief is **what words to paste**. The editing map is **which field / entry ID**. Copy changes stay on existing types:

| Type | Count we keep |
| --- | --- |
| `conversionHomepage` | 1 entry `conversion-homepage-website-2` |
| `conversionPillar` | 3 (program-lifecycle, tech-stack, ecosystem) |
| `conversionMenuItem` | 4 existing + optional 2 of the **same type** (loyalty, data) |
| `conversionVendor` | 8 (Oracle … Restaurant365) |
| `aboutUsTitleSubtitle` + `aboutUsCard` | 1 + 4 (About route) |

No new content types. No new `conversionHomepage` fields. Footer tagline, form labels, and `/services` stay in code (as PR #18 listed).

Seed copy in the repo is updated to match. **Production Contentful still holds the live strings below until `npm run contentful:seed` is run against `master` (needs `CONTENTFUL_MANAGEMENT_TOKEN`).**

---

## What I understood from the 12 PDFs

| # | Doc | Complete? | Use on the website |
| --- | --- | --- | --- |
| 01 | Vision, Mission & Identity | Yes | Mission/values/who we are–aren’t. Proof is **principal in-role**, not firm logos. |
| 02 | Ideal Client Profile | Yes | Pain quotes, 10+ unit QSR / franchise, LATAM–Caribbean–US. PDF Hell Yes is **20–500**; site stays **10+** (Website 2.0 lock). Red flags stay in sales, not on the page. |
| 03 | Brand Guidelines | Partial (logo images missing from PDF) | Visual system already in `.cursorrules`. Hero photography still violates “no stock.” |
| 04 | Content Voice | Yes | Direct, operator-first, process-driven. Ban: synergy / leverage / innovative / solutions-as-noun / enterprise-architecture theater. Own: Signal vs. noise · Operator-first · Test, prove, scale. |
| 05 | Service Offerings | Yes (plus internal pricing) | Capabilities menu is the specialized accordion. Site sells **three** modes (Advisory / Fractional / Project), not the PDF’s five commercial shapes. **Never publish rates.** |
| 06 | Active Projects | Outline only | No client names until filled. |
| 07 | Operating Logic | Yes | Methodology on-site: phase everything, KPI on every initiative, pilot first. Delegation rules stay internal. |
| 08 | Competitive Positioning | Yes | Best homepage authority copy in the pack (“we’ve actually done the work” / 6am cutover). |
| 09 | Sales & Growth | Outline only | Form is the sales motion for now. |
| 10 | Case Studies | Outline only | Do not keep unsourced 22% / 7% on the homepage. |
| 11 | Technology Stack | Outline + pairings | Vendor row = “we already know,” not preferred-stack ranking. |
| 12 | Frameworks & IP | Outline only | “Test, prove, scale” is the only framework ready for the page. |

**Locked Website 2.0 (do not revert from PDFs):** 10+ units · three engagement modes · ClickUp-only forms · Strategy Audit as primary CTA · Spanish paused · no Promote to Production unless asked.

---

## What is live in Contentful today

Fetched from `https://www.foodsense.tech` (Production reads `conversionHomepage` on `master`). Repo seed had already drifted **behind** CMS.

### Homepage (conversion types) — problems

| Field | Live Contentful | Brand OS problem |
| --- | --- | --- |
| `heroHeading` | “Enterprise Restaurant Technology Architecture for Multi-Unit Franchisees” | Voice fail. Abstract, vendor-brochure, no 10+ unit, no action. PDF 04 example of what not to write. |
| `heroSubheading` | “Turning fragmented vendor ecosystems… into cohesive store-level operations…” | Hedging. “Ecosystems / cohesive / turning X into Y” is consultancy filler. |
| `heroCta` / chrome CTA | “Book a Call” | Locked CTA is **Book a Strategy Audit**. |
| `authorityHeading` | “The authority gap we close” | Vague. PDF 08 title is the line: **We’ve actually done the work.** |
| `authorityBody` | “neutral operational bridge… digital transformation… 22% food costs… 7% net profit… 30+ markets” | Ban list: digital transformation, bridge-as-metaphor. **22% / 7% not in Brand OS.** Inflates prior-role proof into firm-wide outcomes. |
| `founderWins` | Anonymized “tier-1 global QSR” / “SoftBank/Mubadala-backed” / “10 to 500+ units” | Resume-speak. SoftBank name-drop. 10–500 contradicts 10+ lock. Named in-role work (KFC, RBI, REEF) is stronger and already approved as **prior roles**. |
| Pillars | Match seed — keep | Operator-first, good. |
| Menu (4 items) | Match seed — keep, **incomplete vs PDF 05** | Loyalty, kitchen/IoT, data, roadmapping missing from homepage. |
| Partners heading | “Trusted Integration Partners” | Implies partnership/resale. We are vendor-agnostic. |
| Contact | “Book a Call” + good subhead | Restore Strategy Audit. |

Pillars and the four menu rows are the only conversion copy that already sounds like FoodSense.

### About (`aboutUsTitleSubtitle` + `aboutUsCard`) — keep

Live About is already Brand OS:

- Boutique consultancy · 10+ unit · stack that runs every shift
- Operator-first, not deck-first (6am cutover)
- Built for 10+ unit operators
- LATAM, Caribbean, and US
- Test, prove, scale

Tighten page chrome only (empty “Our Team”, “Ready to Optimize Your Restaurant?”).

### `/services` — not Contentful, still indexed

Hardcoded SaaS leftovers: Menu Optimization, Cost Management, Analytics Dashboard, Inventory Management, Staff Optimization, Consulting. That is the **old independent-restaurant product**, the opposite of PDF 01 “who we aren’t.” This page is rewritten in code from PDF 05.

### `/contact`

Generic “Fill out the form… as soon as possible.” Plus form labels **Option 1–6**. Copy now pulls conversion contact strings; service checkboxes use capability names (ClickUp label UUIDs unchanged — **rename Option 1–6 in ClickUp** to match).

---

## How to improve it (priority)

1. **Re-seed `conversionHomepage` from the updated seed** so Production matches Brand OS voice. Paste pack is below if you edit in the UI instead.
2. **Kill unsourced KPIs** until PDF 10 is filled.
3. **Name prior-role proof**, with the About framing that these are not FoodSense client logos.
4. **Optional:** add two accordion rows of type `conversionMenuItem` (loyalty, data) and link them on `menuItems`. Kitchen + roadmapping stay on `/services` (code).
5. **Retitle the vendor row** via `partnersHeading` (field ID unchanged) so we do not claim partnership.
6. **Restore Strategy Audit** as the only primary CTA (`heroCta`, `chromeCtaLabel`, `contactHeading`).
7. Owner follow-ups: fill PDFs 06 / 09–12; replace stock hero; rename ClickUp service labels.

---

## Contentful paste pack (master)

Edit **[conversion-homepage-website-2](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-homepage-website-2)** — same entry as the editing map. Field IDs below match migrations `002`/`003`. Deep links: [`contentful-editing-map.md`](../engineering/contentful-editing-map.md).

### conversionHomepage (`conversion-homepage-website-2`)

| Field | Paste |
| --- | --- |
| `heroBrandLabel` | FoodSense |
| `heroHeading` | Fractional tech and ops leadership for 10+ unit QSR. |
| `heroSubheading` | Six vendors. Zero integration. We name what's fractured, sequence the work, and guide your teams through POS, kiosk, delivery, and data — Advisory, then Fractional or Project. Test, prove, scale. |
| `heroCta` | Book a Strategy Audit |
| `authorityEyebrow` | Why FoodSense |
| `authorityHeading` | We've actually done the work |
| `authorityWinsLabel` | In-role, not slideware |
| `authorityBody` | The restaurant industry does not have enough people who speak operator and technologist in the same sentence — fewer still across markets, languages, and franchise structures. We've been in the store at 6am during a cutover. We review payloads, sit in integration tests, and hold vendors accountable. We guide the teams you already have. We do not become another FTE. |
| `founderLabel` | Fabio Escobar |
| `founderWins` (one per line) | Led restaurant technology for KFC across 20+ countries and 2,200 restaurants in Latin America and the Caribbean |
| | Deployed POS programs across the US and Canada at Restaurant Brands International |
| | Helped shape early cloud-kitchen and delivery stacks at REEF |
| | Built vendor assessment and store-level landing playbooks for multi-unit franchisees |
| `pillarsEyebrow` | Core pillars |
| `pillarsHeading` | What we do |
| `menuEyebrow` | Capabilities |
| `menuHeading` | Where we go deep |
| `partnersEyebrow` | The stack |
| `partnersHeading` | Vendors we already know |
| `contactHeading` | Book a Strategy Audit |
| `contactSubheading` | Tell us the blocker — stack, cutover, or vendor. We respond within 24 hours. |
| `contactResponseNote` | Response within 24 hours. |
| `contactCtaLabel` | Request audit |
| `chromeCtaLabel` | Book a Strategy Audit |
| `navAuthority` | About |
| `navPillars` | What We Do |
| `navMenu` | Services |
| `navPartners` | Vendors |
| `navContact` | Contact |

### conversionPillar (keep these three IDs)

| Entry ID | Title / body |
| --- | --- |
| `conversion-pillar-program-lifecycle` | Program lifecycle & RFP management — Name the blocker, run the RFP, land the vendor, and own cutover — so the initiative does not stall after the kickoff deck. |
| `conversion-pillar-tech-stack` | Tech stack optimization — Standardize POS, FOH, and BOH into one operating model. Fewer one-offs. Cleaner data. Crews that can actually run what you bought. |
| `conversion-pillar-ecosystem` | Ecosystem integration — Filter bad software before it hits your stores. Validated vendors, integration patterns, and clear ownership across the stack. |

### conversionMenuItem (existing four IDs)

| Entry ID | Title / body |
| --- | --- |
| `conversion-menu-revenue` | POS & core systems — migration without downtime theater / Vendor evaluation, cutover planning, phased rollouts, and post-go-live stabilization for Oracle, NCR, and the rest of the core stack. |
| `conversion-menu-partnerships` | Kiosk & self-service — program management end to end / Vendor assessment, UI alignment, POS connectivity, menu config, and deployment coordination so kiosk does not die in pilot. |
| `conversion-menu-delivery` | Delivery & e-commerce — volume without fee bleed / First- and third-party channel strategy that grows orders without quietly erasing margin in fees and promos. |
| `conversion-menu-vendor-governance` | Vendor governance — who stays and who goes / Risk assessments, RFPs, and performance management so you stop paying for tools that never landed in every store. |

Optional same-type rows (link on homepage `menuItems`; seed creates these IDs):

| Entry ID | Title / body |
| --- | --- |
| `conversion-menu-loyalty` | Loyalty, CRM & guest engagement / Platform selection, earn/burn logic, API / webhook contracts, and campaign architecture so loyalty is not a side system the stores ignore. |
| `conversion-menu-data` | Data & analytics / KPI definition, cross-market reconciliation, and reporting that ops can actually run. Build the dashboard before the initiative. |

### conversionVendor (keep these eight IDs)

`conversion-vendor-oracle`, `ncr`, `toast`, `deliverect`, `tillster`, `grubbrr`, `hme`, `r365` — names only. Do not add “preferred” copy.

### About (already Brand OS)

`aboutUsTitleSubtitle` `5tTay5jmvkeJCPx27jw2Dk` + four `aboutUsCard` IDs in the editing map. Leave as-is unless you want a heading tweak.

---

## Apply from the repo

```bash
CONTENTFUL_ENVIRONMENT=master npm run contentful:seed
```

Then revalidate (`POST /api/revalidate`) or wait for the hourly ISR. Preview first; do not Promote to Production unless asked.

## ClickUp (owner, 5 minutes)

Leads → **Services Interested in** → rename labels (keep the same option UUIDs):

1. POS & core systems  
2. Kiosk & self-service  
3. Loyalty & guest engagement  
4. Delivery & e-commerce  
5. Data & analytics  
6. Vendor governance  
