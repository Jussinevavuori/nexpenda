import { Avatar } from "@/components/Avatar/Avatar";
import { Dialog, DialogProps } from "@/components/Dialog/Dialog";

export type PictureChangerProps = {

}

export const PictureChanger = Object.assign(function PictureChanger(props: PictureChangerProps) {

	return <div className="flex flex-col items-center">

		<Avatar />
		todo

	</div>

}, {
	Dialog({ ...dialogProps }: PictureChangerProps & DialogProps) {
		return <Dialog
			title="Change profile picture"
			{...dialogProps}
		>
			<PictureChanger />
		</Dialog>
	}
});