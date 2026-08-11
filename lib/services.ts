export interface ServiceDef {
  /** URL-Slug, z. B. "seo" -> /standorte/balingen/seo */
  slug: string;
  /** Vollständiger Name, z. B. "SEO & GEO" */
  name: string;
  /** Kurzform für Sätze wie "{shortName} in {Stadt}", z. B. "Suchmaschinenoptimierung" */
  shortName: string;
  /** Badge-Text im Hero */
  badgeText: string;
  /** Freitext-Baustein für die Kurzbeschreibung — bekommt Stadtname übergeben */
  description: (cityName: string) => string;
  /** Meta-Keywords für die Standort-Seite — bekommt Stadtname übergeben */
  keywords: (cityName: string) => string[];
}

/**
 * Neuen Service hinzufügen = neuer Eintrag hier. Erscheint danach für
 * jede Stadt aus lib/locations.ts automatisch als eigene Seite.
 */
export const SERVICES: ServiceDef[] = [
  {
    slug: "seo",
    name: "SEO & GEO",
    shortName: "Suchmaschinenoptimierung",
    badgeText: "Kostenlose SEO & GEO-Analyse in 30 Sek.",
    description: (city) =>
      `Sichtbarkeit bei Google und in KI-Suchsystemen wie ChatGPT für Unternehmen in ${city} — von der technischen Analyse bis zur laufenden Betreuung.`,
    keywords: (city) => [
      `SEO ${city}`,
      `Suchmaschinenoptimierung ${city}`,
      `SEO Agentur ${city}`,
      `GEO ${city}`,
      `KI-Suchmaschinenoptimierung ${city}`,
      `Google Ranking ${city}`,
    ],
  },
  {
    slug: "webdesign",
    name: "Webdesign & High-Speed-Pages",
    shortName: "Webdesign",
    badgeText: "Kostenlose Website-Analyse in 30 Sek.",
    description: (city) =>
      `Moderne, blitzschnelle Websites für Unternehmen in ${city} — von der Analyse bis zur schlüsselfertigen Umsetzung durch deinen Ansprechpartner.`,
    keywords: (city) => [
      `Webdesign ${city}`,
      `Webdesigner ${city}`,
      `Website erstellen ${city}`,
      `Homepage erstellen ${city}`,
      `Webagentur ${city}`,
    ],
  },
  {
    slug: "sea",
    name: "SEA & Performance Marketing",
    shortName: "Google Ads",
    badgeText: "Kostenlose Kampagnen-Analyse in 30 Sek.",
    description: (city) =>
      `Bezahlte Kampagnen, die für Unternehmen in ${city} wirklich konvertieren — von der Erstanalyse bis zur laufenden Kampagnenbetreuung.`,
    keywords: (city) => [
      `Google Ads ${city}`,
      `SEA Agentur ${city}`,
      `Werbeanzeigen ${city}`,
      `Performance Marketing ${city}`,
      `Online Marketing Agentur ${city}`,
    ],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce & Shopsysteme",
    shortName: "Onlineshop-Optimierung",
    badgeText: "Kostenlose Shop-Analyse in 30 Sek.",
    description: (city) =>
      `Onlineshops, die verkaufen — für Händler in ${city}, von der technischen Analyse bis zur vollständigen Umsetzung.`,
    keywords: (city) => [
      `Onlineshop ${city}`,
      `E-Commerce Agentur ${city}`,
      `Shopsystem ${city}`,
      `Onlineshop erstellen ${city}`,
      `E-Commerce Beratung ${city}`,
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
