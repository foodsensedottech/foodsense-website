# Website 2.0 — overview

High-conversion single page for FoodSense (Preview first; promote to Production only after approval).

## Audience

Growth-stage and multi-unit QSR / fast-casual / franchise operators (see `docs/brand/02-ideal-client-profile.md`).

## Page structure

1. **Hero** — Value headline + primary CTA (“Book a Strategy Audit”) → contact
2. **Authority** — Why FoodSense + founder wins (operator + technologist credibility)
3. **Core pillars** — Program lifecycle / tech stack / ecosystem integration
4. **Specialized menu** — Secondary services in accordion (keep page short)
5. **Partners** — Trusted integration partners (logo cloud)
6. **Contact** — Low-friction form (name, email, restaurant, primary challenge)

## Brand constraints (non-negotiable)

From `.cursorrules` and `docs/brand/`:

- Colors: navy `#253B59`, yellow `#F1C100`, white surfaces, warm gray sections
- Type: **Nunito** (all weights)
- Voice: direct, pragmatic, operator-first — no “synergy / best-in-class / solutions”
- Methodology: test, prove, scale — phased, never big-bang
- Photography: real kitchens / people + tech; never empty stock restaurants

## CMS

Lean model only — see [`contentful.md`](./contentful.md). Do not grow the old 25-type Contentful model for this page.

## Related

- Seed copy in code: `src/lib/content/conversion-seed.ts`
- Components: `src/components/sections/conversion/`
