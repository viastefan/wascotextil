import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1600px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-end px-5 pb-12 pt-16 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="hero-in text-[11px] uppercase tracking-[0.28em] text-muted">
            Paderborn · die Textilveredler
          </p>
          <h1 className="hero-in-2 mt-6 max-w-[9ch] font-serif text-[52px] leading-[0.9] tracking-[-0.03em] sm:text-7xl lg:text-[96px]">
            Textilien.
            <br />
            Veredelt.
          </h1>
          <p className="hero-in-3 mt-8 max-w-md text-[17px] leading-8 text-muted">
            Profitiere von unserer Expertise im Textildruck, modernster Technik und langjähriger Erfahrung. Wir stehen für herausragende Qualität, exzellenten Service und absolute Zuverlässigkeit.
          </p>
          <div className="hero-in-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop">Shop öffnen</Button>
            <Button href="/individualisierung" variant="ghost">
              Motiv anfragen
            </Button>
          </div>
        </div>
        <div className="grid min-h-[520px] grid-cols-2 grid-rows-5 lg:min-h-full">
          <div className="relative col-span-2 row-span-3 overflow-hidden">
            <Image
              src="/studio/shirts.jpg"
              alt="Veredelte Shirts aus dem WASCOTEXTIL-Atelier"
              fill
              className="kenburns object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image src="/studio/yarn.jpg" alt="Farbenfrohe Garnpräsentation" fill className="object-cover transition duration-700 hover:scale-105" sizes="28vw" />
          </div>
          <div className="relative overflow-hidden">
            <Image src="/studio/colors.jpg" alt="Farbauswahl in der Textilveredelung" fill className="object-cover transition duration-700 hover:scale-105" sizes="28vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
