import Image from "next/image";
import Link from "next/link";
import { formatEuro } from "@/lib/format";
import { ProductSilhouette } from "@/components/shop/ProductSilhouette";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const href = `/shop/${product.category}/${product.slug}`;
  const color = product.colors[0];

  return (
    <Link href={href} className="group block">
      <article className="h-full">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-cover opacity-35 transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 grid place-items-center p-8">
            <ProductSilhouette
              type={product.silhouette}
              color={color.hex}
              className="h-[78%] w-auto drop-shadow-sm transition duration-500 group-hover:-translate-y-1"
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 pt-4">
          <div>
            <h3 className="text-[15px] tracking-tight">{product.name}</h3>
            <p className="mt-1 text-sm text-muted">{product.description}</p>
          </div>
          <p className="shrink-0 text-[13px] tabular-nums">ab {formatEuro(product.price)}</p>
        </div>
      </article>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="border border-dashed border-line px-6 py-16 text-center text-muted">
        Keine Textilien für diese Auswahl.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
