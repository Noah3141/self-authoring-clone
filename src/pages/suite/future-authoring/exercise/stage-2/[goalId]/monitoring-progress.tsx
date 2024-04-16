import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { type FC, useState } from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import type { Goal } from "@prisma/client";
import { useRouter } from "next/router";
import Textarea from "~/components/Common/Textarea";
import toast from "react-hot-toast";

const MonitoringProgressPage: NextPage = () => {
    const router = useRouter();
    const goalId = router.query.goalId as string;

    const { data: goalData, status: goalsStatus } =
        api.get.futureAuthoring.stage2.byId.withAdjacent.useQuery({ goalId });

    if (goalsStatus === "error") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <SomethingsWrong />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (goalsStatus === "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    const { goal, nextGoal } = goalData;

    return (
        <>
            <Head>
                <title>Monitoring Progress</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <h1>
                        {goal?.title}
                        <span className="ps-6 text-neutral-200">
                            2.{goal?.priority}.5
                        </span>
                    </h1>
                    <h2>Monitoring Progress towards Desired Goals</h2>

                    <p>
                        We need to know, concretely, whether or not we are
                        progressing towards the attainment of valued goals. Of
                        course, this is not an easy task. When we want to
                        complete very specific tasks, feedback on our
                        performance is relatively easy to monitor. However, if
                        our goals are less short-term, this becomes a little
                        more difficult.
                    </p>

                    <p>
                        You are now being asked to identify personal benchmarks
                        that will allow you to evaluate your own performance.
                    </p>

                    <ul className="list-disc ps-6">
                        <li>
                            When would you like to achieve this goal? Be
                            specific. Even if you have to revise a deadline
                            later, it is still better to set one.
                        </li>
                        <li>
                            What sorts of things will you accept as evidence
                            that you are progressing towards your stated goal?
                        </li>
                        <li>
                            How often are you going to monitor your own
                            behavior?
                        </li>
                        <li>
                            How will things in your life have to change,
                            measurably, for you to feel satisfied in your
                            progress?
                        </li>
                        <li>
                            How can you ensure that you are neither pushing
                            yourself too hard, and ensuring failure, or being
                            too easy on yourself, and risking boredom and
                            cynicism?
                        </li>
                    </ul>

                    <p>
                        {`Your benchmarks should be personal indicators of
                        success. It doesn't matter what others may think defines
                        progress towards your goal. Write down those
                        accomplishments that would truly indicate positive
                        movement on your part. Feel free to write as much as you
                        feel is necessary.`}
                    </p>

                    <p>
                        Write down how you might monitor your progress with
                        regards to this goal.
                    </p>

                    {!!goal ? (
                        <IdentifyingSolutionsToObstaclesWizard goal={goal} />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/evaluating-your-motives`}
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
                                !!nextGoal
                                    ? `/suite/future-authoring/exercise/stage-2/${nextGoal.id}/evaluating-your-motives`
                                    : `/suite/future-authoring/exercise/stage-2/conclusion`
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

export default MonitoringProgressPage;

type IdentifyingSolutionsToObstaclesWizardProps = {
    goal: Goal;
};

const IdentifyingSolutionsToObstaclesWizard: FC<
    IdentifyingSolutionsToObstaclesWizardProps
> = ({ goal }) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(goal.progressAnalysis);

    const {
        mutate: update,
        status,
        reset,
    } = api.update.goal.useMutation({
        onError: () => {
            void toast.error("Something went wrong saving your input!");
        },
        onSuccess: () => {
            void apiState.get.futureAuthoring.stage1.all.invalidate();
            setTimeout(() => {
                reset();
            }, 3000);
        },
    });

    return (
        <div className="flex flex-col gap-1">
            <Textarea
                value={input}
                setValue={setInput}
                status={status}
                onFinishedTyping={() => {
                    if (input !== goal.progressAnalysis) {
                        update({
                            progressAnalysis: input,
                            goalId: goal.id,
                        });
                    }
                }}
                maxWords={300}
            />
        </div>
    );
};
