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
  return <HeaderBar key={pathname} pathname={pathname} />;
}

function HeaderBar({ pathname }: { pathname: string }) {
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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-10">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menü</span>
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
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
                className={`text-[13px] tracking-[0.08em] uppercase ${active ? "text-red" : "text-ink/80 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center"
            aria-label="Suche"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="relative grid h-11 min-w-11 place-items-center px-1"
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

      {searchOpen ? (
        <form onSubmit={onSearch} className="border-t border-line bg-paper px-4 py-3 sm:px-6 lg:px-10">
          <label className="sr-only" htmlFor="site-search">
            Textilien suchen
          </label>
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Shirts, Hoodies, Stick, Jutebeutel…"
            className="h-12 w-full border-b border-ink bg-transparent text-lg outline-none placeholder:text-muted"
          />
        </form>
      ) : null}

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-paper px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-3xl tracking-tight">
                {item.label}
              </Link>
            ))}
            <Link href="/kontakt" className="text-3xl tracking-tight">
              Kontakt
            </Link>
            <Link href="/faq" className="pt-4 text-sm uppercase tracking-[0.16em] text-muted">
              FAQ
            </Link>
          </nav>
        </div>
      ) : null}
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
