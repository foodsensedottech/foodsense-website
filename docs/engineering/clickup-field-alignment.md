# ClickUp field alignment — website contact form

The website uses **one contact form** on `/` (homepage) and `/contact`. Submissions upsert to **Leads** list `901328239583` via `src/lib/clickup/create-contact-lead.ts`.

Code maps form values in `src/lib/clickup/field-options.ts`. When ClickUp dropdown option UUIDs are configured there, the API sends option IDs; otherwise it falls back to label text (short_text fields) or numeric midpoints (Number of Locations while still type **number**).

## Form → ClickUp mapping (today)

| Form field | ClickUp custom field | Field ID | ClickUp type today | Form control |
| --- | --- | --- | --- | --- |
| Email | Email | `b950a0d8-08de-41ad-beb1-f4c5197cbba3` | email | text |
| Phone | Phone | `8efc4847-ebc0-4d9c-a1b9-7fbfe387399f` | phone | int'l phone |
| Restaurant Brand(s) | Brands Represented | `ca2b5438-e0f7-4965-86e7-805f9c066be5` | short_text | comma-separated |
| Primary brand (derived) | Company / group | `2117e392-e716-4fa3-95b4-9b6c4c1ef77a` | short_text | first brand from list |
| Number of Locations | Number of Locations | `c0844048-4fc4-4b56-9c3f-e660627c8fd0` | **number** ⚠️ | dropdown |
| Restaurant Type | Restaurant type | `1fd7a4e1-a561-4bc3-b4ea-fb264154ac0c` | short_text ⚠️ | dropdown |
| POS System | POS System | `fd69d7a3-158f-4baa-8e2e-b5930e7933f6` | short_text ⚠️ | dropdown |
| Services Interested In | What’s breaking | `3c093ec2-8abf-4f6f-8ed6-b7a749d28d41` | text ⚠️ | multi checkbox |
| (auto) | Project | `b8734eca-e728-415d-9e9a-096baf15e4d1` | dropdown | always **Website** `f52ad055-0eee-4d74-a389-6d15e4aa3ee8` |

⚠️ = should be updated in ClickUp to match form controls (see below).

## Required ClickUp changes (manual — ClickUp UI)

### 1. Number of Locations → dropdown

**Current:** number  
**Target:** dropdown with exactly:

- `1–5`
- `6–10`
- `10–50`
- `50+`

After creating options, copy each option UUID into `CLICKUP_LOCATION_BAND_OPTIONS` in `src/lib/clickup/field-options.ts`:

```ts
"1-5": "<option-uuid>",
"6-10": "<option-uuid>",
"10-50": "<option-uuid>",
"50-plus": "<option-uuid>",
```

Until then, code sends numeric midpoints (3, 8, 30, 75) to the number field.

### 2. Restaurant type → dropdown

**Target options** (match `RESTAURANT_TYPES` in `src/lib/constants/form-fields.ts`):

- Dine In
- Fast Casual
- Quick Service
- Ghost Kitchen
- Food Truck
- Other

Paste option UUIDs into `CLICKUP_RESTAURANT_TYPE_OPTIONS`.

### 3. POS System → dropdown

**Target options** (match `POS_SYSTEMS` in form-fields):

- Toast, Clover, Square, LightSpeed, SpotOn, QuPOS, Aloha, Xenial, PAR, NCR, Oracle, Other

Paste option UUIDs into `CLICKUP_POS_SYSTEM_OPTIONS`.

### 4. Services interested → labels or multi-select

**Target options** (placeholder copy on site today):

- Option 1 … Option 6

Recommended ClickUp type: **labels** (multi) or **drop_down** if single-select later.

Today values are stored in **What’s breaking** (text) as comma-separated labels until a dedicated field exists. When you add a proper field, wire its ID in `constants.ts` and map in `create-contact-lead.ts`.

Paste label/dropdown option UUIDs into `CLICKUP_SERVICE_INTEREST_OPTIONS`.

## How to get option UUIDs

1. ClickUp → Space **Foodsense CRM** → List **Leads** → Custom fields  
2. Edit the dropdown/labels field → each option has a UUID (or use ClickUp API / MCP `clickup_get_custom_fields` on list `901328239583`)  
3. Update `field-options.ts` and deploy

## Verify a submission

1. Submit the form on Preview (homepage `#contact-section` or `/contact`)  
2. Leads list → new or enriched task  
3. Confirm: Email, Phone, Brands, Company, location band, type, POS, services, **Project = Website**

## Code entry points

| File | Role |
| --- | --- |
| `src/lib/constants/form-fields.ts` | Form option labels/values |
| `src/lib/validation/contact-schema.ts` | Zod validation |
| `src/lib/clickup/field-options.ts` | ClickUp option UUIDs + fallbacks |
| `src/lib/clickup/create-contact-lead.ts` | Upsert logic |
| `src/app/api/contact/route.ts` | POST handler |
