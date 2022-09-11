// App router type

type AppRouter = typeof import("@/server/router/index").appRouter;
type AppRouterQueries = AppRouter["_def"]["queries"];
type AppRouterMutations = AppRouter["_def"]["mutations"];

// Inferring utils

type QueryOutput<TRouteKey extends keyof AppRouterQueries> =
  import("@trpc/server").inferProcedureOutput<AppRouterQueries[TRouteKey]>;
type QueryInput<TRouteKey extends keyof AppRouterQueries> =
  import("@trpc/server").inferProcedureInput<AppRouterQueries[TRouteKey]>;
type MutationOutput<TRouteKey extends keyof AppRouterMutations> =
  import("@trpc/server").inferProcedureOutput<AppRouterMutations[TRouteKey]>;
type MutationInput<TRouteKey extends keyof AppRouterMutations> =
  import("@trpc/server").inferProcedureInput<AppRouterMutations[TRouteKey]>;

// Data types

type TransactionItem = Unwrap<QueryOutput<"transactions.list">>;
type CategoryItem = Unwrap<QueryOutput<"categories.list">>;
type ScheduleItem = Unwrap<QueryOutput<"schedules.list">>;
type BudgetItem = NonNullable<Unwrap<QueryOutput<"budgets.get">>>;
type BudgetEntryItem = Unwrap<BudgetItem["entries"]>;
type BudgetSummary = NonNullable<Unwrap<QueryOutput<"budgets.summary.get">>>;
