import { Icon } from "@/components/Icon/Icon"
import { InputBase, InputBaseProps } from "@/components/InputBase/InputBase"
import { c } from "@/utils/generic/classnames"
import { Combobox } from "@headlessui/react"

export type AutocompleteInputProps = Parameters<typeof Combobox.Input>[0]
	& InputBaseProps
	& {
		helperText?: string;
	}

export function AutocompleteInput({ helperText, onChange, ...props }: AutocompleteInputProps) {
	return <InputBase
		endIcon={<Combobox.Button className="flex items-center">
			<Icon.Material icon="unfold_more" />
		</Combobox.Button>}
		{...props}
	>
		<Combobox.Input
			onChange={onChange}
			className={
				c("bg-transparent py-2 text-black dark:text-white outline-none",
					"placeholder:text-black-4 dark:placeholder:text-white-4 w-full",
					c.variant(props.variant ?? "default")({
						bordered: "px-2",
						default: "px-2",
						underlined: "px-0"
					}))
			}
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
}