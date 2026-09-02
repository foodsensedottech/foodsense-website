# FoodSense Website — Technical Assessment & Remediation Plan

**Repository:** `foodsense-website`
**Live site:** https://www.foodsense.tech
**Original assessment:** 27 August 2026  
**Last status pass:** 1 September 2026 (PR #19 merged)
**Purpose:** Handoff document. Read this before making changes.

**Canonical path:** `docs/website-2.0/assessment.md` (this file). Locked product decisions that supersede parts of the remediation sequence live in [`decisions.md`](./decisions.md).

Findings below keep the 27 Aug evidence. **Status (1 Sep 2026)** lines say what is true on the integration branch now. Do not re-open closed items from the original wording.

---

### Current state (1 September 2026)

| Layer | What is true |
| --- | --- |
| **Integration branch** | `fixes-20250301-195504` at merge `6ada7c2` — **PR #19** (Brand OS copy, conversion seed, editing map). PR #18 closed as absorbed into #19. |
| **Production (`www.foodsense.tech`)** | Last **promoted** code was **PR #16** (`30d4241`, stop querying deleted `franchiseeOffersTitle`). Promoting Preview is a separate Vercel step. Do not Promote unless the owner asks. |
| **Contentful `master`** | Homepage still reads published `conversionHomepage` + linked pillars/menu/vendors. Repo seed is the paste pack; the live CMS is stale until the owner **Publishes** entries and revalidates ([`revalidation.md`](../engineering/revalidation.md)). |
| **Preview** | Vercel Preview of `fixes-20250301-195504` has PR #19 code. CMS cache is per-host; the webhook targets Production `www` only. |

**Merged onto integration after Website 2.0 (PR #10):** #11 docs · #12–#14 HubSpot/build · #15 Node 24 + lazy Contentful preview · #16 franchisee type query · #17 CMS eyebrows/H2s · **#19 Brand OS copy**.

**Owner priority now:**

1. Paste the pack in [`contentful-copy-review.md`](./contentful-copy-review.md) → **Publish** (homepage + each pillar + each menu row).
2. Revalidate the host you are looking at (`/api/revalidate?secret=…&path=/`). Preview ≠ Production.
3. Verify Preview of `fixes-20250301-195504`. **Promote to Production only when asked.**
4. Then Phase 2 content (§9.3–9.4).

Track work on ClickUp **Website Redesign Tasks** ([board](https://app.clickup.com/90131064868/v/b/6-901328341052-2)).

**Git:** Branch off `fixes-20250301-195504` — [`git-workflow.md`](./git-workflow.md).

| Phase 0 task | Status |
| --- | --- |
| 0.1 Maturity Score + Band fields in ClickUp | **Deferred** — only if `/franchisees` is revived |
| 0.2 `clickup/client.ts` | **Done** |
| 0.3 Drop phantom field, Project = Website, dedupe | **Done** — `create-contact-lead.ts`; lookup by email |
| 0.4–0.6 Assessment → ClickUp | **Deferred** — `/franchisees` scores locally (`captured: false`) |
| 0.7 Strip HubSpot from contact | **Done** — PR #13, ClickUp-only `/api/contact` |
| 0.8–0.10 Remove HubSpot package | **Done** — `src/lib/hubspot/` gone; property map archived |
| 0.11 Sitemap consolidation | **Partial** — `postbuild` runs `next-sitemap`; `src/app/sitemap.ts` still absent (`.bak` only) |
| 0.12 `noindex` on `/ui-showcase` | **Open** |
| 0.13–0.14 Franchisees in nav + GSC | **Deferred** |
| 0.15 Vercel Pro | **Owner decision** |

| Phase 1 task | Status |
| --- | --- |
| 1.1 Create `staging` | **Done** |
| 1.2 Fix `seoMetadata.pageId` | **Done** (master + staging) |
| 1.3–1.6 `caseStudy` / `framework` / etc. | **Phase 2** — [`decisions.md`](./decisions.md) |
| 1.7–1.9 Retire legacy types | **Done** — 11 types on master + staging |
| 1.10 Create `conversion*` + seed homepage | **Done** |
| Editing map (what field is which section) | **Done** — [`contentful-editing-map.md`](../engineering/contentful-editing-map.md) (PR #18 absorbed by #19) |
| Brand OS conversion copy in repo | **Done** — PR #19 seed + paste pack. **CMS publish is owner.** |
| Unified contact form + ClickUp field alignment | **Done** |
| Contact form UX (intl phone, compact country selector) | **Done** |

**Product note:** Primary conversion is the **conversion homepage** + one shared contact form. `/franchisees` stays in the repo, not in nav ([`decisions.md`](./decisions.md)).

---

## 0. How to use this document

This is a findings-and-remediation record, not a spec. Each finding carries a
severity, the evidence it rests on, and a proposed fix. Where a fix depends on a
decision only the owner can make, that is called out explicitly under
[§9 Open Items](#9-open-items-owner-decisions-required).

Two conventions:

- **VERIFIED** — confirmed by direct inspection (API response, file contents, live request).
- **INFERRED** — deduced from filenames, config, or indirect evidence. Confirm before acting.

Do not treat INFERRED findings as fact. Several of them are load-bearing.

---

## 1. Scope of assessment

| Artifact | Method | Coverage |
|---|---|---|
| Contentful content model | `contentful space export --skip-content` | Complete — 25 types, 136 fields |
| Repository structure | `git ls-files` | Complete — file listing only |
| Source files | Direct read | Partial — 5 files (see below) |
| ClickUp CRM | ClickUp API | Complete — Leads list, custom fields, statuses |
| Live site | HTTP fetch | Homepage only |
| Search presence | Web search | Indexed snippets only |
| Brand documentation | Direct read | Complete — 7 docs |

**Source files read in full:**

- `src/app/api/contact/route.ts`
- `src/app/api/assessment/route.ts`
- `src/lib/clickup/create-lead.ts`
- `src/app/sitemap.ts`
- `next-sitemap.config.js`

**Not read.** Everything else. In particular `src/lib/franchisees/score.ts`,
`src/lib/validation/*`, `src/lib/contentful/*`, and all
components. Findings that touch these are INFERRED.

---

## 2. Stack as built

| Layer | Actual |
|---|---|
| Framework | Next.js 14.1.0, App Router, TypeScript 5.3.3 |
| React | 18.2.0 |
| Styling | Tailwind 3.4.0 + `@tailwindcss/forms`, `@tailwindcss/typography` |
| UI primitives | Radix UI (13 packages), `class-variance-authority`, `tailwind-merge` |
| CMS | Contentful 11.5.0, space `es87a9loayi1` |
| CRM | ClickUp only |
| Forms | `react-hook-form` 7.49.3 + `zod` 3.24.2 |
| Animation | `framer-motion` 12.4.7 |
| Charts | `recharts` 2.15.1 |
| Monitoring | `@sentry/nextjs` 9.2.0, Vercel Analytics, Speed Insights |
| Hosting | Vercel, Hobby plan |
| Runtime | Node 24.x (`package.json` engines; PR #15) |
| Testing | Jest 29 + Testing Library |

The stack is sound and matches the target architecture. **No rewrite is
warranted.** Everything below is debt and wiring, not architecture.

---

## 3. Findings — Critical

### 3.1 The maturity assessment captures zero leads — VERIFIED

**Status (1 Sep 2026):** HubSpot path is **gone** (PR #13). `/api/assessment` still returns `captured: false` **on purpose** until `/franchisees` is wired to ClickUp. Not a Website 2.0 launch blocker. Original write-up below.

**File:** `src/app/api/assessment/route.ts`

The route has exactly one persistence destination:

```ts
if (process.env.HUBSPOT_ACCESS_TOKEN) {
  // ...create HubSpot company + contact
  captured = true;
}
```

HubSpot is decommissioned. The branch never executes. `captured` stays `false`,
and the route still returns:

```ts
return NextResponse.json({ success: true, captured, score, band, ... });
```

The visitor completes the assessment, receives their maturity score, and the
lead is **silently discarded**. There is no ClickUp code path in this file.

**Impact.** Total data loss on the highest-intent conversion path on the site.

**Fix.** Write a ClickUp destination before removing HubSpot. Sequence in §7.

---

### 3.2 `@hubspot/api-client` cannot be removed yet — VERIFIED

**Status (1 Sep 2026):** **Closed.** Package and `src/lib/hubspot/` removed in PR #13. Assessment route no longer imports HubSpot.

`src/app/api/assessment/route.ts` imports from `@/lib/hubspot/client`. Removing
the package or the `src/lib/hubspot/` directory before §3.1 is fixed **will
break the build**. Order matters.

---

## 4. Findings — High

### 4.1 Phantom ClickUp custom field — VERIFIED

**Status (1 Sep 2026):** **Closed.** Phantom `source` ID is gone. Leads write lives in `src/lib/clickup/create-contact-lead.ts`.

**File:** `src/lib/clickup/create-lead.ts`

```ts
source: "f429cf6f-58b1-4cb3-8eb8-e30b80711711",
```

Queried the Leads list (`901328239583`) at list, space, and workspace scope.
**No custom field with this ID exists.** Sixteen fields are defined; this is not
one of them.

A live end-to-end form test (task `86ak79n4g`) confirmed ClickUp **silently
ignores** the unknown field rather than rejecting the write. All nine real
fields populated correctly. So this is not currently breaking submissions.

It is still latent risk: the retry handler in `createClickUpLead` only catches
phone-format errors and re-throws everything else. If ClickUp ever tightens
validation on unknown field IDs, every submission returns a 502.

**Fix.** Delete the field. Set `Project = Website` instead (see §4.2).

---

### 4.2 Lead source is not tracked at all — VERIFIED

**Status (1 Sep 2026):** **Closed.** Contact create sets `Project = Website` (`CLICKUP_PROJECT_WEBSITE`).

Task `86ak79n4g` came through the website form with the `Project` dropdown
**empty**. A website lead, a LinkedIn lead, and a referral are indistinguishable
in the pipeline.

The mechanism already exists and is unused:

| | ID |
|---|---|
| `Project` field | `b8734eca-e728-415d-9e9a-096baf15e4d1` |
| `Website` option | `f52ad055-0eee-4d74-a389-6d15e4aa3ee8` |

**Fix.** Set `Project = Website` on create.

---

### 4.3 No deduplication — "one task = one lead" is not enforced — VERIFIED

**Status (1 Sep 2026):** **Closed for the contact form.** `findLeadByEmail` then comment/enrich on match (`create-contact-lead.ts`). Still **not** wired for `/franchisees`.

The Leads list description states the operating rule: *"One task = one lead.
Status is the pipeline."*

Nothing in the code enforces it. A visitor who runs the assessment and later
submits the contact form produces two tasks for one person. ClickUp has no
upsert primitive, so this must be handled in application code.

**Fix.** Look up by email before every write. On match, comment on the existing
task and enrich its fields rather than creating a new one.

A lookup failure must return `null`, never throw. A broken dedupe check should
produce a duplicate lead, never a lost one.

---

### 4.4 `seoMetadata.pageId` blocks every new page — VERIFIED

**Status (1 Sep 2026):** Phase 1.2 marked **Done** on master + staging (free slug). Confirm in Contentful before adding `caseStudy` pages. Original closed-enum write-up below.

**Content type:** `seoMetadata`

```
pageId : Symbol, REQUIRED, UNIQUE
  validation: in ['home', 'about', 'services', 'blog', 'contact']
```

The validation is a closed enum. Every case study page, framework page, and
article fails validation at creation. The `unique` constraint additionally
enforces a one-to-one page mapping, which is wrong for a collection.

**This is the hard blocker on all Phase 2 content work.**

**Fix options:**

1. Replace the enum with a free `Symbol` slug, keeping `unique`. Most flexible.
2. Extend the enum to include `caseStudy`, `framework`, `article`, and treat
   `pageId` as a type discriminator, dropping `unique`.

Recommend option 1.

---

### 4.5 Three competing sitemap mechanisms — VERIFIED

**Status (1 Sep 2026):** **Partial.** `package.json` now has `postbuild: next-sitemap`. `src/app/sitemap.ts` is still only a `.bak`. `public/sitemap.xml` remains. `/franchisees` still excluded. Consolidation is still Phase 0.11.

| Source | State |
|---|---|
| `public/sitemap.xml` | Still committed |
| `src/app/sitemap.ts` | Missing — only `sitemap.ts.bak` |
| `next-sitemap.config.js` | Runs on `postbuild`, `outDir: "public"` |

`package.json` now has a `postbuild` script (`next-sitemap`). The original audit said it did not; that is stale. `public/sitemap.xml` can still collide with generated output. `src/app/sitemap.ts.bak` remains committed.

Additionally, `next-sitemap.config.js` explicitly excludes `/franchisees` and
`/es/franchisees` — the maturity assessment pages.

**Fix.** Delete `next-sitemap` (package + config + `public/sitemap.xml`). Keep
`src/app/sitemap.ts` as the single source and make it dynamic so case studies
self-register. Same treatment for `public/robots.txt` vs `src/app/robots.ts`.

---

### 4.6 The maturity assessment is built but unreachable — VERIFIED (existence) / INFERRED (completeness)

**Status (1 Sep 2026):** Still true, and **intentional**. Not in nav. Not Website 2.0 primary CTA. Do not surface until the owner asks.

These exist:

```
src/app/franchisees/page.tsx
src/app/es/franchisees/page.tsx          ← already localized
src/components/sections/franchisees/assessment-tool.tsx
src/components/sections/franchisees/maturity-cta.tsx
src/components/sections/franchisees/franchisee-landing.tsx
src/components/sections/franchisees/offers-section.tsx
src/components/sections/franchisees/pains-section.tsx
src/lib/franchisees/score.ts
src/lib/franchisees/copy.ts
src/lib/validation/assessment-schema.ts
src/app/api/assessment/route.ts
```

There is a scoring engine, a validation schema, an API route, and a Spanish
version. But `/franchisees` appears in **no navigation** — the header exposes
only What we do, Services, About, Contact — and is **excluded from the sitemap**
(§4.5).

Assessment dimensions, read from the route's `buildNotes()`:
`locations`, `region`, `pos`, `kds`, `delivery`, `payments`. Six scored
dimensions returning `{ score, band, isMultiUnit, breakdown }`.

**Fix.** Wire to ClickUp (§3.1), surface in nav, include in sitemap.

---

## 5. Findings — Medium

### 5.1 Contentful model bloat — VERIFIED

**Status (1 Sep 2026):** **Superseded for Website 2.0.** Lean model is live: **11 types** on `master` + `staging`, including `conversionHomepage`, `conversionPillar`, `conversionMenuItem`, `conversionVendor`. Do not grow the old 25-type franchisee homepage. Original 27 Aug count below.

**25 content types, 136 fields, 0 localized fields, 0 RichText fields,
0 Array fields.**

**5.1.1 — Ten section-header types.** Each exists to hold one or two headline
strings for a single section:

| Header type | Paired card type |
|---|---|
| `faqSection` | `faqItem` |
| `forWhomSection` | `forWhomCard` |
| `offeringsSection` | `offeringMode` |
| `proofSection` | `proofBeat` |
| `howWeWorkSection` | `howWeWorkStep` |
| `franchiseeOffersTitle` | `franchiseeOfferCard` |
| `franchiseePainsTitle` | `franchiseePainCard` |
| `servicesTitleAndSubtitle` | `servicesCard` |
| `aboutUsTitleSubtitle` | `aboutUsCard` |
| `testimonialsTitleAndSubtitle` | `testimonialCard` |

Several header types carry page-specific prose beyond the headline
(`forWhomSection` has 5 extra text fields, `proofSection` has 3,
`aboutUsTitleSubtitle` has 6), so they cannot be collapsed to a single generic
type without relocating that copy.

**5.1.2 — No composition layer.** There is no `page` type and not one Array
field in the entire space. Sections are fetched as singletons and ordered in
code. Reordering a section or adding a page requires a code change — which
defeats the stated goal of owner-editable content.

**5.1.3 — `franchiseePainsTitle` is malformed.** Its fields are `title`,
`description`, `lucideIcon` — identical to `franchiseePainCard`, and not a
title/subtitle shape at all. Its `displayField` is `title`, not `heading`.
Almost certainly a copy-paste error at creation.

**5.1.4 — `testimonialsTitleAndSubtitle` is actually the contact section.** Its
Contentful display name is already "Contact section (reuse)". It holds
`submitLabel`, `submittingLabel`, `successMessage`, `errorMessage`,
`locationsHelper`, `calendarHeadline`, `calendarBody`. A testimonials type was
repurposed rather than a new one created. Functional, undiscoverable.

Note: `calendarHeadline` and `calendarBody` already exist. The booking-calendar
copy slot is ready.

**5.1.5 — `testimonialCard` appears dead.** Requires a star `rating`, named
`businessOwner`, `businessName`, and `businessImage` — a consumer-review shape.
Not rendered on the live homepage. Corresponding components exist at
`src/components/sections/testimonials/`. Leftover from the previous
positioning (§6.1). INFERRED — check for entries before deleting.

**5.1.6 — `blogPost` is orphaned.** Fields are `title`, `description`,
`linkedInEmbedUrl`, `publishDate`. There is **no blog route** in `src/app/`.
The type is unreachable. Note also that LinkedIn embeds are iframes: that
content is attributed to LinkedIn, not to foodsense.tech, and contributes
nothing to the domain's search authority.

**5.1.7 — Spanish is configured but non-functional.** Locales `en-US` (default)
and `es` exist. **Zero of 136 fields are localized.** Nothing is translatable.
Enabling localization on a field is a non-destructive migration; disabling it is
destructive. Free tier caps at 2 locales — already at the ceiling.

---

### 5.2 Repository duplication — VERIFIED (from file listing)

| Concern | Copies | Paths |
|---|---|---|
| Icons | 6 | `lib/icons.ts`, `lib/icons.tsx`, `lib/icons/index.ts`, `lib/ui-icons.tsx`, `lib/icons/ui-icons.tsx`, `components/ui/icons.tsx` |
| Logging | 4 | `lib/logger.ts`, `lib/logging.ts`, `lib/logging/logger.ts`, `lib/logging/index.ts` |
| Theme provider | 3 | `providers/theme-provider.tsx`, `components/ui/theme/theme-provider.tsx`, `app/providers.tsx` |
| Client providers | 2 | `components/layout/client-providers.tsx`, `components/providers/client-providers.tsx` |
| Nav menu | 2 | `components/layout/nav-menu.tsx`, `components/ui/navigation/nav-menu.tsx` |
| Mobile nav | 2 | `components/layout/mobile-nav.tsx`, `components/ui/navigation/mobile-nav.tsx` |
| Theme toggle | 2 | `components/layout/theme-toggle.tsx`, `components/ui/theme/theme-toggle.tsx` |
| Button | 2 | `components/ui/button.tsx`, `components/ui/form/button.tsx` |
| Card | 3 | `components/ui/card.ts`, `components/ui/data-display/card.tsx`, `styles/card-styles.ts` |
| Spinner | 2 | `components/ui/feedback/spinner.tsx`, `components/ui/feedback/loading-spinner.tsx` |
| About icons | 2 | `lib/about-icons.ts`, `lib/icons/about-icons.ts` |
| Logo assets | 2 | `public/logo/`, `public/images/logo/` |
| Favicon | 3 | `public/favicon.ico`, `public/images/favicon.ico`, `src/app/favicon.ico.bak` |

**Two are actively dangerous** — a file and a directory sharing a name, where
imports resolve by module-resolution convention rather than intent:

```
src/components/sections/contact/contact-form.tsx
src/components/sections/contact/contact-form/index.tsx

src/components/sections/home-content.tsx
src/components/sections/home-content/index.tsx
```

Resolve these first. It is easy to edit the copy that is not running.

**Committed `.bak` files** (git already provides history):

```
src/app/favicon.ico.bak
src/app/robots.ts.bak
src/app/sitemap.ts.bak
src/middleware.ts.bak
```

**Repair codemods in `scripts/`** — `consolidate-types.mjs`, `fix-routing.mjs`,
`update-imports.mjs`, `dev-fix.js`, `dev-watch.js`. Note `npm run dev:fixed`
runs `dev-fix.js` before the dev server. A dev server that needs a repair script
is a symptom. Determine whether these are still needed or are archaeology.

---

### 5.3 Orphaned SEO dashboard — INFERRED

```
src/components/seo/dashboard/keyword-tracking-table.tsx
src/components/seo/dashboard/page-seo-table.tsx
src/components/seo/dashboard/quick-actions.tsx
src/components/seo/dashboard/seo-overview.tsx
```

No corresponding route in `src/app/`. Likely the only consumer of `recharts`
(~500 KB). If unrouted, tree-shaking should exclude it from the client bundle,
but the dependency and the code remain. Confirm, then route it or delete it.

---

### 5.4 `/ui-showcase` is publicly routable — VERIFIED

`src/app/ui-showcase/page.tsx` has no route protection. It is excluded from the
`next-sitemap` config, but that config never runs (§4.5), and sitemap exclusion
does not prevent indexing.

**Fix.** Add `noindex` metadata, or gate behind `NODE_ENV !== "production"`, or
delete.

---

### 5.5 Dependency issues — VERIFIED

- **`@types/next: 8.0.7`** — obsolete and incorrect. Next.js ships its own types.
  This package is from the Next 8 era. Remove.
- **Next.js 14.1.0** (January 2024) — two majors behind. Evaluate upgrade
  against the 90+ mobile Lighthouse target.
- **`framer-motion` 12.4.7** and **`recharts` 2.15.1** — both heavy. Audit
  actual usage against the performance budget.
- **`@sentry/nextjs` 9.2.0** — present, and `src/lib/error-tracking/sentry.ts`
  exists, but no `instrumentation.ts` or `sentry.*.config.ts` appears in the
  file listing. INFERRED: may be installed but not initialized.

---

## 6. Findings — Positioning & discoverability

### 6.1 Search results still serve the previous positioning — VERIFIED

Indexed snippets for the domain describe *restaurant analytics, helping
independent restaurants grow, tailored strategic plans, menu offerings and
pricing*, plus a named testimonial about a Spanish franchise opening three US
locations.

None of this is on the live site. The current site explicitly states that
single-unit independents are not customers.

**Assessment:** the repositioning went live approximately one week before this
audit. One week is within normal Google recrawl latency. This is most likely
crawl lag, **not** a structural indexing fault. The sitemap problems in §4.5
slow recrawl but are unlikely to be the sole cause.

This also explains the orphaned `testimonialCard` type (§5.1.5) and the
testimonials components — both are artifacts of the previous positioning.

**Action.** Fix the sitemap, then request indexing for all key URLs in Google
Search Console. Re-check in two weeks before investigating further.

---

### 6.2 Duplicate LinkedIn company pages — VERIFIED

- `linkedin.com/company/foodsensedottech` — linked from the site
- `linkedin.com/company/foodsensetech`

Two entities split authority signals and confuse anyone searching the brand.
Close or redirect one.

---

### 6.3 Contested brand name — VERIFIED

At least three unrelated companies operate under "FoodSense," including a
Kenyan food-technology firm (`foodsensetechnologies.com`) and a food-testing
hardware company (`foodsensetechnology.com`).

Branded search is contested and hard to win. This raises the relative value of
non-branded, problem-led content targeting the pain points in
`docs/brand/02-ideal-client-profile.md`.

---

### 6.4 Brand documentation contradicts the live site — VERIFIED

**Status (1 Sep 2026):** **Mostly closed in repo.** Brand OS PDFs 01–12 are ingested under `docs/brand/`. Site framing is locked: **10+ units**, three modes (Advisory / Fractional / Project), ClickUp-only. Named in-role proof (KFC, RBI, REEF) is **principal history**, not FoodSense-the-firm logos.

Still open:

- Production **CMS strings** can still be the old “Enterprise Architecture” homepage until the owner pastes [`contentful-copy-review.md`](./contentful-copy-review.md) and Publishes.
- Stock / Unsplash hero (§9.4).
- Incomplete PDFs 06, 09–12 — do not invent case studies or rates.

**27 Aug snapshot (historical):**

| Topic | Brand docs then | Live site then |
|---|---|---|
| Client size | 20–500 units; under 10 is "Not Right Now" | 10+ units; invites 3+ with a 5–7 year growth pipeline |
| Engagement models | Five commercial shapes | Three (Advisory, Fractional, Project) |
| Market count | "10+ markets" | "36 countries" (in-role proof, not firm logos) |
| Photography | "Never: stock photos" | Homepage hero is stock |

The **repo** now matches the live Website 2.0 locks (10+ units, three modes). Do not drift copy back to 20–500 or five commercial SKUs. PDF Hell Yes of 20–500 stays a sales note, not homepage copy.

The hero image is still a stock/Unsplash file — a direct violation of `docs/brand/06-brand-guidelines.md` and the most visible remaining brand inconsistency.

---

### 6.5 Missing content types for planned work — VERIFIED

**Status (1 Sep 2026):** Conversion homepage types exist. Vendors are `conversionVendor` (names/logos), not a partnership claim. Still missing for Phase 2: `caseStudy`, `framework`, owned RichText articles. Free tier room remains; do not invent types mid-task.

Nothing in the model supports: case studies, frameworks, proof metrics,
partners, or owned long-form articles.

Free tier allows 48 content types; 25 are in use. Room for ~23 more.

---

## 7. Remediation plan

Phases are ordered by dependency, not by value. **Do not reorder.**

### Phase 0 — Data integrity

Ships first because §3.1 was losing HubSpot-era leads. **HubSpot is gone.** Remaining Phase 0 is sitemap / ui-showcase / GSC / Vercel plan — not CRM.

| # | Task | Depends on |
|---|---|---|
| 0.1 | Add `Maturity Score` (number) + `Maturity Band` (dropdown) to ClickUp Leads list — **manual, ClickUp UI** | Band values from `score.ts` |
| 0.2 | Create `src/lib/clickup/client.ts` — shared primitives + `findLeadByEmail` | — |
| 0.3 | Refactor `create-lead.ts` — drop phantom field, set `Project = Website`, dedupe | 0.2 |
| 0.4 | Create `src/lib/clickup/create-assessment-lead.ts` | 0.1, 0.2 |
| 0.5 | Rewrite `api/assessment/route.ts` → ClickUp; return honest `captured` | 0.4 |
| 0.6 | **Verify** a real assessment task lands in Leads | 0.5 |
| 0.7 | Strip HubSpot from `api/contact/route.ts` | 0.3 |
| 0.8 | Delete `src/lib/hubspot/`, drop `@hubspot/api-client` | 0.6, 0.7 |
| 0.9 | Purge HubSpot env refs: `.env.example`, `.env.production.example`, `src/lib/env.ts`, `src/types/env.d.ts`, `scripts/validate-env.ts` | 0.8 |
| 0.10 | Archive `docs/engineering/hubspot-properties.csv` | 0.8 |
| 0.11 | Sitemap consolidation (§4.5); include `/franchisees` | — |
| 0.12 | `noindex` on `/ui-showcase` | — |
| 0.13 | Surface `/franchisees` in navigation | — |
| 0.14 | Request indexing in Google Search Console | 0.11 |
| 0.15 | Move Vercel Hobby → Pro | — |

**0.8–0.10 are done.** Do not re-add HubSpot. 0.4–0.6 stay deferred with `/franchisees`.

**Acceptance:** submit the contact form twice with one email → one task, one
comment. Complete the assessment → task appears with score and band.

---

### Phase 1 — Contentful unblock

Model changes only. Nothing on the live site changes.

| # | Task |
|---|---|
| 1.1 | Create `staging` environment from `master`; verify environment allowance first |
| 1.2 | Fix `seoMetadata.pageId` (§4.4) — free `Symbol` slug, keep `unique` |
| 1.3 | Add `caseStudy` (RichText body, metrics, slug, SEO ref) |
| 1.4 | Add `framework` (RichText body, dimensions, slug, SEO ref) |
| 1.5 | Add `metricStat` (value, label, sortOrder) |
| 1.6 | Add `partner` (name, description, url, logo) |
| 1.7 | Rename `franchiseePainsTitle` → correct shape, or retire (§5.1.3) |
| 1.8 | Audit `testimonialCard` entry count; if zero, retire (§5.1.5) |
| 1.9 | Decide `blogPost`: retire, or extend with RichText for owned articles (§5.1.6) |
| 1.10 | Verify `staging` against a Vercel preview, then apply to `master` |

**Rules.** Use versioned `contentful-migration` scripts — never hand-edit fields
in the web UI. Retire in two steps: rename to `DEPRECATED_*`, confirm the build
is clean and nothing references it, delete a week later. A deleted field takes
its data with it.

**Website 2.0 note:** Four `conversion*` types + seed + editing map are **done**. Copy changes stay on those types — [`contentful.md`](./contentful.md), [`contentful-editing-map.md`](../engineering/contentful-editing-map.md).

---

### Phase 2 — Build

| # | Task |
|---|---|
| 2.1 | `/results/[slug]` route + RichText renderer (`@contentful/rich-text-types` already installed) |
| 2.2 | Kiosk case study page — **content blocked on owner** (§9.3) |
| 2.3 | `/frameworks/maturity-assessment` |
| 2.4 | `/frameworks/vendor-risk-assessment` |
| 2.5 | Proof metric bar above the fold |
| 2.6 | Google Calendar booking embed after form submit (§8.2) |
| 2.7 | Replace stock hero (§6.4, §9.4) |
| 2.8 | Blackthorn as "partners in the restaurant space" |
| 2.9 | Dynamic sitemap picks up case studies and frameworks |
| 2.10 | JSON-LD: `ProfessionalService`, `Person`, `FAQPage` |

---

### Phase 3 — Debt

| # | Task |
|---|---|
| 3.1 | Resolve file/directory name collisions (§5.2) — **do first** |
| 3.2 | Consolidate 6 icon modules → 1 |
| 3.3 | Consolidate 4 logging modules → 1 |
| 3.4 | Consolidate theme/provider/nav duplicates |
| 3.5 | Delete committed `.bak` files |
| 3.6 | Deduplicate `public/logo/` and `public/images/logo/` |
| 3.7 | Remove `@types/next` |
| 3.8 | Resolve orphaned SEO dashboard (§5.3) |
| 3.9 | Audit `scripts/` codemods; delete what is archaeology |
| 3.10 | Confirm Sentry initialization (§5.5) |
| 3.11 | Evaluate Next 14 → 15 against Lighthouse target |
| 3.12 | Contentful section-type consolidation + `page` composition layer (§5.1.1, §5.1.2) |

3.12 is the riskiest change in this document. It ships last, after the site is
delivering.

---

### Phase 4 — Spanish

| # | Task |
|---|---|
| 4.1 | Decide which fields require localization |
| 4.2 | Migration to enable `localized: true` on those fields |
| 4.3 | `next-intl` or equivalent routing; `/es/franchisees` already exists |
| 4.4 | `hreflang` + `alternativeLanguages` on `seoMetadata` |
| 4.5 | Spanish-language content — near-zero competition in LATAM restaurant tech |

---

## 8. Reference

### 8.1 ClickUp

**Workspace** `90131064868` · **Space** `Foodsense CRM` `901313986203` ·
**List** `Leads` `901328239583`

Statuses: `to do`, `new`, `qualified`, `sow`, `active`, `not a fit` (closed).

Custom field IDs:

```
email            b950a0d8-08de-41ad-beb1-f4c5197cbba3   (required)
phone            8efc4847-ebc0-4d9c-a1b9-7fbfe387399f
company          2117e392-e716-4fa3-95b4-9b6c4c1ef77a
brands           ca2b5438-e0f7-4965-86e7-805f9c066be5
locations        f4c1099e-1ad3-49a9-ad48-4ae2a99f8afe   (env override CLICKUP_FIELD_LOCATIONS)
restaurantType   35c3b88c-51a3-4400-a749-dce2d2f55160
posSystem        6fd69de1-c6ca-4a6a-ab8a-ceeb2b06243b
serviceInterests 5a0d0fa1-107d-4f41-83de-6c7b127c1fd8   (labels: POS, kiosk, loyalty, delivery, data, vendor)
growthPipeline   777f440f-fe21-41ac-98d4-afa3760b8b87
project          b8734eca-e728-415d-9e9a-096baf15e4d1
  └─ Website     f52ad055-0eee-4d74-a389-6d15e4aa3ee8
```

Phantom ID `f429cf6f-58b1-4cb3-8eb8-e30b80711711` is **removed from code**.

Code mirror: `src/lib/clickup/constants.ts`. Wiring: [`engineering/clickup.md`](../engineering/clickup.md), [`engineering/clickup-field-alignment.md`](../engineering/clickup-field-alignment.md).

Owner: rename ClickUp **Services Interested in** option labels to match the form (UUIDs stay). See copy-review ClickUp list.

### 8.2 Google Calendar booking — known limitation

Google Calendar appointment schedules have **no webhook and no booking API**.
A booking cannot be prefilled from a URL, and cannot be programmatically
matched back to its lead.

Consequences:

1. The form must submit **before** the calendar renders. The form is the source
   of truth; the booking is a convenience.
2. The visitor re-enters name and email at the booking step. Unavoidable.
3. Lead↔booking matching is manual, by email. If volume makes this painful, a
   Google Apps Script watching the appointment calendar can comment on the
   matching ClickUp task. Defer.

### 8.3 Contentful

Space `es87a9loayi1` · Environment `master` (Preview usually `master` too) · Locales `en-US` (default), `es`  
**11 types** on master + staging after Phase 1 retire. Conversion homepage: `conversionHomepage` + 3 pillars + menu items + 8 vendors. Spanish fields still not localized.

Editing map: [`engineering/contentful-editing-map.md`](../engineering/contentful-editing-map.md).  
Paste pack: [`contentful-copy-review.md`](./contentful-copy-review.md).  
Revalidate: [`engineering/revalidation.md`](../engineering/revalidation.md) — webhook hits `www.foodsense.tech` only; Preview needs its own `/api/revalidate`.

Free tier: 48 content types, 25k records, 2 locales, 5 users.

---

## 9. Open items — owner decisions required

**9.1 — `Maturity Band` dropdown options.** **Deferred.** Only applies to the hidden `/franchisees` quiz (`scoreAssessment()` → `optimized` / `scaling` / `fragmented`). Not part of Website 2.0 Strategy Audit. ClickUp custom fields would be added when that route is revived.

**9.2 — Assessment lead destination.** Decided for whenever `/franchisees` is revived: same `Leads` list, score and band as custom fields, answers in description. **Not prioritized now.**

**9.3 — Kiosk case study content.** **Phase 2.** Does not exist in written form.

Anonymization is required (§9.6). Working title: *"QSR Brand Entering a New
Central American Market — Kiosk Program, Zero to Live."*

**9.4 — Photography.** **Phase 2.** Interim: diagrammatic navy/yellow art; typographic heroes. Locked aspect-ratio slots in Contentful for later swap-in.

**9.5 — Brand docs vs live copy.** **Done in repo (PR #19).** Brand OS ingested; Website 2.0 locks documented. Remaining owner work: paste CMS pack, replace stock hero (§9.4), fill incomplete PDFs 06 / 09–12.

**9.6 — Anonymization standard.** All client references are anonymized.
Convention: descriptor + scale + market — e.g. *"Caribbean QSR Franchisee ·
40+ units."* Vendor names (Oracle Simphony, NCR) are capabilities, not clients,
and may be named.

Approved proof metrics, already published on the live About page:

- POS vendor switch, ~400 restaurants/month through 4,500 restaurants,
  20+ franchisees, US and Canada
- Tech stack across ~30 franchisees, 36 countries, 2,200+ restaurants
- 3 openings, ~$8M combined revenue, ~$2.6M AUV per store

Note: anonymized case studies are marginally weaker for E-E-A-T, since the
client cannot be corroborated. Compensate with a named and detailed author bio,
technical specificity, and operational depth.

**9.7 — LinkedIn consolidation** (§6.2). **Decided:** https://www.linkedin.com/company/foodsensedottech survives. Close or redirect `linkedin.com/company/foodsensetech`.

---

## 10. Summary

The architecture is correct. Website 2.0 conversion homepage + ClickUp + lean Contentful are on the integration branch.

**Owner priority (1 Sep 2026):** PR #19 is **merged** to `fixes-20250301-195504`. Production code is still last-promoted **PR #16** until Vercel Promote. CMS words follow **Publish + revalidate**, not the git merge.

Highest-value work now:

1. **Paste and Publish** conversion homepage + pillars + menu in Contentful `master`. Revalidate the URL you have open.
2. **Verify Preview** of `fixes-20250301-195504`. Promote to Production only when asked.
3. **Phase 2** — kiosk case study (§9.3), photography (§9.4).
4. **Later** — `/franchisees` ClickUp wiring; sitemap/`noindex` debt (0.11–0.12).

The hidden quiz still scores only (`captured: false`). That is documented debt, not a blocker for the conversion homepage.
