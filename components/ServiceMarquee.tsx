const SERVICES = [
  "SEO & GEO",
  "SEA & Performance Marketing",
  "Webdesign & High-Speed-Pages",
  "E-Commerce & Shopsysteme",
];

export default function ServiceMarquee() {
  const track = [...SERVICES, ...SERVICES];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-void-950/40 py-4">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]">
        {track.map((service, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40"
          >
            {service}
            <span className="h-1 w-1 shrink-0 rounded-full bg-signal-500/60" />
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void-900 to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void-900 to-transparent sm:w-28"
      />
    </div>
  );
}
