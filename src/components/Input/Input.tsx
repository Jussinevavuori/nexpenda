import { c } from "@/utils/generic/classnames";
import React from "react";
import { ExtensionInputBaseProps, InputBase } from "../InputBase/InputBase";


export type InputProps =
	React.InputHTMLAttributes<HTMLInputElement>
	& ExtensionInputBaseProps
	& {
		helperText?: string;
	}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { helperText, ...htmlProps } = InputBase.removeExtensionInputBaseProps(props)

	return <InputBase {...props}>

		<input
			{...htmlProps}
			className={c("bg-transparent py-2 text-black dark:text-white outline-none",
				"placeholder:text-black-disabled dark:placeholder:text-white-disabled",
				c.variant(props.variant ?? "default")({
					bordered: "px-2",
					default: "px-2",
					underlined: "px-0"
				}))}
		/>

		{
			helperText && <span className={c(
				"absolute top-[100%] pt-1 text-sm",
				c.if(props.error)("text-danger").else("text-black-disabled dark:text-white-disabled")
			)}>
				{helperText}
			</span>
		}

	</InputBase>
})