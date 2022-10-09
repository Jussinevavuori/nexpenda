// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  Session,
  unstable_getServerSession as getServerSession,
} from "next-auth";
import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "./prisma";
import { imageKit } from "./imageKit";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    imageKit,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const session = await getServerSession(opts.req, opts.res, nextAuthOptions);

  return await createContextInner({
    session,
  });
};

export type RouterContext = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<RouterContext>();
