const CARDS = [
  {
    eyebrow: "Option A",
    title: "Reine KI",
    subtitle: "Claude, ChatGPT & Co.",
    points: [
      { text: "Antworten in Sekunden", positive: true },
      { text: "Setzt nichts selbst um", positive: false },
      { text: "Du bekommst Code & Dateien — nicht mehr", positive: false },
      { text: "Volle Eigenarbeit bei Umsetzung & Hosting", positive: false },
    ],
    highlight: false,
  },
  {
    eyebrow: "Option B",
    title: "Klassische Agentur",
    subtitle: "Festpreis-Projekt, Meetings, Briefings",
    points: [
      { text: "Persönlicher Ansprechpartner", positive: true },
      { text: "Extrem teuer durch hohe Fixkosten", positive: false },
      { text: "Träge Prozesse, viele Abstimmungsschleifen", positive: false },
      { text: "Wochen Wartezeit bis zum ersten Entwurf", positive: false },
    ],
    highlight: false,
  },
  {
    eyebrow: "Unser System",
    title: "online-Agency.ai",
    subtitle: "Das Hybrid-System",
    points: [
      { text: "Sofortige KI-Ersterfassung in 30 Sekunden", positive: true },
      { text: "Persönlicher Experte übernimmt die Umsetzung", positive: true },
      { text: "Garantiert live in 48 Stunden", positive: true },
      { text: "Kein Code, keine Dateien, keine Eigenarbeit", positive: true },
    ],
    highlight: true,
  },
];

export default function ComparisonMatrix() {
  return (
    <section id="system" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Warum wir?
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Zwei Welten. Ein System.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Weder reine KI noch klassische Agentur lösen das Problem
            vollständig. Unser Hybrid-System schon.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              data-cursor-hover
              className={`relative flex flex-col rounded-2xl border p-7 transition-transform hover:-translate-y-1 ${
                card.highlight
                  ? "border-signal-500/50 bg-gradient-to-b from-signal-500/[0.08] to-void-950 shadow-glow"
                  : "border-white/10 bg-void-950/60"
              }`}
            >
              {card.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-signal-500 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-void-950">
                  Empfohlen
                </span>
              )}

              <p
                className={`font-mono text-[11px] uppercase tracking-widest ${
                  card.highlight ? "text-signal-400" : "text-white/35"
                }`}
              >
                {card.eyebrow}
              </p>
              <h3 className="mt-2 font-mono text-xl font-bold text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-[13px] text-white/45">{card.subtitle}</p>

              <ul className="mt-6 flex-1 space-y-3.5 border-t border-white/10 pt-6">
                {card.points.map((point) => (
                  <li
                    key={point.text}
                    className="flex items-start gap-2.5 text-[13.5px] leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 font-mono text-[13px] ${
                        point.positive ? "text-signal-500" : "text-white/25"
                      }`}
                    >
                      {point.positive ? "✓" : "×"}
                    </span>
                    <span
                      className={
                        point.positive ? "text-white/85" : "text-white/40"
                      }
                    >
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
