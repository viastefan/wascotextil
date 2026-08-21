import Image from "next/image";
import Link from "next/link";
import { formatEuro } from "@/lib/format";
import { ProductSilhouette } from "@/components/shop/ProductSilhouette";
import { QuickAddButton } from "@/components/shop/QuickAddButton";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const href = `/shop/${product.category}/${product.slug}`;
  const color = product.colors[0];

  return (
    <article className="group h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2">
        <Link href={href} className="absolute inset-0 block" aria-label={product.name}>
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-cover opacity-30 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-45"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 grid place-items-center p-8">
            <ProductSilhouette
              type={product.silhouette}
              color={color.hex}
              className="h-[78%] w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.12)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
        <QuickAddButton product={product} />
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <Link href={href} className="text-[16px] tracking-tight hover:opacity-70">
            {product.name}
          </Link>
          <p className="mt-1 text-sm leading-6 text-muted">{product.description}</p>
          <div className="mt-3 flex gap-1.5">
            {product.colors.slice(0, 5).map((item) => (
              <span key={item.id} className="h-2.5 w-2.5 rounded-full border border-ink/10" style={{ background: item.hex }} />
            ))}
          </div>
        </div>
        <p className="shrink-0 pt-0.5 text-[13px] tabular-nums text-ink/70">ab {formatEuro(product.price)}</p>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-line px-6 py-16 text-center text-muted">
        Keine Textilien für diese Auswahl.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
