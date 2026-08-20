import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/ui-showcase"],
      },
    ],
    sitemap: "https://www.foodsense.tech/sitemap.xml",
    host: "https://www.foodsense.tech",
  };
}
