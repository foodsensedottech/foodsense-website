import { NextResponse } from "next/server";
import {
  createOrUpdateCompany,
  createContactWithCompany,
} from "@/lib/hubspot/client";
import type { ContactFormData } from "@/lib/validation/contact-schema";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import {
  transformCompanyProperties,
  transformContactProperties,
} from "@/lib/hubspot/transforms";
import { formatPhoneNumber } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    // Check if HubSpot token is configured
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.error("HubSpot access token is not configured");
      return NextResponse.json(
        { error: "HubSpot integration is not properly configured" },
        { status: 500 }
      );
    }

    const data = await req.json();

    // Validate form data
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

    // Log raw form data as soon as we receive it
    console.log("Received form data:", {
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      restaurant: validated.restaurant,
      numberOfLocations: validated.numberOfLocations,
      monthlyOrders: validated.monthlyOrders,
      restaurantType: validated.restaurantType,
      serviceInterests: validated.serviceInterests,
      deliveryPartners: validated.deliveryPartners,
      posSystem: validated.posSystem,
      notes: validated.notes,
    });

    // Transform the validated data for HubSpot
    const companyProperties = transformCompanyProperties(validated);
    const contactProperties = transformContactProperties({
      ...validated,
      phone: formatPhoneNumber(validated.phone),
    });

    console.log("Transformed company properties:", companyProperties);
    console.log("Transformed contact properties:", contactProperties);

    try {
      // Create or update company first
      const companyId = await createOrUpdateCompany(companyProperties);
      console.log("Created/Updated company with ID:", companyId);

      // Create contact and associate with company
      const contactId = await createContactWithCompany(
        contactProperties,
        companyId
      );
      console.log("Created contact with ID:", contactId);

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully",
        contactId,
        companyId,
      });
    } catch (hubspotError) {
      console.error("HubSpot API error:", hubspotError);
      return NextResponse.json(
        { error: "Failed to submit form to HubSpot. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    // Detailed error logging
    console.error("Contact form submission error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      data: error,
    });

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    );
  }
}
