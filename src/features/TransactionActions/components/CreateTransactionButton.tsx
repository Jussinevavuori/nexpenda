import { Button, ButtonProps } from "@/components/Button/Button"
import { Icon } from "@/components/Icon/Icon"
import { IconButton } from "@/components/IconButton/IconButton"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { useOnKeyCombination } from "@/hooks/useOnKeyCombination"
import { useGlobalModal } from "@/stores/globalModalAtom"
import { useTransactionSelectionStore } from "@/stores/transactionSelectionStore"
import { useRef } from "react"

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export type CreateTransactionButtonProps = Omit<ButtonProps, "onClick"> & {

}

export const CreateTransactionButton = Object.assign(function CreateTransactionButton({ ...ButtonProps }: CreateTransactionButtonProps) {
	const { open } = useGlobalModal("createTransaction");

	const ref = useRef<HTMLButtonElement>(null);
	useOnKeyCombination({ key: "n", shift: true }, () => ref.current?.click());

	return <Tooltip value={{ title: "New transaction", keyCombination: { key: "n", shift: true } }}>
		<Button
			ref={ref}
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

		return <div aria-hidden={hide} className="fixed bottom-16 right-2 aria-hidden:pointer-events-none">
			<motion.div animate={{ x: hide ? 100 : 0 }}>
				<IconButton onClick={() => open({})} {...ButtonProps}>
					<Icon.Material icon="add" className="m-2" />
				</IconButton>
			</motion.div>
		</div>
	}
})
