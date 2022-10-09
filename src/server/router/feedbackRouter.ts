import { z } from "zod";
import { mailTemplates } from "../utils/mailTemplates";
import { requireRole } from "../utils/requireRole";
import { sendMail } from "../utils/sendMail";
import { createProtectedRouter } from "../utils/protectedRouter";

export const feedbackRouter = createProtectedRouter()
  /**
   * Lists all existing feedback.
   */
  .query("list", {
    async resolve({ ctx }) {
      requireRole("ADMIN", ctx);

      return ctx.prisma.feedback.findMany({});
    },
  })

  /**
   * Sennds a feedback email.
   *
   * Returns nothing.
   */
  .mutation("send", {
    input: z.object({ message: z.string() }),
    async resolve({ ctx, input }) {
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
    },
  });
