import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import useLongPress from "@/hooks/useLongPress";

export type DefaultStylesProps = {
	children?: React.ReactNode;
}

export function DefaultStyles(props: DefaultStylesProps) {

	const theme = usePreference("theme");
	const update = useUpdatePreference("theme")

	return <div className="text-black dark:text-white">
		{
			props.children
		}
	</div>

}