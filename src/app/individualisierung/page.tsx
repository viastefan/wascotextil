import type { Metadata } from "next";
import { finishingOptions } from "@/lib/catalog";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Individualisierung",
  description: "Digitaldruck, Flex, Flock und Stick bei WASCOTEXTIL in Paderborn.",
};

export default function CustomizationPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Individualisierung</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl lg:text-7xl">
          Kreative Lösungen für individuelle Drucke
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-muted">
          Bei WASCOTEXTIL veredeln wir deine Textilien mit Direktdruck, Flock- und Flexdruck sowie Stick. Das Motiv wird präzise nach deinen Wünschen umgesetzt — individuell und hochwertig.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {finishingOptions
          .filter((option) => option.id !== "ohne")
          .map((option, index) => (
            <Reveal key={option.id} delay={index * 70}>
              <article className="h-full rounded-[28px] bg-white/70 p-8">
                <h2 className="text-2xl tracking-tight">{option.name}</h2>
                <p className="mt-2 text-sm text-muted">{option.summary}</p>
                <ul className="mt-5 space-y-2 text-sm leading-7 text-muted">
                  {option.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">So läuft die Anfrage</h2>
          <ol className="mt-6 space-y-4 text-[16px] leading-8 text-muted">
            <li>1. Textil im Shop wählen oder vorhandene Ware angeben.</li>
            <li>2. Technik, Position und Auflage beschreiben.</li>
            <li>3. Motivdatei per E-Mail senden — wir prüfen Umsetzbarkeit.</li>
            <li>4. Verbindliches Angebot folgt. Keine Online-Zahlung.</li>
          </ol>
        </Reveal>
        <InquiryForm subject="Individualisierung WASCOTEXTIL" intent="Anfrage Individualisierung" />
      </div>
    </div>
  );
}
