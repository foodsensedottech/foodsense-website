// Consolidated HubSpot Types

export * from "@/lib/hubspot/types";

export const RESTAURANT_TYPES = {
  dine_in: "Dine-in",
  fast_casual: "Fast Casual",
  quick_service: "Quick Service",
  ghost_kitchen: "Ghost Kitchen",
  food_truck: "Food Truck",
  other: "Other",
} as const;

export type RestaurantType =
  (typeof RESTAURANT_TYPES)[keyof typeof RESTAURANT_TYPES];

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  restaurant: string;
  numberOfLocations: number;
  monthlyOrders?: string;
  restaurantType: RestaurantType;
  serviceInterests: string[];
  deliveryPartners?: string[];
  posSystem?: string;
  notes: string;
}

export interface HubspotResponse {
  success: boolean;
  error?: string;
}

export const DELIVERY_PARTNERS = {
  uber_eats: "Uber Eats",
  doordash: "DoorDash",
  grubhub: "Grubhub",
  postmates: "Postmates",
  other: "Other",
} as const;

export const POS_SYSTEMS = {
  toast: "Toast",
  square: "Square",
  clover: "Clover",
  revel: "Revel",
  lightspeed: "Lightspeed",
  aloha: "Aloha",
  other: "Other",
} as const;

export type POSSystem = (typeof POS_SYSTEMS)[keyof typeof POS_SYSTEMS];
export type DeliveryPartner =
  (typeof DELIVERY_PARTNERS)[keyof typeof DELIVERY_PARTNERS];

// Company Properties
export interface HubSpotCompanyProperties {
  name: string;
  number_of_locations: string;
  average_monthly_orders: string;
  restaurant_type: string;
  pos_system?: string;
  delivery_partners?: string;
  service_interests?: string;
  notes?: string;
}

// Fix HubSpotContactProperties
export interface HubSpotContactProperties {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  notes?: string;
}

// Association Types
export interface AssociationTypes {
  contact_to_company: {
    category: "HUBSPOT_DEFINED";
    typeId: 1;
  };
}

// Fix ExtendedHubSpotClient
export interface ExtendedHubSpotClient {
  crm: {
    companies: {
      basicApi: {
        create: (data: {
          properties: HubSpotCompanyProperties;
        }) => Promise<{ id: string }>;
        update: (
          id: string,
          data: { properties: HubSpotCompanyProperties }
        ) => Promise<void>;
        archive: (id: string) => Promise<void>;
        getById: (
          id: string
        ) => Promise<{ id: string; properties: HubSpotCompanyProperties }>;
      };
      searchApi: {
        doSearch: (
          criteria: unknown
        ) => Promise<{ results: Array<{ id: string }> }>;
      };
    };
    contacts: {
      basicApi: {
        create: (data: {
          properties: HubSpotContactProperties;
        }) => Promise<{ id: string }>;
        update: (
          id: string,
          data: { properties: HubSpotContactProperties }
        ) => Promise<void>;
      };
      searchApi: {
        doSearch: (
          criteria: unknown
        ) => Promise<{ results: Array<{ id: string }> }>;
      };
    };
  };
  apiRequest: (params: {
    method: string;
    path: string;
    body?: unknown;
  }) => Promise<unknown>;
}
