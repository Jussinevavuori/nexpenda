import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createProtectedRouter,
  ProtectedRouterContext,
} from "./protectedRouter";

export const transactionsRouter = createProtectedRouter()
  /**
   * Get a single transaction.
   */
  .query("get", {
    input: z.object({ id: z.string().min(1) }),
    async resolve({ ctx, input }) {
      return ctx.prisma.transaction.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
        },
        include: {
          category: true,
          schedule: true,
        },
      });
    },
  })

  /**
   * List all transactions.
   * Optionally specify an interval.
   */
  .query("list", {
    input: z.object({
      interval: z.tuple([z.date(), z.date()]).optional(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          time: {
            gte: input.interval?.[0],
            lte: input.interval?.[1],
          },
        },
        include: {
          category: true,
          schedule: true,
        },
      });
    },
  })

  /**
   * Create a new transaction.
   *
   * Returns the created transaction.
   */
  .mutation("create", {
    input: z.object({
      time: z.date(),
      category: z.string().min(1),
      integerAmount: z.number().int(),
      comment: z.string().optional(),
      categoryIcon: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      return _createTransaction(ctx, input);
    },
  })

  /**
   * Creates multiple new transactions.
   *
   * Returns all new created transactions.
   */
  .mutation("createMany", {
    input: z.array(
      z.object({
        time: z.date(),
        category: z.string().min(1),
        integerAmount: z.number().int(),
        comment: z.string().optional(),
        categoryIcon: z.string().optional(),
      })
    ),
    async resolve({ ctx, input }) {
      return Promise.allSettled(
        input.map(async (instance) => _createTransaction(ctx, instance))
      );
    },
  })

  /**
   * Updates a transaction.
   *
   * Returns updated transaction.
   */
  .mutation("update", {
    input: z.object({
      id: z.string().min(1),
      time: z.date(),
      category: z.string().min(1),
      integerAmount: z.number().int(),
      comment: z.string().optional(),
      categoryIcon: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      // Ensure user owns transactions being updated
      const targetTransaction = await ctx.prisma.transaction.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });
      if (!targetTransaction) throw new TRPCError({ code: "NOT_FOUND" });

      // Update
      const updated = await ctx.prisma.transaction.update({
        where: {
          id: input.id,
        },
        data: {
          comment: input.comment,
          time: input.time,
          integerAmount: input.integerAmount,
          category: input.category
            ? {
                connectOrCreate: {
                  where: {
                    unique_uid_value: {
                      userId: ctx.session.user.id,
                      value: input.category,
                    },
                  },
                  create: {
                    value: input.category,
                    user: { connect: { id: ctx.session.user.id } },
                  },
                },
              }
            : undefined,
        },
        include: {
          category: true,
          schedule: true,
        },
      });

      // Update category icon if new icon provided in request.
      const updatedCategory =
        input.categoryIcon && input.categoryIcon !== updated.category.icon
          ? await ctx.prisma.category.update({
              where: { id: updated.category.id },
              data: { icon: input.categoryIcon },
            })
          : undefined;

      return { ...updated, category: updatedCategory ?? updated.category };
    },
  })

  /**
   * Deletes a single transaction.
   *
   * Returns amount of deleted transactions.
   */
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.transaction.deleteMany({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
        },
      });

      return result.count;
    },
  })

  /**
   * Deletes many transactions.
   *
   * Returns amount of deleted transactions.s
   */
  .mutation("deleteMany", {
    input: z.object({ ids: z.array(z.string()) }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.transaction.deleteMany({
        where: {
          userId: ctx.session.user.id,
          id: { in: input.ids },
        },
      });

      return result.count;
    },
  });

// =============================================================================
// Inner implementations for router
// =============================================================================

const _transactionCreateInputSchema = z.object({
  time: z.date(),
  category: z.string().min(1),
  integerAmount: z.number().int(),
  comment: z.string().optional(),
  categoryIcon: z.string().optional(),
});

/**
 * Implementation of creating transactions so they don't have to be
 * repeated in both "create" and "createMany"
 */
async function _createTransaction(
  ctx: ProtectedRouterContext,
  input: z.TypeOf<typeof _transactionCreateInputSchema>
) {
  const created = await ctx.prisma.transaction.create({
    data: {
      user: { connect: { id: ctx.session.user.id } },
      category: {
        connectOrCreate: {
          where: {
            unique_uid_value: {
              userId: ctx.session.user.id,
              value: input.category,
            },
          },
          create: {
            value: input.category,
            user: { connect: { id: ctx.session.user.id } },
          },
        },
      },
      integerAmount: input.integerAmount,
      comment: input.comment,
      time: input.time,
    },
    include: {
      category: true,
      schedule: true,
    },
  });

  // Update category icon if new icon provided in request.
  const updatedCategory =
    input.categoryIcon && input.categoryIcon !== created.category.icon
      ? await ctx.prisma.category.update({
          where: { id: created.category.id },
          data: { icon: input.categoryIcon },
        })
      : undefined;

  return {
    ...created,
    category: updatedCategory ?? created.category,
  };
}
