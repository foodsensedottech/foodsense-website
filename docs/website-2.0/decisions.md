# Website 2.0 — locked owner decisions

Recorded 27 August 2026. Updated 1 September 2026 after PR #19 merge. Agents and humans treat these as settled unless the owner revises this file.

## Current priority (1 Sep 2026)

**Integration:** PR #19 merged → `fixes-20250301-195504` (`6ada7c2`). PR #18 closed (map absorbed into #19).

**Production:** Last promoted code is **PR #16** (`30d4241`). Do not Promote Preview to Production unless the owner asks.

**Next:** Publish the Contentful paste pack ([`contentful-copy-review.md`](./contentful-copy-review.md)), revalidate the host you are viewing, verify Preview, then Phase 2 content ([`assessment.md`](./assessment.md) §9.3–9.4).

**Phase 1 Contentful:** **Done** — 11 types, `conversion*` on master + staging. See [`engineering/contentful-phase1.md`](../engineering/contentful-phase1.md).

**Website 2.0 code:** **Merged** — PR #10 (`1691d6b`) plus #11–#17 and **#19**.

**Git:** Branch off `fixes-20250301-195504` — [`git-workflow.md`](./git-workflow.md).

**Task tracking:** ClickUp **Website Redesign Tasks** board — [open board](https://app.clickup.com/90131064868/v/b/6-901328341052-2).

**Not now:** `/franchisees` maturity quiz, Maturity Score/Band ClickUp fields, sitemap/`noindex` debt (assessment 0.11–0.12).

## CRM

- **ClickUp is the permanent destination for all website forms** (unified contact form on homepage + `/contact`; maturity quiz deferred).
- HubSpot has been removed from the codebase (ClickUp-only).
- Operating rule: one ClickUp task = one lead; enrich / comment on match, never lose a lead on lookup failure.
- Set `Project = Website` on create. Field parity guide: [`engineering/clickup-field-alignment.md`](../engineering/clickup-field-alignment.md).

## Conversion path

- **Primary now:** Website 2.0 conversion homepage — one shared contact form (`ContactForm`) on `#contact-section` and `/contact` → `POST /api/contact` → ClickUp. Homepage section copy may still say “Book a Strategy Audit”; underlying form is the same.
- **Later:** `/franchisees` — see [Maturity quiz (deferred)](#maturity-quiz-deferred) below. Keep code; do not prioritize nav, sitemap, or ClickUp wiring until Phase 2 is underway.
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
- Spanish localization remains paused until fields are intentionally localized.
