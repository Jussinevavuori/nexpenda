// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/context/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error, type, path, input }) {
    console.error(
      `❌ An error occured on ${type} ${path} with input ${JSON.stringify(
        input,
        null,
        2
      )}`,
      error
    );
  },
  batching: { enabled: false },
});
