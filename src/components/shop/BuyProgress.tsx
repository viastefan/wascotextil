import Link from "next/link";

const steps = [
  { id: 1, label: "Konfigurieren", href: "/shop" },
  { id: 2, label: "Warenkorb", href: "/warenkorb" },
  { id: 3, label: "Anfrage", href: "/checkout" },
] as const;

export function BuyProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Kaufprozess" className="mb-8">
      <ol className="flex items-center gap-2 sm:gap-3">
        {steps.map((item, index) => {
          const active = item.id === step;
          const done = item.id < step;
          return (
            <li key={item.id} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <Link
                href={item.href}
                className={`flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition sm:px-4 ${
                  active
                    ? "bg-ink text-white"
                    : done
                      ? "bg-white text-ink"
                      : "bg-white/50 text-muted"
                }`}
              >
                <span className="tabular-nums">{item.id}</span>
                <span className="truncate">{item.label}</span>
              </Link>
              {index < steps.length - 1 ? (
                <span className={`hidden h-px flex-1 sm:block ${done ? "bg-ink/30" : "bg-line"}`} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
