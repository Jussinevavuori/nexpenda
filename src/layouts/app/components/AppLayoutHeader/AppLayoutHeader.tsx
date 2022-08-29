export interface AppLayoutHeaderProps {
	children?: React.ReactNode;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
	return <div className="border-b border-b-slate-200 dark:border-b-slate-700 bg-white dark:bg-slate-800">
		{props.children}
	</div>
}