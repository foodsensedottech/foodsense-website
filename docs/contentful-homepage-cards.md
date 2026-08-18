# Homepage card sections in Contentful

The homepage order is Hero → About → **Pains** → **Offerings** → Contact.

| Contentful type | How many | Where it shows |
| --- | --- | --- |
| Franchisee Pains Title | 1 published entry | Pains section heading |
| Franchisee Pain Card | 3–4 published entries | Pains cards |
| Franchisee Offers Title | 1 published entry | Offerings section heading |
| Franchisee Offer Card | 3–4 published entries | Offerings cards |

Create entries under **Content → Add entry**, then **Publish**. The content model only defines the template.

If Offer Cards are published without an Offers Title, the site uses a default heading so the cards still appear.

## Duplicate the About Us types

In Contentful: **Content model**. Duplicate the existing About types (do not reuse the About entries, or they will also show on `/about`).

### Title types (copy `aboutUsTitleSubtitle`)

Preferred fields: `heading` and `subheading`. If a title type was created with `title` / `description` instead, the site maps those to the heading and intro.

| Name | API identifier |
| --- | --- |
| Franchisee Pains Title | `franchiseePainsTitle` |
| Franchisee Offers Title | `franchiseeOffersTitle` |

Create **one published entry** of each type. That entry is the section heading and intro.

### Card types (copy `aboutUsCard`)

Keep the same fields: `title`, `description`, `lucideIcon`.

| Name | API identifier |
| --- | --- |
| Franchisee Pain Card | `franchiseePainCard` |
| Franchisee Offer Card | `franchiseeOfferCard` |

Create as many published card entries as you want for each section. Cards render in the order you create them (`sys.createdAt`). Use the same 4-column card layout as About Us.

### `lucideIcon` values

Use a Lucide icon name in PascalCase, the same way About Us cards do. Examples: `Star`, `Layers`, `Percent`, `ShieldAlert`, `ClipboardCheck`, `Store`, `Wallet`, `LineChart`, `Rocket`, `Computer`.

## What the site fetches

- Homepage `/` reads those four content types.
- `/franchisees` redirects to `/` and uses the same entries.
- Publishing an entry should hit `/api/revalidate` if the Contentful webhook is configured (see `REVALIDATION.md`).

After Contentful is updated, **Promote the latest Vercel deployment to Production** if the live site still shows an older Preview.
