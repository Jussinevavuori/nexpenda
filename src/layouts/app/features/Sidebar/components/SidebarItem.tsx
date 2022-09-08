import { SidebarItemKey } from '../Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppLayoutProps } from '@/layouts/app/AppLayout';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';
import { Icon } from '@/components/Icon/Icon';
import { c } from '@/utils/generic/classnames';
import { Tooltip } from '@/components/Tooltip/Tooltip';

// eslint-disable-next-line
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

	useOnKeyCombination(props.shortcut ?? { key: "never" }, () => {
		router.push(props.href);
	})

	return <Link href={props.href}>
		<Tooltip value={{
			title: props.label,
			keyCombination: props.shortcut,
		}} side="right" sideOffset={2}>
			<li
				className={c(
					"relative w-full px-3 py-2 inline-flex items-center gap-4 rounded-lg duration-100",
					active ? "bg-primary-500" : "bg-transparent hover:bg-hover-overlay active:bg-active-overlay",
				)}
			>
				<motion.span
					initial={false}
					animate={{
						justifySelf: props.isSidebarOpen ? "stretch" : "start",
						transform: `translateX(${props.isSidebarOpen ? 0 : 4}px)`
					}}
					className={c("inline")}
				>
					<Icon.Material
						icon={props.icon}
						size={20}
						className={c(c.if(active)("text-white").else("text-black-1 dark:text-white-1"))}
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
								"text-sm absolute left-14",
								c.if(active)("font-normal").else("font-medium"),
								c.if(active)("text-white").else("text-black-1 dark:text-white-1")
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