/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { excelDateToJSDate } from "./excelDateToJsDate";
import { createSpreadsheet } from "./createSpreadsheet";

const spreadsheetTransactionSchema = z.object({
  time: z.date(),
  amount: z.number().int(),
  comment: z.string().optional(),
  category: z.string().min(1),
  categoryIcon: z.string().optional(),
});

export type SpreadsheetTransactionBody = z.TypeOf<
  typeof spreadsheetTransactionSchema
>;

export const createTransactionSpreadsheet = () => {
  const spreadsheet = createSpreadsheet<SpreadsheetTransactionBody>({
    schema: spreadsheetTransactionSchema,
    createRow(row: SpreadsheetTransactionBody): object {
      return {
        amount: row.amount / 100,
        comment: row.comment || "",
        category: row.category,
        time: new Date(row.time),
        categoryIcon: row.categoryIcon || "",
      };
    },
    getFileName() {
      const datestring = new Date().toLocaleDateString();
      return `Nexpenda - ${datestring}`;
    },
    getFileSheetName() {
      return `Transactions`;
    },
    sortRows(rows: SpreadsheetTransactionBody[]): SpreadsheetTransactionBody[] {
      return rows.sort((a, b) => a.time.getTime() - b.time.getTime());
    },
    columns: {
      category: {
        names: ["Kategoria", "Category", "Class", "Luokka"],
      },
      amount: {
        names: ["Summa", "Sum", "Määrä", "Amount", "integerAmount"],
        transformBeforeValidation: (value: any) => {
          const string = String(value)
            .replace(/,/g, ".")
            .replace(/[^\d\-\.]/g, "");
          const number = Number(string);
          return Math.round(number * 100);
        },
      },
      time: {
        names: [
          "Aika",
          "Time",
          "Päiväys",
          "Päivä",
          "Päivämäärä",
          "Pvm",
          "Date",
        ],
        transformBeforeValidation: (value: any) => {
          return excelDateToJSDate(Number(value));
        },
      },
      comment: {
        names: [
          "Kommentti",
          "Selite",
          "Seloste",
          "Lisätieto",
          "Details",
          "Comment",
          "Explanation",
          "Description",
        ],
      },
    },
  });

  return {
    ...spreadsheet,
    // Syntactic sugar for loading rows in
    loadTransactions(transactions: QueryOutput<"transactions.list">) {
      return spreadsheet.loadRows(
        transactions.map((t) => ({
          category: t.category.name,
          amount: t.amount,
          time: t.time,
          comment: t.comment ?? undefined,
          categoryIcon: t.category.icon ?? "",
        }))
      );
    },
  };
};
