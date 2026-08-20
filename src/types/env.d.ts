declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      CONTENTFUL_PREVIEW_TOKEN?: string;
      CONTENTFUL_PREVIEW_ACCESS_TOKEN?: string;
      CONTENTFUL_MANAGEMENT_TOKEN?: string;
      CONTENTFUL_REVALIDATION_SECRET?: string;
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_SITE_NAME?: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
