# AGENTS.md

## Cursor Cloud specific instructions

FoodSense is a single Next.js 14 (App Router) marketing website (TypeScript + Tailwind + Radix UI). It is content-driven via Contentful (CMS) and uses HubSpot for the contact/lead form. There is only one service to run: the Next.js app.

### Running / building / linting / testing

- Standard commands live in `package.json` `scripts` and `README.md`/`DEVELOPMENT.md`. Run the dev server with `npm run dev` (serves on `http://localhost:3000`). Production build: `npm run build`.
- Node: `.nvmrc` pins `18.17.0`, but the app builds and runs fine on the VM's Node 22. `package.json` only requires `node >=18.17.0`, so no version switch is needed.
- Tests: `npm test` runs Jest, but the repo currently contains **no test files and no Jest config**, so it reports "No tests found" and exits non-zero. This is expected — there is nothing to test until tests are added.
- Lint: `npm run lint` currently **fails** because the committed `.eslintrc.json` extends `next/typescript`, a config that only exists in `eslint-config-next` v15+, while this repo pins `eslint-config-next@14.1.0`. This is a pre-existing repo issue, not an environment problem. (If you need working lint, you would have to change the eslint config or bump `eslint-config-next` — do not do this unless the task calls for it.)

### Environment variables (important, non-obvious)

- The app needs a `.env.local` file. `.env.local` is gitignored, so it does **not** persist across fresh VMs; the startup/update script recreates it with placeholder values if it is missing.
- Do **not** copy `.env.example` verbatim: its Contentful values are empty. `src/lib/contentful/client.ts` builds a `previewClient` at module load using `getEnvVar("CONTENTFUL_SPACE_ID")` and `getEnvVar("CONTENTFUL_PREVIEW_ACCESS_TOKEN")`, which **throw on empty/missing values**. That module is imported by the home page (`/`) and `/about`, so those routes hard-error unless those two vars are set to non-empty values. The placeholder `.env.local` satisfies this.
- With placeholder credentials, `/` and `/about` render the site chrome (header/footer) but fall back to a loading state for CMS-driven content (Contentful API returns 401, caught gracefully). To see real CMS content, provide real `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, and `CONTENTFUL_PREVIEW_ACCESS_TOKEN` in `.env.local`.
- The contact form (`POST /api/contact`) validates input (Zod) and then calls HubSpot. With placeholder `HUBSPOT_ACCESS_TOKEN` it returns a 500 and the UI shows "Failed to submit form to HubSpot" — this is expected without real HubSpot credentials. Set real `HUBSPOT_ACCESS_TOKEN` and `HUBSPOT_PORTAL_ID` to submit successfully.

### Pages that work without any external credentials

`/ui-showcase`, `/contact` (form UI + validation), `/services`, `/privacy-policy`, `/terms-and-conditions`, `/accessibility`. These are good for verifying the app runs. Dark/light theme toggle (next-themes) works everywhere.

### Dev server notes

- `DEVELOPMENT.md` describes `dev:watch`/`dev:fixed` workarounds for a Next.js 15 middleware-manifest bug. The repo is currently pinned to Next `14.1.0`, so plain `npm run dev` works without those workarounds.
