export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-8">
        <span className="whitespace-nowrap font-mono text-sm font-bold tracking-tight text-white">
          online<span className="text-signal-500">-Agency</span>
          <span className="text-signal-500/70">.ai</span>
        </span>

        <p className="text-center font-sans text-[12.5px] text-white/35 sm:text-left">
          © {year} online-Agency.ai — Alle Rechte vorbehalten.
        </p>

        <div className="flex items-center gap-6 font-sans text-[12.5px] font-medium text-white/40">
          <a
            href="/impressum"
            data-cursor-hover
            className="transition-colors hover:text-signal-400"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            data-cursor-hover
            className="transition-colors hover:text-signal-400"
          >
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}
