"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  finishingOptions,
  getVolumeFactor,
  lineTotal,
  unitPrice,
  volumeTiers,
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
import { BuyProgress } from "@/components/shop/BuyProgress";

const qtyPresets = [1, 10, 25, 30, 50];

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
  const [noteOpen, setNoteOpen] = useState(false);
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

  const nextTier = volumeTiers.find((tier) => effectiveQty < tier.min && tier.min > 1);
  const piecesToNext = nextTier ? nextTier.min - effectiveQty : 0;

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
    window.setTimeout(() => setAdded(false), 2200);
  }

  const canAdd = mix ? mixTotal > 0 : quantity > 0;

  return (
    <div>
      <BuyProgress step={1} />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-paper-2 sm:aspect-[5/6]">
            <Image
              src={product.images[activeImage].src}
              alt={product.images[activeImage].alt}
              fill
              priority
              className="object-cover opacity-40 transition duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 grid place-items-center p-8 sm:p-14">
              <ProductSilhouette
                type={product.silhouette}
                color={color.hex}
                className="h-[82%] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.14)]"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl transition duration-300 ${activeImage === index ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : "opacity-70 hover:opacity-100"}`}
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
          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl tabular-nums">{formatEuro(price)}</p>
            <p className="text-sm text-muted">pro Stück · Richtpreis</p>
            {getVolumeFactor(effectiveQty) < 1 ? (
              <span className="rounded-full bg-ink px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white">
                Staffel aktiv
              </span>
            ) : null}
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">1 · Farbe · {color.name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={item.id === colorId}
                  onClick={() => setColorId(item.id)}
                  className={`h-10 w-10 rounded-full border transition duration-300 ${item.id === colorId ? "scale-110 border-ink ring-2 ring-ink ring-offset-2 ring-offset-paper" : "border-line hover:scale-105"}`}
                  style={{ background: item.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">2 · Größe</p>
              <button
                type="button"
                className="rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted transition hover:border-ink hover:text-ink"
                onClick={() => setMix((value) => !value)}
              >
                {mix ? "Einzelgröße" : "Größenmix"}
              </button>
            </div>
            {mix ? (
              <div className="mt-3">
                <p className="mb-3 text-sm text-muted">Ideal für Vereine und Teams · {mixTotal} Stück gesamt</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {product.sizes.map((item) => (
                    <label key={item} className="flex items-center justify-between rounded-2xl border border-line bg-white px-3 py-2.5 text-sm">
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
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`min-h-11 min-w-11 rounded-full px-3 text-sm transition duration-300 ${item === size ? "bg-ink text-white" : "border border-line bg-white hover:border-ink/40"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">3 · Veredelung</p>
            <div className="mt-3 grid gap-2">
              {availableFinishing.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFinishing(option.id)}
                  className={`flex items-start justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left transition duration-300 ${
                    finishing === option.id
                      ? "border-ink bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      : "border-line bg-transparent hover:bg-white/60"
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
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">4 · Menge</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {qtyPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      quantity === preset ? "bg-ink text-white" : "border border-line bg-white hover:border-ink/40"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
              {piecesToNext > 0 ? (
                <p className="mt-2 text-sm text-muted">
                  Noch {piecesToNext} bis zur nächsten Staffel ({nextTier?.label}).
                </p>
              ) : getVolumeFactor(effectiveQty) < 1 ? (
                <p className="mt-2 text-sm text-muted">Staffel für {effectiveQty} Stück berücksichtigt.</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8">
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink"
              onClick={() => setNoteOpen((value) => !value)}
            >
              {noteOpen ? "− Motiv / Hinweis ausblenden" : "+ Motiv / Hinweis (optional)"}
            </button>
            {noteOpen ? (
              <textarea
                id="motiv-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Logo auf Brust, Vereinsname auf dem Rücken, Wunschtermin…"
                className="mt-3 min-h-24 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm"
              />
            ) : null}
          </div>

          <div className="mt-8 hidden border-t border-line pt-6 lg:block">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Richtpreis</p>
                <p className="text-2xl tabular-nums">{formatEuro(total)}</p>
              </div>
              <Button onClick={addToCart} disabled={!canAdd} className="min-w-52">
                {added ? "Im Warenkorb" : "In den Warenkorb"}
              </Button>
            </div>
            {added ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/checkout" variant="red">
                  Zur Anfrage
                </Button>
                <Button href="/shop" variant="ghost">
                  Weiter einkaufen
                </Button>
              </div>
            ) : (
              <p className="mt-3 text-xs leading-5 text-muted">{priceDisclaimer}</p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line/80 bg-paper/85 px-4 py-3 backdrop-blur-xl md:px-6 lg:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Richtpreis</p>
            <p className="text-lg tabular-nums">{formatEuro(total)}</p>
          </div>
          {added ? (
            <Button href="/checkout" variant="red" className="flex-1">
              Zur Anfrage
            </Button>
          ) : (
            <Button onClick={addToCart} disabled={!canAdd} className="flex-1">
              In den Warenkorb
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
