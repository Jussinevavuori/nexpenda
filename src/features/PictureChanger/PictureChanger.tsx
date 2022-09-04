import { Avatar } from "@/components/Avatar/Avatar";
import { Dialog, DialogProps } from "@/components/Dialog/Dialog";

export const PictureChanger = Object.assign(function PictureChanger() {

	return <div className="flex flex-col items-center">

		<Avatar />
		todo

	</div>

}, {
	Dialog({ ...dialogProps }: DialogProps) {
		return <Dialog
			title="Change profile picture"
			{...dialogProps}
		>
			<PictureChanger />
		</Dialog>
	}
});