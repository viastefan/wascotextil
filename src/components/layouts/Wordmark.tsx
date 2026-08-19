import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`leading-none ${className}`} aria-label="WASCOTEXTIL Startseite">
      <span className="block font-sans text-[17px] font-semibold tracking-[0.02em] sm:text-[19px]">
        <span>WASCO</span>
        <span className="text-red">TEXTIL</span>
      </span>
      <span className="mt-0.5 block text-[9px] uppercase tracking-[0.22em] text-muted">
        die textilveredler
      </span>
    </Link>
  );
}
