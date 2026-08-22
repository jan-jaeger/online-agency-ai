/**
 * ============================================================
 * SEO-ÜBERSCHREIBUNGEN — hier trägst DU Title, Description und
 * Keywords für einzelne Seiten von Hand ein.
 * ============================================================
 *
 * WIE ES FUNKTIONIERT:
 * Jede Seite hat automatisch generierte Standard-Texte. Trägst du
 * hier für eine URL etwas ein, wird das automatisch generierte
 * Feld durch deinen Text ersetzt — nur für die Felder, die du
 * ausfüllst. Lässt du z. B. "keywords" weg, bleibt dort weiterhin
 * der automatische Wert stehen.
 *
 * WIE DU EINE ZEILE HINZUFÜGST:
 * 1. Den URL-Pfad als Schlüssel eintragen (siehe Beispiele unten,
 *    exakt wie in der Adresszeile, aber ohne die Domain davor)
 * 2. Nur die Felder ausfüllen, die du wirklich ändern willst
 * 3. Datei speichern, dann wie gewohnt: git add / commit / push
 *
 * BEISPIEL-PFADE:
 *   "/"                              -> Startseite
 *   "/seo-geo"                       -> die SEO&GEO-Landingpage
 *   "/standorte"                     -> Standort-Übersicht
 *   "/standorte/hechingen"           -> Übersicht für Hechingen
 *   "/standorte/hechingen/seo"       -> SEO in Hechingen
 *   "/standorte/hechingen/webdesign" -> Webdesign in Hechingen
 *   "/impressum"
 *   "/datenschutz"
 *
 * WICHTIG: "description" möglichst unter 155 Zeichen halten, sonst
 * schneidet Google sie in den Suchergebnissen mit "..." ab.
 * "keywords" ist optional — Google nutzt das Feld praktisch nicht
 * mehr fürs Ranking, andere Suchmaschinen teils noch.
 */

export interface SeoOverride {
  title?: string;
  description?: string;
  keywords?: string[];
}

interface SeoDefaults {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Wird von den einzelnen Seiten aufgerufen — prüft, ob für den
 * übergebenen Pfad eine Überschreibung existiert, und ersetzt nur
 * die Felder, die dort tatsächlich ausgefüllt wurden. Musst du
 * nicht anfassen, das läuft automatisch.
 */
export function applySeoOverride(path: string, defaults: SeoDefaults): SeoDefaults {
  const override = SEO_OVERRIDES[path];
  if (!override) return defaults;

  return {
    title: override.title ?? defaults.title,
    description: override.description ?? defaults.description,
    keywords: override.keywords ?? defaults.keywords,
  };
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
  // Beispiel (auskommentiert — zum Aktivieren die Kommentarzeichen
  // // entfernen und mit echten Werten befüllen):
  //
  // "/standorte/hechingen/seo": {
  //   title: "SEO Hechingen – dein individueller Titel",
  //   description: "Dein handgeschriebener Text für die Google-Vorschau, unter 155 Zeichen.",
  //   keywords: ["SEO Hechingen", "Suchmaschinenoptimierung Hechingen"],
  // },
};
