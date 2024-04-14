import Head from "next/head";
import React from "react";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

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
                <HomeLayout>
                    <section className="border-b border-neutral-300">
                        <h1>Past Authoring</h1>
                    </section>
                    <section className="flex flex-col gap-4">
                        <div>
                            <p>
                                It is difficult to know who you are, where you
                                should go, or how you should get there, unless
                                you know where you came from. The Past Authoring
                                Program has therefore been designed to help you
                                write a structured autobiography. The program
                                will help you:
                            </p>
                            <ul className="list-disc ps-6 pt-3">
                                <li>
                                    Divide your life into seven different time
                                    periods or epochs.
                                </li>
                                <li>
                                    Identify the most significant events that
                                    occurred during each epoch.
                                </li>
                                <li>
                                    Describe how each of those experiences has
                                    shaped who you are today.
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-row justify-center py-6">
                            <Button
                                className="!w-52"
                                fill="solid"
                                color="neutral"
                            >
                                Buy Now - $14.95 USD
                            </Button>
                        </div>
                        <p>
                            It would be particularly useful to complete the Past
                            Authoring Program if you have memories that are more
                            than about eighteen months old that still intrude
                            upon your thoughts, or that still evoke emotion such
                            as fear, regret, shame or confusion. If this is
                            happening, it means that your mind has not yet been
                            able to fully process your past experiences, and
                            that the brain areas associated with negative
                            emotion still regard the past events in question as
                            unresolved threats. This is not good, because your
                            brain reacts to unresolved threats with emergency
                            physiological preparation, including the production
                            of stress hormones such as cortisol that can be very
                            toxic when chronically elevated.
                        </p>
                        <p>
                            The Past Authoring program is the most difficult and
                            time-consuming of all the programs. We recommend
                            that you complete it after the Present and Future
                            Authoring programs, once you have become accustomed
                            to the process.
                        </p>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default PastAuthoringProduct;
