# ClickUp CRM

Permanent destination for website forms (Strategy Audit first; contact + maturity assessment next).

## Env

```
CLICKUP_API_TOKEN=pk_...   # required
CLICKUP_LIST_ID=           # optional; defaults to Leads 901328239583
```

## Leads list

- Workspace / Space / List: see assessment §8.1
- Always set **Project = Website** (`f52ad055-0eee-4d74-a389-6d15e4aa3ee8`)
- Do **not** use the old phantom source field ID

## Code

| Path | Role |
| --- | --- |
| `src/lib/clickup/constants.ts` | List + field IDs |
| `src/lib/clickup/client.ts` | create / find-by-email / set field / comment |
| `src/lib/clickup/create-strategy-audit-lead.ts` | Strategy Audit upsert |
| `src/lib/clickup/create-contact-lead.ts` | Contact page upsert |
| `src/app/api/contact-audit/route.ts` | Homepage form API |
| `src/app/api/contact/route.ts` | Contact page API |

Dedupe: lookup by email; on match, enrich fields + comment. Lookup failures return `null` and create a new task (never drop the lead).

## Later

- Add ClickUp **Maturity Score** (number) + **Maturity Band** (optimized / scaling / fragmented) before wiring `/api/assessment`
- Remove `@hubspot/api-client` after assessment path is verified
