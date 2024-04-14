import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";

const BuyItForAFriend = () => {
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
                <section className="border-b border-neutral-300">
                    <h1>Buy it for a friend</h1>
                </section>

                <Textarea maxWords={3000} minLength={5} />
            </BaseLayout>
        </>
    );
};

export default BuyItForAFriend;
