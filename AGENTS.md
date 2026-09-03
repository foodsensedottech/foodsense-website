# AGENTS.md

Guidance for Cursor agents working on the FoodSense website.

## Always read first

1. `.cursorrules` — Brand OS (color, type, voice, motion)
2. `docs/website-2.0/assessment.md` — technical audit & remediation phases
3. `docs/brand/01-vision-mission-identity.md` → `12-frameworks.md` (08–12 are incomplete outlines)
4. `docs/website-2.0/decisions.md` — locked owner decisions (CRM, conversion, Contentful)
5. `docs/website-2.0/overview.md` — current Website 2.0 IA
6. `docs/website-2.0/contentful.md` — lean CMS keep / retire / create
7. `docs/website-2.0/contentful-copy-review.md` — Brand OS vs live CMS copy
8. `docs/README.md` — documentation map

## Product direction (Website 2.0)

- Primary conversion path: **conversion homepage** with unified contact form (homepage + `/contact`)
- Live IA: who we are, what we do, how we engage, services, contact. **No franchisee maturity quiz on the website.** `/franchisees` and `/es/franchisees` redirect home.
- Preview deployments first; **do not Promote to Production** unless the user explicitly asks
- Lean Contentful — conversion routes (`/`, `/about`, `/services`, `/contact`, chrome) are CMS. Seeds are fallback only. Do not recreate the vendor logo cloud.
- Spanish paused
- Brand docs follow **live site framing** (10+ units; Advisory / Fractional / Project)

## CRM

- **ClickUp** is the permanent destination for all forms
- Do not add HubSpot or other CRM SDKs — ClickUp only
- One task = one lead; set `Project = Website` on create

## Engineering

- Stack: Next.js App Router, TypeScript, Tailwind, Contentful, ClickUp
- Dev notes: `docs/engineering/development.md`
- Contentful revalidation: `docs/engineering/revalidation.md`
- Contentful Phase 1 runbook: `docs/engineering/contentful-phase1.md`
- Contentful editing map (section → field → entry links): `docs/engineering/contentful-editing-map.md`
- Contentful rebuild (wipe leftovers, vendor row retired): `docs/engineering/contentful-rebuild.md`
- ClickUp CRM: `docs/engineering/clickup.md`

## Docs hygiene

- Put new docs under `docs/brand/`, `docs/website-2.0/`, `docs/engineering/`, or `docs/analytics/`
- Move superseded material to `docs/archive/` instead of deleting history
- Update `docs/README.md` when you add a folder or change ownership of a topic

## Testing

- For UI changes: run the app and capture walkthrough evidence (screenshots/video under `/opt/cursor/artifacts`)
- Remember Vercel Preview ≠ Production
