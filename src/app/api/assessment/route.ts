import { NextResponse } from "next/server";
import { scoreAssessment } from "@/lib/franchisees/score";
import { assessmentLeadSchema } from "@/lib/validation/assessment-schema";

/**
 * Scores the franchisee maturity quiz. CRM capture is deferred until
 * `/franchisees` is wired to ClickUp (see docs/website-2.0/decisions.md).
 */
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

    const result = scoreAssessment(parsed.data.answers);

    return NextResponse.json({
      success: true,
      captured: false,
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
