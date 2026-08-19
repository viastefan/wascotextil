"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  finishingOptions,
  getVolumeFactor,
  lineTotal,
  unitPrice,
  type FinishingId,
  type Product,
  type SizeId,
} from "@/lib/catalog";
import { formatEuro } from "@/lib/format";
import { priceDisclaimer } from "@/lib/company";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ProductSilhouette } from "@/components/shop/ProductSilhouette";

export function ProductConfigurator({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [size, setSize] = useState<SizeId>(product.sizes.includes("M") ? "M" : product.sizes[0]);
  const [finishing, setFinishing] = useState<FinishingId>(product.customizable ? "digitaldruck" : "ohne");
  const [quantity, setQuantity] = useState(1);
  const [mix, setMix] = useState(false);
  const [sizeMix, setSizeMix] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const mixTotal = Object.values(sizeMix).reduce((sum, value) => sum + value, 0);
  const effectiveQty = mix ? Math.max(mixTotal, 1) : quantity;
  const price = unitPrice(product, finishing, effectiveQty);
  const total = mix
    ? Object.entries(sizeMix).reduce((sum, [, qty]) => {
        if (qty <= 0) return sum;
        return sum + lineTotal(product, finishing, qty);
      }, 0)
    : lineTotal(product, finishing, quantity);

  const availableFinishing = useMemo(
    () =>
      finishingOptions.filter((option) => {
        if (option.id === "ohne") return true;
        if (option.id === "stick") return product.embroidery;
        return product.printing;
      }),
    [product],
  );

  function addToCart() {
    if (mix) {
      Object.entries(sizeMix).forEach(([mixSize, qty]) => {
        if (qty <= 0) return;
        addItem({
          productId: product.id,
          slug: product.slug,
          category: product.category,
          name: product.name,
          colorId: color.id,
          colorName: color.name,
          colorHex: color.hex,
          size: mixSize as SizeId,
          finishing,
          quantity: qty,
          note: note || undefined,
        });
      });
    } else {
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
        quantity,
        note: note || undefined,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const canAdd = mix ? mixTotal > 0 : quantity > 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 sm:aspect-[5/6]">
          <Image
            src={product.images[activeImage].src}
            alt={product.images[activeImage].alt}
            fill
            priority
            className="object-cover opacity-40"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 grid place-items-center p-8 sm:p-14">
            <ProductSilhouette type={product.silhouette} color={color.hex} className="h-[82%] w-auto" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {product.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`relative aspect-[4/3] overflow-hidden ${activeImage === index ? "ring-2 ring-ink" : ""}`}
              aria-label={`Bild ${index + 1}`}
            >
              <Image src={image.src} alt="" fill className="object-cover" sizes="200px" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:pt-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Katalogtextil</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-4 max-w-md text-[16px] leading-7 text-muted">{product.description}</p>
        <div className="mt-6 flex items-baseline gap-3">
          <p className="text-2xl tabular-nums">{formatEuro(price)}</p>
          <p className="text-sm text-muted">pro Stück · Richtpreis</p>
        </div>

        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Farbe · {color.name}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.name}
                aria-pressed={item.id === colorId}
                onClick={() => setColorId(item.id)}
                className={`h-9 w-9 border ${item.id === colorId ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-paper" : "border-line"}`}
                style={{ background: item.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Größe</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
              onClick={() => setMix((value) => !value)}
            >
              {mix ? "Einzelgröße" : "Größenmix"}
            </button>
          </div>
          {mix ? (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {product.sizes.map((item) => (
                <label key={item} className="flex items-center justify-between border border-line bg-white px-3 py-2 text-sm">
                  <span>{item}</span>
                  <input
                    inputMode="numeric"
                    className="w-12 border-none bg-transparent text-right outline-none"
                    value={sizeMix[item] ?? 0}
                    onChange={(event) =>
                      setSizeMix((current) => ({
                        ...current,
                        [item]: Math.max(0, Number(event.target.value.replace(/\D/g, "")) || 0),
                      }))
                    }
                    aria-label={`Menge ${item}`}
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`min-w-11 px-3 py-2 text-sm ${item === size ? "bg-ink text-white" : "border border-line bg-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Veredelung</p>
          <div className="mt-3 grid gap-2">
            {availableFinishing.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFinishing(option.id)}
                className={`flex items-start justify-between gap-4 border px-4 py-3 text-left ${
                  finishing === option.id ? "border-ink bg-white" : "border-line bg-transparent"
                }`}
              >
                <span>
                  <span className="block text-sm">{option.name}</span>
                  <span className="mt-1 block text-xs text-muted">{option.summary}</span>
                </span>
                <span className="text-sm tabular-nums text-muted">
                  {option.surcharge ? `+ ${formatEuro(option.surcharge)}` : "inkl."}
                </span>
              </button>
            ))}
          </div>
        </div>

        {!mix ? (
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Menge</p>
            <div className="mt-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            {getVolumeFactor(effectiveQty) < 1 ? (
              <p className="mt-2 text-sm text-muted">Staffel für {effectiveQty} Stück berücksichtigt.</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8">
          <label className="text-[11px] uppercase tracking-[0.18em] text-muted" htmlFor="motiv-note">
            Motiv / Hinweis
          </label>
          <textarea
            id="motiv-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Logo auf Brust, Vereinsname auf dem Rücken, Wunschtermin…"
            className="mt-3 min-h-24 w-full border border-line bg-white px-3 py-3 text-sm"
          />
        </div>

        <div className="mt-8 hidden items-center justify-between gap-4 border-t border-line pt-6 lg:flex">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Richtpreis</p>
            <p className="text-2xl tabular-nums">{formatEuro(total)}</p>
          </div>
          <Button onClick={addToCart} disabled={!canAdd} className="min-w-48">
            {added ? "Hinzugefügt" : "In den Warenkorb"}
          </Button>
        </div>
        <p className="mt-4 hidden text-xs leading-5 text-muted lg:block">{priceDisclaimer}</p>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:px-6 lg:hidden">
          <div className="mx-auto flex max-w-[1440px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Richtpreis</p>
              <p className="text-lg tabular-nums">{formatEuro(total)}</p>
            </div>
            <Button onClick={addToCart} disabled={!canAdd} className="flex-1">
              {added ? "Hinzugefügt" : "In den Warenkorb"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
