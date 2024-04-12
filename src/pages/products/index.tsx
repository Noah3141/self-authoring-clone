import Head from "next/head";
import React from "react";
import Button from "~/components/Common/Button";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const ProductsPage = () => {
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
                        <h1>Self Authoring Exercises and Packages</h1>
                    </section>
                    <section className="flex flex-col gap-12 !py-12">
                        <div className="flex flex-col items-center gap-3">
                            <h2 className="text-2xl">
                                Limited Time Offer - Self Authoring Suite 2 for
                                1 Special{" "}
                            </h2>
                            <p>
                                Buy the 2 for 1 Special for $29.90 USD, and get
                                access to all the Self Authoring Exercises for
                                yourself and for a friend.{" "}
                            </p>
                            <Button className="!w-96" fill="solid">
                                Buy Now
                            </Button>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <h2 className="text-2xl">Self Authoring Suite</h2>
                            <p>
                                Buy the Self Authoring Suite and get access to
                                all the Self Authoring Exercises for{" "}
                                <b>$29.90 USD</b>.
                            </p>
                            <Button className="!w-96" fill="solid">
                                Buy Now
                            </Button>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <h2 className="text-2xl">
                                Give Self Authoring Suite
                            </h2>
                            <p>
                                Buy a voucher for the Self Authoring Suite for
                                <b> $29.90 USD</b> and give a friend access to
                                all the Self Authoring Exercises.
                            </p>
                            <Button className="!w-96" fill="solid">
                                Buy for a Friend
                            </Button>
                        </div>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default ProductsPage;
