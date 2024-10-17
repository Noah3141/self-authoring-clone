import Head from "next/head";
import React from "react";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";
import Image from "next/image";
import Link from "next/link";

const OprahMagazine = () => {
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
                        <h1>Self Authoring Featured in Oprah Magazine</h1>
                    </section>
                    <p>
                        Self Authoring was featured in Oprah Magazine, the story
                        is linked below
                    </p>
                    <Link
                        target="_blank"
                        href={
                            "http://www.oprah.com/spirit/self-authoring-health-benefits-of-writing"
                        }
                    >
                        <Image
                            className="m-3 mx-auto"
                            alt="oprah magazine"
                            src={"/static/oprah-article.jpg"}
                            width={600}
                            height={500}
                        />
                    </Link>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default OprahMagazine;
