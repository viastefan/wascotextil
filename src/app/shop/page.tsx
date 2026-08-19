import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductFilter } from "@/components/shop/ProductFilter";

export const metadata: Metadata = {
  title: "Shop",
  description: "Textilien aus dem WASCOTEXTIL-Sortiment: T-Shirts, Hoodies, Polos, Sweater, Taschen und Caps — bereit für Druck oder Stick.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Shop</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">Textilien hochwertig personalisiert</h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-7 text-muted">
        Bei unseren Produkten stehen Qualität, Tragekomfort und Langlebigkeit an erster Stelle. Zudem bieten wir eine Auswahl an nachhaltigen Textilien aus zertifizierter Baumwolle. Weitere Produkte aus dem HAKRO-Katalog und mitgebrachte Textilien auf Anfrage.
      </p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-muted">Shop wird geladen…</p>}>
          <ProductFilter />
        </Suspense>
      </div>
    </div>
  );
}
