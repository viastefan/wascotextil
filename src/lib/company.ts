export const company = {
  name: "WASCOTEXTIL",
  legalName: "WASCOTEXTIL GmbH",
  tagline: "die textilveredler",
  claim: "Textilveredelung — individuell und hochwertig",
  address: {
    street: "Bahnhofstraße 72",
    zip: "33102",
    city: "Paderborn",
    country: "Deutschland",
  },
  phone: "+49 5251 545 2071",
  phoneHref: "tel:+4952515452071",
  email: "info@wascotextil.de",
  founderEmail: "ws@wascotextil.de",
  hours: [
    { days: "Mo–Do", time: "09:00–13:00 und 14:00–17:00" },
    { days: "Fr", time: "09:00–13:00 und 14:00–16:00" },
  ],
  register: {
    court: "Amtsgericht Paderborn",
    number: "HRB 15580",
    taxNumber: "339/5848/3003",
    managingDirector: "Wassili Straus",
  },
  team: [
    {
      name: "Wasco Straus",
      role: "Leitung & Gründung",
      email: "ws@wascotextil.de",
      bio: "Der Allrounder. Er behält alles im Blick – von der Kundenberatung vor Ort und am Telefon über die Gestaltung und Druckaufbereitung am Computer bis hin zur präzisen Umsetzung an den Druckmaschinen und sorgfältigen Qualitätskontrolle. Und das stets mit guter Laune.",
    },
    {
      name: "Mareike Wulf",
      role: "Gestaltungstechnik",
    },
    {
      name: "Edgard Hois",
      role: "Werbedesign & IT",
    },
  ],
} as const;

export const priceDisclaimer =
  "Richtpreise zur Orientierung. Der verbindliche Endpreis folgt nach Abstimmung von Textil, Veredelung, Auflage und Motiv.";
