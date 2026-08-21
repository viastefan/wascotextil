import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { Reveal } from "@/components/ui/Reveal";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Sortiment</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight sm:text-6xl">Textilien für Motiv und Marke</h2>
          </div>
          <Link href="/shop" className="hidden text-[12px] uppercase tracking-[0.16em] text-ink/60 hover:text-ink sm:block">
            Alle ansehen
          </Link>
        </div>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 70}>
            <Link href={`/shop/${category.slug}`} className="group relative block min-h-[320px] overflow-hidden rounded-[28px] bg-paper-2">
              <Image
                src={category.image}
                alt=""
                fill
                className="object-cover transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">{category.tagline}</p>
                <h3 className="mt-2 font-serif text-3xl">{category.name}</h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
