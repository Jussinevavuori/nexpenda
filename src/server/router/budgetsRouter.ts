import { getPeriodEndDate } from "@/utils/dates/getPeriodEndDate";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { getPeriodPrismaFilter } from "@/utils/dates/getPeriodPrismaFilter";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { periodSchema } from "../utils/inputSchemas";
import { createProtectedRouter } from "../utils/protectedRouter";

export const budgetsRouter = createProtectedRouter()
  /**
   * For a given month (only for month periods currently),
   * fetch the latest created budget to be used.
   */
  .query("get", {
    input: z.object({ period: periodSchema }),
    async resolve({ ctx, input: { period } }) {
      if (!("month" in period)) return undefined;

      const endDate = getPeriodEndDate(period);

      const result = await ctx.prisma.budget.findFirst({
        where: {
          user: { id: ctx.session.user.id },
          date: { lte: endDate },
        },
        include: { entries: true },
        orderBy: {
          date: "desc",
        },
      });

      return result || undefined;
    },
  })

  .mutation("create", {
    input: z.object({
      name: z.string(),
      period: periodSchema,
      savingsTarget: z.number().int().min(0).max(100),
      entries: z.array(
        z.object({
          amount: z.number().int(),
          categoryId: z.string().min(1),
          averagedOverMonths: z.number().int().positive(),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      if (getPeriodLength(input.period) !== "month") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Can only create budget for month",
        });
      }

      // Check if a budget already exists for selected period and delete it
      const existingBudget = await ctx.prisma.budget.findFirst({
        where: {
          date: getPeriodPrismaFilter(input.period),
        },
      });
      if (existingBudget) {
        await ctx.prisma.budgetEntry.deleteMany({
          where: { budgetId: existingBudget.id },
        });
        await ctx.prisma.budget.delete({ where: { id: existingBudget.id } });
      }

      // Create budget
      const budget = await ctx.prisma.budget.create({
        data: {
          savingsTarget: input.savingsTarget,
          name: input.name,
          date: getPeriodStartDate(input.period),
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      // Create entries
      await Promise.allSettled(
        input.entries.map((entry) =>
          ctx.prisma.budgetEntry.create({
            data: {
              amount: entry.amount,
              averagedOverMonths: entry.averagedOverMonths,
              budget: { connect: { id: budget.id } },
              user: { connect: { id: ctx.session.user.id } },
              category: { connect: { id: entry.categoryId } },
            },
          })
        )
      );

      // Fetch final created budget with entries
      return ctx.prisma.budget.findUnique({ where: { id: budget.id } });
    },
  });
