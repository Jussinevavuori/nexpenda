import Script from "next/script"
import { ThemedFavicon } from "./components/ThemedFavicon/ThemedFavicon"
import { ThemedMeta } from "./components/ThemedMeta/ThemedMeta"

export const Meta = {

	App: () => {
		return <>
			{/* Themed utils */}
			<ThemedMeta />
			<ThemedFavicon />

			{/* Global site tag (gtag.js) - Google Analytics */}
			<Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-LVM2P76WDY" />


		</>
	}
	,
	Document: () => {
		return <>

			{/* Manifest */}
			<link rel="manifest" href="/manifest.json" />

			{/* Google fonts */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>

			{/* Document meta */}
			<meta charSet="utf-8" />
			<meta name="description" content="Nexpenda Money Tracking App" />

			{/* Apple icons */}
			<link
				rel="apple-touch-icon"
				href="assets/icons/apple-icon-180.png"
			/>
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2048-2732d.png"
				media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2732-2048d.png"
				media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1668-2388d.png"
				media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2388-1668d.png"
				media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1536-2048d.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2048-1536d.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1668-2224d.png"
				media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2224-1668d.png"
				media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1620-2160d.png"
				media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2160-1620d.png"
				media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1284-2778d.png"
				media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2778-1284d.png"
				media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1170-2532d.png"
				media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2532-1170d.png"
				media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1125-2436d.png"
				media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2436-1125d.png"
				media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1242-2688d.png"
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2688-1242d.png"
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-828-1792d.png"
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1792-828d.png"
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1242-2208d.png"
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-2208-1242d.png"
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-750-1334d.png"
				media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1334-750d.png"
				media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-640-1136d.png"
				media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
			/>
			<link
				rel="apple-touch-startup-image"
				href="assets/icons/apple-splash-1136-640d.png"
				media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
			/>
		</>
	}
}