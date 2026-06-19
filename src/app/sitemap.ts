import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Long-tail landing pages rank for their own audience and carry higher
  // priority than the legal/about pages.
  const landing = ["/freelancer-invoice", "/contractor-invoice"];
  const routes = ["", ...landing, "/about", "/privacy", "/terms"];
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : landing.includes(path) ? 0.8 : 0.6,
  }));
}
