import { c } from "@/utils/generic/classnames";

const { motion } = require("framer-motion");

export interface SwitchProps {
	value: boolean;
	onChange(b: boolean): void;
}

export function Switch(props: SwitchProps) {

	return <button
		type="button"
		className="inline-block"
		onClick={() => props.onChange(!props.value)}
	>

		<motion.div
			className={c(
				"flex items-center p-1 w-14 h-8 rounded-full border border-slate-300 dark:border-slate-840 transition-colors",
				props.value ? "bg-primary-200 dark:bg-primary-900 justify-end" : "bg-slate-200 dark:bg-slate-840 justify-start"
			)}
		>

			<motion.div
				layout="position"
				transition={{ duration: 0.1 }}
				className={c(
					"w-6 h-6 rounded-full transition-colors",
					props.value ? "bg-primary-600 dark:bg-primary-500" : "bg-slate-500"
				)}
			/>

		</motion.div>

	</button>

}