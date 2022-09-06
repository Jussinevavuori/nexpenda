import { c } from "@/utils/generic/classnames";
import React from "react";
import { ExtensionInputBaseProps, InputBase } from "../InputBase/InputBase";


export type InputProps =
	React.InputHTMLAttributes<HTMLInputElement>
	& ExtensionInputBaseProps
	& {
		helperText?: string;
	}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
	const { helperText, ...htmlProps } = InputBase.removeExtensionInputBaseProps(props)

	return <InputBase {...props}>

		<input
			ref={ref}
			{...htmlProps}
			className={c("bg-transparent py-2 text-black dark:text-white outline-none",
				"placeholder:text-black-4 dark:placeholder:text-white-4 w-full",
				c.variant(props.variant ?? "default")({
					bordered: "px-2",
					default: "px-4",
					underlined: "px-0"
				}))}
		/>

		{
			helperText && <span className={c(
				"absolute top-[100%] pt-1 text-sm",
				c.if(props.error)("text-danger").else("text-black-3 dark:text-white-3")
			)}>
				{helperText}
			</span>
		}

	</InputBase>
})