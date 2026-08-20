import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { createClickUpLead } from "@/lib/clickup/create-lead";
import {
  createOrUpdateCompany,
  createContactWithCompany,
} from "@/lib/hubspot/client";
import {
  transformCompanyProperties,
  transformContactProperties,
} from "@/lib/hubspot/transforms";

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

    console.log("Received form data:", {
      name: validated.name,
      companyGroupName: validated.companyGroupName,
      numberOfLocations: validated.numberOfLocations,
      restaurantType: validated.restaurantType,
      posSystem: validated.posSystem,
    });

    try {
      const clickUpId = await createClickUpLead(validated);
      if (clickUpId) {
        return NextResponse.json({
          success: true,
          message: "Form submitted successfully",
          destination: "clickup",
          id: clickUpId,
        });
      }
    } catch (clickUpError) {
      console.error("ClickUp error:", clickUpError);
    }

    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      try {
        const companyId = await createOrUpdateCompany(
          transformCompanyProperties(validated)
        );
        const contactId = await createContactWithCompany(
          transformContactProperties(validated),
          companyId
        );
        return NextResponse.json({
          success: true,
          message: "Form submitted successfully",
          destination: "hubspot",
          contactId,
          companyId,
        });
      } catch (hubspotError) {
        console.error("HubSpot API error:", hubspotError);
      }
    }

    console.error("No CRM destination configured. Lead payload stored in logs only.");
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      destination: "log",
    });
  } catch (error) {
    console.error("Contact form submission error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    );
  }
}
