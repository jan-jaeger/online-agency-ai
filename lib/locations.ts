export interface Location {
  /** URL-Slug, z. B. "balingen" -> /standorte/balingen */
  slug: string;
  /** Anzeigename, z. B. "Balingen" */
  name: string;
  /** Region/Land für Fließtext & strukturierte Daten */
  region: string;
  /** Echter, recherchierter Branchenschwerpunkt vor Ort — macht den Content pro Stadt einzigartig statt templated */
  localContext?: string;
}

/**
 * Neue Stadt hinzufügen = neuer Eintrag hier. Für jede Stadt werden
 * automatisch alle Service-Kombinationen aus lib/services.ts als eigene
 * Seite unter /standorte/[stadt]/[service] erzeugt — keine weiteren
 * Schritte nötig.
 *
 * localContext bitte mit echten, recherchierten Fakten füllen (nicht
 * erfinden!) — das ist der wichtigste Hebel gegen Thin-/Duplicate-Content
 * bei mehreren Stadt-Seiten mit sonst identischer Struktur. Unter 155
 * Zeichen halten, sonst schneidet Google in den Suchergebnissen ab.
 */
export const LOCATIONS: Location[] = [
  {
    slug: "balingen",
    name: "Balingen",
    region: "Zollernalbkreis, Baden-Württemberg",
    localContext:
      "Balingen ist ein starker Mittelstandsstandort für Maschinenbau und Feinmechanik — geprägt von Unternehmen wie Bizerba.",
  },
  {
    slug: "hechingen",
    name: "Hechingen",
    region: "Zollernalbkreis, Baden-Württemberg",
    localContext:
      "Hechingen ist als „Medical Valley Hechingen“ bekannt — ein Kompetenznetzwerk mit über 60 Medizintechnik-Unternehmen und Zulieferern.",
  },
  {
    slug: "mallorca",
    name: "Mallorca",
    region: "Balearen, Spanien",
    localContext:
      "Mallorcas Wirtschaft lebt vom Tourismus – über 13 Mio. Gäste jährlich, viele deutschsprachig. Genau diese Branchen profitieren von starker Sichtbarkeit.",
  },
  {
    slug: "suedtirol",
    name: "Südtirol",
    region: "Autonome Provinz Bozen, Italien",
    localContext:
      "Südtirol verzeichnete 2025 ein Rekordjahr mit über 38 Mio. Übernachtungen – Fokus auf Qualität statt Masse. Dafür braucht es hochwertige digitale Präsenz.",
  },
  {
    slug: "sylt",
    name: "Sylt",
    region: "Nordfriesland, Schleswig-Holstein",
    localContext:
      "Sylts Wirtschaft ist fast vollständig vom Tourismus geprägt – exklusives Reiseziel mit hohem Anspruch an digitale Präsenz von Hotellerie und Gastronomie.",
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "Vereinigte Arabische Emirate",
    localContext:
      "Dubais Wirtschaft hat sich vom Öl gelöst – nur noch 5% des BIP, Fokus auf Handel, Tourismus, Technologie. Business-Hub zwischen Europa und Asien.",
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    region: "Vereinigte Arabische Emirate",
    localContext:
      "Abu Dhabis Nicht-Öl-Sektor erreichte 2025 mit 56,2% BIP-Anteil einen Rekordwert – starkes Wachstum bei Fintech und Cleantech, mit staatlicher Förderung.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
