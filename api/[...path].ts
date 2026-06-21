import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

// Vercel serverless entry point for the OMA Townhouse API.
//
// This mirrors the Express app built in server/_core/index.ts, but without the
// dev-only Vite middleware or the long-running `server.listen()` call — on
// Vercel each request is handled by this function. The client (Vite SPA) is
// served separately as static assets from dist/public (see vercel.json).
//
// The catch-all filename ([...path].ts) makes Vercel route every /api/* request
// here with the original URL preserved, so the routes registered below
// (/api/oauth/callback and /api/trpc/*) match exactly as they do locally.

const app = express();

// Larger body limit to match the local server (file uploads via image router).
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback under /api/oauth/callback
registerOAuthRoutes(app);

// tRPC API under /api/trpc
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
