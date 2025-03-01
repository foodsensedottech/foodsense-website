type Organization = {
  "@type": "Organization";
  "@context": "https://schema.org";
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    email: string;
  };
};

type WebSite = {
  "@type": "WebSite";
  "@context": "https://schema.org";
  name: string;
  url: string;
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
};

type Service = {
  "@type": "Service";
  "@context": "https://schema.org";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  url: string;
};

export function generateOrganizationSchema(): Organization {
  return {
    "@type": "Organization",
    "@context": "https://schema.org",
    name: "FoodSense",
    url: "https://foodsense.tech",
    logo: "https://foodsense.tech/images/logo.png",
    sameAs: [
      "https://linkedin.com/company/foodsense",
      "https://twitter.com/foodsense",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-8900",
      contactType: "customer service",
      email: "contact@foodsense.tech",
    },
  };
}

export function generateWebsiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@context": "https://schema.org",
    name: "FoodSense",
    url: "https://foodsense.tech",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://foodsense.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
}): Service {
  return {
    "@type": "Service",
    "@context": "https://schema.org",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "FoodSense",
    },
    url: `https://foodsense.tech/services/${service.slug}`,
  };
} 