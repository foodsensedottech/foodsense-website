export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://foodsense.tech",
  name: "FoodSense Inc.",
  description: "Expert restaurant consulting services, POS systems integration, and delivery optimization solutions.",
  url: "https://foodsense.tech",
  telephone: "+1-555-123-4567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Restaurant Row",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33101",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.7617",
    longitude: "-80.1918"
  },
  areaServed: [
    "Miami",
    "Fort Lauderdale",
    "West Palm Beach",
    "Tampa",
    "Orlando",
    "Jacksonville"
  ],
  sameAs: [
    "https://www.linkedin.com/company/foodsense",
    "https://www.instagram.com/foodsense",
    "https://twitter.com/foodsense"
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    opens: "09:00",
    closes: "17:00"
  },
  priceRange: "$$",
  servesCuisine: "Consulting",
  additionalType: [
    "https://schema.org/ConsultingService",
    "https://schema.org/SoftwareApplication"
  ]
});

interface Service {
  name: string;
  description: string;
  category: string;
}

const services: Service[] = [
  {
    name: "Restaurant Consulting",
    description: "Expert consulting services for restaurant operations, management, and growth strategies.",
    category: "Restaurant Management"
  },
  {
    name: "POS Integration",
    description: "Seamless integration of leading POS systems with delivery platforms and management tools.",
    category: "Technology Solutions"
  },
  {
    name: "Delivery Optimization",
    description: "Maximize delivery efficiency and revenue through platform optimization and data analytics.",
    category: "Delivery Services"
  },
  {
    name: "Digital Menu Management",
    description: "AI-powered menu optimization and digital presence management across all platforms.",
    category: "Digital Solutions"
  }
];

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "LocalBusiness",
    name: "FoodSense Inc."
  },
  serviceType: "Restaurant Consulting",
  areaServed: {
    "@type": "State",
    name: "Florida"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Restaurant Solutions",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        category: service.category
      }
    }))
  }
});

export const getProductSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FoodSense Restaurant Management Platform",
  description: "All-in-one restaurant management and optimization platform",
  brand: {
    "@type": "Brand",
    name: "FoodSense"
  },
  category: "Restaurant Management Software",
  applicationCategory: "Business Software",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "FoodSense Inc."
    }
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127"
  }
});

export const getAllSchemas = () => [
  getLocalBusinessSchema(),
  getServiceSchema(),
  getProductSchema()
]; 