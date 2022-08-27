import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { requireRole } from "../utils/requireRole";
import { createProtectedRouter } from "./protectedRouter";
import { generate as shortId } from "shortid";
import { uploadImage } from "../utils/uploadImage";

export const userRouter = createProtectedRouter()
  /**
   * List all profiles. Admin only.
   */
  .query("list", {
    async resolve({ ctx }) {
      requireRole("ADMIN", ctx);

      return ctx.prisma.user.findMany({
        include: {
          accounts: true,
          preferences: true,
          sessions: true,
          transactions: { select: { integerAmount: true } },
          transactionSchedules: { select: { id: true } },
        },
      });
    },
  })

  /**
   * Query your own profile. Returns public profile details.
   */
  .query("me", {
    async resolve({ ctx }) {
      const user = await ctx.prisma.user.findFirst({
        select: {
          name: true,
          id: true,
          email: true,
          emailVerified: true,
          role: true,
          image: true,
          createdAt: true,
          accounts: {
            select: {
              provider: true,
              createdAt: true,
            },
          },
        },
        where: { id: ctx.session.user.id },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      return user;
    },
  })

  /**
   * Update your user details.
   *
   * Returns the updated user.
   */
  .mutation("update", {
    input: z.object({
      name: z.string().min(1).optional(),
      image: z.string().min(1).optional(), // Base-64 image or url
    }),
    async resolve({ ctx, input }) {
      const updateBatch: Partial<User> = {};

      // Update name
      if (input.name) {
        updateBatch.name = input.name;
      }

      // Update image
      if (input.image) {
        // Directly
        if (input.image.startsWith("http")) {
          if (isAllowedDirectAvatarUrl(input.image)) {
            updateBatch.image = input.image;
          }
        }

        // From base-64 encoded image
        else {
          updateBatch.image = await uploadImage({
            buffer: Buffer.from(input.image, "base64"),
            filename: `avatar_${ctx.session.user.id}_${shortId()}`,
            folder: "avatars",
            processImage: (image) => image.resize(200),
          });
        }
      }

      // Update and return updated user
      return ctx.prisma.user.update({
        select: {
          name: true,
          id: true,
          email: true,
          emailVerified: true,
          role: true,
          image: true,
          createdAt: true,
          accounts: {
            select: {
              provider: true,
              createdAt: true,
            },
          },
        },
        where: { id: ctx.session.user.id },
        data: updateBatch,
      });
    },
  });

function isAllowedDirectAvatarUrl(url: string) {
  const regex = /^https:\/\/lh\d+.googleusercontent.com\//;
  return regex.test(url);
}
