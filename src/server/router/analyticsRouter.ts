import { compareDate } from "@/utils/dates/compareDate";
import { getPeriodEndDate } from "@/utils/dates/getPeriodEndDate";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { getPeriodPrismaFilter } from "@/utils/dates/getPeriodPrismaFilter";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";
import { addDays, isSameDay } from "date-fns";
import { z } from "zod";
import { periodSchema } from "../utils/inputSchemas";
import { createProtectedRouter } from "./protectedRouter";

export const analyticsRouter = createProtectedRouter().query("get", {
  input: z.object({
    period: periodSchema,
  }),
  async resolve({ ctx, input }) {
    // Fetch all transactions for given period
    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
        time: getPeriodPrismaFilter(input.period),
      },
      include: {
        category: true,
        schedule: true,
      },
      orderBy: {
        time: "asc", // Important for later for algorithm to work
      },
    });

    // Get start and end dates for graphs:
    // - If all period, use dates of earliest and latest transaction
    // - Else use period start and end dates
    const isAllPeriod = getPeriodLength(input.period) === "all";
    const minDate = isAllPeriod
      ? transactions[0]?.time ?? new Date()
      : getPeriodStartDate(input.period);
    const maxDate = isAllPeriod
      ? transactions[transactions.length - 1]?.time ?? new Date()
      : getPeriodEndDate(input.period);

    // Set up collections for charts
    const charts = {
      tot: [{ y: 0, x: 0 }],
      exp: [{ y: 0, x: 0 }],
      inc: [{ y: 0, x: 0 }],
    };

    // Set up sums
    const sums = {
      tot: 0,
      exp: 0,
      inc: 0,
      cat: {} as Record<
        string,
        { name: string; tot: number; exp: number; inc: number }
      >,
    };

    // Start iterating from current date
    let currentDate = minDate;
    let i = 0;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */

    // Iterate entire collection
    while (compareDate(currentDate, "<=", maxDate)) {
      // Count sums for each transaction in current date
      while (transactions[i] && isSameDay(transactions[i]!.time, currentDate)) {
        const amount = transactions[i]!.amount;
        if (amount > 0) sums.inc += amount;
        if (amount < 0) sums.exp += amount;
        sums.tot += amount;

        // Category
        const catId = transactions[i]!.categoryId;
        if (!sums.cat[catId])
          sums.cat[catId] = {
            tot: 0,
            exp: 0,
            inc: 0,
            name: transactions[i]!.category.name,
          };
        if (amount > 0) sums.cat[catId]!.inc += amount;
        if (amount < 0) sums.cat[catId]!.exp += amount;
        sums.cat[catId]!.tot += amount;

        i++;
      }

      // Register each data point
      charts.tot.push({ y: sums.tot / 100, x: charts.tot.length });
      charts.inc.push({ y: sums.inc / 100, x: charts.inc.length });
      charts.exp.push({ y: -sums.exp / 100, x: charts.exp.length });

      // Go to next date
      currentDate = addDays(currentDate, 1);
    }

    return {
      sums,
      charts,
    };
  },
});
