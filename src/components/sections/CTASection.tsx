import { Button } from "@/components/ui/Button";
import { company } from "@/lib/company";

export function CTASection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:px-10 lg:py-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Nächster Schritt</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">
            Wir beraten dich gerne.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Kontaktiere uns per Telefon, E-Mail oder besuche uns direkt — wir sind bereit, dein Projekt umzusetzen.
          </p>
        </div>
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
