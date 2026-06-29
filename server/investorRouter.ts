import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { rateLimit, getClientIp } from "./_core/rateLimit";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { sendEmail } from "./_core/email";
import { ENV } from "./_core/env";

// Handles the /investors page. Every submission persists a lead and notifies
// the team. The page only unlocks when the visitor's access code matches the
// shared INVESTOR_ACCESS_CODE; visitors without a code are still captured so
// the team can WhatsApp them one. Resend is the real send path (gated behind
// RESEND_API_KEY); DB writes are best-effort and never block the response.
export const investorRouter = router({
  requestAccess: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().toLowerCase().email().max(320),
        whatsapp: z.string().trim().min(4).max(50),
        country: z.string().trim().max(80).optional(),
        accessCode: z.string().trim().max(80).optional(),
        message: z.string().trim().max(1000).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const ip = getClientIp(ctx.req);
      if (!rateLimit(`investor:${ip}`, { limit: 5, windowMs: 60_000 }).ok) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Please try again in a moment.",
        });
      }

      const { name, email, whatsapp, country, accessCode, message } = input;
      const firstName = name.split(" ")[0] || name;

      const codeMatches =
        !!accessCode &&
        !!ENV.investorAccessCode &&
        accessCode.toLowerCase() === ENV.investorAccessCode.toLowerCase();

      // Persist the lead (best-effort). We save the lead in BOTH cases so the
      // team has the contact details, and so a visitor without a code can be
      // reached out to with one.
      try {
        const db = await getDb();
        if (db) {
          await db.insert(leads).values({
            name,
            email,
            whatsapp,
            details: JSON.stringify({
              source: "investor-page",
              country: country || null,
              accessCodeProvided: !!accessCode,
              accessGranted: codeMatches,
              message: message || null,
            }),
            status: "new",
          });
        }
      } catch (dbError) {
        console.error("[investor] failed to persist lead (email still sent):", dbError);
      }

      const teamSubject = codeMatches
        ? `Investor unlocked: ${name}${country ? ` (${country})` : ""}`
        : `Investor access requested (no code): ${name}${country ? ` (${country})` : ""}`;

      const teamBody = [
        codeMatches
          ? "INVESTOR PAGE UNLOCKED — OMA TOWNHOUSE"
          : "INVESTOR ACCESS REQUESTED — OMA TOWNHOUSE",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${whatsapp}`,
        country ? `Country: ${country}` : null,
        codeMatches
          ? "Access code: matched (page unlocked)."
          : `Access code: ${accessCode ? "supplied but did not match" : "not supplied"} — visitor is waiting for the code via WhatsApp.`,
        message ? `\nMessage from visitor:\n${message}` : null,
        "",
        "Follow up within 24 hours.",
      ]
        .filter(Boolean)
        .join("\n");

      await sendEmail({
        to: ENV.leadNotifyEmail,
        subject: teamSubject,
        text: teamBody,
        replyTo: email,
      });

      // Visitor confirmation. Two flavours: unlocked vs waiting-for-code.
      const visitorText = codeMatches
        ? [
            `Hi ${firstName},`,
            "",
            "Thanks for stepping in. The investor pitch is unlocked for you and our team has been notified.",
            "",
            "Someone from the OMA team will reach out within 24 hours over WhatsApp to walk you through the unit, the staged payment structure, and the operating model.",
            "",
            "If you'd like to move faster, just reply to this email or message us on WhatsApp — we're real people, not a queue.",
            "",
            "Warm regards,",
            "The OMA Townhouse Team",
          ].join("\n")
        : [
            `Hi ${firstName},`,
            "",
            "Thanks for requesting access to the OMA Townhouse investor pitch. We've got your WhatsApp and email, and someone from our team will message you the access code shortly.",
            "",
            "Once you have the code, return to the same page on this browser, enter it and the rest of the pitch unlocks.",
            "",
            "If you have any questions in the meantime, just reply to this email and we'll come straight back to you.",
            "",
            "Warm regards,",
            "The OMA Townhouse Team",
          ].join("\n");

      await sendEmail({
        to: email,
        subject: codeMatches
          ? "OMA Townhouse — investor pitch unlocked"
          : "OMA Townhouse — investor access on the way",
        replyTo: ENV.leadNotifyEmail,
        text: visitorText,
      });

      return { ok: true, accessGranted: codeMatches };
    }),
});
