import type { ContactFormData } from "@/lib/validation/contact-schema";
import type {
  HubSpotCompanyProperties as CompanyProperties,
  HubSpotContactProperties as ContactProperties,
} from "./types";
import { SERVICES } from "@/lib/constants/form-fields";

/**
 * Splits a full name into first and last name
 */
export function transformName(fullName: string) {
  const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
}

/**
 * Transforms form data into HubSpot company properties
 */
export function transformCompanyProperties(
  data: ContactFormData
): CompanyProperties {
  // Single focused log for debugging the transformation
  console.log("🔍 Form Data Transform:", {
    deliveryPartners: data.deliveryPartners,
    serviceInterests: data.serviceInterests,
  });

  // Map service IDs to their full names
  const serviceNames = data.serviceInterests.map((id) => {
    const service = SERVICES.find((s) => s.id === id);
    return service ? service.name : id;
  });

  const transformedData = {
    name: data.restaurant,
    number_of_locations: data.numberOfLocations.toString(),
    average_monthly_orders: data.monthlyOrders?.toString() || "0",
    restaurant_type: data.restaurantType,
    pos_system: data.posSystem || "",
    delivery_partners: Array.isArray(data.deliveryPartners)
      ? data.deliveryPartners.join(";")
      : "",
    interested_services: serviceNames.join(";"),
  };

  // Add debug log
  console.log("Transform output:", {
    delivery_partners: transformedData.delivery_partners,
    interested_services: transformedData.interested_services,
  });

  return transformedData;
}

/**
 * Transforms form data into HubSpot contact properties
 */
export function transformContactProperties(
  data: ContactFormData
): ContactProperties {
  // Log name transformation
  const { firstName, lastName } = transformName(data.name);
  console.log("Name transformation:", {
    original: data.name,
    firstName,
    lastName,
  });

  const contactProperties: ContactProperties = {
    firstname: firstName,
    lastname: lastName,
    email: data.email,
    phone: data.phone,
    company: data.restaurant,
    notes: data.notes,
  };

  // Log transformed contact data
  console.log("Transformed contact data for HubSpot:", contactProperties);

  return contactProperties;
}

// Type for transformed company properties
export interface HubSpotCompanyProperties {
  name: string;
  number_of_locations: string;
  average_monthly_orders: string;
  restaurant_type: string;
  pos_system: string;
  delivery_partners: string;
  interested_services: string;
}

// Type for transformed contact properties
export interface HubSpotContactProperties {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
}
