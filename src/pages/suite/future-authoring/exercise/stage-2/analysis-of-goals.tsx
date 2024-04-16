import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "~/components/Common/Button";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const FutureAuthoringStage2Intro: NextPage = () => {
    const { data: goals, status: goalsStatus } =
        api.get.futureAuthoring.stage2.all.useQuery();

    if (goalsStatus === "error") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <SomethingsWrong />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    const firstGoal = goals?.at(0);

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
                <AuthoringLayout progress={37}>
                    <h1>
                        Specific Goal Identification
                        <span className="ps-6 text-neutral-200">2</span>
                    </h1>
                    <p>
                        Now you will be asked about the following elements or
                        feature for each of the specific goals you have
                        identified:
                    </p>

                    <ul className="list-disc ps-6">
                        <li>Evaluating Your Motives</li>
                        <li>
                            Considering the Broad Personal and Social Impact of
                            Goals
                        </li>
                        <li>
                            Considering the Detailed Strategies for Goal
                            Attainment
                        </li>
                        <li>
                            Identifying Potential Obstacles and their Solutions
                        </li>
                        <li>Monitoring Progress towards Desired Goals</li>
                    </ul>
                    <p>
                        Thus, the five pages that contain these elements or
                        features will repeat until all your goals have been
                        assessed.
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/prioritize-goals`}
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
                            href={
                                !!firstGoal
                                    ? `/suite/future-authoring/exercise/stage-2/${firstGoal.id}/evaluating-your-motives`
                                    : "/suite/future-authoring/exercise/stage-2/goals"
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

export default FutureAuthoringStage2Intro;
