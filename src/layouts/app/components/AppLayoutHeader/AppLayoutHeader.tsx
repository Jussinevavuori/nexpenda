export interface AppLayoutHeaderProps {
	children?: React.ReactNode;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
	return <div className="border-b border-b-slate-100 dark:border-b-slate-850 bg-white dark:bg-slate-820">
		{props.children}
	</div>
}