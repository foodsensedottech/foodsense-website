import { NextResponse } from "next/server";
import { createStrategyAuditLead } from "@/lib/clickup/create-strategy-audit-lead";
import { strategyAuditSchema } from "@/lib/validation/strategy-audit-schema";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = strategyAuditSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    if (!process.env.CLICKUP_API_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Inquiry form is not connected yet. Email fabio@foodsense.tech.",
        },
        { status: 503 }
      );
    }

    try {
      const lead = await createStrategyAuditLead(parsed.data);
      if (!lead) {
        return NextResponse.json(
          {
            error:
              "Inquiry form is not connected yet. Email fabio@foodsense.tech.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully",
        destination: "clickup",
        id: lead.id,
        captured: true,
      });
    } catch (clickUpError) {
      console.error("Strategy audit ClickUp error:", clickUpError);
      return NextResponse.json(
        {
          error:
            "Could not save this inquiry. Please email fabio@foodsense.tech.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Strategy audit form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
