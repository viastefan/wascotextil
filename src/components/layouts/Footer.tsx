import Link from "next/link";
import { company } from "@/lib/company";

const shop = [
  { href: "/shop/t-shirts", label: "T-Shirts" },
  { href: "/shop/hoodies", label: "Hoodies" },
  { href: "/shop/polos", label: "Polos" },
  { href: "/shop/sweater", label: "Sweater" },
  { href: "/shop/taschen", label: "Taschen" },
  { href: "/shop/caps", label: "Caps" },
];

const companyLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/b2b", label: "Unternehmen & Vereine" },
  { href: "/individualisierung", label: "Individualisierung" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-white/60">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div>
          <p className="text-[17px] font-semibold tracking-[0.04em]">
            WASCO<span className="text-red">TEXTIL</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
            Textilveredelung in Paderborn. Digitaldruck, Flex, Flock und Stick — individuell und hochwertig.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            {shop.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 transition hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Unternehmen</p>
          <ul className="mt-4 space-y-2 text-sm">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 transition hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Atelier</p>
          <p className="mt-4 text-sm leading-7">
            {company.address.street}
            <br />
            {company.address.zip} {company.address.city}
          </p>
          <p className="mt-4 text-sm">
            <a className="text-ink/70 transition hover:text-ink" href={company.phoneHref}>
              {company.phone}
            </a>
            <br />
            <a className="text-ink/70 transition hover:text-ink" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {company.hours.map((item) => (
              <li key={item.days}>
                {item.days}: {item.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} {company.legalName}</p>
          <div className="flex gap-5">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
