# Contentful: edit the FoodSense site

The live copy is meant to live in Contentful. Until an entry is published, the site shows the locked deck in `src/lib/copy/site.ts` so pages never go blank.

## One-time setup

1. In [Contentful](https://app.contentful.com) open space `es87a9loayi1`.
2. Create a **CMA (personal) token**: Account settings → CMA tokens.
3. Put these in `.env.local` (and in Vercel for the delivery API, which should already be there):

```
CONTENTFUL_SPACE_ID=es87a9loayi1
CONTENTFUL_ACCESS_TOKEN=...          # Content Delivery API
CONTENTFUL_MANAGEMENT_TOKEN=...      # CMA token, local setup only
```

4. From this repo:

```bash
npm run contentful:setup
```

That creates the content types below and adds eyebrow/CTA fields on the existing `heroFields` type.

5. In Contentful, **Content** → create **one** entry per section type, plus one card/step/FAQ per item. Publish.
6. Point the existing Contentful webhook at `/api/revalidate` so publishes show within a minute (pages also refresh every 60 seconds).

## What to edit

| You want to change | Content type | Notes |
| --- | --- | --- |
| Nav labels, footer, cookie bar, CTA, email, social URLs | `siteChrome` | One published entry. |
| Homepage H1, subhead, eyebrow, CTA, **hero photo** | `heroFields` | Image field: `backgroundImage`. |
| Who this is for (headlines) | `forWhomSection` | One entry. |
| “We do not replace” cards | `forWhomCard` | Add an **Image** on each card. Sort with `sortOrder` (1, 2, 3). |
| How you hire FoodSense | `offeringsSection` + 3× `offeringMode` | Mode cards take an **Image**. |
| How we work | `howWeWorkSection` + 3× `howWeWorkStep` | Steps take an **Image**. |
| Proof / résumé beats | `proofSection` + 3× `proofBeat` | Beats take an **Image**. Also used on About. |
| FAQ | `faqSection` + `faqItem` | Question + answer. |
| Contact headline, success/error, calendar blurb | `contactSection` | One entry. |
| `/services` | `servicePage` + 4× `serviceDomain` | Domain cards take an **Image**. |
| `/about` | `aboutPage` + `aboutDifference` | Difference cards take an **Image**. Résumé cards are `proofBeat`. |

Card images: upload in the Media library, then attach to the **Image** field. Recommended ~1600×1000, compressed. Alt text is the asset title.

## How the site reads it

Published Contentful text **wins**. Empty fields fall back to `src/lib/copy/site.ts`. You can tighten copy in Contentful without a code deploy.

Do not put a new paragraph in React if it should be founder-editable — add a field to the matching type instead, then map it in `src/lib/contentful/marketing.ts`.
