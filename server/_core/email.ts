import { ENV } from "./env";

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  /** Optional Reply-To, so replies land somewhere a human reads. */
  replyTo?: string;
};

/**
 * Send a transactional email via Mailgun's HTTP API.
 *
 * Returns `true` on success, `false` if Mailgun isn't configured or the send
 * fails. Callers should treat email as best-effort and never let a failure
 * here break the request — leads are still persisted to the database.
 */
export async function sendEmail(msg: EmailMessage): Promise<boolean> {
  const apiKey = ENV.mailgunApiKey;
  const domain = ENV.mailgunDomain;

  if (!apiKey || !domain) {
    console.warn(
      "[email] Mailgun not configured (set MAILGUN_API_KEY and MAILGUN_DOMAIN); email not sent."
    );
    return false;
  }

  const base = (ENV.mailgunApiBase || "https://api.mailgun.net").replace(/\/$/, "");
  const from = ENV.mailgunFrom || `OMA Townhouse <contact@${domain}>`;

  const form = new URLSearchParams();
  form.set("from", from);
  form.set("to", msg.to);
  form.set("subject", msg.subject);
  form.set("text", msg.text);
  if (msg.replyTo) {
    form.set("h:Reply-To", msg.replyTo);
  }

  try {
    const response = await fetch(`${base}/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[email] Mailgun send failed (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] Mailgun send error:", error);
    return false;
  }
}
