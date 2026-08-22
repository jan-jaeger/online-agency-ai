/**
 * Rein dekorative Punkte, verteilt über mehrere Kontinente — sollen NICHT
 * als Behauptung "wir haben hier ein Büro" gelesen werden, sondern einfach
 * die "wir arbeiten global" -Atmosphäre erzeugen. Deshalb bewusst ohne
 * Städtenamen/Labels und ohne Verlinkung zu echten Standort-Daten.
 * Positionen sind grobe %-Koordinaten auf public/world-map-dots.webp.
 */
const PULSE_POINTS: { x: number; y: number; delay: number }[] = [
  { x: 52.8, y: 27.7, delay: 0 }, // Mitteleuropa
  { x: 50.8, y: 34.6, delay: 0.6 }, // Mittelmeerraum
  { x: 47, y: 44, delay: 1.2 }, // Naher Osten
  { x: 24, y: 33, delay: 1.8 }, // Ostküste USA
  { x: 78.5, y: 46, delay: 0.3 }, // Südostasien
  { x: 82, y: 25, delay: 1.5 }, // Ostasien
  { x: 58, y: 25, delay: 0.9 }, // Nordeuropa
  { x: 89, y: 61, delay: 2.1 }, // Australien
];

export default function LocationsMap() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Standortunabhängig
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ein Team. Kein fester Ort.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Unser Team arbeitet komplett standortunabhängig — für Kunden in
            ganz Deutschland und international.
          </p>
        </div>

        <div
          data-cursor-hover
          className="relative mx-auto mt-14 aspect-[1400/707] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-void-950/40"
        >
          {/* Gepunktete Weltkarte als Hintergrundgrafik */}
          <img
            src="/world-map-dots.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Rein dekorative, pulsierende Punkte verteilt über die Karte */}
          {PULSE_POINTS.map((point, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75"
                  style={{ animationDelay: `${point.delay}s` }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-500 shadow-glow-sm" />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
