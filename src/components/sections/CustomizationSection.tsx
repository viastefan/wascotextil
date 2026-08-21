import { finishingOptions } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CustomizationSection() {
  return (
    <section>
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Veredelung</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl tracking-tight sm:text-6xl">
            Das Motiv wird präzise nach deinen Wünschen umgesetzt.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-8 text-muted">
            Bei WASCOTEXTIL veredeln wir deine Textilien mit Direktdruck, Flock- und Flexdruck sowie Stick. Jede Technik hat eigene Stärken — von Kleinauflage bis Auflage.
          </p>
          <div className="mt-8">
            <Button href="/individualisierung" variant="ghost">
              Technik wählen
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {finishingOptions
            .filter((option) => option.id !== "ohne")
            .map((option, index) => (
              <Reveal key={option.id} delay={index * 80}>
                <article className="h-full rounded-[24px] bg-white/70 p-6">
                  <h3 className="text-lg">{option.name}</h3>
                  <p className="mt-2 text-sm text-muted">{option.summary}</p>
                  <ul className="mt-4 space-y-1 text-sm leading-6 text-muted">
                    {option.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
