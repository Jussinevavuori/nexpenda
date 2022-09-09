import { Button, ButtonProps } from "@/components/Button/Button"
import { Icon } from "@/components/Icon/Icon"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { useGlobalModal } from "@/stores/globalModalAtom"

export type CreateTransactionButtonProps = Omit<ButtonProps, "onClick"> & {

}

export function CreateTransactionButton({ ...ButtonProps }: CreateTransactionButtonProps) {
	const { open } = useGlobalModal("createTransaction");

	return <Tooltip value={{ title: "New transaction", keyCombination: { key: "n", shift: true } }}>
		<Button
			onClick={() => open({})}
			startIcon={<Icon.Material size={20} icon="add" />}
			{...ButtonProps}
			style={{ minWidth: 200 }}
		>
			New transaction
		</Button>
	</Tooltip>
}