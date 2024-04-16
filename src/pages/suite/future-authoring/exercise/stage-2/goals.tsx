import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { GoalWizard } from "./main-goal";
import { api } from "~/utils/api";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";

const MainGoalPage: NextPage = () => {
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

    return (
        <>
            <Head>
                <title>Defining Goals</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <h1>
                        Specifying and Clarifying Your Goals
                        <span className="ps-6 text-neutral-200">2.2</span>
                    </h1>

                    <p>
                        Please break down your ideal future into 8 goals. You
                        can re-word, re-write and organize the relevant material
                        from Step 1 for your goal summaries, if you wish, or you
                        can rely on your memory. The exercise allows you to
                        specify a minimum of 6 goals, but people who identify 8
                        have better results with this exercise.
                    </p>
                    <p>
                        These specific goals can be from a number of different
                        domains.
                    </p>

                    <ul className="list-disc ps-6">
                        <li>
                            {`A personal goal might be "I would like to be
                            healthier."`}
                        </li>
                        <li>{`A career goal might be "I would like to be more interested in my job"`}</li>
                        <li>{`A social goal might be "I would like to meet more people".`}</li>
                    </ul>

                    <p>
                        The summaries you write about each goal should be
                        reasonably brief and memorable. Make sure that each goal
                        summary includes nothing but the most important
                        information. You will have 10-15 minutes for this part
                        of the exercise. Feel free to revise and edit.
                    </p>

                    {!!goals?.length ? (
                        <div className="flex flex-col gap-12">
                            {goals.map((goal) => {
                                return (
                                    <div
                                        key={goal.id}
                                        className="text-neutral-500 transition-all hover:scale-[101%] hover:text-neutral-900"
                                    >
                                        <GoalWizard goal={goal} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/goals`}
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
                            href={`/suite/future-authoring/exercise/stage-2/prioritize-goals/`}
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

export default MainGoalPage;
