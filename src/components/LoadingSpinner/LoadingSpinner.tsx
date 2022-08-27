import { useClientSideMemo } from '@/hooks/useClientSideMemo';
import { getColorValue } from '@/utils/color/getColorValue';
import { BarLoader, PuffLoader } from 'react-spinners';

export type LoadingSpinnerVariant = "puff" | "bar"

export interface LoadingSpinnerProps {
	size?: number | string;
	height?: number | string;
	width?: number | string;
	color?: AnyColor;
	variant?: LoadingSpinnerVariant;
}

export function LoadingSpinner(props: LoadingSpinnerProps) {

	const size = props.size ?? 36;
	const color = useClientSideMemo(() => getColorValue(props.color ?? "primary-500"), [props.color]);

	switch (props.variant ?? "puff") {
		case "puff":
			return <PuffLoader size={size} color={color} />
		case "bar":
			return <BarLoader width={props.width} height={props.height} color={color} style={{ width: "100%" }} />
		default:
			return null;
	}
}