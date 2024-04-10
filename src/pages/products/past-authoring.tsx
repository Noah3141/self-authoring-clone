import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";

const PastAuthoringProduct = () => {
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
                <h1>Main</h1>

                <Textarea maxWords={3000} minLength={5} />
            </BaseLayout>
        </>
    );
};

export default PastAuthoringProduct;
