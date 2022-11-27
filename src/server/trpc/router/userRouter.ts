import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "@/env/env.server.mjs";
import { procedure, router } from "../trpc";

export const userRouter = router({
  /**
   * QUERY (Admin only)
   *
   * List all existing users
   */
  list: procedure.admin.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        accounts: true,
        preferences: true,
        sessions: true,
        transactions: { select: { amount: true } },
        transactionSchedules: { select: { id: true } },
        categories: { select: { id: true } },
        budgets: { select: { id: true } },
        budgetEntries: { select: { id: true } },
      },
    });
  }),

  /**
   * QUERY
   *
   * Get currently signed in user's public profile details
   */
  me: procedure.protected.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      select: {
        name: true,
        id: true,
        email: true,
        emailVerified: true,
        role: true,
        image: true,
        createdAt: true,
        accounts: {
          select: {
            provider: true,
            createdAt: true,
          },
        },
      },
      where: { id: ctx.session.user.id },
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND" });

    return user;
  }),

  /**
   * MUTATION
   *
   * Update your user details.
   *
   * Returns the updated user.
   */
  update: procedure.protected
    .input(
      z.object({
        name: z.string().min(1).optional(),
        image: z.string().min(1).optional().nullable(), // Base-64 image or url
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updateBatch: Partial<User> = {};

      // Update name
      if (input.name) {
        updateBatch.name = input.name;
      }

      // Remove image
      if (input.image === null) {
        updateBatch.image = null;
      }

      // Upload image
      if (
        typeof input.image === "string" &&
        input.image.startsWith(env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)
      ) {
        updateBatch.image = input.image;
      }

      // Update and return updated user
      return ctx.prisma.user.update({
        select: {
          name: true,
          id: true,
          email: true,
          emailVerified: true,
          role: true,
          image: true,
          createdAt: true,
          accounts: {
            select: {
              provider: true,
              createdAt: true,
            },
          },
        },
        where: { id: ctx.session.user.id },
        data: updateBatch,
      });
    }),
});
