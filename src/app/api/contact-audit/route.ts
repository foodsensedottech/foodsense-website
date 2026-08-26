import { NextResponse } from "next/server";
import {
  createOrUpdateCompany,
  createContactWithCompany,
} from "@/lib/hubspot/client";
import {
  PRIMARY_CHALLENGES,
  strategyAuditSchema,
} from "@/lib/validation/strategy-audit-schema";
import { transformName } from "@/lib/hubspot/transforms";

export async function POST(req: Request) {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "HubSpot integration is not properly configured" },
        { status: 500 }
      );
    }

    const json = await req.json();
    const parsed = strategyAuditSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const challengeLabel =
      PRIMARY_CHALLENGES.find((c) => c.value === data.primaryChallenge)
        ?.label || data.primaryChallenge;
    const { firstName, lastName } = transformName(data.name);
    const notes = [
      "Lead source: strategy-audit",
      `Primary challenge: ${challengeLabel}`,
      data.notes ? `Notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const companyId = await createOrUpdateCompany({
      name: data.restaurant,
      number_of_locations: "1",
      average_monthly_orders: "0",
      restaurant_type: "quick_service",
      pos_system: "other",
      delivery_partners: "",
      service_interests: challengeLabel,
      notes,
    });

    const contactId = await createContactWithCompany(
      {
        firstname: firstName,
        lastname: lastName || "Lead",
        email: data.email,
        phone: "",
        company: data.restaurant,
        notes,
      },
      companyId
    );

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      contactId,
      companyId,
    });
  } catch (error) {
    console.error("Strategy audit form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
