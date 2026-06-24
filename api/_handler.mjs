// server/_core/serverlessApp.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  budget: varchar("budget", { length: 100 }),
  details: text("details"),
  conversationSummary: text("conversationSummary"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var lifestyleArticles = mysqlTable("lifestyle_articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("imageUrl"),
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: int("isActive").default(1).notNull(),
  lastRefreshed: timestamp("lastRefreshed").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
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
  geminiModel: process.env.GEMINI_MODEL ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/chatRouter.ts
import { z as z2 } from "zod";

// server/_core/llm.ts
var ensureArray = (value) => Array.isArray(value) ? value : [value];
var normalizeContentPart = (part) => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }
  if (part.type === "text") {
    return part;
  }
  if (part.type === "image_url") {
    return part;
  }
  if (part.type === "file_url") {
    return part;
  }
  throw new Error("Unsupported message content part");
};
var normalizeMessage = (message) => {
  const { role, name, tool_call_id } = message;
  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
    return {
      role,
      name,
      tool_call_id,
      content
    };
  }
  const contentParts = ensureArray(message.content).map(normalizeContentPart);
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text
    };
  }
  return {
    role,
    name,
    content: contentParts
  };
};
var normalizeToolChoice = (toolChoice, tools) => {
  if (!toolChoice) return void 0;
  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }
  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }
    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }
    return {
      type: "function",
      function: { name: tools[0].function.name }
    };
  }
  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name }
    };
  }
  return toolChoice;
};
var DEFAULT_GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/openai";
var resolveApiUrl = () => {
  const base = ENV.geminiApiUrl && ENV.geminiApiUrl.trim().length > 0 ? ENV.geminiApiUrl : DEFAULT_GEMINI_BASE;
  return `${base.replace(/\/$/, "")}/chat/completions`;
};
var assertApiKey = () => {
  if (!ENV.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
};
var normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema
}) => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }
  const schema = outputSchema || output_schema;
  if (!schema) return void 0;
  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }
  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
    }
  };
};
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: ENV.geminiModel && ENV.geminiModel.trim().length > 0 ? ENV.geminiModel : "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 8192;
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.geminiApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}

// server/chatRouter.ts
var PROPERTY_IMAGES = [
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene77-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene76-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene33-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene41-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene23-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene52-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene51-optimized.webp",
  "https://d2v3qnksd8hkis.cloudfront.net/oma-townhouse/Scene22-optimized.webp"
];
var SYSTEM_PROMPT = `You are a friendly, knowledgeable property advisor for OMA Townhouse in Kaba Kaba, Bali. You're helpful, warm, and genuine \u2014 like a friend who knows the area inside out.

COMMUNICATION STYLE:
- SHORT. 1-2 sentences max per response. Like texting a friend.
- Warm and genuine. Not salesy.
- Match their language and energy.
- Be helpful first, sell second.

LANGUAGE DETECTION:
- If they write in another language, IMMEDIATELY switch to that language fully.
- Note their origin for follow-up.

===== PHASE 1: COLLECT DETAILS EARLY =====
Your #1 priority is getting their contact info so our team can follow up personally. After 1-2 exchanges max, naturally transition to collecting details.

Flow:
1. Answer their first question briefly.
2. Then: "I'd love to send you the full info pack. What's the best email to reach you?"
3. After email \u2192 "And your WhatsApp? So we can share photos and updates directly."
4. After WhatsApp \u2192 "Which country are you based in?"
5. After country \u2192 "Got it! And your name so our team knows who to ask for?"
6. Optionally: "Are you on Instagram? Some of our clients prefer updates there."
7. Once you have their details, output the lead_data block.
8. Then say: "Thanks [name]! Our team will reach out within 24 hours. In the meantime, feel free to keep asking me anything about the property or the area."

===== PHASE 2: VALUE-GIVING MODE (after details collected) =====
Once you have their details, NOW is when you become genuinely valuable. This is where you build trust and rapport. Ask thoughtful questions ONE AT A TIME:

- "Are you currently in Bali? If so, whereabouts?"
- "What brought you to look at Kaba Kaba specifically?" 
- "Where did you first hear about OMA?"
- "What's most important to you in a property \u2014 personal retreat, rental income, or a bit of both?"
- "Are you looking at this solo or with a partner/family?"

When they answer, GIVE VALUE back:
- If they're in Canggu: "Nice! You'll love how peaceful Kaba Kaba is compared to the Canggu traffic. It's only 25 min away but feels like a different world."
- If they mention rental income: "The area is growing fast \u2014 [Nuanu Creative City](https://www.nuanu.com/) alone is bringing thousands of people. Rental demand is going to be strong."
- If they mention family: "There's [Grow International School](https://growinkedungu.com/) just 10 min away, and the community here is really family-friendly."
- If they're a digital nomad: "You'd love it \u2014 [Open House Seseh](https://www.instagram.com/openhouseseseh/) and [Crate Cafe](https://www.instagram.com/cratecafebali/) are nearby, and the wifi infrastructure is solid."
- If they mention surfing: "[Kedungu Beach](https://maps.app.goo.gl/kedungu) is 10 min away \u2014 one of the best uncrowded breaks in Bali."
- If they mention fitness: "[Reload Sanctuary](https://www.instagram.com/reloadsanctuary/) is opening nearby \u2014 6,000 sqm gym. Plus [Omni Gym](https://www.instagram.com/omnigym.bali/) in Pererenan."

Share property images when relevant:
![OMA Townhouse](IMAGE_URL)

CHAT SUMMARY OFFER:
After a few exchanges in Phase 2, mention: "By the way, if you'd like, I can send you a summary of everything we've discussed \u2014 pricing, area info, links \u2014 straight to your email. Just say 'send summary' anytime."

If they say "send summary" or similar, output:
\`\`\`send_summary
{
  "email": "their email from lead_data",
  "name": "their name"
}
\`\`\`

PROPERTY KNOWLEDGE (use when relevant, don't dump):

PRICING:
- 25-year leasehold: from $115K (early bird) to $135K (standard)
- 40-year leasehold: from $161K (early bird) to $189K (standard)
- Freehold (PT PMA): from $265K (early bird) to $310K (standard)
- First building promo: 15% off, 30% deposit in 14 days

SPECS:
- Total: 97.5 sqm, 2 floors
- Ground floor: 66.7 sqm (8.78 x 7.6m)
- Upper floor: 30.8 sqm (4.06 x 7.6m)
- Private pool

LOCATION:
- 10-15 min to Nuanu, Luna Beach Club, Kedungu Beach
- 20-25 min to Pererenan (Reload Sanctuary, cafes)
- 25-30 min to Canggu (Batu Bolong, Finns, Yuki)

NEARBY:
- Gyms: Reload Sanctuary (Feb 2026), The Block, Omni Gym
- Cafes: Yuki, Open House Seseh, Chotto Matto, Crate Cafe
- Beach clubs: Luna (10 min), Finns, La Brisa
- Spas: Ulaman Resort, Therapy Day Spa, Goldust
- Local: Kaba Kaba Social, Alila Villas (opening soon)
- Schools: Grow International (10 min), ProEd at Nuanu

ANTI-PROMPTS \u2014 NEVER SAY THESE:
- "What kind of returns are you hoping to see?"
- "What areas are you comparing us to?"
- "Land here is 60-70% cheaper than Canggu"
- "Have you been to the Kaba Kaba area yet?"
- Don't ask about their budget unprompted
- Don't ask multiple questions in one message
- Don't write more than 3 sentences
- Don't probe or interrogate before collecting details
- Don't compare prices aggressively
- Don't use "investment opportunity" or "ROI" language

LEAD DATA FORMAT (output when you have at minimum name + email):

\`\`\`lead_data
{
  "name": "their name",
  "email": "their email",
  "whatsapp": "their whatsapp with country code",
  "instagram": "their instagram handle or null",
  "country": "their country",
  "language": "preferred language",
  "notes": "anything relevant from the conversation"
}
\`\`\``;
var chatRouter = router({
  send: publicProcedure.input(
    z2.object({
      message: z2.string().min(1),
      history: z2.array(
        z2.object({
          role: z2.enum(["user", "assistant"]),
          content: z2.string()
        })
      ).optional().default([])
    })
  ).mutation(async ({ input }) => {
    const { message, history } = input;
    const imageHint = PROPERTY_IMAGES[Math.floor(Math.random() * PROPERTY_IMAGES.length)];
    const enhancedSystem = SYSTEM_PROMPT.replace(
      /IMAGE_URL/g,
      imageHint
    );
    const messages = [
      { role: "system", content: enhancedSystem },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];
    try {
      const response = await invokeLLM({ messages });
      const rawContent = response.choices[0]?.message?.content;
      const reply = typeof rawContent === "string" ? rawContent : "Sorry, having a connection issue. Try again?";
      const summaryMatch = typeof reply === "string" ? reply.match(/```send_summary\s*([\s\S]*?)```/) : null;
      if (summaryMatch) {
        try {
          const summaryData = JSON.parse(summaryMatch[1].trim());
          const summaryContent = buildChatSummary(history, message, summaryData.name);
          const forgeUrl = ENV.forgeApiUrl;
          const forgeKey = ENV.forgeApiKey;
          if (forgeUrl && forgeKey && summaryData.email) {
            await fetch(`${forgeUrl}/v1/email/send`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${forgeKey}`
              },
              body: JSON.stringify({
                to: summaryData.email,
                subject: `Your OMA Townhouse Chat Summary`,
                body: summaryContent
              })
            }).catch((e) => console.log("Summary email failed:", e));
          }
          const cleanReply = reply.replace(/```send_summary[\s\S]*?```/g, "").trim();
          return { reply: cleanReply, leadCollected: false, summarySent: true };
        } catch (e) {
          console.error("Failed to send summary:", e);
        }
      }
      const leadMatch = typeof reply === "string" ? reply.match(/```lead_data\s*([\s\S]*?)```/) : null;
      if (leadMatch) {
        try {
          const leadData = JSON.parse(leadMatch[1].trim());
          const db = await getDb();
          if (db) {
            await db.insert(leads).values({
              name: leadData.name || null,
              email: leadData.email || null,
              whatsapp: leadData.whatsapp || null,
              budget: leadData.budget || null,
              details: JSON.stringify({
                instagram: leadData.instagram,
                country: leadData.country,
                language: leadData.language,
                notes: leadData.notes
              }),
              conversationSummary: history.slice(-10).map((m) => `${m.role}: ${m.content}`).join("\n"),
              status: "new"
            });
            const emailContent = `
NEW LEAD - OMA TOWNHOUSE

CONTACT INFO:
Name: ${leadData.name || "Not provided"}
Email: ${leadData.email || "Not provided"}
WhatsApp: ${leadData.whatsapp || "Not provided"}
Instagram: ${leadData.instagram || "Not provided"}
Country: ${leadData.country || "Not specified"}
Preferred Language: ${leadData.language || "English"}

NOTES:
${leadData.notes || "None"}

CONVERSATION SUMMARY:
${history.slice(-8).map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}

---
Follow up within 24 hours.
              `.trim();
            await notifyOwner({
              title: `New Lead: ${leadData.name || "Anonymous"} from ${leadData.country || "Unknown"}`,
              content: emailContent
            });
            try {
              const forgeUrl = ENV.forgeApiUrl;
              const forgeKey = ENV.forgeApiKey;
              if (forgeUrl && forgeKey) {
                await fetch(`${forgeUrl}/v1/email/send`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${forgeKey}`
                  },
                  body: JSON.stringify({
                    to: "contact@omatownhouse.com",
                    subject: `New OMA Townhouse Lead: ${leadData.name || "Anonymous"} from ${leadData.country || "Unknown"}`,
                    body: emailContent
                  })
                }).catch((e) => console.log("Email API not available:", e));
              }
            } catch (emailError) {
              console.log("Email notification skipped:", emailError);
            }
          }
          const cleanReply = reply.replace(/```lead_data[\s\S]*?```/g, "").trim();
          return { reply: cleanReply, leadCollected: true };
        } catch (e) {
          console.error("Failed to parse lead data:", e);
        }
      }
      return { reply, leadCollected: false };
    } catch (error) {
      console.error("LLM error:", error);
      throw new Error("Failed to generate response");
    }
  })
});
function buildChatSummary(history, lastMessage, name) {
  const allMessages = [...history, { role: "user", content: lastMessage }];
  const pricingMentioned = allMessages.some(
    (m) => m.content.toLowerCase().includes("price") || m.content.toLowerCase().includes("cost") || m.content.toLowerCase().includes("$") || m.content.toLowerCase().includes("leasehold") || m.content.toLowerCase().includes("freehold")
  );
  const locationMentioned = allMessages.some(
    (m) => m.content.toLowerCase().includes("location") || m.content.toLowerCase().includes("where") || m.content.toLowerCase().includes("canggu") || m.content.toLowerCase().includes("nuanu")
  );
  let summary = `Hi ${name || "there"},

Thanks for chatting with us about OMA Townhouse! Here's a summary of what we discussed:

`;
  summary += `--- PROPERTY OVERVIEW ---
`;
  summary += `OMA Townhouse \u2014 Kaba Kaba, Tabanan, Bali
`;
  summary += `Total size: 97.5 sqm across 2 floors
`;
  summary += `Ground floor: 66.7 sqm (8.78 x 7.6m)
`;
  summary += `Upper floor: 30.8 sqm (4.06 x 7.6m)
`;
  summary += `Features: Private pool, premium finishes

`;
  if (pricingMentioned) {
    summary += `--- PRICING ---
`;
    summary += `25-Year Leasehold: from $115,000 (early bird) to $135,000
`;
    summary += `40-Year Leasehold: from $161,000 (early bird) to $189,000
`;
    summary += `Freehold (PT PMA): from $265,000 (early bird) to $310,000
`;
    summary += `First building promo: 15% off \u2014 30% deposit within 14 days

`;
  }
  if (locationMentioned) {
    summary += `--- LOCATION HIGHLIGHTS ---
`;
    summary += `10-15 min: Nuanu Creative City, Luna Beach Club, Kedungu Beach
`;
    summary += `20-25 min: Pererenan (Reload Sanctuary, cafes)
`;
    summary += `25-30 min: Canggu (Batu Bolong, Finns Beach Club, Yuki)

`;
  }
  summary += `--- USEFUL LINKS ---
`;
  summary += `Nuanu Creative City: https://www.nuanu.com/
`;
  summary += `Reload Sanctuary Gym: https://www.instagram.com/reloadsanctuary/
`;
  summary += `Finns Beach Club: https://www.finnsbeachclub.com/
`;
  summary += `Grow International School: https://growinkedungu.com/

`;
  summary += `--- CONVERSATION ---
`;
  history.slice(-10).forEach((m) => {
    summary += `${m.role === "user" ? "You" : "OMA"}: ${m.content}

`;
  });
  summary += `---
Our team will be in touch within 24 hours. If you have any questions in the meantime, just reply to this email or chat with us again on our website.

Warm regards,
OMA Townhouse Team`;
  return summary;
}

// server/storage.ts
function getStorageConfig() {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;
  if (!baseUrl || !apiKey) {
    throw new Error(
      "Storage proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}
function buildUploadUrl(baseUrl, relKey) {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}
function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function toFormData(data, contentType, fileName) {
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}
function buildAuthHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  const uploadUrl = buildUploadUrl(baseUrl, key);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildAuthHeaders(apiKey),
    body: formData
  });
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }
  const url = (await response.json()).url;
  return { key, url };
}

// server/imageRouter.ts
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
var IMAGES_DIR = "/home/ubuntu/oma-townhouse/optimized-images";
var imageRouter = router({
  // Upload all optimized images to S3
  uploadGalleryImages: publicProcedure.mutation(async () => {
    const files = readdirSync(IMAGES_DIR).filter((f) => f.endsWith(".webp"));
    const results = [];
    for (const file of files) {
      const filePath = join(IMAGES_DIR, file);
      const fileBuffer = readFileSync(filePath);
      const key = `oma-townhouse/gallery/${file}`;
      try {
        const result = await storagePut(key, fileBuffer, "image/webp");
        results.push({ file, url: result.url, key: result.key });
        console.log(`\u2713 Uploaded ${file} \u2192 ${result.url}`);
      } catch (error) {
        console.error(`\u2717 Failed to upload ${file}:`, error);
      }
    }
    return results;
  }),
  // Get list of gallery images (for frontend)
  getGalleryImages: publicProcedure.query(() => {
    return [];
  })
});

// server/lifestyleRouter.ts
import { eq as eq2, asc } from "drizzle-orm";

// server/content/lifestyleArticles.ts
var LIFESTYLE_ARTICLES = [
  {
    slug: "gyms-fitness",
    title: "Gyms and Fitness Near Kaba Kaba",
    category: "fitness",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/OZqFwqmLzpWwJFpW.webp",
    sortOrder: 1,
    metaDescription: "Gyms and fitness near Kaba Kaba, Bali: Reload Sanctuary, Omni Gym and The Block are a short drive from OMA Townhouse and Canggu.",
    body: `<p>One question buyers ask before going off-plan in Kaba Kaba is simple. Can you keep a serious training routine this far from Canggu? The answer is yes. <a href="https://www.instagram.com/reloadsanctuary/" data-external="true">Reload Sanctuary</a> in Canggu is a 6,000 sqm wellness complex with a full gym, rooftop performance zone, recovery spa and biohacking rooms, about 25 to 30 minutes from OMA.</p><p>Closer in, <a href="https://www.instagram.com/omnibali/" data-external="true">Omni Gym</a> in Pererenan is a 20 to 25 minute drive and a favourite among serious lifters. <a href="https://www.instagram.com/theblockbali/" data-external="true">The Block Bali</a> runs functional and CrossFit style sessions, and <a href="https://www.instagram.com/nirvanalifebali/" data-external="true">Nirvana Life</a> pairs training with longer wellness retreats.</p><p>For an off-plan investor this matters more than it looks. A location that supports the daily habits owners and tenants actually want is a location that rents. You trade the Canggu traffic for rice field views on the drive, and the gym is still there when you arrive.</p>`,
    venues: [
      { name: "Reload Sanctuary", distance: "25-30 min", coords: "-8.6478,115.1385", url: "https://www.instagram.com/reloadsanctuary/" },
      { name: "Omni Gym", distance: "20-25 min", coords: "-8.6395,115.1290", url: "https://www.instagram.com/omnibali/" },
      { name: "The Block Bali", distance: "20-25 min", coords: "-8.6410,115.1310", url: "https://www.instagram.com/theblockbali/" },
      { name: "Nirvana Life", distance: "25-30 min", coords: "-8.6550,115.1400", url: "https://www.instagram.com/nirvanalifebali/" }
    ],
    faq: [
      {
        question: "Are there good gyms near Kaba Kaba?",
        answer: "Yes. Omni Gym in Pererenan is 20 to 25 minutes away, and Canggu venues like Reload Sanctuary and The Block Bali are roughly 25 to 30 minutes from OMA Townhouse."
      },
      {
        question: "How far is Kaba Kaba from Canggu?",
        answer: "About 25 minutes by car, which keeps Canggu gyms, cafes and beach clubs within easy reach while land prices stay well below Canggu levels."
      }
    ]
  },
  {
    slug: "cafes-dining",
    title: "Cafes and Dining Around Kaba Kaba and Seseh",
    category: "dining",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/ABCQFXQbtcsZAkdh.webp",
    sortOrder: 2,
    metaDescription: "Cafes and restaurants near Kaba Kaba and Seseh, Bali, from Open House Seseh to Yuki Canggu, all a short drive from OMA Townhouse.",
    body: `<p>What is the food scene like if you buy off-plan near Kaba Kaba? Strong, and getting stronger. In Seseh, 15 to 20 minutes away, <a href="https://www.instagram.com/openhouseseseh/" data-external="true">Open House Seseh</a> has become the local favourite for rice field views and a slow morning. <a href="https://www.instagram.com/neighbourhoodseseh/" data-external="true">Neighbourhood Seseh</a> and <a href="https://www.instagram.com/thalassabali/" data-external="true">Thalassa</a> fill out the same stretch.</p><p>Toward Canggu, 25 to 30 minutes from OMA, <a href="https://www.instagram.com/yukicanggu/" data-external="true">Yuki Canggu</a> on Batu Bolong runs a 14 course omakase and a modern izakaya menu. <a href="https://www.instagram.com/chottomatto.bali/" data-external="true">Chotto Matto</a> handles ramen and Japanese street food, and <a href="https://www.instagram.com/cratecafebali/" data-external="true">Crate Cafe</a> remains a reliable work-and-coffee spot with meals from about 50k IDR.</p><p>For a rental owner the takeaway is practical. Guests want options within a short drive, and Kaba Kaba sits between the quiet Seseh cafes and the busier Canggu names without putting you in the middle of either crowd.</p>`,
    venues: [
      { name: "Yuki Canggu", distance: "25-30 min", coords: "-8.6510,115.1380", url: "https://www.instagram.com/yukicanggu/" },
      { name: "Chotto Matto", distance: "25-30 min", coords: "-8.6500,115.1370", url: "https://www.instagram.com/chottomatto.bali/" },
      { name: "Crate Cafe", distance: "25-30 min", coords: "-8.6490,115.1360", url: "https://www.instagram.com/cratecafebali/" },
      { name: "Open House Seseh", distance: "15-20 min", coords: "-8.6200,115.1250", url: "https://www.instagram.com/openhouseseseh/" },
      { name: "Neighbourhood Seseh", distance: "15-20 min", coords: "-8.6180,115.1240", url: "https://www.instagram.com/neighbourhoodseseh/" }
    ],
    faq: [
      {
        question: "Where are the best cafes near Kaba Kaba?",
        answer: "Open House Seseh and Neighbourhood Seseh are 15 to 20 minutes away, while Crate Cafe and the wider Canggu cafe scene sit around 25 to 30 minutes from OMA Townhouse."
      }
    ]
  },
  {
    slug: "beach-clubs",
    title: "Beach Clubs Near Kaba Kaba, Minus the Traffic",
    category: "lifestyle",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/PDCHwUSBfHEidARn.webp",
    sortOrder: 3,
    metaDescription: "Beach clubs near Kaba Kaba, Bali: Luna Beach Club at Nuanu is 10 to 15 minutes from OMA Townhouse, with Finns, La Brisa and Atlas close by.",
    body: `<p>How close are the beach clubs if you invest off-plan in Kaba Kaba? Closer than most people expect. Your nearest is <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> at Nuanu, 10 to 15 minutes from OMA, with sunset views and no Batu Bolong gridlock on the way.</p><p><a href="https://www.instagram.com/finnsbeachclub/" data-external="true">Finns Beach Club</a> sits 25 to 30 minutes away with its oceanfront pools and bars. <a href="https://www.instagram.com/labrisabali/" data-external="true">La Brisa</a> on Echo Beach, built from repurposed fishing boats, has some of the better sunsets on this coast. <a href="https://www.instagram.com/atlasbeachclub/" data-external="true">Atlas Beach Club</a>, one of the largest anywhere, is also within reach.</p><p>That mix is part of the off-plan case for the area. You hold an asset in a calm rice field village and still put owners and guests at a world ranked beach club inside fifteen minutes.</p>`,
    venues: [
      { name: "Luna Beach Club", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.instagram.com/lunabeachclub/" },
      { name: "Finns Beach Club", distance: "25-30 min", coords: "-8.6560,115.1350", url: "https://www.instagram.com/finnsbeachclub/" },
      { name: "La Brisa", distance: "25-30 min", coords: "-8.6530,115.1320", url: "https://www.instagram.com/labrisabali/" },
      { name: "Atlas Beach Club", distance: "30-35 min", coords: "-8.6600,115.1400", url: "https://www.instagram.com/atlasbeachclub/" }
    ],
    faq: [
      {
        question: "What is the closest beach club to OMA Townhouse?",
        answer: "Luna Beach Club at Nuanu, about 10 to 15 minutes away, with Finns, La Brisa and Atlas Beach Club reachable in 25 to 35 minutes."
      }
    ]
  },
  {
    slug: "spas-wellness",
    title: "Wellness and Spas Within Reach of Kaba Kaba",
    category: "wellness",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/NAcHHeirtQpdYOqQ.webp",
    sortOrder: 4,
    metaDescription: "Spas and wellness near Kaba Kaba, Bali: Ulaman Retreat is minutes from OMA Townhouse, with Therapy, Udara and Canggu spas a short drive away.",
    body: `<p>Wellness is one of the quieter reasons people buy off-plan in this part of Tabanan. Right in the Kaba Kaba area, <a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Retreat</a> is an eco-luxury resort that has put the village on the map for high-end travellers, 5 to 10 minutes from OMA.</p><p>In Pererenan, 20 to 25 minutes out, <a href="https://www.instagram.com/therapybali/" data-external="true">Therapy Day Spa</a> offers toxin-free treatments in a calm setting. <a href="https://www.instagram.com/goldustbali/" data-external="true">Goldust Spa</a> and <a href="https://www.instagram.com/amospabali/" data-external="true">AMO Spa</a> are long-running Canggu names. In Seseh, <a href="https://www.instagram.com/udarabali/" data-external="true">Udara Bali</a> combines yoga retreats with detox and spa services, and <a href="https://www.instagram.com/solacefloat/" data-external="true">Solace Float</a> covers float therapy.</p><p>For a rental property a nearby retreat like Ulaman does real work. It signals the kind of guest the area attracts and supports the nightly rates that make the yield case stand up.</p>`,
    venues: [
      { name: "Ulaman Retreat", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" },
      { name: "Therapy Day Spa", distance: "20-25 min", coords: "-8.6380,115.1280", url: "https://www.instagram.com/therapybali/" },
      { name: "Udara Bali", distance: "15-20 min", coords: "-8.6150,115.1220", url: "https://www.instagram.com/udarabali/" },
      { name: "Goldust Spa", distance: "25-30 min", coords: "-8.6480,115.1350", url: "https://www.instagram.com/goldustbali/" }
    ],
    faq: [
      {
        question: "Is there a wellness retreat near Kaba Kaba?",
        answer: "Yes. Ulaman Retreat, an eco-luxury wellness resort, is 5 to 10 minutes from OMA Townhouse, with more spas in Seseh and Canggu within 25 minutes."
      }
    ]
  },
  {
    slug: "local-community",
    title: "Living in Kaba Kaba and the Local Scene",
    category: "community",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/wMIMhbjKOmFFjkpP.webp",
    sortOrder: 5,
    metaDescription: "Living in Kaba Kaba, Bali: a real village community near Canggu, anchored by Kaba Kaba Social and Ulaman, with modern amenities a short drive away.",
    body: `<p>What is it actually like to live in Kaba Kaba? The draw is not only what sits nearby, it is the village itself. <a href="https://www.instagram.com/kabakaba.social/" data-external="true">Kaba Kaba Social</a> is the local hub where residents and expats mix in a way the bigger areas no longer manage.</p><p><a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Resort</a> brings international wellness travellers through, which keeps the area grounded but outward looking. Balinese ceremonies, temple festivals and a real sense of neighbourhood are still part of daily life here.</p><p>People often describe this as the Canggu of about ten years ago, before the crowds and the price jumps, except you now get modern amenities a short drive away. For an off-plan buyer, the gap between today's land price and the direction the area is heading is the whole point.</p>`,
    venues: [
      { name: "Kaba Kaba Social", distance: "2-5 min", coords: "-8.5780,115.1480", url: "https://www.instagram.com/kabakaba.social/" },
      { name: "Ulaman Resort", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" }
    ],
    faq: [
      {
        question: "What is the community like in Kaba Kaba?",
        answer: "A genuine Balinese village with active ceremonies and a local social scene, plus an international crowd drawn by Ulaman, all about 25 minutes from Canggu."
      }
    ]
  },
  {
    slug: "hotels-development",
    title: "Why Tabanan and Kaba Kaba Are Drawing Investment",
    category: "development",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/RFpzOLCapYdEXOzx.webp",
    sortOrder: 6,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-01-20",
    citations: [
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "Alila Hotels by Hyatt", url: "https://www.hyatt.com/brands/alila" }
    ],
    metaDescription: "Tabanan and Kaba Kaba are drawing investment: Alila Hotels, the 44 hectare Nuanu Creative City and quality-tourism policy are reshaping the area.",
    body: `<p>Why buy off-plan in Tabanan rather than a finished villa in Canggu? Look at who is moving in. <a href="https://www.instagram.com/alilahotels/" data-external="true">Alila Hotels</a> is opening in the Tabanan area, and when established luxury operators commit, land values tend to follow.</p><p><a href="https://www.nuanu.com" data-external="true">Nuanu Creative City</a> is a 44 hectare development 10 to 15 minutes from OMA, bringing coworking, international schools, wellness venues and <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> to the doorstep. That is a large, funded build happening next door rather than a forecast on a brochure.</p><p>The Tabanan government is promoting quality tourism, meaning higher-end, lower-density development that protects the landscape. Early Canggu buyers saw their land multiply over the cycle, and off-plan pricing in Kaba Kaba is positioned against that same pattern today. None of this is a guarantee, so treat the figures as ranges and not as financial advice, but the direction of travel is hard to miss.</p>`,
    venues: [
      { name: "Nuanu Creative City", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Alila (coming soon)", distance: "15-20 min", coords: "-8.5900,115.1200", url: "https://www.instagram.com/alilahotels/" }
    ],
    faq: [
      {
        question: "Is Kaba Kaba a good place to invest in Bali?",
        answer: "The area sits beside the 44 hectare Nuanu development and incoming hotel brands like Alila, with land priced well below Canggu. Returns are never guaranteed, so treat any projection as a range."
      },
      {
        question: "What is Nuanu Creative City?",
        answer: "A 44 hectare development 10 to 15 minutes from OMA Townhouse with international schools, coworking, wellness venues and Luna Beach Club."
      }
    ]
  },
  {
    slug: "schools-family",
    title: "Schools and Healthcare Near Kaba Kaba for Families",
    category: "family",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/LQcTfcrQovcgmBPl.webp",
    sortOrder: 7,
    metaDescription: "Schools and healthcare near Kaba Kaba, Bali: Grow International and ProEd at Nuanu plus Tabanan hospitals, all a short drive from OMA Townhouse.",
    body: `<p>Can you relocate to Kaba Kaba with a family and still cover school and healthcare? Yes, and it is better connected than the location suggests. <a href="https://growinkedungu.com/" data-external="true">Grow International School</a> in Kedungu is about 10 minutes away and runs a Cambridge curriculum with a shuttle. <a href="https://www.nuanu.com" data-external="true">ProEd Global School at Nuanu</a> gives a second international option right next door.</p><p>For healthcare, Kasih Ibu Hospital in Tabanan is 15 to 20 minutes out for everyday needs. <a href="https://www.bfriendhospital.com/" data-external="true">BFriend Hospital</a> and <a href="https://www.siloamhospitals.com/" data-external="true">Siloam Hospital</a> handle more specialised care 30 to 40 minutes away.</p><p>For a buyer weighing an off-plan home as a place to actually live, that combination of schooling, hospitals and a safe village setting is what makes Kaba Kaba workable for families rather than only for investors.</p>`,
    venues: [
      { name: "Grow International School", distance: "10 min", coords: "-8.5900,115.1150", url: "https://growinkedungu.com/" },
      { name: "Nuanu / ProEd", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Kasih Ibu Hospital", distance: "15-20 min", coords: "-8.5400,115.1700", url: "https://maps.google.com/?q=Kasih+Ibu+Hospital+Tabanan" }
    ],
    faq: [
      {
        question: "Are there international schools near Kaba Kaba?",
        answer: "Yes. Grow International School in Kedungu is about 10 minutes away, and ProEd Global School at Nuanu is 10 to 15 minutes from OMA Townhouse."
      }
    ]
  },
  {
    slug: "foreigners-buy-property-bali",
    title: "Can US and Dubai Investors Buy Property in Bali?",
    category: "investment",
    imageUrl: "/blog/blog-nuanu-creative.webp",
    sortOrder: 8,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-02-03",
    layoutVariant: "qa",
    metaDescription: "Can US and Dubai investors buy property in Bali? Yes, through leasehold, Hak Pakai or a PT PMA company. Here is how each route works for foreign buyers.",
    body: `<p>Yes, foreigners can invest in Bali property, including buyers from the United States and the United Arab Emirates. What changes is the structure, not the eligibility. Indonesian law does not let a foreign individual hold freehold (Hak Milik) land title, so overseas buyers use one of a few established routes instead.</p><p>The first is leasehold, where you hold the right to use a property for a fixed term, commonly 25 or 40 years, often with an agreed extension. The entry price is lower and the paperwork is simpler, which is why many first-time buyers start here. OMA Townhouse offers 25 and 40 year leasehold on this basis.</p><p>The second is Hak Pakai, a right-to-use title available to a foreigner who holds an Indonesian residence permit such as a KITAS or KITAP. The third is a foreign-owned company, a <a href="https://oss.go.id" data-external="true">PT PMA</a>, which can hold Hak Guna Bangunan, the right to build and use the land. A PT PMA is the route most buyers take when they want freehold-style control and the ability to run the property as a rental business. OMA offers freehold through this structure.</p><p>For a US citizen or a Dubai-based investor, the practical point is that your nationality does not block any of these. You work within the same framework as every other foreign buyer. Money you transfer into Indonesia is reported through the banking system, so keep clean records of the funds you bring in.</p><p>This is general information and not legal or tax advice. Permit categories and rules change, so confirm the current position with a licensed Indonesian notary (PPAT) and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Indonesia Investment Coordinating Board (BKPM)", url: "https://www.bkpm.go.id" },
      { label: "Online Single Submission (OSS) company portal", url: "https://oss.go.id" }
    ],
    gallery: [
      { url: "/blog/blog-nuanu-creative.webp", alt: "Development near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Rice terraces in Tabanan, Bali" }
    ],
    faq: [
      {
        question: "Can a US citizen buy property in Bali?",
        answer: "Yes. US citizens use the same routes as other foreigners: leasehold for a fixed term, Hak Pakai with an Indonesian residence permit, or a PT PMA company for freehold-style ownership."
      },
      {
        question: "Can foreigners own freehold land in Bali?",
        answer: "Not as individuals. Freehold (Hak Milik) is reserved for Indonesian citizens. Foreigners reach freehold-style control through a PT PMA company that holds Hak Guna Bangunan."
      },
      {
        question: "Do I need to live in Bali to buy?",
        answer: "No. The leasehold and PT PMA routes do not require residency. Hak Pakai does require an Indonesian residence permit such as a KITAS or KITAP."
      }
    ]
  },
  {
    slug: "bali-vs-dubai-property",
    title: "Bali vs Dubai Property for Foreign Investors",
    category: "investment",
    imageUrl: "/blog/kedungu-beach.jpg",
    sortOrder: 9,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-02-17",
    metaDescription: "Bali vs Dubai property for foreign investors: Dubai allows direct freehold, Bali uses leasehold or a PT PMA company. Compare ownership, entry price and tax.",
    body: `<p>For a foreign investor choosing between Bali and Dubai, the clearest difference is ownership. In Dubai you can buy freehold as a foreigner in designated freehold zones, a right set out in the emirate's 2002 property reforms, and hold the title in your own name. In Bali you cannot hold freehold as an individual. You use leasehold, a Hak Pakai right-to-use title, or a PT PMA company, the same routes covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p><p>Entry price is the next split. Dubai's established freehold districts tend to start higher in absolute terms. Emerging Bali areas such as Tabanan sit lower, which is part of the off-plan case. At OMA Townhouse, leasehold starts at 115,000 USD and freehold via PT PMA at 265,000 USD, and land in this area runs well below Canggu prices.</p><p>Both markets draw international rental demand, so the question is less about which is busier and more about where your capital fits. Rental yields move with season, management quality and location, so treat any figure you read as a range rather than a promise.</p><p>Tax also differs. The UAE has no personal income tax, while Indonesia taxes rental income, so a Bali rental needs that built into the numbers. A Dubai buyer used to tax-free rental should plan for it rather than be caught out by it.</p><p>Neither market is universally better. Dubai offers direct freehold and a tax-light setup. Bali offers a lower entry point and a different lifestyle, with ownership handled through leasehold or a company. This is general information, not financial, legal or tax advice, so confirm current rules and pricing with a qualified adviser and the OMA Townhouse team.</p>`,
    venues: [],
    citations: [
      { label: "Dubai Land Department", url: "https://dubailand.gov.ae" },
      { label: "Indonesia Investment Coordinating Board (BKPM)", url: "https://www.bkpm.go.id" }
    ],
    gallery: [
      { url: "/blog/kedungu-beach.jpg", alt: "Kedungu Beach near Tabanan, Bali" },
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba" }
    ],
    faq: [
      {
        question: "Is Bali or Dubai better for property investment?",
        answer: "Neither is universally better. Dubai allows direct foreign freehold and has no personal income tax. Bali has a lower entry point but uses leasehold or a PT PMA company and taxes rental income. The right choice depends on your budget and goals."
      },
      {
        question: "Can foreigners own freehold in Dubai but not Bali?",
        answer: "Yes. Dubai lets foreigners own freehold in designated zones. Indonesia reserves freehold for citizens, so foreign buyers in Bali use leasehold, Hak Pakai or a PT PMA company."
      },
      {
        question: "Are Bali rental yields higher than in Dubai?",
        answer: "Yields in both markets vary with location, season and management, so treat any single figure as a range. This is not financial advice."
      }
    ]
  },
  {
    slug: "tax-for-foreign-property-owners-bali",
    title: "Bali Rental Income Tax for Foreign Owners",
    category: "investment",
    imageUrl: "/blog/blog-rice-field.webp",
    sortOrder: 10,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-22",
    layoutVariant: "qa",
    metaDescription: "How is a Bali rental taxed for a foreign owner? Non-residents face 20 percent PPh 26 on gross rent. A PT PMA pays 22 percent corporate tax on net profit.",
    body: `<p>What tax do foreign property owners pay on a Bali rental? Two main lines apply. If you hold the villa in your own name as a non-resident, Indonesia withholds 20 percent of the gross rent under Article 26 of the income tax law, known as PPh 26. If you hold the property through a PT PMA company instead, the company pays 22 percent corporate income tax on net profit and you take the cash out as a dividend.</p><p>If you become an Indonesian tax resident, by spending 183 days or more in any 12 month period, the rule shifts to <a href="https://www.pajak.go.id/en/node/34297" data-external="true">PPh Pasal 4 ayat 2</a>, a 10 percent final tax on the gross rent from land and buildings. The legal basis is Government Regulation 34/2017.</p><p>Short-term holiday rental also pulls in a local tax, PHR, charged by the regency at up to 10 percent of accommodation revenue. The annual property tax, PBB (Pajak Bumi dan Bangunan), is set as a small percent of the government-assessed value, known as the NJOP. Rates vary by regency and generally sit in a 0.1 to 0.5 percent band on the taxable base. The Directorate General of Taxes covers the framework on its <a href="https://www.pajak.go.id/en/node/57517" data-external="true">PBB page</a>.</p><p>Repatriating rental income from Indonesia is routine when the paperwork is clean. PT PMA dividends paid to a foreign shareholder carry a 20 percent withholding tax under PPh 26, often reduced under a treaty if you provide a Certificate of Domicile. The company must also file quarterly LKPM reports to BKPM as a condition of operating and remitting profit. For a US owner the cleared funds land in your home account in USD. For a Dubai-based owner the UAE does not tax personal income, so once the Indonesian side is settled the receipt is clean.</p><p>One practical comparison. A Dubai freehold throws off rent in your own name with no local income tax. A Bali villa pays Indonesian tax first, then the after-tax cash comes home. None of this is tax advice, so confirm your position with a qualified Indonesian tax adviser and the OMA Townhouse team before you commit. The same routes are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p>`,
    venues: [],
    citations: [
      { label: "Directorate General of Taxes: PPh Pasal 4 ayat 2 (rental of land and buildings)", url: "https://www.pajak.go.id/en/node/34297" },
      { label: "Directorate General of Taxes: Pajak Bumi dan Bangunan (PBB)", url: "https://www.pajak.go.id/en/node/57517" },
      { label: "PwC Worldwide Tax Summaries: Indonesia individual income", url: "https://taxsummaries.pwc.com/indonesia/individual/income-determination" },
      { label: "ILA Global Consulting: real estate tax in Indonesia", url: "https://ilaglobalconsulting.com/real-estate-tax-indonesia/" }
    ],
    gallery: [
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Tabanan rice terraces, Bali" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City near Kaba Kaba" }
    ],
    faq: [
      {
        question: "How is rental income taxed for foreigners in Indonesia?",
        answer: "Non-residents face a 20 percent withholding tax on gross rent under Article 26 (PPh 26). Indonesian tax residents pay a 10 percent final tax on gross rent from land and buildings under PPh Pasal 4 ayat 2. A PT PMA holds the asset as a company and pays 22 percent corporate income tax on net profit instead."
      },
      {
        question: "Can a US or UAE owner repatriate Bali rental income?",
        answer: "Yes. PT PMA profits and dividends can be transferred abroad once Indonesian tax is settled and quarterly LKPM reports are filed with BKPM. Dividends to a foreign shareholder carry a 20 percent withholding tax, sometimes reduced under a tax treaty if a Certificate of Domicile is provided."
      },
      {
        question: "Is there annual property tax (PBB) in Bali?",
        answer: "Yes. PBB (Pajak Bumi dan Bangunan) is the annual land and building tax. Rates depend on the regency and the government-assessed value (NJOP), generally falling in a 0.1 to 0.5 percent band on the taxable base."
      }
    ]
  },
  {
    slug: "buy-bali-off-plan-property-remotely",
    title: "How to Buy Bali Off-Plan Property Remotely",
    category: "investment",
    imageUrl: "/blog/digital-nomad-cafe.webp",
    sortOrder: 11,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-23",
    layoutVariant: "qa",
    metaDescription: "How to buy Bali off-plan property remotely from the US or Dubai. Power of attorney, PPJB and AJB, notary (PPAT), and the rupiah transfer rule explained.",
    body: `<p>Yes, you can buy Bali off-plan property remotely from the US or Dubai. Most foreign buyers sign through a notarised Power of Attorney filed with an Indonesian notary, and never need to fly in before closing. The notary, a PPAT, handles title verification at the National Land Agency (BPN) on your behalf.</p><p>Indonesia joined the Hague Apostille Convention on 4 June 2022, which replaced the older embassy legalisation chain with a single apostille from your home country. In the US that is the state Secretary of State; the UAE issues apostilles through its Ministry of Foreign Affairs. The Indonesian notary drafts your Power of Attorney, you sign and notarise it at home, you apostille it, then you courier it to Bali. Articles 1792 to 1819 of the Indonesian Civil Code (KUHPerdata) cover proxy signing, so your appointed attorney can execute the deeds for you.</p><p>The paperwork follows a known order. A Letter of Intent reserves the unit against a deposit, usually around 10 percent. The PPJB (Perjanjian Pengikatan Jual Beli) is the binding pre-sale agreement that locks in price, payment schedule and delivery date during the build. The notarial deed, AJB for freehold or a lease deed for leasehold, completes the transfer once the unit is delivered and the title is ready to register at <a href="https://www.atrbpn.go.id" data-external="true">BPN</a>. Only a licensed PPAT can register title in Indonesia, so both deeds are signed before one.</p><p>Money is the part that catches most first-time foreign buyers. <a href="https://www.abnrlaw.com/news/regulation-on-mandatory-use-of-rupiah-and-prohibition-of-dual-price-denomination" data-external="true">Bank Indonesia Regulation 17/3/PBI/2015</a> requires domestic property transactions to be denominated and settled in rupiah, so wires from your home bank in USD or AED convert to IDR on arrival. Off-plan payments usually stage 10 to 20 percent at signing, then milestone payments at foundation, roof and handover. Third-party escrow is available at around 1 to 2 percent of the deal and is worth using; Indonesian law does not mandate it, so favour a developer with a track record and a payment schedule tied to construction milestones.</p><p>For a US buyer, transfers above 25,000 USD per month into rupiah need underlying-transaction documents at the receiving bank, so keep your PPJB, invoices and POA on hand. A Dubai-based buyer has no UAE-side exchange control to worry about. This is general information and not legal, tax or financial advice; confirm the current rules with a licensed Indonesian notary before you commit. Ownership routes are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>, and tax in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>.</p>`,
    venues: [],
    citations: [
      { label: "Ministry of Law and Human Rights: Indonesia Apostille service", url: "https://apostille.ahu.go.id" },
      { label: "Bank Indonesia Regulation 17/3/PBI/2015 (Mandatory Use of Rupiah)", url: "https://peraturan.bpk.go.id/Details/135519/peraturan-bi-no-173pbi2015-tahun-2015" },
      { label: "ABNR Counsellors at Law: Mandatory Use of Rupiah and Dual Price Denomination", url: "https://www.abnrlaw.com/news/regulation-on-mandatory-use-of-rupiah-and-prohibition-of-dual-price-denomination" },
      { label: "Conventus Law: Apostille Convention In Full Effect In Indonesia", url: "https://conventuslaw.com/report/apostille-convention-finally-in-full-effect-in-indonesia/" }
    ],
    gallery: [
      { url: "/blog/digital-nomad-cafe.webp", alt: "Foreign buyer working remotely from a Bali cafe" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City development near Kaba Kaba" },
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" }
    ],
    faq: [
      {
        question: "Do you need to fly to Bali to buy off-plan?",
        answer: "No. Most foreign buyers sign through a notarised Power of Attorney filed with an Indonesian notary (PPAT). Since Indonesia joined the Hague Apostille Convention on 4 June 2022, a single apostille from your home country replaces the older embassy legalisation chain."
      },
      {
        question: "How do due diligence and notary (PPAT) steps work remotely?",
        answer: "A licensed Indonesian notary (PPAT) verifies the title at the National Land Agency (BPN), drafts the PPJB pre-sale agreement, and later executes the AJB or lease deed. Your appointed attorney signs on your behalf under your apostilled Power of Attorney, then the PPAT submits the deed to BPN for registration."
      },
      {
        question: "How are off-plan payments transferred internationally?",
        answer: "You wire USD or AED from your home bank. The funds convert to IDR on arrival because Bank Indonesia Regulation 17/3/PBI/2015 requires domestic property transactions to settle in rupiah. Payments typically stage 10 to 20 percent at signing, then at foundation, roof and handover."
      }
    ]
  },
  {
    slug: "is-bali-off-plan-a-good-investment-2026",
    title: "Is Bali Off-Plan a Good Investment in 2026?",
    category: "investment",
    imageUrl: "/blog/blog-rice-field.webp",
    sortOrder: 12,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-24",
    layoutVariant: "qa",
    metaDescription: "Is Bali off-plan property a good investment for foreigners in 2026? Yields, the new Tabanan land conversion rule, and how Bali stacks up against US benchmarks.",
    body: `<p>Bali off-plan property can be a sound investment for a foreign buyer in 2026, but the answer turns on the ownership structure and where you buy. The market split is now clear. Professionally managed villas in supply-constrained pockets are holding occupancy, while oversupplied corridors like central Canggu have compressed on nightly rate. Off-plan in an emerging area such as Tabanan is where the lower land basis still leaves room to grow.</p><p>On yields, place numbers in context. <a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" data-external="true">Colliers</a> puts Bali gross villa yields in roughly a 4.4 to 6.9 percent band, with managed luxury operators reporting higher net figures once season and management quality are accounted for. Treat any figure as a range. By comparison, US residential gross yields averaged about 6.56 percent in late 2025 according to the <a href="https://www.globalpropertyguide.com/north-america/united-states/rental-yields" data-external="true">Global Property Guide</a>, and <a href="https://www.attomdata.com/news/market-trends/single-family-rental/2026-single-family-rental-market-report/" data-external="true">ATTOM's 2026 read</a> shows single-family rental yields falling in roughly 55 percent of US counties.</p><p>The bigger 2026 shift is regulatory. Bali Governor's Instruction Number 5 of 2025, in force from 2 December 2025, prohibits the conversion of productive rice fields to tourism use across six regencies that include Tabanan. <a href="https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" data-external="true">The Bali Sun</a> walks through the policy, and <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub</a> covers the legal teeth, including penalties under Law 41 of 2009. Projects already licensed on non-agricultural land continue. For an off-plan buyer on a permitted, non-rice-paddy site, the practical effect is a cap on future competing supply that over time supports rate and resale.</p><p>Demand is still moving. Bali drew 6.94 million foreign visitors in 2025 and the provincial 2026 target is 6.63 million, per the plan covered by <a href="https://jakartaglobe.id/lifestyle/bali-targets-66-million-international-visitors-in-2026" data-external="true">Jakarta Globe</a>. A villa in Tabanan within 25 to 30 minutes of Canggu rents on the spillover of the busier corridor while you carry the lower land basis.</p><p>Risks are real. Off-plan delivery can slip, and the 2024 to 2025 villa oversupply has pressured nightly rate on weaker product. Mitigate by picking a developer with a track record. Tie the payment schedule to construction milestones, and check that the title sits on properly zoned, non-agricultural land before you sign. Foreigners hold through leasehold, Hak Pakai or a PT PMA company, as covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>; rental income is then taxed under the rules in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>. This is general information and not financial, legal or tax advice. Confirm the specifics with a qualified Indonesian notary and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Colliers Quarterly Property Market Report Q1 2026 Bali Hotel", url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" },
      { label: "Global Property Guide: United States residential rental yields", url: "https://www.globalpropertyguide.com/north-america/united-states/rental-yields" },
      { label: "ATTOM Data: 2026 Single-Family Rental Market Report", url: "https://www.attomdata.com/news/market-trends/single-family-rental/2026-single-family-rental-market-report/" },
      { label: "The Bali Sun: Balancing Land Conversion and Tourism Development in 2026", url: "https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" },
      { label: "Emerhub: Bali Criminalizes Rice Field Conversions", url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" },
      { label: "Jakarta Globe: Bali Targets 6.6 Million International Visitors in 2026", url: "https://jakartaglobe.id/lifestyle/bali-targets-66-million-international-visitors-in-2026" }
    ],
    gallery: [
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Tabanan rice terraces, Bali" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City development near Kaba Kaba" }
    ],
    faq: [
      {
        question: "What are the risks for a foreign off-plan buyer in Bali?",
        answer: "The main risks are delivery delays, title or zoning issues, and rate compression in oversupplied micro-markets. Mitigate by choosing a developer with a track record, a payment schedule tied to construction milestones, and a clean non-agricultural title that complies with Bali Governor's Instruction Number 5 of 2025."
      },
      {
        question: "How do Bali yields compare to US rental markets?",
        answer: "Independent trackers put Bali gross villa yields in roughly a 4 to 7 percent band, with managed luxury operators reporting higher net figures. US residential gross yields averaged about 6.56 percent in late 2025 according to the Global Property Guide, and ATTOM's 2026 read shows single-family yields falling in roughly 55 percent of US counties. Treat any figure as a range, not a promise."
      },
      {
        question: "What protects an off-plan buyer if the build slips?",
        answer: "Most protection sits in the PPJB, the binding pre-sale agreement, which fixes price, payment schedule and delivery date and sets penalties for late delivery. Stage payments against construction milestones and consider third-party escrow at around 1 to 2 percent of the deal. This is general information, not legal advice."
      }
    ]
  }
];

// server/lifestyleRouter.ts
function toClientArticle(a, id) {
  return {
    id,
    slug: a.slug,
    title: a.title,
    content: { body: a.body, venues: a.venues },
    category: a.category,
    imageUrl: a.imageUrl,
    sortOrder: a.sortOrder,
    lastRefreshed: a.publishedAt ? new Date(a.publishedAt) : null,
    metaDescription: a.metaDescription ?? null,
    faq: a.faq ?? [],
    heroImage: a.heroImage ?? null,
    gallery: a.gallery ?? [],
    citations: a.citations ?? [],
    showMap: a.showMap ?? null,
    mapCoords: a.mapCoords ?? null,
    layoutVariant: a.layoutVariant ?? null,
    readingTime: a.readingTime ?? null,
    author: a.author ?? null,
    publishedAt: a.publishedAt ?? null,
    updatedAt: a.updatedAt ?? null,
    isInsight: a.isInsight ?? false
  };
}
function seedContentJson(article) {
  return JSON.stringify({
    body: article.body,
    venues: article.venues,
    metaDescription: article.metaDescription,
    faq: article.faq,
    isInsight: article.isInsight,
    heroImage: article.heroImage,
    gallery: article.gallery,
    citations: article.citations,
    showMap: article.showMap,
    mapCoords: article.mapCoords,
    layoutVariant: article.layoutVariant,
    readingTime: article.readingTime,
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt
  });
}
async function seedArticles() {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select({ slug: lifestyleArticles.slug }).from(lifestyleArticles);
  const existingSlugs = new Set(existing.map((row) => row.slug));
  const toInsert = LIFESTYLE_ARTICLES.filter((a) => !existingSlugs.has(a.slug));
  if (toInsert.length === 0) return;
  for (const article of toInsert) {
    await db.insert(lifestyleArticles).values({
      slug: article.slug,
      title: article.title,
      content: seedContentJson(article),
      category: article.category,
      imageUrl: article.imageUrl || null,
      sortOrder: article.sortOrder,
      isActive: 1
    });
  }
  console.log("[Lifestyle] Seeded", toInsert.length, "new articles");
}
seedArticles().catch(console.error);
var lifestyleRouter = router({
  // Get all active articles. Falls back to the static content module when no
  // database is configured (e.g. the Vercel deploy with no DATABASE_URL), so
  // the section always renders.
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      return [...LIFESTYLE_ARTICLES].sort((x, y) => x.sortOrder - y.sortOrder).map((a, i) => toClientArticle(a, i + 1));
    }
    const articles = await db.select().from(lifestyleArticles).where(eq2(lifestyleArticles.isActive, 1)).orderBy(asc(lifestyleArticles.sortOrder));
    return articles.map((a) => {
      const content = JSON.parse(a.content);
      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        content,
        category: a.category,
        imageUrl: a.imageUrl,
        sortOrder: a.sortOrder,
        lastRefreshed: a.lastRefreshed,
        // Blog/insights fields are not stored as columns; surface any that were
        // persisted in the JSON content, otherwise fall back to defaults so the
        // shape matches the static branch (toClientArticle).
        metaDescription: content.metaDescription ?? null,
        faq: content.faq ?? [],
        heroImage: content.heroImage ?? null,
        gallery: content.gallery ?? [],
        citations: content.citations ?? [],
        showMap: content.showMap ?? null,
        mapCoords: content.mapCoords ?? null,
        layoutVariant: content.layoutVariant ?? null,
        readingTime: content.readingTime ?? null,
        author: content.author ?? null,
        publishedAt: content.publishedAt ?? null,
        updatedAt: content.updatedAt ?? null,
        isInsight: content.isInsight ?? false
      };
    });
  }),
  // Refresh content using AI (called by scheduled task or admin)
  refresh: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) return { success: false, message: "Database not available" };
    try {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a content writer for OMA Townhouse, an off-plan property development in Kaba Kaba, Tabanan, Bali. Update the lifestyle articles about the area with the latest developments, aimed at people researching off-plan property investment and relocation in Bali. Write in a clear, natural tone, like a knowledgeable local rather than a salesperson. Front-load a direct answer in the first sentence. Keep each article body under 250 words. Wrap paragraphs in <p> tags and include HTML anchor tags with the data-external="true" attribute for any venue or place mentioned. Never use em dashes, en dashes, curly quotes, emoji, or rule-of-three pile-ups. Frame any yield or return figures as ranges, not guarantees. Return valid JSON.`
          },
          {
            role: "user",
            content: `Update these lifestyle articles about living near and investing off-plan in Kaba Kaba, Bali. Weave in relevant search terms naturally across off-plan property, location (Kaba Kaba, Tabanan, Canggu, Nuanu), investment (freehold vs leasehold, rental yield, capital appreciation), and lifestyle/relocation themes. Include specific venue names with Instagram or website links where possible.

Categories to cover:
1. Gyms & Fitness (Reload Sanctuary, Omni, The Block, Nirvana Life)
2. Cafes & Dining (Yuki, Chotto Matto, Crate, Open House Seseh, Neighbourhood)
3. Beach Clubs (Luna at Nuanu, Finns, La Brisa, Atlas)
4. Spas & Wellness (Therapy, Goldust, AMO, Udara, Ulaman)
5. Local Community (Kaba Kaba Social, Ulaman Resort)
6. New Hotels & Development (Alila, Nuanu Creative City)
7. Schools & Family (Grow International, ProEd, hospitals)

Return a JSON array of objects with: slug, title, body (HTML string with <a> tags).
Keep the same slugs: gyms-fitness, cafes-dining, beach-clubs, spas-wellness, local-community, hotels-development, schools-family`
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "lifestyle_articles",
            strict: true,
            schema: {
              type: "object",
              properties: {
                articles: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      slug: { type: "string" },
                      title: { type: "string" },
                      body: { type: "string" }
                    },
                    required: ["slug", "title", "body"],
                    additionalProperties: false
                  }
                }
              },
              required: ["articles"],
              additionalProperties: false
            }
          }
        }
      });
      const rawContent = response.choices[0]?.message?.content;
      if (typeof rawContent !== "string") {
        return { success: false, message: "No content from LLM" };
      }
      const parsed = JSON.parse(rawContent);
      const updatedArticles = parsed.articles;
      for (const article of updatedArticles) {
        const existing = await db.select().from(lifestyleArticles).where(eq2(lifestyleArticles.slug, article.slug)).limit(1);
        if (existing.length > 0) {
          const existingContent = JSON.parse(existing[0].content);
          const updatedContent = JSON.stringify({
            body: article.body,
            venues: existingContent.venues
            // Preserve venue data
          });
          await db.update(lifestyleArticles).set({
            title: article.title,
            content: updatedContent,
            lastRefreshed: /* @__PURE__ */ new Date()
          }).where(eq2(lifestyleArticles.slug, article.slug));
        }
      }
      return { success: true, message: `Updated ${updatedArticles.length} articles` };
    } catch (error) {
      console.error("[Lifestyle] Refresh error:", error);
      return { success: false, message: "Failed to refresh content" };
    }
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  chat: chatRouter,
  images: imageRouter,
  lifestyle: lifestyleRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/serverlessApp.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var serverlessApp_default = app;
export {
  serverlessApp_default as default
};
