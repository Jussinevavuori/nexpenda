import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { requireRole } from "../utils/requireRole";
import { createProtectedRouter } from "../utils/protectedRouter";
import { env } from "@/env/env.server.mjs";

export const userRouter = createProtectedRouter()
  /**
   * List all profiles. Admin only.
   */
  .query("list", {
    async resolve({ ctx }) {
      requireRole("ADMIN", ctx);

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
    },
  })

  /**
   * Query your own profile. Returns public profile details.
   */
  .query("me", {
    async resolve({ ctx }) {
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
    },
  })

  /**
   * Update your user details.
   *
   * Returns the updated user.
   */
  .mutation("update", {
    input: z.object({
      name: z.string().min(1).optional(),
      image: z.string().min(1).optional().nullable(), // Base-64 image or url
    }),
    async resolve({ ctx, input }) {
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
    },
  });
