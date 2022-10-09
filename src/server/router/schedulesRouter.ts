import { groupByDateSerialToMap } from "@/utils/dates/groupByDateSerialToMap";
import { z } from "zod";
import { createProtectedRouter } from "../utils/protectedRouter";
import { compareDate } from "@/utils/dates/compareDate";
import { serializeDate } from "@/utils/dates/serializeDate";
import { isSameDay } from "date-fns";
import { getLastOccurrence } from "@/utils/schedules/getLastOccurrence";
import { getNextOccurrence } from "@/utils/schedules/getNextOccurrence";
import { TRPCError } from "@trpc/server";

export const schedulesRouter = createProtectedRouter()
  /**
   * List all existing schedules.
   */
  .query("list", {
    async resolve({ ctx }) {
      return ctx.prisma.transactionSchedule.findMany({
        where: { userId: ctx.session.user.id },
        include: {
          category: { select: { id: true, name: true, icon: true } },
          transactions: { select: { id: true } },
        },
      });
    },
  })

  /**
   * Creates a new transaction schedule. Allows assigning existing transactions
   * to it.
   *
   * Returns created transaction schedule.
   */
  .mutation("create", {
    input: z.object({
      firstOccurrence: z.date(),
      occurrences: z.number().int().nonnegative().optional(),
      intervals: z.enum(["DAY", "WEEK", "MONTH", "YEAR"]),
      every: z.number().positive().int(),
      amount: z.number().int(),
      category: z.string().min(1),
      comment: z.string(),
      assignTransactions: z.array(z.string().min(1)).optional(),
    }),
    async resolve({ ctx, input }) {
      const created = await ctx.prisma.transactionSchedule.create({
        data: {
          firstOccurrence: input.firstOccurrence,
          occurrences: input.occurrences || undefined,
          every: input.every,
          intervals: input.intervals,
          amount: input.amount,
          comment: input.comment,
          user: { connect: { id: ctx.session.user.id } },
          category: {
            connectOrCreate: {
              where: {
                uniqueUidName: {
                  userId: ctx.session.user.id,
                  name: input.category,
                },
              },
              create: {
                name: input.category,
                user: { connect: { id: ctx.session.user.id } },
              },
            },
          },
        },
        include: {
          transactions: { select: { id: true } },
          category: { select: { id: true, name: true, icon: true } },
        },
      });

      // Assign specified transactions to schedules, first ensuring they
      // belong to the user.
      if (input.assignTransactions) {
        for (const transactionId of input.assignTransactions) {
          const transaction = await ctx.prisma.transaction.findUnique({
            where: { id: transactionId },
          });
          if (transaction && transaction.userId === ctx.session.user.id) {
            await ctx.prisma.transaction.update({
              where: { id: transactionId },
              data: { schedule: { connect: { id: created.id } } },
            });
          }
        }
      }

      // Return created transaction schedule
      return await ctx.prisma.transactionSchedule.findFirst({
        where: { userId: ctx.session.user.id, id: created.id },
        include: {
          category: { select: { id: true, name: true, icon: true } },
        },
      });
    },
  })

  /**
   * Mutation to synchronize transactions to the schedule. When called,
   * creates all transactions that have occurred and are yet to be created.
   *
   * Returns all created items.
   */
  .mutation("sync", {
    async resolve({ ctx }) {
      // Get all transactions and schedules
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          user: { id: ctx.session.user.id },
          scheduleId: { not: null },
        },
      });

      const schedules = await ctx.prisma.transactionSchedule.findMany({
        where: { user: { id: ctx.session.user.id } },
      });

      // Create map of transactions by their dates
      const transactionsByDates = groupByDateSerialToMap(
        transactions,
        (t) => t.time
      );

      const createdIds: string[] = [];

      // Run through each schedule
      for (const schedule of schedules) {
        // Memorize new latest created occurrence if new occurrences are created
        let newLatestCreatedOccurrence: Date | null = null;

        // Get first date for looping: start looping from next occurrence from
        // either the last created occurrence if one exists, else use the  first
        // occurrence.
        const firstDate = (() => {
          const latest = schedule.latestCreatedOccurrence;
          if (latest) {
            const next = getNextOccurrence(schedule, latest);
            if (next) return next;
          }

          // Default
          return schedule.firstOccurrence;
        })();

        // Get last date to loop to: if a last occurrence exists and is before
        // today, use it. By default use today.
        const lastDate = (() => {
          const last = getLastOccurrence(schedule);
          const today = new Date();
          if (last && compareDate(last, "<", today)) {
            return last;
          }

          // Default
          return today;
        })();

        // Loop for every occurrence from first date to last date
        let date = firstDate;
        while (compareDate(date, "<=", lastDate)) {
          // Find existing transaction if one already created for
          // same schedule and specified date
          const serial = serializeDate(date);
          const transactionGroup = transactionsByDates[serial] ?? [];
          const existing = transactionGroup.find(
            (t) => t.scheduleId === schedule.id && isSameDay(date, t.time)
          );

          // If no existing occurrence found, create occurrence
          if (!existing) {
            const created = await ctx.prisma.transaction.create({
              data: {
                user: { connect: { id: ctx.session.user.id } },
                category: { connect: { id: schedule.categoryId } },
                amount: schedule.amount,
                comment: schedule.comment,
                time: date,
                schedule: { connect: { id: schedule.id } },
              },
              include: {
                category: true,
                schedule: true,
              },
            });

            createdIds.push(created.id);

            // Memorize new latest created occurrence
            newLatestCreatedOccurrence = date;
          }

          // Iterate to next occurrence
          const next = getNextOccurrence(schedule, date);
          if (!next || isSameDay(date, next)) break;
          date = next;
        }

        // Update latest created occurrence of scheule in order to not
        // create same schedules again, even if they are deleted.
        if (newLatestCreatedOccurrence) {
          await ctx.prisma.transactionSchedule.update({
            where: { id: schedule.id },
            data: { latestCreatedOccurrence: newLatestCreatedOccurrence },
          });
        }
      }

      // Return created items
      return ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          id: { in: createdIds },
        },
        include: {
          category: true,
          schedule: true,
        },
      });
    },
  })

  /**
   *
   */
  .mutation("update", {
    input: z.object({
      id: z.string().min(1),
      firstOccurrence: z.date().optional(),
      occurrences: z.number().int().nonnegative().optional().nullable(),
      intervals: z.enum(["DAY", "WEEK", "MONTH", "YEAR"]).optional(),
      every: z.number().positive().int().optional(),
      amount: z.number().int().optional(),
      category: z.string().min(1).optional(),
      comment: z.string(),
    }),
    async resolve({ ctx, input }) {
      // Ensure user owns transactions being updated
      const target = await ctx.prisma.transactionSchedule.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });
      if (!target) throw new TRPCError({ code: "NOT_FOUND" });

      /**
       * Create schedule from data
       */
      const updated = await ctx.prisma.transactionSchedule.update({
        where: {
          id: input.id,
        },
        data: {
          firstOccurrence: input.firstOccurrence
            ? input.firstOccurrence
            : undefined,
          occurrences: input.occurrences,
          every: input.every,
          intervals: input.intervals,
          amount: input.amount,
          comment: input.comment,
          category: input.category
            ? {
                connectOrCreate: {
                  where: {
                    uniqueUidName: {
                      userId: ctx.session.user.id,
                      name: input.category,
                    },
                  },
                  create: {
                    name: input.category,
                    user: { connect: { id: ctx.session.user.id } },
                  },
                },
              }
            : undefined,
        },
        include: {
          transactions: { select: { id: true } },
          category: { select: { id: true, name: true, icon: true } },
        },
      });

      /**
       * Return updated
       */
      return updated;
    },
  })

  /**
   * Delete a transaction schedule
   */
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      // Delete only if belongs to caller
      const result = await ctx.prisma.transactionSchedule.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      return result.count;
    },
  });
