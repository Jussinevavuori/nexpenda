import { Button, ButtonProps } from "@/components/Button/Button"
import { Icon } from "@/components/Icon/Icon"
import { IconButton } from "@/components/IconButton/IconButton"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { useGlobalModal } from "@/stores/globalModalAtom"
import { useTransactionSelectionStore } from "@/stores/transactionSelectionStore"

// eslint-disable-next-line
const { motion } = require("framer-motion");

export type CreateTransactionButtonProps = Omit<ButtonProps, "onClick"> & {

}

export const CreateTransactionButton = Object.assign(function CreateTransactionButton({ ...ButtonProps }: CreateTransactionButtonProps) {
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
}, {
	Floating({ ...ButtonProps }: CreateTransactionButtonProps) {
		const { open } = useGlobalModal("createTransaction");

		// Hide when transactions selected
		const hide = useTransactionSelectionStore(_ => _.selection)?.size > 0;

		return <Tooltip value={{ title: "New transaction", keyCombination: { key: "n", shift: true } }}>
			<motion.div animate={{ x: hide ? 100 : 0 }}>
				<IconButton onClick={() => open({})} {...ButtonProps}>
					<Icon.Material icon="add" className="m-2" />
				</IconButton>
			</motion.div>
		</Tooltip>
	}
})
