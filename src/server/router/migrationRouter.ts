import { Category, Transaction, TransactionSchedule } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protectedRouter";

export const migrationRouter = createProtectedRouter().mutation("migrate", {
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

    // Wipe all user data
    if (process.env.NODE_ENV === "development") {
      const del_bg = await prisma.budgetEntry.deleteMany({
        where: { userId: user.id },
      });
      const del_tx = await prisma.transaction.deleteMany({
        where: { userId: user.id },
      });
      const del_sc = await prisma.transactionSchedule.deleteMany({
        where: { userId: user.id },
      });
      const del_cg = await prisma.category.deleteMany({
        where: { userId: user.id },
      });
      console.log(
        `Deleted [${del_tx.count}, ${del_sc.count}, ${del_cg.count}, ${del_bg.count}] items`
      );
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

    console.log(`Updated user`);

    // Find all data for old user
    const oldTransactions = await _prisma.dbTransaction.findMany({
      where: { uid: oldUser.id },
    });
    const oldCategories = await _prisma.dbCategory.findMany({
      where: { uid: oldUser.id },
    });
    const oldSchedules = await _prisma.dbTransactionSchedule.findMany({
      where: { uid: oldUser.id },
    });

    console.log(
      `Found [${oldTransactions.length}, ${oldCategories.length}, ${oldSchedules.length}] items`
    );

    // Create categories
    const newCategories: Promise<Category>[] = [];
    for (const category of oldCategories) {
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
    console.log(`Created new`);
    await Promise.allSettled(newCategories);

    // Create schedules
    const newSchedules: Promise<TransactionSchedule>[] = [];
    for (const schedule of oldSchedules) {
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
    await Promise.allSettled(newSchedules);

    // Create transactions
    const newTransactions: Promise<Transaction>[] = [];
    for (const transaction of oldTransactions) {
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
    await Promise.allSettled(newTransactions);

    return {
      oldUser,
      oldTransactions: oldTransactions.length,
      oldCategories: oldCategories.length,
      oldSchedules: oldSchedules.length,
      updates: {
        user: {
          image: oldUser.photoUrl,
          name: oldUser.displayName,
        },
        transactions: newTransactions.length,
        categories: newCategories.length,
        schedules: newSchedules.length,
      },
    };
  },
});
