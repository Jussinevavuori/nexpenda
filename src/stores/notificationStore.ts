import create from "zustand";
import produce from "immer";
import { useCallback, useMemo } from "react";
import { v4 as uuid } from "uuid";

export type NotificationVariant =
  | "default"
  | "error"
  | "warning"
  | "success"
  | "info";

export type NotificationData = {
  id: string;
  createdAt: Date;
  variant: NotificationVariant;
  timeoutMs: number;
  title: string;
  description?: string;
  action?: {
    onClick(): void | Promise<void>;
    label?: string;
    icon?: string;
  };
};

export interface NotificationState {
  notifications: NotificationData[];
  dispatch: (notification: NotificationData) => void;
  dismiss: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],

  dispatch: (notification) =>
    set(
      produce((draft: NotificationState) => {
        draft.notifications.push(notification);
      })
    ),

  dismiss: (id) =>
    set(
      produce((draft: NotificationState) => {
        const index = draft.notifications.findIndex((_) => _.id === id);
        if (index < 0) return;
        draft.notifications.splice(index, 1);
      })
    ),
}));

export function useNotify() {
  const dispatch = useNotificationStore((_) => _.dispatch);
  const dismiss = useNotificationStore((_) => _.dismiss);

  // Given default options (variants and  fallback messages)
  // creates a notifier function that simply takes a message and
  // if provided, options.
  const createNotify = useCallback(
    (variant: NotificationVariant, fallbackMessage: string) => {
      // Return notify function
      return (
        title: string,
        options: Pick<NotificationData, "description" | "action"> & {
          timeoutMs?: number;
        } = {}
      ) => {
        const id = uuid();

        // Create message
        dispatch({
          createdAt: new Date(),
          id,
          timeoutMs: options.timeoutMs ?? 3000,
          title: title ? title : fallbackMessage,
          variant,
          action: options.action,
          description: options.description,
        });

        // Automatically timeout delete the message. Cleanup not required.
        setTimeout(() => dismiss(id), options.timeoutMs ?? 3000);
      };
    },
    [dispatch, dismiss]
  );

  // A notifier function for each notification variant to enable calling
  // const notify = useNotify();
  // notify.success("This worked");
  return {
    success: useMemo(() => createNotify("success", "Success"), [createNotify]),
    default: useMemo(() => createNotify("default", ""), [createNotify]),
    warning: useMemo(() => createNotify("warning", "Warning"), [createNotify]),
    error: useMemo(() => createNotify("error", "Error"), [createNotify]),
    info: useMemo(() => createNotify("info", ""), [createNotify]),
  };
}
