import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LiveAnalyzerSection from "@/components/LiveAnalyzerSection";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FunnelSection from "@/components/FunnelSection";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "SEO & GEO Analyse",
  description:
    "Kostenlose KI-Analyse für Sichtbarkeit bei Google und KI-Suchsystemen wie ChatGPT. In 30 Sekunden zum Ergebnis, Umsetzung durch deinen persönlichen Ansprechpartner.",
  alternates: { canonical: "/seo-geo" },
};

export default function SeoGeoLandingPage() {
  return (
    <main className="relative">
      <Hero
        badgeText="Kostenlose SEO & GEO-Analyse in 30 Sek."
        heading={
          <>
            Sichtbar bei Google.{" "}
            <span className="text-signal-500 text-glow">Und bei ChatGPT.</span>
          </>
        }
        subtext={
          <>
            Klassische SEO reicht nicht mehr — immer mehr Suchen laufen über
            KI-Systeme wie ChatGPT oder Perplexity.{" "}
            <span className="text-white/85">online-Agency.ai</span> analysiert
            deine Sichtbarkeit in beiden Welten sofort per KI und setzt die
            Optimierung anschließend persönlich für dich um.
          </>
        }
        primaryCta={{ label: "Kostenlose SEO & GEO-Analyse", href: "#analyse" }}
        secondaryCta={{ label: "Wie es funktioniert", href: "#system" }}
        trustBadges={["100% Kostenlos", "DSGVO-konform", "Ergebnis in 48h"]}
        showMarquee={false}
      />
      <LiveAnalyzerSection />
      <ComparisonMatrix />
      <FunnelSection />
      <FAQ />
    </main>
  );
}
