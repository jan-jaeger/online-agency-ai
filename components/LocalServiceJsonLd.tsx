const SITE_URL = "https://www.online-agency.ai";

export default function LocalServiceJsonLd({
  serviceName,
  serviceSlug,
  cityName,
  region,
  path,
}: {
  serviceName: string;
  serviceSlug: string;
  cityName: string;
  region: string;
  path: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} in ${cityName}`,
    serviceType: serviceName,
    url: `${SITE_URL}${path}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      data-slug={serviceSlug}
    />
  );
}
