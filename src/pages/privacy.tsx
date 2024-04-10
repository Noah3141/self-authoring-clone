import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const PrivacyPage = () => {
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
                    <h1>Privacy</h1>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default PrivacyPage;
