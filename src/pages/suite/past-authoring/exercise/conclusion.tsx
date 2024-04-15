import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import EllipsisCircleIcon from "~/components/Icons/Theme/EllipsisCircle";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const ConclusionPage: NextPage = () => {
    const router = useRouter();

    const { data: lastSelectedAnalysis, status: selectedAnalysisStatus } =
        api.get.extendedAnalysis.byOrd.highest.useQuery();

    if (selectedAnalysisStatus == "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={100}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (selectedAnalysisStatus == "error") {
        void router.push("/suite/past-authoring/exercise/select-for-analysis");
        return;
    }

    return (
        <>
            <Head>
                <title>Conclusion</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={100}>
                    <h1>Conclusion</h1>
                    <p>
                        At this point you have completed the past authoring or
                        autobiography exercise.
                    </p>
                    <p>
                        People are much healthier and more hopeful and less
                        depressed and more productive if they have truly derived
                        the most relevant information from their past
                        experiences. You can tell if this has happened (1) if
                        there are no longer past memories that haunt and bother
                        you, or that make you feel resentful (2) if your story
                        has been written in a manner that would allow you to
                        tell it to another person so that they could understand
                        it.
                    </p>
                    <p>
                        Some of the effects of such writing seem to take a while
                        to fully manifest themselves. Often people feel worse,
                        not better, in the aftermath of such detailed
                        consideration of the past. The positive benefits seem to
                        start occurring about two weeks after the exercises have
                        been completed.
                    </p>
                    <p>
                        If you have found this exercise helpful, you might
                        consider proceeding to the future authoring section. The
                        future authoring exercise will help you clarify your
                        values, stabilize your identity, identify your goals,
                        and formulate implementable plans, over a three to five
                        year time horizon.
                    </p>

                    <p>
                        You can view a complete summary of your autobiography in{" "}
                        <Link
                            href={"/suite/past-authoring/summary"}
                            className="rounded  border border-neutral-200 p-1 hover:text-primary-500 "
                        >
                            <EllipsisCircleIcon className="inline size-5" />{" "}
                            Settings {`>`} View Summary
                        </Link>
                    </p>
                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link
                            href={
                                !!lastSelectedAnalysis
                                    ? `/suite/past-authoring/exercise/select-for-analysis/effect-analysis?experienceId=${lastSelectedAnalysis.experienceId}`
                                    : "/suite/past-authoring/exercise/select-for-analysis/"
                            }
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link href={`/suite/past-authoring/`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Exit
                            </Button>
                        </Link>
                    </div>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
};

export default ConclusionPage;
