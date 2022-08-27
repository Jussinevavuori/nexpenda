import { c } from "@/utils/generic/classnames";
import React from "react";
import { useQuery } from "react-query";
import type { SimpleIcon as SimpleIconData } from "simple-icons"

export type SimpleIconProps = {
	icon: string;
	size?: number;
	className?: string;
	inline?: boolean;
} & React.HTMLAttributes<SVGElement>;

const defaultSize = 24;

const iconNameMap: Partial<Record<string, string>> = {
}

function getSimpleIconName(name: string) {
	const formattedName =
		(iconNameMap[name.toLowerCase()] ?? name) // Use preset variant from icon name map
			.replace(/\s/g, "") // Remove whitespace
			.replace(/\./g, "dot") // Replace "." with "dot"

	// Capitalize name and add prefix
	return "si" // Add prefix "si"
		+ formattedName.charAt(0).toUpperCase() // Uppercase first
		+ formattedName.slice(1).toLowerCase() // All else in lowercase
}

/**
 * Uses the simple icon API to return the logo for the provided icon.
 */
export const SimpleIcon = Object.assign(function SimpleIcon(props: SimpleIconProps) {
	const query = useQuery<SimpleIconData>(["simpleicon", props.icon], () => {
		return import("simple-icons/icons").then((module: any) => {
			return module[getSimpleIconName(props.icon)] as SimpleIconData
		})
	})

	if (!query.data || query.isLoading) return null;

	return <span
		style={{ height: props.size ?? defaultSize, width: props.size ?? defaultSize }}
		className={c("relative items-center", c.if(props.inline)("inline-flex align-middle").else("flex"))}
	>
		<svg style={{ height: "100%", width: "100%" }} className={c(props.className)} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d={query.data.path} fill={props.className?.includes("fill") ? undefined : "#" + query.data.hex} />
		</svg>
	</span>
}, {
	defaultSize
})