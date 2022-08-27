import { SidebarItemKey } from '../Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppLayoutProps } from '@/layouts/app/AppLayout';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';
import { Icon } from '@/components/Icon/Icon';
import { c } from '@/utils/generic/classnames';
import { Tooltip } from '@/components/Tooltip/Tooltip';

const { motion, AnimatePresence } = require("framer-motion");

export interface SidebarItemProps {
	children?: React.ReactNode;
	item: SidebarItemKey,
	isSidebarOpen: boolean;
	label: string,
	href: string,
	icon: string,
	shortcut?: KeyCombination;
	active?: AppLayoutProps["active"]
}

export function SidebarItem(props: SidebarItemProps) {

	const active = props.active === props.item;

	const router = useRouter();

	// TODO: Hover Overlay

	useOnKeyCombination(props.shortcut ?? { key: "never" }, () => {
		console.log("Goto", props.href);
		router.push(props.href);
	})

	return <Link href={props.href}>
		<Tooltip value={{
			title: props.label,
			keyCombination: props.shortcut,
		}} side="right" sideOffset={2}>
			<li
				className={c(
					"group relative w-full px-4 py-4 inline-flex items-center gap-4 rounded transition-colors duration-100",
					active ? "bg-primary-500" : "bg-transparent",
				)}
			>
				<motion.span
					initial={false}
					animate={{
						justifySelf: props.isSidebarOpen ? "stretch" : "start",
						transform: `translateX(${props.isSidebarOpen ? 0 : 4}px)`
					}}
					className={c("inline text-primary-500", active ? "text-white dark:text-slate-900" : "")}
				>
					<Icon.Material
						icon={props.icon}
						className={active ? "text-slate-100 dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}
					/>
				</motion.span>
				<AnimatePresence>
					{
						props.isSidebarOpen &&
						<motion.p
							style={{ transformOrigin: "left" }}
							animate={{ scaleX: 1, opacity: 1 }}
							exit={{ scaleX: 0, opacity: 0 }}
							className={c(
								"font-semibold absolute left-14",
								active ? "text-white dark:text-slate-900" : "text-slate-800 dark:text-slate-200"
							)}
						>
							{props.label}
						</motion.p>
					}
				</AnimatePresence>
			</li>
		</Tooltip>
	</Link>
}