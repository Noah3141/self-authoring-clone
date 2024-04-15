import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api, type RouterOutputs } from "~/utils/api";

const EventAnalysisPage: NextPage = () => {
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

    const { extendedAnalysis, previousAnalysis } = analysesData;
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
                        How did this experience come about? Was it primarily
                        positive or negative? Were you helped or hurt by other
                        people? What role did you play during this time period
                        to shape the events that led to this experience? Were
                        there things that you should have done differently? Were
                        there important occurrences that were out of your
                        control, or beyond your understanding at that time?
                        Write approximately 250 words.
                    </p>

                    <div>
                        <EventAnalysisWizard
                            extendedAnalysis={extendedAnalysis}
                        />
                    </div>

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link
                            href={
                                !!previousAnalysis
                                    ? `/suite/past-authoring/exercise/select-for-analysis/effect-analysis?experienceId=${previousAnalysis.experienceId}`
                                    : "/suite/past-authoring/exercise/select-for-analysis/"
                            }
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
                            href={`/suite/past-authoring/exercise/select-for-analysis/effect-analysis?experienceId=${extendedAnalysis.experienceId}`}
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

export default EventAnalysisPage;

type EventAnalysisWizardProps = {
    extendedAnalysis: RouterOutputs["get"]["extendedAnalysis"]["byOrd"]["withExperience"];
};

const EventAnalysisWizard: FC<EventAnalysisWizardProps> = ({
    extendedAnalysis,
}) => {
    const [input, setInput] = useState(extendedAnalysis.eventAnalysis);
    const { mutate: updateEventAnalysis, status: updatingStatus } =
        api.update.extendedAnalysis.eventAnalysis.useMutation({});

    return (
        <div>
            <Textarea
                tooltips={{ success: "Saved!", error: "Not saved!" }}
                status={updatingStatus}
                onFinishedTyping={() => {
                    updateEventAnalysis({
                        experienceId: extendedAnalysis.experienceId,
                        eventAnalysis: input,
                    });
                }}
                value={input}
                setValue={setInput}
                maxWords={250}
            />
        </div>
    );
};
