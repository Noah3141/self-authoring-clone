import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

const FutureAuthoringIntro: NextPage = () => {
    return (
        <>
            <Head>
                <title>Intro to Future Authoring</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={50}>
                    <h1>
                        Specific Goal Identification
                        <span className="ps-6 text-neutral-200">2</span>
                    </h1>
                    <p>
                        In this stage, you will first be asked to define and
                        personally title your overall future plan. Then, you
                        will be asked to take your general plans for the ideal
                        future and break them up into more specific goals. Each
                        of these separate goals will also be given its own
                        title. This step will help you clarify your goals.
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/ideal-future-summary`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/main-goal`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Next
                            </Button>
                        </Link>
                    </div>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
};

export default FutureAuthoringIntro;
