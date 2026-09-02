# Website 2.0 — locked owner decisions

Recorded 27 August 2026. Updated 31 August 2026 after PR #10 merge. Agents and humans treat these as settled unless the owner revises this file.

## Current priority (Aug 2026)

**Next:** Verify Preview on merged `fixes-20250301-195504`, **Promote to Production** when approved, then **Phase 2** content ([`assessment.md`](./assessment.md) §9.3–9.4).

**Phase 1 Contentful:** **Done** — 11 types, `conversion*` homepage seeded on master + staging. See [`engineering/contentful-phase1.md`](../engineering/contentful-phase1.md).

**Website 2.0 code:** **Merged** — PR #10 → `fixes-20250301-195504` (`1691d6b`, 31 Aug 2026).

**Git:** Branch off `fixes-20250301-195504` for new work — [`git-workflow.md`](./git-workflow.md).

**Task tracking:** ClickUp **Website Redesign Tasks** board — [open board](https://app.clickup.com/90131064868/v/b/6-901328341052-2).

**Not now:** `/franchisees` maturity quiz, Maturity Score/Band ClickUp fields, sitemap/nav debt.

## CRM

- **ClickUp is the permanent destination for all website forms** (unified contact form on homepage + `/contact`; maturity quiz deferred).
- HubSpot has been removed from the codebase (ClickUp-only).
- Operating rule: one ClickUp task = one lead; enrich / comment on match, never lose a lead on lookup failure.
- Set `Project = Website` on create. Field parity guide: [`engineering/clickup-field-alignment.md`](../engineering/clickup-field-alignment.md).

## Conversion path

- **Primary now:** Website 2.0 conversion homepage — one shared contact form (`ContactForm`) on `#contact-section` and `/contact` → `POST /api/contact` → ClickUp. Homepage section copy may still say “Book a Strategy Audit”; underlying form is the same.
- **Later:** `/franchisees` landing is CMS-owned; the maturity **quiz** is still not the primary CTA. Do not put it in the main nav.
- Do not run two competing primary CTAs on the homepage.

## Maturity quiz (deferred)

**You did not design this for Website 2.0.** It is **existing repo code** on `/franchisees`:

- Six-question “Franchisee Tech Maturity Assessment” (locations, region, POS, KDS, delivery, payments)
- `scoreAssessment()` in `src/lib/franchisees/score.ts` returns a numeric **score** (roughly 0–100) and a **band**: `optimized` (≥80), `scaling` (≥55), or `fragmented`
- Hero CTA on that page: “Get your Tech Maturity Score”

The maturity quiz still **scores only** (`captured: false`) until wired to ClickUp. That is **not** on the Website 2.0 critical path. When we revisit `/franchisees`, add optional ClickUp fields **Maturity Score** (number) and **Maturity Band** (dropdown: optimized / scaling / fragmented) — no owner action needed until then.

## Content & proof

- **Phase 2:** Kiosk case study — owner-authored, anonymized ([`assessment.md` §9.3](./assessment.md#9-open-items-owner-decisions-required)).
- **Phase 2:** Photography — diagrammatic navy/yellow interim art until a real shoot ([`assessment.md` §9.4](./assessment.md#9-open-items-owner-decisions-required)).
- **LinkedIn:** canonical company page is https://www.linkedin.com/company/foodsensedottech — close or redirect `linkedin.com/company/foodsensetech`.

## Brand docs vs live copy

- **Brand OS PDFs (01–12) are the wireframe** for voice, ICP, capabilities, and proof rules. Ingested under `docs/brand/`. Incomplete PDFs (06, 09–12) must not invent site copy.
- **Website 2.0 locks that override older PDF framing:** 10+ units (not 20–500 on the homepage); three engagement modes (not five SKUs); ClickUp-only CRM.
- **Do not publish** rates from [`brand/internal-pricing.md`](../brand/internal-pricing.md).
- Copy audit vs live Contentful: [`contentful-copy-review.md`](./contentful-copy-review.md). Re-seed CMS from `conversion-seed.ts` after review.


## Contentful

- Lean the model for Website 2.0 — see [`contentful.md`](./contentful.md).
- Do not grow the old 25-type franchisee homepage model.
- **Marketing copy is CMS-owned** (`/`, `/about`, `/services`, `/franchisees`, `/contact`, footer). Seeds are fallback only.
- **Vendor-agnostic:** no logo cloud, no `conversionVendor` on the live site, no partnership claim.
- Spanish localization remains paused **except** `/es/franchisees`, which reads localized `franchiseeLandingPage` fields.
- Rebuild / leftover wipe: [`engineering/contentful-rebuild.md`](../engineering/contentful-rebuild.md).
