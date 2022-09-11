export interface AppLayoutHeaderProps {
	children?: React.ReactNode;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
	return <div className="border-b border-b-white-bg-3 dark:border-b-black-bg-4">
		{props.children}
	</div>
}