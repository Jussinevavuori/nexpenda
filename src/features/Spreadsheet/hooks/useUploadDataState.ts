import { SpreadsheetReadFileResult } from "@/features/Spreadsheet/utils/createSpreadsheet";
import { SpreadsheetTransactionBody } from "@/features/Spreadsheet/utils/TransactionSpreadsheet";
import produce from "immer";
import { useCallback, useReducer } from "react";

export type UploadDataState = {
  file?: SpreadsheetReadFileResult<SpreadsheetTransactionBody>;
  state: "idle" | "uploading" | "success" | "error";
};

const initialState: UploadDataState = {
  state: "idle",
};

type ReadFileAction = ReducerAction<"READ_FILE", UploadDataState["file"]>;
type ReadFileErrorAction = ReducerAction<"READ_FILE_ERROR", null>;
type UploadStartAction = ReducerAction<"UPLOAD_START", null>;
type UploadEndAction = ReducerAction<"UPLOAD_END", null>;
type UploadErrorAction = ReducerAction<"UPLOAD_ERROR", null>;
type ResetAction = ReducerAction<"RESET", null>;
type Action =
  | ReadFileAction
  | ReadFileErrorAction
  | ResetAction
  | UploadStartAction
  | UploadEndAction
  | UploadErrorAction;

export const uploadDataReducer = (state: UploadDataState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "RESET":
        draft.file = undefined;
        draft.state = "idle";
        break;
      case "READ_FILE":
        draft.file = action.data;
        break;
      case "READ_FILE_ERROR":
        draft.state = "error";
        draft.file = undefined;
        break;
      case "UPLOAD_START":
        draft.state = "uploading";
        break;
      case "UPLOAD_END":
        draft.state = "success";
        break;
      case "UPLOAD_ERROR":
        draft.state = "error";
        draft.file = undefined;
        break;
    }
  });

export function useUploadDataState() {
  const [state, dispatch] = useReducer(uploadDataReducer, initialState);

  const readFile = useCallback(
    (file: UploadDataState["file"]) => {
      dispatch({ type: "READ_FILE", data: file });
    },
    [dispatch]
  );

  const readFileError = useCallback(() => {
    dispatch({ type: "READ_FILE_ERROR", data: null });
  }, [dispatch]);

  const uploadError = useCallback(() => {
    dispatch({ type: "READ_FILE_ERROR", data: null });
  }, [dispatch]);

  const uploadStart = useCallback(() => {
    dispatch({ type: "UPLOAD_START", data: null });
  }, [dispatch]);

  const uploadEnd = useCallback(() => {
    dispatch({ type: "UPLOAD_END", data: null });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET", data: null });
  }, [dispatch]);

  return {
    state,
    reset,
    readFile,
    readFileError,
    uploadError,
    uploadStart,
    uploadEnd,
  };
}
