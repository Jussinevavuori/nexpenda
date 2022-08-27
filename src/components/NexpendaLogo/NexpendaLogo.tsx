import { c } from "@/utils/generic/classnames";

export type NexpendaLogoTypeProps = {
	className?: string;
}

export type NexpendaLogoIconProps = {
	className?: string;
	size?: number;
}

export const NexpendaLogo = {
	svg: {
		viewBox: `0 0 400 400`,
		basePath: `M233.1,2.74A199.82,199.82,0,0,0,0,200C0,310.45,89.55,400,200,400A198.55,198.55,0,0,0,226,398.3a58.33,58.33,0,0,1-8.55-18.55l-11-41-.83-3.14c-1.84.08-3.72.11-5.56.11A135.77,135.77,0,1,1,335.5,192l6.35,1.69,48.58,13a55.12,55.12,0,0,1,9.32,3.4c.18-3.36.25-6.72.25-10.11C400,100.81,327.81,18.52,233.1,2.74Z`,
		highlightPath: `M394.73,245.84a200,200,0,0,1-86.63,122.4,196.71,196.71,0,0,1-43.24,21,26.1,26.1,0,0,1-16.1-17.87l-11-40.93-25.88-96.66a26.45,26.45,0,0,1,32.49-32.52l89,23.86,48.55,13A26.14,26.14,0,0,1,394.73,245.84Z`,
	},

	Type: function NexpendaLogoType(props: NexpendaLogoTypeProps) {
		return <span className={c("text-xl transition-all lg:text-2xl font-bold")}>
			<span className={"text-black dark:text-white"}>N</span>
			<span className={"text-black dark:text-white"}>e</span>
			<span className={"text-primary"}>x</span>
			<span className={"text-black dark:text-white"}>p</span>
			<span className={"text-black dark:text-white"}>e</span>
			<span className={"text-black dark:text-white"}>n</span>
			<span className={"text-black dark:text-white"}>d</span>
			<span className={"text-black dark:text-white"}>a</span>
			<span className={"text-black dark:text-white"}>.</span>
		</span>
	},

	Icon: function NexpendaLogoIcon(props: NexpendaLogoIconProps) {
		return <svg
			width={props.size ?? 28}
			height={props.size ?? 28}
			viewBox={NexpendaLogo.svg.viewBox}
			className={props.className}
		>
			<path d={NexpendaLogo.svg.basePath} className={`fill-slate-900 dark:fill-white`} />
			<path d={NexpendaLogo.svg.highlightPath} className={`fill-primary-500`} />
		</svg >
	}
}