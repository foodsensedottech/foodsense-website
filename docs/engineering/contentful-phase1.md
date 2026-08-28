# Contentful Phase 1 — runbook

Phase 1 applies model changes on **`staging`**, seeds the conversion homepage, then you point Website 2.0 Preview at that environment.

## Prerequisites

1. **Content management token** — not the delivery API token.
   - Contentful → Settings → API keys → **Content management tokens** → Generate personal token
   - Add to `.env.local` and Vercel Preview:

   ```
   CONTENTFUL_MANAGEMENT_TOKEN=...
   CONTENTFUL_SPACE_ID=es87a9loayi1
   CONTENTFUL_ACCESS_TOKEN=...        # delivery — for verify step
   ```

2. **Environment allowance** — free tier allows `master` + one extra environment. Phase 1 creates `staging` if missing.

## Run (local or Cloud Agent)

```bash
npm run contentful:phase1
```

This runs:

| Step | Action |
| --- | --- |
| 1 | Create `staging` from `master` (if needed) |
| 2 | Migration `001-fix-seo-metadata-page-id.js` |
| 3 | Migration `002-create-conversion-types.js` |
| 4 | Seed pillars, menu items, vendors, homepage from `conversion-seed.ts` |
| 5 | Delivery API smoke check |

Migrations live in `contentful/migrations/`. **Never hand-edit field IDs in the Contentful UI** for destructive changes — add new migration files instead.

## After staging looks good

1. Set on **Website 2.0 Vercel Preview**:

   ```
   CONTENTFUL_ENVIRONMENT=staging
   ```

2. Redeploy Preview and confirm homepage copy comes from CMS (not seed fallback).

3. Apply the same migrations to `master`:

   ```bash
   CONTENTFUL_ENVIRONMENT=master node scripts/contentful/apply-migrations.mjs
   npm run contentful:seed
   ```

4. When production should read CMS: set `CONTENTFUL_ENVIRONMENT=master` (or leave unset — default is `master`).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run contentful:phase1` | Full Phase 1 on staging |
| `npm run contentful:migrate:staging` | Migrations only on staging |
| `npm run contentful:seed` | Seed current `CONTENTFUL_ENVIRONMENT` |

## Troubleshooting

- **`Missing CONTENTFUL_MANAGEMENT_TOKEN`** — add CMA token (see above).
- **`usageExceeded` / cannot create ContentType** — the space has **25 content types** (common free-tier cap). Before migration `002`, retire unused types per [`contentful.md`](../website-2.0/contentful.md) (`DEPRECATED_*`), or upgrade the Contentful plan. Updating existing types (e.g. `seoMetadata`) still works.
- **Migration already applied** — safe to re-run `001`; `002` fails if types exist (run seed only).
- **Staging not ready** — wait and retry; large spaces can take several minutes to fork.
