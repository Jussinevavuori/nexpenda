import { useNotificationStore } from "@/stores/notificationStore";
import { ReactNode } from "react"
import { NotificationStack } from "./components/NotificationStack";

export interface NotificationsProps {
	children?: ReactNode
}

export function Notifications(props: NotificationsProps) {
	return <>
		<NotificationStack
			notifications={useNotificationStore(_ => _.notifications)}
			dismissNotification={useNotificationStore(_ => _.dismiss)}
		/>
		{props.children}
	</>
}