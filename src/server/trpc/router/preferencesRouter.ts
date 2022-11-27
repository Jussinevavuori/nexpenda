import { z } from "zod";
import { procedure, router } from "../trpc";

export const preferencesRouter = router({
  /**
   * Get a preference's value for the current user.
   */

  get: procedure.protected.input(z.string()).query(async ({ ctx, input }) => {
    const preference = await ctx.prisma.preference.findUnique({
      where: {
        userId_key: {
          key: input,
          userId: ctx.session.user.id,
        },
      },
    });

    return preference?.value ?? null;
  }),

  /**
   * List all of a  user's preferences.
   */
  list: procedure.protected.query(async ({ ctx }) => {
    return ctx.prisma.preference.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        key: true,
        value: true,
        updatedAt: true,
      },
    });
  }),

  /**
   * Update a preference for the current user. Providing null as the value
   * will remove the preference.
   *
   * Returns the new value.
   */
  update: procedure.protected
    .input(
      z.object({
        key: z.string(),
        value: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.value === null) {
        ctx.prisma.preference.delete({
          where: {
            userId_key: { key: input.key, userId: ctx.session.user.id },
          },
        });
        return null;
      }

      const update = await ctx.prisma.preference.upsert({
        where: {
          userId_key: {
            key: input.key,
            userId: ctx.session.user.id,
          },
        },
        create: {
          key: input.key,
          value: input.value,
          user: { connect: { id: ctx.session.user.id } },
        },
        update: {
          value: input.value,
        },
      });

      return update.value;
    }),
});
