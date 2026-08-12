import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Muss auf Node laufen (nicht Edge), weil cheerio einen echten HTML-Parser braucht.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckStatus = "pass" | "warn" | "fail";

interface Check {
  label: string;
  status: CheckStatus;
  detail: string;
}

const FETCH_TIMEOUT_MS = 12_000;
const MAX_HTML_CHARS = 3_000_000; // Schutz vor sehr großen Seiten

/**
 * Sehr einfacher SSRF-Grundschutz: verhindert, dass die Analyse-Funktion
 * genutzt wird, um interne/lokale Netzwerkressourcen abzufragen.
 * Kein Ersatz für einen dedizierten Egress-Proxy in echten Prod-Setups,
 * aber ein sinnvolles Minimum für eine öffentlich erreichbare Route.
 */
function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local")) return true;
  if (h === "0.0.0.0" || h === "::1" || h === "169.254.169.254") return true;
  if (/^127\./.test(h)) return true;
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(h)) return true;
  return false;
}

function parseTargetUrl(raw: string): URL | null {
  const candidates = raw.includes("://") ? [raw] : [`https://${raw}`, `http://${raw}`];
  for (const candidate of candidates) {
    try {
      const u = new URL(candidate);
      if (u.protocol !== "http:" && u.protocol !== "https:") continue;
      if (isBlockedHostname(u.hostname)) continue;
      return u;
    } catch {
      continue;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültiger Request-Body." },
      { status: 400 }
    );
  }

  const rawUrl = body.url?.trim();
  if (!rawUrl) {
    return NextResponse.json(
      { ok: false, error: "Bitte eine URL angeben." },
      { status: 400 }
    );
  }

  const target = parseTargetUrl(rawUrl);
  if (!target) {
    return NextResponse.json(
      { ok: false, error: "Das ist keine gültige, öffentlich erreichbare URL." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const startedAt = Date.now();
  let html = "";
  let fetchError: string | null = null;

  try {
    const response = await fetch(target.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; online-Agency-ai-Analyzer/1.0; +https://www.online-agency.ai)",
      },
    });

    if (!response.ok) {
      fetchError = `Die Seite hat mit Status ${response.status} geantwortet.`;
    } else {
      const text = await response.text();
      html = text.length > MAX_HTML_CHARS ? text.slice(0, MAX_HTML_CHARS) : text;
    }
  } catch (err) {
    fetchError =
      err instanceof Error && err.name === "AbortError"
        ? `Zeitüberschreitung — die Seite hat länger als ${FETCH_TIMEOUT_MS / 1000}s gebraucht.`
        : "Die Seite konnte nicht erreicht werden (Netzwerk- oder DNS-Fehler).";
  } finally {
    clearTimeout(timeout);
  }

  const loadTimeMs = Date.now() - startedAt;

  if (fetchError) {
    return NextResponse.json(
      { ok: false, error: fetchError, url: target.toString(), loadTimeMs },
      { status: 200 }
    );
  }

  const $ = cheerio.load(html);

  const title = $("title").first().text().trim() || null;
  const description =
    $('meta[name="description"]').attr("content")?.trim() || null;
  const h1Count = $("h1").length;

  const imgs = $("img");
  const imgTotal = imgs.length;
  let imgWithoutAlt = 0;
  imgs.each((_, el) => {
    const alt = $(el).attr("alt");
    if (!alt || !alt.trim()) imgWithoutAlt += 1;
  });

  const hasViewport = $('meta[name="viewport"]').length > 0;
  const isHttps = target.protocol === "https:";
  const hasCanonical = $('link[rel="canonical"]').length > 0;

  const checks: Check[] = [];
  const weight = 100 / 7;
  let score = 0;

  // 1. HTTPS
  if (isHttps) {
    checks.push({ label: "HTTPS", status: "pass", detail: "Verbindung ist verschlüsselt." });
    score += weight;
  } else {
    checks.push({ label: "HTTPS", status: "fail", detail: "Seite läuft ohne HTTPS." });
  }

  // 2. Title-Tag
  if (title && title.length >= 10 && title.length <= 60) {
    checks.push({
      label: "Title-Tag",
      status: "pass",
      detail: `„${title}" (${title.length} Zeichen)`,
    });
    score += weight;
  } else if (title) {
    checks.push({
      label: "Title-Tag",
      status: "warn",
      detail: `Vorhanden, aber ${title.length} Zeichen (ideal: 10–60).`,
    });
    score += weight * 0.5;
  } else {
    checks.push({ label: "Title-Tag", status: "fail", detail: "Kein <title>-Tag gefunden." });
  }

  // 3. Meta-Description
  if (description && description.length >= 50 && description.length <= 160) {
    checks.push({
      label: "Meta-Description",
      status: "pass",
      detail: `${description.length} Zeichen — guter Bereich für Google.`,
    });
    score += weight;
  } else if (description) {
    checks.push({
      label: "Meta-Description",
      status: "warn",
      detail: `Vorhanden, aber ${description.length} Zeichen (ideal: 50–160).`,
    });
    score += weight * 0.5;
  } else {
    checks.push({
      label: "Meta-Description",
      status: "fail",
      detail: "Keine Meta-Description gefunden.",
    });
  }

  // 4. H1-Struktur
  if (h1Count === 1) {
    checks.push({ label: "H1-Struktur", status: "pass", detail: "Genau eine H1 gefunden." });
    score += weight;
  } else if (h1Count > 1) {
    checks.push({
      label: "H1-Struktur",
      status: "warn",
      detail: `${h1Count} H1-Tags gefunden — idealerweise nur eine pro Seite.`,
    });
    score += weight * 0.5;
  } else {
    checks.push({ label: "H1-Struktur", status: "fail", detail: "Keine H1 gefunden." });
  }

  // 5. Bilder-Alt-Texte
  if (imgTotal === 0) {
    checks.push({
      label: "Bilder-Alt-Texte",
      status: "pass",
      detail: "Keine Bilder auf der Seite gefunden.",
    });
    score += weight;
  } else {
    const coverage = ((imgTotal - imgWithoutAlt) / imgTotal) * 100;
    if (coverage >= 90) {
      checks.push({
        label: "Bilder-Alt-Texte",
        status: "pass",
        detail: `${Math.round(coverage)}% der ${imgTotal} Bilder haben Alt-Text.`,
      });
      score += weight;
    } else if (coverage >= 50) {
      checks.push({
        label: "Bilder-Alt-Texte",
        status: "warn",
        detail: `Nur ${Math.round(coverage)}% der ${imgTotal} Bilder haben Alt-Text.`,
      });
      score += weight * 0.5;
    } else {
      checks.push({
        label: "Bilder-Alt-Texte",
        status: "fail",
        detail: `${imgWithoutAlt} von ${imgTotal} Bildern fehlt der Alt-Text.`,
      });
    }
  }

  // 6. Antwortzeit
  if (loadTimeMs < 1500) {
    checks.push({ label: "Antwortzeit", status: "pass", detail: `${loadTimeMs} ms — schnell.` });
    score += weight;
  } else if (loadTimeMs < 3000) {
    checks.push({
      label: "Antwortzeit",
      status: "warn",
      detail: `${loadTimeMs} ms — spürbar, aber noch okay.`,
    });
    score += weight * 0.5;
  } else {
    checks.push({
      label: "Antwortzeit",
      status: "fail",
      detail: `${loadTimeMs} ms — deutlich zu langsam.`,
    });
  }

  // 7. Mobile-Viewport
  if (hasViewport) {
    checks.push({
      label: "Mobile-Viewport",
      status: "pass",
      detail: "Viewport-Meta-Tag vorhanden.",
    });
    score += weight;
  } else {
    checks.push({
      label: "Mobile-Viewport",
      status: "fail",
      detail: "Kein Viewport-Meta-Tag — Seite ist evtl. nicht mobil-optimiert.",
    });
  }

  return NextResponse.json({
    ok: true,
    url: target.toString(),
    loadTimeMs,
    score: Math.round(score),
    checks,
    meta: {
      title,
      description,
      h1Count,
      imgTotal,
      imgWithoutAlt,
      hasViewport,
      isHttps,
      hasCanonical,
    },
  });
}
