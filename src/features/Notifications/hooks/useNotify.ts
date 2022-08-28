import { useCallback, useContext, useMemo } from "react";
import { v4 as uuid } from "uuid";
import {
  NotificationContext,
  NotificationData,
  NotificationVariant,
} from "../contexts/NotificationContext";

export function useNotify() {
  const notification = useContext(NotificationContext);

  const _notify = useCallback(
    (variant: NotificationVariant, fallbackMessage: string) => {
      return (
        title: string,
        args: Pick<NotificationData, "description" | "action"> & {
          timeoutMs?: number;
        } = {}
      ) => {
        notification.dispatch({
          createdAt: new Date(),
          id: uuid(),
          timeoutMs: args.timeoutMs ?? 3000,
          title: title ? title : fallbackMessage,
          variant,
          action: args.action,
          description: args.description,
        });
      };
    },
    [notification]
  );

  return {
    success: useMemo(() => _notify("success", "Success"), [_notify]),
    default: useMemo(() => _notify("default", ""), [_notify]),
    warning: useMemo(() => _notify("warning", "Warning"), [_notify]),
    error: useMemo(() => _notify("error", "Error"), [_notify]),
    info: useMemo(() => _notify("info", ""), [_notify]),
  };
}
