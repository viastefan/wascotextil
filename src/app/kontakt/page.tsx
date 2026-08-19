import type { Metadata } from "next";
import { company } from "@/lib/company";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zu WASCOTEXTIL in Paderborn — Telefon, E-Mail und Atelierzeiten.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-16">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Kontakt</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">Wir beraten dich gerne</h1>
        <p className="mt-6 max-w-md text-[16px] leading-7 text-muted">
          Kontaktiere uns per Telefon, E-Mail oder besuche uns direkt — wir sind bereit, dein Projekt umzusetzen.
        </p>
        <dl className="mt-10 space-y-6 text-sm">
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted">Adresse</dt>
            <dd className="mt-2">
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted">Telefon</dt>
            <dd className="mt-2">
              <a href={company.phoneHref}>{company.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted">E-Mail</dt>
            <dd className="mt-2">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted">Zeiten</dt>
            <dd className="mt-2 space-y-1">
              {company.hours.map((item) => (
                <p key={item.days}>
                  {item.days}: {item.time}
                </p>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <InquiryForm subject="Kontakt WASCOTEXTIL" intent="Kontaktanfrage" />
      </div>
    </div>
  );
}
