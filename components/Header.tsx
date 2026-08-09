"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "System", href: "/#system" },
  { label: "Analyse starten", href: "/#analyse" },
  { label: "KI-Demo", href: "/#ki-demo" },
  { label: "FAQ", href: "/#faq" },
];

// Höhe des fixed Headers als Scroll-Offset, damit Sections nicht darunter verschwinden
const SCROLL_OFFSET = 84;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü automatisch schließen, wenn auf Desktop-Breite gewechselt wird
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setMenuOpen(false);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Scroll der Seite sperren, solange das mobile Menü offen ist
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Scroll-Spy: beobachtet alle Nav-Sections und markiert die aktuell
  // sichtbare Section im Header. Ein schmales Erkennungsband nahe der
  // Viewport-Mitte sorgt dafür, dass immer nur eine Section aktiv ist.
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.split("#")[1]);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll mit Offset (nur auf der Startseite relevant, wo die
  // Sections existieren). Von Unterseiten aus navigiert der Link ganz
  // normal zu "/#id" — der Browser springt dort nativ zur Section.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const id = href.split("#")[1];
    const el = id ? document.getElementById(id) : null;

    if (!el) {
      setMenuOpen(false);
      return;
    }

    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-signal-500/10 bg-void-900/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="/"
          data-cursor-hover
          onClick={() => setMenuOpen(false)}
          className="whitespace-nowrap font-mono text-sm font-bold tracking-tight text-white"
        >
          online<span className="text-signal-500">-Agency</span>
          <span className="text-signal-500/70">.ai</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.split("#")[1];
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor-hover
                aria-current={isActive ? "true" : undefined}
                className={`rounded-lg px-3 py-1.5 font-sans text-[13.5px] font-medium transition-all duration-200 hover:bg-signal-500/10 hover:text-signal-400 ${
                  isActive
                    ? "bg-signal-500/10 text-signal-400 shadow-glow-sm"
                    : "text-white/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a
          href="/#analyse"
          onClick={(e) => handleNavClick(e, "/#analyse")}
          data-cursor-hover
          className="hidden rounded-full border border-signal-500/40 bg-signal-500/10 px-5 py-2 font-mono text-[13px] font-semibold text-signal-400 transition-all hover:border-signal-500 hover:bg-signal-500/20 hover:shadow-glow-sm md:inline-block"
        >
          Kostenlose Analyse
        </a>

        {/* Animierter Hamburger-Button (nur Mobile/Tablet) */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          data-cursor-hover
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-colors hover:border-signal-500/40 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                menuOpen ? "top-[7px] rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                menuOpen ? "top-[7px] -rotate-45" : "top-[14px] rotate-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Menü-Panel */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 ease-out md:hidden ${
          menuOpen
            ? "max-h-96 border-white/10 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.split("#")[1];
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor-hover
                aria-current={isActive ? "true" : undefined}
                className={`rounded-lg px-3 py-3 font-sans text-[14.5px] font-medium transition-all duration-200 hover:bg-signal-500/10 hover:text-signal-400 ${
                  isActive
                    ? "bg-signal-500/10 text-signal-400 shadow-glow-sm"
                    : "text-white/70"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="/#analyse"
            onClick={(e) => handleNavClick(e, "/#analyse")}
            data-cursor-hover
            className="mt-2 rounded-lg border border-signal-500/40 bg-signal-500/10 px-3 py-3 text-center font-mono text-[13px] font-semibold text-signal-400"
          >
            Kostenlose Analyse
          </a>
        </nav>
      </div>
    </header>
  );
}
