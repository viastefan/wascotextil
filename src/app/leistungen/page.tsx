import type { Metadata } from "next";
import { finishingOptions } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Digitaldruck, Flex, Flock und Stick — die Veredelungstechniken von WASCOTEXTIL.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Leistungen</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl lg:text-7xl">
          Unsere Leistungen
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-muted">
          Kreative Lösungen für individuelle Drucke. Jede Veredelungstechnik hat eigene Stärken — von kosteneffizienter Massenproduktion bis zu hochwertigen Kleinauflagen. Ob Druck oder Stick: die Wahl hängt von dir und deiner Botschaft ab.
        </p>
      </Reveal>
      <div className="mt-12 space-y-3">
        {finishingOptions
          .filter((option) => option.id !== "ohne")
          .map((option, index) => (
            <Reveal key={option.id} delay={index * 60}>
              <article className="grid gap-6 rounded-[28px] bg-white/70 p-8 md:grid-cols-[240px_1fr]">
                <h2 className="text-2xl tracking-tight">{option.name}</h2>
                <ul className="space-y-2 text-[16px] leading-8 text-muted">
                  {option.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
      </div>
      <div className="mt-12">
        <Button href="/shop">Technik am Produkt wählen</Button>
      </div>
    </div>
  );
}
