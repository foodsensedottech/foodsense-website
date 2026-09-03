import { NextResponse } from "next/server";

/** Maturity quiz is off the Website 2.0 conversion site. */
export async function POST() {
  return NextResponse.json(
    { error: "Assessment is not offered on this site" },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "Assessment is not offered on this site" },
    { status: 410 }
  );
}
