"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Wordmark } from "@/components/layouts/Wordmark";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/individualisierung", label: "Individualisierung" },
  { href: "/b2b", label: "B2B" },
  { href: "/ueber-uns", label: "Über uns" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <HeaderBar key={pathname} pathname={pathname} scrolled={scrolled} />;
}

function HeaderBar({ pathname, scrolled }: { pathname: string; scrolled: boolean }) {
  const router = useRouter();
  const { getItemCount, openCart, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const count = hydrated ? getItemCount() : 0;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/shop?q=${encodeURIComponent(next)}` : "/shop");
    setSearchOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background,border-color] duration-500 ${
        scrolled ? "border-line/80 bg-paper/80 backdrop-blur-xl" : "border-transparent bg-paper/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8 lg:px-12">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/60 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menü</span>
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-ink transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-ink transition duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>

        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={`nav-link text-[12px] tracking-[0.16em] uppercase ${active ? "text-ink" : "text-ink/55 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/70"
            aria-label="Suche"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="relative grid h-11 min-w-11 place-items-center rounded-full px-1 hover:bg-white/70"
            aria-label={`Warenkorb, ${count} Artikel`}
            onClick={openCart}
          >
            <BagIcon />
            <span className="absolute right-0.5 top-1.5 min-w-4 rounded-full bg-red px-1 text-center text-[10px] leading-4 text-white">
              {count}
            </span>
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ${searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
        <form onSubmit={onSearch} className="border-t border-line/70 bg-paper/90 px-5 py-4 sm:px-8 lg:px-12">
          <label className="sr-only" htmlFor="site-search">
            Textilien suchen
          </label>
          <input
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Shirts, Hoodies, Stick, Jutebeutel…"
            className="h-12 w-full border-b border-ink/20 bg-transparent text-xl outline-none placeholder:text-muted/70"
          />
        </form>
      </div>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-paper/95 px-6 py-10 backdrop-blur-xl transition duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="font-serif text-4xl tracking-tight">
              {item.label}
            </Link>
          ))}
          <Link href="/kontakt" className="font-serif text-4xl tracking-tight">
            Kontakt
          </Link>
          <Link href="/faq" className="pt-6 text-sm uppercase tracking-[0.18em] text-muted">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.2 12.2 16 16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 6h10l-.8 9H4.8z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 6V4.8A2 2 0 0 1 9 2.8 2 2 0 0 1 11 4.8V6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
