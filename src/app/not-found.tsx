import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl">Seite nicht gefunden</h1>
      <p className="mt-4 text-muted">Diese Adresse gibt es im Shop nicht. Zurück zur Übersicht oder zum Atelier.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Start</Button>
        <Button href="/shop" variant="ghost">
          Shop
        </Button>
      </div>
    </div>
  );
}
