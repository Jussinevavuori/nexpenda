import Script from "next/script";

export function HeadExternalScripts() {
	return (<>
		{/* Global site tag (gtag.js) - Google Analytics */}
		<Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-LVM2P76WDY" />
	</>)
}