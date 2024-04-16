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

const IdentifyingSolutionsToObstaclesPage: NextPage = () => {
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

    const { goal } = goalData;

    return (
        <>
            <Head>
                <title>Planning for Obstacles</title>
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
                            2.{goal?.priority}.4
                        </span>
                    </h1>
                    <h2>Identifying Potential Obstacles and their Solutions</h2>

                    <p>
                        Thinking about achieving a goal is obviously easier than
                        going out and getting it done. Many things related to
                        the natural environment, the social group and the self
                        can stand in your way. It is useful to anticipate these
                        difficulties, so that you can plan to overcome them.
                    </p>
                    <p>
                        Consider your goal, once again. Write down all the
                        potential obstacles you can think up. Write down ways to
                        overcome these obstacles.
                    </p>
                    <p>
                        {`How might you interfere with your own plans? How can you
                        ensure this won't happen? Sometimes change is
                        threatening to people we know and love. Will the people
                        you know help you, or interfere? How can you communicate
                        with them, so that they will support you? Think of
                        realistic and worst-case scenarios. What are your
                        options? What are your alternative plans?`}
                    </p>
                    <p>
                        Write down potential obstacles to this goal, and specify
                        the ways you might overcome them.{" "}
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
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/monitoring-progress`}
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

export default IdentifyingSolutionsToObstaclesPage;

type IdentifyingSolutionsToObstaclesWizardProps = {
    goal: Goal;
};

const IdentifyingSolutionsToObstaclesWizard: FC<
    IdentifyingSolutionsToObstaclesWizardProps
> = ({ goal }) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(goal.obstacleAnalysis);

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
                    if (input !== goal.obstacleAnalysis) {
                        update({
                            obstacleAnalysis: input,
                            goalId: goal.id,
                        });
                    }
                }}
                maxWords={300}
            />
        </div>
    );
};
