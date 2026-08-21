import { getFeaturedProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export function FeaturedProducts() {
  return (
    <section className="bg-white/50">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Einstieg</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">Häufig gewählt</h2>
            </div>
            <Link href="/shop" className="text-[12px] uppercase tracking-[0.16em] text-ink/60 hover:text-ink">
              Zum Shop
            </Link>
          </div>
        </Reveal>
        <div className="mt-12">
          <ProductGrid products={getFeaturedProducts()} />
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted">
          Katalogtextilien zur Konfiguration. Weitere Produkte aus dem HAKRO-Katalog und mitgebrachte Textilien veredeln wir ebenfalls.
        </p>
      </div>
    </section>
  );
}
