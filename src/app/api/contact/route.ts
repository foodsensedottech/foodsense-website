import { NextResponse } from "next/server";
import { createContactLead } from "@/lib/clickup/create-contact-lead";
import { contactFormSchema } from "@/lib/validation/contact-schema";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    let validated;
    try {
      validated = contactFormSchema.parse(data);
    } catch (validationError) {
      console.error("Form validation error:", validationError);
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    console.log("Received contact form data:", {
      name: validated.name,
      email: validated.email,
      restaurantBrands: validated.restaurantBrands,
      locationBand: validated.locationBand,
    });

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
      const lead = await createContactLead(validated);
      if (lead) {
        return NextResponse.json({
          success: true,
          message: "Form submitted successfully",
          destination: "clickup",
          id: lead.id,
          captured: true,
        });
      }
    } catch (clickUpError) {
      console.error("ClickUp error:", clickUpError);
    }

    return NextResponse.json(
      {
        error:
          "Could not save this inquiry. Please email fabio@foodsense.tech.",
      },
      { status: 502 }
    );
  } catch (error) {
    console.error("Contact form submission error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    );
  }
}
