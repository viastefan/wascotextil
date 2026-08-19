import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { categories, getCategory, getProductsByCategory, type CategorySlug } from "@/lib/catalog";
import { ProductFilter } from "@/components/shop/ProductFilter";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Kategorie" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Shop / {category.name}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">{category.name}</h1>
      <p className="mt-2 text-sm uppercase tracking-[0.16em] text-red">{category.tagline}</p>
      <p className="mt-5 max-w-2xl text-[16px] leading-7 text-muted">{category.description}</p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-muted">Filter werden geladen…</p>}>
          <ProductFilter initialCategory={slug as CategorySlug} products={items} />
        </Suspense>
      </div>
    </div>
  );
}
