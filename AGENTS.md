# AGENTS.md

Guidance for Cursor agents working on the FoodSense website.

## Always read first

1. `.cursorrules` — Brand OS (color, type, voice, motion)
2. `docs/brand/01-vision-mission-identity.md` → `07-operating-logic.md`
3. `docs/website-2.0/overview.md` — current Website 2.0 IA
4. `docs/README.md` — documentation map

## Product direction (Website 2.0)

- Single-page conversion site for multi-unit QSR / franchise tech & ops consulting
- Preview deployments first; **do not Promote to Production** unless the user explicitly asks
- Lean Contentful model (`docs/website-2.0/contentful.md`); prefer seed content over inventing new CMS types mid-task
- Keep Spanish out until Contentful locales exist

## Engineering

- Stack: Next.js App Router, TypeScript, Tailwind, Contentful, HubSpot
- Dev notes: `docs/engineering/development.md`
- Contentful revalidation: `docs/engineering/revalidation.md`
- HubSpot property map: `docs/engineering/hubspot-properties.csv`

## Docs hygiene

- Put new docs under `docs/brand/`, `docs/website-2.0/`, `docs/engineering/`, or `docs/analytics/`
- Move superseded material to `docs/archive/` instead of deleting history
- Update `docs/README.md` when you add a folder or change ownership of a topic

## Testing

- For UI changes: run the app and capture walkthrough evidence (screenshots/video under `/opt/cursor/artifacts`)
- Remember Vercel Preview ≠ Production
