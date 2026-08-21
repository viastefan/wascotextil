import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImprintPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:py-20">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Impressum</h1>
      <div className="mt-8 space-y-6 text-sm leading-7">
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">Angaben gemäß § 5 DDG</h2>
          <p className="mt-2">
            {company.legalName}
            <br />
            {company.address.street}
            <br />
            {company.address.zip} {company.address.city}
          </p>
          <p className="mt-4">
            Handelsregister: {company.register.number}
            <br />
            Registergericht: {company.register.court}
            <br />
            Geschäftsführer: {company.register.managingDirector}
          </p>
        </section>
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">Kontakt</h2>
          <p className="mt-2">
            Telefon: {company.phone}
            <br />
            E-Mail: {company.email}
            <br />
            Steuernummer gemäß § 27 a Umsatzsteuergesetz: {company.register.taxNumber}
          </p>
        </section>
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">EU-Streitschlichtung</h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a className="underline" href="https://ec.europa.eu/consumers/odr/">
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">Verbraucherstreitbeilegung</h2>
          <p className="mt-2">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  );
}
