import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Sortiment</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Textilien für Motiv und Marke</h2>
        </div>
        <Link href="/shop" className="hidden text-[13px] uppercase tracking-[0.14em] sm:block">
          Alle ansehen
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/shop/${category.slug}`} className="group relative min-h-[280px] overflow-hidden bg-paper-2">
            <Image
              src={category.image}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">{category.tagline}</p>
              <h3 className="mt-2 text-2xl">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
