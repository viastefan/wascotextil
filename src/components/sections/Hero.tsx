import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Paderborn · die Textilveredler</p>
            <h1 className="mt-6 max-w-xl font-serif text-[42px] leading-[0.95] tracking-tight sm:text-6xl lg:text-[84px]">
              Textilien.
              <br />
              Veredelt.
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-7 text-muted">
              Profitiere von unserer Expertise im Textildruck, modernster Technik und langjähriger Erfahrung. Wir stehen für herausragende Qualität, exzellenten Service und absolute Zuverlässigkeit.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop">Shop öffnen</Button>
            <Button href="/individualisierung" variant="ghost">
              Motiv anfragen
            </Button>
          </div>
        </div>
        <div className="grid min-h-[420px] grid-cols-2 grid-rows-2 border-t border-line lg:min-h-full lg:border-l lg:border-t-0">
          <div className="relative col-span-2">
            <Image src="/studio/shirts.jpg" alt="Veredelte Shirts aus dem WASCOTEXTIL-Atelier" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="relative border-t border-r border-line">
            <Image src="/studio/yarn.jpg" alt="Farbenfrohe Garnpräsentation" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative border-t border-line">
            <Image src="/studio/colors.jpg" alt="Farbauswahl in der Textilveredelung" fill className="object-cover" sizes="25vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
