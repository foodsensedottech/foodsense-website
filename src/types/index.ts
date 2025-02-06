// Common interfaces and types for the application

// Example type for navigation items
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

// Example type for service items
export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

// Example type for testimonial items
export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  companyName?: string;
  metrics?: string;
} 