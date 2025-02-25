import { createClient, Entry } from "contentful";
import { getEnvVar } from "@/lib/env";
import type {
  AboutContentType,
  AboutCardContentType,
  AboutTitleFields,
  AboutCardFields,
} from "@/lib/contentful/types";
import type { HeroContentType, HeroFields } from "@/lib/contentful/types";
import type {
  ServicesContentType,
  ServiceCardContentType,
} from "@/lib/contentful/types";
import type {
  TestimonialsContentType,
  TestimonialCardContentType,
  TestimonialsTitleEntry,
  TestimonialsCardEntry,
} from "@/lib/contentful/types";
import type {
  BlogContentType,
  BlogPostContentType,
} from "@/lib/contentful/types";
import type { PageContentType } from "@/lib/contentful/types";
import type {
  ServicesTitleFields,
  ServicesCardFields,
  ServicesTitleEntry,
  ServicesCardEntry,
} from "@/lib/contentful/types";
import type { ContactTitleFields } from "@/lib/contentful/types";
import type { ContactSectionContent } from "@/lib/contentful/types";

const client = createClient({
  space:
    process.env.CONTENTFUL_SPACE_ID ||
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  // Disable cache during build
  ...(process.env.NODE_ENV === "production" && {
    // Force fresh data during build
    host: "cdn.contentful.com",
    // Add cache-busting timestamp to ensure fresh data
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    // Add a timestamp parameter to force fresh data
    headers: {
      "X-Contentful-Cache-Control": "no-cache",
    },
  }),
});

// Add a timestamp parameter to all getEntries calls
const originalGetEntries = client.getEntries.bind(client);
client.getEntries = function (query: any) {
  // Add a cache-busting timestamp to the query
  const queryWithTimestamp = {
    ...query,
    "sys.updatedAt[lte]": new Date().toISOString(),
  };
  return originalGetEntries(queryWithTimestamp);
};

const previewClient = createClient({
  space:
    getEnvVar("CONTENTFUL_SPACE_ID") ||
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken:
    getEnvVar("CONTENTFUL_PREVIEW_ACCESS_TOKEN") ||
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export const getClient = (preview: boolean = false) =>
  preview ? previewClient : client;

export default client;

// Define a type for our Contentful entries that doesn't use EntrySkeletonType
type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

export async function getAboutHeading() {
  try {
    const response = await client.getEntries({
      content_type: "aboutUsTitleSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });
    console.log("Contentful Raw Response:", JSON.stringify(response, null, 2));
    console.log("First Item:", JSON.stringify(response.items[0], null, 2));

    // More careful type conversion
    const item = response.items[0];
    if (!item) return null;

    // Create a new object with the expected structure
    return {
      sys: item.sys,
      fields: item.fields as unknown as AboutTitleFields,
      metadata: item.metadata,
    } as ContentfulEntry<AboutTitleFields>;
  } catch (error) {
    console.error("Error fetching about heading:", error);
    return null;
  }
}

export async function getAboutCards() {
  try {
    const response = await client.getEntries({
      content_type: "aboutUsCard",
      order: ["-sys.updatedAt"], // Order by most recently updated
    });
    console.log("About Cards Response:", JSON.stringify(response, null, 2));

    // More careful type conversion
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as unknown as AboutCardFields,
      metadata: item.metadata,
    })) as ContentfulEntry<AboutCardFields>[];
  } catch (error) {
    console.error("Error fetching about cards:", error);
    return null;
  }
}

export async function getHeroContent() {
  try {
    const response = await client.getEntries({
      content_type: "heroFields",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    if (!response.items.length) {
      throw new Error("No hero content found");
    }

    // More careful type conversion
    const item = response.items[0];

    // Create a new object with the expected structure
    return {
      sys: item.sys,
      fields: {
        heroHeading: item.fields.heroHeading,
        heroSubheading: item.fields.heroSubheading,
        backgroundImage: item.fields.backgroundImage,
        seoMetadata: item.fields.seoMetadata,
      } as unknown as HeroFields,
      metadata: item.metadata,
    } as unknown as HeroContentType;
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}

export async function getServicesHeading() {
  try {
    const response = await client.getEntries({
      content_type: "servicesTitleAndSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });
    console.log(
      "Services Heading Response:",
      JSON.stringify(response, null, 2)
    );

    // More careful type conversion
    const item = response.items[0];
    if (!item) return null;

    // Create a new object with the expected structure
    return {
      sys: item.sys,
      fields: item.fields as unknown as ServicesTitleFields,
      metadata: item.metadata,
    } as ServicesTitleEntry;
  } catch (error) {
    console.error("Error fetching services heading:", error);
    return null;
  }
}

export async function getServicesCards() {
  try {
    const response = await client.getEntries({
      content_type: "servicesCard",
      order: ["-sys.updatedAt"], // Order by most recently updated
    });
    console.log("Services Cards Response:", JSON.stringify(response, null, 2));

    // More careful type conversion
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as unknown as ServicesCardFields,
      metadata: item.metadata,
    })) as ServicesCardEntry[];
  } catch (error) {
    console.error("Error fetching services cards:", error);
    return null;
  }
}

export async function getTestimonialsHeading() {
  try {
    const response = await client.getEntries({
      content_type: "testimonialsTitleAndSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    // More careful type conversion
    const item = response.items[0];
    if (!item) return null;

    // Create a new object with the expected structure
    const testimonialHeading = {
      sys: item.sys,
      fields: item.fields as any,
      metadata: item.metadata,
    } as TestimonialsTitleEntry;

    console.log("Testimonial Heading:", testimonialHeading?.fields);

    return testimonialHeading;
  } catch (error) {
    console.error("Error fetching testimonials heading:", error);
    return null;
  }
}

export async function getTestimonialCards() {
  try {
    const response = await client.getEntries({
      content_type: "testimonialCard",
      order: ["-sys.updatedAt"], // Order by most recently updated
    });
    console.log(
      "Testimonial Cards Response:",
      JSON.stringify(response, null, 2)
    );

    // More careful type conversion
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as any,
      metadata: item.metadata,
    })) as TestimonialsCardEntry[];
  } catch (error) {
    console.error("Error fetching testimonial cards:", error);
    return null;
  }
}

export async function getBlogHeading() {
  try {
    const response = await client.getEntries({
      content_type: "blogTitleAndSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    // More careful type conversion
    const item = response.items[0];
    if (!item) return null;

    // Create a new object with the expected structure
    return {
      sys: item.sys,
      fields: item.fields as unknown as BlogContentType,
      metadata: item.metadata,
    } as ContentfulEntry<BlogContentType>;
  } catch (error) {
    console.error("Error fetching blog heading:", error);
    return null;
  }
}

export async function getBlogPosts(limit: number = 2) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      limit,
      order: ["-fields.publishDate", "-sys.updatedAt"], // Sort by newest first, then by update date
    });

    // More careful type conversion
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as unknown as BlogPostContentType,
      metadata: item.metadata,
    })) as ContentfulEntry<BlogPostContentType>[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
}

// Add the service option type
interface ServiceOption {
  id: string;
  title: string;
  description?: string;
}

// Add the getServiceOptions function
export async function getServiceOptions(): Promise<ServiceOption[]> {
  try {
    const response = await client.getEntries({
      content_type: "serviceOption",
      order: ["fields.title", "-sys.updatedAt"] as const, // Order by title, then by update date
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title as string,
      description: item.fields.description as string,
    }));
  } catch (error) {
    console.error("Error fetching service options:", error);
    return [];
  }
}

export async function getHomepageData() {
  try {
    // First, get the about section entry
    const aboutResponse = await client.getEntries({
      content_type: "aboutUsTitleSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    // Then get the about cards
    const aboutCardsResponse = await client.getEntries({
      content_type: "aboutUsCard",
      order: ["-sys.createdAt", "-sys.updatedAt"], // Order by creation date, then by update date
    });

    if (!aboutResponse.items.length) {
      throw new Error("About section content not found");
    }

    return {
      about: aboutResponse.items[0],
      aboutCards: aboutCardsResponse.items,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    throw error;
  }
}

export async function getPageData(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    if (!response.items.length) {
      throw new Error(`Page not found: ${slug}`);
    }

    // More careful type conversion
    const item = response.items[0];

    // Create a new object with the expected structure
    const page = {
      sys: item.sys,
      fields: item.fields as unknown as PageContentType,
      metadata: item.metadata,
    } as ContentfulEntry<PageContentType>;

    if (!page.fields) {
      throw new Error(`Invalid page data for: ${slug}`);
    }

    return page;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
}

export async function getAboutContent() {
  try {
    const heading = await getAboutHeading();
    const cards = await getAboutCards();

    return {
      heading,
      cards,
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return {
      heading: null,
      cards: [],
    };
  }
}

export async function getServicesContent() {
  try {
    const heading = await getServicesHeading();
    const cards = await getServicesCards();

    return {
      heading,
      cards,
    };
  } catch (error) {
    console.error("Error fetching services content:", error);
    return {
      heading: null,
      cards: [],
    };
  }
}

export async function getTestimonialsContent() {
  try {
    const heading = await getTestimonialsHeading();
    const cards = await getTestimonialCards();

    return {
      heading,
      cards,
    };
  } catch (error) {
    console.error("Error fetching testimonials content:", error);
    return {
      heading: null,
      cards: [],
    };
  }
}
