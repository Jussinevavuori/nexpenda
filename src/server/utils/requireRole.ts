import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { RouterContext } from "../router/context";

export async function requireRole(role: UserRole, ctx: RouterContext) {
  if (!ctx.session?.user) throw new TRPCError({ code: "FORBIDDEN" });

  const user = await ctx.prisma.user.findFirst({
    where: { id: ctx.session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== role) throw new TRPCError({ code: "FORBIDDEN" });
}
