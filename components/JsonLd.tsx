import { FAQS } from "@/lib/faq";

const SITE_URL = "https://www.online-agency.ai";

/**
 * Hinweis zu "MarketingAgency": Das ist kein offizieller schema.org-Typ
 * (es gibt keine Klasse dieses Namens im Vokabular). Da explizit danach
 * gefragt wurde, ist er hier trotzdem als zusätzlicher Typ neben dem
 * validen "ProfessionalService" mit aufgeführt — das ist gültiges
 * JSON-LD (mehrere @type-Werte sind erlaubt), wird von strikten
 * schema.org-Validatoren aber nur für "ProfessionalService" ausgewertet.
 */
const professionalServiceSchema = {
  "@type": ["ProfessionalService", "MarketingAgency"],
  "@id": `${SITE_URL}/#organization`,
  name: "online-Agency.ai",
  url: SITE_URL,
  description:
    "KI-Speed trifft schlüsselfertige Umsetzung: kostenlose KI-Analyse in 30 Sekunden für SEO, GEO, SEA, Webdesign und E-Commerce — Umsetzung durch einen persönlichen Ansprechpartner.",
  areaServed: {
    "@type": "Country",
    name: "Deutschland",
  },
  employee: {
    "@type": "Person",
    name: "Jan J.",
    jobTitle: "Persönlicher Ansprechpartner",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "SEO & GEO",
        description:
          "Suchmaschinenoptimierung für Google sowie Generative Engine Optimization für Sichtbarkeit in KI-Suchsystemen.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "SEA & Performance Marketing",
        description: "Bezahlte Kampagnen, die konvertieren.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Webdesign & High-Speed-Pages",
        description: "Blitzschnelle, moderne Websites.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "E-Commerce & Shopsysteme",
        description: "Online-Shops, die verkaufen.",
      },
    },
  ],
};

const faqPageSchema = {
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [professionalServiceSchema, faqPageSchema],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
