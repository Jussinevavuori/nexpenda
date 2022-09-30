import { z } from "zod";
import { createProtectedRouter } from "./protectedRouter";

export const migrationRouter = createProtectedRouter().mutation("migrate", {
  input: z.object({}),
  async resolve() {
    await new Promise((r) => setTimeout(r, 3000));
  },
});
