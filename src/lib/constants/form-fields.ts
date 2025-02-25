import { z } from "zod";

// These match exactly with HubSpot's internal names and values
export const DELIVERY_PARTNERS = [
  { label: "UberEats", value: "ubereats" },
  { label: "DoorDash", value: "doordash" },
  { label: "GrubHub", value: "grubhub" },
  { label: "Postmates", value: "postmates" },
  { label: "Other", value: "other" }
] as const;

export const POS_SYSTEMS = [
  { label: "Toast", value: "toast" },
  { label: "Clover", value: "clover" },
  { label: "Square", value: "square" },
  { label: "LightSpeed", value: "lightspeed" },
  { label: "SpotOn", value: "spoton" },
  { label: "QuPOS", value: "qupos" },
  { label: "Aloha", value: "aloha" },
  { label: "Xenial", value: "xenial" },
  { label: "PAR", value: "par" },
  { label: "NCR", value: "ncr" },
  { label: "Oracle", value: "oracle" },
  { label: "Other", value: "other" }
] as const;

export const RESTAURANT_TYPES = [
  { label: "Dine In", value: "dine_in" },
  { label: "Fast Casual", value: "fast_casual" },
  { label: "Quick Service", value: "quick_service" },
  { label: "Ghost Kitchen", value: "ghost_kitchen" },
  { label: "Food Truck", value: "food_truck" },
  { label: "Other", value: "other" }
] as const;

export const SERVICES = [
  {
    id: "new-restaurant",
    name: "New Restaurant Opening/Restaurant Upgrades"
  },
  {
    id: "increase-sales",
    name: "Increase Sales and Profits on 3rd Party Delivery"
  },
  {
    id: "market-analysis",
    name: "Market and Competitor Pricing Analysis"
  },
  {
    id: "customer-loyalty",
    name: "Customer Loyalty and Reputation Management"
  },
  {
    id: "profitability",
    name: "Profitability Analysis"
  }
] as const;

// Type helpers for our form
export type DeliveryPartner = typeof DELIVERY_PARTNERS[number]["value"];
export type PosSystem = typeof POS_SYSTEMS[number]["value"];
export type RestaurantType = typeof RESTAURANT_TYPES[number]["value"];

// Create Zod schemas from our constants
export const deliveryPartnersSchema = z.array(z.enum([
  "ubereats", "doordash", "grubhub", "postmates", "other"
]));

export const posSystemSchema = z.enum([
  "toast", "clover", "square", "lightspeed", "spoton",
  "qupos", "aloha", "xenial", "par", "ncr", "oracle", "other"
]);

export const restaurantTypeSchema = z.enum([
  "dine_in", "fast_casual", "quick_service",
  "ghost_kitchen", "food_truck", "other"
]);

// Add type and schema for services
export type ServiceType = typeof SERVICES[number]["id"];

export const servicesSchema = z.array(z.enum([
  "new-restaurant",
  "increase-sales", 
  "market-analysis",
  "customer-loyalty",
  "profitability"
])); 