# Contentful rebuild — joint runbook

Backup is **already done**. Do **not** wipe `master` until migration `004` is on Preview (this PR) *or* you accept seed fallbacks for every marketing route.

Owner direction (Sep 2026):

1. **Vendor-agnostic** — no logo cloud, no “Trusted Integration Partners,” no `conversionVendor` on the live site.
2. **No hardcoded marketing copy** — `/`, `/about`, `/services`, `/contact`, and footer chrome come from Contentful. Seeds are unpublished-CMS fallback only.
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
| `services` **or** `servicesPage` + linked `conversionMenuItem` | `/services` |
| `franchiseeLandingPage` | Unused — `/franchisees` redirects home. Quiz is off the site. |
| `aboutUsTitleSubtitle` + `aboutUsCard` | `/about` |
| `seoMetadata` | keep |

**Delete when cleaning leftovers:** `conversionVendor`, `heroFields`, `franchiseePainsTitle`, `franchiseePainCard`, `franchiseeOfferCard`, blog/testimonial/faq leftovers.

Helper: `node scripts/contentful/delete-unused-types.mjs` (review), then `--apply`. Keep list matches the table above.

---

## Creating types in the Contentful UI

You **cannot** change a content type’s API identifier after the first Save. Contentful greys it out. That is not a missing menu — there is no rename.

| When | What to do |
| --- | --- |
| **Before** first Save | Click the identifier under the type name. Type the ID the site uses (`franchiseeLandingPage`). Then Save. |
| **After** first Save | Leave it. The site now reads `services` (the ID Contentful guessed from “Services”) as well as `servicesPage`. |

Field **names** can be English. Field **IDs** should match the editing map, or the aliases below. Field **type** (Short text vs Long text) cannot be switched in place: omit/delete the field, add it again as Long text, keep the same Field ID.

**Services type you already created (`services`):** do not recreate it. Next UI fix is **Intro → Long text** (the paste is longer than 256 characters). Then restrict Engagement Modes and Capabilities to **Conversion Menu Item** only.

**Franchisee type:** you already created `franchiseeLandingPage`. Leave it empty. Quiz is off the site; `/franchisees` redirects home.

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
