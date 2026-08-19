export function formatEuro(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function formatAddress() {
  return "Bahnhofstraße 72, 33102 Paderborn";
}
