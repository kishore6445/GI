import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* Remove any direct font imports from here */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
