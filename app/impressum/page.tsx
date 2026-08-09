export const metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <main>
      <div className="mx-auto max-w-3xl space-y-8 px-6 pb-24 pt-36 lg:px-8">

        {/* Titel */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Impressum
          </h1>
        </div>

        {/* Angaben gemäß § 5 TMG */}
        <section className="space-y-2">
          <p className="text-lg font-semibold text-white">online-agency.ai</p>
          <p className="leading-relaxed text-white/60">
            Jan Jäger<br />
            Stieglesfeld 13<br />
            72401 Haigerloch
          </p>
        </section>

        {/* Kontakt */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="font-mono text-xl font-semibold text-signal-400">Kontakt</h2>
          <p className="leading-relaxed text-white/60">
            <strong className="text-white">Telefon:</strong> +49 7474 95 46 880<br />
            <strong className="text-white">E-Mail:</strong>{" "}
            <a
              href="mailto:kontakt@online-agency.ai"
              data-cursor-hover
              className="text-signal-400 transition-colors hover:text-signal-300 hover:underline"
            >
              kontakt@online-agency.ai
            </a>
          </p>
        </section>

        {/* Umsatzsteuer-ID */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="font-mono text-xl font-semibold text-signal-400">Umsatzsteuer-ID</h2>
          <p className="leading-relaxed text-white/60">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            <span className="font-mono text-white">DE 292119679</span>
          </p>
        </section>

        {/* Verbraucherstreitbeilegung */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="font-mono text-xl font-semibold text-signal-400">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p className="leading-relaxed text-white/60">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
            vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

      </div>
    </main>
  );
}
