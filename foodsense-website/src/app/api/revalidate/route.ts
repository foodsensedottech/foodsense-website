import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Secret token to validate webhook requests
const CONTENTFUL_REVALIDATION_SECRET =
  process.env.CONTENTFUL_REVALIDATION_SECRET || "your-secret-token";

// GET endpoint for testing revalidation
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  // Validate the secret
  if (secret !== CONTENTFUL_REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Invalid revalidation secret" },
      { status: 401 }
    );
  }

  try {
    // Revalidate the specified path
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

// POST endpoint for Contentful webhook
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Get the secret from the query parameter
    const secret = request.nextUrl.searchParams.get("secret");

    // Validate the secret
    if (secret !== CONTENTFUL_REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    // Extract content type and entry ID from the webhook payload
    const contentType = body?.sys?.contentType?.sys?.id;
    const entryId = body?.sys?.id;

    if (!contentType || !entryId) {
      return NextResponse.json(
        { message: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    console.log(
      `Revalidating content type: ${contentType}, entry ID: ${entryId}`
    );

    // Determine which paths to revalidate based on content type
    const pathsToRevalidate: string[] = [];

    // Always revalidate the homepage
    pathsToRevalidate.push("/");

    // Revalidate specific pages based on content type
    switch (contentType) {
      case "aboutUsCard":
      case "aboutUsTitleSubtitle":
        pathsToRevalidate.push("/about");
        break;
      case "servicesCard":
      case "servicesTitleAndSubtitle":
        pathsToRevalidate.push("/services");
        break;
      case "testimonialCard":
      case "testimonialsTitleAndSubtitle":
        // Testimonials might be on homepage and other pages
        pathsToRevalidate.push("/");
        break;
      case "heroFields":
        // Hero is on the homepage
        pathsToRevalidate.push("/");
        break;
      case "blogPost":
        // Revalidate blog list and specific post
        pathsToRevalidate.push("/blog");
        // If you have dynamic blog routes, you might want to revalidate those too
        // pathsToRevalidate.push(`/blog/${body?.fields?.slug}`);
        break;
      default:
        // For any other content type, revalidate the homepage
        pathsToRevalidate.push("/");
    }

    // Revalidate all the paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated paths: ${pathsToRevalidate.join(", ")}`,
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: (error as Error).message },
      { status: 500 }
    );
  }
}
