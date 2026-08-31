# ClickUp CRM

Permanent destination for the **website contact form** (homepage `#contact-section` and `/contact`).

## Env

```
CLICKUP_API_TOKEN=pk_...   # required
CLICKUP_LIST_ID=           # optional; defaults to Leads 901328239583
CLICKUP_FIELD_LOCATIONS=           # new dropdown field UUID
CLICKUP_FIELD_RESTAURANT_TYPE=     # new dropdown field UUID
CLICKUP_FIELD_POS_SYSTEM=          # new dropdown field UUID
CLICKUP_FIELD_SERVICE_INTERESTS=   # new labels (multi) field UUID
```

If ClickUp cannot change a field type, **delete the old field and create a new one**, then paste IDs per [`clickup-field-alignment.md`](./clickup-field-alignment.md).

## Leads list

- Workspace / Space / List: see [`assessment.md` §8.1](../website-2.0/assessment.md#81-clickup)
- Always set **Project = Website** (`f52ad055-0eee-4d74-a389-6d15e4aa3ee8`)
- Do **not** use the old phantom source field ID

## Field parity with the form

Form fields must match ClickUp custom fields (dropdown options, etc.). Setup guide: [`clickup-field-alignment.md`](./clickup-field-alignment.md).

## Code

| Path | Role |
| --- | --- |
| `src/lib/clickup/constants.ts` | List + field IDs |
| `src/lib/clickup/field-options.ts` | Dropdown option UUIDs + fallbacks |
| `src/lib/clickup/client.ts` | create / find-by-email / set field / comment |
| `src/lib/clickup/create-contact-lead.ts` | Contact form upsert |
| `src/app/api/contact/route.ts` | POST `/api/contact` |
| `src/components/sections/contact/contact-form.tsx` | Shared form (homepage + `/contact`) |

Dedupe: lookup by email; on match, enrich fields + comment. Lookup failures return `null` and create a new task (never drop the lead).

## Later

- Wire `/franchisees` maturity quiz to ClickUp (deferred)
