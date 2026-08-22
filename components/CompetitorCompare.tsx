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

interface Slot {
  inputLabel: string;
  result: AnalyzeResponse | null;
}

const STATUS_ICON: Record<CheckStatus, string> = {
  pass: "✓",
  warn: "!",
  fail: "×",
};

const STATUS_COLOR: Record<CheckStatus, string> = {
  pass: "text-signal-400",
  warn: "text-yellow-400",
  fail: "text-red-400",
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-signal-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

async function analyzeUrl(url: string): Promise<AnalyzeResponse> {
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return await res.json();
  } catch {
    return { ok: false, error: "Netzwerkfehler — bitte erneut versuchen." };
  }
}

export default function CompetitorCompare() {
  const [yourUrl, setYourUrl] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[] | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!yourUrl.trim() || loading) return;

    const inputs: { inputLabel: string; url: string }[] = [
      { inputLabel: "Deine Seite", url: yourUrl.trim() },
    ];
    if (competitor1.trim()) {
      inputs.push({ inputLabel: "Wettbewerber 1", url: competitor1.trim() });
    }
    if (competitor2.trim()) {
      inputs.push({ inputLabel: "Wettbewerber 2", url: competitor2.trim() });
    }

    setLoading(true);
    setSlots(inputs.map((i) => ({ inputLabel: i.inputLabel, result: null })));

    const results = await Promise.all(inputs.map((i) => analyzeUrl(i.url)));

    setSlots(
      inputs.map((i, idx) => ({ inputLabel: i.inputLabel, result: results[idx] }))
    );
    setLoading(false);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Vergleich
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Wie schlägst du dich gegen die Konkurrenz?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Deine URL plus bis zu zwei Mitbewerber — echte Server-Analyse,
            direkt nebeneinander.
          </p>
        </div>

        <div
          data-cursor-hover
          className="mx-auto mt-14 max-w-4xl rounded-2xl border border-signal-500/25 bg-void-950/70 shadow-glow"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-500/60" />
            <span className="ml-2 font-mono text-[11px] text-white/40">
              vergleichs-analyzer — bis zu 3 echte Server-Anfragen
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3 px-5 py-5 sm:grid-cols-3">
            <input
              type="text"
              value={yourUrl}
              onChange={(e) => setYourUrl(e.target.value)}
              placeholder="deine-website.de"
              required
              data-cursor-hover
              className="rounded-lg border border-signal-500/30 bg-void-900 px-4 py-3 font-mono text-[13px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500"
            />
            <input
              type="text"
              value={competitor1}
              onChange={(e) => setCompetitor1(e.target.value)}
              placeholder="wettbewerber-1.de (optional)"
              data-cursor-hover
              className="rounded-lg border border-white/15 bg-void-900 px-4 py-3 font-mono text-[13px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500"
            />
            <input
              type="text"
              value={competitor2}
              onChange={(e) => setCompetitor2(e.target.value)}
              placeholder="wettbewerber-2.de (optional)"
              data-cursor-hover
              className="rounded-lg border border-white/15 bg-void-900 px-4 py-3 font-mono text-[13px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500"
            />
            <button
              type="submit"
              disabled={loading || !yourUrl.trim()}
              data-cursor-hover
              className="sm:col-span-3 rounded-lg bg-signal-500 px-6 py-3 font-mono text-[13px] font-bold text-void-950 shadow-glow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {loading ? "Analysiere alle Seiten…" : "Jetzt vergleichen"}
            </button>
          </form>

          {loading && (
            <div className="border-t border-white/10 px-5 py-6">
              <div className="flex items-center gap-3 font-mono text-[12.5px] text-white/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
                </span>
                Server ruft alle Seiten parallel ab …
              </div>
            </div>
          )}

          {!loading && slots && (
            <div className="animate-fade-up border-t border-white/10 px-5 py-6">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${slots.length}, minmax(0, 1fr))`,
                }}
              >
                {slots.map((slot, idx) => (
                  <div key={idx} className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/35">
                      {slot.inputLabel}
                    </p>

                    {!slot.result ? (
                      <p className="mt-3 font-mono text-[12px] text-white/40">…</p>
                    ) : !slot.result.ok ? (
                      <p className="mt-3 font-mono text-[12px] text-red-400">
                        {slot.result.error ?? "Fehler bei der Analyse."}
                      </p>
                    ) : (
                      <>
                        <p className="mt-1 truncate font-mono text-[11.5px] text-white/60">
                          {slot.result.url}
                        </p>
                        <p
                          className={`mt-2 font-mono text-2xl font-bold leading-none ${scoreColor(
                            slot.result.score ?? 0
                          )}`}
                        >
                          {slot.result.score}
                          <span className="text-sm text-white/30">/100</span>
                        </p>
                        <p className="mt-1 font-mono text-[10.5px] text-white/30">
                          {slot.result.loadTimeMs} ms
                        </p>

                        <ul className="mt-4 space-y-1.5">
                          {slot.result.checks?.map((check) => (
                            <li
                              key={check.label}
                              className="flex items-start gap-1.5 font-mono text-[11px]"
                              title={check.detail}
                            >
                              <span
                                aria-hidden="true"
                                className={STATUS_COLOR[check.status]}
                              >
                                {STATUS_ICON[check.status]}
                              </span>
                              <span className="truncate text-white/50">
                                {check.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
