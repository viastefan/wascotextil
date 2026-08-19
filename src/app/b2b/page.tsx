import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "B2B",
  description: "Textilveredelung für Unternehmen und Vereine in Paderborn — Größenmix, Auflagen, einheitlicher Auftritt.",
};

export default function B2BPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Unternehmen & Vereine</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl">
        Ein Auftritt. Viele Größen.
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
        Für Betriebe, Vereine und Events: gleiche Textilien, gemischte Größen, ein Motiv. Im Shop kannst du den Größenmix direkt konfigurieren. Für größere Serien und HAKRO-Artikel sprechen wir den Auftrag persönlich ab.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Unternehmen", text: "Arbeitskleidung, Empfang, Events. Polo und Stick oft die ruhigere Lösung." },
          { title: "Verein", text: "Unterschiedliche Größen, ein Druck. Hoodies und Shirts für Team und Fans." },
          { title: "Auflage", text: "Staffeln ab 10, 25 und 50 Stück als Richtwerte. Der Endpreis folgt nach Abstimmung." },
        ].map((item) => (
          <article key={item.title} className="border border-line bg-white p-6">
            <h2 className="text-lg">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Button href="/shop">Textilien konfigurieren</Button>
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Projekt anfragen</h2>
          <p className="mt-4 text-muted">
            Nenne Stückzahl, Termin und ob Logo, Schriftzug oder beides. Dateien hängst du in der E-Mail an.
          </p>
        </div>
        <InquiryForm subject="B2B Anfrage WASCOTEXTIL" intent="Anfrage Unternehmen / Verein" />
      </div>
    </div>
  );
}
