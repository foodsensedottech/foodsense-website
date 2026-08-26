# Contentful ↔ website alignment

The live site reads **published** Contentful entries only. This maps your space (`es87a9loayi1`) to the homepage.

## Homepage sections → content types

| Section | Content type API ID | Notes |
| --- | --- | --- |
| Header / footer chrome | `siteChrome` | Nav labels, CTA, footer tagline/geo/email/socials |
| Hero | `heroFields` | Optional: `heroEyebrow`, `heroCta`, `heroCtaHref` |
| About title | `aboutUsTitleSubtitle` | `heading`, `subheading` |
| About cards | `aboutUsCard` | Ordered by `sortOrder` when set |
| Pains title | `franchiseePainsTitle` | Uses `title` + `description` (mapped to heading/subheading) |
| Pain cards | `franchiseePainCard` | `title`, `description`, `lucideIcon` |
| Offerings title | `franchiseeOffersTitle` | **Publish one entry** or the heading is blank (cards still show) |
| Offer cards | `franchiseeOfferCard` | Shown even if title entry is missing |
| Contact | `contactTitleAndSubtitle` **or** `testimonialsTitleAndSubtitle` | Latter is labeled “Contact section (reuse)” in your space |

## `siteChrome` fields the site uses

| Field | Used for |
| --- | --- |
| `ctaLabel` | Header button |
| `navAbout` / `navOfferings` / `navContact` | Nav + footer links |
| `navServices` | Adds Services → `/services` when set |
| `navPains` | Optional; defaults to “Pains” if empty (add this Short text field if you want it editable) |
| `footerTagline` / `footerGeo` / `footerEmail` | Footer brand column |
| `linkedInUrl` / `instagramUrl` | Footer socials |
| Cookie fields | Stored for later; not rendered yet |

## Icons

Use Lucide export names in `lucideIcon` (e.g. `ShieldAlert`, `Globe`). The site also accepts common typos: `SheildAlert` → ShieldAlert, `World` → Globe, `bone-fracture` → Bone.

## Content still to fix in Contentful (not code)

1. **About** — update title to Who We Are + four cards (see `contentful-homepage-cards.md`)
2. **Pains** — replace the card titled “Packaged systems…” with “No single view of the group”
3. **Offerings title** — create/publish one `franchiseeOffersTitle` entry
4. **Hero** — fill `heroEyebrow` + `heroCta` for the yellow button
5. **Contact heading** — update `testimonialsTitleAndSubtitle` title/subtitle to Contact copy, **or** create `contactTitleAndSubtitle`

Paste pack: [`contentful-homepage-cards.md`](./contentful-homepage-cards.md)

## Types not on the homepage yet

`forWhomSection`, `howWeWorkSection`, `offeringsSection`, `proofSection`, `faqSection`, and related cards exist in Contentful for future design work. They are not rendered on `/` until you ask to wire them.
