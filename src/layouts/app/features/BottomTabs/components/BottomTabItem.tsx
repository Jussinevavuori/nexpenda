import { SidebarItemKey } from '../../Sidebar/Sidebar';
import Link from 'next/link';
import { AppLayoutProps } from '@/layouts/app/AppLayout';
import { c } from '@/utils/generic/classnames';

const { motion, AnimatePresence } = require("framer-motion");

export interface BottomTabItemProps {
	icon?: React.ReactNode;
	items: SidebarItemKey[],
	active?: AppLayoutProps["active"];
	href?: string,
	onClick?(): void;
}

export function BottomTabItem(props: BottomTabItemProps) {

	const active = !!props.items.find(_ => _ === props.active);

	const element = <button
		onClick={props.onClick}
		className="group relative h-full w-full flex items-center justify-center"
	>

		<div className={c(active ? "text-primary-600" : "text-slate-600")}>
			{props.icon}
		</div>

		<AnimatePresence>
			{
				active &&
				<motion.div
					className="bg-primary-600 rounded-t absolute h-1 left-0 bottom-0 right-0"
					animate={{}}
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
