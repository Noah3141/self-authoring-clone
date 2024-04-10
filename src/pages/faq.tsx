import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const FaqPage = () => {
    return (
        <>
            <Head>
                <title>FAQ</title>
                <meta
                    name="description"
                    content="Frequently asked questions about Self Authoring"
                />
            </Head>
            <BaseLayout>
                <HomeLayout>
                    <h1>FAQ</h1>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default FaqPage;
