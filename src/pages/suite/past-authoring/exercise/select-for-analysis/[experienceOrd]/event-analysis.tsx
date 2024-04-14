import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { z } from "zod";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api, RouterOutputs } from "~/utils/api";

const EventAnalysisPage: NextPage = () => {
    const router = useRouter();
    const experienceOrder = Number(router.query.experienceOrd);

    if (!experienceOrder) {
        return <SomethingsWrong />;
    }

    const { data: extendedAnalysis, status: extendedAnalysisStatus } =
        api.get.extendedAnalysis.byOrd.withExperience.useQuery({
            experienceOrder,
        });

    if (extendedAnalysisStatus == "error") {
        return;
    }
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
                        {extendedAnalysisStatus == "pending" ? (
                            <LoadingSpinner />
                        ) : (
                            <EventAnalysisWizard
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
                            // Send the user to the same analysis but the next subsection
                            href={`/suite/past-authoring/exercise/select-for-analysis/${experienceOrder}/effect-analysis`}
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
