import { SidebarGroup } from './components/SidebarGroup';
import { SidebarItem } from './components/SidebarItem';
import { SidebarLogo } from './components/SidebarLogo';
import { SidebarToggle } from './components/SidebarToggle';
import { SidebarUser } from './components/SidebarUser';
import { useSidebarState } from './hooks/useSidebarState';
import React from 'react';
import { AppLayoutProps } from '../../AppLayout';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';
import { pages } from '@/utils/pages';
import { c } from '@/utils/generic/classnames';

// eslint-disable-next-line
const { motion } = require("framer-motion");

export type SidebarItemKey = "dashboard" | "analytics" | "budgets" | "settings" | "schedules";

export interface SidebarProps {
	active?: AppLayoutProps["active"]
}

export const Sidebar = React.memo(function Sidebar(props: SidebarProps) {
	const { isOpen: isSidebarOpen, toggleIsOpen: toggleSidebar } = useSidebarState();

	useOnKeyCombination({ key: "t", shift: true }, () => {
		toggleSidebar();
	})

	return <motion.div
		className={c("relative h-screen bg-white-bg-2 dark:bg-black-bg")}
		initial={false}
		animate={{ width: isSidebarOpen ? "280px" : "110px" }}
	>

		<div className="relative h-screen flex flex-col overflow-y-auto overflow-x-hidden">

			<SidebarLogo isSidebarOpen={isSidebarOpen} />

			<SidebarGroup label="Menu" isSidebarOpen={isSidebarOpen}>
				<SidebarItem
					item="dashboard"
					label="Dashboard"
					href={pages.dashboard}
					icon="home"
					shortcut={{ alt: true, key: "1" }}
					active={props.active}
					isSidebarOpen={isSidebarOpen}
				/>
				<SidebarItem
					item="analytics"
					label="Analytics"
					href={pages.analytics}
					icon="insights"
					shortcut={{ alt: true, key: "2" }}
					active={props.active}
					isSidebarOpen={isSidebarOpen}
				/>
				<SidebarItem
					item="budgets"
					label="Budget"
					href={pages.budgets}
					shortcut={{ alt: true, key: "3" }}
					icon="savings"
					active={props.active}
					isSidebarOpen={isSidebarOpen}
				/>
				<SidebarItem
					item="schedules"
					label="Schedules"
					href={pages.schedules}
					shortcut={{ alt: true, key: "4" }}
					icon="update"
					active={props.active}
					isSidebarOpen={isSidebarOpen}
				/>
				<SidebarItem
					item={"settings"}
					label="Settings"
					href={pages.settings.root}
					icon="tune"
					shortcut={{ alt: true, key: "5" }}
					active={props.active}
					isSidebarOpen={isSidebarOpen}
				/>
			</SidebarGroup>

			<SidebarGroup className="mt-auto py-4">
				<SidebarUser isSidebarOpen={isSidebarOpen} />
			</SidebarGroup>

		</div>

		<SidebarToggle
			isSidebarOpen={isSidebarOpen}
			onClick={toggleSidebar}
		/>

	</motion.div>

})