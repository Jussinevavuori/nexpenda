import { Meta } from '@/features/Meta/Meta'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return Document.getInitialProps(ctx)
	}

	render() {
		return (
			<Html>
				<Head>
					<Meta.Document />
				</Head>
				<body className="text-black dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}