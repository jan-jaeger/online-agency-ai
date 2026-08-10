import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/locations";

const TITLE = "Standorte";
const DESCRIPTION =
  "online-Agency.ai vor Ort — SEO, Webdesign, SEA und E-Commerce für Unternehmen in deiner Region. Alle Standorte im Überblick.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Online Marketing Agentur",
    "Webagentur Zollernalbkreis",
    ...LOCATIONS.map((l) => `Agentur ${l.name}`),
  ],
  alternates: { canonical: "/standorte" },
  openGraph: {
    title: `${TITLE} | online-Agency.ai`,
    description: DESCRIPTION,
    url: "/standorte",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | online-Agency.ai`,
    description: DESCRIPTION,
  },
};

export default function StandorteOverviewPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-36 lg:px-8">
        <div className="border-b border-white/10 pb-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Standorte
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Wo wir tätig sind
          </h1>
        </div>

        <p className="mt-8 max-w-2xl leading-relaxed text-white/60">
          online-Agency.ai unterstützt Unternehmen in ganz Deutschland — mit
          besonderer Nähe zu Kunden in der Region rund um unseren Sitz in
          Haigerloch. Wähle deinen Standort für lokal zugeschnittene
          Informationen zu SEO, Webdesign, SEA und E-Commerce.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/standorte/${location.slug}`}
              className="group rounded-xl border border-white/10 bg-void-950/60 p-6 transition-all hover:-translate-y-0.5 hover:border-signal-500/40 hover:shadow-glow-sm"
            >
              <p className="font-mono text-lg font-semibold text-white group-hover:text-signal-400">
                {location.name}
              </p>
              <p className="mt-1 text-[13px] text-white/45">
                {location.region}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[13px] font-semibold text-signal-400">
                Zum Standort
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
