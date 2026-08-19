import type { Metadata } from "next";
import { finishingOptions } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Digitaldruck, Flex, Flock und Stick — die Veredelungstechniken von WASCOTEXTIL.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Leistungen</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl">Unsere Leistungen</h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
        Kreative Lösungen für individuelle Drucke. Jede Veredelungstechnik hat eigene Stärken — von kosteneffizienter Massenproduktion bis zu hochwertigen Kleinauflagen. Ob Druck oder Stick: die Wahl hängt von dir und deiner Botschaft ab.
      </p>
      <div className="mt-12 space-y-12">
        {finishingOptions
          .filter((option) => option.id !== "ohne")
          .map((option) => (
            <article key={option.id} className="grid gap-6 border-t border-line pt-10 md:grid-cols-[240px_1fr]">
              <h2 className="text-2xl">{option.name}</h2>
              <ul className="space-y-2 text-[16px] leading-7 text-muted">
                {option.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
      </div>
      <div className="mt-12">
        <Button href="/shop">Technik am Produkt wählen</Button>
      </div>
    </div>
  );
}
