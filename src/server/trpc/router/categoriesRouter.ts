import { sum } from "@/utils/generic/sum";
import { TRPCError } from "@trpc/server";
import { endOfDay, startOfDay, subMonths } from "date-fns";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const categoriesRouter = router({
  /**
   * List all categories with their average monthly spending
   */
  list: procedure.protected
    .input(
      z.object({
        // Defaults to 3
        averageTotalMonths: z.number().positive().int().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const averageTotalMonths = input.averageTotalMonths ?? 3;

      // Get transactions for past three months
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          time: {
            gte: startOfDay(subMonths(new Date(), averageTotalMonths)),
            lte: endOfDay(new Date()),
          },
        },
        select: {
          categoryId: true,
          amount: true,
          id: true,
        },
      });

      // Get all categories
      const categories = await ctx.prisma.category.findMany({
        where: {
          userId: ctx.session.user.id,
          // t only categories for which one active transaction exists
          transactions: {
            some: { userId: ctx.session.user.id },
          },
        },
        orderBy: { name: "asc" },
      });

      // Get the 3 month average for a category
      const getCategoryAverage = (categoryId: string) => {
        // Get all transactions in past 3 months for category
        const txs = transactions.filter((tx) => tx.categoryId === categoryId);

        // Take average
        return sum(txs.map((_) => _.amount)) / averageTotalMonths;
      };

      return categories.map((c) => ({
        ...c,
        average: getCategoryAverage(c.id),
      }));
    }),

  /**
   * List all categories with their average monthly spending, by whether they
   * are income or expense.
   */
  listByType: procedure.protected
    .input(
      z.object({
        // Defaults to 3
        averageTotalMonths: z.number().positive().int().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const averageTotalMonths = input.averageTotalMonths ?? 3;

      // Get transactions for past three months
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          time: {
            gte: startOfDay(subMonths(new Date(), averageTotalMonths)),
            lte: endOfDay(new Date()),
          },
        },
        select: {
          categoryId: true,
          amount: true,
          id: true,
        },
      });

      const incomeCategories = await ctx.prisma.category.findMany({
        where: {
          userId: ctx.session.user.id,
          // List only categories for which one active transaction exists
          // and they have income transactions associated with them
          transactions: {
            some: {
              userId: ctx.session.user.id,
              amount: { gt: 0 },
            },
          },
        },
        orderBy: { name: "asc" },
      });
      const expenseCategories = await ctx.prisma.category.findMany({
        where: {
          userId: ctx.session.user.id,
          // List only categories for which one active transaction exists
          // and they have expense transactions associated with them
          transactions: {
            some: {
              userId: ctx.session.user.id,
              amount: { lt: 0 },
            },
          },
        },
        orderBy: { name: "asc" },
      });

      // Get the 3 month average for a category
      const getCategoryAverage = (categoryId: string, sign: "inc" | "exp") => {
        // Get all transactions in past 3 months for category
        const txs = transactions.filter(
          (tx) =>
            (sign === "inc" ? tx.amount > 0 : tx.amount < 0) &&
            tx.categoryId === categoryId
        );

        // Take average
        return sum(txs.map((_) => _.amount)) / averageTotalMonths;
      };

      return {
        incomeCategories: incomeCategories.map((c) => ({
          ...c,
          average: getCategoryAverage(c.id, "inc"),
        })),
        expenseCategories: expenseCategories.map((c) => ({
          ...c,
          average: getCategoryAverage(c.id, "exp"),
        })),
      };
    }),

  /**
   * Update a category's icon
   */
  updateIcon: procedure.protected
    .input(z.object({ categoryId: z.string(), icon: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Ensure user owns transactions being updated
      const targetCategory = await ctx.prisma.category.findFirst({
        where: { id: input.categoryId, userId: ctx.session.user.id },
      });
      if (!targetCategory) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.prisma.category.update({
        where: { id: input.categoryId },
        data: {
          icon: input.icon,
        },
      });
    }),
});
