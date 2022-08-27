export type GradientOverlayProps = {

}

export function GradientOverlay(props: GradientOverlayProps) {
	return <>
		<div className="absolute inset-0 bg-primary-500 opacity-30 mix-blend-color" />
		<div className="opacity-50 absolute inset-0 bg-gradient-to-br from-primary-300 via-transparent to-transparent" />
		<div className="opacity-50 absolute inset-0 bg-gradient-to-bl from-primary-700 via-transparent to-transparent" />
		<div className="opacity-70 scale-150 absolute bg-off-primary-500 blur-2xl rounded-full mix-blend-color w-1/2 h-1/2 top-1/2 left-1/2" />
		<div className="opacity-70 scale-150 absolute bg-off-primary-alt-500 blur-2xl rounded-full mix-blend-color w-1/2 h-1/2 bottom-1/2 right-1/2" />
	</>
}