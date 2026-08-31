import type { ContactFormData } from "@/lib/validation/contact-schema";
import type {
  HubSpotCompanyProperties as CompanyProperties,
  HubSpotContactProperties as ContactProperties,
} from "./types";
import {
  LOCATION_BANDS,
  SERVICE_INTERESTS,
} from "@/lib/constants/form-fields";
import { primaryBrand } from "@/lib/clickup/field-options";

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
  const serviceLabels = data.serviceInterests.map((value) => {
    const service = SERVICE_INTERESTS.find((s) => s.value === value);
    return service ? service.label : value;
  });

  const bandLabel =
    LOCATION_BANDS.find((b) => b.value === data.locationBand)?.label ??
    data.locationBand;

  return {
    name: primaryBrand(data.restaurantBrands),
    number_of_locations: bandLabel,
    average_monthly_orders: "",
    restaurant_type: data.restaurantType,
    pos_system: data.posSystem || "",
    delivery_partners: "",
    service_interests: serviceLabels.join(";"),
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
    company: primaryBrand(data.restaurantBrands),
    notes: data.notes,
  };
}
