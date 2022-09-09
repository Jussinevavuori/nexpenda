import { BottomTabItem } from './components/BottomTabItem';
import { Icon } from '@/components/Icon/Icon';
import { AppLayoutProps } from '../../AppLayout';
import { pages } from '@/utils/pages';
import { useGlobalModal } from '@/stores/globalModalAtom';

export interface BottomTabsProps {
	active?: AppLayoutProps["active"];
}

export function BottomTabs(props: BottomTabsProps) {
	const { open: openCreateTransaction } = useGlobalModal("createTransaction")

	return <div className="bg-white-bg-2 dark:bg-black-bg h-screenMinusTabs d:h-screen flex items-stretch shadow-lg">

		<BottomTabItem
			active={props.active}
			href={pages.dashboard}
			items={["dashboard"]}
			icon={<Icon.Material icon="home" />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.analytics}
			items={["analytics"]}
			icon={<Icon.Material icon="insights" />}
		/>

		<BottomTabItem
			active={props.active}
			onClick={() => openCreateTransaction({})}
			items={[]}
			icon={<Icon.Material icon="add_circle" className="text-primary-600" size={30} />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.schedules}
			items={["schedules"]}
			icon={<Icon.Material icon="update" />}
		/>

		<BottomTabItem
			active={props.active}
			href={pages.settings.root}
			items={["settings"]}
			icon={<Icon.Material icon="tune" />}
		/>

	</div>

}