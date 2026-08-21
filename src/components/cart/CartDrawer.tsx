"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { priceDisclaimer } from "@/lib/company";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount, hydrated } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!hydrated) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className={`absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
        aria-label="Warenkorb schließen"
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper/95 shadow-[-24px_0_80px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 id="cart-title" className="text-[12px] uppercase tracking-[0.18em]">
            Warenkorb · {getItemCount()}
          </h2>
          <button type="button" className="text-sm text-muted hover:text-ink" onClick={closeCart}>
            Schließen
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="pt-10">
              <p className="text-sm leading-6 text-muted">Noch keine Textilien ausgewählt.</p>
              <Button href="/shop" className="mt-6" onClick={closeCart}>
                Textilien entdecken
              </Button>
            </div>
          ) : (
            <ul className="space-y-7">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="h-20 w-16 shrink-0 rounded-2xl" style={{ background: item.colorHex }} />
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
        <div className="border-t border-line/70 px-6 py-6">
          {items.length > 0 ? (
            <>
              <div className="flex items-end justify-between">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Summe</p>
                <p className="text-2xl tabular-nums">{formatEuro(getTotal())}</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{priceDisclaimer}</p>
              <div className="mt-5 grid gap-2">
                <Button href="/checkout" className="w-full" onClick={closeCart}>
                  Weiter zur Anfrage
                </Button>
                <Button href="/shop" variant="ghost" className="w-full" onClick={closeCart}>
                  Weiter einkaufen
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
