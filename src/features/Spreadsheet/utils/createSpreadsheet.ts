/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFile } from "./readFile";
import { z } from "zod";
import { escapeSpreadsheetFileName } from "./escapeSpreadsheetFileName";
import { allFulfilled } from "@/utils/generic/allFulfilled";
import { allRejected } from "@/utils/generic/allRejected";

export type SpreadsheetReadFileResult<T> = {
  name: string;
  workbook: import("xlsx").WorkBook;
  sheets: Record<
    string,
    {
      sheetName: string;
      index: number;
      rows: T[];
    }
  >;
};

export function createSpreadsheet<T extends {}>({
  columns,
  schema,
  createRow,
  sortRows,
  getFileName,
  getFileSheetName,
}: {
  createRow(row: T): object;
  sortRows(rows: T[]): T[];
  getFileName(): string;
  getFileSheetName(): string;
  columns: {
    [C in keyof T]: {
      names: string[];
      transformBeforeValidation?: (value: any) => any;
    };
  };
  schema: z.Schema<T>;
}) {
  // Parses and validates a single row
  async function parseRow(row: any) {
    if (typeof row !== "object" || !row) {
      throw new Error("Row missing or has wrong type while parsing row");
    }

    // Attempt to fetch value to correct column using any of the available
    // column names, case-insensitively and apply transformBeforeValidation
    // functions.
    const rowObject: { [C in keyof T]?: any } = {};
    Object.keys(columns).forEach((key) => {
      const opts = columns[key as keyof T];
      const columnKey = Object.keys(row).find((_) => {
        return opts.names.map((_) => _.toLowerCase()).includes(_.toLowerCase());
      });
      if (columnKey) {
        const columnValue = row[columnKey];
        rowObject[key as keyof T] = opts.transformBeforeValidation
          ? opts.transformBeforeValidation(columnValue)
          : columnValue;
      }
    });

    // Parse
    return schema.parse(rowObject);
  }

  /**
   * The latest created file for downloading
   */
  let _workbook: import("xlsx").WorkBook | undefined;

  /**
   * Uses the read file function to read every single sheet into an array of
   * sheets.
   */
  async function _readFile(file: File) {
    const XLSX = await import("xlsx");

    // Parse as text
    const arrayBuffer = await readFile.asArrayBuffer(file);

    // Create workbook
    const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
    _workbook = workbook;

    // Set up result array
    const sheets: SpreadsheetReadFileResult<T>["sheets"] = {};

    // Read each sheet separately
    for (let index = 0; index < workbook.SheetNames.length; index++) {
      // Get sheet name
      const sheetName = workbook.SheetNames[index];

      // Read sheet to JSON
      if (!sheetName) throw new Error("Missing sheet name");
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) throw new Error("Missing sheet");
      const json = XLSX.utils.sheet_to_json(sheet, { raw: true });

      // Parse all rows and log unfulfilled
      const rowPromises = await Promise.allSettled(
        json.map((row) => parseRow(row))
      );
      const failedRows = allRejected(rowPromises);
      if (failedRows.length > 0)
        console.error("Some rows failed to parse", failedRows);

      // Parse rows and add result to sheets
      sheets[sheetName] = {
        sheetName,
        index,
        rows: allFulfilled(rowPromises),
      };
    }

    return {
      name: file?.name ?? "",
      workbook,
      sheets,
    };
  }

  /**
   * Generates a spreadsheet for downloading
   */
  async function loadRows(rows: T[]) {
    const XLSX = await import("xlsx");
    const workbook = XLSX.utils.book_new();

    // Sort and transform rows
    const sortedRows = sortRows(rows);
    const createdRows = sortedRows.map((row) => createRow(row));

    //  Create worksheet from mapped and sorted rows and add to workbook
    const worksheet = XLSX.utils.json_to_sheet(createdRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, getFileSheetName());

    // Save workbook
    _workbook = workbook;
  }

  /**
   * Downloads a created file
   */
  async function downloadFile() {
    const XLSX = await import("xlsx");

    /**
     * Ensure a workbook exists
     */
    if (!_workbook) {
      throw new Error("No file created");
    }

    /**
     * Download file
     */
    const type: import("xlsx").BookType = "xlsx";
    const filename = escapeSpreadsheetFileName(getFileName(), type);
    XLSX.writeFile(_workbook, filename, { bookType: type });
  }

  /**
   * Takes a HTML input (input) and reads a file from it. On file upload,
   * parses the file to an arraybuffer, then an XLSX workbook, from which
   * it parses all the rows to objects and returns all the succesfully
   * parsed rows.
   *
   * @param input HTMLInputElement (with type of file)
   */
  async function readSheet(file: File, options: { sheetIndex?: number } = {}) {
    const XLSX = await import("xlsx");

    // Parse as text
    const arrayBuffer = await readFile.asArrayBuffer(file);

    // Create workbook and read to JSON
    const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
    _workbook = workbook;
    const sheetIndex = options.sheetIndex ?? 0;

    // Sheet to JSON
    const sheetName = workbook.SheetNames[sheetIndex];
    if (!sheetName) throw new Error("Missing sheet name");
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error("Missing sheet");
    const json = XLSX.utils.sheet_to_json(sheet, { raw: true });

    // Parse rows
    return Promise.all(json.map((row) => parseRow(row)));
  }

  return {
    readSheet,
    readFile: _readFile,
    loadRows,
    downloadFile,
  };
}
