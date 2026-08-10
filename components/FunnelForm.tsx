"use client";

import { useMemo, useState } from "react";
import {
  FunnelBudget,
  FunnelContact,
  FunnelGoal,
  FunnelPayload,
  FunnelSpeed,
} from "@/lib/types";
import { submitFunnelToWebhook } from "@/lib/submitFunnel";

const GOAL_OPTIONS: { value: FunnelGoal; label: string; hint: string }[] = [
  {
    value: "seo-geo",
    label: "SEO & GEO",
    hint: "Sichtbarkeit bei Google & KI-Search",
  },
  {
    value: "sea-performance",
    label: "SEA & Performance Marketing",
    hint: "Bezahlte Kampagnen, die konvertieren",
  },
  {
    value: "webdesign-highspeed",
    label: "Webdesign & High-Speed-Pages",
    hint: "Blitzschnelle, moderne Websites",
  },
  {
    value: "ecommerce-shopsysteme",
    label: "E-Commerce & Shopsysteme",
    hint: "Online-Shops, die verkaufen",
  },
];

const SPEED_OPTIONS: { value: FunnelSpeed; label: string; hint: string }[] = [
  {
    value: "express-48h",
    label: "Express — 48 Stunden",
    hint: "Höchste Priorität, sofortiger Start",
  },
  {
    value: "sieben-tage",
    label: "Innerhalb von 7 Tagen",
    hint: "Zügig, mit Feinschliff",
  },
  {
    value: "dreissig-tage",
    label: "In den nächsten 30 Tagen",
    hint: "Planbar, kein Zeitdruck",
  },
];

const BUDGET_OPTIONS: { value: FunnelBudget; label: string; hint: string }[] = [
  { value: "1000-3000", label: "1.000 € – 3.000 €", hint: "Fokussiertes Einzelsystem" },
  { value: "3000-7000", label: "3.000 € – 7.000 €", hint: "Vollständiger Funnel" },
  { value: "7000-plus", label: "7.000 € +", hint: "Mehrere Systeme / Skalierung" },
];

const TOTAL_STEPS = 4;

const emptyContact: FunnelContact = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

function SelectCard<T extends string>({
  active,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
        active
          ? "border-signal-500 bg-signal-500/[0.08] shadow-glow-sm"
          : "border-white/10 bg-void-950/50 hover:border-white/25"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex min-h-[2.5rem] items-center font-mono text-[14.5px] font-semibold leading-snug ${
            active ? "text-signal-400" : "text-white/90"
          }`}
        >
          {label}
        </span>
        <span
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            active
              ? "border-signal-500 bg-signal-500"
              : "border-white/25 bg-transparent"
          }`}
        >
          {active && (
            <span className="h-2 w-2 rounded-full bg-void-950" />
          )}
        </span>
      </div>
      <p className="mt-1 text-[12.5px] text-white/45">{hint}</p>
    </button>
  );
}

export default function FunnelForm() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<FunnelGoal | null>(null);
  const [speed, setSpeed] = useState<FunnelSpeed | null>(null);
  const [budget, setBudget] = useState<FunnelBudget | null>(null);
  const [contact, setContact] = useState<FunnelContact>(emptyContact);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => (step / TOTAL_STEPS) * 100, [step]);

  const canProceed = useMemo(() => {
    if (step === 1) return goal !== null;
    if (step === 2) return speed !== null;
    if (step === 3) return budget !== null;
    if (step === 4) {
      return (
        contact.name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(contact.email) &&
        contact.phone.trim().length > 3
      );
    }
    return false;
  }, [step, goal, speed, budget, contact]);

  const goNext = () => {
    if (!canProceed) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    if (!canProceed) return;
    setSubmitting(true);
    setError(null);

    // Payload bereit für das Make.com-Webhook-Setup (siehe lib/submitFunnel.ts)
    const payload: FunnelPayload = {
      goal,
      speed,
      budget,
      contact,
      submittedAt: new Date().toISOString(),
      source: "online-agency.ai-landingpage",
    };

    const result = await submitFunnelToWebhook(payload);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(
        "Da ist etwas schiefgelaufen. Bitte versuch es gleich noch einmal."
      );
    }
  };

  if (submitted) {
    return (
      <div
        data-cursor-hover
        className="mx-auto max-w-xl rounded-2xl border border-signal-500/40 bg-signal-500/[0.06] px-8 py-14 text-center shadow-glow"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-signal-500/50 bg-signal-500/10">
          <span aria-hidden="true" className="font-mono text-2xl text-signal-500">✓</span>
        </div>
        <h3 className="mt-6 font-mono text-2xl font-bold text-white">
          Analyse angefordert
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-white/60">
          Unsere KI beginnt jetzt mit der Analyse. Dein persönlicher
          Ansprechpartner meldet sich innerhalb von{" "}
          <span className="text-signal-400">48 Stunden</span> bei dir unter{" "}
          <span className="text-white/85">{contact.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/40">
          <span>
            Schritt {step} / {TOTAL_STEPS}
          </span>
          <span className="text-signal-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-signal-500 shadow-glow-sm transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-void-950/60 p-6 sm:p-9">
        {step === 1 && (
          <div className="animate-fade-up">
            <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">
              Was ist dein primäres Ziel?
            </h3>
            <p className="mt-2 text-[13.5px] text-white/45">
              Wähle den Bereich, der aktuell am dringendsten ist.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GOAL_OPTIONS.map((opt) => (
                <SelectCard
                  key={opt.value}
                  active={goal === opt.value}
                  label={opt.label}
                  hint={opt.hint}
                  onClick={() => setGoal(opt.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">
              Wie schnell soll das System live gehen?
            </h3>
            <p className="mt-2 text-[13.5px] text-white/45">
              Wir richten die Kapazität unseres Teams danach aus.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {SPEED_OPTIONS.map((opt) => (
                <SelectCard
                  key={opt.value}
                  active={speed === opt.value}
                  label={opt.label}
                  hint={opt.hint}
                  onClick={() => setSpeed(opt.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">
              Geplantes Budget & Rahmen
            </h3>
            <p className="mt-2 text-[13.5px] text-white/45">
              Damit dein Ansprechpartner den passenden Umfang vorschlägt.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {BUDGET_OPTIONS.map((opt) => (
                <SelectCard
                  key={opt.value}
                  active={budget === opt.value}
                  label={opt.label}
                  hint={opt.hint}
                  onClick={() => setBudget(opt.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-up">
            <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">
              Kontaktdaten für deinen persönlichen Ansprechpartner
            </h3>
            <p className="mt-2 text-[13.5px] text-white/45">
              Kein Spam. Nur die Rückmeldung zu deiner Analyse.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/40">
                  Name
                </span>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, name: e.target.value }))
                  }
                  placeholder="Max Mustermann"
                  data-cursor-hover
                  className="w-full rounded-lg border border-white/15 bg-void-900 px-4 py-3 text-base text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500 sm:text-[14px]"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/40">
                  E-Mail
                </span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  placeholder="max@firma.de"
                  data-cursor-hover
                  className="w-full rounded-lg border border-white/15 bg-void-900 px-4 py-3 text-base text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500 sm:text-[14px]"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/40">
                  Telefonnummer
                </span>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, phone: e.target.value }))
                  }
                  placeholder="+49 151 23456789"
                  data-cursor-hover
                  className="w-full rounded-lg border border-white/15 bg-void-900 px-4 py-3 text-base text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500 sm:text-[14px]"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-white/40">
                  Firmenname / Domain
                </span>
                <input
                  type="text"
                  value={contact.company}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, company: e.target.value }))
                  }
                  placeholder="firma.de"
                  data-cursor-hover
                  className="w-full rounded-lg border border-white/15 bg-void-900 px-4 py-3 text-base text-white placeholder:text-white/25 outline-none transition-colors focus:border-signal-500 sm:text-[14px]"
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 text-[13px] text-red-400">{error}</p>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={goBack}
            data-cursor-hover
            disabled={step === 1}
            className="font-mono text-[13px] font-medium text-white/50 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-0"
          >
            ← Zurück
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed}
              data-cursor-hover
              className="rounded-lg bg-signal-500 px-7 py-3 font-mono text-[13px] font-bold text-void-950 shadow-glow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
            >
              Weiter →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed || submitting}
              data-cursor-hover
              className="rounded-lg bg-signal-500 px-7 py-3 font-mono text-[13px] font-bold text-void-950 shadow-glow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {submitting ? "Wird gesendet…" : "Kostenlose Analyse anfordern"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
