import React, { useMemo } from "react"
import { env } from "@/env/env.client.mjs"
import { IKContext } from "imagekitio-react"

export function ImageKitContext(props: { children?: React.ReactNode }) {
	const baseUrl = useMemo(() => {
		if (typeof window === "undefined") return "";
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
		return `http://localhost:${process.env.PORT ?? 3000}`;
	}, []);

	return <IKContext
		publicKey={env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
		urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
		authenticationEndpoint={baseUrl + "/api/imagekit/auth"}
	>
		{props.children}
	</IKContext>
}