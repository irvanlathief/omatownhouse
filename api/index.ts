// Vercel serverless entry point for the OMA Townhouse API.
//
// The Express app lives in server/_core/serverlessApp.ts and is pre-bundled by
// esbuild into ./_handler.mjs during the build (see buildCommand in
// vercel.json). We re-export that self-contained bundle here rather than
// importing the server source directly, because Vercel's function compiler does
// not reliably resolve this project's ESM imports; the esbuild bundle does.
//
// Routing: vercel.json rewrites every /api/* request to this function. The
// rewrite is required because tRPC procedure paths contain a dot (for example
// /api/trpc/lifestyle.list); Vercel would otherwise treat the dotted segment as
// a static file and return 404 before reaching the function.

// @ts-expect-error - generated at build time by esbuild
export { default } from "./_handler.mjs";
