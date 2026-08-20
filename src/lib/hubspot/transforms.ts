import type { ContactFormData } from "@/lib/validation/contact-schema";
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
    number_of_locations: data.numberOfLocations.toString(),
    average_monthly_orders: "",
    restaurant_type: data.restaurantType,
    pos_system: data.posSystem,
    delivery_partners: "",
    service_interests: data.whatsBreaking.slice(0, 200),
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
      `Brands: ${data.brandsRepresented}`,
      data.growthPipeline ? `Pipeline: ${data.growthPipeline}` : null,
      data.whatsBreaking,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
