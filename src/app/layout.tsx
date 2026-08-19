import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Providers } from "@/components/Providers";
import { company } from "@/lib/company";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wascotextil.vercel.app"),
  title: {
    default: "WASCOTEXTIL — die Textilveredler",
    template: "%s — WASCOTEXTIL",
  },
  description:
    "Textilveredelung in Paderborn: Digitaldruck, Flex, Flock und Stick auf Shirts, Hoodies, Polos, Sweater und Taschen. Individuell und hochwertig.",
  openGraph: {
    title: "WASCOTEXTIL — die Textilveredler",
    description:
      "Textilien entdecken, konfigurieren und anfragen. Veredelung in Paderborn.",
    locale: "de_DE",
    type: "website",
    siteName: "WASCOTEXTIL",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <Providers>
          <a className="skip-link" href="#content">
            Zum Inhalt
          </a>
          <Header />
          <main id="content" className="min-h-[70vh]">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: company.legalName,
                image: "https://wascotextil.vercel.app/brand/logo.png",
                telephone: company.phone,
                email: company.email,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: company.address.street,
                  postalCode: company.address.zip,
                  addressLocality: company.address.city,
                  addressCountry: "DE",
                },
                url: "https://wascotextil.vercel.app",
                sameAs: ["https://www.wascotextil.de"],
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
