# Website 2.0 — overview

High-conversion single page for FoodSense (Preview first; promote to Production only after approval).

Locked decisions: [`decisions.md`](./decisions.md).

## Audience

**10+ unit** QSR / fast-casual / franchise operators (LATAM, Caribbean, US). See `docs/brand/02-ideal-client-profile.md`. Single-unit independents are not customers.

## Primary conversion

**Book a Strategy Audit** (homepage form → ClickUp). The `/franchisees` maturity tool stays for a later phase.

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
- Methodology: test, prove, scale — phased (Advisory → Fractional / Project)
- Photography: real kitchens / people + tech; interim = diagrammatic / typographic heroes until a shoot

## CMS

Lean model only — see [`contentful.md`](./contentful.md). Create 4 conversion types; retire the old section/card sprawl; fix `seoMetadata.pageId` before case studies.

## Related

- Seed copy in code: `src/lib/content/conversion-seed.ts`
- Components: `src/components/sections/conversion/`
