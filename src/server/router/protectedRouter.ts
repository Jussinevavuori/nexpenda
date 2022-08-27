import * as trpc from "@trpc/server";
import { createRouter, RouterContext } from "./context";

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 */
export function createProtectedRouter() {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
}

export type ProtectedRouterContext = RouterContext & {
  session: RouterContext["session"] & {
    user: NonNullable<NonNullable<RouterContext["session"]>["user"]>;
  };
};
