import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "../utils/protectedRouter";

export const categoriesRouter = createProtectedRouter()
  .query("list", {
    async resolve({ ctx }) {
      return ctx.prisma.category.findMany({
        where: { userId: ctx.session.user.id },
      });
    },
  })
  .mutation("updateIcon", {
    input: z.object({ categoryId: z.string(), icon: z.string() }),
    async resolve({ ctx, input }) {
      // Ensure user owns transactions being updated
      const targetCategory = await ctx.prisma.category.findFirst({
        where: { id: input.categoryId, userId: ctx.session.user.id },
      });
      if (!targetCategory) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.prisma.category.update({
        where: { id: input.categoryId },
        data: {
          icon: input.icon,
        },
      });
    },
  });
