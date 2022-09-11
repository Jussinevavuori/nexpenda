import { z } from "zod";

export const periodSchema = z
  .object({
    year: z.number().positive().int().optional(),
    month: z.number().min(0).max(11).int().optional(),
  })
  .refine(
    ({ year, month }) => !(year === undefined && typeof month === "number"),
    {
      message: "Invalid period. Period can't contain only month.",
      path: ["year"],
    }
  )
  .transform((t) => t as Period); // Typecast
