import { company } from "@/lib/company";
import { Reveal } from "@/components/ui/Reveal";

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
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12 lg:py-24">
        {points.map((point, index) => (
          <Reveal key={point.title} delay={index * 80}>
            <article>
              <div className="mb-5 h-8 w-px bg-red" />
              <h3 className="text-xl">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{point.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
