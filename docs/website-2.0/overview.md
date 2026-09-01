# Website 2.0 — overview

High-conversion single page for FoodSense (Preview first; promote to Production only after approval).

Locked decisions: [`decisions.md`](./decisions.md).

## Audience

**10+ unit** QSR / fast-casual / franchise operators (LATAM, Caribbean, US). See `docs/brand/02-ideal-client-profile.md`. Single-unit independents are not customers.

## Primary conversion

**Unified contact form** on homepage (`#contact-section`) and `/contact` → ClickUp Leads. Homepage section copy may still say “Book a Strategy Audit”; it is the same form. The `/franchisees` maturity tool stays for a later phase.

## Page structure

1. **Hero** — Value headline + primary CTA (“Book a Strategy Audit”) → contact
2. **Authority** — Why FoodSense + founder wins (operator + technologist credibility)
3. **Core pillars** — Program lifecycle / tech stack / ecosystem integration
4. **Capabilities accordion** — POS, kiosk, delivery, vendor governance, loyalty, data
5. **Vendors** — landscape we already know (logo cloud; not a partnership claim)
6. **Contact** — Shared qualification form (personal info, brands, location band, type, POS, services)

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

- [`website-2.0/contentful.md`](./contentful.md) — lean model
- Seed copy: `src/lib/content/conversion-seed.ts`
- Copy audit: [`contentful-copy-review.md`](./contentful-copy-review.md)
