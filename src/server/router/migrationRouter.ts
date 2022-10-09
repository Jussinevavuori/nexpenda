import { Category, Transaction, TransactionSchedule } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protectedRouter";

export const migrationRouter = createProtectedRouter()
  .mutation("migrate.userdata", {
    input: z.object({}),
    async resolve({
      ctx: {
        prisma,
        session: { user },
      },
    }) {
      console.log("[migration.userdata]: Starting user data migration");

      // Connect to old DB
      const _prisma = new (await (
        await import("@internal/prisma-next-prod/prisma/client")
      ).PrismaClient)();
      console.log("[migration.userdata]: Connected to old db");

      // Find previous user
      const oldUser = await _prisma.dbUser.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!oldUser) {
        console.log("[migration.userdata]: No previous user found");
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No matching user was found",
        });
      }
      console.log("[migration.userdata]: Found previous user");

      // Copy all user data
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: oldUser.photoUrl,
          name: oldUser.displayName,
        },
      });
      console.log("[migration.userdata]: Updated user");

      return oldUser;
    },
  })
  .mutation("migrate.cleardata", {
    input: z.object({}),
    async resolve({
      ctx: {
        prisma,
        session: { user },
      },
    }) {
      // Wipe all user data
      console.log("[migration.cleardata]: Starting clear data migration");
      if (process.env.NODE_ENV === "development") {
        const del_bge = await prisma.budgetEntry.deleteMany({
          where: { userId: user.id },
        });
        console.log(
          "[migration.cleardata]: Deleted",
          del_bge.count,
          "budget entries"
        );
        const del_bg = await prisma.budgetEntry.deleteMany({
          where: { userId: user.id },
        });
        console.log("[migration.cleardata]: Deleted", del_bg.count, "budgets");
        const del_tx = await prisma.transaction.deleteMany({
          where: { userId: user.id },
        });
        console.log(
          "[migration.cleardata]: Deleted",
          del_tx.count,
          "transactions"
        );
        const del_sc = await prisma.transactionSchedule.deleteMany({
          where: { userId: user.id },
        });
        console.log(
          "[migration.cleardata]: Deleted",
          del_sc.count,
          "transaction schedules"
        );
        const del_cg = await prisma.category.deleteMany({
          where: { userId: user.id },
        });
        console.log(
          "[migration.cleardata]: Deleted",
          del_cg.count,
          "categories"
        );
      }
    },
  })
  .mutation("migrate.getOldData", {
    input: z.object({ oldUserId: z.string() }),
    async resolve({ input: { oldUserId } }) {
      console.log("[migration.getOldData]: Starting get old data migration");

      // Connect to old DB
      const _prisma = new (await (
        await import("@internal/prisma-next-prod/prisma/client")
      ).PrismaClient)();

      console.log("[migration.getOldData]: Connected to old db");

      // Find all data for old user
      const oldTransactions = await _prisma.dbTransaction.findMany({
        where: { uid: oldUserId },
      });
      console.log(
        "[migration.getOldData]: Found",
        oldTransactions.length,
        "transactions"
      );
      const oldCategories = await _prisma.dbCategory.findMany({
        where: { uid: oldUserId },
      });
      console.log(
        "[migration.getOldData]: Found",
        oldCategories.length,
        "categories"
      );
      const oldSchedules = await _prisma.dbTransactionSchedule.findMany({
        where: { uid: oldUserId },
      });
      console.log(
        "[migration.getOldData]: Found",
        oldSchedules.length,
        "schedules"
      );

      return {
        oldTransactions,
        oldCategories,
        oldSchedules,
      };
    },
  })
  .mutation("migrate.pushCategories", {
    input: z.object({ categories: z.any().refine((_) => _ as Category[]) }),
    async resolve({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) {
      console.log("[migration.pushCategories]: Starting push categories");
      // Create categories
      const newCategories: Promise<Category>[] = [];
      for (const category of input.categories) {
        newCategories.push(
          prisma.category.create({
            data: {
              name: category.value,
              icon: category.icon,
              user: { connect: { id: user.id } },
              id: category.id,
              createdAt: category.createdAt,
              updatedAt: category.updatedAt,
            },
          })
        );
      }
      console.log(
        "[migration.pushCategories]: Pushed",
        newCategories.length,
        "categories"
      );
      return Promise.allSettled(newCategories);
    },
  })
  .mutation("migrate.pushSchedules", {
    input: z.object({
      schedules: z.any().refine((_) => _ as TransactionSchedule[]),
    }),
    async resolve({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) {
      console.log("[migration.pushSchedules]: Starting push schedules");
      // Create schedules
      const newSchedules: Promise<TransactionSchedule>[] = [];
      for (const schedule of input.schedules) {
        newSchedules.push(
          prisma.transactionSchedule.create({
            data: {
              user: { connect: { id: user.id } },
              category: { connect: { id: schedule.categoryId } },
              id: schedule.id,
              createdAt: schedule.createdAt,
              updatedAt: schedule.updatedAt,
              amount: schedule.integerAmount,
              comment: schedule.comment ?? "",
              firstOccurrence: schedule.firstOccurrence,
              intervals: schedule.intervalType,
              occurrences: schedule.occurrences,
              every: schedule.intervalEvery,
              latestCreatedOccurrence: schedule.latestCreatedOccurrence,
            },
          })
        );
      }
      console.log(
        "[migration.pushSchedules]: Pushed",
        newSchedules.length,
        "schedules"
      );
      return Promise.allSettled(newSchedules);
    },
  })
  .mutation("migrate.pushTransactions", {
    input: z.object({
      transactions: z.any().refine((_) => _ as Transaction[]),
    }),
    async resolve({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) {
      // Create transactions
      console.log("[migration.pushTransactions]: Starting push transactions");
      const newTransactions: Promise<Transaction>[] = [];
      for (const transaction of input.transactions) {
        newTransactions.push(
          prisma.transaction.create({
            data: {
              user: { connect: { id: user.id } },
              category: { connect: { id: transaction.categoryId } },
              id: transaction.id,
              createdAt: transaction.createdAt,
              updatedAt: transaction.updatedAt,
              amount: transaction.integerAmount,
              comment: transaction.comment ?? "",
              time: transaction.time,
              schedule: transaction.scheduleId
                ? { connect: { id: transaction.scheduleId } }
                : undefined,
            },
          })
        );
      }
      console.log(
        "[migration.pushTransactions]: Pushed",
        newTransactions.length,
        "transactions"
      );
      return Promise.allSettled(newTransactions);
    },
  });
