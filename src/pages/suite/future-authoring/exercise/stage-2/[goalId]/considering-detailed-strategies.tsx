import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FC, useState } from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import { Goal } from "@prisma/client";
import { useRouter } from "next/router";
import Textarea from "~/components/Common/Textarea";
import toast from "react-hot-toast";

const ConsideringDetailedStrategies: NextPage = () => {
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
                        {goal?.title}
                        <span className="ps-6 text-neutral-200">
                            2.{goal?.priority}.3
                        </span>
                    </h1>
                    <h2>
                        Considering the Detailed Strategies for Goal Attainment
                    </h2>

                    <p>
                        Goals are related to lesser, smaller sub-goals and
                        behaviors, as well as connected to higher-order, more
                        important abstract goals. Sub-goals are easier to
                        achieve, but are still fundamental to reaching our
                        greater aspirations. Sub-goals can thus be thought of as
                        strategies for greater goal achievement. Thinking about
                        what specific things need to be done in order to achieve
                        your goals allows you to create practical strategies for
                        realizing your dreams. Please take some time to write
                        about the concrete daily or weekly things you might do
                        to further your goal. Deeply consider what particular
                        behaviors this goal is built upon.
                    </p>

                    <ul className="list-disc ps-6">
                        <li>
                            Should you spend more time planning at school or at
                            work?
                        </li>
                        <li>
                            Do you need to spend more time with your friends, or
                            your children?
                        </li>
                        <li>
                            Do you need to discuss household chores with your
                            roommates, partner or spouse?
                        </li>
                    </ul>
                    <p>
                        Specify when you are going to work on your goal. Specify
                        how often. Specify where. Think hard about how you are
                        going to implement your plans. Make your plans concrete.
                    </p>
                    <p>
                        Write down those concrete weekly or daily things you
                        might do to further this goal.
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
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/identifying-solutions-to-obstacles`}
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

export default ConsideringDetailedStrategies;

type IdentifyingSolutionsToObstaclesWizardProps = {
    goal: Goal;
};

const IdentifyingSolutionsToObstaclesWizard: FC<
    IdentifyingSolutionsToObstaclesWizardProps
> = ({ goal }) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(goal.strategicAnalysis);

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
                    update({
                        strategicAnalysis: input,
                        goalId: goal.id,
                    });
                }}
                maxWords={300}
            />
        </div>
    );
};
