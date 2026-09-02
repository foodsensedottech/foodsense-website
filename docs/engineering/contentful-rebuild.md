# Contentful rebuild — joint runbook

Backup is **already done**. Do **not** wipe `master` until migration `004` is on Preview (this PR) *or* you accept seed fallbacks for every marketing route.

Owner direction (Sep 2026):

1. **Vendor-agnostic** — no logo cloud, no “Trusted Integration Partners,” no `conversionVendor` on the live site.
2. **No hardcoded marketing copy** — `/`, `/about`, `/services`, `/franchisees`, `/contact`, and footer chrome come from Contentful. Seeds are unpublished-CMS fallback only.
3. **No bloat** — do not recreate the old 25-type model or the vendor row.

---

## Split of work

| Who | Does |
| --- | --- |
| **Code (this repo)** | Fetchers, migration `004`, seed, editing map. |
| **You (Contentful)** | Run migration + seed with `CONTENTFUL_MANAGEMENT_TOKEN`, or paste from the editing map. Later: delete leftover vendor / `heroFields` / old franchisee card types. |
| **Neither yet** | Promote Preview to Production. |

---

## Live types (after `004`)

| Type | Route |
| --- | --- |
| `conversionHomepage` + `conversionPillar` + `conversionMenuItem` | `/`, `/contact`, header/footer |
| `servicesPage` + linked `conversionMenuItem` | `/services` |
| `franchiseeLandingPage` + linked `conversionMenuItem` | `/franchisees`, `/es/franchisees` |
| `aboutUsTitleSubtitle` + `aboutUsCard` | `/about` |
| `seoMetadata` | keep |

**Delete when cleaning leftovers:** `conversionVendor`, `heroFields`, `franchiseePainsTitle`, `franchiseePainCard`, `franchiseeOfferCard`, blog/testimonial/faq leftovers.

Helper: `node scripts/contentful/delete-unused-types.mjs` (review), then `--apply`. Keep list matches the table above.

---

## Commands

```bash
# After this PR is on the branch you will deploy
CONTENTFUL_ENVIRONMENT=master npm run contentful:migrate:master
CONTENTFUL_ENVIRONMENT=master npm run contentful:seed
```

Then revalidate the host you are viewing ([`revalidation.md`](./revalidation.md)).

If the space hits the 25-type cap, run the delete helper **first** (review list must show `conversionVendor` / `heroFields` / old franchisee types as REMOVE).

---

## What stays in code

- ClickUp form labels and option UUIDs
- Assessment **scoring** (`score.ts`) — question **labels** are CMS
- Legal pages
- Seed files as fallback if a type is missing

CTA remains **Book a Strategy Audit**. Do not seed unsourced 22%/7% KPIs.

---

## Wipe sequence (only if you still want a clean `master`)

1. Ship this code to Preview.
2. Unpublish leftover vendor entries and unused types (or run the delete helper).
3. Apply `004` if types are missing; seed.
4. Publish. Revalidate.
5. Do not Promote to Production unless asked.
