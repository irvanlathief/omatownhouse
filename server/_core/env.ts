export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Gemini (Google) is the chat LLM provider. Set GEMINI_API_KEY in the
  // deployment environment. Optional overrides: GEMINI_BASE_URL, GEMINI_MODEL.
  geminiApiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? "",
  geminiApiUrl: process.env.GEMINI_BASE_URL ?? "",
  geminiModel: process.env.GEMINI_MODEL ?? "",
  // Resend transactional email — same setup as the zurichbiotech project.
  // The real send path for lead notifications and visitor confirmations (the
  // original Manus "Forge" email is not configured on Vercel).
  //   RESEND_API_KEY    - API key ("re_..."), required to send
  //   RESEND_FROM_EMAIL - sender; default "OMA Townhouse <contact@omatownhouse.com>"
  //                       (the from-domain must be verified in Resend)
  //   RESEND_REPLY_TO   - optional default Reply-To
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendFromEmail:
    process.env.RESEND_FROM_EMAIL ?? "OMA Townhouse <contact@omatownhouse.com>",
  resendReplyTo: process.env.RESEND_REPLY_TO ?? "",
  // Where the team's lead notifications go. Defaults to the public contact
  // address; set LEAD_NOTIFY_EMAIL to your dotdesign inbox to deliver directly.
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "contact@omatownhouse.com",
};
