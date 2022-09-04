import { Button, ButtonProps } from "@/components/Button/Button"
import { Icon } from "@/components/Icon/Icon"

export type CreateTransactionButtonProps = Omit<ButtonProps, "onClick"> & {

}

export function CreateTransactionButton({ ...ButtonProps }: CreateTransactionButtonProps) {
	return <Button
		startIcon={<Icon.Material icon="add" />}
		{...ButtonProps}
	>
		New transaction
	</Button>
}