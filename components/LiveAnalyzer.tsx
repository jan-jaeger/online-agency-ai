"use client";

import { FormEvent, useState } from "react";

type CheckStatus = "pass" | "warn" | "fail";

interface Check {
  label: string;
  status: CheckStatus;
  detail: string;
}

interface AnalyzeResponse {
  ok: boolean;
  url?: string;
  loadTimeMs?: number;
  score?: number;
  checks?: Check[];
  error?: string;
}

const STATUS_STYLES: Record<CheckStatus, { icon: string; color: string }> = {
  pass: { icon: "✓", color: "text-signal-400" },
  warn: { icon: "!", color: "text-yellow-400" },
  fail: { icon: "×", color: "text-red-400" },
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-signal-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export default function LiveAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data: AnalyzeResponse = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Netzwerkfehler — bitte erneut versuchen." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-cursor-hover
      className="mx-auto w-full max-w-2xl rounded-2xl border border-signal-500/25 bg-void-950/70 shadow-glow"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-500/60" />
        <span className="ml-2 font-mono text-[11px] text-white/40">
          live-analyzer — echte Server-Anfrage, kein Fake
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-5 py-5 sm:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="deine-website.de"
          data-cursor-hover
          className="w-full flex-1 rounded-lg border border-white/15 bg-void-900 px-4 py-3 font-mono text-base text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500 sm:text-[13.5px]"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          data-cursor-hover
          className="shrink-0 rounded-lg bg-signal-500 px-6 py-3 font-mono text-[13px] font-bold text-void-950 shadow-glow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {loading ? "Analysiere…" : "Jetzt live analysieren"}
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="border-t border-white/10 px-5 py-6">
          <div className="flex items-center gap-3 font-mono text-[12.5px] text-white/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
            </span>
            Server ruft die Seite ab und wertet HTML aus …
          </div>
        </div>
      )}

      {/* Error state */}
      {!loading && result && !result.ok && (
        <div className="border-t border-white/10 px-5 py-6">
          <p className="font-mono text-[13px] text-red-400">
            {result.error ?? "Unbekannter Fehler bei der Analyse."}
          </p>
          {typeof result.loadTimeMs === "number" && (
            <p className="mt-1 font-mono text-[11px] text-white/30">
              Antwortzeit bis zum Abbruch: {result.loadTimeMs} ms
            </p>
          )}
        </div>
      )}

      {/* Result state */}
      {!loading && result?.ok && result.checks && (
        <div className="animate-fade-up border-t border-white/10 px-5 py-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/35">
                Ergebnis für
              </p>
              <p className="mt-0.5 truncate font-mono text-[13px] text-white/80">
                {result.url}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-mono text-3xl font-bold leading-none ${scoreColor(
                  result.score ?? 0
                )}`}
              >
                {result.score}
                <span className="text-base text-white/30">/100</span>
              </p>
              <p className="mt-1 font-mono text-[10.5px] text-white/30">
                {result.loadTimeMs} ms Antwortzeit
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {result.checks.map((check) => {
              const style = STATUS_STYLES[check.status];
              return (
                <li
                  key={check.label}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3.5 py-2.5"
                >
                  <span aria-hidden="true" className={`mt-0.5 font-mono text-[13px] ${style.color}`}>
                    {style.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[12.5px] font-semibold text-white/85">
                      {check.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-white/50">{check.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 text-[12.5px] leading-relaxed text-white/45">
            Das ist die technische Basis-Analyse — automatisiert, in Sekunden.
            Für Conversion, GEO-Sichtbarkeit und die vollständige Umsetzung
            schaut sich dein persönlicher Ansprechpartner das Ergebnis danach
            noch einmal im Detail an.
          </p>
        </div>
      )}
    </div>
  );
}
