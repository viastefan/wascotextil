import { Button } from "@/components/ui/Button";
import { company } from "@/lib/company";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section>
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:px-12 lg:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Nächster Schritt</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight sm:text-6xl">
            Wir beraten dich gerne.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-muted">
            Kontaktiere uns per Telefon, E-Mail oder besuche uns direkt — wir sind bereit, dein Projekt umzusetzen.
          </p>
        </Reveal>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt">Anfrage stellen</Button>
          <Button href={company.phoneHref} variant="ghost">
            {company.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
