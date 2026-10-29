import type { MetadataRoute } from "next";
import { navigation, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = navigation.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
  return [...pages, { url: `${siteConfig.url}/credits`, changeFrequency: "yearly", priority: 0.2 }];
}
