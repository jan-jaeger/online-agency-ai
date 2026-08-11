import type { ReactNode } from "react";
import GridBackground from "./GridBackground";
import AnalysisTerminal from "./AnalysisTerminal";
import ServiceMarquee from "./ServiceMarquee";

const DEFAULT_TRUST_BADGES = ["100% Kostenlos", "DSGVO-konform", "Rückmeldung in 48h"];

interface CtaLink {
  label: string;
  href: string;
}

interface HeroProps {
  /** Text im pulsierenden Badge oben */
  badgeText?: ReactNode;
  /** Komplette H1 — bewusst als ReactNode, damit <span className="text-signal-500"> Highlights möglich bleiben */
  heading?: ReactNode;
  /** Fließtext unter der Headline */
  subtext?: ReactNode;
  /** Primärer Button (neongrün, gefüllt) */
  primaryCta?: CtaLink;
  /** Sekundärer Button (Outline) */
  secondaryCta?: CtaLink;
  /** Drei kurze Trust-Badges unter den Buttons */
  trustBadges?: string[];
  /** Ticker-Band mit Leistungen unten anzeigen (Standard: an) */
  showMarquee?: boolean;
}

export default function Hero(props: HeroProps) {
  const {
    badgeText = "KI-Analyse in 30 Sek. + Echter Experte in 48 Std.",
    primaryCta = { label: "Jetzt System testen", href: "#analyse" },
    secondaryCta = { label: "Wie es funktioniert", href: "#system" },
    trustBadges = DEFAULT_TRUST_BADGES,
    showMarquee = true,
  } = props;

  const heading =
    props.heading ?? (
      <>
        KI bringt die{" "}
        <span className="text-signal-500 text-glow">Geschwindigkeit</span>.
        <br />
        Wir die schlüsselfertige{" "}
        <span className="text-signal-500 text-glow">Umsetzung</span>.
      </>
    );

  const subtext =
    props.subtext ?? (
      <>
        Klassische Agenturen sind zu langsam. Reine KI-Tools lassen dich mit
        dem Code und den Design-Dateien allein.{" "}
        <span className="text-white/85">online-Agency.ai</span> kombiniert das
        Beste aus beiden Welten: Lass SEO & GEO, SEA & Performance Marketing,
        dein Webdesign oder deinen Onlineshop sofort von unserer KI
        analysieren – und lehne dich zurück, während dein persönlicher
        Ansprechpartner das komplette System schlüsselfertig für dich baut und
        live schaltet.
      </>
    );

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <GridBackground />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
        {/* Left: copy */}
        <div>
          <div
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-signal-500/30 bg-signal-500/[0.06] px-4 py-1.5 font-mono text-[12px] text-signal-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            {badgeText}
          </div>

          <h1 className="mt-6 font-mono text-4xl font-bold leading-[1.08] tracking-tight text-white [hyphens:auto] [overflow-wrap:break-word] sm:[hyphens:manual] sm:[overflow-wrap:normal] sm:text-5xl lg:text-[3.4rem]">
            {heading}
          </h1>

          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed tracking-normal text-white/60 sm:text-base">
            {subtext}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={primaryCta.href}
              data-cursor-hover
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-signal-500 px-7 py-3.5 font-mono text-sm font-bold text-void-950 shadow-glow transition-transform hover:-translate-y-0.5"
            >
              {primaryCta.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={secondaryCta.href}
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-signal-500/35 px-7 py-3.5 font-mono text-sm font-semibold text-white/80 transition-colors hover:border-signal-500 hover:text-white hover:shadow-glow-sm"
            >
              {secondaryCta.label}
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 font-mono text-[11.5px] text-white/50"
              >
                <span aria-hidden="true" className="text-signal-500">✓</span>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right: signature terminal visual */}
        <div className="flex justify-center lg:justify-end">
          <AnalysisTerminal />
        </div>
      </div>

      {/* Full-width service ticker, serves as a divider */}
      {showMarquee && (
        <div className="relative mt-14 sm:mt-16">
          <ServiceMarquee />
        </div>
      )}
    </section>
  );
}
