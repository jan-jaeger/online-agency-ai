"use client";

import { useMemo, useState } from "react";

function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RoiCalculator() {
  const [visitors, setVisitors] = useState(2000);
  const [conversionRate, setConversionRate] = useState(1.2);
  const [orderValue, setOrderValue] = useState(150);

  // Realistische Ziel-Conversion nach Optimierung: +0.8 Prozentpunkte ist ein
  // vorsichtiger, branchenüblicher Richtwert für bessere Sichtbarkeit/UX —
  // bewusst als Schätzung kommuniziert, keine feste Zusage.
  const improvedRate = useMemo(
    () => Math.min(conversionRate + 0.8, 8),
    [conversionRate]
  );

  const currentCustomers = (visitors * conversionRate) / 100;
  const improvedCustomers = (visitors * improvedRate) / 100;
  const monthlyGap = Math.max(0, improvedCustomers - currentCustomers) * orderValue;
  const yearlyGap = monthlyGap * 12;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Rechner
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Was kostet dich schlechte Sichtbarkeit?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Zieh an den Reglern — die Rechnung läuft live. Eine grobe
            Schätzung, kein Versprechen.
          </p>
        </div>

        <div
          data-cursor-hover
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/10 bg-void-950/60 p-6 sm:p-9"
        >
          <div className="space-y-7">
            <div>
              <div className="mb-2 flex items-center justify-between font-mono text-[12.5px]">
                <span className="text-white/60">Website-Besucher pro Monat</span>
                <span className="text-signal-400">
                  {visitors.toLocaleString("de-DE")}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={20000}
                step={100}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full accent-signal-500"
                aria-label="Website-Besucher pro Monat"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between font-mono text-[12.5px]">
                <span className="text-white/60">Aktuelle Conversion-Rate</span>
                <span className="text-signal-400">
                  {conversionRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={5}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-signal-500"
                aria-label="Aktuelle Conversion-Rate"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between font-mono text-[12.5px]">
                <span className="text-white/60">
                  Durchschnittlicher Auftragswert
                </span>
                <span className="text-signal-400">
                  {formatEuro(orderValue)}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={2000}
                step={10}
                value={orderValue}
                onChange={(e) => setOrderValue(Number(e.target.value))}
                className="w-full accent-signal-500"
                aria-label="Durchschnittlicher Auftragswert"
              />
            </div>
          </div>

          <div className="mt-9 rounded-xl border border-signal-500/25 bg-signal-500/[0.06] px-5 py-6 text-center">
            <p className="font-mono text-[12px] uppercase tracking-wider text-white/45">
              Geschätztes ungenutztes Potenzial
            </p>
            <p className="mt-2 font-mono text-3xl font-bold text-signal-400 sm:text-4xl">
              {formatEuro(yearlyGap)}
              <span className="text-base font-normal text-white/40"> / Jahr</span>
            </p>
            <p className="mt-2 font-mono text-[12.5px] text-white/50">
              ≈ {formatEuro(monthlyGap)} pro Monat, bei realistisch
              erreichbaren {improvedRate.toFixed(1)}% Conversion-Rate
            </p>
          </div>

          <a
            href="#analyse"
            data-cursor-hover
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-signal-500 px-7 py-3.5 font-mono text-sm font-bold text-void-950 shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Kostenlose Analyse starten
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
