import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
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
