"use client";

import { useEffect, useState } from "react";
import ExpertBadge from "./ExpertBadge";
import ScrambleText from "./ScrambleText";

const LOG_LINES = [
  { label: "Analysiere Struktur", value: "shop.io/checkout", ok: true },
  { label: "Conversion-Elemente", value: "3 kritische Lücken erkannt", ok: false },
  { label: "Ladezeit (LCP)", value: "3.8s → Ziel: <1.2s", ok: false },
  { label: "SEO & GEO-Sichtbarkeit", value: "12 Meta-Fehler gefunden", ok: false },
  { label: "KI-Analyse abgeschlossen", value: "in 27 Sekunden", ok: true },
];

export default function AnalysisTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [handoff, setHandoff] = useState(false);

  useEffect(() => {
    if (visibleLines < LOG_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setHandoff(true), 500);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div
      data-cursor-hover
      className="relative w-full max-w-md rounded-xl border border-white/10 bg-void-950/80 shadow-glow backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-500/60" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
          <ScrambleText
            phrases={[
              "KI-ANALYST — LIVE",
              "SYSTEM BEREIT",
              "WARTE AUF PROJEKT",
              "SCAN-MODUS AKTIV",
            ]}
          />
        </span>
      </div>

      {/* Body */}
      <div className="relative overflow-hidden px-5 py-5 font-mono text-[12.5px] leading-relaxed">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/70 to-transparent animate-scan"
        />
        <p className="mb-3 text-white/50">
          $ scan --target=dein-projekt --mode=deep
        </p>

        <ul className="space-y-2.5">
          {LOG_LINES.slice(0, visibleLines).map((line, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-4 animate-fade-up"
            >
              <span className="text-white/50">{line.label}</span>
              <span
                className={
                  line.ok ? "text-signal-400 text-right" : "text-white/70 text-right"
                }
              >
                {line.value}
              </span>
            </li>
          ))}
          {visibleLines < LOG_LINES.length && (
            <li className="text-signal-500">
              <span className="animate-blink">▍</span>
            </li>
          )}
        </ul>

        {handoff && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-signal-500/30 bg-signal-500/10 px-3 py-2.5 animate-fade-up">
            <ExpertBadge size={26} />
            <p className="text-[11.5px] text-white/80">
              Übergabe an <span className="text-signal-400">Jan J.</span> —
              Rückmeldung innerhalb von{" "}
              <span className="text-signal-400">48 Std.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
