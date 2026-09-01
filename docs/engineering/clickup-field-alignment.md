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

## Wired fields (Aug 2026)

| Form field | ClickUp field | Field ID | ClickUp type |
| --- | --- | --- | --- |
| Number of Locations | Number of Locations | `f4c1099e-1ad3-49a9-ad48-4ae2a99f8afe` | drop_down |
| Restaurant Type | Restaurant Type | `35c3b88c-51a3-4400-a749-dce2d2f55160` | drop_down |
| POS System | POS System | `6fd69de1-c6ca-4a6a-ab8a-ceeb2b06243b` | drop_down |
| Services Interested In | Services Interested in | `5a0d0fa1-107d-4f41-83de-6c7b127c1fd8` | labels (multi) |

Option UUIDs live in `src/lib/clickup/field-options.ts`. **POS form options mirror ClickUp exactly** (Oracle, NCR, PAR, Toast, Square, In-House (Custom), Other). **Services** maps all checked options to the labels field.

### Additional Notes (optional)

Not a custom field today. When the visitor fills this in, it is appended to the task **description** (main body) as `Notes: …` via `contactDescription()` in `create-contact-lead.ts`. Repeat submissions also include notes in the **comment** thread.

To surface notes in the ClickUp sidebar, create a **text** custom field on Leads and share the field ID to wire in code.

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

**POS System** (drop_down) — match `POS_SYSTEMS` (same as ClickUp):

- Oracle, NCR, PAR, Toast, Square, In-House (Custom), Other

**Services Interested In** (labels, allow multiple):

- POS & core systems
- Kiosk & self-service
- Loyalty & guest engagement
- Delivery & e-commerce
- Data & analytics
- Vendor governance

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

// POS — keys are form values (oracle, ncr, par, toast, …)
oracle: "<option-uuid>",

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
| `src/lib/constants/form-fields.ts` | Form option labels/values (what visitors see) |
| `src/lib/validation/contact-schema.ts` | Imports schemas from `form-fields.ts` |
| `src/lib/clickup/constants.ts` | ClickUp **field** IDs (rarely changes) |
| `src/lib/clickup/field-options.ts` | ClickUp **option** UUIDs (changes when options change) |
| `src/lib/clickup/create-contact-lead.ts` | Maps form values → ClickUp option IDs |
| `src/app/api/contact/route.ts` | POST handler |

---

## Maintaining alignment when options change

Dropdown and label fields stay in sync across **three places**. If any one drifts, leads may still save but a custom field can be empty (values still appear in the task description).

| Layer | Where | What it controls |
| --- | --- | --- |
| 1. ClickUp | Leads → Custom fields | Option **labels** + option **UUIDs** the API needs |
| 2. Website form | `src/lib/constants/form-fields.ts` | Checkbox/dropdown **labels** and internal **values** (e.g. `option_1`, `toast`) |
| 3. API mapping | `src/lib/clickup/field-options.ts` | Maps each form **value** → ClickUp option **UUID** |

**Rule of thumb:** Option **labels** should read the same on the website and in ClickUp. The website uses stable internal `value` keys (snake_case) that you map to ClickUp UUIDs in `field-options.ts`.

### How to get option UUIDs after you edit ClickUp

1. ClickUp → Space **Foodsense CRM** → List **Leads** → **Custom fields** → edit the field → each option has a UUID  
2. Or ask an agent to run `clickup_get_custom_fields` on list `901328239583`  
3. Paste UUIDs into `field-options.ts`

You do **not** need a new field ID when you only rename or add options — the field ID stays the same.

---

### Example A — Rename Services from “Option 1…6” to real service names

**Goal:** Replace placeholders with six Brand OS capabilities.

#### Step 1 — ClickUp (labels field)

1. Leads → Custom fields → **Services Interested in**  
2. **Rename** each label (keep the same option UUID):

   | Current | Rename to |
   | --- | --- |
   | Option 1 | POS & core systems |
   | Option 2 | Kiosk & self-service |
   | Option 3 | Loyalty & guest engagement |
   | Option 4 | Delivery & e-commerce |
   | Option 5 | Data & analytics |
   | Option 6 | Vendor governance |

   - Renaming keeps the same option UUID — form values stay `option_1` … `option_6`, mapping in `field-options.ts` is unchanged  
3. If you **delete** a label and **add** a new one, the new label gets a **new UUID** — update `field-options.ts`

#### Step 2 — Website form (`form-fields.ts`)

Already set to those labels. Keep internal values as `option_1` … `option_6`.

#### Step 3 — ClickUp UUID map (`field-options.ts`)

Only needed if you changed form **values** or added/replaced ClickUp labels (new UUIDs):

```ts
export const CLICKUP_SERVICE_INTEREST_OPTIONS: Record<ServiceInterest, string> = {
  option_1: "<uuid-for-POS>",
  option_2: "<uuid-for-kiosk>",
  // …
};
```

#### Step 4 — Deploy and verify

Submit with two services checked → Leads task shows both labels on **Services Interested in**.

---

### Example B — Add a POS option (e.g. “Clover”)

**Goal:** New choice on the form and in ClickUp.

POS is **ClickUp-first**: the form must mirror ClickUp, not the other way around.

#### Step 1 — ClickUp

1. Leads → Custom fields → **POS System** → add **Clover**  
2. Copy the new option UUID  

#### Step 2 — Website form (`form-fields.ts`)

```ts
{ label: "Clover", value: "clover" },
```

Add `"clover"` to `posSystemSchema` in the same file.

#### Step 3 — UUID map (`field-options.ts`)

```ts
clover: "<new-clover-option-uuid>",
```

#### Step 4 — Deploy and verify

Submit with POS = Clover → task shows Clover on the POS field.

---

### Example C — Remove an option

1. **ClickUp:** Remove the option (old tasks may keep legacy values)  
2. **Form:** Remove from `POS_SYSTEMS` / `SERVICE_INTERESTS` / etc. and from the Zod enum  
3. **Mapping:** Remove the key from `field-options.ts`  

If you remove from ClickUp but leave it on the form, that field value is **skipped** in ClickUp (still in task description).

---

### Quick checklist (any dropdown or labels field)

- [ ] ClickUp option labels match what you want on the website  
- [ ] `form-fields.ts` — labels, values, and Zod enum updated  
- [ ] `field-options.ts` — every form value has a ClickUp option UUID  
- [ ] Preview submission → Leads custom fields populated  

### When you need a new field ID

Only if you **delete and recreate** the custom field (e.g. change type). Then update `CLICKUP_FIELD_*` in Vercel / `constants.ts` and remap all option UUIDs.
