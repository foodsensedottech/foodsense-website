# Contentful copy review — Brand OS PDF pack

**Date:** 1 September 2026  
**Sources:** Brand OS PDFs 01–12, live `www.foodsense.tech`, repo seed `src/lib/content/conversion-seed.ts`.

**CMS structure (do not fork):** the Phase 1 lean model from migrations `002` + `003`, documented in [PR #18](https://github.com/foodsensedottech/foodsense-website/pull/18) and [`docs/engineering/contentful-editing-map.md`](../engineering/contentful-editing-map.md).

This brief is **what words to paste**. The editing map is **which field / entry ID**. Copy changes stay on existing types **plus** migration `004` (`servicesPage`, `franchiseeLandingPage`, footer fields).

| Type | Count we keep |
| --- | --- |
| `conversionHomepage` | 1 entry `conversion-homepage-website-2` |
| `conversionPillar` | 3 (program-lifecycle, tech-stack, ecosystem) |
| `conversionMenuItem` | homepage accordion + `/services` + `/franchisees` cards (distinct IDs) |
| `services` or `servicesPage` | 1 Services entry |
| `franchiseeLandingPage` | 1 entry `franchisee-landing-website-2` |
| `aboutUsTitleSubtitle` + `aboutUsCard` | 1 + 4 (About route) |

**Vendor logo cloud is retired.** Do not paste `conversionVendor` / `partnersHeading` / `navPartners`. Brand OS is vendor-agnostic (no resale, no commissions, no partnership claim).

Footer tagline is a `conversionHomepage` field (`footerTagline`). Form labels stay in code. `/services` and `/franchisees` are CMS.

Seed copy in the repo is updated to match. **Production Contentful still holds the live strings below until you paste the pack (or run `npm run contentful:seed` against `master` with `CONTENTFUL_MANAGEMENT_TOKEN`).** Do not seed from this agent — owner pastes.

---

## Homepage story (this pass)

The first Brand OS paste pack was still **insider**: “Fractional tech and ops leadership for 10+ unit QSR.” / “Six vendors. Zero integration.” / “In-role, not slideware.” Accurate for people who already know FoodSense. Wrong for a first visit.

This pass writes the conversion homepage as a **story for four rooms** — operators of multi-unit restaurants, ops, technology, and heads of digital channels — and names **who we are** and **who we write to**:

- **Who we are:** a focused boutique consultancy that bridges restaurant technology and restaurant operations.
- **ICP:** multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean (10+ units on the site).
- **The scene:** corporate sent a stack, vendors sent a deck, Friday night still has to work.
- **The offer:** sequence what they already bought; guide the team they already have; Advisory, then Fractional or Project.
- **Pillars (owner copy):** kitchen-throughput rollouts · hands-on support for lean local IT · regional & franchise ecosystem (English and Spanish). Same three Contentful IDs.
- **Menu:** decision-maker titles, no em-dash punchlines. Same four IDs plus optional loyalty and reporting rows.

CTA stays **Book a Strategy Audit**. Field IDs and entry IDs do not change.

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
| Pillars | Program lifecycle / tech stack / ecosystem | Replace with owner-approved three: kitchen throughput rollouts, lean local IT, regional & franchise ecosystem. Same three entry IDs. |
| Menu (4 items) | Dash-and-slash punchlines (“downtime theater”, “fee bleed”) | Rewrite for decision makers. Same four IDs plus optional loyalty and reporting rows. |
| Partners heading | “Trusted Integration Partners” | Implies partnership/resale. We are vendor-agnostic. |
| Contact | “Book a Call” + good subhead | Restore Strategy Audit. |

Pillars now use owner copy. Menu is rewritten for franchisee, ops, technology, and digital-channel decision makers.

### About (`aboutUsTitleSubtitle` + `aboutUsCard`) — keep

Live About is already Brand OS:

- Boutique consultancy · 10+ unit · stack that runs every shift
- Operator-first, not deck-first (6am cutover)
- Built for 10+ unit operators
- LATAM, Caribbean, and US
- Test, prove, scale

Tighten page chrome only (empty “Our Team”, “Ready to Optimize Your Restaurant?”).

### `/services`

Paste pack is in this file (below) and in `src/lib/content/services-page.ts`. Until a Services entry is **published**, Preview still shows that seed. Do not reuse the old SaaS leftovers (Menu Optimization, Cost Management, etc.).

### `/contact`

Generic “Fill out the form… as soon as possible.” Plus form labels **Option 1–6**. Copy now pulls conversion contact strings; service checkboxes use capability names (ClickUp label UUIDs unchanged — **rename Option 1–6 in ClickUp** to match).

---

## How to improve it (priority)

1. **Paste the conversion homepage pack below** (or re-seed from the updated seed) so Production matches this story: bridge + ICP + four rooms. Do not keep “Fractional tech and ops leadership…” or the live “Enterprise Restaurant Technology Architecture…” H1.
2. **Kill unsourced KPIs** until PDF 10 is filled.
3. **Name prior-role proof**, with the About framing that these are not FoodSense client logos.
4. **Optional:** add two accordion rows of type `conversionMenuItem` (loyalty, data) and link them on `menuItems`. Kitchen + roadmapping stay on `/services`.
5. **Remove the vendor row.** Do not retitle it. The site no longer renders `conversionVendor`.
6. **Restore Strategy Audit** as the only primary CTA (`heroCta`, `chromeCtaLabel`, `contactHeading`).
7. Owner follow-ups: fill PDFs 06 / 09–12; replace stock hero; rename ClickUp service labels.

---

## Contentful paste pack (master)

Edit **[conversion-homepage-website-2](https://app.contentful.com/spaces/es87a9loayi1/entries/conversion-homepage-website-2)** — same entry as the editing map. Field IDs below match migrations `002`/`003`. Deep links: [`contentful-editing-map.md`](../engineering/contentful-editing-map.md).

### conversionHomepage (`conversion-homepage-website-2`)

| Field | Paste |
| --- | --- |
| `heroBrandLabel` | Multi-unit · Multi-brand franchisees |
| `heroHeading` | We bridge restaurant technology and restaurant operations. |
| `heroSubheading` | FoodSense is a focused consultancy for multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean. Operators, ops leads, technology teams, and heads of digital channels hire us when the vendor roadmap and the stores have stopped speaking the same language. We sequence POS, kiosk, delivery, and data. We guide the teams you already have. Advisory, then Fractional or Project. |
| `heroCta` | Book a Strategy Audit |
| `authorityEyebrow` | Why FoodSense |
| `authorityHeading` | We sit between the roadmap and the store. |
| `authorityWinsLabel` | Work the principal has run |
| `authorityBody` | If you run the stores, the ops calendar, the stack, or the digital channels, you already know the scene: corporate sent a stack, the vendors sent a deck, and Friday night still has to work. FoodSense is a boutique firm at that intersection — restaurant operations and restaurant technology — across the US, LATAM, and the Caribbean. We have sat in the 6am cutover and in the payload review. We do not sell software. We do not become another FTE. We help you sequence what you already bought, guide the team you already have, and keep the rollout honest. |
| `founderLabel` | Fabio Escobar |
| `founderWins` (one per line) | Led restaurant technology for KFC across 20+ countries and 2,200 restaurants in Latin America and the Caribbean |
| | Deployed POS programs across the US and Canada at Restaurant Brands International |
| | Helped shape early cloud-kitchen and delivery stacks at REEF |
| | Built vendor assessment and store-level landing playbooks for multi-unit franchisees |
| `pillarsEyebrow` | For the people who have to make it run |
| `pillarsHeading` | What we do in the gap |
| `menuEyebrow` | Capabilities |
| `menuHeading` | Programs a multi-unit group has to get right |
| `contactHeading` | Tell us where the gap is. |
| `contactSubheading` | Operators, ops, technology, heads of digital. One conversation. We will tell you if a Strategy Audit is the right first move, or if you already know the blocker and need a scoped engagement. |
| `contactResponseNote` | Response within 24 hours. |
| `contactCtaLabel` | Book a Strategy Audit |
| `chromeCtaLabel` | Book a Strategy Audit |
| `navAuthority` | About |
| `navPillars` | What We Do |
| `navMenu` | Services |
| `navContact` | Contact |
| `footerTagline` | We bridge restaurant technology and restaurant operations. |

### conversionPillar (keep these three IDs)

| Entry ID | Title / body |
| --- | --- |
| `conversion-pillar-program-lifecycle` | Full-Lifecycle Technology Rollouts Built for Kitchen Throughput — We bridge legacy POS platforms, kiosks, and delivery apps with back-of-house kitchen displays so peak digital rushes don't turn into prep-line bottlenecks or burned-out store teams. |
| `conversion-pillar-tech-stack` | Hands-On Rollout Support for Lean Local IT Teams — We embed directly alongside internal store IT teams to manage vendor accountability, debug live store setups, and activate overnight rollouts—turning static strategy into reliable store execution. |
| `conversion-pillar-ecosystem` | Established Regional & Franchise Ecosystem — We navigate complex multi-market franchise dynamics in English and Spanish, using established relationships with brand leads, master franchisees, and regional vendors to keep deployments moving on schedule. |

### conversionMenuItem (existing four IDs)

Same entries. New titles. No em-dash punchlines. No slash constructions.

| Entry ID | Title | Body |
| --- | --- | --- |
| `conversion-menu-revenue` | POS Migration for Multi-Unit Operations | We sequence vendor selection, market pilots, and overnight cutover so the new POS lands while kitchens keep ticket times and stores stay open. |
| `conversion-menu-partnerships` | Kiosk Programs Your Store Team Can Run | We connect kiosk, POS, and kitchen display, then stay with local IT through activation so a rush of digital tickets does not stall the prep line. |
| `conversion-menu-delivery` | Delivery Volume the Kitchen Can Fulfill | Marketplace and first-party orders hit the same line. We set what each store can take, then hold vendors and the promo calendar to that limit. |
| `conversion-menu-vendor-governance` | Vendor Accountability Across Every Store | We run the RFP, debug live setups, and keep brand leads and regional vendors on a schedule. You stop funding software that never made it past the pilot. |

Optional same-type rows (link on homepage `menuItems`; seed creates these IDs):

| Entry ID | Title | Body |
| --- | --- | --- |
| `conversion-menu-loyalty` | Loyalty the Store and the App Can Both Run | We connect offers, POS, and the cashier playbook before you scale loyalty across brands and markets. |
| `conversion-menu-data` | Reporting Operators and Digital Leads Can Share | We define the numbers the franchisee, ops, and head of digital will use at period close, so markets are not reconciling three dashboards after every cycle. |

Do not seed vendor names.

### Services (`services` type — one entry)

Canonical words: [`src/lib/content/services-page.ts`](../../src/lib/content/services-page.ts). Brand source: [`docs/brand/03-services.md`](../brand/03-services.md).

Create **new** Conversion Menu Item entries for the three modes and eight capabilities. Do not reuse the homepage accordion items on this entry.

| Your field (Contentful UI) | Paste |
| --- | --- |
| Meta Title | Services |
| Meta Description | Advisory, fractional work, and project management for POS, kiosk, delivery, loyalty, and data — for 10+ unit QSR and franchise operators. |
| Eyebrow | How we engage |
| Heading | Advisory, Fractional, Project. |
| Intro (must be **Long text**) | FoodSense is a focused consultancy at the gap between restaurant technology and restaurant operations. We work with multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean — operators, ops, technology, and heads of digital channels. We guide the teams you already have. We do not become extra FTE, and we do not sell a platform. Advisory, then Fractional or Project. Test, prove, scale. |
| Capabilities Eyebrow | Capabilities |
| Capabilities Heading | What those modes cover |
| Not This Heading (`notThisHeading`) | What we don't do |
| Not This Items (`notThisItems`, one line each) | Software product development — we architect and guide; we do not ship a platform |
| | Brand or marketing strategy |
| | Single-unit independents |
| | Hardware procurement |
| | Help desk / managed services |
| | Strategy decks with no execution path |
| CTA Heading | Book a Strategy Audit |
| CTA Body | Operators, ops, technology, heads of digital. Tell us where the vendor roadmap and the stores have stopped lining up. |
| CTA Label | Book a Strategy Audit |

**Engagement Modes** — three Conversion Menu Items (Title / Body):

| Title | Body |
| --- | --- |
| Advisory | For the decision-maker at 10+ units who needs the gap named and a sequence for what to standardize. We name what is fractured and guide the teams that already exist. |
| Fractional work | Embedded leadership cadence without another FTE. Roadmap ownership, vendor relationships, and decision support beside the operator's clock. |
| Project management | Bounded initiatives with a clear start and end — RFP, cutover, kiosk program, migration. Scoped deliverables and milestones. |

**Capabilities** — eight Conversion Menu Items:

| Title | Body |
| --- | --- |
| POS Migration for Multi-Unit Operations | We sequence vendor selection, market pilots, and overnight cutover so the new POS lands while kitchens keep ticket times and stores stay open. |
| Kiosk Programs Your Store Team Can Run | We connect kiosk, POS, and kitchen display, then stay with local IT through activation so a rush of digital tickets does not stall the prep line. |
| Loyalty the Store and the App Can Both Run | We connect offers, POS, and the cashier playbook before you scale loyalty across brands and markets. |
| Delivery Volume the Kitchen Can Fulfill | Marketplace and first-party orders hit the same line. We set what each store can take, then hold vendors and the promo calendar to that limit. |
| Kitchen Management and IoT | Kitchen display, production, and sensors for cook time and food safety where they earn their place in the store. |
| Reporting Operators and Digital Leads Can Share | We define the numbers the franchisee, ops, and head of digital will use at period close, so markets are not reconciling three dashboards after every cycle. |
| Digital Strategy and Roadmapping | Multi-year technology roadmaps tied to store growth and channel mix, with a sequence the existing team can run. |
| Vendor Accountability Across Every Store | We run the RFP, debug live setups, and keep brand leads and regional vendors on a schedule. You stop funding software that never made it past the pilot. |

Publish the menu items, then the Services entry. Check Preview `/services`.

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
