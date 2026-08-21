import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, getProductsByCategory, getCategory } from "@/lib/catalog";
import { ProductConfigurator } from "@/components/shop/ProductConfigurator";
import { ProductGrid } from "@/components/shop/ProductCard";
import { priceDisclaimer } from "@/lib/company";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return { title: "Produkt" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!product || !cat) notFound();
  const related = getProductsByCategory(category).filter((item) => item.id !== product.id);

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 pb-28 sm:px-8 lg:px-12 lg:pb-16">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
        Shop / {cat.name} / {product.name}
      </p>
      <div className="mt-8">
        <ProductConfigurator product={product} />
      </div>
      <section className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Das Textil</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-muted">{product.details}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Material: {product.materials.join(", ")}</li>
            <li>Veredelung: {[product.printing && "Druck", product.embroidery && "Stick"].filter(Boolean).join(" · ")}</li>
            <li>Herkunft der Daten: Katalogsortiment, keine Live-Lagerbindung</li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl">Preislogik</h2>
          <p className="mt-4 text-[16px] leading-7 text-muted">{priceDisclaimer}</p>
          <p className="mt-4 text-sm text-muted">
            Staffeln greifen ab 10, 25 und 50 Stück. Der Warenkorb speichert deine Konfiguration lokal. Zahlung erfolgt nicht online, sondern nach Auftragsbestätigung.
          </p>
        </div>
      </section>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Weitere {cat.name}</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
