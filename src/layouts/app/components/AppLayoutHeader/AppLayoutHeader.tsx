export interface AppLayoutHeaderProps {
	children?: React.ReactNode;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
	return <div className="border-b border-b-white-bg-2 dark:border-b-black-bg">
		{props.children}
	</div>
}