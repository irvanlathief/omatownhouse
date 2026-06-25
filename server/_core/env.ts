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
  // Mailgun transactional email — the real send path for lead notifications and
  // visitor confirmations (the original Manus "Forge" email is not configured
  // on Vercel). The domain is already verified on Mailgun.
  //   MAILGUN_API_KEY  - private API key (required to send)
  //   MAILGUN_DOMAIN   - verified sending domain, e.g. omatownhouse.com
  //   MAILGUN_API_BASE - optional; default https://api.mailgun.net
  //                      (use https://api.eu.mailgun.net for EU-region domains)
  //   MAILGUN_FROM     - optional; default "OMA Townhouse <contact@DOMAIN>"
  mailgunApiKey: process.env.MAILGUN_API_KEY ?? "",
  mailgunDomain: process.env.MAILGUN_DOMAIN ?? "",
  mailgunApiBase: process.env.MAILGUN_API_BASE ?? "https://api.mailgun.net",
  mailgunFrom: process.env.MAILGUN_FROM ?? "",
  // Where the team's lead notifications go. Defaults to the public contact
  // address; set LEAD_NOTIFY_EMAIL to your dotdesign inbox to deliver directly
  // and skip the contact@ forwarding hop.
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "contact@omatownhouse.com",
};
