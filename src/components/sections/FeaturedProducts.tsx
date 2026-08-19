import { getFeaturedProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductCard";
import Link from "next/link";

export function FeaturedProducts() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Einstieg</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">Häufig gewählt</h2>
          </div>
          <Link href="/shop" className="text-[13px] uppercase tracking-[0.14em]">
            Zum Shop
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={getFeaturedProducts()} />
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
          Katalogtextilien zur Konfiguration. Weitere Produkte aus dem HAKRO-Katalog und mitgebrachte Textilien veredeln wir ebenfalls.
        </p>
      </div>
    </section>
  );
}
