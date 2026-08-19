import { company } from "@/lib/company";

const points = [
  {
    title: "Qualität zuerst",
    text: "Bei unseren Produkten stehen Qualität, Tragekomfort und Langlebigkeit an erster Stelle.",
  },
  {
    title: "Beratung vor Ort",
    text: `Atelier in ${company.address.city}. Wir beraten dich zu Textil, Motiv, Auflage und Technik.`,
  },
  {
    title: "B2B und Verein",
    text: "Größenmix, Staffeln und einheitliche Auftritte — vom einzelnen Shirt bis zur Teamserie.",
  },
  {
    title: "Eigene Textilien",
    text: "Bereits vorhandene Textilien können von uns personalisiert werden. HAKRO auf Anfrage.",
  },
];

export function TrustSection() {
  return (
    <section className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10 lg:py-20">
        {points.map((point) => (
          <article key={point.title}>
            <div className="mb-4 h-6 w-px bg-red" />
            <h3 className="text-lg">{point.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
