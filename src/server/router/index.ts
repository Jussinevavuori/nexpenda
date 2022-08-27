// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { userRouter } from "./userRouter";
import { transactionsRouter } from "./transactionsRouter";
import { feedbackRouter } from "./feedbackRouter";
import { schedulesRouter } from "./schedulesRouter";
import { preferencesRouter } from "./preferencesRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("transactions.", transactionsRouter)
  .merge("feedback.", feedbackRouter)
  .merge("schedules.", schedulesRouter)
  .merge("preferences.", preferencesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
