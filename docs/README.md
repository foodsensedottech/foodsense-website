# FoodSense documentation

This folder is the source of truth for **Website 2.0**. Prefer these docs over anything in `docs/archive/`.

## Start here

| Path | Use when |
| --- | --- |
| [`website-2.0/assessment.md`](./website-2.0/assessment.md) | **Read first** — technical audit, phases 0–4, ClickUp field IDs |
| [`website-2.0/git-workflow.md`](./website-2.0/git-workflow.md) | **Integration branch** — `fixes-20250301-195504`; PR #10 merged |
| [`brand/`](./brand/) | Vision, ICP, services, voice, brand, operating logic |
| [`website-2.0/`](./website-2.0/) | Current homepage direction + lean Contentful model |
| [`engineering/`](./engineering/) | Local dev, revalidation, ClickUp, Contentful Phase 1 |
| [`engineering/clickup-field-alignment.md`](./engineering/clickup-field-alignment.md) | Form ↔ ClickUp custom field parity |
| [`contentful/`](./contentful/) | Legacy CMS maps (franchisee homepage era) |
| [`analytics/`](./analytics/) | GA4 / Clarity setup |
| [`archive/`](./archive/) | Historical PRDs — do not treat as current requirements |

Also read root [`.cursorrules`](../.cursorrules) and [`AGENTS.md`](../AGENTS.md).

## Brand OS (`docs/brand/`)

1. [`01-vision-mission-identity.md`](./brand/01-vision-mission-identity.md)
2. [`02-ideal-client-profile.md`](./brand/02-ideal-client-profile.md)
3. [`03-services.md`](./brand/03-services.md)
4. [`04-competitive-positioning.md`](./brand/04-competitive-positioning.md)
5. [`05-content-voice.md`](./brand/05-content-voice.md)
6. [`06-brand-guidelines.md`](./brand/06-brand-guidelines.md)
7. [`07-operating-logic.md`](./brand/07-operating-logic.md)

## Website 2.0

- [`website-2.0/assessment.md`](./website-2.0/assessment.md) — technical assessment & remediation plan (phases 0–4)
- [`website-2.0/decisions.md`](./website-2.0/decisions.md) — locked CRM / conversion / brand decisions
- [`website-2.0/overview.md`](./website-2.0/overview.md) — page IA + conversion sections
- [`website-2.0/git-workflow.md`](./website-2.0/git-workflow.md) — branch strategy + ClickUp task board

## What we archived (and why)

| Archived file | Why |
| --- | --- |
| `archive/prd-website-legacy.md` | Superseded by Brand OS + Website 2.0 overview |
| `archive/website-documentation-legacy.md` | Describes old multi-section / services architecture |
| `archive/conversion-plan-2024.md` | Early single-page plan; replaced by Website 2.0 |
| `archive/development-2025-02-22.md` | Stale Next notes; see `engineering/development.md` |
| `archive/restaurant-webpage-designer-prd.md` | Adjacent product, not this marketing site |
| `archive/restaurantiq-seo-analytics-prd.md` | Adjacent product, not this marketing site |
| `contentful/*-legacy.md` | Franchisee / multi-type CMS maps from Website 1.x |

## Rules of maintenance

1. **Brand truth** lives in `docs/brand/` + `.cursorrules` — update those first.
2. **Website 2.0 product truth** lives in `docs/website-2.0/`.
3. Do not add new top-level `docs/*.md` files; put them in a folder and link from this README.
4. Prefer editing over duplicating. If two docs disagree, archive the older one.
