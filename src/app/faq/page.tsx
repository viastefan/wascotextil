import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Textilien, Veredelung, Preisen und Ablauf bei WASCOTEXTIL.",
};

const faqs = [
  {
    q: "Kann ich ein einzelnes Shirt bestellen?",
    a: "Ja. Wähle Textil, Farbe, Größe und Veredelung im Shop. Auch Kleinauflagen sind üblich — besonders bei Stick und komplexen Motiven klären wir die beste Technik.",
  },
  {
    q: "Wie bestelle ich 30 bedruckte Shirts für ein Unternehmen?",
    a: "Konfiguriere das Shirt im Shop, stelle die Menge auf 30 oder nutze den Größenmix. Die Staffel ist ein Richtwert. Die verbindliche Kalkulation kommt nach Motivprüfung.",
  },
  {
    q: "Können Vereine unterschiedliche Größen in einer Bestellung mischen?",
    a: "Ja. Auf der Produktseite gibt es den Größenmix. Jede Größe landet als eigene Position im Warenkorb.",
  },
  {
    q: "Gibt es verbindliche Online-Preise?",
    a: "Nein. Angezeigte Beträge sind Richtpreise zur Orientierung. Der Endpreis hängt von Textil, Technik, Motiv und Auflage ab.",
  },
  {
    q: "Kann ich eigene Textilien mitbringen?",
    a: "Ja. Bereits vorhandene Textilien können von uns personalisiert werden.",
  },
  {
    q: "Arbeitet ihr mit HAKRO?",
    a: "Ja. Zusätzlich zum gezeigten Sortiment bieten wir weitere Produkte aus dem HAKRO-Katalog an.",
  },
  {
    q: "Wie bezahle ich?",
    a: "Nicht über diese Website. Die Anfrage öffnet eine E-Mail an uns. Zahlung und Auftrag folgen nach Bestätigung — keine vorgetäuschte Online-Zahlung.",
  },
  {
    q: "Welche Techniken bietet ihr?",
    a: "Digitaldruck, Flexdruck, Flockdruck und Stick. Die Wahl hängt von Motiv, Textil und Stückzahl ab. Wir beraten dazu.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted">FAQ</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Fragen vor der Anfrage</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="cursor-pointer list-none text-lg tracking-tight transition group-open:text-ink">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-muted transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
