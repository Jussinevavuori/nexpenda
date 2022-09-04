import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import React, { useState } from 'react';
import { c } from '@/utils/generic/classnames';
import { getInitials } from '@/utils/generic/getInitials';
import { Icon } from '../Icon/Icon';

export interface Avatar {
	image?: string | null;
	name?: string | null;
	size?: number;
	onClick?(): void;
	children?: React.ReactNode;
}

export function Avatar(props: Avatar) {

	const size = props.size ?? 36;
	const interactive = !!props.onClick;

	const [imageError, setImageError] = useState(false);

	return <button
		disabled={!interactive}
		style={{ width: size, height: size }}
		className={c("relative z-0 rounded-full bg-slate-200 dark:bg-slate-800", interactive ? "cursor-pointer" : "cursor-default")}

		onClick={props.onClick}
	>
		<div className={c("absolute z-10 inset-0 rounded-full bg-primary-500 grid place-items-center overflow-hidden", (!props.image) ? "bg-primary-500" : "")}>
			{
				props.image && !imageError
					/* eslint-disable-next-line @next/next/no-img-element --
					 * The user image can be downloaded in multiple dynamic URLs, which can not be
					 * listed before hand and can therefore not be manually listed in the next.js
					 * config. We fallback to regular <img /> tag to fetch images from any URL.
					*/
					? <img
						onError={() => setImageError(true)}
						src={props.image}
						className="w-full h-full object-cover"
						alt="User"
					/>
					: props.name
						? <span className="font-medium text-white">
							{getInitials(props.name)}
						</span>
						: <Icon.Feather icon="user" className="text-white" />
			}
		</div>

		{
			interactive &&
			<div className="absolute z-10 inset-0 rounded-full bg-black opacity-0 hover:opacity-10 focus:opacity-10 active:opacity-20" />
		}

		{props.children}

	</button>

}