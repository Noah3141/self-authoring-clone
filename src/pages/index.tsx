import Head from "next/head";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Self Authoring</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <HomeLayout>
                    <h1>Main</h1>
                    <section></section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
}
