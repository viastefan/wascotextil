"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, products, searchProducts, type CategorySlug, type Product } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductCard";

export function ProductFilter({
  initialCategory,
  products: incoming,
}: {
  initialCategory?: CategorySlug;
  products?: Product[];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [finishing, setFinishing] = useState<"all" | "print" | "stick">("all");
  const [color, setColor] = useState("all");

  const source = incoming ?? (query ? searchProducts(query) : products);
  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    source.forEach((product) => product.colors.forEach((item) => map.set(item.id, item.name)));
    return [...map.entries()];
  }, [source]);

  const filtered = source.filter((product) => {
    if (initialCategory && product.category !== initialCategory) return false;
    if (finishing === "print" && !product.printing) return false;
    if (finishing === "stick" && !product.embroidery) return false;
    if (color !== "all" && !product.colors.some((item) => item.id === color)) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="no-scrollbar flex gap-6 overflow-x-auto text-sm">
          <Link href="/shop" className={!initialCategory ? "text-red" : "text-muted hover:text-ink"}>
            Alle
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className={initialCategory === category.slug ? "text-red" : "text-muted hover:text-ink"}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            aria-label="Veredelung filtern"
            className="h-11 border border-line bg-white px-3 text-sm"
            value={finishing}
            onChange={(event) => setFinishing(event.target.value as typeof finishing)}
          >
            <option value="all">Alle Veredelungen</option>
            <option value="print">Druck möglich</option>
            <option value="stick">Stick möglich</option>
          </select>
          <select
            aria-label="Farbe filtern"
            className="h-11 border border-line bg-white px-3 text-sm"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="all">Alle Farben</option>
            {colorOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {query ? (
        <p className="mb-8 text-sm text-muted">
          Suche nach „{query}“ · {filtered.length} Treffer
        </p>
      ) : null}
      <ProductGrid products={filtered} />
    </div>
  );
}
