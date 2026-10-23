import type { MetadataRoute } from "next";
import { products, services } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/products", 0.9, "weekly"),
    ...products.filter((p) => !p.externalUrl).map((p) => page(`/products/${p.slug}`, 0.9)),
    page("/services", 0.7),
    ...services.map((s) => page(`/services/${s.slug}`, 0.7)),
    page("/guides", 0.7, "weekly"),
    ...guides.map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    page("/pricing", 0.6),
    page("/about", 0.5),
    page("/contact", 0.6),
  ];
}
