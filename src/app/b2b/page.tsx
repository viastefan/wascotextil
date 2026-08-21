import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "B2B",
  description: "Textilveredelung für Unternehmen und Vereine in Paderborn — Größenmix, Auflagen, einheitlicher Auftritt.",
};

export default function B2BPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Unternehmen & Vereine</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl lg:text-7xl">
          Ein Auftritt. Viele Größen.
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-muted">
          Für Betriebe, Vereine und Events: gleiche Textilien, gemischte Größen, ein Motiv. Im Shop kannst du den Größenmix direkt konfigurieren. Für größere Serien und HAKRO-Artikel sprechen wir den Auftrag persönlich ab.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {[
          { title: "Unternehmen", text: "Arbeitskleidung, Empfang, Events. Polo und Stick oft die ruhigere Lösung." },
          { title: "Verein", text: "Unterschiedliche Größen, ein Druck. Hoodies und Shirts für Team und Fans." },
          { title: "Auflage", text: "Staffeln ab 10, 25 und 50 Stück als Richtwerte. Der Endpreis folgt nach Abstimmung." },
        ].map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article className="h-full rounded-[28px] bg-white/70 p-7">
              <h2 className="text-lg tracking-tight">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-8">
        <Button href="/shop">Textilien konfigurieren</Button>
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">Projekt anfragen</h2>
          <p className="mt-4 text-[16px] leading-8 text-muted">
            Nenne Stückzahl, Termin und ob Logo, Schriftzug oder beides. Dateien hängst du in der E-Mail an.
          </p>
        </Reveal>
        <InquiryForm subject="B2B Anfrage WASCOTEXTIL" intent="Anfrage Unternehmen / Verein" />
      </div>
    </div>
  );
}
