import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SERVICES } from "@/lib/services";

const SITE_URL = "https://www.online-agency.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/seo-geo`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/standorte`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Eine Übersichtsseite pro Stadt (/standorte/balingen, ...)
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${SITE_URL}/standorte/${location.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Eine Seite pro Stadt×Service-Kombination (/standorte/balingen/seo, ...)
  const locationServicePages: MetadataRoute.Sitemap = LOCATIONS.flatMap(
    (location) =>
      SERVICES.map((service) => ({
        url: `${SITE_URL}/standorte/${location.slug}/${service.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      }))
  );

  return [...staticPages, ...locationPages, ...locationServicePages];
}
