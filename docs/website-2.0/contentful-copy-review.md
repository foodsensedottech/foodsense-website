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

Seed copy in the repo is updated to match. **Production Contentful still holds the live strings below until you paste the pack (or run `npm run contentful:seed` against `master` with `CONTENTFUL_MANAGEMENT_TOKEN`).** Do not seed from this agent — owner pastes.

---

## Homepage story (this pass)

The first Brand OS paste pack was still **insider**: “Fractional tech and ops leadership for 10+ unit QSR.” / “Six vendors. Zero integration.” / “In-role, not slideware.” Accurate for people who already know FoodSense. Wrong for a first visit.

This pass writes the conversion homepage as a **story for four rooms** — operators of multi-unit restaurants, ops, technology, and heads of digital channels — and names **who we are** and **who we write to**:

- **Who we are:** a focused boutique consultancy that bridges restaurant technology and restaurant operations.
- **ICP:** multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean (10+ units on the site).
- **The scene:** corporate sent a stack, vendors sent a deck, Friday night still has to work.
- **The offer:** sequence what they already bought; guide the team they already have; Advisory, then Fractional or Project.

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

1. **Paste the conversion homepage pack below** (or re-seed from the updated seed) so Production matches this story: bridge + ICP + four rooms. Do not keep “Fractional tech and ops leadership…” or the live “Enterprise Restaurant Technology Architecture…” H1.
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
| `menuHeading` | The stack you already have. In the order the store can absorb. |
| `partnersEyebrow` | The stack |
| `partnersHeading` | Vendors we have run in the field |
| `contactHeading` | Tell us where the gap is. |
| `contactSubheading` | Operators, ops, technology, heads of digital. One conversation. We will tell you if a Strategy Audit is the right first move, or if you already know the blocker and need a scoped engagement. |
| `contactResponseNote` | Response within 24 hours. |
| `contactCtaLabel` | Book a Strategy Audit |
| `chromeCtaLabel` | Book a Strategy Audit |
| `navAuthority` | About |
| `navPillars` | What We Do |
| `navMenu` | Services |
| `navPartners` | Vendors |
| `navContact` | Contact |

### conversionPillar (keep these three IDs)

| Entry ID | Title / body |
| --- | --- |
| `conversion-pillar-program-lifecycle` | Program lifecycle & RFP management — Ops has a cutover date. Tech has an RFP. Digital has a channel that cannot wait. We name the blocker, run the selection, land the vendor, and stay through cutover so the initiative does not die after the kickoff deck. |
| `conversion-pillar-tech-stack` | Tech stack optimization — The operator needs one way to run the store. The technology lead needs fewer one-offs. We standardize POS, FOH, and BOH into an operating model crews can actually run — not a slide of logos. |
| `conversion-pillar-ecosystem` | Ecosystem integration — Heads of digital inherit six vendors that do not talk. We filter what should never hit the stores, map the integrations that must, and make ownership explicit so ops is not debugging the stack on a Saturday. |

### conversionMenuItem (existing four IDs)

| Entry ID | Title / body |
| --- | --- |
| `conversion-menu-revenue` | POS & core systems — migration without downtime theater / The system the store actually runs on. We help operators, ops, and technology choose, cut over, and stabilize POS so the ticket, the kitchen, and the guest path agree. |
| `conversion-menu-partnerships` | Kiosk & self-service — program management end to end / Kiosk only pays off when the menu, the labor plan, and the kitchen ticket agree. We treat it as an operations project with a screen on it, not a hardware drop. |
| `conversion-menu-delivery` | Delivery & e-commerce — volume without fee bleed / First-party and marketplace orders hitting one kitchen. We sit with ops and the head of digital channels so the store can fulfill what the app promised. |
| `conversion-menu-vendor-governance` | Vendor governance — who stays and who goes / You already bought more than you can land. We run the RFP, the risk call, and the performance review so technology and ops stop paying for tools that never made it to every store. |

Optional same-type rows (link on homepage `menuItems`; seed creates these IDs):

| Entry ID | Title / body |
| --- | --- |
| `conversion-menu-loyalty` | Loyalty, CRM & guest engagement / Points, offers, and identity only work if they survive the POS, the app, and the store playbook. We connect the program to the operation — not the other way around. |
| `conversion-menu-data` | Data & analytics / One number for the operator, the ops lead, and the head of digital. We help you stop reconciling three dashboards after every period close. |

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
