import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { svg } from "@/utils/svg/svg";
import { useMemo } from "react";

export type RoundedMobileCornersProps = {
	size?: number;

}

export function RoundedMobileCorners(props: RoundedMobileCornersProps) {
	const standalone = useIsStandalone()
	const isMobile = useBreakpoint("!desktop");

	const size = props.size ?? 10;

	const lPath = useMemo(() => svg.cornerPiece({ position: "top-left", size, variant: "internal" }), [size])
	const rPath = useMemo(() => svg.cornerPiece({ position: "top-right", size, variant: "internal" }), [size])

	if (!standalone || !isMobile) return null;

	return <div className="fixed z-[1] inset-0 flex items-start justify-between pointer-events-none">
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			<path d={lPath} className="fill-primary-500" />
		</svg>
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			<path d={rPath} className="fill-primary-500" />
		</svg>
	</div>

}