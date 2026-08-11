import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import LiveAnalyzerSection from "@/components/LiveAnalyzerSection";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FunnelSection from "@/components/FunnelSection";
import FAQ from "@/components/FAQ";
import LocalServiceJsonLd from "@/components/LocalServiceJsonLd";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { SERVICES, getServiceBySlug } from "@/lib/services";

interface PageParams {
  stadt: string;
  service: string;
}

// Erzeugt zur Build-Zeit eine statische Seite für jede Stadt×Service-Kombination
export function generateStaticParams(): PageParams[] {
  return LOCATIONS.flatMap((location) =>
    SERVICES.map((service) => ({
      stadt: location.slug,
      service: service.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  const location = getLocationBySlug(params.stadt);
  const service = getServiceBySlug(params.service);

  if (!location || !service) {
    return {};
  }

  const title = `${service.shortName} in ${location.name}`;
  const description = location.localContext
    ? `${service.description(location.name)} ${location.localContext}`
    : service.description(location.name);
  const canonicalPath = `/standorte/${location.slug}/${service.slug}`;

  return {
    title,
    description,
    keywords: service.keywords(location.name),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${title} | online-Agency.ai`,
      description,
      url: canonicalPath,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | online-Agency.ai`,
      description,
    },
  };
}

export default function StandortServicePage({
  params,
}: {
  params: PageParams;
}) {
  const location = getLocationBySlug(params.stadt);
  const service = getServiceBySlug(params.service);

  if (!location || !service) {
    notFound();
  }

  return (
    <main className="relative">
      <LocalServiceJsonLd
        serviceName={service.name}
        serviceSlug={service.slug}
        cityName={location.name}
        region={location.region}
        path={`/standorte/${location.slug}/${service.slug}`}
      />

      <Hero
        badgeText={service.badgeText}
        heading={
          <>
            {service.shortName} in{" "}
            <span className="text-signal-500 text-glow">{location.name}</span>
          </>
        }
        subtext={
          <>
            {service.description(location.name)}{" "}
            {location.proximityNote && (
              <span className="text-white/85">
                Wir sind {location.proximityNote}.
              </span>
            )}
            {location.localContext && (
              <span className="mt-3 block text-white/50">
                {location.localContext}
              </span>
            )}
          </>
        }
        primaryCta={{
          label: `Kostenlose Analyse für ${location.name}`,
          href: "#analyse",
        }}
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
