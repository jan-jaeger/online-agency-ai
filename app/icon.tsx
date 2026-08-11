import { ImageResponse } from "next/og";

// Next.js generiert daraus automatisch die passenden <link rel="icon">-Tags
// für jede Größe — das ist der offiziell unterstützte Weg für mehrere
// Icon-Größen, weil datei-basierte Icons Vorrang vor der manuellen
// `metadata.icons`-Konfiguration haben (die wird sonst stillschweigend
// ignoriert, sobald eine Icon-Datei im app/-Verzeichnis existiert).
export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "48", size: { width: 48, height: 48 }, contentType: "image/png" },
    { id: "96", size: { width: 96, height: 96 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default function Icon({ id }: { id: string }) {
  const size = Number(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <svg
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 148 150 L 296 256 L 148 362"
            stroke="#00FF66"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="320" y="322" width="92" height="56" rx="10" fill="#00FF66" />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
