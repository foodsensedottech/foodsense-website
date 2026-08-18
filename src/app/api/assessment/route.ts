import { NextResponse } from "next/server";
import {
  createContactWithCompany,
  createOrUpdateCompany,
} from "@/lib/hubspot/client";
import { locationCountForCrm, scoreAssessment } from "@/lib/franchisees/score";
import { assessmentLeadSchema } from "@/lib/validation/assessment-schema";

function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName: firstName || "Franchisee",
    lastName: rest.join(" ") || "Lead",
  };
}

function buildNotes(input: {
  score: number;
  band: string;
  locale: string;
  answers: Record<string, string>;
}) {
  return [
    "Lead source: franchisee-assessment",
    `Segment: ${input.answers.locations === "1-9" ? "emerging" : "multi-unit-franchisee"}`,
    `Locale: ${input.locale}`,
    `Tech Maturity Score: ${input.score} (${input.band})`,
    `Locations: ${input.answers.locations}`,
    `Region: ${input.answers.region}`,
    `POS: ${input.answers.pos}`,
    `KDS/Kiosk: ${input.answers.kds}`,
    `Delivery: ${input.answers.delivery}`,
    `Payments: ${input.answers.payments}`,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = assessmentLeadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid assessment data" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const result = scoreAssessment(data.answers);
    const { firstName, lastName } = splitName(data.name);
    const notes = buildNotes({
      score: result.score,
      band: result.band,
      locale: data.locale,
      answers: data.answers,
    });

    let captured = false;

    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      try {
        const companyId = await createOrUpdateCompany({
          name: data.company,
          number_of_locations: locationCountForCrm(data.answers.locations).toString(),
          average_monthly_orders: "0",
          restaurant_type: "other",
          pos_system: data.answers.pos,
          delivery_partners: data.answers.delivery,
          interested_services: "Franchisee Tech Maturity Assessment",
        });

        await createContactWithCompany(
          {
            firstname: firstName,
            lastname: lastName,
            email: data.email,
            phone: "",
            company: data.company,
            notes,
          },
          companyId
        );
        captured = true;
      } catch (hubspotError) {
        console.error("Assessment HubSpot error:", hubspotError);
      }
    }

    return NextResponse.json({
      success: true,
      captured,
      score: result.score,
      band: result.band,
      isMultiUnit: result.isMultiUnit,
      breakdown: result.breakdown,
    });
  } catch (error) {
    console.error("Assessment submission error:", error);
    return NextResponse.json(
      { error: "Failed to score assessment" },
      { status: 500 }
    );
  }
}
