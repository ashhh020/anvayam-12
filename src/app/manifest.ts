import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Anvayam",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F2",
    theme_color: "#244B3A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
