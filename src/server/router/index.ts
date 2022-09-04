// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { userRouter } from "./userRouter";
import { transactionsRouter } from "./transactionsRouter";
import { feedbackRouter } from "./feedbackRouter";
import { schedulesRouter } from "./schedulesRouter";
import { preferencesRouter } from "./preferencesRouter";
import { categoriesRouter } from "./categoriesRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("transactions.", transactionsRouter)
  .merge("categories.", categoriesRouter)
  .merge("feedback.", feedbackRouter)
  .merge("schedules.", schedulesRouter)
  .merge("preferences.", preferencesRouter);
