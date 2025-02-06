import { getBlurDataURL } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing image URL" },
      { status: 400 }
    );
  }

  try {
    const blurDataURL = await getBlurDataURL(imageUrl);
    return NextResponse.json({ blurDataURL });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate blur data" },
      { status: 500 }
    );
  }
} 