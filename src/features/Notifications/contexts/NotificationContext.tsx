import { createContext, ReactNode } from "react"
import { NotificationStack } from "../components/NotificationStack";
import { useCallback, useState } from "react";

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
}
export interface NotificationContextValue {
	notifications: NotificationData[],
	dismiss: (id: string) => void,
	dispatch: (notification: NotificationData) => void,
}

export const defaultNotificationContextValue: NotificationContextValue = {
	notifications: [],
	dismiss: () => { },
	dispatch: () => { },
}

export const NotificationContext = createContext<NotificationContextValue>(defaultNotificationContextValue)

export interface NotificationsProviderProps {
	children?: ReactNode
}

export function NotificationsProvider(props: NotificationsProviderProps) {

	const [notifications, setNotifications] = useState<NotificationData[]>([])

	const dismiss = useCallback((id: string) => {
		setNotifications(current => current.filter(_ => _.id !== id))
	}, [setNotifications])

	const dispatch = useCallback((notification: NotificationData) => {
		setNotifications(current => current.concat(notification))
		setTimeout(() => {
			dismiss(notification.id);
		}, notification.timeoutMs);
	}, [setNotifications, dismiss])

	return <NotificationContext.Provider value={{ notifications, dismiss, dispatch }}>
		<NotificationStack
			notifications={notifications}
			dismissNotification={n => dismiss(n)}
		/>
		{props.children}
	</NotificationContext.Provider>

}