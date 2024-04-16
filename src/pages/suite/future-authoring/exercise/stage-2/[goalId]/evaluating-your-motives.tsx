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

const EvaluatingYourMotives: NextPage = () => {
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

    const { goal, previousGoal } = goalData;

    return (
        <>
            <Head>
                <title>Evaluating Motives</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <h1>
                        {goal.title}
                        <span className="ps-6 text-neutral-200">
                            2.{goal.priority}.1
                        </span>
                    </h1>
                    <h2>Evaluating Your Motives</h2>

                    <p>
                        For this goal, you might want to consider issues such as
                        the following:
                    </p>

                    <ul className="list-disc ps-6">
                        <li>
                            Do you truly believe that pursuing this goal is
                            important?
                        </li>
                        <li>
                            {`Would you feel ashamed, guilty or anxious if you
                            didn't?`}
                        </li>
                        <li>
                            Do you want to achieve this goal personally, or are
                            you doing it to please someone else? (It is often a
                            good thing to do something for someone else, but you
                            should know when you are doing that.)
                        </li>
                        <li>
                            Are you pursuing this goal because the situation
                            that you find yourself in seems to demand it?
                        </li>
                        <li>
                            Is the pursuit of this goal enjoyable, stimulating
                            or satisfying?
                        </li>
                        <li>
                            Is this goal part of a deeply felt personal dream?
                        </li>
                    </ul>
                    <p>
                        Please spend a minute or two writing down your reasons
                        for pursuing this goal:
                    </p>

                    <EvaluatingYourMotivesWizard goal={goal} />

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={
                                previousGoal
                                    ? `/suite/future-authoring/exercise/stage-2/${previousGoal.id}/monitoring-progress`
                                    : `/suite/future-authoring/exercise/stage-2/analysis-of-goals`
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
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/considering-broader-impact`}
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

export default EvaluatingYourMotives;

type EvaluatingYourMotivesWizardProps = {
    goal: Goal;
};

const EvaluatingYourMotivesWizard: FC<EvaluatingYourMotivesWizardProps> = ({
    goal,
}) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(goal.motiveAnalysis);

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
                    if (input !== goal.motiveAnalysis) {
                        update({
                            motiveAnalysis: input,
                            goalId: goal.id,
                        });
                    }
                }}
                maxWords={300}
            />
        </div>
    );
};
