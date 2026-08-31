import {
  addTaskComment,
  createLeadTask,
  findLeadByEmail,
  setCustomField,
  type ClickUpCustomField,
  type ClickUpTaskSummary,
} from "@/lib/clickup/client";
import {
  CLICKUP_FIELDS,
  CLICKUP_PROJECT_WEBSITE,
} from "@/lib/clickup/constants";
import {
  CLICKUP_LOCATION_BAND_OPTIONS,
  CLICKUP_POS_SYSTEM_OPTIONS,
  CLICKUP_RESTAURANT_TYPE_OPTIONS,
  CLICKUP_SERVICE_INTEREST_OPTIONS,
  LOCATION_BAND_NUMBER_FALLBACK,
  primaryBrand,
} from "@/lib/clickup/field-options";
import {
  LOCATION_BANDS,
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  SERVICE_INTERESTS,
} from "@/lib/constants/form-fields";
import type { ContactFormData } from "@/lib/validation/contact-schema";
import { toClickUpPhone } from "@/lib/utils/format-phone";

function labelFor<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatMultiLabels<T extends { value: string; label: string }>(
  options: readonly T[],
  values: string[]
): string {
  return values.map((value) => labelFor(options, value)).join(", ");
}

function dropdownOrLabel(
  optionId: string | null | undefined,
  label: string
): string | number {
  return optionId || label;
}

function locationBandValue(data: ContactFormData): string | number {
  const optionId = CLICKUP_LOCATION_BAND_OPTIONS[data.locationBand];
  if (optionId) return optionId;
  return LOCATION_BAND_NUMBER_FALLBACK[data.locationBand];
}

function contactDescription(data: ContactFormData): string {
  return [
    "Lead source: website-contact-form",
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Location band: ${labelFor(LOCATION_BANDS, data.locationBand)}`,
    `Services: ${formatMultiLabels(SERVICE_INTERESTS, data.serviceInterests)}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function contactCustomFields(
  data: ContactFormData,
  includePhone: boolean
): ClickUpCustomField[] {
  const brandLabel = primaryBrand(data.restaurantBrands);
  const fields: ClickUpCustomField[] = [
    { id: CLICKUP_FIELDS.email, value: data.email },
    { id: CLICKUP_FIELDS.company, value: brandLabel },
    { id: CLICKUP_FIELDS.brands, value: data.restaurantBrands },
    { id: CLICKUP_FIELDS.locations, value: locationBandValue(data) },
    {
      id: CLICKUP_FIELDS.restaurantType,
      value: dropdownOrLabel(
        CLICKUP_RESTAURANT_TYPE_OPTIONS[data.restaurantType],
        labelFor(RESTAURANT_TYPES, data.restaurantType)
      ),
    },
    {
      id: CLICKUP_FIELDS.posSystem,
      value: dropdownOrLabel(
        CLICKUP_POS_SYSTEM_OPTIONS[data.posSystem],
        labelFor(POS_SYSTEMS, data.posSystem)
      ),
    },
    {
      id: CLICKUP_FIELDS.whatsBreaking,
      value: formatMultiLabels(SERVICE_INTERESTS, data.serviceInterests),
    },
    { id: CLICKUP_FIELDS.project, value: CLICKUP_PROJECT_WEBSITE },
  ];

  if (includePhone) {
    fields.splice(1, 0, {
      id: CLICKUP_FIELDS.phone,
      value: toClickUpPhone(data.phone),
    });
  }

  return fields;
}

async function enrichExistingLead(
  task: ClickUpTaskSummary,
  data: ContactFormData,
  includePhone: boolean
): Promise<ClickUpTaskSummary> {
  const fields = contactCustomFields(data, includePhone);
  for (const field of fields) {
    try {
      await setCustomField(task.id, field.id, field.value);
    } catch (error) {
      console.warn(`ClickUp enrich field ${field.id} failed:`, error);
    }
  }

  await addTaskComment(
    task.id,
    ["Repeat contact form submission", contactDescription(data)].join("\n\n")
  );

  return task;
}

async function createNewLead(
  data: ContactFormData,
  includePhone: boolean
): Promise<ClickUpTaskSummary> {
  const brandLabel = primaryBrand(data.restaurantBrands);
  return createLeadTask({
    name: `Lead: ${data.name} — ${brandLabel}`,
    markdownDescription: contactDescription(data),
    customFields: contactCustomFields(data, includePhone),
    status: "new",
  });
}

function isPhoneFieldError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("FIELD_016") || message.includes("valid phone");
}

/**
 * Upsert a website contact-form lead into ClickUp Leads.
 * Returns null only when ClickUp is not configured.
 */
export async function createContactLead(
  data: ContactFormData
): Promise<ClickUpTaskSummary | null> {
  if (!process.env.CLICKUP_API_TOKEN) {
    return null;
  }

  const existing = await findLeadByEmail(data.email);
  if (existing) {
    try {
      return await enrichExistingLead(existing, data, true);
    } catch (error) {
      if (!isPhoneFieldError(error)) {
        throw error;
      }
      console.warn(
        "ClickUp rejected phone format on enrich; saving without phone field."
      );
      return enrichExistingLead(existing, data, false);
    }
  }

  try {
    return await createNewLead(data, true);
  } catch (error) {
    if (!isPhoneFieldError(error)) {
      throw error;
    }
    console.warn(
      "ClickUp rejected phone format; saving lead without phone field."
    );
    return createNewLead(data, false);
  }
}
