import {
  addTaskComment,
  createLeadTask,
  findLeadByEmail,
  setCustomField,
  type ClickUpTaskSummary,
} from "@/lib/clickup/client";
import {
  CLICKUP_FIELDS,
  CLICKUP_PROJECT_WEBSITE,
} from "@/lib/clickup/constants";
import {
  PRIMARY_CHALLENGES,
  type StrategyAuditFormData,
} from "@/lib/validation/strategy-audit-schema";

function challengeLabel(value: StrategyAuditFormData["primaryChallenge"]) {
  return (
    PRIMARY_CHALLENGES.find((item) => item.value === value)?.label || value
  );
}

function auditDescription(data: StrategyAuditFormData): string {
  const challenge = challengeLabel(data.primaryChallenge);
  return [
    "Lead source: strategy-audit",
    `Primary challenge: ${challenge}`,
    `Restaurant / group: ${data.restaurant}`,
    `Email: ${data.email}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function auditCustomFields(data: StrategyAuditFormData) {
  const challenge = challengeLabel(data.primaryChallenge);
  return [
    { id: CLICKUP_FIELDS.email, value: data.email },
    { id: CLICKUP_FIELDS.company, value: data.restaurant },
    { id: CLICKUP_FIELDS.whatsBreaking, value: challenge },
    { id: CLICKUP_FIELDS.project, value: CLICKUP_PROJECT_WEBSITE },
  ];
}

async function enrichExistingLead(
  task: ClickUpTaskSummary,
  data: StrategyAuditFormData
): Promise<ClickUpTaskSummary> {
  const fields = auditCustomFields(data);
  for (const field of fields) {
    try {
      await setCustomField(task.id, field.id, field.value);
    } catch (error) {
      console.warn(`ClickUp enrich field ${field.id} failed:`, error);
    }
  }

  await addTaskComment(
    task.id,
    [
      "Repeat Strategy Audit submission",
      auditDescription(data),
    ].join("\n\n")
  );

  return task;
}

/**
 * Upsert a Strategy Audit lead into ClickUp Leads.
 * Returns null only when ClickUp is not configured.
 */
export async function createStrategyAuditLead(
  data: StrategyAuditFormData
): Promise<ClickUpTaskSummary | null> {
  if (!process.env.CLICKUP_API_TOKEN) {
    return null;
  }

  const existing = await findLeadByEmail(data.email);
  if (existing) {
    return enrichExistingLead(existing, data);
  }

  return createLeadTask({
    name: `Strategy Audit: ${data.name} — ${data.restaurant}`,
    markdownDescription: auditDescription(data),
    customFields: auditCustomFields(data),
    status: "new",
  });
}
