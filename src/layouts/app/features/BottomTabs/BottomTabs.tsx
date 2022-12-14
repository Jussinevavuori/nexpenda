import { BottomTabItem } from './components/BottomTabItem';
import { Icon } from '@/components/Icon/Icon';
import { AppLayoutProps } from '../../AppLayout';
import { pages } from '@/utils/pages';

export interface BottomTabsProps {
	active?: AppLayoutProps["active"];
}

export function BottomTabs(props: BottomTabsProps) {
	return <div className="h-tabs flex flex-col">
		<div className="bg-white-bg-2 dark:bg-black-bg flex items-stretch shadow-lg h-fixedTabs">
			<BottomTabItem
				label="Home"
				active={props.active}
				href={pages.dashboard}
				items={["dashboard"]}
				icon={<Icon.Material icon="home" />}
			/>

			<BottomTabItem
				label="Analytics"
				active={props.active}
				href={pages.analytics}
				items={["analytics"]}
				icon={<Icon.Material icon="insights" />}
			/>

			<BottomTabItem
				label="Budget"
				active={props.active}
				href={pages.budgets.dashboard}
				items={["budgets"]}
				icon={<Icon.Material icon="savings" />}
			/>

			<BottomTabItem
				label="Schedules"
				active={props.active}
				href={pages.schedules}
				items={["schedules"]}
				icon={<Icon.Material icon="update" />}
			/>

			<BottomTabItem
				label="Settings"
				active={props.active}
				href={pages.settings.root}
				items={["settings"]}
				icon={<Icon.Material icon="tune" />}
			/>
		</div>
		<div className="bg-white-bg-2 dark:bg-black-bg flex-1" />
	</div>
}