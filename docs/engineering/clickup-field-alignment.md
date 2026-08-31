# ClickUp field alignment — website contact form

The website uses **one contact form** on `/` (homepage) and `/contact`. Submissions upsert to **Leads** list `901328239583` via `src/lib/clickup/create-contact-lead.ts`.

ClickUp **cannot change a custom field’s type**. For fields that were number, short_text, or text, **delete the old field and create a new one** with the correct type, then wire the new field ID in code (see below). That is the expected workflow.

## Fields that stay (no change)

| Form field | ClickUp custom field | Field ID |
| --- | --- | --- |
| Email | Email | `b950a0d8-08de-41ad-beb1-f4c5197cbba3` |
| Phone | Phone | `8efc4847-ebc0-4d9c-a1b9-7fbfe387399f` |
| Restaurant Brand(s) | Brands Represented | `ca2b5438-e0f7-4965-86e7-805f9c066be5` |
| Primary brand (derived) | Company / group | `2117e392-e716-4fa3-95b4-9b6c4c1ef77a` |
| (auto) | Project | `b8734eca-e728-415d-9e9a-096baf15e4d1` → **Website** `f52ad055-0eee-4d74-a389-6d15e4aa3ee8` |

## Fields to recreate (delete old → create new)

Delete these legacy fields if still present, then create replacements:

| Old field (delete) | Old ID | New ClickUp type | New field name (suggested) | Form control |
| --- | --- | --- | --- | --- |
| Number of Locations | `c0844048-4fc4-4b56-9c3f-e660627c8fd0` | **drop_down** | Number of Locations | dropdown |
| Restaurant type | `1fd7a4e1-a561-4bc3-b4ea-fb264154ac0c` | **drop_down** | Restaurant type | dropdown |
| POS System | `fd69d7a3-158f-4baa-8e2e-b5930e7933f6` | **drop_down** | POS System | dropdown |
| What’s breaking | `3c093ec2-8abf-4f6f-8ed6-b7a749d28d41` | **labels** (multi) | Services Interested In | multi checkbox |

Until new field IDs and option UUIDs are wired, leads still save (Email, Phone, Brands, Company, Project) and full form values appear in the task **description** and repeat-submission **comments**.

## Step-by-step (ClickUp UI)

### 1. Delete old fields

Leads list → Custom fields → delete the four legacy fields above (if you no longer need historical data on them).

### 2. Create new fields with matching options

**Number of Locations** (drop_down):

- `1–5`
- `6–10`
- `10–50`
- `50+`

**Restaurant type** (drop_down) — match `RESTAURANT_TYPES` in `src/lib/constants/form-fields.ts`:

- Dine In, Fast Casual, Quick Service, Ghost Kitchen, Food Truck, Other

**POS System** (drop_down) — match `POS_SYSTEMS`:

- Toast, Clover, Square, LightSpeed, SpotOn, QuPOS, Aloha, Xenial, PAR, NCR, Oracle, Other

**Services Interested In** (labels, allow multiple):

- Option 1 … Option 6

### 3. Wire new field IDs

Add to Vercel env (Preview + Production) and local `.env.local`:

```bash
CLICKUP_FIELD_LOCATIONS=<new-field-uuid>
CLICKUP_FIELD_RESTAURANT_TYPE=<new-field-uuid>
CLICKUP_FIELD_POS_SYSTEM=<new-field-uuid>
CLICKUP_FIELD_SERVICE_INTERESTS=<new-field-uuid>
```

Alternatively, paste the UUIDs directly into `src/lib/clickup/constants.ts` instead of using env vars.

### 4. Wire option UUIDs

Copy each dropdown/label option UUID into `src/lib/clickup/field-options.ts`:

```ts
// Number of Locations
"1-5": "<option-uuid>",
"6-10": "<option-uuid>",
"10-50": "<option-uuid>",
"50-plus": "<option-uuid>",

// Restaurant type — keys are form values (dine_in, fast_casual, …)
dine_in: "<option-uuid>",

// POS — keys are form values (toast, clover, …)
toast: "<option-uuid>",

// Services — keys are option_1 … option_6
option_1: "<option-uuid>",
```

### 5. Get UUIDs from ClickUp

- **UI:** Leads → Custom fields → edit field → each option shows a UUID  
- **API / MCP:** `clickup_get_custom_fields` on list `901328239583`  
- Send the four new field IDs + option UUIDs to be wired in a follow-up, or paste them yourself using the files above

## Verify a submission

1. Submit on Preview (`/` `#contact-section` or `/contact`)  
2. Leads list → new or enriched task  
3. Confirm custom fields populate; description always has full backup copy

## Code entry points

| File | Role |
| --- | --- |
| `src/lib/constants/form-fields.ts` | Form option labels/values |
| `src/lib/clickup/constants.ts` | Stable field IDs + env-based new field IDs |
| `src/lib/clickup/field-options.ts` | Dropdown/label option UUIDs |
| `src/lib/clickup/create-contact-lead.ts` | Upsert logic (skips unconfigured fields) |
| `src/app/api/contact/route.ts` | POST handler |
