import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MouseGlow from "@/components/MouseGlow";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://online-agency.ai";
const SITE_TITLE = "online-Agency.ai | KI-Speed trifft schlüsselfertige Umsetzung";
const SITE_DESCRIPTION =
  "Erhalte in 30 Sekunden deine kostenlose KI-Analyse für SEO, GEO, SEA, Webdesign und E-Commerce. Schlüsselfertige Umsetzung durch deinen persönlichen Ansprechpartner.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | online-Agency.ai",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "online-Agency.ai",
  keywords: [
    "KI-Analyse",
    "SEO Agentur",
    "GEO Generative Engine Optimization",
    "SEA Performance Marketing",
    "Webdesign Agentur",
    "E-Commerce Agentur",
    "KI-Suchmaschinenoptimierung",
    "schlüsselfertige Website",
  ],
  authors: [{ name: "online-Agency.ai" }],
  creator: "online-Agency.ai",
  publisher: "online-Agency.ai",
  category: "Marketing & Webentwicklung",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "online-Agency.ai",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "online-Agency.ai — KI-Speed trifft schlüsselfertige Umsetzung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        {/* Usercentrics Live Skript (Manual Blocking) */}
        <script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="hmlKkQse8XjAOg"
          async
        />
      </head>
      <body className="font-sans antialiased bg-void-900 text-white selection:bg-signal-500/30">
        <JsonLd />
        <MouseGlow />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}