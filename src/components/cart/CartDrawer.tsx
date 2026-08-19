"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { priceDisclaimer } from "@/lib/company";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount, hydrated } = useCart();

  if (!hydrated) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className={`absolute inset-0 bg-ink/40 transition ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
        aria-label="Warenkorb schließen"
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="text-sm uppercase tracking-[0.16em]">
            Warenkorb · {getItemCount()}
          </h2>
          <button type="button" className="text-sm" onClick={closeCart}>
            Schließen
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Noch keine Textilien ausgewählt.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="h-20 w-16 shrink-0" style={{ background: item.colorHex }} />
                  <div className="min-w-0 flex-1">
                    <Link href={`/shop/${item.category}/${item.slug}`} className="text-sm" onClick={closeCart}>
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {item.colorName} · {item.size} · {item.finishingName}
                    </p>
                    {item.note ? <p className="mt-1 text-xs text-muted">{item.note}</p> : null}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.key, value)}
                      />
                      <p className="text-sm tabular-nums">{formatEuro(item.unitPrice * item.quantity)}</p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-xs uppercase tracking-[0.14em] text-muted hover:text-red"
                      onClick={() => removeItem(item.key)}
                    >
                      Entfernen
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-line px-5 py-5">
          <div className="flex items-end justify-between">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Summe</p>
            <p className="text-lg tabular-nums">{formatEuro(getTotal())}</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">{priceDisclaimer}</p>
          <div className="mt-4 grid gap-2">
            <Button href="/checkout" className="w-full" onClick={closeCart}>
              Zur Anfrage
            </Button>
            <Button href="/warenkorb" variant="ghost" className="w-full" onClick={closeCart}>
              Warenkorb
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
