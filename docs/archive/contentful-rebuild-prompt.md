# Archive — original Contentful rebuild prompt

**Superseded by** [`../engineering/contentful-rebuild.md`](../engineering/contentful-rebuild.md).

Kept so the owner prompt is not lost. Do not execute this file as written: About `/about` **is** rendered; `/franchisees` is deferred; do not rename `conversionHomepage` before code ships; CTA is **Book a Strategy Audit**; do not seed unsourced 22%/7% metrics.

---

# FoodSense — Contentful Rebuild Prompt

Hand this to whoever executes the rebuild (developer, agency, or yourself in the Contentful UI). It assumes you are deleting the current content model and rebuilding clean in the `es87a9loayi1` space, `master` environment.

---

## 0. Before deleting anything

Export a backup first, even though you're rebuilding: `contentful space export --space-id es87a9loayi1 --environment-id master`. Keep the JSON. Some of the current copy is worth keeping (see Section 2) — you'll copy/paste it into the new model rather than retype it.

**Delete order matters in Contentful** — you must unpublish and delete *entries* of a content type before you can delete the *content type* itself. Sequence:
1. Unpublish and delete all entries.
2. Delete all content types.
3. Rebuild content types per Section 1.
4. Recreate entries per Section 2.

---

## 1. Content types to build

### `siteSettings` (singleton — NEW, does not exist today)
Pulls nav labels, contact defaults, and footer/social links out of the homepage entry, since they're site-wide, not page-specific. Today these live inside `conversionHomepage` (`navAuthority`, `navPillars`, `navMenu`, `navPartners`, `navContact`, `chromeCtaLabel`) — that's the wrong home for them structurally, even though it's currently harmless with one page.

| Field | Type | Validation |
|---|---|---|
| `navAuthorityLabel` | Short text | required |
| `navPillarsLabel` | Short text | required |
| `navMenuLabel` | Short text | required |
| `navPartnersLabel` | Short text | required |
| `navContactLabel` | Short text | required |
| `bookCallLabel` | Short text | required — used for every "Book a Call" CTA site-wide |
| `contactEmail` | Short text | required |
| `linkedinUrl` | Short text | |
| `instagramUrl` | Short text | |
| `footerBlurb` | Long text | max 200 chars — short original copy, do NOT reuse/truncate the authority paragraph here as the live footer currently does |
| `copyrightHolder` | Short text | e.g. "FoodSense" — generate the year in code, never store it |

### `seoMetadata` — KEEP AS-IS
This is the one content type in the current model that's already built correctly: exact OG image dimension validation (1200×630), title/description length constraints, canonical URL regex, `robots` dropdown, unique `pageId`. Rebuild it identically. Do not change this one.

### `proofPoint` (NEW)
Atomic, reusable stat. Doesn't exist today — the current model has no way to attach a number to a claim anywhere in the site.

| Field | Type | Validation |
|---|---|---|
| `metricValue` | Short text | required, e.g. "22%" |
| `metricLabel` | Short text | required, e.g. "Food cost reduction" |
| `context` | Short text | optional, e.g. "Across 2,200+ store deployments" |

### `iconCard` (NEW — consolidates 3 near-duplicate types)
The current model has `aboutUsCard`, `franchiseePainCard`, and `franchiseeOfferCard` as three separate content types with nearly identical schemas (title 10–40 chars, description 25–175 chars, lucideIcon). Collapse into one reusable type and differentiate by context via the reference field on the parent page, not by content type.

| Field | Type | Validation |
|---|---|---|
| `title` | Short text | required, 10–40 chars |
| `description` | Long text (plain) | required, 25–175 chars |
| `lucideIcon` | Short text | required |
| `body` | Long text | optional, for cases needing more than the description |
| `linkedProofPoint` | Reference (single, `proofPoint`) | optional |

### `winEntry` (NEW — replaces the `founderWins` text blob)
Today `founderWins` on `conversionHomepage` is one long-text field with entries separated by blank lines. That means no independent reordering, no per-win proof attachment, and one typo risks the whole block. Replace with a referenced, orderable collection.

| Field | Type | Validation |
|---|---|---|
| `title` | Short text | required |
| `description` | Long text (plain) | required |
| `linkedProofPoint` | Reference (single, `proofPoint`) | optional |

### `conversionPillar` — KEEP AS-IS
Title + body + optional icon. Already fine, no changes needed.

### `service` (RENAME + EXTEND `conversionMenuItem`)
Today this only has `title` and `body` — no proof, no logo tie-in, no slug. Extend it:

| Field | Type | Validation |
|---|---|---|
| `name` | Short text | required (was `title`) |
| `description` | Long text | required (was `body`) |
| `slug` | Short text | required, unique — reserve this now even with no dedicated service pages yet |
| `linkedProofPoints` | References (many, `proofPoint`) | optional, "accept only specified entry types" ON |
| `linkedPartnerLogos` | References (many, `partnerLogo`) | optional |

### `partnerLogo` (RENAME `conversionVendor`)
Already correctly modeled as a referenced, array-ordered collection. Just rename `name` field stays, keep `logo`, add:

| Field | Type | Validation |
|---|---|---|
| `name` | Short text | required |
| `logo` | Media (single asset) | required, image only |
| `url` | Short text | optional |

### Page-level types — one per real page, each referencing `seoMetadata`

Right now there's a `pageId` for `services` and `contact` in `seoMetadata` with no page behind them, and a fully written About page and franchisee-pains page with no container type or route rendering them. Decide which of these are real, planned pages before rebuilding — don't recreate orphans. Recommended container types:

**`homePage`** (singleton — replaces `conversionHomepage`, minus the nav/footer fields now in `siteSettings`)

| Field | Type |
|---|---|
| `seoMetadata` | Reference (single, `seoMetadata`) |
| `heroEyebrow`, `heroHeading`, `heroSubheading`, `heroImage`, `heroCta`, `heroCtaHref` | as before |
| `authorityEyebrow`, `authorityHeading`, `authorityBody` | as before |
| `founderLabel`, `founderImage` | as before |
| `wins` | References (many, `winEntry`) — replaces `founderWins` text blob |
| `pillarsEyebrow`, `pillarsHeading`, `pillars` | References (many, `conversionPillar`) |
| `menuEyebrow`, `menuHeading`, `services` | References (many, `service`) |
| `partnersEyebrow`, `partnersHeading`, `partnerLogos` | References (many, `partnerLogo`) |
| `contactHeading`, `contactSubheading`, `contactResponseNote`, `contactCtaLabel` | as before |

**`aboutPage`** (singleton — only build this if you're actually shipping a dedicated About route)

| Field | Type |
|---|---|
| `seoMetadata` | Reference (single, `seoMetadata`) |
| `heading`, `subheading` | as today |
| `body`, `originHeadline`, `originBody`, `resumeHeadline`, `resumeDisclaimer` | as today |
| `differenceHeadline` | as today |
| `differenceCards` | References (many, `iconCard`) — replaces the unlinked `aboutUsCard` entries |

**`franchiseeLandingPage`** (singleton — only build this if you're actually shipping this landing page; it reads like ad-campaign or cold-outreach landing content)

| Field | Type |
|---|---|
| `seoMetadata` | Reference (single, `seoMetadata`) |
| `painsHeading`, `painsDescription` | from `franchiseePainsTitle` |
| `painCards` | References (many, `iconCard`) |
| `offerCards` | References (many, `iconCard`) |

Delete `heroFields` entirely — confirmed zero references anywhere in the model, and its copy matches neither the live site nor any other entry. It's a dead leftover, not a source of truth for anything.

---

## 2. Copy worth preserving from the current export

Paste these directly into the new entries rather than retyping — this is copy that's already live and working:

- Hero: `"We bridge restaurant technology and restaurant operations."` + the full subheading paragraph
- Authority body: the "corporate sent a stack, the vendors sent a deck" paragraph
- All 4 `founderWins` lines → migrate into 4 separate `winEntry` entries
- All 4 `conversionMenuItem` title/body pairs → migrate into `service` entries, then go back and attach a `proofPoint` and `partnerLogo` to each one, since none currently have either
- All 8 `partnerLogo`/`conversionVendor` entries — keep as-is, already correctly modeled
- The full `aboutUsTitleSubtitle` and `franchiseePainsTitle` copy — keep as text to reuse in the new page types, **if** you decide to ship those pages

---

## 3. Decision needed before rebuild starts

Answer this before anyone touches Contentful: **are the About page and the franchisee-pains landing page real, planned pages, or abandoned drafts?** They're fully written and published but rendered nowhere. If they're planned, build `aboutPage` and `franchiseeLandingPage` now while migrating. If they're abandoned, don't recreate the container types — archive the copy externally (e.g. paste it into a doc) and leave them out of the new model entirely. Rebuilding blind on this will just recreate the same orphan problem.
