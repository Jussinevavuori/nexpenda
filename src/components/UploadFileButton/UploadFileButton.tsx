import { c } from '@/utils/generic/classnames';
import { Button, ButtonProps } from '../Button/Button';

export type UploadFileButtonProps = ButtonProps & {
	onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
	acceptedFileTypes?: string[];
	fileUploaderRef?: React.MutableRefObject<HTMLInputElement | null>
}

export function UploadFileButton(props: UploadFileButtonProps) {
	const { onChange, acceptedFileTypes, fileUploaderRef, className, ...ButtonProps } = props;

	return <Button
		className={c("relative", className)}
		{...ButtonProps}
	>
		{props.children}
		<input
			autoComplete="off"
			aria-autocomplete="none"
			className="absolute inset-0 z-[10] w-full opacity-0 cursor-pointer"
			type="file"
			onChange={onChange}
			accept={(acceptedFileTypes ?? []).join(",")}
			ref={fileUploaderRef}
		/>
	</Button>

}