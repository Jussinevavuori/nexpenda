import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

/**
 * All middleware for procedures
 */
export const procedureMiddleware = {
  /**
   * Reusable middleware to ensure users are logged in
   */
  isAuthed: middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  }),

  /**
   * Reusable middleware to ensure admin is logged in
   */
  isAdminAuthed: middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN")
      throw new TRPCError({ code: "FORBIDDEN" });

    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  }),
};
