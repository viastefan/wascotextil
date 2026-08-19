"use client";

import { FormEvent, useState } from "react";
import { company } from "@/lib/company";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";

export function InquiryForm({
  subject,
  intent,
}: {
  subject: string;
  intent: string;
}) {
  const [sent, setSent] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!privacy) return;
    const form = new FormData(event.currentTarget);
    const composed = [
      intent,
      "",
      `Name: ${form.get("first")} ${form.get("last")}`,
      `E-Mail: ${form.get("email")}`,
      form.get("phone") ? `Telefon: ${form.get("phone")}` : "",
      form.get("org") ? `Organisation: ${form.get("org")}` : "",
      "",
      String(form.get("message") ?? ""),
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-white p-6">
        <h2 className="text-xl">Anfrage vorbereitet</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Dein E-Mail-Programm sollte sich geöffnet haben. Alternativ: {company.email} oder {company.phone}. Es wird keine Nachricht serverseitig versendet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" htmlFor={`${intent}-first`}>
          <Input id={`${intent}-first`} name="first" required autoComplete="given-name" />
        </Field>
        <Field label="Nachname" htmlFor={`${intent}-last`}>
          <Input id={`${intent}-last`} name="last" required autoComplete="family-name" />
        </Field>
      </div>
      <Field label="E-Mail" htmlFor={`${intent}-email`}>
        <Input id={`${intent}-email`} name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Telefon" htmlFor={`${intent}-phone`}>
        <Input id={`${intent}-phone`} name="phone" type="tel" autoComplete="tel" />
      </Field>
      <Field label="Unternehmen / Verein" htmlFor={`${intent}-org`}>
        <Input id={`${intent}-org`} name="org" autoComplete="organization" />
      </Field>
      <Field label="Nachricht" htmlFor={`${intent}-message`}>
        <Textarea id={`${intent}-message`} name="message" required />
      </Field>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          className="mt-1"
          checked={privacy}
          onChange={(event) => setPrivacy(event.target.checked)}
          required
        />
        <span>
          Ich habe die{" "}
          <a className="underline" href="/datenschutz">
            Datenschutzerklärung
          </a>{" "}
          zur Kenntnis genommen.
        </span>
      </label>
      <Button type="submit">Anfrage per E-Mail vorbereiten</Button>
    </form>
  );
}
