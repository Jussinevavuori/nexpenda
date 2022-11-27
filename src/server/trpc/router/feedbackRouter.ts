import { z } from "zod";
import { mailTemplates } from "../../utils/mailTemplates";
import { sendMail } from "../../utils/sendMail";
import { procedure, router } from "../trpc";

export const feedbackRouter = router({
  /**
   * Send a piece of feedback
   */
  send: procedure.protected
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.feedback.create({
        data: {
          message: input.message,
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      // Send notification mail
      if (ctx.session.user.email) {
        await sendMail(
          ctx.session.user.email,
          mailTemplates.feedbackReceived({
            message: input.message,
            email: ctx.session.user.email,
            displayName: ctx.session.user.name ?? "(no name)",
          })
        );
      }
    }),

  /**
   * List all feedback
   */
  list: procedure.admin.query(({ ctx }) => {
    return ctx.prisma.feedback.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });
  }),

  /**
   * Delete a piece of feedback
   */
  delete: procedure.admin
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.feedback.delete({
        where: { id: input.id },
      });
    }),
});
