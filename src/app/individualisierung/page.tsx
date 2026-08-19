import type { Metadata } from "next";
import { finishingOptions } from "@/lib/catalog";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Individualisierung",
  description: "Digitaldruck, Flex, Flock und Stick bei WASCOTEXTIL in Paderborn.",
};

export default function CustomizationPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Individualisierung</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl">
        Kreative Lösungen für individuelle Drucke
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
        Bei WASCOTEXTIL veredeln wir deine Textilien mit Direktdruck, Flock- und Flexdruck sowie Stick. Das Motiv wird präzise nach deinen Wünschen umgesetzt — individuell und hochwertig.
      </p>
      <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
        {finishingOptions
          .filter((option) => option.id !== "ohne")
          .map((option) => (
            <article key={option.id} className="bg-paper p-8">
              <h2 className="text-2xl">{option.name}</h2>
              <p className="mt-2 text-sm text-muted">{option.summary}</p>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
                {option.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">So läuft die Anfrage</h2>
          <ol className="mt-6 space-y-4 text-[16px] leading-7 text-muted">
            <li>1. Textil im Shop wählen oder vorhandene Ware angeben.</li>
            <li>2. Technik, Position und Auflage beschreiben.</li>
            <li>3. Motivdatei per E-Mail senden — wir prüfen Umsetzbarkeit.</li>
            <li>4. Verbindliches Angebot folgt. Keine Online-Zahlung.</li>
          </ol>
        </div>
        <InquiryForm subject="Individualisierung WASCOTEXTIL" intent="Anfrage Individualisierung" />
      </div>
    </div>
  );
}
