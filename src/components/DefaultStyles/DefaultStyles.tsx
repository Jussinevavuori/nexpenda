export type DefaultStylesProps = {
	children?: React.ReactNode;
}

export function DefaultStyles(props: DefaultStylesProps) {
	return <div className="text-black dark:text-white">
		{props.children}
	</div>
}