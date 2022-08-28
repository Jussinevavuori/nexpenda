import { SidebarItemKey } from '../Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppLayoutProps } from '@/layouts/app/AppLayout';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';
import { Icon } from '@/components/Icon/Icon';
import { c } from '@/utils/generic/classnames';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { HoverOverlay } from '@/components/HoverOverlay/HoverOverlay';
import { KeyCombination } from '@/components/KeyCombination/KeyCombination';

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
					"group relative w-full px-3 py-2 inline-flex items-center gap-4 rounded-lg transition-colors duration-100",
					active ? "bg-primary-500" : "bg-transparent",
				)}
			>

				<HoverOverlay />

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
						className={c(c.if(active)("text-white").else("text-black-secondary dark:text-white-secondary"))}
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
								c.if(active)("text-white").else("text-black-secondary dark:text-white-secondary")
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