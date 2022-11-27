import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context/context";
import { procedureMiddleware } from "./context/middleware";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

/**
 * All procedure types
 */
export const procedure = {
  public: t.procedure,
  protected: t.procedure.use(procedureMiddleware.isAuthed),
  admin: t.procedure.use(procedureMiddleware.isAdminAuthed),
};
