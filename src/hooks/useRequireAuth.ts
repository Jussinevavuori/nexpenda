import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import type { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/**
 * When this hook is present, authentication is required. Allows loading state.
 */
export function useRequireAuth(role?: UserRole) {
  const session = useSession();
  const user = trpc.useQuery(["user.me"]);
  const router = useRouter();

  switch (session.status) {
    case "loading":
      break;

    case "authenticated":
      if (role) {
        if (!user.data) break;

        if (role && role !== user.data.role) {
          router.push(
            pages.login +
              "?error=" +
              encodeURIComponent("You aren't allowed to do that")
          );
        }
      }
      break;

    case "unauthenticated":
      router.push(
        pages.login + "?error=" + encodeURIComponent("You have to be signed in")
      );
      break;
  }
}
