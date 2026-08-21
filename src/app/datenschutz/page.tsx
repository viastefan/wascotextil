import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:py-20">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Datenschutz</h1>
      <div className="prose-like mt-8 space-y-8 text-sm leading-7 text-muted">
        <section>
          <h2 className="text-ink">1. Datenschutz auf einen Blick</h2>
          <p className="mt-3">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          <p className="mt-3">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen — etwa über das Kontakt- oder Anfrageformular, das eine E-Mail an uns vorbereitet. Andere Daten werden automatisch beim Besuch der Website durch IT-Systeme erfasst, insbesondere technische Daten.
          </p>
        </section>
        <section>
          <h2 className="text-ink">2. Hosting</h2>
          <p className="mt-3">
            Diese Ausgabe der Website wird über Vercel bereitgestellt. Der Einsatz erfolgt zum Zwecke der Vertragserfüllung gegenüber potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="mt-3">
            Die bisherige Website wurde bei STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin, gehostet. Angaben dazu bleiben hier dokumentiert, soweit sie die bisherige Datenverarbeitung betreffen.
          </p>
        </section>
        <section>
          <h2 className="text-ink">3. Verantwortliche Stelle</h2>
          <p className="mt-3">
            {company.register.managingDirector}
            <br />
            {company.address.street}
            <br />
            {company.address.zip} {company.address.city}
            <br />
            Telefon: {company.phone}
            <br />
            E-Mail: {company.founderEmail}
          </p>
        </section>
        <section>
          <h2 className="text-ink">4. Kontaktformular und Bestellanfragen</h2>
          <p className="mt-3">
            Formulare auf dieser Website öffnen Ihr E-Mail-Programm. Eine serverseitige Speicherung der Formulardaten findet nicht statt. Sobald Sie die E-Mail senden, gelten die Regeln für Anfragen per E-Mail: Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>
        <section>
          <h2 className="text-ink">5. Warenkorb</h2>
          <p className="mt-3">
            Der Warenkorb wird ausschließlich lokal in Ihrem Browser (localStorage) gespeichert. Diese Daten verlassen Ihr Gerät nicht, solange Sie keine Anfrage per E-Mail absenden.
          </p>
        </section>
        <section>
          <h2 className="text-ink">6. Rechte</h2>
          <p className="mt-3">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde. Eine erteilte Einwilligung können Sie jederzeit widerrufen.
          </p>
        </section>
        <section>
          <h2 className="text-ink">7. SSL- bzw. TLS-Verschlüsselung</h2>
          <p className="mt-3">
            Diese Seite nutzt eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile.
          </p>
        </section>
        <section>
          <h2 className="text-ink">8. Schriften</h2>
          <p className="mt-3">
            Schriften werden über next/font lokal ausgeliefert. Eine Verbindung zu Google-Servern beim Seitenaufruf ist dafür nicht vorgesehen.
          </p>
        </section>
      </div>
    </div>
  );
}
