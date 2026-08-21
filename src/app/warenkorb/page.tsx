"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { priceDisclaimer } from "@/lib/company";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { BuyProgress } from "@/components/shop/BuyProgress";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getItemCount, hydrated } = useCart();

  if (!hydrated) {
    return <div className="mx-auto max-w-3xl px-5 py-16 text-muted">Warenkorb wird geladen…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 pb-28 sm:px-6 lg:py-20 lg:pb-20">
      <BuyProgress step={2} />
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Warenkorb</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Deine Auswahl</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-white/70 p-8">
          <p className="text-muted">Der Warenkorb ist leer.</p>
          <Button href="/shop" className="mt-6">
            Zum Shop
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.key} className="flex flex-col gap-4 py-6 sm:flex-row">
                <div className="h-24 w-20 shrink-0 rounded-2xl" style={{ background: item.colorHex }} />
                <div className="min-w-0 flex-1">
                  <Link href={`/shop/${item.category}/${item.slug}`} className="text-lg">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {item.colorName} · {item.size} · {item.finishingName}
                  </p>
                  {item.note ? <p className="mt-1 text-sm text-muted">{item.note}</p> : null}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <QuantitySelector value={item.quantity} onChange={(value) => updateQuantity(item.key, value)} />
                    <p className="tabular-nums">{formatEuro(item.unitPrice * item.quantity)}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-xs uppercase tracking-[0.14em] text-muted hover:text-red"
                    onClick={() => removeItem(item.key)}
                  >
                    Entfernen
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-end justify-between">
            <p className="text-sm text-muted">{getItemCount()} Stück</p>
            <p className="text-2xl tabular-nums">{formatEuro(getTotal())}</p>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">{priceDisclaimer}</p>
          <div className="mt-8 hidden flex-col gap-3 sm:flex-row lg:flex">
            <Button href="/checkout" className="sm:flex-1">
              Weiter zur Anfrage
            </Button>
            <Button href="/shop" variant="ghost">
              Weiter einkaufen
            </Button>
            <Button type="button" variant="ghost" onClick={clearCart}>
              Leeren
            </Button>
          </div>
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line/80 bg-paper/85 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex max-w-3xl gap-3">
              <Button href="/shop" variant="ghost" className="flex-1">
                Weiter einkaufen
              </Button>
              <Button href="/checkout" className="flex-[1.4]">
                Zur Anfrage
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
