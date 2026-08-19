export type CategorySlug =
  | "t-shirts"
  | "hoodies"
  | "polos"
  | "sweater"
  | "taschen"
  | "caps";

export type SizeId = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export type FinishingId =
  | "ohne"
  | "digitaldruck"
  | "flex"
  | "flock"
  | "stick";

export type Silhouette = "tee" | "hoodie" | "polo" | "sweater" | "bag" | "cap";

export type Color = {
  id: string;
  name: string;
  hex: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string;
  price: number;
  images: ProductImage[];
  category: CategorySlug;
  silhouette: Silhouette;
  sizes: SizeId[];
  colors: Color[];
  materials: string[];
  available: boolean;
  customizable: boolean;
  printing: boolean;
  embroidery: boolean;
  featured?: boolean;
  metadata: {
    origin: "catalog";
    supplierNote?: string;
  };
};

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const colors = {
  white: { id: "white", name: "Weiß", hex: "#F4F1EC" },
  black: { id: "black", name: "Schwarz", hex: "#161412" },
  navy: { id: "navy", name: "Navy", hex: "#1B2A4A" },
  red: { id: "red", name: "Rot", hex: "#E30613" },
  grey: { id: "grey", name: "Grau meliert", hex: "#9A958C" },
  forest: { id: "forest", name: "Forest", hex: "#2F4A3C" },
  sand: { id: "sand", name: "Sand", hex: "#D7C7A8" },
  royal: { id: "royal", name: "Royal", hex: "#2B4C9B" },
} as const;

const apparelSizes: SizeId[] = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const bagSizes: SizeId[] = ["M"];
const capSizes: SizeId[] = ["S", "M", "L"];

export const categories: Category[] = [
  {
    slug: "t-shirts",
    name: "T-Shirts",
    tagline: "individuell und stylisch",
    description:
      "Shirts für Alltag, Team und Marke. Qualität, Tragekomfort und Langlebigkeit stehen an erster Stelle.",
    image: "/studio/shirts.jpg",
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    tagline: "cool und stilsicher",
    description:
      "Hoodies für Vereine, Unternehmen und private Projekte — vorbereitet für Druck oder Stick.",
    image: "/studio/fabric.jpg",
  },
  {
    slug: "polos",
    name: "Polos",
    tagline: "vielseitig und schick",
    description:
      "Polos für Empfang, Service, Events und Teams mit ruhiger, klarer Präsenz.",
    image: "/studio/collar.jpg",
  },
  {
    slug: "sweater",
    name: "Sweater",
    tagline: "immer bequem",
    description:
      "Sweater für kühle Tage und ruhige Markenauftritte — bequem und langlebig.",
    image: "/studio/yarn.jpg",
  },
  {
    slug: "taschen",
    name: "Taschen",
    tagline: "praktisch und markenfördernd",
    description:
      "Jutebeutel und Taschen als Träger für Motiv, Logo und Anlass.",
    image: "/studio/colors.jpg",
  },
  {
    slug: "caps",
    name: "Caps",
    tagline: "kompakt und sichtbar",
    description:
      "Caps aus dem erweiterten Katalog. Weitere Modelle auf Anfrage, inklusive HAKRO.",
    image: "/studio/shirts-detail.jpg",
  },
];

export const finishingOptions: {
  id: FinishingId;
  name: string;
  summary: string;
  details: string[];
  surcharge: number;
}[] = [
  {
    id: "ohne",
    name: "Ohne Veredelung",
    summary: "Textil unbedruckt",
    details: ["Nur das Textil, ohne Motiv."],
    surcharge: 0,
  },
  {
    id: "digitaldruck",
    name: "Digitaldruck",
    summary: "für komplexe Motive",
    details: [
      "Für komplexe Motive geeignet",
      "Vielzahl von Farben in einem Druck möglich",
      "Für Textilien aus Baumwolle",
    ],
    surcharge: 850,
  },
  {
    id: "flex",
    name: "Flexdruck",
    summary: "gestochen scharf",
    details: [
      "Für gestochen scharfe Farben und Texte",
      "Besonders geeignet für Motive und Logos mit maximal drei Farben",
      "Veredelung auf vielen Arten von Textilien möglich",
    ],
    surcharge: 600,
  },
  {
    id: "flock",
    name: "Flockdruck",
    summary: "mit haptischer Fläche",
    details: [
      "Samtige, erhabene Oberfläche",
      "Besonders geeignet für Logos und Schriftzüge",
      "Langlebig bei richtiger Pflege",
    ],
    surcharge: 650,
  },
  {
    id: "stick",
    name: "Stick",
    summary: "besonders edel und langlebig",
    details: [
      "Besonders edel und langlebig",
      "Für kleinere Stückzahlen",
      "Ideal für Polos, Caps und Arbeitskleidung",
    ],
    surcharge: 1200,
  },
];

export const products: Product[] = [
  {
    id: "classic-t-shirt",
    slug: "classic-t-shirt",
    name: "T-Shirt Classic",
    description: "Das Grundtextil für Motiv, Logo und Team.",
    details:
      "Klassisches Kurzarm-Shirt aus dem WASCOTEXTIL-Sortiment. Geeignet für Digitaldruck, Flex, Flock und — je nach Motiv — Stick. Weitere Qualitäten und HAKRO-Modelle auf Anfrage.",
    price: 1290,
    images: [
      { src: "/studio/shirts.jpg", alt: "Veredelte Shirts aus dem WASCOTEXTIL-Atelier" },
      { src: "/studio/shirts-detail.jpg", alt: "Shirt-Details aus der Produktion" },
      { src: "/studio/colors.jpg", alt: "Farbauswahl in der Textilveredelung" },
    ],
    category: "t-shirts",
    silhouette: "tee",
    sizes: apparelSizes,
    colors: [colors.white, colors.black, colors.navy, colors.red, colors.grey, colors.forest, colors.sand, colors.royal],
    materials: ["Baumwolle"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    featured: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "heavy-t-shirt",
    slug: "heavy-t-shirt",
    name: "T-Shirt Heavy",
    description: "Schwereres Shirt für häufige Einsätze und kräftige Drucke.",
    details:
      "Stabileres T-Shirt mit mehr Substanz — oft die bessere Basis für Vereine, Events und wiederkehrende Nutzung. Veredelung nach Motiv und Auflage.",
    price: 1590,
    images: [
      { src: "/studio/shirts-detail.jpg", alt: "Schwere Shirts in der Produktion" },
      { src: "/studio/fabric.jpg", alt: "Stoffqualität in der Werkstatt" },
    ],
    category: "t-shirts",
    silhouette: "tee",
    sizes: apparelSizes,
    colors: [colors.white, colors.black, colors.navy, colors.grey, colors.forest],
    materials: ["Baumwolle"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "organic-t-shirt",
    slug: "organic-t-shirt",
    name: "T-Shirt Organic",
    description: "Nachhaltiges Shirt aus zertifizierter Baumwolle.",
    details:
      "WASCOTEXTIL bietet eine Auswahl an nachhaltigen Textilien aus zertifizierter Baumwolle. Dieses Shirt ist der Katalogeinstieg dafür. Konkrete Zertifikate und verfügbare Farben stimmen wir vor der Produktion ab.",
    price: 1890,
    images: [
      { src: "/studio/yarn.jpg", alt: "Garn und Material in der Textilwerkstatt" },
      { src: "/studio/shirts.jpg", alt: "Shirts aus dem Atelier" },
    ],
    category: "t-shirts",
    silhouette: "tee",
    sizes: apparelSizes,
    colors: [colors.white, colors.black, colors.sand, colors.forest, colors.navy],
    materials: ["Zertifizierte Baumwolle"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    featured: true,
    metadata: { origin: "catalog", supplierNote: "Nachhaltige Qualitäten auf Anfrage" },
  },
  {
    id: "basic-hoodie",
    slug: "basic-hoodie",
    name: "Hoodie",
    description: "Der Hoodie für Teams, Marken und kühle Tage.",
    details:
      "Kapuzenpullover aus dem Sortiment — cool und stilsicher, vorbereitet für Druck oder Stick. Weitere Schnitte und HAKRO-Hoodies auf Anfrage.",
    price: 3490,
    images: [
      { src: "/studio/fabric.jpg", alt: "Stoffqualität für Hoodies" },
      { src: "/studio/yarn.jpg", alt: "Garnfarben in der Werkstatt" },
    ],
    category: "hoodies",
    silhouette: "hoodie",
    sizes: apparelSizes,
    colors: [colors.black, colors.navy, colors.grey, colors.forest, colors.sand, colors.red],
    materials: ["Baumwollmischung"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    featured: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "zip-hoodie",
    slug: "zip-hoodie",
    name: "Zip-Hoodie",
    description: "Offener Hoodie für Alltag und Arbeitsumfeld.",
    details:
      "Hoodie mit durchgehendem Reißverschluss. Gut geeignet, wenn das Textil über anderer Kleidung getragen wird — etwa im Verein oder im Betrieb.",
    price: 3890,
    images: [
      { src: "/studio/fabric.jpg", alt: "Textile Flächen für Hoodies" },
      { src: "/studio/colors.jpg", alt: "Farbauswahl" },
    ],
    category: "hoodies",
    silhouette: "hoodie",
    sizes: apparelSizes,
    colors: [colors.black, colors.navy, colors.grey, colors.sand],
    materials: ["Baumwollmischung"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "classic-polo",
    slug: "classic-polo",
    name: "Polo",
    description: "Vielseitig und schick — oft mit Stick.",
    details:
      "Polo für Empfang, Service, Events und einheitliche Teams. Stick ist hier häufig die edlere Veredelung; Druck bleibt je nach Motiv möglich.",
    price: 2290,
    images: [
      { src: "/studio/collar.jpg", alt: "Kragen- und Polo-Details" },
      { src: "/studio/shirts.jpg", alt: "Veredelte Textilien" },
    ],
    category: "polos",
    silhouette: "polo",
    sizes: apparelSizes,
    colors: [colors.white, colors.black, colors.navy, colors.red, colors.royal, colors.forest],
    materials: ["Baumwollpiqué"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    featured: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "crewneck-sweater",
    slug: "crewneck-sweater",
    name: "Sweater",
    description: "Immer bequem — ruhige Fläche für Motiv oder Stick.",
    details:
      "Rundhals-Sweater aus dem Sortiment. Eine klare Fläche für Veredelung, ohne Kapuze, mit ruhigem Auftritt.",
    price: 2790,
    images: [
      { src: "/studio/yarn.jpg", alt: "Garnfarben für Sweater" },
      { src: "/studio/fabric.jpg", alt: "Stoffqualität" },
    ],
    category: "sweater",
    silhouette: "sweater",
    sizes: apparelSizes,
    colors: [colors.black, colors.navy, colors.grey, colors.sand, colors.forest],
    materials: ["Baumwollmischung"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "jutebeutel",
    slug: "jutebeutel",
    name: "Jutebeutel",
    description: "Praktisch und markenfördernd.",
    details:
      "Jutebeutel für Events, Handel und Alltag. Eine große Druckfläche, die Marke und Anlass sichtbar macht.",
    price: 690,
    images: [
      { src: "/studio/colors.jpg", alt: "Farbige Textilien und Beutel" },
      { src: "/studio/fabric.jpg", alt: "Textile Materialien" },
    ],
    category: "taschen",
    silhouette: "bag",
    sizes: bagSizes,
    colors: [colors.sand, colors.black, colors.navy, colors.red],
    materials: ["Jute"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: false,
    featured: true,
    metadata: { origin: "catalog" },
  },
  {
    id: "cap",
    slug: "cap",
    name: "Cap",
    description: "Kompakte Fläche für Stick oder Druck.",
    details:
      "Cap aus dem erweiterten Katalog. Caps gehören nicht zum Kernset der Startseite, sind aber Teil der weiteren Textilien, die WASCOTEXTIL veredelt. Passform und Modell stimmen wir vor der Produktion ab.",
    price: 1290,
    images: [
      { src: "/studio/shirts-detail.jpg", alt: "Details aus der Textilproduktion" },
      { src: "/studio/collar.jpg", alt: "Nähte und Verarbeitung" },
    ],
    category: "caps",
    silhouette: "cap",
    sizes: capSizes,
    colors: [colors.black, colors.navy, colors.red, colors.sand, colors.white],
    materials: ["Baumwolltwill"],
    available: true,
    customizable: true,
    printing: true,
    embroidery: true,
    metadata: { origin: "catalog", supplierNote: "Modell nach Verfügbarkeit" },
  },
];

export const volumeTiers = [
  { min: 1, max: 9, factor: 1, label: "1–9" },
  { min: 10, max: 24, factor: 0.92, label: "10–24" },
  { min: 25, max: 49, factor: 0.85, label: "25–49" },
  { min: 50, max: Infinity, factor: 0.78, label: "50+" },
] as const;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(category: string, slug: string) {
  return products.find(
    (product) => product.category === category && product.slug === slug,
  );
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getFinishing(id: FinishingId) {
  return finishingOptions.find((option) => option.id === id) ?? finishingOptions[0];
}

export function getVolumeFactor(quantity: number) {
  return volumeTiers.find((tier) => quantity >= tier.min && quantity <= tier.max)?.factor ?? 1;
}

export function unitPrice(product: Product, finishing: FinishingId, quantity: number) {
  const surcharge = getFinishing(finishing).surcharge;
  const factor = getVolumeFactor(quantity);
  return Math.round((product.price + surcharge) * factor);
}

export function lineTotal(product: Product, finishing: FinishingId, quantity: number) {
  return unitPrice(product, finishing, quantity) * quantity;
}

export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;
  return products.filter((product) => {
    const category = getCategory(product.category);
    return [product.name, product.description, product.details, category?.name, category?.tagline, ...product.materials]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
}
