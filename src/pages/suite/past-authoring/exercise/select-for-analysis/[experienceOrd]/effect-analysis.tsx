import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api, RouterOutputs } from "~/utils/api";

const EffectAnalysisPage: NextPage = () => {
    const router = useRouter();
    const experienceOrder = Number(router.query.experienceOrd);

    if (!experienceOrder) {
        return <SomethingsWrong />;
    }

    const { data: extendedAnalysis, status: extendedAnalysisStatus } =
        api.get.extendedAnalysis.byOrd.withExperience.useQuery({
            experienceOrder,
        });

    if (extendedAnalysisStatus === "error") {
        return;
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
                        <h1>{extendedAnalysis?.experience.title}</h1>
                        <p>
                            What effect did this experience have on your trust
                            in people? On your hopes for the future? On your
                            belief in your own value and the value of life? On
                            your personality? Write approximately 250 words.
                        </p>

                        <div>
                            {extendedAnalysisStatus === "pending" ? (
                                <LoadingSpinner />
                            ) : (
                                <EffectAnalysisWizard
                                    extendedAnalysis={extendedAnalysis}
                                />
                            )}
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
