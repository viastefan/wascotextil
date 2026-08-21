"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";

export function QuickAddButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const color = product.colors[0];
  const size = product.sizes.includes("M") ? "M" : product.sizes[0];
  const finishing = product.customizable ? "digitaldruck" : "ohne";

  return (
    <button
      type="button"
      className="pressable absolute bottom-4 left-4 right-4 z-10 rounded-full bg-white/90 px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition group-hover:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addItem({
          productId: product.id,
          slug: product.slug,
          category: product.category,
          name: product.name,
          colorId: color.id,
          colorName: color.name,
          colorHex: color.hex,
          size,
          finishing,
          quantity: 1,
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Hinzugefügt" : "Schnell hinzufügen"}
    </button>
  );
}
