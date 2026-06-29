import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { rateLimit, getClientIp } from "./_core/rateLimit";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { sendEmail } from "./_core/email";
import { ENV } from "./_core/env";

// Handles the email-gated /investors page. A submission persists the lead,
// emails the team a notification, and emails the visitor a confirmation that
// the materials are unlocked. Resend is the real send path (gated behind
// RESEND_API_KEY); the DB write is best-effort and never blocks the response.
export const investorRouter = router({
  requestAccess: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().toLowerCase().email().max(320),
        country: z.string().trim().max(80).optional(),
        role: z.string().trim().max(120).optional(),
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

      const { name, email, country, role, message } = input;
      const firstName = name.split(" ")[0] || name;

      try {
        const db = await getDb();
        if (db) {
          await db.insert(leads).values({
            name,
            email,
            details: JSON.stringify({
              source: "investor-page",
              country: country || null,
              role: role || null,
              message: message || null,
            }),
            status: "new",
          });
        }
      } catch (dbError) {
        console.error("[investor] failed to persist lead (email still sent):", dbError);
      }

      const teamBody = [
        "NEW INVESTOR ACCESS REQUEST — OMA TOWNHOUSE",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        country ? `Country: ${country}` : null,
        role ? `Role / interest: ${role}` : null,
        message ? `\nMessage from visitor:\n${message}` : null,
        "",
        "Source: /investors page (email-gated pitch)",
        "Follow up within 24 hours — they've unlocked the page and are expecting the deck.",
      ]
        .filter(Boolean)
        .join("\n");

      await sendEmail({
        to: ENV.leadNotifyEmail,
        subject: `New investor access request: ${name}${country ? ` (${country})` : ""}`,
        text: teamBody,
        replyTo: email,
      });

      await sendEmail({
        to: email,
        subject: "OMA Townhouse — investor materials",
        replyTo: ENV.leadNotifyEmail,
        text: [
          `Hi ${firstName},`,
          "",
          "Thanks for requesting the OMA Townhouse investor materials. The full pitch is now unlocked on the page you came from. You can return on the same browser any time without filling in the form again.",
          "",
          "A member of our team will reach out within 24 hours with the deck PDF and to walk you through the staged payment structure, the hands-off operating model, and the unit options.",
          "",
          "If you'd like to skip the wait, just reply to this email with any questions and we'll come straight back to you.",
          "",
          "Warm regards,",
          "The OMA Townhouse Team",
        ].join("\n"),
      });

      return { ok: true };
    }),
});
