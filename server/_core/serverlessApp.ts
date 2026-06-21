import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";

// The OMA Townhouse Express app, shared by the local dev server and the Vercel
// serverless function. It has no Vite middleware and never calls listen().
//
// On Vercel this file is pre-bundled by esbuild into api/_handler.mjs (see the
// build script in vercel.json) and re-exported from api/index.ts. We bundle it
// ourselves because Vercel's function compiler does not reliably resolve this
// project's ESM path aliases / extensionless imports; esbuild does, producing a
// self-contained handler.

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
