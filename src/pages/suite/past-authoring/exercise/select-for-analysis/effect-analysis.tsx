import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api, RouterOutputs } from "~/utils/api";

const EffectAnalysisPage: NextPage = () => {
    const router = useRouter();
    const experienceId = router.query.experienceId as string;

    if (!experienceId) {
        return <SomethingsWrong />;
    }

    const { data: analysesData, status: analysesDataStatus } =
        api.get.extendedAnalysis.byId.withAdjacent.useQuery({
            experienceId,
        });

    if (analysesDataStatus == "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={20}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (!analysesData) {
        toast.error(
            "Something went wrong arranging the experiences selected for analysis.",
        );
        void router.push("/suite/past-authoring/exercise/select-for-analysis");
        return;
    }

    const { extendedAnalysis, nextAnalysis } = analysesData;

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
                    <h1>{extendedAnalysis.experience.title}</h1>
                    <p>
                        What effect did this experience have on your trust in
                        people? On your hopes for the future? On your belief in
                        your own value and the value of life? On your
                        personality? Write approximately 250 words.
                    </p>

                    <div>
                        <EffectAnalysisWizard
                            extendedAnalysis={extendedAnalysis}
                        />
                    </div>

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link
                            href={`/suite/past-authoring/exercise/select-for-analysis/event-analysis?experienceId=${extendedAnalysis.experienceId}`}
                        >
                            <Button
                                onClick={() => router.back()}
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={
                                !!nextAnalysis
                                    ? `/suite/past-authoring/exercise/select-for-analysis/event-analysis?experienceId=${nextAnalysis.experienceId}`
                                    : "/suite/past-authoring/exercise/conclusion"
                            }
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

type EffectAnalysisWizardProps = {
    extendedAnalysis: RouterOutputs["get"]["extendedAnalysis"]["byOrd"]["withExperience"];
};

const EffectAnalysisWizard: FC<EffectAnalysisWizardProps> = ({
    extendedAnalysis,
}) => {
    const [input, setInput] = useState(extendedAnalysis.effectAnalysis);

    const { mutate: updateEffectAnalysis, status: updatingStatus } =
        api.update.extendedAnalysis.effectAnalysis.useMutation({});

    return (
        <div>
            <Textarea
                tooltips={{ success: "Saved!", error: "Not saved!" }}
                status={updatingStatus}
                onFinishedTyping={() => {
                    updateEffectAnalysis({
                        experienceId: extendedAnalysis.experienceId,
                        effectAnalysis: input,
                    });
                }}
                value={input}
                setValue={setInput}
                maxWords={250}
            />
        </div>
    );
};
