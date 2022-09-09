import { c } from "@/utils/generic/classnames";
import React from "react"

export type ButtonGroupProps = React.PropsWithChildren<{
	vertical?: boolean;
}>

export const ButtonGroup = ({ children, vertical }: ButtonGroupProps) => {
	const childCount = React.Children.count(children);
	return <div className={c("flex", c.if(vertical)("flex-col"))}>
		{
			React.Children.map(children, (child, index) => {
				const combineToNext = index < childCount - 1;
				const combineToPrev = index > 0;

				// eslint-disable-next-line
				return React.cloneElement(child as any, {
					style: {
						...(
							combineToNext ?
								(
									vertical
										? { "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }
										: { "borderTopRightRadius": "0px", "borderBottomRightRadius": "0px" }
								)
								: {}
						),
						...(
							combineToPrev ?
								(
									vertical
										? { "borderTopRightRadius": "0px", "borderTopLeftRadius": "0px" }
										: { "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }
								)
								: {}
						),
					}
				});
			})
		}
	</div>
}