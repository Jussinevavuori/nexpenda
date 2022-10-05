import { Icon } from '@/components/Icon/Icon';
import { c } from '@/utils/generic/classnames';
import { CalculatorFunction } from '../utils/Calculation';
import { useCalculatorContext } from '../contexts/CalculatorContext';

export interface CalculatorButtonProps {
	children?: string;
	variant: "number" | "function" | "submit";
	value: CalculatorFunction;
}

export function CalculatorButton(props: CalculatorButtonProps) {

	const { handleInput } = useCalculatorContext();

	return <button
		className={c(
			"relative group rounded px-5 py-4 text-center flex items-center justify-center",
			"hover:bg-hover-overlay active:bg-active-overlay",
			c.variant(props.variant)({
				number: "bg-white-bg-1 dark:bg-black-bg-1",
				function: "bg-white-bg-4 dark:bg-black-bg-4",
				submit: "bg-primary-500",
			})
		)}
		style={{ gridArea: props.value }}
		onClick={() => handleInput(props.value)}
	>
		{
			props.children?.startsWith("icon_") ? (
				<Icon.Material
					icon={props.children.replace("icon_", "")}
					className={c(
						c.variant(props.variant)({
							submit: "text-white"
						}).default("text-slate-800 dark:text-slate-100")
					)}
				/>
			) : (
				<span className={c("text-xl text-slate-800 dark:text-slate-100")}>
					{props.children}
				</span>
			)
		}
	</button>

}