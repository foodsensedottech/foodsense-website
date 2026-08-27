import {
  CLICKUP_API_BASE,
  CLICKUP_FIELDS,
  CLICKUP_LEADS_LIST_ID,
} from "@/lib/clickup/constants";

export type ClickUpCustomField = {
  id: string;
  value: string | number | boolean | null;
};

export type ClickUpTaskSummary = {
  id: string;
  name: string;
  url?: string;
};

function getToken(): string | null {
  return process.env.CLICKUP_API_TOKEN || null;
}

export function getLeadsListId(): string {
  return process.env.CLICKUP_LIST_ID || CLICKUP_LEADS_LIST_ID;
}

async function clickUpFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  if (!token) {
    throw new Error("CLICKUP_API_TOKEN is not configured");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", token);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${CLICKUP_API_BASE}${path}`, {
    ...init,
    headers,
  });
}

/**
 * Look up an existing lead by email. On any failure return null so callers
 * create a new task instead of dropping the lead.
 */
export async function findLeadByEmail(
  email: string
): Promise<ClickUpTaskSummary | null> {
  try {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return null;

    const listId = getLeadsListId();
    const customFields = JSON.stringify([
      {
        field_id: CLICKUP_FIELDS.email,
        operator: "=",
        value: normalized,
      },
    ]);
    const query = new URLSearchParams({
      include_closed: "true",
      custom_fields: customFields,
    });

    const response = await clickUpFetch(`/list/${listId}/task?${query}`);
    if (!response.ok) {
      console.warn(
        "ClickUp findLeadByEmail failed:",
        response.status,
        await response.text()
      );
      return null;
    }

    const json = (await response.json()) as {
      tasks?: Array<{ id: string; name: string; url?: string }>;
    };
    const task = json.tasks?.[0];
    if (!task?.id) return null;
    return { id: task.id, name: task.name, url: task.url };
  } catch (error) {
    console.warn("ClickUp findLeadByEmail error:", error);
    return null;
  }
}

export async function createLeadTask(input: {
  name: string;
  markdownDescription: string;
  customFields: ClickUpCustomField[];
  status?: string;
}): Promise<ClickUpTaskSummary> {
  const listId = getLeadsListId();
  const response = await clickUpFetch(`/list/${listId}/task`, {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      status: input.status || "new",
      markdown_description: input.markdownDescription,
      custom_fields: input.customFields,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ClickUp create task failed: ${response.status} ${body}`);
  }

  const json = (await response.json()) as {
    id?: string;
    name?: string;
    url?: string;
  };
  if (!json.id) {
    throw new Error("ClickUp create task returned no id");
  }
  return { id: json.id, name: json.name || input.name, url: json.url };
}

export async function setCustomField(
  taskId: string,
  fieldId: string,
  value: string | number | boolean | null
): Promise<void> {
  const response = await clickUpFetch(`/task/${taskId}/field/${fieldId}`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `ClickUp set field ${fieldId} failed: ${response.status} ${body}`
    );
  }
}

export async function addTaskComment(
  taskId: string,
  commentText: string
): Promise<void> {
  const response = await clickUpFetch(`/task/${taskId}/comment`, {
    method: "POST",
    body: JSON.stringify({
      comment_text: commentText,
      notify_all: false,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ClickUp comment failed: ${response.status} ${body}`);
  }
}
