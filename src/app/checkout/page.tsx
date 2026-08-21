"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { company, priceDisclaimer } from "@/lib/company";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";

type Status = "idle" | "ready" | "empty";

export default function CheckoutPage() {
  const { items, getTotal, getItemCount, hydrated } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [privacy, setPrivacy] = useState(false);

  const body = useMemo(() => {
    const lines = items.map(
      (item) =>
        `- ${item.quantity}× ${item.name} · ${item.colorName} · ${item.size} · ${item.finishingName}${item.note ? ` · ${item.note}` : ""} · ${formatEuro(item.unitPrice * item.quantity)}`,
    );
    return [
      "Bestellanfrage WASCOTEXTIL",
      "",
      ...lines,
      "",
      `Richtpreis gesamt: ${formatEuro(getTotal())}`,
      `${getItemCount()} Stück`,
      "",
      "Hinweis: Dies ist eine Anfrage, keine Zahlung.",
    ].join("\n");
  }, [items, getTotal, getItemCount]);

  if (!hydrated) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-muted">Checkout wird geladen…</div>;
  }

  if (items.length === 0 && status !== "ready") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-4xl">Keine Positionen</h1>
        <p className="mt-4 text-muted">Lege zuerst Textilien in den Warenkorb.</p>
        <Button href="/shop" className="mt-6">
          Zum Shop
        </Button>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!privacy) return;
    const form = new FormData(event.currentTarget);
    const first = String(form.get("first") ?? "");
    const last = String(form.get("last") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const org = String(form.get("org") ?? "");
    const message = String(form.get("message") ?? "");
    const composed = [
      `Name: ${first} ${last}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : "",
      org ? `Organisation: ${org}` : "",
      message ? `Nachricht: ${message}` : "",
      "",
      body,
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${company.email}?subject=${encodeURIComponent("Bestellanfrage WASCOTEXTIL")}&body=${encodeURIComponent(composed)}`;
    window.location.href = mailto;
    setStatus("ready");
  }

  return (
    <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-20">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Bestellanfrage</h1>
        <p className="mt-4 max-w-xl text-muted">
          Es wird keine Zahlung online durchgeführt. Du sendest eine Anfrage. Wir prüfen Textil, Motiv und Auflage und bestätigen den Auftrag gesondert.
        </p>

        {status === "ready" ? (
          <div className="mt-10 rounded-[28px] border border-line bg-white p-6">
            <h2 className="text-xl">Anfrage vorbereitet</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Dein E-Mail-Programm sollte sich mit der Bestellanfrage an {company.email} geöffnet haben. Falls nicht, schreib uns direkt oder ruf an unter {company.phone}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${company.email}`}>E-Mail öffnen</Button>
              <Button href={company.phoneHref} variant="ghost">
                Anrufen
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Vorname" htmlFor="first">
                <Input id="first" name="first" required autoComplete="given-name" />
              </Field>
              <Field label="Nachname" htmlFor="last">
                <Input id="last" name="last" required autoComplete="family-name" />
              </Field>
            </div>
            <Field label="E-Mail" htmlFor="email">
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>
            <Field label="Telefon" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" autoComplete="tel" />
            </Field>
            <Field label="Unternehmen / Verein" htmlFor="org" hint="optional">
              <Input id="org" name="org" autoComplete="organization" />
            </Field>
            <Field label="Nachricht" htmlFor="message">
              <Textarea id="message" name="message" placeholder="Termin, Dateiformat, Abholung in Paderborn…" />
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
            <Button type="submit" disabled={!privacy}>
              Anfrage per E-Mail vorbereiten
            </Button>
          </form>
        )}
      </div>

      <aside className="h-fit rounded-[28px] border border-line bg-white/80 p-6 backdrop-blur-sm">
        <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">Zusammenfassung</h2>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.key} className="flex justify-between gap-4 text-sm">
              <span>
                {item.quantity}× {item.name}
                <span className="mt-1 block text-xs text-muted">
                  {item.colorName} · {item.size} · {item.finishingName}
                </span>
              </span>
              <span className="tabular-nums">{formatEuro(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-line pt-4">
          <span>Richtpreis</span>
          <span className="text-lg tabular-nums">{formatEuro(getTotal())}</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">{priceDisclaimer}</p>
      </aside>
    </div>
  );
}
