import { useBreakpoint } from '@/hooks/useBreakpoint';
import { NotificationData } from '@/stores/notificationStore';
import { c } from '@/utils/generic/classnames';
import { Toast } from './Toast';

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export interface NotificationStackProps {
	notifications: NotificationData[];
	dismissNotification(id: string): void;
}

export function NotificationStack(props: NotificationStackProps) {
	const isNarrow = useBreakpoint("!sm");

	return <motion.div className={c(
		"fixed left-0 top-0 z-[400] flex flex-col gap-4 p-4",
		c.if(isNarrow)("w-full"),
		c.if(props.notifications.length === 0)("pointer-events-none"),
	)}>
		<AnimatePresence>
			{
				props.notifications.map(notification => {
					return <motion.li
						className={c("list-none", c.if(isNarrow)("w-full").else("w-fit"))}
						layout="position"
						key={notification.id}
						initial={{ opacity: 0, x: -400 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 100 }}
					>
						<Toast
							id={notification.id}
							createdAt={notification.createdAt}
							timeoutMs={notification.timeoutMs}
							title={notification.title}
							variant={notification.variant}
							description={notification.description}
							action={notification.action}
							onDismiss={() => props.dismissNotification(notification.id)}
							fullWidth={isNarrow}
						/>
					</motion.li>
				})
			}
		</AnimatePresence>
	</motion.div>

}