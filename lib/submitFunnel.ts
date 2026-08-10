import { FunnelPayload } from "./types";

/**
 * Platzhalter für die spätere Anbindung an Make.com (ehemals Integromat).
 *
 * So wird's produktiv geschaltet:
 * 1. In Make.com ein "Custom Webhook" als Trigger-Modul anlegen.
 * 2. Die generierte Webhook-URL in die Umgebungsvariable
 *    NEXT_PUBLIC_MAKE_WEBHOOK_URL eintragen (.env.local).
 * 3. Den Fetch-Aufruf unten aktivieren (bereits vorbereitet).
 *
 * Bis dahin wird das Payload nur in der Konsole geloggt, damit das
 * Formular sich vollständig durchklicken lässt, ohne Requests zu senden.
 */
export async function submitFunnelToWebhook(
  payload: FunnelPayload
): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

  // eslint-disable-next-line no-console
  console.log("[online-Agency.ai] Funnel-Payload (JSON):", JSON.stringify(payload, null, 2));

  if (!webhookUrl) {
    // Kein Webhook konfiguriert -> Simulation, kein Netzwerk-Call.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: response.ok };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[online-Agency.ai] Webhook-Fehler:", error);
    return { ok: false };
  }
}
