"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Häufige Fragen
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bevor du startest
          </h2>
        </div>

        <div className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10 bg-void-950/50">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="px-6 sm:px-7">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    data-cursor-hover
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-[14.5px] font-semibold text-white/90">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-mono text-lg text-signal-500 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[13.5px] leading-relaxed text-white/55">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
