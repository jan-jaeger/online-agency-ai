import LiveAnalyzer from "./LiveAnalyzer";

export default function LiveAnalyzerSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div
            data-cursor-hover
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-signal-500/30 bg-signal-500/[0.06] px-4 py-1.5 font-mono text-[11.5px] text-signal-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            Echte Funktion — kein Demo-Skript
          </div>

          <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Teste die KI-Analyse live
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Gib deine URL ein. Unser Server ruft die Seite wirklich ab und
            prüft Antwortzeit, SEO-Grundlagen und Mobile-Tauglichkeit —
            ohne vorgefertigte Ergebnisse.
          </p>
        </div>

        <div className="mt-12">
          <LiveAnalyzer />
        </div>
      </div>
    </section>
  );
}
