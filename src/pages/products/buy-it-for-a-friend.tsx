import Head from "next/head";
import React from "react";
import Button from "~/components/Common/Button";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

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
                <HomeLayout>
                    <section className="border-b border-neutral-300">
                        <h1>Buy it for a friend</h1>
                    </section>

                    <h2 className="mt-12 text-center text-2xl">
                        Two Voucher Special
                    </h2>
                    <p className="text-center text-sm">
                        Get two vouchers for the Self Authoring Suite for{" "}
                        <strong>$29.90 USD</strong>. For a limited time you can
                        give two friends access to all the Self Authoring
                        exercises for just $29.90 USD.
                    </p>
                    <Button
                        color="neutral"
                        fill="solid"
                        className="mx-auto !w-64"
                    >
                        Buy for Two Friends
                    </Button>
                    <h2 className="mt-12 text-center text-2xl">
                        Give the Self Authoring Suite
                    </h2>
                    <p className="text-center text-sm">
                        Buy a voucher for the Self Authoring Suite for{" "}
                        <strong>$29.90 USD</strong> and give a friend access to
                        all the Self Authoring Exercises.
                    </p>
                    <Button
                        color="neutral"
                        fill="solid"
                        className="mx-auto !w-64"
                    >
                        Buy for a Friend
                    </Button>
                    <h2 className="mt-12 text-center text-2xl">
                        Give Individual Exercises
                    </h2>
                    <p className="text-center text-sm">
                        You can purchase vouchers for each exercise
                        individually.{" "}
                    </p>
                    <table className="mx-auto max-w-xl">
                        <tr className="border-t border-neutral-300">
                            <td className="p-2">
                                Give the Future Authoring Exercise
                            </td>
                            <td className="p-2">$14.95 USD</td>
                            <td className="p-2">
                                <Button
                                    size="small"
                                    fill="solid"
                                    color="neutral"
                                >
                                    Buy
                                </Button>
                            </td>
                        </tr>
                        <tr className="border-t border-neutral-300">
                            <td className="p-2">
                                Give the Past Authoring Exercise
                            </td>
                            <td className="p-2">$14.95 USD</td>
                            <td className="p-2">
                                <Button
                                    fill="solid"
                                    size="small"
                                    color="neutral"
                                >
                                    Buy
                                </Button>
                            </td>
                        </tr>
                    </table>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default BuyItForAFriend;
