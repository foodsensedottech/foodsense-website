# Contentful Revalidation Setup

This document explains how to set up Contentful webhooks to trigger on-demand revalidation for the Next.js website.

## How It Works

1. Next.js prerenders CMS pages (`/`, `/about`) at build time and via ISR
2. When content changes in Contentful, a webhook is triggered
3. The webhook calls `/api/revalidate`
4. The API revalidates the affected pages
5. The next request fetches fresh Contentful data without a full rebuild

`/` and `/about` also use `export const revalidate = 3600` as a fallback (at most one hour stale if the webhook is down).

## Environment Variable

Set this in `.env.local` **and** in Vercel (Production, Preview, Development):

```
CONTENTFUL_REVALIDATION_SECRET=your-secure-random-token
```

Generate a token:

```bash
openssl rand -base64 32
```

Mark the Vercel variable as **Sensitive**. After adding or changing it, redeploy so the serverless function picks it up.

The endpoint returns `500 Revalidation is not configured` if this variable is missing. There is no default secret.

## Setting Up the Webhook in Contentful

1. Log in to Contentful
2. Go to Settings > Webhooks
3. Click Add Webhook
4. Fill in:

   - Name: `Next.js Revalidation`
   - URL: `https://www.foodsense.tech/api/revalidate?secret=YOUR_SECRET`

     Use the same value as `CONTENTFUL_REVALIDATION_SECRET` in Vercel.

   - Triggers: Create, Save, Publish, Unpublish, and Delete for Entries
   - Content types (Website 2.0 lean model): `conversionHomepage`, `conversionPillar`, `conversionMenuItem`, `aboutUsTitleSubtitle`, `aboutUsCard`, `services` (UI) / `servicesPage`, `franchiseeLandingPage` (or `franchisee` / `franchisees`), `seoMetadata`. Old leftovers (`conversionVendor`, `heroFields`, `servicesCard`, franchisee card types) can stay on the webhook until deleted.
   - Include Entry Body: Yes (used to pick extra paths such as `/about` and `/services`)

The webhook URL above hits **Production**. Preview of this PR will not update from that webhook. After a Contentful Publish, either wait up to an hour (ISR) or open:

`https://<this-preview-host>/api/revalidate?secret=YOUR_SECRET&path=/services`

If the payload has no content type, the API still revalidates `/`.

## Testing

### Manual (GET)

```
https://www.foodsense.tech/api/revalidate?secret=YOUR_SECRET&path=/about
```

Local:

```
http://localhost:3000/api/revalidate?secret=YOUR_SECRET&path=/about
```

A successful response looks like:

```json
{ "revalidated": true, "message": "Revalidated path: /about" }
```

`401` means the secret does not match. `404` means the route is not deployed.

### After a Contentful publish

1. Publish an entry
2. Check Contentful webhook delivery (should be HTTP 200)
3. Check Vercel function logs for `Revalidated path: ...`
4. Reload the site (a hard refresh); `age` on the `x-vercel-cache` headers should reset

## Troubleshooting

- Production used to 404 `/api/revalidate` because the handler was committed as `route.ts.bak`. The live route is `src/app/api/revalidate/route.ts`.
- Secret in the webhook URL must match the Vercel env var exactly (no extra quotes or whitespace).
- Use `www.foodsense.tech` (apex `foodsense.tech` 308s to www).
- `/about` was fully static (no ISR). It now has `revalidate = 3600` plus on-demand revalidation.
