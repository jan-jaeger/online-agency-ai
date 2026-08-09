# online-Agency.ai — Landingpage

Hochmoderne, konvertierende Landingpage im Dark-Mode / Neongrün-Design,
gebaut mit Next.js 14 (App Router), TypeScript und Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Die Seite läuft danach unter `http://localhost:3000`.

## Struktur

```
app/
  layout.tsx          — Root-Layout, Fonts, vollständige Metadata API, JSON-LD
  page.tsx             — Setzt alle Sections zusammen
  robots.ts            — Generiert /robots.txt
  sitemap.ts           — Generiert /sitemap.xml
  globals.css          — Grid-Pattern, Custom-Cursor-Logik, Glow-Utilities
  api/analyze/route.ts — Echte Server-Route: ruft eine URL ab und prüft sie
  impressum/page.tsx    — Platzhalter-Rechtsseite
  datenschutz/page.tsx — Platzhalter-Rechtsseite

components/
  JsonLd.tsx              — Strukturierte Daten: ProfessionalService + FAQPage
  CustomCursor.tsx      — Client-Component: individueller Cursor + Aura
  MouseGlow.tsx          — Client-Component: dezenter Maus-Spotlight im Hintergrund
  Header.tsx            — Sticky Navigation mit Scroll-Spy
  GridBackground.tsx    — Wiederverwendbarer Tech-Grid-Hintergrund
  Hero.tsx              — Hero-Section inkl. Badge, H1-Headline, CTAs, Trust-Badges
  AnalysisTerminal.tsx  — Animiertes (simuliertes) Terminal-Signature-Element im Hero
  ServiceMarquee.tsx     — Endlos-Ticker-Band mit den vier Leistungsbereichen
  LiveAnalyzerSection.tsx — Section-Wrapper für die echte Live-Analyse
  LiveAnalyzer.tsx        — Echtes Formular, ruft /api/analyze auf (kein Fake)
  ExpertBadge.tsx          — Neongrünes Ansprechpartner-Icon (statt Foto)
  ComparisonMatrix.tsx  — 3-Karten-Vergleich (KI vs. Agentur vs. Hybrid)
  FunnelSection.tsx      — Section-Wrapper für das Formular
  FunnelForm.tsx         — 4-Schritte-Funnel mit Fortschrittsbalken
  ChatDemoSection.tsx    — Section-Wrapper für die simulierte Chat-Demo
  ChatDemo.tsx            — Simulierter (skriptierter) KI-Chat mit Human-Handoff
  FAQ.tsx                 — Akkordeon (Fragen als <h3>, Daten aus lib/faq.ts)
  Footer.tsx               — Footer mit Impressum/Datenschutz-Links

lib/
  types.ts               — Typen für das Funnel-Payload
  submitFunnel.ts         — Platzhalter-Funktion für den Make.com-Webhook
  faq.ts                  — Zentrale FAQ-Daten (Quelle für UI + JSON-LD)

## SEO & GEO Setup

**Metadata API** (`app/layout.tsx`): Title/Description exakt wie spezifiziert,
inkl. Title-Template (`%s | online-Agency.ai`) für Unterseiten, vollständiges
OpenGraph- und Twitter-Card-Setup, `robots`-Direktiven, `canonical`-Alternates
und Keywords. Impressum/Datenschutz haben eigene, ins Template greifende
Titel + Canonicals.

**Semantische Struktur:** Genau ein `<h1>` (Hero-Headline), alle Section-Titel
als `<h2>`, Unterebenen (Karten, Funnel-Schritte, FAQ-Fragen) als `<h3>` — FAQ
folgt dabei bewusst dem WAI-ARIA-Accordion-Pattern (`<h3><button
aria-expanded>…</button></h3>`, nicht umgekehrt). Rein dekorative Glyphen
(✓, ×, →) sind `aria-hidden`, damit Screenreader sie nicht vorlesen. Es gibt
aktuell keine `<img>`-Elemente im Projekt (bewusst Icons/Illustrationen statt
Fotos) — das einzige SVG (`ExpertBadge.tsx`) ist dekorativ und korrekt
`aria-hidden`, da der Name ("Jan J.") immer als sichtbarer Text daneben steht.

**JSON-LD** (`components/JsonLd.tsx`): Ein `@graph` mit zwei Typen:
- `ProfessionalService` (zusätzlich mit `MarketingAgency` als zweitem
  `@type` — kein offizieller schema.org-Typ, aber wie gewünscht ergänzt)
  mit Name, URL, Ansprechpartner (`employee`: Jan J.) und allen vier
  Leistungen über `makesOffer`.
- `FAQPage`, deren Fragen/Antworten direkt aus `lib/faq.ts` gezogen werden —
  dieselbe Quelle, die auch das sichtbare FAQ-Akkordeon speist, damit UI und
  strukturierte Daten nie auseinanderlaufen.

**robots.ts / sitemap.ts**: Next.js generiert daraus automatisch
`/robots.txt` und `/sitemap.xml`. `/api/` ist für Crawler gesperrt.

### Noch offen (bewusst nicht automatisch erledigt)

- **`/public/og-image.png`** (1200×630) fehlt als echte Bilddatei — die
  Metadata verweist bereits korrekt darauf, aber ohne Asset zeigen
  Social-Media-Vorschauen aktuell kein Bild. Gleiches gilt für `favicon.ico`.
- Domain in allen Dateien ist `https://online-agency.ai` — bei Bedarf global
  ersetzen, falls die echte Domain abweicht.


## Was ist echt, was ist Demo?

Nicht alles auf der Seite ist eine echte Funktion — und das ist bewusst so
getrennt, damit klar bleibt, was tatsächlich passiert:

| Element | Status |
| --- | --- |
| **"Teste die KI-Analyse live"**-Section (`LiveAnalyzer.tsx`) | ✅ **Echt.** Ruft `/api/analyze` auf, der Server holt die eingegebene URL wirklich ab und wertet HTML/Antwortzeit aus. |
| Hero-Terminal (`AnalysisTerminal.tsx`) | 🎭 Simuliert — feste Textzeilen mit `setTimeout`, dient als visuelles Signature-Element. |
| Chat-Widget (`ChatDemo.tsx`) | 🎭 Simuliert — festes Gesprächsskript, keine echte KI-Anbindung. |
| Funnel-Formular (`FunnelForm.tsx`) | ✅ Echt strukturiert, aber der Versand hängt vom konfigurierten Make.com-Webhook ab (siehe unten). |

### Wie die echte Analyse funktioniert (`app/api/analyze/route.ts`)

1. Nimmt eine URL per POST entgegen (`{ url: string }`).
2. Validiert sie und blockt offensichtliche interne/lokale Ziele
   (Basis-SSRF-Schutz — kein Ersatz für einen echten Egress-Proxy in
   produktiven Setups mit höherem Traffic).
3. Ruft die Seite serverseitig ab (Timeout: 12 Sekunden) und misst die
   tatsächliche Antwortzeit.
4. Parsed das HTML mit `cheerio` und prüft: HTTPS, Title-Tag-Länge,
   Meta-Description, Anzahl H1-Tags, Alt-Text-Abdeckung bei Bildern,
   Antwortzeit, Viewport-Meta-Tag (Mobile-Signal).
5. Berechnet daraus einen einfachen, regelbasierten Score (0–100) und gibt
   pro Kriterium eine Detail-Aussage zurück — keine KI-generierten Texte,
   rein deterministische Prüfung.

**Bewusst nicht enthalten** (nächste Ausbaustufe, falls gewünscht):
- Eine echte Lighthouse-/Core-Web-Vitals-Messung (aktuell nur rohe
  Serverantwortzeit als Annäherung).
- Eine KI-generierte inhaltliche Einschätzung (z. B. via Anthropic API) —
  ließe sich ergänzen, sobald ein API-Key hinterlegt ist.
- Eine echte GEO-Prüfung (Sichtbarkeit in KI-Suchantworten) — dafür bräuchte
  es zusätzliche Abfragen bei den jeweiligen KI-Suchsystemen.
- Persistenz/Rate-Limiting — aktuell kann die Route beliebig oft aufgerufen
  werden; für den Live-Betrieb empfiehlt sich ein Rate-Limit pro IP.

```

## Make.com-Webhook anbinden

Das Formular sammelt alle Antworten als typisiertes JSON
(`FunnelPayload` in `lib/types.ts`). Aktuell wird dieses Objekt nur in der
Konsole geloggt (`lib/submitFunnel.ts`), damit der Funnel ohne Backend
getestet werden kann.

So aktivierst du den echten Versand:

1. In Make.com ein Szenario mit einem **Custom Webhook**-Trigger anlegen.
2. Die generierte Webhook-URL kopieren.
3. Eine `.env.local`-Datei anlegen (Vorlage: `.env.local.example`) und dort
   eintragen:

   ```bash
   NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/dein-webhook-pfad
   ```

4. Neu starten (`npm run dev` bzw. neu deployen) — `submitFunnelToWebhook`
   sendet das Payload danach automatisch per `fetch` an Make.com.

## Design-Tokens

| Token | Wert |
| --- | --- |
| Hintergrund | `#050505` / `#030712` (`void-900` / `void-950`) |
| Akzent | `#00FF66` (`signal-500`) |
| Display-/Headline-Font | JetBrains Mono |
| Body-Font | Inter |

## Hinweise

- Der Custom Cursor wird nur auf Geräten mit präzisem Zeigegerät
  (`pointer: fine`) aktiviert und respektiert `prefers-reduced-motion`.
- Alle Sections sind mobil-first responsive gebaut (Breakpoints: `sm`,
  `md`, `lg`).
- Impressum & Datenschutz sind bewusst als Platzhalter angelegt und müssen
  vor Live-Schaltung mit echten, rechtssicheren Inhalten gefüllt werden.
