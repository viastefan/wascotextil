import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/studio/shirts.jpg"
          alt="Veredelte Shirts aus dem WASCOTEXTIL-Atelier"
          fill
          priority
          className="kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,241,235,0.96)_0%,rgba(244,241,235,0.78)_42%,rgba(244,241,235,0.18)_72%,rgba(244,241,235,0.05)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(227,6,19,0.12),transparent_34%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1600px] items-end px-5 pb-14 pt-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-xl">
          <p className="hero-in text-[11px] uppercase tracking-[0.28em] text-muted">
            Paderborn · die Textilveredler
          </p>
          <h1 className="hero-in-2 mt-5 font-serif text-[56px] leading-[0.88] tracking-[-0.04em] sm:text-7xl lg:text-[104px]">
            <span className="block">WASCO</span>
            <span className="block text-red">TEXTIL</span>
          </h1>
          <p className="hero-in-3 mt-7 max-w-md text-[17px] leading-8 text-ink/70">
            Textilien. Veredelt. Expertise im Textildruck, präzise Technik und zuverlässiger Service — für Marke, Team und Verein.
          </p>
          <div className="hero-in-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop">Shop öffnen</Button>
            <Button href="/individualisierung" variant="ghost">
              Motiv anfragen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
