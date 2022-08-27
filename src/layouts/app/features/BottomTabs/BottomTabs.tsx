import { SidebarItemKey } from '../Sidebar/Sidebar';
import { BottomTabItem } from './components/BottomTabItem';
import { Icon } from '@/components/Icon/Icon';
import { AppLayoutProps } from '../../AppLayout';
import { pages } from '@/utils/pages';

export interface BottomTabsProps {
	active?: AppLayoutProps["active"];
}

export function BottomTabs(props: BottomTabsProps) {

	// const createTransactionDialog = useTransactionCreateFormDialogState();

	return <div className="bg-white dark:bg-slate-840 h-screenMinusTabs d:h-screen flex items-stretch shadow-lg">

		<BottomTabItem
			active={props.active}
			href={pages.dashboard}
			items={["dashboard"]}
			icon={<Icon.Material icon="home" className="text-slate-900 dark:text-slate-100" />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.analytics}
			items={["analytics"]}
			icon={<Icon.Material icon="insights" className="text-slate-900 dark:text-slate-100" />}
		/>

		<BottomTabItem
			active={props.active}
			// onClick={() => createTransactionDialog.open()}
			items={[]}
			icon={<Icon.Material icon="add_circle" className="text-primary-600" size={30} />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.schedules}
			items={["schedules"]}
			icon={<Icon.Material icon="update" className="text-slate-900 dark:text-slate-100" />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.settings.root}
			items={["settings"]}
			icon={<Icon.Material icon="tune" className="text-slate-900 dark:text-slate-100" />}
		/>

	</div>

}