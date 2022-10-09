import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Dialog, DialogProps } from "@/components/Dialog/Dialog";
import { Icon } from "@/components/Icon/Icon";
import { useNotify } from "@/stores/notificationStore";
import { trpc } from "@/utils/trpc";
import { IKUpload } from "imagekitio-react";
import { useState } from "react";
import { ImageKitContext } from "../ImageKit/ImageKitContext";

export type PictureChangerProps = {
	onUploaded?(): void;
}

export const PictureChanger = Object.assign(function PictureChanger(props: PictureChangerProps) {

	const { data: user } = trpc.useQuery(["user.me"]);
	const notify = useNotify();
	const [isLoading, setIsLoading] = useState(false);
	const utils = trpc.useContext();
	const updateUserMutation = trpc.useMutation("user.update", {
		onSettled: () => utils.invalidateQueries("user.me")
	});
	const removePictureMutation = trpc.useMutation("user.update", {
		onSettled: () => utils.invalidateQueries("user.me")
	});

	if (!user) return <></>;

	return <div className="flex flex-col items-center gap-2 pt-4">
		<ImageKitContext>

			<Button
				className="w-full relative"
				startIcon={<Icon.Material icon="add_a_photo" />}
				loading={isLoading}
			>
				Upload a file
				<IKUpload
					autoComplete="off"
					aria-autocomplete="none"
					className="absolute inset-0 z-[10] w-full opacity-0 cursor-pointer"
					fileName={`${user.id}`}
					folder="/avatars"
					useUniqueFileName
					isPrivateFile={false}
					onUploadStart={() => setIsLoading(true)}
					onError={(err) => {
						setIsLoading(false)
						notify.error("There was an error uploading your file.")
						console.error(err);
						props.onUploaded?.();
					}}
					onSuccess={(_res) => {
						const res = _res as ImageKitUploadResult
						updateUserMutation.mutateAsync({ image: res.url }).then(() => setIsLoading(false))
						props.onUploaded?.();
					}}
				/>
			</Button>

			{
				user.image &&
				<>
					<p>or</p>
					<AlertDialog
						title="Remove picture"
						description="Are you sure you want to remove your profile picture?"
						cancelLabel="Cancel"
						confirmLabel="Confirm"
						onConfirm={() => removePictureMutation.mutate({ image: null })}
						variant="danger"
					>
						<Button
							className="w-full"
							disabled={!user.image}
							variant="flat"
							color="danger"
							loading={removePictureMutation.isLoading}
						>
							Remove picture
						</Button>
					</AlertDialog>
				</>
			}

		</ImageKitContext>
	</div>
}, {
	Dialog({ onUploaded, ...dialogProps }: DialogProps & PictureChangerProps) {
		return <Dialog
			title="Change profile picture"
			{...dialogProps}
		>
			<PictureChanger
				onUploaded={onUploaded}
			/>
		</Dialog>
	}
});