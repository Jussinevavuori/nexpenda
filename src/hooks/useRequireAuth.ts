import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import type { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function useRequireAuth(role?: UserRole) {
  const session = useSession();
  const user = trpc.useQuery(["user.me"]);
  const router = useRouter();

  switch (session.status) {
    case "loading": {
      return;
    }

    case "authenticated": {
      if (role) {
        if (!user.data) return;
        if (role !== user.data.role) {
          router.push(
            pages.login +
              "?error=" +
              encodeURIComponent("You aren't allowed to do that")
          );
        }
      }
      return;
    }

    case "unauthenticated": {
      router.push(
        pages.login + "?error=" + encodeURIComponent("You have to be signed in")
      );
    }
  }
}
