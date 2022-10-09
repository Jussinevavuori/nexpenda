import Head from "next/head";

export type PageHeadProps = {
	title?: string | string[];
}

export function PageHead(props: PageHeadProps) {
	return <Head>
		<title>
			{
				["Nexpenda", props.title].flat().filter(Boolean).join(" ― ")
			}
		</title>
	</Head>
}