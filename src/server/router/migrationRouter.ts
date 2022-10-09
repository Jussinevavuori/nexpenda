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
      // Connect to old DB
      const _prisma = new (await (
        await import("@internal/prisma-next-prod/prisma/client")
      ).PrismaClient)();

      // Find previous user
      const oldUser = await _prisma.dbUser.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!oldUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No matching user was found",
        });
      }

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
      if (process.env.NODE_ENV === "development") {
        await prisma.budgetEntry.deleteMany({ where: { userId: user.id } });
        await prisma.budgetEntry.deleteMany({ where: { userId: user.id } });
        await prisma.transaction.deleteMany({ where: { userId: user.id } });
        await prisma.transactionSchedule.deleteMany({
          where: { userId: user.id },
        });
        await prisma.category.deleteMany({ where: { userId: user.id } });
      }
    },
  })
  .mutation("migrate.getOldData", {
    input: z.object({ oldUserId: z.string() }),
    async resolve({ input: { oldUserId } }) {
      // Connect to old DB
      const _prisma = new (await (
        await import("@internal/prisma-next-prod/prisma/client")
      ).PrismaClient)();

      // Find all data for old user
      const oldTransactions = await _prisma.dbTransaction.findMany({
        where: { uid: oldUserId },
      });
      const oldCategories = await _prisma.dbCategory.findMany({
        where: { uid: oldUserId },
      });
      const oldSchedules = await _prisma.dbTransactionSchedule.findMany({
        where: { uid: oldUserId },
      });

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
      return Promise.allSettled(newTransactions);
    },
  });
