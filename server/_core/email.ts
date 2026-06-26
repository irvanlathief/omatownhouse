import { ENV } from "./env";

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  /** Optional Reply-To, so replies land somewhere a human reads. */
  replyTo?: string;
};

/**
 * Send a transactional email via Resend's HTTP API — the same email service
 * used by the zurichbiotech project.
 *
 * Returns `true` on success, `false` if Resend isn't configured or the send
 * fails. Callers should treat email as best-effort and never let a failure
 * here break the request — leads are still persisted to the database.
 */
export async function sendEmail(msg: EmailMessage): Promise<boolean> {
  const apiKey = ENV.resendApiKey;

  if (!apiKey) {
    console.warn(
      "[email] Resend not configured (set RESEND_API_KEY); email not sent."
    );
    return false;
  }

  const replyTo = msg.replyTo || ENV.resendReplyTo;
  const body: Record<string, unknown> = {
    from: ENV.resendFromEmail,
    to: [msg.to],
    subject: msg.subject,
    text: msg.text,
  };
  if (replyTo) {
    body.reply_to = replyTo;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[email] Resend send failed (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] Resend send error:", error);
    return false;
  }
}
