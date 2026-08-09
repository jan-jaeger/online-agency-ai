import ChatDemo from "./ChatDemo";

export default function ChatDemoSection() {
  return (
    <section id="ki-demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
              Live-Demo
            </p>
            <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
              So arbeitet dein KI-Analyst
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
              Der KI-Analyst antwortet sofort, erkennt Schwachstellen in
              Sekunden — und übergibt automatisch an deinen persönlichen
              Ansprechpartner, sobald die Analyse steht. Kein Warten, kein
              Ticket-System.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />
                <p className="text-[13.5px] text-white/60">
                  Antwortet in Echtzeit auf deine Fragen zur Umsetzung
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />
                <p className="text-[13.5px] text-white/60">
                  Erkennt Schwachstellen in Struktur, SEO und Conversion
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />
                <p className="text-[13.5px] text-white/60">
                  Übergibt nahtlos an einen echten Menschen zur Umsetzung
                </p>
              </div>
            </div>
          </div>

          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
