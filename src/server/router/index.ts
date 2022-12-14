// src/server/router/index.ts
import { createRouter } from "../context/context";
import superjson from "superjson";
import { userRouter } from "./userRouter";
import { transactionsRouter } from "./transactionsRouter";
import { feedbackRouter } from "./feedbackRouter";
import { schedulesRouter } from "./schedulesRouter";
import { preferencesRouter } from "./preferencesRouter";
import { categoriesRouter } from "./categoriesRouter";
import { budgetsRouter } from "./budgetsRouter";
import { budgetsSummaryRouter } from "./budgetsSummaryRouter";
import { analyticsRouter } from "./analyticsRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("transactions.", transactionsRouter)
  .merge("categories.", categoriesRouter)
  .merge("feedback.", feedbackRouter)
  .merge("schedules.", schedulesRouter)
  .merge("budgets.", budgetsRouter)
  .merge("budgets.summary.", budgetsSummaryRouter)
  .merge("preferences.", preferencesRouter)
  .merge("analytics.", analyticsRouter);
