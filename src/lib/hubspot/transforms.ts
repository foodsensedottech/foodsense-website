import type { ContactFormData } from "@/lib/validation/contact-schema";
import {
  formattedPosSystems,
  formattedRestaurantType,
  formattedWhatsBreaking,
} from "@/lib/validation/contact-schema";
import type {
  HubSpotCompanyProperties as CompanyProperties,
  HubSpotContactProperties as ContactProperties,
} from "./types";

export function transformName(fullName: string) {
  const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
}

export function transformCompanyProperties(
  data: ContactFormData
): CompanyProperties {
  return {
    name: data.companyGroupName,
    number_of_locations: data.numberOfLocations?.toString() ?? "",
    average_monthly_orders: "",
    restaurant_type: formattedRestaurantType(data) ?? "",
    pos_system: formattedPosSystems(data) ?? "",
    delivery_partners: "",
    service_interests: (formattedWhatsBreaking(data) ?? "").slice(0, 200),
  };
}

export function transformContactProperties(
  data: ContactFormData
): ContactProperties {
  const { firstName, lastName } = transformName(data.name);
  return {
    firstname: firstName,
    lastname: lastName,
    email: data.email,
    phone: data.phone,
    company: data.companyGroupName,
    notes: [
      data.brandsRepresented ? `Brands: ${data.brandsRepresented}` : null,
      data.growthPipeline ? `Pipeline: ${data.growthPipeline}` : null,
      formattedWhatsBreaking(data),
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
