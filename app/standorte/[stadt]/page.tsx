import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { SERVICES } from "@/lib/services";

interface PageParams {
  stadt: string;
}

export function generateStaticParams(): PageParams[] {
  return LOCATIONS.map((location) => ({ stadt: location.slug }));
}

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  const location = getLocationBySlug(params.stadt);
  if (!location) return {};

  const title = `Standort ${location.name}`;
  const description = `online-Agency.ai in ${location.name} — KI-Analyse in 30 Sekunden, schlüsselfertige Umsetzung durch deinen persönlichen Ansprechpartner. SEO, Webdesign, SEA und E-Commerce für ${location.name} und Umgebung.`;
  const canonicalPath = `/standorte/${location.slug}`;

  return {
    title,
    description,
    keywords: [
      `Agentur ${location.name}`,
      `Online Marketing ${location.name}`,
      `SEO ${location.name}`,
      `Webdesign ${location.name}`,
      `Werbeagentur ${location.name}`,
    ],
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

export default function StandortPage({ params }: { params: PageParams }) {
  const location = getLocationBySlug(params.stadt);
  if (!location) notFound();

  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-36 lg:px-8">
        <Link
          href="/standorte"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-signal-400 transition-colors hover:text-signal-300"
        >
          ← Alle Standorte
        </Link>

        <div className="border-b border-white/10 pb-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Standort
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {location.name}
          </h1>
          <p className="mt-3 text-sm text-white/40">{location.region}</p>
        </div>

        <p className="mt-8 max-w-2xl leading-relaxed text-white/60">
          online-Agency.ai unterstützt Unternehmen in {location.name} und
          Umgebung mit KI-gestützter Sofort-Analyse und schlüsselfertiger
          Umsetzung durch einen persönlichen Ansprechpartner.
          {location.proximityNote && ` Wir sind ${location.proximityNote}.`}
        </p>

        {location.localContext && (
          <p className="mt-4 max-w-2xl leading-relaxed text-white/50">
            {location.localContext}
          </p>
        )}

        <p className="mt-6 max-w-2xl leading-relaxed text-white/60">
          Wähle unten den passenden Bereich für {location.name}:
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/standorte/${location.slug}/${service.slug}`}
              className="group rounded-xl border border-white/10 bg-void-950/60 p-6 transition-all hover:-translate-y-0.5 hover:border-signal-500/40 hover:shadow-glow-sm"
            >
              <p className="font-mono text-lg font-semibold text-white group-hover:text-signal-400">
                {service.name}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">
                {service.description(location.name)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[13px] font-semibold text-signal-400">
                Mehr erfahren
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
