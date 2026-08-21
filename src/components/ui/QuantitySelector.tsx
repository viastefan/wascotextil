"use client";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 500,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex h-11 items-center overflow-hidden rounded-full border border-line bg-white">
      <button
        type="button"
        aria-label="Menge verringern"
        className="grid h-11 w-11 place-items-center text-lg hover:bg-paper-2"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <input
        aria-label="Menge"
        className="h-11 w-12 border-x border-line bg-transparent text-center text-sm tabular-nums"
        inputMode="numeric"
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/\D/g, ""));
          if (Number.isNaN(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
      />
      <button
        type="button"
        aria-label="Menge erhöhen"
        className="grid h-11 w-11 place-items-center text-lg hover:bg-paper-2"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
