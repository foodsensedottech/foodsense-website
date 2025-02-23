export const SERVICES = [
  { label: "Menu Optimization", value: "service:menu-optimization" },
  { label: "Order Management", value: "service:order-management" },
  { label: "Delivery Integration", value: "service:delivery-integration" },
  { label: "Analytics & Reporting", value: "service:analytics" },
  { label: "Customer Insights", value: "service:customer-insights" },
] as const;

export type Service = typeof SERVICES[number];
export type ServiceOption = {
  label: string;
  value: string;
};

// Convert const array to mutable array for component props
export const getServiceOptions = (): ServiceOption[] => 
  SERVICES.map(s => ({ ...s }));