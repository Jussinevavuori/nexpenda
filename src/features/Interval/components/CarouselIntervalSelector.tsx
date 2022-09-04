import { IntervalSelectorProps } from '../IntervalSelector';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRaf } from '@/hooks/useRaf';
import { range } from '@/utils/generic/range';
import { IconButton } from '@/components/IconButton/IconButton';
import { Icon } from '@/components/Icon/Icon';
import { getWindow } from '@/utils/dom/getWindow';
import { cssTranslate } from '@/utils/styles/cssTranslate';
import { getMin } from '@/utils/generic/getMin';
import { mapValue } from '@/utils/generic/mapValue';
import { cssScale } from '@/utils/styles/cssScale';
import { usePeriodStore } from '@/stores/periodStore';
import { getPeriodLength } from '@/utils/dates/getPeriodLength';
import { isSamePeriod } from '@/utils/dates/isSamePeriod';
import { offsetPeriod } from '@/utils/dates/offsetPeriod';
import { formatPeriod } from '@/utils/dates/formatPeriod';
import { periodIncludesToday } from '@/utils/dates/periodIncludesToday';

const LEFT_OFFSET = 24;

// All data stored for a paragraph which represents a single item in the
// carousel. Contains the paragraph element, the interval offset number, 
// corresponding interval start and end dates and the element's correct
// x position (does not consider drag offsets, only its real undragged position)
type ParagraphWrapper = {
	el: HTMLParagraphElement;
	offset: number;
	period: Period;
	x: number;
}

export function CarouselIntervalSelector() {

	const reset = usePeriodStore(_ => _.reset);
	const forward = usePeriodStore(_ => _.forward);
	const back = usePeriodStore(_ => _.back);
	const period = usePeriodStore(_ => _.period)

	const periodLength = getPeriodLength(period);

	// How many components should be rendered on each side of the current interval
	const ghosts = useMemo(() => periodLength === "all" ? 0 : 10, [periodLength])

	// Ref to hold all paragraphs and utility function to access all currently
	// existing refs and only those (from -offset to +offset inclusive) and
	// function to find a given paragraph
	const paragraphsRef = useRef<Record<number, ParagraphWrapper>>({})
	const getParagraphs = useCallback(() => {
		return range(-ghosts, ghosts + 1).map(i => paragraphsRef.current[i]).filter(Boolean)
	}, [paragraphsRef, ghosts]);
	const getParagraph = useCallback((offset: number) => {
		if (-ghosts <= offset && offset <= ghosts) {
			return paragraphsRef.current[offset];
		}
	}, [paragraphsRef, ghosts])

	// Hold current value which offset should be committed after drag release
	const releaseOffsetRef = useRef<number>(0);

	// Commit release and update interval if offset not 0. Returns the offset.
	// Can optionally be provided an offset to be used instead of the
	// release offset ref's value.
	const commit = useCallback((specifiedOffset?: number) => {
		const offset = specifiedOffset ?? releaseOffsetRef.current
		if (offset < 0) forward(Math.abs(offset))
		if (offset > 0) back(Math.abs(offset));
		releaseOffsetRef.current = 0;
		return offset;
	}, [releaseOffsetRef, forward, back])

	// Dragging state tells whether the user is currently dragging, the applied
	// drag offset and when the drag started / ended.
	const draggingRef = useRef<{
		dragging: boolean;
		offset: number;
		changeAt: number;
	}>({ dragging: false, offset: 0, changeAt: Date.now() });

	// Animate elements every frame.
	useRaf(useCallback(() => {
		// Early optimization: if no offset and last change to drag state
		// occurred more than a second ago, skip calculating styles, assume
		// styles remain unchanged
		if (draggingRef.current.offset === 0 && draggingRef.current.changeAt + 1000 < Date.now()) return;

		const paragraphs = getParagraphs();

		// When drag is released, animate drag offset to 0 with exponential easing.
		const drag = draggingRef.current;
		if (!drag.dragging && drag.offset !== 0) {
			drag.offset = drag.offset * 0.9
			if (Math.abs(drag.offset) < 0.1) drag.offset = 0;
		}

		// Animate element styles. Save the nearest paragraph's offset to the 
		// releaseOffsetRef for committing when drag is released.
		const { nearest } = updateParagraphs(paragraphs, draggingRef.current.offset);
		if (nearest.item) {
			releaseOffsetRef.current = nearest.item.offset;
		}
	}, [getParagraphs, releaseOffsetRef, draggingRef]))

	const previousTouchX = useRef<number>(0);

	// Select an interval and go to it manually via a click for example
	const select = useCallback((offset: number | "now", force = false) => {
		if (!force && (draggingRef.current.dragging || Math.abs(draggingRef.current.offset) > 30)) return;
		draggingRef.current.changeAt = Date.now();

		if (offset === "now") {
			// Attempt to find paragraph to scroll to if one exists and scroll to it
			// if found
			const nowParagraph = getParagraphs().find(p => isSamePeriod(p, period));
			if (nowParagraph) draggingRef.current.offset = nowParagraph.x;

			// Manually set now interval
			reset()
		} else {
			if (offset === 0) return;
			const x = getParagraph(offset)?.x ?? 0;
			commit(offset);
			draggingRef.current.offset = x;
		}
	}, [commit, draggingRef, getParagraphs, reset, getParagraph, period])

	// Start drag
	const startDrag = useCallback(() => {
		draggingRef.current.changeAt = Date.now();
		draggingRef.current.dragging = true;
	}, [draggingRef])

	// Continue drag by a given amount
	const drag = useCallback((dx: number) => {
		if (draggingRef.current.dragging) {
			draggingRef.current.offset += dx
		}
	}, [draggingRef])

	// End drag and commit unless specified otherwise
	const endDrag = useCallback((commitDrag = true) => {
		draggingRef.current.changeAt = Date.now()
		draggingRef.current.dragging = false;

		// Commit drag, update offsets to animate correctly
		if (commitDrag) {
			const x = getParagraphs().find(_ => _.offset === releaseOffsetRef.current)?.x ?? 0;
			const committedOffset = commit();
			if (committedOffset !== 0) {
				draggingRef.current.offset += x;
			}
		}
	}, [draggingRef, commit, getParagraphs])

	// Listen to events that move and end the drag in entire window
	useEffect(() => {

		// When drag is moved, track by how much and call the drag method
		const moveHandler = (e: TouchEvent | MouseEvent) => {
			// Get distance moved (record previous for touch event)
			let dx = 0;
			if ("touches" in e) {
				dx = (e.touches[0]?.clientX ?? 0) - previousTouchX.current
				previousTouchX.current = (e.touches[0]?.clientX ?? 0)
			} else {
				dx = e.movementX;
			}

			drag(dx);
		}

		// When drag ends, simply call the endDrag method
		const endHandler = () => endDrag();

		// Apply and clean up all event listeners
		window.addEventListener("touchmove", moveHandler);
		window.addEventListener("mousemove", moveHandler);
		window.addEventListener("mouseup", endHandler);
		window.addEventListener("touchend", endHandler);
		window.addEventListener("touchcancel", endHandler);
		return () => {
			window.removeEventListener("touchmove", moveHandler);
			window.removeEventListener("mousemove", moveHandler);
			window.removeEventListener("mouseup", endHandler);
			window.removeEventListener("touchend", endHandler);
			window.removeEventListener("touchcancel", endHandler);
		}
	}, [drag, endDrag, previousTouchX])

	return (

		<div className="relative">

			<div
				className="relative select-none cursor-grab w-100 overflow-visible"
				style={{ height: 24 }}

				// Drag initializers
				onMouseDown={() => startDrag()}
				onTouchStart={(e) => {
					startDrag()
					previousTouchX.current = (e.touches[0]?.clientX ?? 0)
				}}
			>

				{
					/* Render `ghosts` amount of previous intervals */
					range(ghosts).reverse().map((i) => {
						const offset = -i - 1
						const _period = offsetPeriod(period, offset);
						const formatted = formatPeriod(_period);

						return <p
							key={formatted}
							className="absolute left-0 top-0 text-2xl pr-6 dark:text-slate-100 select-none whitespace-nowrap"
							onClick={() => select(offset)}
							ref={el => { if (el) paragraphsRef.current[offset] = { el, period: _period, offset, x: 0 } }}
						>
							{formatted}
						</p>
					})
				}

				{/* Current interval */}
				<p
					className="absolute left-0 top-0 text-2xl pr-6 dark:text-slate-100 select-none whitespace-nowrap"
					ref={el => { if (el) paragraphsRef.current[0] = { el, period, offset: 0, x: 0 } }}
				>
					{formatPeriod(period)}
				</p>

				{
					/* Render `ghosts` amount of next intervals */
					range(ghosts).map((i) => {
						const offset = i + 1
						const _period = offsetPeriod(period, offset);
						const formatted = formatPeriod(_period);

						return <p
							key={formatted}
							className="absolute left-0 top-0 text-2xl pr-6 dark:text-slate-100 select-none whitespace-nowrap"
							onClick={() => select(offset)}
							ref={el => { if (el) paragraphsRef.current[offset] = { el, period: _period, offset, x: 0 } }}
						>
							{formatted}
						</p>
					})
				}
			</div>

			<div className="absolute right-0 top-0 bottom-0 flex items-center">

				{
					!periodIncludesToday(period) && <IconButton
						variant="text"
						className="-mr-3 p-4"
						onClick={() => select("now", true)}
					>
						<Icon.Material icon="replay" />
					</IconButton>
				}

				<IconButton
					variant="text"
					className="-mr-3 p-4"
					disabled={periodLength === "all"}
					onClick={() => select(-1, true)}
				>
					<Icon.Material icon="chevron_left" />
				</IconButton>
				<IconButton
					variant="text"
					className="-mr-3 p-4"
					disabled={periodLength === "all"}
					onClick={() => select(+1, true)}
				>
					<Icon.Material icon="chevron_right" />
				</IconButton>

			</div>

		</div >
	)
}

/**
 * Utility function that updates all paragraphs dynamically based on their
 * position. Automatically computes the nearest element (one that should be
 * selected) and returns it.
 */
function updateParagraphs(paragraphs: ParagraphWrapper[], dragOffset: number) {

	// Function to calculate distance
	function getDistance(p: HTMLParagraphElement) {
		return Math.abs(p.getBoundingClientRect().left - LEFT_OFFSET);
	}

	// Get window width for scaling styles
	const w = getWindow()?.innerWidth ?? 0;

	// Get size of all paragraphs before current interval
	const wBefore = paragraphs.filter(_ => _.offset < 0).reduce((total, p) => p.el.clientWidth + total, 0)

	// Cumulative width for correctly positioning each subsequent element
	let cumulativeWidth = 0;

	// Handle position of each element
	for (const p of paragraphs) {
		// Calculate x origin as position where element should be and x position
		// as position where element is when accounting for the drag offset
		const xOrigin = -wBefore + cumulativeWidth;
		const xPosition = xOrigin + dragOffset;

		// Save elements origin position to element wrapper
		p.x = xOrigin;

		// Apply elements real position to element as transform 
		p.el.style.transform = `${cssTranslate.x(xPosition)} var(--scale)`;

		// Cumulate width for next element
		cumulativeWidth += p.el.clientWidth;
	}

	// Map paragraph elements with distance data
	const paragraphsWithDistance = paragraphs.map(p => ({ ...p, d: getDistance(p.el) }));

	// Get nearest p
	const nearest = getMin(paragraphsWithDistance, p => p.d)

	// Style each p
	for (const p of paragraphsWithDistance) {
		// Set up object for updatable properties
		const properties = {
			opacity: 100,
			scale: 1,
			fontWeight: 500,
		}

		// Size, opacity and fontweight based on proximity
		if (nearest.item === p) {
			properties.fontWeight = 600;
		} else {
			properties.scale = mapValue(p.d, 0, w, 1, 0.7);
			properties.opacity = mapValue(p.d, 0, w * .5, 1, 0) * 100;
		}

		// Apply properties
		p.el.style.opacity = `${properties.opacity}%`;
		p.el.style.fontWeight = `${properties.fontWeight}`;
		p.el.style.setProperty("--scale", cssScale(properties.scale));
	}

	// Return nearest p
	return {
		nearest
	}
}