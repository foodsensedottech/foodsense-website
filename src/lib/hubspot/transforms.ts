import type { ContactFormSchema } from '@/lib/validation/contact-schema';

/**
 * Splits a full name into first and last name
 */
export function transformName(fullName: string) {
  const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: lastNameParts.join(' ')
  };
}

/**
 * Transforms form data into HubSpot company properties
 */
export function transformCompanyProperties(data: ContactFormSchema) {
  // Single focused log for debugging the transformation
  console.log('🔍 Form Data Transform:', {
    deliveryPartners: data.deliveryPartners,
    serviceInterests: data.serviceInterests
  });

  const transformedData = {
    name: data.restaurant,
    number_of_locations: data.numberOfLocations,
    average_monthly_orders: data.monthlyOrders || '',
    restaurant_type: data.restaurantType.toLowerCase().replace(' ', '_'),
    pos_system: data.posSystem?.toLowerCase(),
    delivery_partners: Array.isArray(data.deliveryPartners) 
      ? data.deliveryPartners
          .map(p => ({
            'Uber Eats': 'ubereats',
            'DoorDash': 'doordash',
            'Grubhub': 'grubhub',
            'Postmates': 'postmates'
          }[p] || 'other'))
          .join(';')
      : '',
    interested_services: Array.isArray(data.serviceInterests)
      ? data.serviceInterests
          .map(service => service.split(':')[1])
          .filter(Boolean)
          .join(';')
      : ''
  };

  // Add debug log
  console.log('Transform output:', {
    delivery_partners: transformedData.delivery_partners,
    interested_services: transformedData.interested_services
  });

  return transformedData;
}

/**
 * Transforms form data into HubSpot contact properties
 */
export function transformContactProperties(data: ContactFormSchema) {
  // Log name transformation
  const { firstName, lastName } = transformName(data.name);
  console.log('Name transformation:', {
    original: data.name,
    firstName,
    lastName
  });

  const contactProperties = {
    firstname: firstName,
    lastname: lastName,
    email: data.email,
    phone: data.phone,
    company: data.restaurant
  };

  if (data.notes) {
    contactProperties['notes'] = data.notes;
  }

  // Log transformed contact data
  console.log('Transformed contact data for HubSpot:', contactProperties);

  return contactProperties;
}

// Type for transformed company properties
export interface HubSpotCompanyProperties {
  name: string;
  number_of_locations: number;
  average_monthly_orders?: string;
  restaurant_type: string;
  pos_system?: string;
  delivery_partners?: string;
  interested_services?: string;
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