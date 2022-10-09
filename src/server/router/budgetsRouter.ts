import { getPeriodEndDate } from "@/utils/dates/getPeriodEndDate";
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

  .mutation("update", {
    input: z.object({
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
    async resolve({}) {
      return {};
    },
  })
  .mutation("create", {
    input: z.object({
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
    async resolve({}) {
      return {};
    },
  });
