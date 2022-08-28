import { useUploadDataState } from "./useUploadDataState";
import React, { useCallback, useState } from "react";
import { useNotify } from "@/features/Notifications/hooks/useNotify";
import { inferMutationInput, trpc } from "@/utils/trpc";
import { chunkify } from "@/utils/generic/chunkify";
import { ProgressBarPubSub } from "@/components/ProgressBar/ProgressBarPubSub";
import { createTransactionSpreadsheet } from "../utils/TransactionSpreadsheet";

export function useUploadDataFile(
  state: ReturnType<typeof useUploadDataState>,
  onFinished: () => void
) {
  const notify = useNotify();
  const postTransactionsMutation = trpc.useMutation([
    "transactions.createMany",
  ]);

  // Selected sheet name
  const [selectedSheetName, setSelectedSheetName] = useState("");

  // Currently selected sheet
  const selectedSheet = state.state.file
    ? state.state.file.sheets[selectedSheetName]
    : undefined;

  // All sheet names
  const sheetNames = Object.keys(state.state.file?.sheets ?? {});

  // Handle uploading file and parsing it
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!e.target.files?.[0]) return;
        // Read the result to a transaction spreadsheet
        const transactionSpreadsheet = createTransactionSpreadsheet();
        const readResult = await transactionSpreadsheet.readFile(
          e.target.files[0]
        );

        // If read succeeded, show result, else show error
        state.readFile(readResult);

        // Get the name of the sheet that had transactions, else default
        // to first sheet
        const defaultSheetName = Object.values(readResult.sheets).reduce(
          (name, sheet) => {
            if (!name) return sheet.sheetName;
            if (sheet.rows.length > 0) return sheet.sheetName;
            return name;
          },
          ""
        );

        setSelectedSheetName(defaultSheetName);
      } catch (e) {
        notify.error("Could not read file");
        state.readFileError();
      }
    },
    [setSelectedSheetName, state, notify]
  );

  const handleUploadTransactions = useCallback(async () => {
    // Ensure sheet selected and has transactions
    if (!selectedSheet) {
      notify.error("No sheet selected");
      return state.uploadError();
    } else if (selectedSheet.rows.length === 0) {
      notify.error("No transactions on selected sheet");
      return state.uploadError();
    }

    // Start uploading
    state.uploadStart();

    // Chunkify rows to chunks of hundreds and post those chunks one by one
    const chunks = chunkify<inferMutationInput<"transactions.create">>(
      selectedSheet.rows,
      200
    );
    let nPostedTransactions = 0;
    for (const chunk of chunks) {
      await postTransactionsMutation.mutateAsync(chunk);
      nPostedTransactions += chunk.length;
      if (chunk.length < selectedSheet.rows.length) {
        ProgressBarPubSub.publish({
          key: "transactions_file_upload",
          target: selectedSheet.rows.length,
          value: nPostedTransactions,
        });
      }
    }

    // Notify error or success
    if (nPostedTransactions !== selectedSheet.rows.length) {
      notify.warning("Some transactions were not properly uploaded.");
    } else {
      notify.success(
        `Succesfully uploaded all ${nPostedTransactions} transactions`
      );
    }

    // Reset progress bar
    ProgressBarPubSub.publish({
      key: "transactions_file_upload",
      target: 0,
      value: 0,
    });

    state.reset();
    onFinished();
  }, [state, notify, onFinished]);

  return {
    handleFileUpload,
    handleUploadTransactions,
    selectedSheet,
    sheetNames,
    setSelectedSheet: setSelectedSheetName,
  };
}
