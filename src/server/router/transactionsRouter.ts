import { getPeriodEndDate } from "@/utils/dates/getPeriodEndDate";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { getPeriodPrismaFilter } from "@/utils/dates/getPeriodPrismaFilter";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";
import { filterTransactions } from "@/utils/transaction/filterTransactions";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { periodSchema } from "../utils/inputSchemas";
import { createProtectedRouter } from "../utils/protectedRouter";

export const transactionsRouter = createProtectedRouter()
  /**
   * Get a single transaction.
   */
  .query("get", {
    input: z.object({
      id: z.string().min(1),
    }),
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
      query: z.string().optional(),
      period: periodSchema.optional(),
    }),
    async resolve({ ctx, input }) {
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          time: getPeriodPrismaFilter(input.period),
        },
        include: {
          category: true,
          schedule: true,
        },
      });

      if (input.query?.trim())
        return filterTransactions(transactions, input.query);

      return transactions;
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
      amount: z.number().int(),
      comment: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.transaction.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          category: {
            connectOrCreate: {
              where: {
                uniqueUidName: {
                  userId: ctx.session.user.id,
                  name: input.category,
                },
              },
              create: {
                name: input.category,
                user: { connect: { id: ctx.session.user.id } },
              },
            },
          },
          amount: input.amount,
          comment: input.comment,
          time: input.time,
        },
        include: {
          category: true,
          schedule: true,
        },
      });
    },
  })

  /**
   * Create many new transactions.
   *
   * Returns the created transactions.
   */
  .mutation("createMany", {
    input: z.array(
      z.object({
        time: z.date(),
        category: z.string().min(1),
        amount: z.number().int(),
        comment: z.string(),
      })
    ),
    async resolve({ ctx, input }) {
      return Promise.all(
        input.map((transaction) =>
          ctx.prisma.transaction.create({
            data: {
              user: { connect: { id: ctx.session.user.id } },
              category: {
                connectOrCreate: {
                  where: {
                    uniqueUidName: {
                      userId: ctx.session.user.id,
                      name: transaction.category,
                    },
                  },
                  create: {
                    name: transaction.category,
                    user: { connect: { id: ctx.session.user.id } },
                  },
                },
              },
              amount: transaction.amount,
              comment: transaction.comment,
              time: transaction.time,
            },
            include: {
              category: true,
              schedule: true,
            },
          })
        )
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
      amount: z.number().int(),
      comment: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      // Ensure user owns transactions being updated
      const targetTransaction = await ctx.prisma.transaction.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });
      if (!targetTransaction) throw new TRPCError({ code: "NOT_FOUND" });

      // Update
      return ctx.prisma.transaction.update({
        where: {
          id: input.id,
        },
        data: {
          comment: input.comment,
          time: input.time,
          amount: input.amount,
          category: input.category
            ? {
                connectOrCreate: {
                  where: {
                    uniqueUidName: {
                      userId: ctx.session.user.id,
                      name: input.category,
                    },
                  },
                  create: {
                    name: input.category,
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
