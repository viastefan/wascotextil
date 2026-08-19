import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wascotextil.vercel.app";
  const staticRoutes = [
    "",
    "/shop",
    "/warenkorb",
    "/checkout",
    "/individualisierung",
    "/b2b",
    "/kontakt",
    "/ueber-uns",
    "/faq",
    "/leistungen",
    "/impressum",
    "/datenschutz",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${base}/shop/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${base}/shop/${product.category}/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
