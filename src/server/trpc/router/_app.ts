// src/server/router/index.ts
import { userRouter } from "./userRouter";
import { transactionsRouter } from "./transactionsRouter";
import { feedbackRouter } from "./feedbackRouter";
import { schedulesRouter } from "./schedulesRouter";
import { preferencesRouter } from "./preferencesRouter";
import { categoriesRouter } from "./categoriesRouter";
import { budgetsRouter } from "./budgetsRouter";
import { budgetsSummaryRouter } from "./budgetsSummaryRouter";
import { analyticsRouter } from "./analyticsRouter";
import { router } from "../trpc";

export const appRouter = router({
  user: userRouter,
  transactions: transactionsRouter,
  categories: categoriesRouter,
  feedback: feedbackRouter,
  schedules: schedulesRouter,
  budgets: budgetsRouter,
  budgetsSummary: budgetsSummaryRouter,
  preferences: preferencesRouter,
  analytics: analyticsRouter,
});
