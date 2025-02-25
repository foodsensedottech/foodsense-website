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
import { parsePhoneNumber } from "@/lib/utils/format-phone";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = contactFormSchema.parse(data);

    // Log raw form data as soon as we receive it
    console.log("Received form data:", {
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      restaurant: validated.restaurant,
      numberOfLocations: validated.numberOfLocations,
      monthlyOrders: validated.monthlyOrders,
      restaurantType: validated.restaurantType,
      serviceInterests: validated.serviceInterests, // Should show ID:Title pairs
      deliveryPartners: validated.deliveryPartners,
      posSystem: validated.posSystem,
      notes: validated.notes,
    });

    // Transform the validated data for HubSpot
    const companyProperties = transformCompanyProperties(validated);
    const contactProperties = transformContactProperties({
      ...validated,
      phone: parsePhoneNumber(validated.phone), // Parse phone number here for HubSpot
    });

    console.log("Transformed company properties:", companyProperties);
    console.log("Transformed contact properties:", contactProperties);

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
      contactId,
      companyId,
    });
  } catch (error) {
    // Detailed error logging
    console.error("Contact form submission error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      data: error,
    });

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
