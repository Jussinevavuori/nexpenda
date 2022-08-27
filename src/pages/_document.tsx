import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { HeadElements } from '../components/HeadElements/HeadElements'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return Document.getInitialProps(ctx)
	}

	render() {
		return (
			<Html>
				<Head>
					<HeadElements.AppleIcons />
					<HeadElements.DocumentMeta />
					<HeadElements.GoogleFonts />
					<HeadElements.Manifest />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}