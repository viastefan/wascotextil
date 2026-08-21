import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Seite nicht gefunden</h1>
      <p className="mt-4 text-[16px] leading-7 text-muted">
        Diese Adresse gibt es im Shop nicht. Zurück zur Übersicht oder zum Atelier.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Start</Button>
        <Button href="/shop" variant="ghost">
          Shop
        </Button>
      </div>
    </div>
  );
}
