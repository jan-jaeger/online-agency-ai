export default function ExpertBadge({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-signal-500/50 bg-signal-500/10 shadow-glow-sm ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size * 0.52, height: size * 0.52 }}
      >
        <circle cx="12" cy="8" r="3.4" stroke="#00ff66" strokeWidth="1.6" />
        <path
          d="M5 19.5c1.2-3.6 4-5.2 7-5.2s5.8 1.6 7 5.2"
          stroke="#00ff66"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
