export interface Location {
  /** URL-Slug, z. B. "balingen" -> /standorte/balingen */
  slug: string;
  /** Anzeigename, z. B. "Balingen" */
  name: string;
  /** Region/Landkreis für Fließtext & strukturierte Daten */
  region: string;
  /** Kurzer, ehrlicher Kontext-Satz zur Nähe zum Firmensitz (optional, für Lokalkolorit) */
  proximityNote?: string;
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
 * bei mehreren Stadt-Seiten mit sonst identischer Struktur.
 */
export const LOCATIONS: Location[] = [
  {
    slug: "balingen",
    name: "Balingen",
    region: "Zollernalbkreis, Baden-Württemberg",
    proximityNote: "nur wenige Kilometer von unserem Sitz in Haigerloch entfernt",
    localContext:
      "Balingen ist ein starker Mittelstandsstandort für Maschinenbau, Feinmechanik und Wägetechnik — geprägt von Unternehmen wie Bizerba und mehreren deutschen Weltmarktführern in Nischenbranchen wie Kreissägeblättern und Präzisionswerkzeugen.",
  },
  {
    slug: "hechingen",
    name: "Hechingen",
    region: "Zollernalbkreis, Baden-Württemberg",
    proximityNote: "in direkter Nachbarschaft zu unserem Sitz in Haigerloch",
    localContext:
      "Hechingen ist als „Medical Valley Hechingen“ bekannt — ein Kompetenznetzwerk mit über 60 Medizintechnik-Unternehmen, Zulieferern und Dienstleistern, eng verzahnt mit den Universitäten Tübingen und Stuttgart.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
