import Head from "next/head";
import Link from "next/link";
import React from "react";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";
import Image from "next/image";

const NPR = () => {
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
                        <h1>Self Authoring Featured in NPR</h1>
                    </section>
                    <p>
                        Self Authoring was featured in NPR, the story is linked
                        below.
                    </p>
                    <Link
                        target="_blank"
                        href={
                            "http://www.npr.org/sections/ed/2015/07/10/419202925/the-writing-assignment-that-changes-lives"
                        }
                    >
                        <Image
                            className="m-3 mx-auto"
                            alt="oprah magazine"
                            src={"/static/npr-article.jpg"}
                            width={600}
                            height={500}
                        />
                    </Link>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default NPR;
