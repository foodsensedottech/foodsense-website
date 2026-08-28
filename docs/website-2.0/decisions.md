# Website 2.0 — locked owner decisions

Recorded 27 August 2026. Agents and humans treat these as settled unless the owner revises this file.

## Current priority (Aug 2026)

**Next:** **Phase 1 — Contentful** ([`contentful.md`](./contentful.md) reorganization steps 1–4):

1. Create `staging` environment (if plan allows)
2. Fix `seoMetadata.pageId` → free unique slug
3. Create the four `conversion*` types
4. Publish one homepage entry; verify Website 2.0 Preview reads CMS instead of seed

**Not now:** `/franchisees` maturity quiz, Maturity Score/Band ClickUp fields, HubSpot removal, sitemap/nav debt.

## CRM

- **ClickUp is the permanent destination for all website forms** (Strategy Audit and contact are wired; maturity quiz deferred).
- HubSpot is legacy; remove after all active form paths are on ClickUp and verified.
- Operating rule: one ClickUp task = one lead; enrich / comment on match, never lose a lead on lookup failure.
- Set `Project = Website` on create. Field IDs: [`assessment.md` §8.1](./assessment.md#81-clickup).

## Conversion path

- **Primary now:** Strategy Audit homepage (Website 2.0 conversion page).
- **Later:** `/franchisees` — see [Maturity quiz (deferred)](#maturity-quiz-deferred) below. Keep code; do not prioritize nav, sitemap, or ClickUp wiring until after Phase 1 Contentful.
- Do not run two competing primary CTAs on the homepage.

## Maturity quiz (deferred)

**You did not design this for Website 2.0.** It is **existing repo code** on `/franchisees`:

- Six-question “Franchisee Tech Maturity Assessment” (locations, region, POS, KDS, delivery, payments)
- `scoreAssessment()` in `src/lib/franchisees/score.ts` returns a numeric **score** (roughly 0–100) and a **band**: `optimized` (≥80), `scaling` (≥55), or `fragmented`
- Hero CTA on that page: “Get your Tech Maturity Score”

The technical assessment flagged it because `/api/assessment` still points at dead HubSpot and **drops leads** if someone finds the hidden page. That is **not** on the Website 2.0 critical path. When we revisit `/franchisees`, we would add optional ClickUp fields **Maturity Score** (number) and **Maturity Band** (dropdown: optimized / scaling / fragmented) — no owner action needed until then.

## Content & proof

- **Phase 2:** Kiosk case study — owner-authored, anonymized ([`assessment.md` §9.3](./assessment.md#9-open-items-owner-decisions-required)).
- **Phase 2:** Photography — diagrammatic navy/yellow interim art until a real shoot ([`assessment.md` §9.4](./assessment.md#9-open-items-owner-decisions-required)).
- **LinkedIn:** canonical company page is https://www.linkedin.com/company/foodsensedottech — close or redirect `linkedin.com/company/foodsensetech`.

## Brand docs vs live copy

- **Live site copy wins** where Brand OS and production disagree (ICP size, engagement models, market framing).
- Update `docs/brand/` to match live; do not drift back to the older 20–500 / five-model framing.

## Contentful

- Lean the model for Website 2.0 — see [`contentful.md`](./contentful.md).
- Do not grow the old 25-type franchisee homepage model.
- Spanish localization remains paused until fields are intentionally localized.
