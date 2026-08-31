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
  isClickUpFieldConfigured,
} from "@/lib/clickup/constants";
import {
  CLICKUP_LOCATION_BAND_OPTIONS,
  CLICKUP_POS_SYSTEM_OPTIONS,
  CLICKUP_RESTAURANT_TYPE_OPTIONS,
  primaryBrand,
  resolveOptionId,
  resolveServiceInterestOptionIds,
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

function maybeField(
  fieldId: string,
  value: ClickUpCustomField["value"]
): ClickUpCustomField | null {
  if (!isClickUpFieldConfigured(fieldId)) {
    return null;
  }
  if (value === null || value === undefined) {
    return null;
  }
  if (Array.isArray(value) && value.length === 0) {
    return null;
  }
  return { id: fieldId, value };
}

function contactDescription(data: ContactFormData): string {
  return [
    "Lead source: website-contact-form",
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Location band: ${labelFor(LOCATION_BANDS, data.locationBand)}`,
    `Restaurant type: ${labelFor(RESTAURANT_TYPES, data.restaurantType)}`,
    `POS: ${labelFor(POS_SYSTEMS, data.posSystem)}`,
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

  const locationOptionId = resolveOptionId(
    CLICKUP_LOCATION_BAND_OPTIONS[data.locationBand],
    "Number of Locations",
    data.locationBand
  );

  const restaurantTypeOptionId = resolveOptionId(
    CLICKUP_RESTAURANT_TYPE_OPTIONS[data.restaurantType],
    "Restaurant type",
    data.restaurantType
  );

  const posOptionId = resolveOptionId(
    CLICKUP_POS_SYSTEM_OPTIONS[data.posSystem],
    "POS System",
    data.posSystem
  );

  const serviceOptionIds = resolveServiceInterestOptionIds(
    data.serviceInterests
  );

  const candidates: Array<ClickUpCustomField | null> = [
    { id: CLICKUP_FIELDS.email, value: data.email },
    includePhone
      ? { id: CLICKUP_FIELDS.phone, value: toClickUpPhone(data.phone) }
      : null,
    { id: CLICKUP_FIELDS.company, value: brandLabel },
    { id: CLICKUP_FIELDS.brands, value: data.restaurantBrands },
    maybeField(CLICKUP_FIELDS.locations, locationOptionId),
    maybeField(CLICKUP_FIELDS.restaurantType, restaurantTypeOptionId),
    maybeField(CLICKUP_FIELDS.posSystem, posOptionId),
    maybeField(CLICKUP_FIELDS.serviceInterests, serviceOptionIds),
    { id: CLICKUP_FIELDS.project, value: CLICKUP_PROJECT_WEBSITE },
  ];

  return candidates.filter((field): field is ClickUpCustomField => field !== null);
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
