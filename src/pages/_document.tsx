import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className=" bg-neutral-50 font-sans text-neutral-700">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
