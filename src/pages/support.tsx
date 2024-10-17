import Head from "next/head";
import React from "react";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const SupportPage = () => {
    return (
        <>
            <Head>
                <title></title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <HomeLayout>
                    <section className="border-b border-neutral-300">
                        <h1>Support</h1>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default SupportPage;
