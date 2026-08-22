"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAME_MS = 30;
const TOTAL_FRAMES = 16;

interface ScrambleTextProps {
  phrases: string[];
  /** Wie lange (ms) eine fertige Phrase stehen bleibt, bevor zur nächsten gewechselt wird */
  holdMs?: number;
  className?: string;
}

/**
 * Zyklische Status-Zeile mit Zeichen-Scramble-Effekt beim Wechsel — die
 * Buchstaben flimmern kurz durch zufällige Zeichen, bevor sich die neue
 * Phrase von links nach rechts "einpendelt". Bekannter Terminal-/Hacker-Look.
 */
export default function ScrambleText({
  phrases,
  holdMs = 2600,
  className,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const frameRef = useRef(0);
  const currentRef = useRef("");

  useEffect(() => {
    if (phrases.length === 0) return;

    let frameInterval: ReturnType<typeof setInterval> | null = null;
    let holdTimeout: ReturnType<typeof setTimeout> | null = null;

    const runScramble = (target: string) => {
      const from = currentRef.current;
      const maxLen = Math.max(from.length, target.length);
      frameRef.current = 0;

      frameInterval = setInterval(() => {
        frameRef.current += 1;
        const frame = frameRef.current;
        let out = "";

        for (let i = 0; i < maxLen; i++) {
          const revealAt = (i / maxLen) * TOTAL_FRAMES;
          if (frame >= revealAt + 6) {
            out += target[i] ?? "";
          } else if (frame >= revealAt) {
            out += SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          } else {
            out += from[i] ?? "";
          }
        }

        setDisplay(out);

        if (frame >= TOTAL_FRAMES) {
          if (frameInterval) clearInterval(frameInterval);
          setDisplay(target);
          currentRef.current = target;
          // Nur weiter zyklisch wechseln, wenn es mehr als eine Phrase gibt
          if (phrases.length > 1) {
            holdTimeout = setTimeout(advance, holdMs);
          }
        }
      }, FRAME_MS);
    };

    const advance = () => {
      indexRef.current = (indexRef.current + 1) % phrases.length;
      runScramble(phrases[indexRef.current]);
    };

    // Beim ersten Laden immer einmal von leer/zufällig zur ersten Phrase
    // "einpendeln" — bei mehreren Phrasen läuft es danach automatisch weiter.
    runScramble(phrases[0]);

    return () => {
      if (frameInterval) clearInterval(frameInterval);
      if (holdTimeout) clearTimeout(holdTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.join("|"), holdMs]);

  return (
    <span className={className} aria-live="polite">
      {display}
    </span>
  );
}
