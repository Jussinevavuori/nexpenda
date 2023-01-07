import { SidebarItemKey } from '../../Sidebar/Sidebar';
import Link from 'next/link';
import { AppLayoutProps } from '@/layouts/app/AppLayout';

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

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
		<motion.div
			className="absolute top-1/2 left-1/2 text-slate-600 d-active:text-primary-600"
			data-active={active}
			initial={{ x: "-50%", y: "-50%" }}
			animate={{ x: "-50%", y: active ? "-80%" : "-50%" }}
		>
			{props.icon}
		</motion.div>

		<AnimatePresence>
			{
				active && <>
					<motion.div
						className="absolute left-1/2 top-3/4 text-xs text-primary-600 text-center"
						initial={{ y: "100%", x: "-50%", opacity: 0 }}
						animate={{ y: "-50%", x: "-50%", opacity: 100 }}
						exit={{ y: "100%", x: "-50%", opacity: 0 }}
					>
						{props.label}
					</motion.div>
					<motion.div
						className="bg-primary-600 rounded absolute h-1 left-0 bottom-0 right-0"
						initial={{ y: 30 }}
						animate={{ y: 0 }}
						exit={{ y: 10 }}
					/>
				</>
			}
		</AnimatePresence>
	</button>

	if (props.href) {
		return <div className="h-fixedTabs flex-1">
			<Link href={props.href}>
				{element}
			</Link>
		</div>
	}

	return <div className="h-fixedTabs flex-1">
		{element}
	</div>
}
