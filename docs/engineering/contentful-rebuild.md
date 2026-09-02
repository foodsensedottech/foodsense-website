# Contentful rebuild — joint runbook

Source prompt: owner upload *FoodSense — Contentful Rebuild Prompt* (full wipe of `es87a9loayi1` / `master`). Backup is **already done**.

Do **not** unpublish and delete every entry/type on `master` until Phase B in this file is complete. The live site still queries the current type IDs. A wipe today does not take the homepage offline (it falls back to seed), but it **does** empty About CMS cards and any Preview that still reads `conversionHomepage`.

---

## Split of work

| Who | Does |
| --- | --- |
| **You (Contentful UI)** | Backup (done). Later: unpublish/delete, create types, paste copy, Publish. |
| **Code (this repo)** | Fetchers, seed, migrations, editing map — so new field IDs match the site. |
| **Neither yet** | Promote Preview to Production. Wipe `master` before code can read the new model. |

---

## Locked answers (prompt §3)

These are decided from the **current website code**, not from the prompt’s assumption that About and franchisee pages are unpublished orphans.

| Page | Decision | Evidence |
| --- | --- | --- |
| **About `/about`** | **Real page. Keep CMS.** | `src/app/about/page.tsx` fetches `aboutUsTitleSubtitle` + `aboutUsCard`. Empty CMS shows a short hardcoded fallback, not the full cards. |
| **Franchisee `/franchisees`** | **Do not rebuild a `franchiseeLandingPage` type now.** | Route exists but is **deferred** ([`decisions.md`](../website-2.0/decisions.md)). Copy already lives in `src/lib/franchisees/copy.ts` with Contentful fallbacks. Not in nav. |
| **Services `/services`** | **Code-only.** | `src/lib/content/services-page.ts`. No CMS type. Do not create a services page container until we ship CMS-driven `/services`. |
| **Contact `/contact`** | **Same fields as homepage contact.** | `getConversionHomepage()` — not a separate page type. |
| **Primary CTA** | **Book a Strategy Audit** | Never “Book a Call”. `siteSettings.bookCallLabel` (if built) stores that Audit string. |

---

## What the prompt gets wrong vs the repo

1. **About is rendered.** It is not an abandoned draft.
2. **`heroFields` is still queried** by `/franchisees` (`getHeroContent()`). Zero model references ≠ zero code. After wipe, franchisee landing already has static copy fallbacks.
3. **`founderWins` is a blob in CMS, an array in code.** Seed already has four named in-role lines (KFC, RBI, REEF, franchisee playbooks).
4. **Footer tagline is code-only today** (`conversionSeed.chrome.footerTagline`). Putting `footerBlurb` in `siteSettings` is a *new* field the site does not read yet.
5. **Nav/CTA chrome already live on `conversionHomepage`.** Moving them to `siteSettings` is a code change, not a Contentful-only move.
6. **Do not seed unsourced 22% / 7% `proofPoint`s.** Brand OS and the copy review banned those. `proofPoint` may exist as a type; entries wait on owner-sourced metrics.
7. **Vendor logos are optional in code.** Requiring `logo` on `partnerLogo` would block the eight name-only vendors we already seed.
8. **Renaming `conversionHomepage` → `homePage` and `conversionMenuItem` → `service` without shipping code first** makes Production and current Preview miss CMS and fall back to seed.

---

## Target model (after rebuild)

Lean. No return to 25 types. CTA label stays Strategy Audit.

| Type | Action | Site code today |
| --- | --- | --- |
| `seoMetadata` | Keep / recreate **identical** | Typed on unused/legacy fetches; homepage SEO is `heroHeading` / `heroSubheading` in code |
| `conversionPillar` | Keep as-is (`title`, `body`, `lucideIcon`) | Homepage pillars |
| `conversionHomepage` | **Keep this ID** (do not rename to `homePage` in v1) | `/`, `/contact`, header/footer chrome |
| `conversionMenuItem` | Keep ID; **add optional** `slug`, proof, partner refs later — do not rename `title`/`body` in v1 | Accordion |
| `conversionVendor` | Keep ID; `logo` **optional**; optional `url` | Logo cloud |
| `aboutUsTitleSubtitle` + `aboutUsCard` | Keep for `/about` v1 (or migrate to `aboutPage` + `iconCard` **in the same code PR**) | `/about` |
| `siteSettings` | **New, v2** — after homepage still works | Not read yet |
| `winEntry` | **New, v2** — optional; v1 can keep `founderWins` text | Code already maps blob → string[] |
| `proofPoint` | **New, empty** — no fake KPIs | Not read yet |
| `iconCard` | Only if we migrate About in the same PR | Not read yet |
| `homePage` / `service` / `partnerLogo` / `aboutPage` / `franchiseeLandingPage` | **Not in v1** | Would require a fetch rewrite first |
| `heroFields` | Delete after wipe; do not recreate | Franchisees ignores missing type |
| Franchisee CMS types | Do not recreate | Static copy + existing fallbacks |

**v1 rebuild = same type IDs the site already fetches**, clean empty space, paste Brand OS copy.  
**v2 = `siteSettings`, `winEntry`, optional proof/about containers** — code ships first.

---

## Phases

### Phase A — You can do now (optional, low risk)

Delete **unused leftover types only** if they still exist (faq, offerings, blog, testimonials, `heroFields` if you accept franchisee hero from static copy). **Do not delete:**

- `conversionHomepage`, `conversionPillar`, `conversionMenuItem`, `conversionVendor`
- `aboutUsTitleSubtitle`, `aboutUsCard`
- `seoMetadata`

Repo helper (review first): `node scripts/contentful/delete-unused-types.mjs` then `--apply` only after the review list looks right.

### Phase B — Code (this repo, before a full wipe)

1. Keep fetchers on current type IDs (already true).
2. Seed + paste pack stay the source of copy ([`conversion-seed.ts`](../../src/lib/content/conversion-seed.ts), [`contentful-copy-review.md`](../website-2.0/contentful-copy-review.md)).
3. Optional: dual-read later (`homePage` **or** `conversionHomepage`) if we ever rename.

**Do not full-wipe `master` until Phase B is on Preview** *or* you accept: homepage = seed, About = fallback paragraph, until you recreate and Publish the old type IDs.

### Phase C — Full wipe + recreate (Contentful UI, `master`)

Only when you are ready to recreate **v1 types immediately after**.

1. Unpublish all entries (linked pillars/menu/vendors first, then homepage, then About, then everything else).
2. Delete all entries.
3. Delete all content types.
4. Recreate **v1 types** (table above) with the **same field IDs** as [`contentful.md`](../website-2.0/contentful.md) field reference.
5. Create entries from the paste pack. Publish each linked entry, then the homepage.
6. Hit `/api/revalidate?secret=…&path=/` on the host you are looking at ([`revalidation.md`](./revalidation.md)).

Entry IDs we already use (keep these IDs if you can, so deep links in the editing map still work):

- `conversion-homepage-website-2`
- `conversion-pillar-program-lifecycle`, `conversion-pillar-tech-stack`, `conversion-pillar-ecosystem`
- `conversion-menu-revenue`, `conversion-menu-partnerships`, `conversion-menu-delivery`, `conversion-menu-vendor-governance`, plus optional loyalty/data
- `conversion-vendor-oracle` … `conversion-vendor-r365`

### Phase D — v2 model (later PR)

`siteSettings`, `winEntry`, optional `proofPoint` / About `iconCard`. Code PR first, Preview, then Contentful.

---

## Copy to paste (v1)

Use the pack in [`contentful-copy-review.md`](../website-2.0/contentful-copy-review.md), not live Production strings if those are still “Enterprise Architecture”. Include owner pillar and menu titles already in the seed.

Do **not** paste 22% / 7% metrics.

Footer: keep the seed tagline *We bridge restaurant technology and restaurant operations.* Do not stuff the authority paragraph into the footer.

---

## Next session

1. Confirm: **v1 wipe** (same IDs) vs **wait for v2 code**.
2. If v1: you run Phase C in Contentful; we watch Preview/Production fallback vs CMS.
3. If v2 first: we ship fetchers + migrations, then you wipe.
