import { useLatestClickPosition } from '@/hooks/useLatestClickPosition';
import { useTimeout } from '@/hooks/useTimeout';
import { isStaticPalette } from '@/utils/color/isStaticPalette';
import { getWindow } from '@/utils/dom/getWindow';
import { c } from '@/utils/generic/classnames';
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Color } from '../Color/Color';

type Position = { left: number; top: number; } | "latestClickPosition"

export interface FullscreenSplashProps {
	defaultPosition?: Position;
	defaultColor?: "light" | "dark" | "primary" | StaticPalette;
	defaultDurationMs?: number;
}

export interface FullscreenSplashOptions {
	position?: Position;
	color?: "light" | "dark" | "primary" | StaticPalette;
	durationMs?: number;
}

export interface FullscreenSplashHandle {
	animate(options: FullscreenSplashOptions): void;
	cancel(): void;
}

const DEFAULTS: Required<FullscreenSplashOptions> = {
	color: "primary",
	position: "latestClickPosition",
	durationMs: 2000,
}

export const FullscreenSplash = forwardRef<FullscreenSplashHandle, FullscreenSplashProps>(function FullscreenSplash_Component(props, ref) {
	const latestClickPos = useLatestClickPosition();
	const timeout = useTimeout();
	const [state, setState] = useState<null | (Required<FullscreenSplashOptions> & { id: string })>(null);

	// Provide handle for starting and stopping the animation
	useImperativeHandle(ref, () => ({
		animate(options: FullscreenSplashOptions) {
			const id = uuid();
			const color = options.color ?? props.defaultColor ?? DEFAULTS.color;
			const position = options.position ?? props.defaultPosition ?? DEFAULTS.position;
			const durationMs = options.durationMs ?? props.defaultDurationMs ?? DEFAULTS.durationMs;

			setState({ id, color, position, durationMs })
			timeout.set(() => setState(null), durationMs);
		},
		cancel() {
			setState(null);
			timeout.clear();
		}
	}))

	if (!state) return null;

	// Get position to render fullscreen splash
	const pos = {
		x: state.position === "latestClickPosition" ? (latestClickPos?.x ?? 0) : state.position.left,
		y: state.position === "latestClickPosition" ? (latestClickPos?.y ?? 0) : state.position.top,
	}

	return <Color
		color={isStaticPalette(state.color) ? state.color : undefined}
		className="fixed inset-0 z-[1999]"
	>
		<div
			key={state.id}
			className={c(
				"animate-radiate-circle",
				c.variant(state.color)({
					light: "bg-slate-200",
					dark: "bg-slate-800",
				}).default("bg-primary-500")
			)}
			style={{
				pointerEvents: "none",
				position: "fixed",
				left: pos?.x ?? 0,
				top: pos?.y ?? 0,
				zIndex: 2000,
				width: 2 * (getWindow()?.innerWidth ?? 0),
				height: 2 * (getWindow()?.innerHeight ?? 0),
				transform: `translate(-50%, -50%)`,
				animationDuration: `${state.durationMs}ms`
			}}
		/>
	</Color>
})

/**
 * Utility controller hook to provide access to handle of fullscreen
 * splash
 */
export function useFullscreenSplashController() {
	const ref = useRef<FullscreenSplashHandle | null>(null);

	return useMemo(() => ({
		ref,

		animate(ops: FullscreenSplashOptions) {
			if (ref.current) {
				ref.current.animate(ops);
			} else {
				console.warn("Attempted to animate unconcceted FullscreenSplash ref")
			}
		},

		cancel() {
			if (ref.current) {
				ref.current.cancel();
			} else {
				console.warn("Attempted to cancel unconcceted FullscreenSplash ref")
			}
		}
	}), [ref])
}