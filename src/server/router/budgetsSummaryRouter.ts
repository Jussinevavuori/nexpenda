import { getPeriodEndDate } from "@/utils/dates/getPeriodEndDate";
import { getPeriodPrismaFilter } from "@/utils/dates/getPeriodPrismaFilter";
import { maxAbs } from "@/utils/generic/maxAbs";
import { sum } from "@/utils/generic/sum";
import { toSet } from "@/utils/generic/toSet";
import { z } from "zod";
import { periodSchema } from "../utils/inputSchemas";
import { createProtectedRouter } from "../utils/protectedRouter";

export const budgetsSummaryRouter = createProtectedRouter().query("get", {
  input: z.object({ period: periodSchema }),
  async resolve({ input: { period }, ctx }) {
    // Allow only for month view
    if (!("month" in period)) return undefined;

    // =========================================================================
    // Primary data fetching.
    // =========================================================================

    // Fetch all transactions for given period
    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
        time: getPeriodPrismaFilter(period),
      },
    });

    // Fetch current budget for given period
    const budget = await ctx.prisma.budget.findFirst({
      where: {
        userId: ctx.session.user.id,
        date: { lte: getPeriodEndDate(period) },
      },
      include: {
        entries: {
          include: {
            category: {
              select: { id: true, name: true, icon: true },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    if (!budget) return undefined;

    // Savings target as decimal number
    const savingsTargetDecimal = budget.savingsTarget / 100;

    // =========================================================================
    // Calculate summaries for each budget entry. Also calculate uncaught
    // transactions.
    // =========================================================================

    const calculatePartial = (sign: "income" | "expense") => {
      // Utility function
      const isCorrectSign = (x: number) => (sign === "income" ? x > 0 : x < 0);

      // All transactions with correct sign
      const partialTransactions = transactions.filter((tx) =>
        isCorrectSign(tx.amount)
      );

      // Create set of all transaction IDs to keep track of which transactions
      // were unaccounted for
      const uncaughtTransactionIds = toSet(
        partialTransactions.map((_) => _.id)
      );

      // Each entry
      const entries = budget.entries
        // Only use income or expense entries based on current sign
        .filter((entry) => isCorrectSign(entry.amount))
        .map((entry) => {
          // All applicable transactions
          const entryTransactions = partialTransactions.filter(
            (tx) => tx.categoryId === entry.categoryId
          );

          // Remove transactions from transaction id set
          entryTransactions.forEach((tx) =>
            uncaughtTransactionIds.delete(tx.id)
          );

          // Sum and count
          const count = entryTransactions.length;
          const totalAmount = sum(entryTransactions.map((_) => _.amount));

          // TODO: Average over months

          return {
            id: entry.id,
            count: count,
            currentAmount: totalAmount,
            estimatedAmount: entry.amount,
            currentPercentage: (100 * totalAmount) / entry.amount,
            category: entry.category,
            averagedOverMonths: entry.averagedOverMonths,
          };
        });

      // All uncaught transactions into an uncaught property
      const uncaughtTransactions = partialTransactions.filter((tx) =>
        uncaughtTransactionIds.has(tx.id)
      );
      const uncaught = {
        count: uncaughtTransactions.length,
        amount: sum(uncaughtTransactions.map((_) => _.amount)),
      };

      // Total
      const currentAmount = sum(partialTransactions.map((_) => _.amount));
      const estimatedAmount = sum(entries.map((_) => _.estimatedAmount));

      const total = {
        currentAmount,
        estimatedAmount,
        availableAmount: maxAbs(currentAmount, estimatedAmount),
      };

      return {
        uncaught,
        entries,
        total,
      };
    };

    // Calculate both partials
    const expensesPartial = calculatePartial("expense");
    const incomesPartial = calculatePartial("income");

    // =========================================================================
    // Calculate final summaries for incomplete periods (current and future).
    // =========================================================================

    // How much the user has currently left to spend. Assumes the user reaches
    // at least the estimated income target.
    const estimatedLeftToSpendAmount =
      incomesPartial.total.availableAmount +
      expensesPartial.total.currentAmount;

    // Assuming the user hits the estimation targets exactly, shows how much
    // the user will have left at the end of the month
    const estimatedFinalAmount =
      incomesPartial.total.estimatedAmount +
      expensesPartial.total.estimatedAmount;

    // Assuming the user hits the estimation targets exactly, shows how much
    // the user should put into savings at the end of the month.
    const estimatedFinalSavingsAmount =
      estimatedFinalAmount > 0
        ? estimatedFinalAmount * savingsTargetDecimal
        : 0;

    // Assuming the user hits the estimation targets exactly, shows how much
    // the user will have left to spend at the end of the month.
    const estimatedFinalSpendingAmount =
      estimatedFinalAmount - estimatedFinalSavingsAmount;

    // =========================================================================
    // Calculate final summaries for complete periods (past).
    // =========================================================================

    // The real final amount (incomes - expenses)
    const realFinalAmount =
      incomesPartial.total.currentAmount + expensesPartial.total.currentAmount;

    // Assuming the user hits the estimation targets exactly, shows how much
    // the user should put into savings at the end of the month.
    const realFinalSavingsAmount =
      realFinalAmount > 0 ? realFinalAmount * savingsTargetDecimal : 0;

    // Assuming the user hits the estimation targets exactly, shows how much
    // the user will have left to spend at the end of the month.
    const realFinalSpendingAmount = realFinalAmount - realFinalSavingsAmount;

    return {
      digested: {
        savingsTarget: budget.savingsTarget,
        estimatedLeftToSpendAmount,
        estimatedFinalAmount,
        estimatedFinalSavingsAmount,
        estimatedFinalSpendingAmount,
        realFinalAmount,
        realFinalSavingsAmount,
        realFinalSpendingAmount,
      },
      incomes: incomesPartial,
      expenses: expensesPartial,
    };
  },
});
