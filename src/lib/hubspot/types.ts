export const RESTAURANT_TYPES = {
  dine_in: "Dine-in",
  fast_casual: "Fast Casual",
  quick_service: "Quick Service",
  ghost_kitchen: "Ghost Kitchen",
  food_truck: "Food Truck",
  other: "Other",
} as const;

export type RestaurantType = typeof RESTAURANT_TYPES[keyof typeof RESTAURANT_TYPES];

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

export type POSSystem = typeof POS_SYSTEMS[keyof typeof POS_SYSTEMS];
export type DeliveryPartner = typeof DELIVERY_PARTNERS[keyof typeof DELIVERY_PARTNERS]; 