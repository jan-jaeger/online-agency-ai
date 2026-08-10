"use client";

import { useEffect, useRef, useState } from "react";
import ExpertBadge from "./ExpertBadge";

type Sender = "user" | "ki" | "human";

interface ScriptMessage {
  sender: Sender;
  text: string;
  delayBefore: number;
}

const SCRIPT: ScriptMessage[] = [
  {
    sender: "user",
    text: "Kannst du meinen Onlineshop auf SEO & GEO checken?",
    delayBefore: 400,
  },
  {
    sender: "ki",
    text: "Klar. Ich scanne Shop & Sichtbarkeit jetzt live …",
    delayBefore: 900,
  },
  {
    sender: "ki",
    text: "Gefunden: Deine Produktseiten fehlen in 6 von 10 KI-Suchantworten (GEO) und haben 12 Meta-Fehler für Google.",
    delayBefore: 1700,
  },
  {
    sender: "ki",
    text: "Analyse abgeschlossen. Ich übergebe dich jetzt an deinen persönlichen Ansprechpartner für die Umsetzung.",
    delayBefore: 1700,
  },
  {
    sender: "human",
    text: "Hey, hier ist Jan 👋 Ich habe die Analyse gesehen und baue dir SEO & GEO für deinen Shop bis morgen live.",
    delayBefore: 1300,
  },
];

const SENDER_META: Record<Sender, { label: string; align: "left" | "right" }> = {
  user: { label: "Du", align: "right" },
  ki: { label: "KI-Analyst", align: "left" },
  human: { label: "Jan J. · Ansprechpartner", align: "left" },
};

export default function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [typingSender, setTypingSender] = useState<Sender>("ki");
  const [runId, setRunId] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);

    let cancelled = false;
    let index = 0;

    const playNext = () => {
      if (cancelled || index >= SCRIPT.length) return;
      const msg = SCRIPT[index];

      const showTyping = msg.sender !== "user";
      if (showTyping) {
        setTypingSender(msg.sender);
        setTyping(true);
      }

      setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setVisibleCount((c) => c + 1);
        index += 1;
        setTimeout(playNext, 500);
      }, msg.delayBefore);
    };

    const kickoff = setTimeout(playNext, 500);
    return () => {
      cancelled = true;
      clearTimeout(kickoff);
    };
  }, [runId]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount, typing]);

  const finished = visibleCount >= SCRIPT.length;

  return (
    <div
      data-cursor-hover
      className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-signal-500/25 bg-void-950/80 shadow-glow"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-signal-500/40 bg-signal-500/10 font-mono text-[11px] font-bold text-signal-400">
            KI
          </div>
          <div>
            <p className="font-mono text-[13px] font-semibold text-white">
              KI-Analyst
            </p>
            <p className="flex items-center gap-1.5 font-mono text-[10.5px] text-signal-500">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />
              live &amp; bereit
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setRunId((r) => r + 1)}
          data-cursor-hover
          className="font-mono text-[11px] text-white/40 transition-colors hover:text-signal-400"
        >
          ↻ neu abspielen
        </button>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex h-[360px] flex-col gap-3 overflow-y-auto px-5 py-5"
      >
        {SCRIPT.slice(0, visibleCount).map((msg, i) => {
          const meta = SENDER_META[msg.sender];
          const isRight = meta.align === "right";
          return (
            <div
              key={i}
              className={`flex flex-col animate-fade-up ${
                isRight ? "items-end" : "items-start"
              }`}
            >
              <span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                {msg.sender === "human" && <ExpertBadge size={16} />}
                {meta.label}
              </span>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13.5px] leading-snug ${
                  isRight
                    ? "bg-white/10 text-white/90"
                    : msg.sender === "human"
                    ? "border border-signal-500/40 bg-signal-500/10 text-white/90"
                    : "border border-white/10 bg-void-900 text-white/80"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex flex-col items-start">
            <span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
              {typingSender === "human" && <ExpertBadge size={16} />}
              {SENDER_META[typingSender].label}
            </span>
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-void-900 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-4">
        {finished ? (
          <a
            href="#analyse"
            data-cursor-hover
            className="flex w-full items-center justify-center rounded-lg bg-signal-500 py-3 font-mono text-[13px] font-bold text-void-950 shadow-glow-sm transition-transform hover:-translate-y-0.5"
          >
            Meine eigene Analyse starten →
          </a>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-mono text-[12.5px] text-white/30">
            Nachricht eingeben …
          </div>
        )}
      </div>
    </div>
  );
}
