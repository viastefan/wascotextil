import { finishingOptions } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";

export function CustomizationSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Veredelung</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl tracking-tight sm:text-5xl">
            Das Motiv wird präzise nach deinen Wünschen umgesetzt.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-7 text-muted">
            Bei WASCOTEXTIL veredeln wir deine Textilien mit Direktdruck, Flock- und Flexdruck sowie Stick. Jede Technik hat eigene Stärken — von Kleinauflage bis Auflage.
          </p>
          <div className="mt-8">
            <Button href="/individualisierung" variant="ghost">
              Technik wählen
            </Button>
          </div>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {finishingOptions
            .filter((option) => option.id !== "ohne")
            .map((option) => (
              <article key={option.id} className="bg-paper p-6">
                <h3 className="text-lg">{option.name}</h3>
                <p className="mt-2 text-sm text-muted">{option.summary}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted">
                  {option.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
