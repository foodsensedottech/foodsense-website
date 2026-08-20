import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function secretsMatch(provided: string | null, expected: string): boolean {
  if (!provided) {
    return false;
  }

  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

function getConfiguredSecret(): string | null {
  const secret = process.env.CONTENTFUL_REVALIDATION_SECRET;
  if (!secret) {
    return null;
  }
  return secret;
}

function unauthorized() {
  return NextResponse.json(
    { message: "Invalid revalidation secret" },
    { status: 401 }
  );
}

function pathsForContentType(contentType: string | undefined): string[] {
  const paths = new Set<string>(["/"]);

  switch (contentType) {
    case "siteChrome":
    case "forWhomSection":
    case "forWhomCard":
    case "offeringsSection":
    case "offeringMode":
    case "howWeWorkSection":
    case "howWeWorkStep":
    case "proofSection":
    case "proofBeat":
    case "faqSection":
    case "faqItem":
    case "contactSection":
    case "heroFields":
      paths.add("/");
      paths.add("/contact");
      paths.add("/about");
      paths.add("/services");
      break;
    case "servicePage":
    case "serviceDomain":
      paths.add("/services");
      break;
    case "aboutPage":
    case "aboutDifference":
      paths.add("/about");
      break;
    case "franchiseePainsTitle":
    case "franchiseePainCard":
    case "franchiseeOffersTitle":
    case "franchiseeOfferCard":
      paths.add("/franchisees");
      paths.add("/es/franchisees");
      break;
    case "servicesCard":
    case "servicesTitleAndSubtitle":
    case "serviceOption":
      paths.add("/services");
      break;
    case "blogPost":
    case "blogTitleAndSubtitle":
      paths.add("/blog");
      break;
    default:
      break;
  }

  return Array.from(paths);
}

function isSafePath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");
}

function extractContentType(body: unknown): string | undefined {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  const payload = body as {
    sys?: { contentType?: { sys?: { id?: string } }; type?: string };
    contentType?: { sys?: { id?: string } };
  };

  return payload.sys?.contentType?.sys?.id || payload.contentType?.sys?.id;
}

async function parseJsonBody(request: NextRequest): Promise<unknown> {
  const raw = await request.text();
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const configuredSecret = getConfiguredSecret();
  if (!configuredSecret) {
    console.error("CONTENTFUL_REVALIDATION_SECRET is not set");
    return NextResponse.json(
      { message: "Revalidation is not configured" },
      { status: 500 }
    );
  }

  const secret = request.nextUrl.searchParams.get("secret");
  if (!secretsMatch(secret, configuredSecret)) {
    return unauthorized();
  }

  const path = request.nextUrl.searchParams.get("path") || "/";
  if (!isSafePath(path)) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      message: `Revalidated path: ${path}`,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const configuredSecret = getConfiguredSecret();
  if (!configuredSecret) {
    console.error("CONTENTFUL_REVALIDATION_SECRET is not set");
    return NextResponse.json(
      { message: "Revalidation is not configured" },
      { status: 500 }
    );
  }

  const secret = request.nextUrl.searchParams.get("secret");
  if (!secretsMatch(secret, configuredSecret)) {
    return unauthorized();
  }

  try {
    const body = await parseJsonBody(request);
    const contentType = extractContentType(body);
    const pathsToRevalidate = pathsForContentType(contentType);

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated paths: ${pathsToRevalidate.join(", ")}`,
      contentType: contentType ?? null,
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: (error as Error).message },
      { status: 500 }
    );
  }
}
