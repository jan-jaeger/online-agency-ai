"use client";

import { useEffect, useState } from "react";

/**
 * Dünner Fortschrittsbalken ganz oben am Bildschirmrand, zeigt an, wie weit
 * auf der Seite runtergescrollt wurde. Nutzt das native <progress>-Element
 * (https://developer.mozilla.org/de/docs/Web/HTML/Reference/Elements/progress)
 * für korrekte Semantik/Barrierefreiheit statt eines nachgebauten Divs.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <progress
      value={progress}
      max={100}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] w-full appearance-none overflow-hidden border-0 bg-transparent [&::-moz-progress-bar]:bg-signal-500 [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-signal-500 [&::-webkit-progress-value]:shadow-glow-sm [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-150 [&::-webkit-progress-value]:ease-out"
    />
  );
}
