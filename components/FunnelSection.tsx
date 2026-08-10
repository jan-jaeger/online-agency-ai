import FunnelForm from "./FunnelForm";

export default function FunnelSection() {
  return (
    <section
      id="analyse"
      className="relative border-y border-white/10 bg-void-950/40 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-500">
            Kostenlose Analyse
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            In 60 Sekunden zur KI-Analyse
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Vier kurze Fragen. Danach übernimmt dein persönlicher
            Ansprechpartner den Rest.
          </p>
        </div>

        <div className="mt-14">
          <FunnelForm />
        </div>
      </div>
    </section>
  );
}
