import { SidebarItemKey } from '../../Sidebar/Sidebar';
import Link from 'next/link';
import { AppLayoutProps } from '@/layouts/app/AppLayout';
import { c } from '@/utils/generic/classnames';

// eslint-disable-next-line
const { motion, AnimatePresence } = require("framer-motion");

export interface BottomTabItemProps {
	icon?: React.ReactNode;
	items: SidebarItemKey[],
	active?: AppLayoutProps["active"];
	href?: string,
	label?: string;
}

export function BottomTabItem(props: BottomTabItemProps) {

	const active = !!props.items.find(_ => _ === props.active);

	const element = <button className="relative h-full w-full flex flex-col items-center justify-center gap-1">

		<div className={c(active ? "text-primary-600" : "text-slate-600")}>
			{props.icon}
		</div>

		<div className={c("text-xs", c.if(active)("text-primary-600").else("text-slate-500"))}>
			{props.label}
		</div>

		<AnimatePresence>
			{
				active &&
				<motion.div
					className="bg-primary-600 rounded-t absolute h-3 left-0 -bottom-2 right-0"
					initial={{ y: 30 }}
					animate={{ y: 0 }}
					exit={{ y: 10 }}
				/>
			}
		</AnimatePresence>
	</button>;

	if (props.href) {
		return <div className="h-tabs flex-1">
			<Link href={props.href}>
				{element}
			</Link>
		</div>
	}

	return <div className="h-tabs flex-1">
		{element}
	</div>
}
