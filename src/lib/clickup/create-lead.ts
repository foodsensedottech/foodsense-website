import type { ContactFormData } from "@/lib/validation/contact-schema";

const CLICKUP_API = "https://api.clickup.com/api/v2";

/** Foodsense CRM → Leads. Not a secret. */
export const CLICKUP_LEADS_LIST_ID = "901328239583";

const FIELDS = {
  email: "b950a0d8-08de-41ad-beb1-f4c5197cbba3",
  phone: "8efc4847-ebc0-4d9c-a1b9-7fbfe387399f",
  company: "2117e392-e716-4fa3-95b4-9b6c4c1ef77a",
  brands: "ca2b5438-e0f7-4965-86e7-805f9c066be5",
  locations: "c0844048-4fc4-4b56-9c3f-e660627c8fd0",
  restaurantType: "1fd7a4e1-a561-4bc3-b4ea-fb264154ac0c",
  posSystem: "fd69d7a3-158f-4baa-8e2e-b5930e7933f6",
  whatsBreaking: "3c093ec2-8abf-4f6f-8ed6-b7a749d28d41",
  growthPipeline: "777f440f-fe21-41ac-98d4-afa3760b8b87",
  source: "f429cf6f-58b1-4cb3-8eb8-e30b80711711",
} as const;

const SOURCE_WEBSITE_FORM = "1d653031-ddb9-454d-a51d-63b6c04e28e0";

export async function createClickUpLead(data: ContactFormData): Promise<string | null> {
  const token = process.env.CLICKUP_API_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID || CLICKUP_LEADS_LIST_ID;
  if (!token) return null;

  const custom_fields: { id: string; value: string | number }[] = [
    { id: FIELDS.email, value: data.email },
    { id: FIELDS.phone, value: data.phone },
    { id: FIELDS.company, value: data.companyGroupName },
    { id: FIELDS.brands, value: data.brandsRepresented },
    { id: FIELDS.locations, value: data.numberOfLocations },
    { id: FIELDS.restaurantType, value: data.restaurantType },
    { id: FIELDS.posSystem, value: data.posSystem },
    { id: FIELDS.whatsBreaking, value: data.whatsBreaking },
    { id: FIELDS.source, value: SOURCE_WEBSITE_FORM },
  ];

  if (data.growthPipeline) {
    custom_fields.push({
      id: FIELDS.growthPipeline,
      value: data.growthPipeline,
    });
  }

  const response = await fetch(`${CLICKUP_API}/list/${listId}/task`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `Lead: ${data.name} — ${data.companyGroupName}`,
      status: "new",
      markdown_description: data.whatsBreaking,
      custom_fields,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ClickUp task failed: ${response.status} ${body}`);
  }

  const json = (await response.json()) as { id?: string };
  return json.id ?? "created";
}
