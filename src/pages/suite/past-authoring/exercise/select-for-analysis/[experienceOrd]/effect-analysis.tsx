import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/Common/Button";
import Link from "~/components/Common/Link";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const EffectAnalysisPage: NextPage = () => {
    const router = useRouter();
    const experienceOrder = Number(router.query.experienceOrd);

    if (!experienceOrder) {
        return <SomethingsWrong />;
    }

    const { data: extendedAnalysis, status: analysesStatus } =
        api.get.extendedAnalysis.byOrd.withExperience.useQuery({
            experienceOrder,
        });

    if (!extendedAnalysis) {
    } else
        return (
            <>
                <Head>
                    <title>Select for Analysis</title>
                    <meta
                        name="description"
                        content="Map Your Life & Chart Your Course"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <BaseLayout>
                    <AuthoringLayout progress={20}>
                        <h1>Ten Most Critical Life Experiences</h1>
                        <p>
                            You wrote about a number of experiences in the
                            previous pages. They are all listed below. Choose
                            the ten experiences that were most important in
                            shaping your life. Each of these will be subjected
                            to further analysis, to help you understand their
                            significance.
                        </p>

                        <div>
                            {/* {experiencesStatus == "pending" ? (
                                <LoadingSpinner />
                            ) : (
                                <EffectAnalysisWizard
                                    experiences={experiences}
                                />
                            )} */}
                        </div>

                        <div className="mt-auto flex flex-row justify-between pt-6">
                            <Button
                                onClick={() => router.back()}
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                            <Link
                                href={`/suite/past-authoring/exercise/select-for-analysis/${experienceOrder + 1}/event-analysis`}
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

export default EffectAnalysisPage;
